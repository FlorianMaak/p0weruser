import SimpleBar from '../../bower_components/simplebar/dist/simplebar.js';
import Utils from '../Utils';

export default class WidescreenMode {
    constructor() {
        this.name = 'Widescreen Mode';
        this.bar = null;
        this.container = {};
        this.commentsContainer = {};
        this.resized = false;
        this.commentSwitch = null;
        this.listenerAdded = false;
        this.description = 'Stellt das pr0 im Breitbildmodus dar.'
    }


    load() {
        this.styles = require('../style/widescreenMode.less');
        this.header = document.getElementById('head-content');
        this.nav = {
            button: null,
            container: document.getElementById('footer-links')
        };
        WidescreenMode.overrideTemplates();
        this.addListener();
        this.addNavigation();
    }


    static overrideTemplates() {
        // Replace templates
        p.View.Stream.Item.prototype.template = require('../template/streamItem.html');
        p.View.Stream.Comments.prototype.template = require('../template/streamItemComments.html');

        p.View.Stream.Main.prototype.buildItemRows = function (items) {
            let result = '';
            for (let i = 0; i < items.length; i++) {
                result += this.buildItem(items[i]);
            }

            return `<div class="item-row">${result}</div>`;
        };
    }


    addListener() {
        window.addEventListener('commentsLoaded', () => {
            this.img = $('.item-image');
            this.commentsContainer = $('.item-comments');
            this.container = this.img[0].parentNode;
            this.resized = (this.img.height() > this.container.offsetHeight || this.img.width() > this.container.offsetWidth);
            this.container.classList.toggle('resized', this.resized);
            this.isMoveable = false;

            // Apply custom scrollbar
            Utils.waitForElement('.item-comments').then((el) => {
                this.bar = new SimpleBar(el[0]);

                // Add switch-listener
                this.commentSwitch = this.commentsContainer.find('.comments-switch')[0];
                this.commentSwitch.addEventListener('click', () => {
                    this.commentsContainer[0].classList.toggle('wide');
                });
            });

            // Enable draggable
            if(this.resized) {
                this.img.draggable();
                this.img.draggable('disable');
            }

            // Handle wheel-change
            this.container.addEventListener('mousewheel', (e) => {
                e.preventDefault();

                WidescreenMode.handleWheelChange(e.deltaY);
            });
        });

        // Add keydown listener to handle arrowkeys and spacebar
        if(! this.listenerAdded) {
            this.listenerAdded = true;
            document.addEventListener('keydown', (e) => {
                if(document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT') {
                    this.handleKeypress(e);
                }
            });
        }
    }


    handleKeypress(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                if(this.resized) {
                    this.img.unbind('click');
                    this.container.classList.add('oversize');
                    this.container.classList.toggle('resized');
                    this.isMoveable = ! this.container.classList.contains('resized');
                    this.img.draggable(this.isMoveable  ? 'enable' : 'disable');
                    this.img.attr('tabindex', -1).focus();
                }
                break;

            case 'ArrowUp':
            case 'ArrowDown':
                if(this.isMoveable) {
                    this.img.animate({
                        top: e.code === 'ArrowDown' ? '-=20' : '+=20'
                    }, 0);
                } else {
                    let elem = $(this.commentsContainer).find('.simplebar-content');
                    if (!elem.is(':focus')) {
                        elem.attr('tabindex', -1).focus();
                    }
                }
                break;
        }
    }


    static handleWheelChange(deltaY) {
        let el = {};

        if(deltaY < 0) {
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
