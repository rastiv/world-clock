import Component from '../component';

import template from './selector.template.html';

export default class SelectorComponent extends Component {

    constructor(container = 'body') {
        super();
        this.container = container;
        this.isCreated = false;
    }

    build() {
        $(this.container).append(template);
        this.setElements();
        this.setEvents();
        this.isCreated = true;
    }

    setElements() {

    }

    setEvents() {

    }

}