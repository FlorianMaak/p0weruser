import SimpleBar from '../../bower_components/simplebar/dist/simplebar.js';

export default class WidescreenMode {
    constructor() {
        this.name = 'Widescreen Mode';
        this.container = {};
        this.commentsContainer = {};
        this.resized = false;
        this.listenerAdded = false;
        this.description = 'Stellt das pr0 im Breitbildmodus dar.'
    }


    load() {
        this.commentsWide = window.localStorage.getItem('comments_wide') === 'true';
        this.styles = require('../style/widescreenMode.less');
        this.header = document.getElementById('head-content');
        this.nav = {
            button: null,
            container: document.getElementById('footer-links')
        };
        this.overrideViews();
        this.addNavigation();
    }


    overrideViews() {
        // Override Item-View
        let _this = this;
        p.View.Stream.Item = p.View.Stream.Item.extend({
            template: require('../template/streamItem.html'),
            show: function (rowIndex, itemData, defaultHeight, jumpToComment) {
                this.parent(rowIndex, itemData, defaultHeight, jumpToComment);

                _this.addItemListener(this.$image, itemData);
                 document.body.classList.add('fixed');
            },
            remove: function() {
                this.parent();
                document.body.classList.remove('fixed');
            }
        });

        // Extend comments-rendering and template
        p.View.Stream.Comments = p.View.Stream.Comments.extend({
            template: require('../template/streamItemComments.html'),
            render: function () {
                this.parent();
                _this.commentsContainer = this.$container;
                _this.commentsContainer[0].classList.toggle('wide', _this.commentsWide);
                new SimpleBar(this.$container[0]);

                let commentSwitch = this.$container.find('.comments-switch')[0];
                commentSwitch.addEventListener('click', () => {
                    this.$container[0].classList.add('toggled');
                    this.$container[0].classList.toggle('wide');
                    _this.commentsWide = this.$container[0].classList.contains('wide');

                    window.localStorage.setItem('comments_wide',  _this.commentsWide);
                });
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

        // Enable draggable
        if (this.resized) {
            this.container.classList.add('oversize');
            this.img.draggable();
            this.img.draggable('disable');
        }

        // Handle wheel-change
        this.container.addEventListener('mousewheel', (e) => {
            e.preventDefault();

            WidescreenMode.handleWheelChange(e.deltaY);
        });

        if (!this.listenerAdded) {
            this.listenerAdded = true;
            document.addEventListener('keydown', (e) => {
                if (document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT') {
                    this.handleKeypress(e);
                }
            });
        }
    }


    handleKeypress(e) {
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                if (this.resized) {
                    this.img.unbind('click');
                    this.container.classList.toggle('resized');
                    this.isMoveable = !this.container.classList.contains('resized');
                    this.img.draggable(this.isMoveable ? 'enable' : 'disable');
                    this.img.attr('tabindex', -1).focus();
                }
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


    static handleWheelChange(deltaY) {
        let el = {};

        if (deltaY < 0) {
            el = document.getElementsByClassName('stream-prev')[0];
        } else {
            el = document.getElementsByClassName('stream-next')[0];
        }

        el.click();
    }


    addNavigation() {
        this.nav.button = document.createElement('a');
        this.nav.button.className = 'fa fa-bars sidebar-toggle';
        this.header.insertBefore(this.nav.button, this.header.firstChild);

        this.nav.button.addEventListener('click', () => {
            this.toggleNavigation();
        })
    }


    toggleNavigation() {
        this.nav.container.classList.toggle('open');
        this.nav.button.classList.toggle('active');
    }
}
