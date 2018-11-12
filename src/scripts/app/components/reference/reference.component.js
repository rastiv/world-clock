import Component from '../component';

import template from './reference.template.html';

export default class ReferenceComponent extends Component {

    constructor(container = 'body') {
        super();
        this.container = container;
        this.isCreated = false;
    }

    build() {
        $(this.container).append(template);
        this.isCreated = true;
        this.events();
    }

    events() {

    }

}