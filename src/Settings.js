import settingsTpl from './template/settingsTab.html';
import settingsStyle from './style/settings.less';
import Utils from './Utils';
import P0weruser from './P0weruser';

export default class Settings {
    constructor(app) {
        this.style = settingsStyle;
        this.app = app;
        this.tabs = {};
        this.tabContent = {};

        this.addListeners();
    }


    static clearSettings() {
        // clear module settings
        window.localStorage.setItem('activated_modules', '[]');

        // Reload pr0gramm
        p.reload();
    }


    static saveSettings(moduleList) {
        let result = [];
        let actives = moduleList.querySelectorAll(':checked');

        // Get list of checked modules
        for (let i = 0; i < actives.length; i++) {
            result.push(actives[i].dataset.module);
        }
        P0weruser.saveActivatedModules(result);

        // Reload pr0gramm
        p.reload();
    }


    addListeners() {
        window.addEventListener('settingsLoaded', () => {
            this.addSettingsTab();
        })
    }


    addSettingsTab() {
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
            let checked = P0weruser.getActivatedModules().indexOf(key) !== -1;

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

        // Load Versioninfo
        this.loadVersionInfo();

        // Add listener to clear-button
        let clearButton = this.tabContent.getElementsByClassName('clear-settings-button')[0];
        clearButton.addEventListener('click', () => {
            if (window.confirm('Einstellungen wirklich zurücksetzen?')) {
                Settings.clearSettings();
            }
        });

        // Add save-button
        let saveButton = this.tabContent.querySelectorAll('#save-addon-settings')[0];
        saveButton.addEventListener('click', () => {
            Settings.saveSettings(moduleList);
        })
    }

    loadVersionInfo() {
        let elems = {
            installed: document.getElementById('installed_version'),
            release: document.getElementById('release_version'),
            beta: document.querySelectorAll('#beta_version > span')[0]
        };

        elems.installed.innerText = GM_info.script.version;
        Settings.getVersion(false).then((version) => {
            elems.release.innerText = version;
        });
        Settings.getVersion(true).then((version) => {
            elems.beta.innerText = version;
        });
    }

    static addHint() {
        let header = document.getElementById('head-content');
        let hint = document.createElement('div');
        hint.id = 'settings_hint';
        hint.innerText = 'Bitte öffne die Einstellungen um p0weruser zu konfigurieren!';

        header.appendChild(hint);
    }

    static getVersion(getBeta) {
        let url = 'https://github.com/FlorianMaak/p0weruser/raw/master/src/template/scriptHeader.txt';

        if(getBeta) {
            url = 'https://github.com/FlorianMaak/p0weruser/raw/develop/src/template/scriptHeader.txt';
        }

        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                url: url,
                method: 'GET',
                headers: {
                    'cache-control': 'no-cache',
                    'Upgrade-Insecure-Requests': 1
                },
                onload: (res) => {
                    resolve(res.responseText.match('@version(.*)\t\t(.*)\n')[2]);
                },
                onError: (res) => {
                    reject(res);
                }
            });
        });
    }
}
