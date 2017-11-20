import Utils from '../Utils';

export default class FilterMarks {
    constructor() {
        this.name = 'Filtermarkierung';
        this.description = 'Markiert Medien entsprechend ihres Filters.'
    }


    load() {
        this.styles = require('../style/filterMarks.less');
        this.overrideViews();
    }


    overrideViews() {
        let _this = this;

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


    static displayFilterLabel(itemData, $container) {
        let filter = FilterMarks.getFilter(itemData);
        let badge = document.createElement('span');
        badge.className = 'badge';

        badge.classList.toggle(filter);
        badge.innerText = filter.toUpperCase();

        $container.find('.item-details')[0].appendChild(badge);
    }


    static getFilter(itemData) {
        switch(itemData.flags) {
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
}
