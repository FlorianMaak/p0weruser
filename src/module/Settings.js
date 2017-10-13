import settingsTpl from '../template/settingsTab.html';
import Utils from '../Utils.js';

export default class Settings {
    constructor() {
        this.tabs = {};
        this.tabContent = {};

        this.addListeners();
    }


    addListeners() {
        window.addEventListener('settingsLoaded', (e) => {
            this.addSettingsTab();
        })
    }


    addSettingsTab(tabName) {
        this.tabContent = document.querySelectorAll('.pane.form-page')[0];
        this.tabs = document.getElementsByClassName('tab-bar')[0];

        // Create button-element
        let button = document.createElement('a');
        button.innerText = 'Addons';
        button.href = '/settings/addons';

        // Add listener
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleSettingsTab(button);
        });

        // Append element to tab-lsit
        this.tabs.appendChild(button);
    }


    toggleSettingsTab(button) {
        Utils.changeLocation('/settings/addons');

        this.tabContent.innerHTML = settingsTpl;
        this.tabs.getElementsByClassName('active')[0].classList.remove('active');
        button.classList.add('active');
    }
}
