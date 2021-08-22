---
layout: post
title: Setup Tmux on MacOS
tags: [Tmux, Iterm2, MacOS]
categories:
    - Configuration
---

## iTerm2

### Install the iTerm2

```bash
brew install iterm2
```

### Enable Clipboard

Choose the checkbox in the Preferences -> General -> Selection -> Applications in the termial may access clipboard.

### Powerline Font

Install powerline supported fonts by:

```bash
brew install svn
brew install --cask homebrew/cask-fonts/font-dejavu-sans-mono-for-powerline
```

Change fonts in the iTerm2 Profiles -> Text -> Font.

### Disable the window title bar

Change the Profiles -> Window -> Style to No Title Bar.

## Tmux config

### Tmux config file

I recommend my Tmux [config file](https://github.com/nooop3/dotfiles/blob/main/runcom/tmux.conf), which can both use in the local or the remote machine.

You can also clone the repos, and link the Tmux config file by this command:

```bash
ln -s ~/github/dotfiles/runcom/tmux.conf ~/.tmux.conf
```

When you first start the Tmux session, it will auto download and install some useful plugins on the machine.

### TERM setting

By default, the MacOS doesn't support the `tmux-256color`, you can just set this option to use Tmux: `set-option default-terminal "screen-256color"`.

Otherwise, you need to follow this instructure to support `tmux-256color` on MacOS.

- Check the ncurses

```bash
which -a tic
```

If you have multi responses, please only keep the original version of the ncurses.

- Download the latest nucurses

```bash
curl -LO https://invisible-island.net/datafiles/current/terminfo.src.gz && gunzip terminfo.src.gz
```

- Compile

```bash
# SUDO will install the result in the /usr/share/terminfo/ folder.
# sudo /usr/bin/tic -xe tmux-256color terminfo.src
/usr/bin/tic -xe tmux-256color terminfo.src
```

You can check the result in this file `~/.terminfo/74/tmux-256color`.

- Add another terminfo(Optional)

```bash
/usr/bin/tic -xe alacritty-direct,tmux-256color terminfo.source
```

- Confirm the terminfo description

```bash
infocmp -x tmux-256color
```

## References

- [Installing tmux-256color for macOS](https://gist.github.com/bbqtd/a4ac060d6f6b9ea6fe3aabe735aa9d95)
