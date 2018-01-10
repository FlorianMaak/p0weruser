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
* Filter-Labels
* Integration of Rene8888s repost-check
* Automated text recognition 
* (ToDo) Slideshow mode
* (ToDo) Improved search

## Instructions / Controls
Help and instructions can be found on this repositorys [wiki-pages](https://github.com/FlorianMaak/p0weruser/wiki).

## Installation
Just install Tapermonkey and install the script by a simple
click on one of the following urls:

### Release [![Build Status](https://travis-ci.org/FlorianMaak/p0weruser.svg?branch=master)](https://travis-ci.org/FlorianMaak/p0weruser)
[https://github.com/FlorianMaak/p0weruser/raw/master/dist/p0weruser.user.js](https://github.com/FlorianMaak/p0weruser/raw/master/dist/p0weruser.user.js)

### Beta [![Build Status](https://travis-ci.org/FlorianMaak/p0weruser.svg?branch=develop)](https://travis-ci.org/FlorianMaak/p0weruser)
[https://github.com/FlorianMaak/p0weruser/raw/develop/dist/p0weruser.user.js](https://github.com/FlorianMaak/p0weruser/raw/develop/dist/p0weruser.user.js)

## Screenshots
![repost](https://user-images.githubusercontent.com/6325146/31791525-1e0a84b4-b519-11e7-90f8-c5306afcc485.jpg)
> Repost-Highlighting

![settings](https://user-images.githubusercontent.com/6325146/34748815-a9dab250-f59e-11e7-8384-84c5cbf862b9.png)
> Enable or diasble modules via settings

![widescreen](https://user-images.githubusercontent.com/6325146/31791527-1e3d0fa6-b519-11e7-9ded-b6d9720b5708.jpg)
> Use pr0gramm in a very productive widescreen-mode

![comments](https://user-images.githubusercontent.com/6325146/31791528-1e5496f8-b519-11e7-8210-5cd96c864761.jpg)
> Colorize comment-dimensions and quickly jump to parent comments

![notifications](https://user-images.githubusercontent.com/6325146/31791529-1e6bd46c-b519-11e7-8527-d620f50b07f2.jpg)
> Access your notifications directly from any page

![filterlabel](https://user-images.githubusercontent.com/6325146/34079132-8a060c7e-e327-11e7-8809-54e8ad811faa.jpg)
> See the images filter as a colored label

![rep0st](https://user-images.githubusercontent.com/6325146/34794921-926050aa-f650-11e7-9c8c-c1c728bc265b.png)
> Check if an image is a rep0st, by using the check on rep0st.rene8888.at

![ocr](https://user-images.githubusercontent.com/6325146/34748289-1fd1fae8-f59c-11e7-94ce-71369abf456c.png)
> Tired of retyping a text? Just use p0werusers optical character recognition (OCR) to simply copy the text!

## Missing Feature?
Just open an issue and describe your request as accurately as possible. If you like to do script it on your own, feel free to fork and open a Pull Request.

## Contribution
Feel free to fork this project. If you like to contribute, please use [git-flow](https://github.com/nvie/gitflow)
branch-style and follow the commits [conventions](https://github.com/FlorianMaak/p0weruser/wiki/Conventions). If your work is done, please submit a
pull request. All contributions will be released under [GPLv3 licence](https://github.com/FlorianMaak/p0weruser/blob/master/LICENSE).

## [Dev] Installation
After checkout run ```npm install``` and [npm](https://www.npmjs.com/) will install all needed dependencies
and will run ```bower install``` to install needed frontend-libaries. After installation run
```npm run build``` to build a bundle from source. There are filewatchers running, starting a new build after a
each filechange. Just create a new UserScript in Tapermonkey and add your local file (found in
```dist``` folder) to test your script. 
