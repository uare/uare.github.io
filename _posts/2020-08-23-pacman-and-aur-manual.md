---
layout: post
title: Pacman and AUR(yay) Manual
tags: [Pacman, Manjaro, Linux]
categories:
    - manual
---

## Update pacman mirror server

- list status of current active mirrors `sudo pacman-mirrors`
- list pacman mirror contry list `sudo pacman-mirrors --country-list`
- pacman mirror config file `/etc/pacman.d/mirrorlist`
- synchronise database with `sudo pacman -Syyu`
- downgrade packages `sudo pacman -Syyuu`

## Pacman Usage

### system update
- update the package database and update all packages on the system `sudo pacman -Syu`
- force a full refresh of the package database `sudo pacman -Syyu`
- allow packages to be downgraded `sudo pacman -Syyuu`

### install/remove package
- search the Manjaro repositories for available packages `pacman -Ss mplayer`
- search installed packages `pacman -Qs mplayer`
- sync the files database `sudo pacman -Fy`
- search for a package containing a file `pacman -F pacman`
- get more information about an installed package `pacman -Qi mplayer`
- get more information in the repos `pacman -Si mplayer`
- for a list of all installed packages in system `pacman -Ql`
- list explicitly-installed packages `pacman -Qe`
- list dependency-installed packages `pacman -Qd`
- list all foreign package(typically manually downloaded and installed or
    packages removed from the repositories) `pacman -Qm`
- install the package and ensure the system is up to date `sudo pacman -Syu mplayer`
- install from the local system `sudo pacman -U /var/cache/pacman/pkg/mplayer-38157-2-x86_64.pkg.tar.zst`
- force package installation reason to *dependency* `sudo pacman -S --asdeps package_name`
- force package installation reason to *explicitly* `sudo pacman -S --asexplicit package_name`
- remove a software `sudo pacman -R mplayer`
- remove a software and the unneeded dependencies `sudo pacman -Rsu mplayer`
- remove a software and everything that depends on it `sudo pacman -Rc mplayer`
- remove everything that depends on package name and continue to do so on its dependencies `sudo pacman -Rcs mplayer`
- also remove the backup configuration files
    - `sudo pacman -Rn mplayer`
    - `sudo pacman -Rsun mplayer`
    - `sudo pacman -Rcn mplayer`

### clear cache
- list all orphans `pacman -Qdt`
- remove all the orphans `sudo pacman -Rs $(pacman -Qdtq)`
- download packages without installing `sudo pacman -Sw mplayer`
- determine which package owns a file `pacman -Qo /usr/bin/mplayer`
- clear the cache of packages that no longer installed `sudo pacman -Sc`
- clear the cache completely `sudo pacman -Scc`
- a safe way to remove old package cache files `paccache -rvk3`

### pacman configuration
- pacman's settings are located in `/etc/pacman.conf`
- enable color output by uncommenting the `Color` line
- show Pacman Eating Power Pills by adding the `ILoveCandy` line under `Misc Options`
- install downgrade `sudo pacman -Syu downgrade`
- enable downgrede from the Arch Linux Archive(ALA) by setings the environment variable: `DOWNGRADE_FROM_ALA=1`
- ensure downgraded packages won't be upgrade again: Update the `IgnorePkg` line in the `/etc/pacman.conf` file

## AUR Usage(yay)
- ensure the `base-devel` package group is installed in full `pacman -S --needed base-devel`
- print the list of packages that needs to be updated `yay -Pu`
- present package-installation selection menu `yay <serach term>`
- clean unneeded dependencies `yay -Yc`
- download PKGBUILD from ABS or AUR `yay -G <AUR PACKAGE>`
- generate development package database used for devel update `yay -Y --gendb`
- Perform system upgrade, but also check for development package updates and use PKGBUILD modification time (not version number) to determine update.  `yay -Syu --devel --timeupdate`

