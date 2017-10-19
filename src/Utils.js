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
}
