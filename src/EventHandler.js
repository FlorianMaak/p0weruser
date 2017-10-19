export default class EventHandler {
    constructor() {
        this.settingsLoaded = new Event('settingsLoaded');
        this.locationChange = new Event('locationChange');

        this.addEvents();
    }


    addEvents() {
        let _this = this;

        // Add settings-event
        (function (render) {
            p.View.Settings.prototype.render = function (params) {
                render.call(this, params);
                window.dispatchEvent(_this.settingsLoaded);
            };
        }(p.View.Settings.prototype.render));

        // Add locationchange event
        (function (navigate) {
            p.navigateTo = function (location, mode) {
                navigate.call(this, location, mode);
                _this.locationChange.mode = mode;
                window.dispatchEvent(_this.locationChange);
            };
        }(p.navigateTo));
    }
}
