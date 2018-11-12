const loader = require('load-script');

/* import fonts */
import './../fonts/open-sans/open-sans.css';
import './../styles/perfect-scrollbar.css';

/* import/init Application */
import Application from './app/application';
window.application = new Application();
application.Initialize();
application.SetStage('default');
application.SetCities(_config.DEFAULT_CITIES);
application.SetCity(_config.DEFAULT_CITIES[0]);

/* import/init Components */
import HeaderComponent from './app/components/header/header.component';
import LoaderComponent from './app/components/loader/loader.component';
import CarrierComponent from './app/components/carrier/carrier.component';
import RefereneceComponent from './app/components/reference/reference.component';
import ItemsComponent from './app/components/items/items.component';
import LineComponent from './app/components/line/line.component';
import SelectorComponent from './app/components/selector/selector.component';

/* import Services */
import UtcService from './app/services/utc.service';

/* get current UTC Time */
_services['utc'] = new UtcService();

/* import/expose animations */
import Animations from './app/animations';
window.animations = new Animations();

_components['header'] = new HeaderComponent();
_components['header'].build();

_components['loader'] = new LoaderComponent();
_components['loader'].build();
_components['loader'].loadUtc();

_components['carrier'] = new CarrierComponent();
_components['reference'] = new RefereneceComponent();
_components['items'] = new ItemsComponent();
_components['line'] = new LineComponent();
_components['selector'] = new SelectorComponent();

application.SetFrameH($('.frame:first').height());

// console.log(process.env.NODE_ENV);
// console.log(_cities);
