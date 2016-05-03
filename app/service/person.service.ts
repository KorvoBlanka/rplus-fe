import {Injectable} from 'angular2/core';

import {Person} from '../class/person';
import {Organisation} from '../class/organisation';
import {Http, Headers, Response} from 'angular2/http';

@Injectable()
export class PersonService {

  constructor(private _http: Http) {};

  list(page: number, perPage: number, organisationId: string, searchQuery: string) {
    console.log('person list');

    return new Promise<Person[]>(resolve => {
      var _resourceUrl = 'http://localhost:4567/api/v1/person/list?'
        + 'page=' + page
        + '&per_page=' + perPage
        + '&organisation_id=' + organisationId
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

  update(person: Person) {
    console.log('person update');

    return new Promise<Person>(resolve => {
      var _resourceUrl = 'http://localhost:4567/api/v1/person/update/' + person.id;
      var headers = new Headers();

      delete person["selected"];

      var data_str = JSON.stringify(person);

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

  create(person: Person) {
    console.log('person create');

    return new Promise<Person>(resolve => {
      var _resourceUrl = 'http://localhost:4567/api/v1/person/create'
      var headers = new Headers();

      var data_str = JSON.stringify(person);

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
