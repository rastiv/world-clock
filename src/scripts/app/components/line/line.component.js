import Component from '../component';

import template from './line.template.html';

export default class LineComponent extends Component {

    constructor(container = 'body') {
        super();
        this.container = container;
        this.isCreated = false;
    }

    build() {
        $(this.container).append(template);
        // this.setHeight();
        this.isCreated = true;
    }

    // setHeight() {
    //     let lastItem = $('[item]:last');
    //     let height = lastItem.position().top + lastItem.height();
    //     height -= $('#line').position().top;
    //     $('#line').css({height: height + 'px'});
    // }

}