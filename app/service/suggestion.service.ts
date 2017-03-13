/**
 * Created by owl on 3/14/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {AsyncSubject} from "rxjs/AsyncSubject";

import 'rxjs/add/operator/map';


@Injectable()
export class SuggestionService {

    RS: String = "";


    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/offer/';
    };


    list(prefix: string) {
        console.log('suggestion list');

        var ret_subj = <AsyncSubject<string[]>>new AsyncSubject();


        var sgs: string[] = [];

        /*
        var _resourceUrl = this.RS + 'suggestion?'
            + '&prefix=' + prefix;
        */

        var _resourceUrl = 'http://maps.googleapis.com/maps/api/geocode/json?'
            + "address=" + prefix
            + "&sensor=" + false
            + "&language=" + 'ru'
            + "&components=" + 'country:ru';

        var ret_subj = <AsyncSubject<string[]>>new AsyncSubject();

        this._http.get(_resourceUrl, { })
            .map(res => res.json()).subscribe(
            data => {

                var sgs: string[] = [];

                data.results.forEach(e => {

                    let short_addr = [];

                    e.address_components.forEach(ac => {
                        if (ac.types[0] == "street_number") {
                            short_addr[0] = "";
                            short_addr[1] = ac.short_name;
                        } else if (ac.types[0] == "route") {
                            short_addr[0] = ac.short_name;
                        } else if (ac.types[0] != "postal_code" && ac.types[0] != "country") {
                            short_addr.push(ac.short_name);
                        }
                    })

                    sgs.push(short_addr.join(", "));
                });

                var arr = [];
                for(var i = 0; i < sgs.length; i++) {
                    if(arr.indexOf(sgs[i]) == -1) {
                        arr.push(sgs[i]);
                    }
                }

                ret_subj.next(arr);
                ret_subj.complete();

            },
            err => console.log(err)
        );


        return ret_subj;
    }

}
