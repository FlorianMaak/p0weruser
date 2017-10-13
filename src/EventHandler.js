export default class EventHandler {
    constructor() {
        this.settingsLoaded = new Event('settingsLoaded');

        this.addEvents();
    }

    addEvents() {
        let _this = this;

        // Add settings-event
        (function(render) {
            p.View.Settings.prototype.render = function(params) {
                render.call(this, params);
                window.dispatchEvent(_this.settingsLoaded);
            };
        }(p.View.Settings.prototype.render));
    }
}
