import SimpleBar from '../../bower_components/simplebar/dist/simplebar.js';

export default class NotificationCenter {
    constructor() {
        this.name = 'Nachriten Schnellzugriff';
        this.description = 'Öffnet neue Benachrichtigungen in einem kleinen Menü';
    }


    load() {
        this.menuOpen = false;
        this.template = require('../template/notificationCenter.html');
        this.templateEntry = require('../template/notificationEntry.html');
        this.style = require('../style/notificationCenter.less');
        this.icon = $('#inbox-link');
        this.elem = document.createElement('div');
        this.elem.innerHTML = this.template;

        this.elem.id = 'notification-center';
        document.body.appendChild(this.elem);
        this.messageContainer = document.getElementById('new-messages');

        this.addListener();
    }


    addListener() {
        this.icon.unbind('click');
        this.icon[0].addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });

        window.addEventListener('click', (e) => {
            if(this.menuOpen) {
                if(! $(e.target).parents('#notification-center')[0]) {
                    e.preventDefault();
                    this.toggleMenu();
                }
            }
        });
    }


    toggleMenu() {
        this.menuOpen = !this.menuOpen;
        this.icon[0].classList.toggle('active');
        this.elem.classList.toggle('visible');
        this.messageContainer.innerHTML = '<span class="fa fa-spinner fa-spin"></span>';
        this.messageContainer.classList.add('loading');

        this.getNotifications().then((notifications) => {
            p.user.setInboxLink(0);
            let messages = notifications.messages;
            this.messageContainer.innerHTML = '';
            this.messageContainer.classList.remove('loading');

            if(messages <= 0) {
                let elem = document.createElement('li');
                elem.innerText = 'Keine neuen Benachrichtigungen!';
                elem.className = 'no-notifications';
                this.messageContainer.appendChild(elem);
                return false;
            }

            for(let i = 0; i < messages.length; i++) {
                this.addEntry(NotificationCenter.getTitle(
                    messages[i]),
                    messages[i].name,
                    messages[i].created,
                    messages[i].thumb,
                    messages[i].mark,
                    messages[i].itemId,
                    messages[i].id,
                    messages[i].message
                );
            }

            new SimpleBar(this.messageContainer);
        });
    }


    static getTitle(message) {
        return message.thumb === null ? 'Private Nachricht' : 'Kommentar';
    }


    getNotifications() {
        return new Promise((resolve, reject) => {
            p.api.get('inbox.all', {}, resolve, reject);
        });
    }


    addEntry(title, user, date, image, mark, id, cId, msg) {
        let elem = document.createElement('li');
        let img = '<img src="//thumb.pr0gramm.com/##THUMB##" class="comment-thumb">';
        let url = image ? `/new/${id}:comment${cId}` : `/inbox/messages`;

        if(! image) {
            img = '<span class="message fa fa-envelope"></span>';
        } else {
            img = img.replace('##THUMB', image);
        }

        elem.innerHTML = this.templateEntry.replaceArray(
            ['##TITLE##', '##USER##', '##TIME##', '##THUMB##', '##URL##', '##MARK##', '##TEXT##'],
            [title, user, new Date(date * 1000).relativeTime(), img, url, mark, msg]
        );

        this.messageContainer.appendChild(elem);
    }
}
