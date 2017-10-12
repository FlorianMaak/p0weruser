import settingsTpl from '../template/dummy.html';
import settingsStyle from '../style/dummy.less';

/**
 * Represents a simple dummy-module
 */
class Dummy {
    constructor() {
        this.header = document.getElementById('head-menu');

        this.addDummyOutput();
    }


    /**
     * Adds simple dummy-output to head-bar
     */
    addDummyOutput() {
        this.template = document.createElement('div');
        this.template.innerHTML = settingsTpl;
        this.header.appendChild(this.template);

        console.log('Loaded Dummy!');
    }
}

export default Dummy;
