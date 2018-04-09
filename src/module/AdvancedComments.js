import Utils from '../Utils';

export default class AdvancedComments {
    constructor() {
        this.name = 'Erweiterte Kommentare';
        this.description = 'Erweitert die Kommentare um Farben und weitere Funktionen';
    }


    static handleMouseover(pId, source) {
        const elem = document.querySelectorAll(`#${pId} .comment-content`);
        source.title = elem[0].innerText;
    }


    load() {
        this.styles = require('../style/advancedComments.less');

        this.prepareComments();
    }


    prepareComments() {
        window.addEventListener('commentsLoaded', () => {
            const comments = $('.comments .comment-box .comment');
            comments.tooltip();
            for (let i = 0; i < comments.length; i++) {
                const container = $(comments[i]);
                const comment = $(container.parents('.comment-box')[0]).prev('.comment');
                const userHref = container.find('.comment-foot > a.user')[0].href;
                const isOwnComment = userHref.substr(userHref.lastIndexOf('/') + 1) === p.user.name;

                if (comment[0]) {
                    const pId = comment[0].id;
                    let elem = document.createElement('a');
                    elem.href = `#${pId}`;
                    elem.className = 'fa fa-level-up action preview-link';
                    container.find('.comment-foot').append(elem);

                    if (isOwnComment) {
                        container[0].classList.add('own-comment');
                    }

                    elem.addEventListener('mouseover', () => {
                        AdvancedComments.handleMouseover(pId, elem);
                    });
                }
            }
        });
    }
}
