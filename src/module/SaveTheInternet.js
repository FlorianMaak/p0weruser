import Settings from '../Settings';

export default class SaveTheInternet {
    constructor() {
        this.id = 'SaveTheInternet';
        this.name = 'SaveTheInternet - Notification';
        this.description = 'Nicht deaktivierbar!';
        this.lastPost = 0;
        this.elem = null;
        this.loaded = false;

        this.load();
    }


    load() {
        if (!this.loaded) {
            this.lastPost = +Settings.get('save_the_internet');
            this.styles = require('../style/saveTheInternet.less');

            window.addEventListener('userSync', (e) => {
                fetch('https://pr0gramm.com/api/items/get?flags=15&user=c0mmunityrat').then(r => r.json()).then(res => {
                    if (res.items[0].id !== this.lastPost && !this.elem) {
                        this.showNotification(res.items[0].id);
                    }
                });
            });
        }
    }

    showNotification(postId) {
        let elem = document.createElement('a');
        elem.innerText = 'SaveTheInternet - Es gibt Neuigkeiten!';
        elem.className = 'news-label';
        elem.href = 'https://pr0gramm.com/top/' + postId;
        elem.target = '_blank';
        this.elem = elem;

        elem.onclick = () => this.markAsRead(postId);

        document.getElementById('pr0gramm-logo-link').after(elem);
    }

    markAsRead(postId) {
        this.elem.remove();
        this.lastPost = postId;
        Settings.set('save_the_internet', this.lastPost);
    }
}
