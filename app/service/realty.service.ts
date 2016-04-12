import {Injectable} from 'angular2/core';

import {Realty} from '../class/realty';
import {Http, Headers, Response} from 'angular2/http';

@Injectable()
export class RealtyService {

  constructor(private _http: Http) {};

    updateRealty(realty: Realty) {
      console.log('updateRealty');

      return new Promise<Realty>(resolve => {
        var _resourceUrl = 'http://localhost:4567/api/v1/offer/update/' + realty.id;
        var headers = new Headers();

        // TODO
        // убрать из realty "selected" (ну или засунуть его таки в БД)
        delete realty["selected"];

        Realty.normalize(realty);
        var data_str = JSON.stringify(realty);

        this._http.post(_resourceUrl, data_str, {
            headers: headers
            })
            .map(res => res.json())
            .subscribe(
              data => {
                resolve(data);
                if(data.result == "OK") {

                }
              },
              err => console.log(err)
            );
      });
    }

    getRealty(page: number, perPage: number, searchQuery: string) {
      console.log('getRealty');

      return new Promise<Realty[]>(resolve => {
        var _resourceUrl = 'http://localhost:4567/api/v1/offer/list?'
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
                resolve(data);
                if(data.result == "OK") {

                }
              },
              err => console.log(err)
            );
      });
    }

    getSimilarRealty(page: number, per_page: number) {
        return [];
    }
}
