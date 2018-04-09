import Settings from '../Settings';

export default class Pr0p0ll {
    constructor() {
        this.name = 'Pr0p0ll Integration';
        this.description = 'Erhalte Benachrichtigungen über neue Umfragen!';
        this.showNotification = Settings.get('Pr0p0ll.settings.show_notification');
        this.token = Settings.get('Pr0p0ll.settings.user_token');
    }


    load() {
        this.styles = require('../style/pr0p0ll.less');
        this.inboxLink = document.getElementById('inbox-link');
        this.template = `<span class="poll-count">0</span>`;
        this.target = this.inboxLink.appendChild($(this.template)[0]);

        if (this.token !== 'true') {
            this.addListener();
        }
    }


    getSettings() {
        return [
            {
                id: 'show_notification',
                title: 'Desktopbenachrichtigung',
                description: 'Zeige eine Desktopbenachrichtigung bei neuen Umfragen!'
            },
            {
                id: 'user_token',
                title: 'Accesstoken',
                description: 'Damit authentifizierst du dich gegenüber pr0p0ll.',
                type: 'text'
            },
        ];
    }


    addListener() {
        window.addEventListener('userSync', () => {
            this.fetchCounter().then(res => {
                this.updateCounter(res.openPolls);
            });
        });
    }


    fetchCounter() {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                url: `https://pr0p0ll.com/?p=notify&token=${this.token}`,
                responseType: 'json',
                method: 'GET',
                onload: (res) => {
                    resolve(JSON.parse(res.responseText));
                }
            });
        })
    }


    updateCounter(score) {
        if (this.showNotification && Settings.get('Pr0p0ll.settings.last_count') < score) {
            GM_notification(
                'Du hast ' + (score === 1 ? 'eine neue Umfrage!' : score + ' neue Umfragen!'),
                'pr0p0ll',
                'https://pr0p0ll.com/src/favicon.png',
                function () {
                    window.focus();
                    window.location.href = 'https://pr0p0ll.com/?p=user';
                }
            );
        }

        this.target.innerText = parseInt(score) || 0;
        Settings.set('Pr0p0ll.settings.last_count', score);
    }
}
