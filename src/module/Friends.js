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
        this.friends = JSON.parse(Settings.get('friends'));

        if (this.friends === true) {
            this.friends = {};

            Settings.set('friends', '{}}');
        }

        this.addListeners();
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

    updateFriends() {
        Settings.set('friends', JSON.stringify(this.friends));
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
