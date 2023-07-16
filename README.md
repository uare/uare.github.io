# Not alone blog

## Local development

### Install prerequisites

```bash
# Ruby
ruby -v
# Ruby Gems
gem -v
# GCC Make
gcc -v && g++ -v && make -v
```

### Install the `jekyll` and `bundler` `gems`

```bash
gem install jekyll bundler
```

### Install dependencies

```bash
bundle install
```

### Build the site and make it available on a local server

```bash
# bundle exec jekyll serve
bundle exec jekyll serve --livereload
```
