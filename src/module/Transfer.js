export default class Transfer {
    constructor() {
        this.id = 'Transfer';
        this.name = 'Transfer Notice';
        this.description = 'Alles hat ein Ende - nur die Wurst hat zwei.';
    }


    load() {
        this.styles = require('../style/transfer.less');
        let hide = localStorage.getItem('hide_transfer') !== null;

        if(!hide) {
            p.View.Overlay.TransferOverlay = p.View.Base.extend({
                template: require('../template/transferOverlay.html')
            });

            p.mainView.showOverlay(p.View.Overlay.TransferOverlay);

            this.checkbox = document.getElementById('hide_transfer');

            this.checkbox.onchange = () => {
                if(this.checkbox.checked) {
                    localStorage.setItem('hide_transfer', 'true');
                }
            };
        }
    }
}
