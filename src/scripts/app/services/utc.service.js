import Service from './service';

export default class UtcService extends Service {

    constructor() {
        super();
    }

    getUtc() {
        return fetch('http://worldclockapi.com/api/json/utc/now')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw '[ERROR] HTTP Response';
                }
            })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw '[ERROR] ' + error;
            });
    }

}