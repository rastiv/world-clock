import Component from '../component';
import template from './items.template.html';

import PerfectScrollbar from 'perfect-scrollbar';

import citySvg from './../../../../images/svg/city.svg';
import mapPinSvg from './../../../../images/svg/map-pin.svg';

export default class ItemsComponent extends Component {

    constructor(container = 'body') {
        super();
        this.container = container;
        this.isCreated = false;
        this.item = '';
        this.w = 60;
        this.ps = null; // items scroll bar object
    }

    build() {
        $(this.container).append(template);
        this.setElements();
        this.isCreated = true;
    }

    setElements() {
        let _self = this;
        for (let i = 0; i < application.Cities.length; i++) {
            if (i == 0) this.addItem(application.Cities[i], 0, true);
            else this.addItem(application.Cities[i], i-1, false);
        }
        this.ps = new PerfectScrollbar('#items');
    }

    addItem(city, index, isReference = false) {
        let _self = this;
        let item = document.createElement('div');
        $(item)
            .addClass('item')
            .attr('item', city);
        let top = index * application.FrameH;
        $(item)
            .css({
                top: top + 'px',
                zIndex: (application.Cities.length - index)
            })
            .data('top', top);

        if (isReference) {
            $(item).addClass('item--reference');
            $('#reference').append(item);
        } else {
            if (index == 0) {
                $('#itemsContainer').prepend(item);
            } else {
                $('#itemsContainer').append(item);
            }
        }

        let itemScale = document.createElement('div');
        $(itemScale).addClass('item__scale');
        $(item).append(itemScale);

        this.addItemTools(itemScale);

        this.setItemScale(itemScale, city);

        let itemInfo = document.createElement('div');
        $(itemInfo).addClass('item__info');
        $(item).append(itemInfo);

        this.setItemInfoImage(itemInfo, city);

        this.setItemInfoLocation(itemInfo, city);

        this.setItemInfoClock(itemInfo, city);

        $(item).click(function() {
            let _selfItem = $(this);
            if (_selfItem.hasClass('selected')) return false;

            _self.appendItemToCarrier(_selfItem);

            application.Stage = 'item';
            $('#headerPax').addClass('arrow');
            application.UpdateTime();
            animations.showItemInfo();
        });
    }

    resetItem() {
        let _self = this;
        _self.item = '';
    }

    addItemTools(itemScale) {
        // add "close" button
        let _self = this;
        let paxX = document.createElement('div');
        $(paxX).addClass('pax');
        $(paxX).addClass('item__pax-x');
        $(paxX).html('<div class="pax__line"></div>');
        $(itemScale).append(paxX);
        $(paxX).click((e) => {
            e.stopPropagation();
            let item = $($(itemScale).parents('[item]').get(0));
            _self.removeItem(item);
        });

        // add "reference" button
        let paxA = document.createElement('div');
        $(paxA).addClass('pax');
        $(paxA).addClass('arrow');
        $(paxA).addClass('item__pax-a');
        $(paxA).html('<div class="pax__line"></div>');
        $(itemScale).append(paxA);
        $(paxA).click((e) => {
            e.stopPropagation();
            let item = $($(itemScale).parents('[item]').get(0));
            _self.referenceItem(item.attr('item'));
        });
    }

    setItemScale(elem, city) {
        let divDataRow = document.createElement('div');
        $(divDataRow).addClass('item__data-row');
        $(elem).append(divDataRow);

        let divDataCol1 = document.createElement('div');
        $(divDataCol1).addClass('item__data-col-1');
        $(divDataCol1).append('<h3>' + _cities[city].City + '</h3>');
        $(divDataCol1).append('<h6>' + _cities[city].Country + '</h6>');
        $(divDataRow).append(divDataCol1);

        let divDataCol2 = document.createElement('div');
        $(divDataCol2).addClass('item__data-col-2');
        $(divDataCol2).append('<h3 watch="' + city + '">12:01 <span>AM</span></h3>');
        $(divDataCol2).append('<h6>UTC: ' + _cities[city].UTC + ' hours</h6>');
        $(divDataRow).append(divDataCol2);

        let divScale = document.createElement('div');
        $(divScale).addClass('scale');
        $(elem).append(divScale);
    }

    setItemInfoImage(elem, city) {
        // set image
        let divImg = document.createElement('div');
        $(divImg).addClass('item__image');
        // set title
        let divTitle = document.createElement('div');
        $(divTitle).addClass('item__title--2');
        $(divTitle).append('<h4>' + _cities[city].City + '</h4><h5>' + _cities[city].Country + '</h5>');
        $(divImg).append(divTitle);
        $(elem).append(divImg);
        this.getImage(_cities[city].img)
            .then((url) =>{
                $(divImg).css({backgroundImage: 'url(' + url + ')'});
                _components['loader'].onLoadImage();
            })
    }

    setItemInfoLocation(elem, city) {
        // set map
        let divMap = document.createElement('div');
        $(divMap).addClass('item__map');

        let divMapCanvas = document.createElement('div');
        $(divMapCanvas).addClass('item__map-canvas');
        let id = 'itemMap_' + city;
        $(divMapCanvas).attr('id', id);
        $(divMap).append(divMapCanvas);

        // set location
        let ancorLocation = document.createElement('a');
        $(ancorLocation).addClass('item__map-location');
        $(ancorLocation).attr('rel', 'https://www.google.bg/maps/place/' + _cities[city].City);
        $(ancorLocation).css({backgroundImage: 'url(' + mapPinSvg + ')'});
        $(ancorLocation).click(function() {
            window.open($(this).attr('rel'), '_blank');
        });
        $(divMap).append(ancorLocation);

        $(elem).append(divMap);

        // let divLocation = document.createElement('div');
        // $(divLocation).addClass('item__location');
        // let loc = _cities[city].Location;
        // loc = loc.replace('N', '<b>N</b>');
        // loc = loc.replace('S', '<b>S</b>');
        // loc = loc.replace('W', '<b>W</b>');
        // loc = loc.replace('E', '<b>E</b>');
        // $(divLocation).html(loc);
        // let ancor = document.createElement('div');
        // $(ancor).attr('rel', 'https://www.google.bg/maps/place/' + _cities[city].City);
        // $(ancor).addClass('item__gotomap');
        // $(ancor).click(function() {
        //     window.open($(this).attr('rel'), '_blank');
        // });
        // $(divLocation).append(ancor);
        // $(elem).append(divLocation);

        // init map
        let _map = new google.maps.Map(document.getElementById(id), {
            center: {lat: _cities[city].LatLon[0], lng: _cities[city].LatLon[1]},
            zoom: 8,
            mapTypeId: 'roadmap',//roadmap, terrain, satellite, hybrid
            styles: _config.MAP_STYLE,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl : false,
            scaleControl: false,
            zoomControl: false
        });
        google.maps.event.addListenerOnce(_map, 'idle', () => {
            _components['loader'].onLoadMap();
        });
    }

    setItemInfoClock(elem, city) {
        let clock = document.createElement('div');
        $(clock).addClass('clock');

        // DEAL
        for (let i = 0; i < 30; i++) {
            let line = document.createElement('div');
            $(line).addClass('clock__line');
            if (i%5 === 0) $(line).addClass('clock__line--big');
            $(line).css({ transform: 'rotate(' + (i*6) + 'deg)' });
            $(clock).append(line);
        }

        // AM/PM
        let ampm = document.createElement('div');
        $(ampm).addClass('clock__ampm');
        $(ampm).append('<b class="clock__ampm-b" ampm="am">AM</b>');
        $(ampm).append('<b class="clock__ampm-b selected" ampm="pm">PM</b>');
        $(clock).append(ampm);

        // CIRCLE
        let circle = document.createElement('div');
        $(circle).addClass('clock__circle');
        $(clock).append(circle);

        // ARROW FOR SECONDS
        let arrowSecond = document.createElement('div');
        $(arrowSecond).addClass('clock__sarrow');
        $(arrowSecond).attr('arrow-second', '');
        $(arrowSecond).attr('seconds', '');
        $(clock).append(arrowSecond);

        // ARROW FOR MINUTES
        let arrowMinute = document.createElement('div');
        $(arrowMinute).addClass('clock__marrow');
        $(arrowMinute).attr('arrow-minute', '');
        $(arrowMinute).append('<svg viewBox="0 0 9 80" width="9" height="80"><path d="M 5 0,9 80,0 80, 5 0 Z"></path></svg>');
        $(clock).append(arrowMinute);

        // ARROW FOR HOURS
        let arrowHour = document.createElement('div');
        $(arrowHour).addClass('clock__harrow');
        $(arrowHour).attr('arrow-hour', '');
        $(arrowHour).append('<svg viewBox="0 0 9 60" width="9" height="60"><path d="M 5 0,9 60,0 60, 5 0 Z"></path></svg>');
        $(clock).append(arrowHour);

        $(elem).append(clock);
    }

    UpdateWatch(city, cityTime) {
        // update click
        let clock = $('[item="'+ city + '"] .clock');
        let arrowSecond = clock.find('[arrow-second]');
        if (arrowSecond.attr('seconds') === '') arrowSecond.attr('seconds', cityTime.second-1);
        let seconds = parseInt(arrowSecond.attr('seconds'));
        seconds++
        $(arrowSecond).attr('seconds', seconds);
        let carrierItem = $('#carrier .item').attr('item');
        if (application.Stage === 'item' && carrierItem === city) {
            // --- ampm
            clock.find('[ampm]').removeClass('selected');
            clock.find('[ampm="' + cityTime.ampm + '"]').addClass('selected');
            // --- arrow hour
            clock.find('[arrow-hour]').css({ transform: 'rotate(' + (cityTime.hour*30 + cityTime.minute*0.5) + 'deg)' });
            // --- arrow minute
            clock.find('[arrow-minute]').css({ transform: 'rotate(' + (cityTime.minute*6) + 'deg)' });
            // --- arrow seconds
            $(arrowSecond).css({ transform: 'rotate(' + (seconds*6) + 'deg)' });
        }

        // update item time
        let watch = $('[watch="'+ city + '"]');
        if (application.Stage === 'default') {
            let _hour = cityTime.hour.toString().padStart(2, '0');
            let _minute = cityTime.minute.toString().padStart(2, '0');
            watch.html(_hour + ':' + _minute + ' <span>' + cityTime.ampm + '</span>');
        }

        // update item scale
        let scale = $('[item="'+ city + '"] .scale');
        if (scale.find('.scale__line').length == 0) {
            this.makeScaleLine(scale, cityTime);
        }
        if (cityTime.second == 0) {
            scale.find('.scale__line').css({ width: '+=2px' });
        }
        if (cityTime.minute == 0) {
            this.addScaleLine(city, cityTime);
        }

    }

    makeScaleLine(scale, cityTime) {
        var line = document.createElement('div');
        $(line).addClass('scale__line');
        scale.append(line);

        let hours = [];
        let _hour = cityTime.shortHour;
        hours.push(_hour);
        for (let i = 1; i < 11; i++) {
            hours.push((_hour+i) % 12);
            hours.unshift((() => {
                let d = (_hour-i) % 12;
                if (d < 0) return 12 + d;
                else return d;
            })(_hour, i));
        }
        $(line).data('hours', hours);

        for (let i = 0; i < hours.length; i++) {
            let L1 = document.createElement('div');
            $(L1).addClass('scale__L1');
            $(L1).css({ left: (i*this.w) + 'px' });
            $(L1).html('<b>' + hours[i] + '</b>');
            $(line).append(L1);

            if (i == hours.length-1) break;

            let L2 = document.createElement('div');
            $(L2).addClass('scale__L2');
            $(L2).css({ left: ((i*this.w) + this.w/2) + 'px' });
            $(line).append(L2);
        }

        $(line).css({ width: '+=' + (cityTime.minute*2) + 'px' });
    }

    addScaleLine(city) {
        let line = $('[item="' + city + '"] .scale__line');
        let hours = line.data('hours');

        let L2 = document.createElement('div');
        $(L2).addClass('scale__L2');
        $(L2).css({ left: (((hours.length-1)*this.w) + this.w/2) + 'px' });
        line.append(L2);

        let newHour = ([...hours].pop() + 1) % 12;
        hours.push(newHour);

        let L1 = document.createElement('div');
        $(L1).addClass('scale__L1');
        $(L1).css({ left: ((hours.length-1)*this.w) + 'px' });
        $(L1).html('<b>' + newHour + '</b>');
        line.append(L1);

        line.data('hours', hours);
    }

    removeItem(item) {
        let _self = this;
        let code = item.attr('item');
        let moveUpCities = application.Cities.filter((city) => {
            return application.Cities.indexOf(city) > application.Cities.indexOf(code);
        });
        animations.removeItem(code, moveUpCities).finished.then(() => {
            application.Cities = application.Cities.filter((city) => { return city !== code; });
            item.remove();
            _self.ps.update();
            $('[selector-item="' + code + '"]').show().css({left:'0px'});
        });
    }

    referenceItem(code) {
        let item = '[item="' + code + '"]';
        let itemTop = $(item).position().top;
        $(item).clone(true).appendTo('#reference');
        $('#reference ' + item)
            .css({
                top: '0px',
                opacity: 0,
                transform: 'translateX(-100%) scale(0)'
            })
            .addClass('item--reference');

        let reference = '[item="' + application.City + '"]';
        $(reference).clone(true).appendTo('#itemsContainer');
        $('#itemsContainer ' + reference)
            .css({
                top: itemTop + 'px',
                opacity: 0,
                transform: 'translateX(100%) scale(0)',
                zIndex: $('#itemsContainer ' + item).css('z-index')
            })
            .removeClass('item--reference');
        setTimeout(() => {
            animations.referenceItem(item, reference, itemTop)
                .finished.then(() => {
                    $('#itemsContainer ' + item).remove();
                    $('#reference ' + reference).remove();
                    let newCities = [];
                    for (let i = 0; i < application.Cities.length; i++) {
                        if (i == 0) { newCities.push(code); continue; }
                        if (application.Cities[i] == code) { newCities.push(application.City); continue; }
                        newCities.push(application.Cities[i]);
                    }
                    application.Cities = [...newCities];
                    application.City = code;
                });
        },50);
    }

    appendItemToCarrier(item) {
        $('#carrier')
            .show()
            .css({ top: item.offset().top + 'px' })
            .html('');
        $('#carrier').attr('offset-top', item.offset().top);
        item.attr('position-top', item.position().top);
        item.clone(true).prependTo($('#carrier'));
        $('#carrier .item')
            .css({ top: '0px' })
            .addClass('selected');
    }

    getImage(url){
        return new Promise(function(resolve, reject){
            if (url == '') {
                resolve(citySvg);
            }
            var img = new Image();
            img.onload = function(){
                resolve(url);
            }
            img.onerror = function(){
                resolve(citySvg);
            }
            img.src = url;
        })
    }

}