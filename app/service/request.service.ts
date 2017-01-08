import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Request} from '../class/request';
import {Person} from '../class/person';
import {Organisation} from '../class/organisation';


@Injectable()
export class RequestService {

  RS: String = "";

  constructor(private _configService: ConfigService, private _http: Http) {
    this.RS = this._configService.getConfig().RESTServer;
  };

  list(page: number, perPage: number, personId: number, searchQuery: string) {

    console.log('request list');

    return new Promise<Request[]>(resolve => {
      var _resourceUrl = this.RS + '/api/v1/request/list?'
        + 'page=' + page
        + '&per_page=' + perPage
        + '&person_id=' + personId
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

    save(request: Request) {
        console.log('request save');
        console.log(request);

        var _resourceUrl = this.RS + '/api/v1/request/save'

        delete request["selected"];
        var data_str = JSON.stringify(request);

        return new Promise<Request>(resolve => {
            this._http.post(_resourceUrl, data_str)
                .map(res => res.json()).subscribe(
                data => {
                    if (data.response == "ok") {
                        var cRerquest: Request = data.result;
                        //this._dataStore.persons.splice(0, 0, cPerson);
                        resolve(cRerquest);
                    }
                },
                err => console.log(err)
            );
        });
    }
}
