import Component from '../component';

import template from './loader.template.html';

export default class LoaderComponent extends Component {

    constructor(container = 'body') {
        super();
        this.container = container;
        this.isCreated = false;
        this.loadedMaps = 0;
        this.loadedImages = 0;
        this.isPreloadFinished = false;
    }

    build() {
        $(this.container).append(template);
        this.isCreated = true;
        this.events();
    }

    events() {
        let _self = this;
        $('#loaderTeyAgain').click(function() {
            animations.messageToLoader().finished.then(() => {
                _self.loadUtc();
            });
        });
    }

    loadUtc() {
        _services['utc'].getUtc()
            .then((response) => {
                application.SetUTC(response);
                return new Promise((resolve) => { resolve(true); });
            })
            .then((response) => {
                _components['carrier'].build();
                _components['reference'].build();
                _components['items'].build();
                _components['line'].build();
                _components['selector'].build();
                application.UpdateTime();
            })
            .catch((error) => {
                console.log(error);
                setTimeout(() => {
                    animations.loaderToMessage();
                }, 400);
            });
    }

    onLoadMap() {
        this.loadedMaps++;
        this.initialLoadFinished();
    }

    onLoadImage() {
        this.loadedImages++;
        this.initialLoadFinished();
    }

    initialLoadFinished() {
        if (application.UTC === null) return false;
        if (this.isPreloadFinished) return false;
        if (this.loadedMaps < application.Cities.length) return false;
        if (this.loadedImages < application.Cities.length) return false;
        $('#loader').addClass('hide');
        $('#headerPax').addClass('show');
        $('#line').addClass('show');
        $('#reference').addClass('show');
        $('#items').addClass('show');
        _components['items'].ps.update();
        application.StartTime();
        this.isPreloadFinished = true;
    }

}