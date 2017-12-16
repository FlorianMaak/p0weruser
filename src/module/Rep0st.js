import SimpleBar from '../../bower_components/simplebar/dist/simplebar.js';
import Utils from '../Utils';

export default class Rep0st {
    constructor() {
        this.name = 'Rep0st Check';
        this.description = 'Frage rene888, ob es sich um einen rep0st handelt.';
    }


    load() {
        let _this = this;
        this.visible = false;
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
        this.loader = $(`<span class="fa fa-spinner fa-spin loader"></span>`);

        if(imgElement[0].tagName !== 'VIDEO') {
            const template = $(`<a class="repost-link"><span class="fa fa-copy"></span> rep0st?</a>`);
            let sourceElement = container.find('.item-source');
            sourceElement.after(template);

            template[0].addEventListener('click', () => {
                if(! this.visible) {
                    this.checkImage(container, imgElement);
                }
            });
        }
    }


    checkImage(container, imgElement) {
        container.append(this.loader);
        let form = new FormData();
        let result = $('<div></div>');

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
            this.loader.remove();
            this.visible = true;
            result.html($(response));
            let output = [];
            const images = result.find('.result-list a');

            for(let i = 0; i < images.length; i++) {
                output.push({
                    url: images[i].href,
                    img: images[i].style.backgroundImage.match(/\(([^)]+)\)/)[1]
                });
            }

            this.displayImages(container, output);
        });
    }


    displayImages(container, urls) {
        let bar = $('<div class="rep0sts"></div>');
        let closeBtn = $(`<span class=" fa fa-close close"></span>`);
        bar.append(closeBtn);

        for(let i = 0; i < urls.length; i++) {
            bar.append($(`<a href=${urls[i].url} target="_blank"><img src=${urls[i].img} class="rep0st-thumb" /></a>`));
        }

        container.find('.image-main').after(bar);
        new SimpleBar(bar[0]);

        closeBtn[0].addEventListener('click', () => {
            this.visible = false;
            bar.remove();
        });
    }
}
