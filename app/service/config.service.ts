import {Injectable} from '@angular/core';

import {Config} from '../class/config';


@Injectable()
export class ConfigService {
    getConfig() {
        return CONFIG;
    }
}

var CONFIG: Config = {
    version: "b16.8",
    map: {
        default: {
            lat: 55.755505, lon: 37.617270, zoom: 14
        },
        khv: {
            lat: 48.480228, lon: 135.071921, zoom: 14
        },
        msk: {
            lat: 55.755505, lon: 37.617270, zoom: 14
        },
        kja: {
            lat: 56.014039, lon: 92.892053, zoom: 14
        },
        vld: {
            lat: 43.119348, lon: 131.886965, zoom: 14
        },
        irkutsk: {
            lat: 52.286450, lon: 104.304856, zoom: 14
        },
        tver: {
            lat: 56.858507, lon: 35.917521, zoom: 14
        },
        rzn: {
            lat: 54.609215, lon: 39.712564, zoom: 14
        },
        kms: {
            lat: 50.546913, lon: 137.011227, zoom: 14
        },
        nahodka: {
            lat: 42.820431, lon: 132.883842, zoom: 14
        }
    },
    RESTServer: "http://maklersoft.com:4567",
    //RESTServer: "http://localhost:4567",
}
