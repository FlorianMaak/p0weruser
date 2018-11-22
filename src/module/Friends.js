import Settings from '../Settings';
import Utils from '../Utils';

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
        let _this = this;

        window.addEventListener('profileLoaded', e => {
            if (e.username !== p.user.name) {
                this.addButton();
                this.toggleButton(e.username);

                this.button.onclick = () => {
                    this.toggleButton(e.username);
                    this.toggleFriend(e.username);
                };
            }
        });

        window.addEventListener('showNotifications', e => {
            this.showFriends(e.notificationCenter);
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

        p.View.Stream.Item = p.View.Stream.Item.extend({
            show: function (rowIndex, itemData, defaultHeight, jumpToComment) {
                this.parent(rowIndex, itemData, defaultHeight, jumpToComment);

                let btn = document.createElement('span');
                btn.className = 'fa fa-share share-button';

                btn.onclick = () => {
                    _this.showShareModal(itemData);
                };

                this.$itemVote[0].after(btn);
            }
        });
    }

    showFriends(notificationCenter) {
        let container = document.getElementById('friends');
        container.innerHTML = '';

        for (let user in this.friends) {
            let entry = document.createElement('li');
            entry.style.backgroundColor = this.friends[user];
            entry.innerText = user.substring(0, 2);
            entry.title = user;
            entry.onclick = () => {
                notificationCenter.toggleMenu();
                window.open('/user/' + user, '_blank');
            };

            container.appendChild(entry);
        }
    }

    showShareModal(itemData) {
        window.alert('ToDo!');
        console.log(itemData);
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
        let friends = JSON.parse(Settings.get('Friends.settings.friends'));

        if (friends === true) {
            friends = {};

            Settings.set('Friends.settings.friends', '{}');
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
        this.friends[username] ? delete this.friends[username] : this.friends[username] = Utils.randomColor();
        this.toggleButton(username);

        this.updateFriends();
    }
}
