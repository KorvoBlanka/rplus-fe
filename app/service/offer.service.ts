import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Offer} from '../class/offer';
import {AsyncSubject} from "rxjs/AsyncSubject";
import {GeoPoint} from "../class/geoPoint";


export enum OfferSource {
    LOCAL = 1,
    IMPORT
}

@Injectable()
export class OfferService {

    RS: String = "";


    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/offer/';
    };

    list(page: number, perPage: number, source: OfferSource, filter: any, searchQuery: string, searchArea: GeoPoint[]) {
        console.log('offers list');

        var source_str = 'local';
        if (source == OfferSource.IMPORT) {
            source_str = 'import';
        }

        var _resourceUrl = this.RS + 'list?'
            + 'page=' + page
            + '&per_page=' + perPage
            + '&source=' + source_str
            + '&filter=' + JSON.stringify(filter)
            + '&search_query=' + searchQuery
            + '&search_area=' + JSON.stringify(searchArea);

        var ret_subj = <AsyncSubject<Offer[]>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {
                    var offers: Offer[] = data.result;

                    ret_subj.next(offers);
                    ret_subj.complete();
                },
                err => console.log(err)
            );

        return ret_subj;
    }

    save(offer: Offer) {
        console.log('offer save');

        var _resourceUrl = this.RS + 'save';

        var data_str = JSON.stringify(offer);

        var ret_subj = <AsyncSubject<Offer>>new AsyncSubject();


        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {

                    var o: Offer = data.result;

                    // TODO: pass copy????
                    ret_subj.next(o);
                    ret_subj.complete();

                },
                err => console.log(err)
            );

        return ret_subj;
    }

    getSimilar(page: number, per_page: number) {

        var ret_subj = <AsyncSubject<Offer[]>>new AsyncSubject();

        return ret_subj;
    }
}
