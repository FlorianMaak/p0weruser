# p0weruser
Extend pr0gramm.com with some extra functions and improve look and feel. Don't like a special feature? No problem, just disable
it using settings.

## Features
* Addon-Settings
* Repost-Highlight
* Widescreen mode
* Current benis in header
* Notification Center
* Advanced Comments
* Desktop Notifications
* (ToDo) Integration of Rene8888s repost-check
* (ToDo) Highlighting of previously visited posts
* (ToDo) Cheap "stelz"
* (ToDo) Slideshow mode
* (ToDo) Improved search

## Installation
Just install Greasemonkey or Tapermonkey and install the script by a simple
click on one of the following urls:

### Release [![Build Status](https://travis-ci.org/FlorianMaak/p0weruser.svg?branch=master)](https://travis-ci.org/FlorianMaak/p0weruser)
[https://github.com/FlorianMaak/p0weruser/raw/master/dist/p0weruser.user.js](https://github.com/FlorianMaak/p0weruser/raw/master/dist/p0weruser.user.js)

### Beta [![Build Status](https://travis-ci.org/FlorianMaak/p0weruser.svg?branch=develop)](https://travis-ci.org/FlorianMaak/p0weruser)
[https://github.com/FlorianMaak/p0weruser/raw/develop/dist/p0weruser.user.js](https://github.com/FlorianMaak/p0weruser/raw/develop/dist/p0weruser.user.js)

## Screenshots
![repost](https://user-images.githubusercontent.com/6325146/31791525-1e0a84b4-b519-11e7-90f8-c5306afcc485.jpg)
> Repost-Highlighting

![settings](https://user-images.githubusercontent.com/6325146/31791526-1e25664e-b519-11e7-9974-0187f606ed62.jpg)
> Enable or diasble modules via settings

![widescreen](https://user-images.githubusercontent.com/6325146/31791527-1e3d0fa6-b519-11e7-9ded-b6d9720b5708.jpg)
> Use pr0gramm in a very productive widescreen-mode

![comments](https://user-images.githubusercontent.com/6325146/31791528-1e5496f8-b519-11e7-8210-5cd96c864761.jpg)
> Colorize comment-dimensions and quickly jump to parent comments

![notifications](https://user-images.githubusercontent.com/6325146/31791529-1e6bd46c-b519-11e7-8527-d620f50b07f2.jpg)
> Access your notifications directly from any page

## Missing Feature?
Just open an issue and describe your request as accurately as possible. If you like to do script it on your own, feel free to fork and open a Pull Request.

## Contribution
Feel free to fork this project. If you like to contribute, please use git-flow
branch-style and follow the commits conventions. If your work is done, please submit a
pull request. All contributions will be released under GPLv3 licence.

## [Dev] Installation
After checkout run ```npm install``` and npm will install all needed dependencies
and will run ```bower install``` to install needed frontend-libaries. After installation run
```npm run build``` to build a bundle from source. There are filewatchers running, starting a new build after a
each filechange. Just create a new UserScript in Tapermonkey and add your local file (found in
```dist``` folder) to test your script. 
