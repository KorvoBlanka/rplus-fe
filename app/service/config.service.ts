import {Injectable} from '@angular/core';

import {Config} from '../class/config';


@Injectable()
export class ConfigService {
    getConfig() {
        return CONFIG;
    }
}

var CONFIG: Config = {
    map: { lat: 48.480007, lon: 135.054954, zoom: 14 },
    RESTServer: "http://192.168.5.81:4567",
}
