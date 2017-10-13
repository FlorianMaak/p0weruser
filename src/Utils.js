export default class Utils {
    static waitForElement(selector) {
        return new Promise((resolve, reject) => {
            let element = [];
            let check = () => {
                if(! element[0]) {
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
}
