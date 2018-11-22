import Settings from '../Settings';

export default class Friends {
    constructor() {
        this.id = 'Friends';
        this.name = '"Freunde"';
        this.description = 'Markiere Benutzer um diese hervorzuheben und leichter zu erreichen.';
        this.friends = [];
    }


    load() {
        this.styles = require('../style/friends.less');

        this.friends = Friends.getFriends();
        this.addListeners();
    }

    getSettings() {
        return [
            {
                id: 'comments',
                title: 'Kommentarfarben',
                description: 'Färbe Kommentare deiner Freunde ein!'
            }
        ];
    }

    addListeners() {
        window.addEventListener('profileLoaded', e => {
            if (e.username !== p.user.name) {
                let isFriend = this.isFriend(e.username);
                this.addButton();
                this.toggleButton(e.username);

                this.button.onclick = () => {
                    this.toggleButton(e.username);
                    this.toggleFriend(e.username);
                };
            }
        });

        if (Settings.get('Friends.settings.comments')) {
            window.addEventListener('commentsLoaded', () => {
                const comments = $('.comments .comment-box .comment');

                for (let i = 0; i < comments.length; i++) {
                    let container = $(comments[i]);
                    const userHref = container.find('.comment-foot > a.user')[0].href;
                    const username = userHref.substr(userHref.lastIndexOf('/') + 1);

                    container[0].classList.toggle('friend', !!this.friends[username]);
                }
            });
        }
    }

    addButton() {
        this.button = document.createElement('span');
        document.getElementsByClassName('user-head')[0].appendChild(this.button);
    }

    toggleButton(username) {
        let isFriend = this.isFriend(username);
        this.button.innerText = '';
        let icon = document.createElement('span');
        icon.className = 'fa fa-user';
        this.button.appendChild(icon);
        this.button.className = isFriend ? 'action user-unfriend' : 'action user-friend';
        this.button.appendChild(document.createTextNode(isFriend ? 'Als Freund entfernen' : 'Als Freund hinzufügen'));
    }

    static getFriends() {
        let friends = JSON.parse(Settings.get('friends'));

        if (friends === true) {
            friends = {};

            Settings.set('Friends.settings.friends', '{}}');
        }

        return friends;
    }

    updateFriends() {
        Settings.set('Friends.settings.friends', JSON.stringify(this.friends));
    }

    isFriend(username) {
        return !!this.friends[username];
    }

    toggleFriend(username) {
        this.friends[username] ? delete this.friends[username] : this.friends[username] = Date.now();
        this.toggleButton(username);

        this.updateFriends();
    }

    updateFriend(username) {
        this.friends[username] = Date.now();

        this.updateFriends();
    }
}
