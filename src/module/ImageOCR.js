import Tesseract from 'tesseract.js';
import blobUtil from 'blob-util';
import Utils from '../Utils';

export default class ImageOCR {
    constructor() {
        this.name = 'Texterkennung';
        this.description = 'Extrahiere Text aus Bildern.'
    }


    load() {
        this.styles = require('../style/imageOCR.less');

        this.addButton();
    }


    addButton() {
        let _this = this;

        p.View.Stream.Item = p.View.Stream.Item.extend({
            show: function (rowIndex, itemData, defaultHeight, jumpToComment) {
                this.parent(rowIndex, itemData, defaultHeight, jumpToComment);

                if(this.$image[0].tagName !== 'VIDEO') {
                    let button = document.createElement('span');

                    button.innerHTML = `<span class="fa fa-search ocr-button"></span>`;
                    this.$image.parent()[0].appendChild(button);

                    button.addEventListener('click', () => {
                        _this.checkImage();
                    });
                }
            }
        });

        // Fix audio-controls
        Utils.addVideoConstants();
    }


    checkImage() {
        let image = document.getElementsByClassName('item-image')[0];

        GM_xmlhttpRequest({
            url: image.src,
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                'cache-control': 'no-cache',
                'Upgrade-Insecure-Requests': 1
            },
            onload: (res) => {
                Tesseract.recognize(new Blob([new Uint8Array(res.response)]), {
                    lang: 'deu'
                }).then(result => {
                    this.togglePopup(result.text);
                }).catch(err => {
                    this.togglePopup();
                });
            }
        });
    }


    togglePopup(text = false) {
        if (!text) {
            //close
            return false;
        }

        // show
        console.log(text);
    }
}
