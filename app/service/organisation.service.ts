import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Organisation} from '../class/organisation';
import {AsyncSubject} from "rxjs/AsyncSubject";

import 'rxjs/add/operator/map';


@Injectable()
export class OrganisationService {

    RS: String = "";


    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/organisation/';
    };


    list(searchQuery: string) {
        console.log('org list');


        var _resourceUrl = this.RS + 'list?'
            + '&search_query=' + searchQuery;

        var ret_subj = <AsyncSubject<Organisation[]>>new AsyncSubject();

        this._http.get(_resourceUrl)
            .map(res => res.json()).subscribe(
                data => {

                    var organisations: Organisation[] = data.result;

                    ret_subj.next(organisations);
                    ret_subj.complete();

                },
                err => console.log(err)
            );

        return ret_subj;
    }

    get(organisationId: number) {
        console.log('org get');

        var _resourceUrl = this.RS + 'get/' + organisationId;

        var ret_subj = <AsyncSubject<Organisation>>new AsyncSubject();

        this._http.get(_resourceUrl)
            .map(res => res.json()).subscribe(
                data => {

                    var o: Organisation = data.result;

                    // TODO: pass copy????
                    ret_subj.next(o);
                    ret_subj.complete();
                },
                err => console.log(err)
            );

        return ret_subj;
    }


    save(org: Organisation) {
        console.log('org save');


        var _resourceUrl = this.RS + 'save'

        var ret_subj = <AsyncSubject<Organisation>>new AsyncSubject();

        var data_str = JSON.stringify(org);

        this._http.post(_resourceUrl, data_str)
            .map(res => res.json()).subscribe(
                data => {

                    var o: Organisation = data.result;

                    // TODO: pass copy????
                    ret_subj.next(o);
                    ret_subj.complete();

                },
                err => console.log(err)
            );

        return ret_subj;
    }
}
