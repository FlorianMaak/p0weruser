import SimpleBar from 'simplebar';
import Settings from '../Settings';
import Utils from '../Utils';

export default class WidescreenMode {
    constructor() {
        this.name = 'Widescreen Mode';
        this.container = {};
        this.commentsContainer = {};
        this.resized = false;
        this.listenerAdded = false;
        this.description = 'Stellt das pr0 im Breitbildmodus dar.';
        this.displayBenis = Settings.get('WidescreenMode.settings.display_benis');
        this.mouseControl = Settings.get('WidescreenMode.settings.mouse_control');
    }


    handleWheelChange(e) {
        if (this.isMoveable) {
            this.img.animate({
                top: e.deltaY > 0 ? '-=20' : '+=20'
            }, 0);

            return false;
        }

        if (this.hasUnsentComments()) {
            let state = window.confirm('Du hast noch nicht abgeschickte Kommentare! Willst du dieses Medium wirklich verlassen?');

            if (!state) {
                return false;
            }
        }

        let el = {};
        if (e.deltaY < 0) {
            el = document.getElementsByClassName('stream-prev')[0];
        } else {
            el = document.getElementsByClassName('stream-next')[0];
        }

        el.click();
    }


    load() {
        this.comments = [];
        this.commentsWide = window.localStorage.getItem('comments_wide') === 'true';
        this.styles = require('../style/widescreenMode.less');
        this.header = document.getElementById('head-content');

        this.nav = {
            button: null,
            links: null,
            container: document.getElementById('footer-links')
        };

        this.checkScoreDisplay();
        this.addInputListeners();
        this.addHeaderListener();
        this.overrideViews();
        this.addNavigation();
        this.modifyLogo();
    }


    checkScoreDisplay() {
        if (this.displayBenis) {
            p.shouldShowScore = () => {
                return true;
            };
        }
    }


    getSettings() {
        return [
            {
                id: 'display_benis',
                title: 'Benis sofort anzeigen',
                description: 'Zeigt den Benis direkt ohne Wartezeit an!'
            },
            {
                id: 'mouse_control',
                title: 'Steuerung mit der Maus',
                description: 'Wechsle mit dem Mausrad zwischen Medien.'
            }
        ];
    }


    addHeaderListener() {
        let headerLinks = document.querySelectorAll('#head-menu > a');
        for (let i = 0; i < headerLinks.length; i++) {
            $(headerLinks[i]).unbind('click');
            headerLinks[i].addEventListener('click', e => {
                e.preventDefault();

                let href = headerLinks[i].attributes.href.nodeValue;
                if (href.charAt(0) === '/') {
                    href = href.slice(1);
                }

                if (href === p.location) {
                    p.reload();
                } else {
                    p.navigateTo(href);
                }
            });
        }
    }


    addInputListeners() {
        if (!this.listenerAdded) {
            this.listenerAdded = true;
            document.addEventListener('keydown', (e) => {
                this.handleKeypress(e,
                    document.activeElement.tagName === 'TEXTAREA' ||
                    document.activeElement.tagName === 'INPUT'
                );
            });

            window.addEventListener('locationChange', (e) => {
                if (e.mode === 0) {
                    document.body.classList.remove('fixed');
                }
            })
        }
    }


    modifyLogo() {
        let originalLink = document.getElementById('pr0gramm-logo-link');

        this.logoLink = originalLink.cloneNode(true);
        originalLink.parentNode.replaceChild(this.logoLink, originalLink);
        this.logoLink.href = '/new';

        this.logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (p.location === 'new') {
                p.reload();
            } else {
                p.navigateTo('new', p.NAVIGATE.DEFAULT);
            }
        });
    }


    overrideViews() {
        // Override Item-View
        let _this = this;

        p.View.Stream.Item = p.View.Stream.Item.extend({
            template: require('../template/streamItem.html'),
            show: function (rowIndex, itemData, defaultHeight, jumpToComment) {
                this.parent(rowIndex, itemData, defaultHeight, jumpToComment);
                this.syncVotes(p.user.voteCache.votes);

                _this.addItemListener(this.$image, itemData);
                document.body.classList.add('fixed');
            },
            remove: function () {
                this.parent();
                document.body.classList.remove('fixed');
            }
        });

        // Fix audio-controls
        Utils.addVideoConstants();

        // Extend comments-rendering and template
        p.View.Stream.Comments = p.View.Stream.Comments.extend({
            template: require('../template/streamItemComments.html'),
            render: function () {
                this.parent();
                _this.comments = [this.$commentForm.find('textarea')[0]];
                _this.commentsContainer = this.$container;
                _this.commentsContainer[0].classList.toggle('wide', _this.commentsWide);
                new SimpleBar(this.$container[0]);

                let commentSwitch = this.$container.find('.comments-switch')[0];
                commentSwitch.addEventListener('click', () => {
                    this.$container[0].classList.add('toggled');
                    this.$container[0].classList.toggle('wide');
                    _this.commentsWide = this.$container[0].classList.contains('wide');

                    window.localStorage.setItem('comments_wide', _this.commentsWide);
                });
            },
            focusComment(comment) {
                let target = this.$container.find('#' + comment);
                if (target.length) {
                    Utils.waitForElement('.simplebar-scroll-content').then((el) => {
                        this.$scrollContainer = $(el[0]);
                        let jumpPos = target.offset().top - this.$scrollContainer.offset().top - CONFIG.HEADER_HEIGHT - 80;
                        this.$scrollContainer.scrollTop(jumpPos);
                        target.highlight(180, 180, 180, 1);
                    });
                }
            },
            showReplyForm(ev) {
                this.parent(ev);
                let id = ev.currentTarget.href.split(':comment')[1];
                _this.comments.push(document.querySelectorAll(`#comment${id} textarea`)[0]);
            }
        });

        // Handle stream-building
        p.View.Stream.Main.prototype.buildItemRows = function (items) {
            let result = '';

            for (let i = 0; i < items.length; i++) {
                result += this.buildItem(items[i]);
            }

            return `<div class="item-row">${result}</div>`;
        };
    }


    addItemListener(image, itemData) {
        this.img = image;
        this.container = this.img[0].parentNode;
        this.resized = (itemData.height > this.container.offsetHeight || itemData.width > this.container.offsetWidth);
        this.container.classList.toggle('resized', this.resized);
        this.moveLink = document.getElementsByClassName('move-link')[0];

        // Enable draggable
        if (this.resized) {
            this.container.classList.add('oversize');
            this.img.draggable();
            this.img.draggable('disable');
        }

        // Handle wheel-change
        if (this.mouseControl) {
            this.container.addEventListener('wheel', (e) => {
                e.preventDefault();

                this.handleWheelChange(e);
            });
        }

        if (this.moveLink) {
            this.moveLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMove();
            });
        }
    }


    handleKeypress(e, isInput = false) {
        if (isInput) {
            if (event.ctrlKey && e.code === 'Enter') {
                $(document.activeElement).parents('form').find('input[type="submit"]')[0].click();
            }

            return true;
        } else {
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    this.toggleMove();
                    break;
                case 'Escape':
                    if (this.resized && p.currentView.$itemContainer) {
                        p.currentView.hideItem();
                    }
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                    if (this.isMoveable) {
                        this.img.animate({
                            top: e.code === 'ArrowDown' ? '-=20' : '+=20'
                        }, 0);
                    } else {
                        let elem = this.commentsContainer.find('.simplebar-content');
                        if (!elem.is(':focus')) {
                            elem.attr('tabindex', -1).focus();
                        }
                    }
                    break;
            }
        }
    }


    hasUnsentComments() {
        if (p.user.id) {
            for (let i = 0; i < this.comments.length; i++) {
                if (this.comments[i].value !== '') {
                    return true;
                }
            }
        }

        return false;
    }


    toggleMove() {
        if (this.resized) {
            this.img.off('click');
            this.container.classList.toggle('resized');
            this.isMoveable = !this.container.classList.contains('resized');
            this.img.draggable(this.isMoveable ? 'enable' : 'disable');
            this.img.attr('tabindex', -1).focus();

            if (!this.img.resizeInit) {
                this.container.style.alignItems = 'flex-start';
            }

            this.img.resizeInit = true;
        }

        if (!this.isMoveable) {
            this.img.on('click', () => {
                p.currentView.hideItem();
            });
        }
    }


    addNavigation() {
        this.nav.button = document.createElement('a');
        this.nav.links = this.nav.container.querySelectorAll('a');
        this.nav.button.className = 'fa fa-bars sidebar-toggle';
        this.header.insertBefore(this.nav.button, this.header.firstChild);

        this.nav.button.addEventListener('click', () => {
            this.toggleNavigation();
        });

        for (let i = 0; i < this.nav.links.length; i++) {
            this.nav.links[i].addEventListener('click', () => {
                this.toggleNavigation();
            });
        }

        // Init additional menuitems
        this.addMenuItem('pr0p0ll', 'https://pr0p0ll.com', ' fa-bar-chart');
    }


    toggleNavigation() {
        this.nav.container.classList.toggle('open');
        this.nav.button.classList.toggle('active');
    }


    addMenuItem(name, url, faClass) {
        let elem = document.createElement('a');
        elem.className = faClass;
        elem.innerText = name;
        elem.href = url;
        elem.target = '_blank';
        this.nav.container.firstElementChild.appendChild(elem);
    }
}
