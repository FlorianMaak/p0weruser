import Utils from '../Utils';

// Inspired by Mopsalarms repost-script
// https://github.com/mopsalarm/pr0gramm-reposts-userscript
export default class RepostMarker {
    constructor() {
        this.name = 'Repost Markierung';
        this.description = 'Markiert Reposts in der Übersicht'
    }

    load() {
        this.styles = require('../style/repostMarker.less');
        this.reposts = [];
        this.overrideBuildItem();

        // Get reposts, if not searched before
        $(document).ajaxComplete((event, request, settings) => {
            this.handleAjax(settings.url).then((data) => {
                for (let id of data) {
                    RepostMarker.markRepost(id);
                }
            });
        });
    }

    overrideBuildItem() {
        let mainView = p.View.Stream.Main;

        p.View.Stream.Main = mainView.extend({
            buildItem: this.buildItem
        });

        p.currentView.buildItem = this.buildItem;
    }

    static markRepost(id) {
        let elem = document.getElementById('item-' + id);

        if (elem) {
            elem.classList.add('repost');
        }
    }

    buildItem(item) {
        return `<a class="silent thumb" id="item-${item.id}" href="${this.baseURL}${item.id}"><img src="${item.thumb}"/></a>`;
    }

    handleAjax(url) {
        return new Promise((resolve, reject) => {
            if (url.indexOf('/api/items/get') === -1 || url.indexOf('repost') !== -1) {
                return false
            }

            // Prepare url
            url = Utils.getUrlParams(url);
            let params = url.params;
            if (!params.tags) {
                params.tags = 'repost';
            } else {
                params.tags += ' repost';
            }

            // Send manipulated request
            let xhr = new XMLHttpRequest();
            xhr.open('GET', Utils.getUrlFromParams(url.url, params));
            xhr.addEventListener('load', (result) => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = JSON.parse(xhr.responseText);
                    resolve(response.items.map((item) => {
                        return item.id;
                    }));
                } else {
                    reject('error!');
                }
            });

            xhr.send();
        });
    }
}
