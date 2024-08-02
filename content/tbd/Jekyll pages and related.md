---
date created: 2024-07-16T15:46
date modified: 2024-08-01T12:35
draft: "true"
---

TLDR ended up doing the ubuntu setup and ran away with it from there. WSL... so confusing...
See more with setting up [[Custom domains|custom domains]].
## Random Instructions idk

Installed ruby from [RubyInstaller for Windows](https://rubyinstaller.org/) (run anyway...) - install for me

- Was going to install Bundler too but it says modern ruby installs come with bundler: [Bundler: The best way to manage a Ruby application's gems](https://bundler.io/) 

But getting ruby specifically w jekyll: ([Jekyll on Windows](https://jekyllrb.com/docs/installation/windows/))

1. Rubyinstaller
2. Run ridk install at the end of the above step
	 MSYS2 and MINGW development tool chain
3. Open a new command prompt window from the start menu, so that changes to the `PATH` environment variable becomes effective. Install Jekyll and Bundler using `gem install jekyll bundler`
4. `jekyll -v`

---

### Found the wsl instructions...

Open bash

Update bash: 

```bash
sudo apt-get update -y && sudo apt-get upgrade -y
```

Install ruby:

```bash
sudo apt-add-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get install ruby2.5 ruby2.5-dev build-essential dh-autoreconf
```

it's not working... off we go to ubuntu instructions

---
### Ubuntu instructions

```
sudo apt-get install ruby-full build-essential zlib1g-dev
```

add stuff to gems

```
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Install jekyll and bundler

```
gem install jekyll bundler
```

--- 
## Running it

[Testing your GitHub Pages site locally with Jekyll - GitHub Docs](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)

Git cloned my repo

```
bundle install
```

\
To run:

```shell
bundle exec jekyll serve
```

To see: http://localhost:4000

---
## Stylelint

[stylelint/docs/user-guide/get-started.md at main · stylelint/stylelint · GitHub](https://github.com/stylelint/stylelint/blob/main/docs/user-guide/get-started.md)

## Prettier

good stuff

## Colors

[uicolors.app/create](https://uicolors.app/create)

```
'studio': {
        '50': '#f6f5fd',
        '100': '#efedfa',
        '200': '#e1ddf7',
        '300': '#cbc1f1',
        '400': '#b19ee7',
        '500': '#9676dc',
        '600': '#8558cf',
        '700': '#794cbd',
        '800': '#623a9d',
        '900': '#513181',
        '950': '#321e57',
    },
    
```

---
## Favicon things

[Add Favicon: A Beginner's Guide to Add an Icon to Your Website](https://www.hostinger.com/tutorials/how-to-add-favicon-to-website#How_to_Add_a_Favicon_to_Your_Website) 