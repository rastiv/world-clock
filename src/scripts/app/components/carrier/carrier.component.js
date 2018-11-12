import Component from '../component';

import template from './carrier.template.html';

export default class CarrierComponent extends Component {

    constructor(container = 'body') {
        super();
        this.container = container;
        this.isCreated = false;
    }

    build() {
        $(this.container).append(template);
        this.isCreated = true;
    }

}