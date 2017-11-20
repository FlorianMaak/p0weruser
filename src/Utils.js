export default class Utils {
    static waitForElement(selector) {
        return new Promise((resolve, reject) => {
            let element = [];
            let check = () => {
                if (!element[0]) {
                    element = document.querySelectorAll(selector);

                    setTimeout(() => {
                        check();
                    }, 10);
                } else {
                    resolve(element);
                }
            };

            check();
        });
    }


    static changeLocation(newLocation) {
        p.location = newLocation;
        window.history.pushState({}, 'pr0gramm.com', newLocation);
    }

    
    static getUrlParams(url) {
        let result = {};
        url = url.split('?');
        let params = url[1].split('&');

        for (let i = 0; i < params.length; i++) {
            let param = params[i].split('=');
            result[param[0]] = param[1];
        }

        return {
            url: url[0],
            params: result
        };
    }


    static getUrlFromParams(url, params) {
        let result = url + '?';

        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                if (result !== url + '?') {
                    result += '&';
                }
                result += key + '=' + params[key];
            }
        }

        return result;
    }


    static insertAfter(node, reference) {
        reference.parentNode.insertBefore(node, reference.nextSibling);
    }

    static addPrototypes() {
        String.prototype.replaceArray = function(find, replace) {
            let replaceString = this;
            for (let i = 0; i < find.length; i++) {
                replaceString = replaceString.replace(find[i], replace[i]);
            }
            return replaceString;
        };
    }

    // Add constants, related to video-controls
    static addVideoConstants() {
        p.View.Stream.Item.TARGET = {
            NOTHING: 0,
            SEEK_CONTROLS: 1,
            VOLUME_CONTROLS: 2
        };
    }
}
