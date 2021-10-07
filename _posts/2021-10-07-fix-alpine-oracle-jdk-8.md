---
layout: post
title: Fix Oracle JDK 8 Failed Get Localhost Error on Alpine
tags: [Oracle, JDK, Alpine, Alpine, Kubernetes]
categories:
    - Deployment
---

## The Issue

When we wanted to change the Java micro-services with the Oracle JDK8 on alpine, we met an issue to start the Spring boot, like [this issue](https://github.com/baomidou/mybatis-plus/issues/3652).

After several days of debugging, I found this a bug in Java 8, here is [the ticket](https://bugs.openjdk.java.net/browse/JDK-8077819). And this bug only occurred in the alpine which is lacking the `/etc/nsswitch.conf` file. The related code in the `mybatis-plus` can be checked in [GitHub](https://github.com/baomidou/mybatis-plus/blob/master/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/toolkit/Sequence.java#L98).

## Reproduce the bug

### Java Test Sample Code

I wrote the sample Java code to reproduce this bug:

```java
import java.net.InetAddress;
import java.net.UnknownHostException;

public class CheckLocalhost {

    public static void main(String[] args) throws UnknownHostException {
        try {
            System.out.println(InetAddress.getLocalHost());
            System.out.println(InetAddress.getLocalHost().getHostName());

            System.out.println("Get localhost successfully!");
        } catch (UnknownHostException e) {
            System.out.println(e);
            System.out.println("Get localhost failed");
            throw e;
        }
    }
}
```

We can save this code snippet with the name `CheckLocalhost.java`. To quickly verify this code, we can run the command: `java -version && javac CheckLocalhost.java && java CheckLocalhost`. Normally, this code doesn't run failed when we run it in the local Java environment.

### Alpine Dockerfile

I known this bug only occurred in the Alpine image, so I also wrote a `Dockerfile` to reproduce this bug. But before we build the Docker image, we need to download some packages which were dependent on the Oracle JDK8.

- Download `glibc-2.21-r2`

```bash
wget 'https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.21-r2/glibc-2.21-r2.apk'
```

- Download Oracle JDK 8

```bash
wget 'https://javadl.oracle.com/webapps/download/GetFile/1.8.0_202-b08/1961070e4c9b4e26a04e7f5a083f551e/linux-i586/jdk-202u08-linux-x64.tar.gz'
```

- Test Sample Code

We also need to copy the `CheckLocalhost.java` file to the same directory. We will include this sample code in the Docker image too.

- Write the Dockerfile

```Dockerfile
# syntax=docker/dockerfile:1

FROM alpine:3.9

COPY ./glibc-2.21-r2.apk /opt/
RUN apk --update --no-cache add curl && \
    apk add --allow-untrusted /opt/glibc-2.21-r2.apk && \
    rm /opt/glibc-2.21-r2.apk

ARG JAVA_VERSION_MAJOR=8
ARG JAVA_VERSION_MINOR=202
ARG JAVA_PACKAGE=jdk

COPY ./${JAVA_PACKAGE}-${JAVA_VERSION_MAJOR}u${JAVA_VERSION_MINOR}-linux-x64.tar.gz /opt/
RUN tar -xzf /opt/${JAVA_PACKAGE}-${JAVA_VERSION_MAJOR}u${JAVA_VERSION_MINOR}-linux-x64.tar.gz -C /opt/ && \
    ln -s /opt/jdk1.${JAVA_VERSION_MAJOR}.0_${JAVA_VERSION_MINOR} /opt/jdk && \
    rm /opt/${JAVA_PACKAGE}-${JAVA_VERSION_MAJOR}u${JAVA_VERSION_MINOR}-linux-x64.tar.gz

# Symlinks to fix issues with error "libc.musl-x86_64.so.1: cannot open shared object file: No such file or directory"
RUN ln -s /lib/libc.musl-x86_64.so.1 /usr/lib/libc.musl-x86_64.so.1 && \
    ln -s /lib/libz.so.1 /usr/lib/libz.so.1

# Set environment
ENV JAVA_HOME /opt/jdk
ENV PATH ${PATH}:${JAVA_HOME}/bin

WORKDIR /root/

COPY ./CheckLocalhost.java .
RUN javac CheckLocalhost.java
CMD java CheckLocalhost
```

### Build the Image

Finally, we need to build the Docker image with the command:

```bash
DOCKER_BUILDKIT=1 docker build --tag alpine-oracle-jdk8 .
```

### Test the Image

After the image built completed, we can test it with the command below:

```bash
docker run -it --rm alpine-oracle-jdk8:latest
```

We can find the output is a Java exception:

```bash
java.net.UnknownHostException: f4b21bf38c57: f4b21bf38c57: Name or service not known
Get localhost failed
Exception in thread "main" java.net.UnknownHostException: f4b21bf38c57: f4b21bf38c57: Name or service not known
        at java.net.InetAddress.getLocalHost(InetAddress.java:1506)
        at CheckLocalhost.main(CheckLocalhost.java:8)
Caused by: java.net.UnknownHostException: f4b21bf38c57: Name or service not known
        at java.net.Inet4AddressImpl.lookupAllHostAddr(Native Method)
        at java.net.InetAddress$2.lookupAllHostAddr(InetAddress.java:929)
        at java.net.InetAddress.getAddressesFromNameService(InetAddress.java:1324)
        at java.net.InetAddress.getLocalHost(InetAddress.java:1501)
        ... 1 more
```

## Fix the Bug

### Run Docker Container with Host Network

Firstly, I tried to run the Docker with the host network, we can find the bug has gone:

- Host

```bash
docker run -it --rm --net=host alpine-oracle-jdk8:latest
```

- Result

```bash
{{HOSTNAME}}/{{HOST_IP}}
{{HOSTNAME}}
Get localhost successfully!
```

### Another Method

I also searched this exception by Google, and find some more generally solutions:

```Dockerfile
# Fix localhost issue
RUN echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf
```

There are some explanations on [stack overflow](https://stackoverflow.com/a/38644126/7007549).

> They honor configuration in /etc/nsswitch.conf where hosts are configured for /etc/hosts that gives it main priority for name resolution.

We can add these two lines to our Dockerfile, we don't need to use the host network to make the code run successfully.


## What's More

Wait, I can run the code successfully with docker, but I still met the failure in the Kubernetes cluster with the host network enabled by this command:

```bash
kubectl run -it --rm debug --image-pull-policy Always --image=${YOUR_DOCKER_IMAGE_REGISTRY}/alpine-oracle-jdk:latest --overrides='{"kind":"Pod", "apiVersion":"v1", "spec": {"hostNetwork": true, "dnsPolicy": "ClusterFirstWithHostNet"}}' -- sh

java CheckLocalhost
```

After more research and experiments, I found I also need to add the hostname and IP line to the `/etc/hosts` in the host node machine.

So I arranged below table for this issue:

| Environment | None | Host Network | `/etc/nsswitch.conf`(container) | Host Network and `/etc/nsswitch.conf`(container) | Host Network and `/etc/nsswitch.conf`(container) and `/etc/hosts`(host) |
| --- | --- | --- | --- | --- | --- |
| Host | ✅ | - | - | - | - |
| Docker | ❌ | ✅ | ✅ | - | - |
| Kubernetes | ❌ | ❌ | ✅ | ❌ | ✅ |

## Conclution

Although we can fix this issue for Oracle JDK8, I still recommend using the OpenJDK and higher version JDK. We have many chooses, such as [Temurin](https://adoptium.net/) and [Microsoft OpenJDK](https://www.microsoft.com/openjdk).

## References

- [Mabatis-plus GitHub](https://github.com/baomidou/mybatis-plus/blob/master/mybatis-plus-core/src/main/java/com/baomidou/mybatisplus/core/toolkit/Sequence.java#L98)
- [JDK Ossue](https://bugs.openjdk.java.net/browse/JDK-8077819)
- [Stack Overflow](https://stackoverflow.com/questions/38622631/inetaddress-java-8-is-not-getting-the-hostname)
- [Hearstart Dockerhub]((https://hub.docker.com/r/hearstat/alpine-java/dockerfile))
- [Temurin](https://adoptium.net/)
- [Microsoft OpenJDK](https://www.microsoft.com/openjdk)
