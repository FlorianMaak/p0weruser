import SimpleBar from '../../bower_components/simplebar/dist/simplebar.js';
import Utils from '../Utils';

export default class WidescreenMode {
    constructor() {
        this.name = 'Widescreen Mode';
        this.bar = {};
        this.container = {};
        this.resized = false;
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
            let img = document.getElementsByClassName('item-image')[0];
            this.container = img.parentNode;
            this.resized = (img.height > this.container.offsetHeight || img.width > this.container.offsetWidth);
            this.container.classList.toggle('resized', this.resized);

            Utils.waitForElement('.item-comments').then((el) => {
                this.bar = new SimpleBar(el[0]);
            });

            // Handle wheel-change
            let element = document.getElementsByClassName('item-image-wrapper')[0];
            element.addEventListener('mousewheel', (e) => {
                e.preventDefault();

                WidescreenMode.handleWheelChange(e.deltaY);
            });
        });

        if(! this.listenerAdded) {
            this.listenerAdded = true;
            document.addEventListener('keydown', (e) => {
                this.handleKeypress(e);
            });
        }
    }


    handleKeypress(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                if(this.resized) {
                    this.container.classList.toggle('resized');
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                console.log('up');
                break;
            case 'ArrowDown':
                e.preventDefault();
                console.log('down');
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
