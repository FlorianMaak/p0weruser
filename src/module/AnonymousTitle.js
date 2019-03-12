import Settings from '../Settings';

export default class AnonymousTitle {
    constructor() {
        this.id = 'AnonymousTitle';
        this.name = 'Anonymous Title';
        this.description = 'Entfernt den Top Tag aus dem Titel oder wähle einen eigenen Titel.';
        this.listenerAdded = false;
        this.customTitle = Settings.get('AnonymousTitle.settings.custom_title');
    }

    load() {
        this.addListeners();

    }

    addListeners() {
        if (!this.listenerAdded) {
            this.listenerAdded = true;
            window.addEventListener('locationChange', (e) => {
                if (this.customTitle) {
                    this.changeTitle(this.customTitle);
                }
                else if(e.isPost) {
                    this.changeTitle(document.title.substring(document.title.indexOf("–") + 2));
                }
            });
            $(document).ajaxComplete((event, request, settings) => {
                if (this.customTitle) {
                    this.changeTitle(this.customTitle);
                }
                else if(document.title[0] === '"') {
                    this.changeTitle(document.title.substring(document.title.indexOf("–") + 2));
                }
            });
        }
    }

    changeTitle(title) {
        document.title = title;
    }

    getSettings() {
        return [
            {
                id: 'custom_title',
                title: 'cust0m Title',
                description: 'Wähle einen eigenen Title für die Seite.',
                type: 'text'
            }
        ];
    }
}
