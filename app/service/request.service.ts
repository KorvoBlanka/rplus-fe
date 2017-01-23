import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Request} from '../class/request';
import {AsyncSubject} from "rxjs/AsyncSubject";


@Injectable()
export class RequestService {

    RS: String = "";


    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/request/';
    };

    list(page: number, perPage: number, offerTypeCode: string, agentId: number, personId: number, searchQuery: string) {

        console.log('request list');

        var _resourceUrl = this.RS + 'list?'
            + 'page=' + page
            + '&per_page=' + perPage
            + '&offerTypeCode=' + offerTypeCode
            + '&agent_id=' + (agentId ? agentId : '')
            + '&person_id=' + (personId ? personId : '')
            + '&search_query=' + searchQuery;

        var ret_subj = <AsyncSubject<Request[]>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {
                    var requests: Request[] = data.result;

                    ret_subj.next(requests);
                    ret_subj.complete();
                },
                err => console.log(err)
            );
        return ret_subj;
    }

    save(request: Request) {
        console.log('request save');
        console.log(request);

        var _resourceUrl = this.RS + 'save'

        delete request["selected"];
        var data_str = JSON.stringify(request);

        var ret_subj = <AsyncSubject<Request>>new AsyncSubject();

        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(res => res.json()).subscribe(
            data => {

                var r: Request = data.result;

                // TODO: pass copy????
                ret_subj.next(r);
                ret_subj.complete();

            },
            err => console.log(err)
        );

        return ret_subj;
    }
}
