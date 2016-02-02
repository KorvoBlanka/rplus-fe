import {Injectable} from 'angular2/core';

import {Config} from '../class/config';


@Injectable()
export class ConfigService {
    getConfig() {
        return CONFIG;
    }

}

var CONFIG: Config = {
    map: { lat: 48.480007, lon: 135.054954, zoom: 14 },
    custom_props: {some_prop: 'some_val'}
}
