import SimpleBar from 'simplebar';

export default class Chat {
    constructor() {
        this.id = 'Chat';
        this.name = '[WIP] Chat';
        this.description = 'Missbrauche die PMs als Chat.';
    }

    load() {
        this.styles = require('../style/chat.less');

        this.overrideView();
    }

    overrideView() {
        p.View.InboxMessages.Messages = p.View.InboxMessages.Messages.extend({
            show: function () {
                this.data.messages.reverse();
                this.parent();

                let pane = $('.pane');
                let top = pane.offset().top;
                let iPane = pane.find('.inbox-messages');
                let cPane = pane.find('.conversations-pane');

                // Handle height
                pane.addClass('private-message-pane');
                pane.css('height', `calc(100vh - ${top}px)`);

                // Handle scrollbars
                let iScroll = new SimpleBar(iPane[0]);
                let cScroll = new SimpleBar(cPane[0]);

                $(iScroll.getScrollElement()).scrollTop(iScroll.getScrollElement().scrollHeight)
            }
        });
    }
}
