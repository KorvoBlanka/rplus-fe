import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Offer} from '../class/offer';


@Injectable()
export class OfferService {

    RS: String = "";

    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer;
    };

    saveOffer(offer: Offer) {
        console.log('saveOffer');

        return new Promise<Offer>(resolve => {
            var _resourceUrl = this.RS + '/api/v1/offer/save';
            var headers = new Headers();

            var data_str = JSON.stringify(offer);

            this._http.post(_resourceUrl, data_str, {
                headers: headers
            })
                .map(res => res.json())
                .subscribe(
                    data => {
                        if (data.response == "ok") {
                            resolve(data.result);
                        }
                    },
                    err => console.log(err)
                );
        });
    }

    listOffers(page: number, perPage: number, filter: string, searchQuery: string) {
        console.log('listOffers');

        return new Promise<Offer[]>(resolve => {
            var _resourceUrl = this.RS + '/api/v1/offer/list?'
                + 'page=' + page
                + '&per_page=' + perPage
                + '&filter=' + filter
                + '&search_query=' + searchQuery;
            var headers = new Headers();
            this._http.get(_resourceUrl, {
                headers: headers
            })
                .map(res => res.json())
                .subscribe(
                    data => {
                        if (data.response == "ok") {
                            resolve(data.result);
                        }
                    },
                    err => console.log(err)
                );
        });
    }

    getSimilarOffer(page: number, per_page: number) {
        return [];
    }
}
