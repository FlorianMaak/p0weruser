import settingsTpl from '../template/settingsTab.html';
import settingsStyle from '../style/settings.less';
import Utils from '../Utils.js';

export default class Settings {
    constructor(app) {
        this.style = settingsStyle;
        this.app = app;
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
        let moduleList = document.createElement('div');
        let modules = this.app.modules;

        this.tabContent.innerHTML = settingsTpl;
        let list = this.tabContent.querySelectorAll('#addon-list')[0];

        // Add list of modules
        Object.keys(modules).forEach((key) => {
            let checked = this.app.getActivatedModules().indexOf(key) !== -1;

            // Build module-row
            moduleList.innerHTML += `
                <input type="checkbox" 
                       class="box-from-label"
                       name="${key}" 
                       id="${key}" 
                       data-module="${key}" ${checked ? ' checked="checked"' : ''}>
                <label for="${key}">
                    ${modules[key].name}
                    <span>${modules[key].description}</span>
                </label>`;
        });

        list.appendChild(moduleList);
        this.tabs.getElementsByClassName('active')[0].classList.remove('active');
        button.classList.add('active');

        // Add save-button
        let saveButton = this.tabContent.querySelectorAll('#save-addon-settings')[0];
        saveButton.addEventListener('click', () => {
            this.saveSettings(moduleList);
        })
    }

    saveSettings(moduleList) {
        let result = [];
        let actives = moduleList.querySelectorAll(':checked');

        // Get list of checked modules
        for (let i = 0; i < actives.length; i++) {
            result.push(actives[i].dataset.module);
        }
        this.app.saveActivatedModules(result);

        // Reload pr0gramm
        p.reload();
    }
}
