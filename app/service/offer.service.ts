import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Offer} from '../class/offer';
import {AsyncSubject} from "rxjs/AsyncSubject";
import {GeoPoint} from "../class/geoPoint";
import {User} from "../class/user";
import {SessionService} from "./session.service";


export enum OfferSource {
    LOCAL = 1,
    IMPORT
}

@Injectable()
export class OfferService {

    RS: String = "";


    constructor(private _http: Http, private _configService: ConfigService, private _sessionService: SessionService) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/offer/';
    };

    list(page: number, perPage: number, source: OfferSource, filter: any, sort: any, searchQuery: string, searchArea: GeoPoint[]) {
        console.log('offers list');

        var query = [];

        var user: User = this._sessionService.getUser();


        var source_str = 'local';
        if (source == OfferSource.IMPORT) {
            source_str = 'import';
        }

        query.push('accountId=' + user.accountId);
        query.push('page=' + page);
        query.push('per_page=' + perPage);
        query.push('source=' + source_str);
        query.push('filter=' + JSON.stringify(filter));
        if (sort) {
            query.push('sort=' + JSON.stringify(sort));
        }
        query.push('search_query=' + searchQuery);
        query.push('search_area=' + JSON.stringify(searchArea));

        var _resourceUrl = this.RS + 'list?' + query.join("&");

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

        var user: User = this._sessionService.getUser();
        offer.accountId = user.accountId;

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
