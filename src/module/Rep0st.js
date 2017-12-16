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
    }


    addButton(container) {
        const template = $(`<a class="repost-link"><span class="fa fa-copy"></span> rep0st?</a>`);
        let sourceElement = container.find('.item-source');
        sourceElement.after(template);

        template[0].addEventListener('click', () => {
            this.checkImage(container);
        });
    }


    checkImage(container) {
        const src = container.find('.item-image')[0].src;

        // Add action
    }
}
