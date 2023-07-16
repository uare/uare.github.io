---
layout: post
title: How to Setup Keybase/GPG
tags: [pgp, gpg, keybase, keybase.io, git]
categories:
    - Configuration
---

## Installation

### MacOS

```bash
brew install gpg
brew install pinentry-mac
brew install --cask keybase
```

### Manjaro(Arch)

```bash
sudo pacman -S gnupg
# sudo pacman -S pinentry
sudo pacman -S keybase-gui
# yay -S --aur keybase-bin
```

## Configuration

### Default

```bash
# In ~/.zshrc
export GPG_TTY=$(tty)

# ~/.gnupg/gpg-agent.conf
max-cache-ttl 60480000
default-cache-ttl 60480000
default-cache-ttl-ssh 60480000
max-cache-ttl-ssh 60480000
```

### MacOS

```bash
# Set up pinentry-mac
# Add `pinentry-program /usr/local/bin/pinentry-mac` to `~/.gnupg/gpg-agent.conf`
killall gpg-agent
gpg-agent --daemon
```

### Manjaro(Arch)

```bash
# pintry
pacman -Ql pinentry | grep /usr/bin/
# Set up pinentry
# Add `pinentry-program /usr/bin/pinentry` to `.gnupg/gpg-agent.conf`

# Reload the agent
gpg-connect-agent reloadagent /bye
```

## Usage

### GPG

#### Create a key pair

**A keysize of the default 3072 value. A larger keysize of 4096 "gives us almost nothing, while costing us quite a lot"**, [why doesn’t GnuPG default to using RSA-4096](https://www.gnupg.org/faq/gnupg-faq.html#no_default_of_rsa4096).

```bash
# gpg --full-gen-key
gpg --full-generate-key
```

#### List `key-id`

> Whenever a `user-id` is required in a command, it can be specified with your key ID, fingerprint, a part of your name or email address, etc. GnuPG is flexible on this.

```bash
# the key-id is the hexadecimal hash provided on the same line as sec.
gpg --list-secret-keys --keyid-format=long user-id
```

#### List keys

- List keys in your public key ring:

```bash
gpg --list-keys
```

\-\- List keys in your secret key ring:

```bash
gpg --list-secret-keys
```

#### Export public key

```bash
gpg --export --armor user-id
gpg --export --armor --output public.key user-id
```

#### Import a key

```bash
gpg --import public.key
gpg --import private.key
```

#### Search key from key server

```bash
gpg --keyserver hkps://keys.openpgp.org/ --search-keys 931FF8E79F0876134EDDBDCCA87FF9DF48BF1C90
```

#### Encrypt a file

- Add `--armor` to encrypt a file using ASCII armor, suitable for copying and pasting a message in text format.
- Use `-R user-id` or `--hidden-recipient user-id` instead of `-r` to not put the recipient key IDs in the encrypted message. This helps to hide the receivers of the message and is a limited countermeasure against traffic analysis.

```bash
gpg --recipient user-id --encrypt doc
```

#### Decrypt a file

```bash
gpg --output doc --decrypt doc.gpg
```

#### Symmetric encrypt

```bash
gpg --symmetric doc

# Example
gpg -c --s2k-cipher-algo AES256 --s2k-digest-algo SHA512 --s2k-count 65536 doc
```

#### Encrypt a directory

```bash
gpgtar -c -o dir.gpg dir
```

#### Backup private key

```bash
gpg --export-secret-keys --armor --output privkey.asc user-id
```

#### Backup revocation certificate(`~/.gnupg/openpgp-revocs.d/`)

```bash
# Generate revocation certificate
gpg --gen-revoke --armor --output revcert.asc user-id
```

### Edit key

```bash
# Edit Key
# change expire time
# list/expire/key 1/save
# Revoke A Key
# uid <old uid number>/revuid/4/save
# remove AEAD
# showpref/setpref AES256 AES192 AES 3DES SHA512 SHA384 SHA256 SHA224 SHA1 ZLIB BZIP2 ZIP/save
# trust
# trust/save
gpg --edit-key user-id
```

#### Sign a file

```bash
gpg --output doc.sig --sign doc
gpg --output doc.sig --clearsign doc
gpg --output doc.sig --detach-sig doc
```

#### Verify a signature

```bash
gpg --verify doc.sig
gpg --verify archlinux-version.iso.sig /path/to/archlinux-version.iso
```

### Keybase

#### Create a key pair

```bash
keybase pgp gen --multi
```

#### List key

```bash
keybase pgp list
```

#### Export key

```bash
# Config GitHub GPG Key
# open https://github.com/settings/keys
keybase pgp export --query ${KEY_FINGERPRINT} | pbcopy

# Export Keybase Key
keybase pgp export --query ${KEY_FINGERPRINT} | gpg --import
keybase pgp export --query ${KEY_FINGERPRINT} --secret | gpg --allow-secret-key-import --import
```

#### Update a key

```bash
keybase pgp update ${KEY_FINGERPRINT}
```

### Git

#### Config signing key

```bash
git config --global user.signingKey ${KEY_FINGERPRINT}
git config --global commit.gpgSign true
```

#### Git sign previous commits keeping dates

```bash
git rebase --exec 'git commit --amend --no-edit --no-verify -S' -i --root
git rebase --committer-date-is-author-date -i --root
```

## References

- [GnuPG](https://www.gnupg.org/)
- [Keybase Documents](https://book.keybase.io/docs)
- [GnuPG - ArchWiki](https://wiki.archlinux.org/title/GnuPG)
- [Git sign previous commits keeping dates](https://peterbabic.dev/blog/git-sign-previous-commits-keeping-dates/)
