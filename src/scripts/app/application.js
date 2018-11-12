import jquery from 'jquery';

export default class Application {

    constructor() {
        this.Stage = null;
        this.Cities = null;
        this.City = null;
        this.UTC = null;
        this.FrameH = 0;
    }

    Initialize() {
        /* expose jquery */
        window.jQuery = window.$ = jquery;

        /* set components and expose it */
        window._components = [];

        /* set services and expose it */
        window._services = [];

        /* import configurations and expose it */
        window._config = require('./../../data/config.json');

        /* import locale and expose it */
        let locale = [];
        let currentLanguage = _config.DEFAULT_LANGUAGE;
        _config.LANGUAGES.forEach(element => {
            locale[element] = require('./../../data/i18n/' + element + '.json');
        });
        window._locale = locale;
        window._currentLanguage = currentLanguage;

        /* import countries/cities and expose it */
        window._countries = require('./../../data/cities.json');
        window._cities = [];
        for (var k in _countries) {
            _countries[k].Cities.forEach(city => {
                city['Country'] = k;
                _cities[city.Code] = city;
            });
        }
    }

    SetStage(stage) {
        this.Stage = stage;
    }

    SetCities(cities) {
        this.Cities = cities;
    }

    SetCity(city) {
        this.City = city;
    }

    SetFrameH(frameH) {
        this.FrameH = frameH;
    }

    SetUTC(utc) {
        let _time = utc.currentDateTime.split('T')[1].replace(/Z$/, '').split(':');
        this.UTC = {
            hour: this.TrimHeadZero(_time[0]),
            minute: this.TrimHeadZero(_time[1]),
            second: new Date().getSeconds(),
            shortHour: 0,
            ampm: ''
        };
        this.UTC.shortHour = this.UTC.hour % 12;
        (this.UTC.hour > 12) ? this.UTC.ampm = 'pm' : this.UTC.ampm = 'am';
    }

    StartTime() {
        setInterval(() => {
            application.UTC.second++;
            application.UpdateTime();
        }, 1000);
    }

    UpdateTime() {
        if (application.UTC.second == 60) {
            application.UTC.second = 0;
            application.UTC.minute ++;
        }
        if (application.UTC.minute == 60) {
            application.UTC.minute = 0;
            application.UTC.hour ++;
        }
        if (application.UTC.hour == 24) {
            application.UTC.hour = 0;
        }
        application.UTC.shortHour = application.UTC.hour % 12;
        (application.UTC.hour > 12) ? application.UTC.ampm = 'pm' : application.UTC.ampm = 'am';
        // console.log(application.UTC);

        for (let i = 0; i < application.Cities.length; i++) {
            let timeCorrection = this.TimeCorrection(application.Cities[i]);
            _components['items'].UpdateWatch(application.Cities[i], timeCorrection);
        }
    }

    TimeCorrection(city) {
        let utc = _cities[city].UTC.split(':');
        let utcHours = parseInt(utc[0]);
        let utcMinutes = 0;
        if (utc.length > 1) utcMinutes = parseInt(utc[1]);
        if (utcHours < 0) utcMinutes *= (-1);

        let result = {...application.UTC};

        result.minute += utcMinutes;
        if (result.minute < 0) {
            result.minute += 60;
            result.hour--;
        }
        if (result.minute >= 60) {
            result.minute %= 60;
            result.hour++;
        }

        result.hour += utcHours;
        if (result.hour < 0) {
            result.hour += 24;
        }
        if (result.hour >= 24) {
            result.hour -= 24;
        }

        result.shortHour = result.hour % 12;
        (result.hour > 12) ? result.ampm = 'pm' : result.ampm = 'am';

        return result;
    }

    TrimHeadZero(arg) {
        if (/^0+$/.test(arg)) return 0;
        return parseInt(arg.replace(/^0+/, ''));
    }

}