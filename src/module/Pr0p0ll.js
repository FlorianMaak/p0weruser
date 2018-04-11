import Settings from '../Settings';

export default class Pr0p0ll {
    constructor() {
        this.id = 'Pr0p0ll';
        this.name = 'Pr0p0ll Integration';
        this.description = 'Erhalte Benachrichtigungen über neue Umfragen!';
        this.showNotification = Settings.get('Pr0p0ll.settings.show_notification');
        this.token = Settings.get('Pr0p0ll.settings.user_token');
        this.apiUrl = 'https://pr0p0ll.com/?p=viewjson&id=';
    }


    load() {
        this.styles = require('../style/pr0p0ll.less');
        this.inboxLink = document.getElementById('inbox-link');
        this.template = `<a href="https://pr0p0ll.com/?p=user" target="_blank" class="empty pr0p0ll-count fa fa-edit head-link"><span>0</span></a>`;
        this.inboxLink.after($(this.template)[0]);
        this.target = this.inboxLink.nextSibling.firstChild;

        if (this.token !== 'true') {
            this.addListener();
        }
    }


    getSettings() {
        return [
            {
                id: 'show_notification',
                title: 'Desktopbenachrichtigung',
                description: 'Zeige eine Desktopbenachrichtigung bei neuen Umfragen!',
            },
            {
                id: 'user_token',
                title: '"Token für Notificator"',
                description: 'Damit authentifizierst du dich gegenüber pr0p0ll. [<a href="https://pr0p0ll.com/?p=tokengen" target="_blank">Token generieren</a>]',
                type: 'text'
            },
        ];
    }


    addListener() {
        if (this.token) {
            window.addEventListener('userSync', () => {
                this.fetchCounter().then(res => {
                    this.updateCounter(res.openPolls);
                });
            });

            window.addEventListener('commentsLoaded', e => {
                let links = e.data.find('a[href*="pr0p0ll"][href*="pollid="]');
                this.addLinks(links);
            });
        } else {
            window.alert('Bitte öffne die Einstellungen um das Pr0p0ll-Modul zu konfigurieren.');
        }
    }


    addLinks(links) {
        for (let i = 0; i < links.length; i++) {
            let icon = document.createElement('a');
            icon.className = 'fa fa-bar-chart pr0p0ll-link';

            icon.addEventListener('click', () => {
                const id = parseInt(new URL(links[i].href).searchParams.get('pollid'));
                this.showDiagramm(id);
            });

            links[i].after(icon);
        }
    }


    showDiagramm(id) {
        let getDiagramm = () => {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    url: this.apiUrl + id,
                    method: 'GET',
                    onload: (res) => {
                        const response = JSON.parse(res.responseText);
                        if (response.error) {
                            reject(response.error);
                        }

                        resolve(response);
                    }
                });
            });
        };

        getDiagramm().then(
            result => {
                console.log(result);
            },
            error => {
                window.alert(error);
            }
        );
    }


    fetchCounter() {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                url: `https://pr0p0ll.com/?p=notify&token=${this.token}`,
                method: 'GET',
                onload: (res) => {
                    resolve(JSON.parse(res.responseText));
                }
            });
        })
    }


    updateCounter(score) {
        score = parseInt(score) || 0;
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

        this.target.parentNode.classList.toggle('empty', score === 0 || !score);
        this.target.innerText = score;
        Settings.set('Pr0p0ll.settings.last_count', score);
    }
}
