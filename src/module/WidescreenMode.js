import SimpleBar from '../../bower_components/simplebar/dist/simplebar.js';

export default class WidescreenMode {
    constructor() {
        this.name = 'Widescreen Mode';
        this.bar = {};
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
            this.bar = new SimpleBar(document.getElementsByClassName('item-comments')[0]);
        });
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
