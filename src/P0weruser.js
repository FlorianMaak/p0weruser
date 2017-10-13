import Settings from './module/Settings.js';
import EventHandler from './EventHandler.js';

class P0weruser {
    constructor() {
        this.eventHandler = new EventHandler();
        this.settings = new Settings();
    }
}

window.p0weruser = new P0weruser();
