import Utils from '../Utils';

export default class Rep0st {
    constructor() {
        this.name = 'Rep0st Check';
        this.description = 'Frage rene888, ob es sich um einen rep0st handelt.';
    }


    load() {
        let _this = this;
        this.styles = require('../style/rep0st.less');

        p.View.Stream.Item = p.View.Stream.Item.extend({
            show: function (rowIndex, itemData, defaultHeight, jumpToComment) {
                this.parent(rowIndex, itemData, defaultHeight, jumpToComment);

                _this.addButton(this.$container);
            }
        });

        Utils.addVideoConstants();
    }


    addButton(container) {
        const imgElement = container.find('.item-image');

        if(imgElement[0].tagName !== 'VIDEO') {
            const template = $(`<a class="repost-link"><span class="fa fa-copy"></span> rep0st?</a>`);
            let sourceElement = container.find('.item-source');
            sourceElement.after(template);

            template[0].addEventListener('click', () => {
                this.checkImage(imgElement);
            });
        }
    }


    checkImage(imgElement) {
        let form = new FormData();

        // FormData
        form.append("filter", "sfw");
        form.append("filter", "nsfw");
        form.append("filter", "nsfl");
        form.append("image", new Blob([], {type:"application/octet-stream"}), '');
        form.append("url", imgElement[0].src);

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://rep0st.rene8888.at/",
            "method": "POST",
            "headers": {
                "cache-control": "no-cache",
                "Upgrade-Insecure-Requests": 1,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };

        $.ajax(settings).done((response) => {
            // Add logic
        });
    }
}
