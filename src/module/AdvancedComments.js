import Utils from '../Utils';

export default class AdvancedComments {
    constructor() {
        this.name = 'Erweiterte Kommentare';
        this.description = 'Erweitert die Kommentare um Farben und weitere Funktionen';
    }


    load() {
        this.styles = require('../style/advancedComments.less');

        this.prepareComments();
    }

    static handleMouseover(pId, source) {
        const elem = document.querySelectorAll(`#${pId} .comment-content`);
        source.title = elem[0].innerText;
    }


    prepareComments() {
        window.addEventListener('commentsLoaded', () => {
            const comments = $('.comments .comment-box .comment');
            comments.tooltip();
            for(let i = 0; i < comments.length; i++) {
                const container = $(comments[i]);
                const comment = $(container.parents('.comment-box')[0]).prev('.comment');

                if(comment[0]) {
                    const pId = comment[0].id;
                    let elem = document.createElement('a');
                    elem.href = `#${pId}`;
                    elem.className = 'fa fa-level-up action preview-link';
                    container.find('.comment-foot').append(elem);

                    elem.addEventListener('mouseover', () => {
                        AdvancedComments.handleMouseover(pId, elem);
                    });
                }
            }
        });
    }
}
