import {Injectable} from '@angular/core';

import {Config} from '../class/config';


@Injectable()
export class ConfigService {
    getConfig() {
        return CONFIG;
    }
}

var CONFIG: Config = {
    map: {
        lat: 48.480228, lon: 135.071921, zoom: 14
    },
    RESTServer: "http://192.168.5.81:4567",
}
