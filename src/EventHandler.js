export default class EventHandler {
    constructor() {
        this.settingsLoaded = new Event('settingsLoaded');
        this.commentsLoaded = new Event('commentsLoaded');
        this.locationChange = new Event('locationChange');
        this.userSync = new Event('userSync');

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

        // Add commentsloaded-event
        (function(render) {
            p.View.Stream.Comments.prototype.render = function() {
                render.call(this);
                window.dispatchEvent(_this.commentsLoaded);

            };
        }(p.View.Stream.Comments.prototype.render));

        (function (syncCallback) {
            p.User.prototype.syncCallback = function (response) {
                _this.userSync.data = response;
                syncCallback.call(this, response);
                window.dispatchEvent(_this.userSync);
            };
        }(p.User.prototype.syncCallback));
    }
}
