import Component from './../component';
import template from './header.template.html';

import PerfectScrollbar from 'perfect-scrollbar';

export default class HeaderComponent extends Component {

    constructor(container = 'body') {
        super();
        this.container = container;
        this.isCreated = false;
        this.ps = null; // items scroll bar objects
    }

    build() {
        $(this.container).append(template);
        this.setElements();
        this.setEvents();
        this.isCreated = true;
    }

    setElements() {
        // init selectable cities
        let cityKey = [];
        for (let k in _cities) cityKey.push(k);
        cityKey.sort();
        cityKey.forEach((key) => {
            let city = _cities[key];
            let divCity = document.createElement('div');
            $(divCity).addClass('selector__city');
            $(divCity).attr('selector-item', key);
            $(divCity).append('<h3>' + city.City + '</h3>');
            $(divCity).append('<h5>' + city.Country + '</h5>');
            $(divCity).click((e) => {
                e.stopPropagation();
                application.Stage = 'default';
                $('#headerPax').removeClass('close');
                $('#items [item]').css({top: '+=' + application.FrameH + 'px'});
                application.Cities.splice(1, 0, key);
                _components['items'].addItem(key, 0);
                animations.showSelector();
                animations.addNewItem(key).finished.then(() => {
                   $('[selector-item="' + key + '"]').hide();
                });
            });
            $('#selector').append(divCity);
        });
        application.Cities.forEach((city) => {
            $('[selector-item="' + city + '"]').hide();
        });
        this.ps = new PerfectScrollbar('#selector');
    }

    setEvents() {
        var _self = this;
        $('#headerPax').click(function() {

            if (application.Stage == 'default') {

                application.Stage = 'selector';
                $('#headerPax').addClass('close');
                animations.hideSelector();

            } else if(application.Stage == 'selector') {

                application.Stage = 'default';
                $('#headerPax').removeClass('close');
                animations.showSelector();

            } else if(application.Stage == 'item') {

                $('#headerPax').removeClass('arrow');
                application.Stage = 'default';
                _components['items'].resetItem();
                animations.hideItemInfo().finished.then(() => {
                    $('#carrier').html('').hide();
                });

            }
        });

    }

}