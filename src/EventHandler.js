export default class EventHandler {
    constructor() {
        this.settingsLoaded = new Event('settingsLoaded');
        this.commentsLoaded = new Event('commentsLoaded');

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

        // Add settings-event
        (function(render) {
            p.View.Stream.Comments.prototype.render = function() {
                render.call(this);
                window.dispatchEvent(_this.commentsLoaded);

            };
        }(p.View.Stream.Comments.prototype.render));
    }
}
