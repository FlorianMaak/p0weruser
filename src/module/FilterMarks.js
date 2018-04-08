import Utils from '../Utils';

export default class FilterMarks {
    constructor() {
        this.name = 'Filtermarkierung';
        this.description = 'Markiert Medien entsprechend ihres Filters.'
    }


    static displayFilterLabel(itemData, $container) {
        let filter = FilterMarks.getFilter(itemData);
        let badge = document.createElement('span');
        badge.className = 'badge';
        badge.classList.toggle(filter);
        badge.innerText = filter.toUpperCase();

        $container.find('.item-details')[0].appendChild(badge);
    }


    static getFilter(itemData) {
        switch (itemData.flags) {
            case 1:
                return 'sfw';
            case 2:
                return 'nsfw';
            case 4:
                return 'nsfl';
            case 8:
                return 'nsfp';
        }
    }


    getSettings() {
        return [
            {
                id: 'stream_filters',
                title: 'Filter in Streams',
                description: 'Filteecken in Listen anzeigen?',
                type: 'checkbox',
            },
            {
                id: 'detail_filters',
                title: 'Filter in Medienansicht',
                description: 'Filterlabel in der Detailansicht einblenden?',
                type: 'checkbox',
            },
            {
                id: 'stream_benis',
                title: 'Benis beim Mouseover',
                description: 'Benis in der Übersicht einblenden?',
                type: 'checkbox',
            }
        ];
    }


    load() {
        this.styles = require('../style/filterMarks.less');
        this.overrideViews();
    }


    overrideViews() {
        let _this = this;

        // Handle stream-view
        p.View.Stream.Main.prototype.buildItem = function (item) {
            return (`<a class="silent thumb filter ${FilterMarks.getFilter(item)}" id="item-${item.id}" href="${this.baseURL + item.id}"><img src="${item.thumb}"/>` +
                `<span class="benis-info ${item.up - item.down > 0 ? 'up' : 'down'}">${item.up - item.down}</span></a>`);
        };

        // Handle detail-view
        p.View.Stream.Item = p.View.Stream.Item.extend({
            show: function (rowIndex, itemData, defaultHeight, jumpToComment) {
                this.parent(rowIndex, itemData, defaultHeight, jumpToComment);
                FilterMarks.displayFilterLabel(itemData, this.$container);
            }
        });

        // Fix audio-controls
        Utils.addVideoConstants();
    }
}
