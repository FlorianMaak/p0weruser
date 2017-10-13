export default class WidescreenMode {
    constructor() {
        this.name = 'Widescreen Mode';
        this.description = 'Stellt das pr0 im Breitbildmodus dar.'
    }

    load() {
        this.styles = require('../style/widescreenMode.less');
        this.header = document.getElementById('head-content');
        this.nav = {
            button: null,
            container: document.getElementById('footer-links')
        };

        this.addNavigation();
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
