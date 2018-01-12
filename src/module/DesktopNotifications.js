// Inspired by komas pr0gramm Desktop-Notification
// https://greasyfork.org/de/scripts/9984-pr0gramm-desktop-notification/code
export default class DesktopNotifications {
    constructor() {
        this.name = 'Desktop Notifications';
        this.description = 'Informiert bei neuen Benachrichtigungen';
        this.notifications = 0;
    }


    load() {
        window.addEventListener('userSync', (e) => {
            if (e.data.inboxCount > this.notifications) {
                GM_notification(
                    'Du hast ' + (e.data.inboxCount === 1 ? 'eine ungelesene Nachricht!' : e.data.inboxCount + ' ungelesene Nachrichten!'),
                    'pr0gramm',
                    'http://pr0gramm.com/media/pr0gramm-favicon.png',
                    function () {
                        window.focus();
                        window.location.href = '/inbox/unread';
                    }
                );
            }

            this.notifications = e.data.inboxCount;
        })
    }
}
