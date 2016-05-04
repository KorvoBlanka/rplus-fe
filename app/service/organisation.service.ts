import {Injectable} from 'angular2/core';

import {ConfigService} from './config.service';

import {Organisation} from '../class/organisation';
import {Http, Headers, Response} from 'angular2/http';

@Injectable()
export class OrganisationService {

  RS: String = "";

  constructor(private _configService: ConfigService, private _http: Http) {
    this.RS = this._configService.getConfig().RESTServer;
  };

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
              if(data.response == "ok") {
                resolve(data.result);
              }
            },
            err => console.log(err)
          );
    });
  }

  update(org: Organisation) {
    console.log('org update');

    return new Promise<Organisation>(resolve => {
      var _resourceUrl = this.RS + '/api/v1/organisation/update/' + org.id;
      var headers = new Headers();

      delete org["selected"];

      var data_str = JSON.stringify(org);

      this._http.post(_resourceUrl, data_str, {
          headers: headers
          })
          .map(res => res.json())
          .subscribe(
            data => {
              if(data.response == "ok") {
                resolve(data.result);
              }
            },
            err => console.log(err)
          );
    });
  }

  create(org: Organisation) {
    console.log('org create');

    return new Promise<Organisation>(resolve => {
      var _resourceUrl = this.RS + '/api/v1/organisation/create'
      var headers = new Headers();

      var data_str = JSON.stringify(org);

      this._http.post(_resourceUrl, data_str, {
          headers: headers
          })
          .map(res => res.json())
          .subscribe(
            data => {
              if(data.response == "ok") {
                resolve(data.result);
              }
            },
            err => console.log(err)
          );
    });
  }
}
