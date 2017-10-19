import Settings from './Settings';
import EventHandler from './EventHandler';
import WidescreenMode from './module/WidescreenMode';
import RepostMarker from './module/RepostMarker';
import BenisInNavbar from './module/BenisInNavbar';
import scrollbarCSS from '../bower_components/simplebar/dist/simplebar.css';

export default class P0weruser {
    constructor() {
        P0weruser.addStyles();
        this.eventHandler = new EventHandler();
        this.modules = this.getModules();
        this.settings = new Settings(this);

        // Load activated modules
        this.loadModules();
    }


    static addStyles() {
        // FontAwesome (Icons)
        let fa = document.createElement('link');
        fa.type = 'text/css';
        fa.rel = 'stylesheet';
        fa.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
        document.getElementsByTagName('head')[0].appendChild(fa);

        let scrollbar = document.createElement('style');
        scrollbar.innerText = scrollbarCSS;
        document.getElementsByTagName('head')[0].appendChild(scrollbar);
    }


    static getActivatedModules() {
        let modules = window.localStorage.getItem('activated_modules');

        if (!modules) {
            window.localStorage.setItem('activated_modules', '[]');
            modules = '[]';
        }

        return JSON.parse(modules);
    }


    static saveActivatedModules(selection) {
        window.localStorage.setItem('activated_modules', JSON.stringify(selection));
    }


    loadModules() {
        let activated = P0weruser.getActivatedModules();

        for (let i = 0; i < activated.length; i++) {
            this.modules[activated[i]].load();
        }
    }


    getModules() {
        if (!this.modules) {
            this.modules = {
                'WidescreenMode': new WidescreenMode(),
                'RepostMarker': new RepostMarker(),
                'BenisInNavbar': new BenisInNavbar()
            };
        }

        return this.modules;
    }
}


// Load script
window.p0weruser = new P0weruser();

