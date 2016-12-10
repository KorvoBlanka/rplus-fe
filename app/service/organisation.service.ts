import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Organisation} from '../class/organisation';

@Injectable()
export class OrganisationService {

    RS: String = "";

    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer;
    };

    get(organisationId: number) {
        console.log('org get');
        return new Promise<Organisation>(resolve => {
            var _resourceUrl = this.RS + '/api/v1/organisation/get/' + organisationId;
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

    list(page: number, perPage: number, searchQuery: string) {
        console.log('org list');

        return new Promise<Organisation[]>(resolve => {
            var _resourceUrl = this.RS + '/api/v1/organisation/list?'
                + 'page=' + page
                + '&per_page=' + perPage
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

    save(org: Organisation) {
        console.log('org save');

        return new Promise<Organisation>(resolve => {
            var _resourceUrl = this.RS + '/api/v1/organisation/save'
            var headers = new Headers();

            var data_str = JSON.stringify(org);

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
}
