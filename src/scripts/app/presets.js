import jquery from 'jquery';

export default function presets() {

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
    // console.log(_cities);

    /* set components and expose it */
    window._components = [];

    /* set services and expose it */
    window._services = [];

    /* expose jquery */
    window.jQuery = window.$ = jquery;

}
