import {Injectable} from 'angular2/core';

import {ConfigService} from '../config.service';

import {User} from '../../class/user';

import {Http, Headers, Response} from 'angular2/http';

@Injectable()
export class UserService {

  RS: String = "";

  constructor(private _configService: ConfigService, private _http: Http) {
    this.RS = this._configService.getConfig().RESTServer;
  };

  get(userId: String) {
    console.log('user get');

    return new Promise<User>(resolve => {
      var _resourceUrl = this.RS + '/api/v1/user/get/' + userId;
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

  list(role: string, searchQuery: string) {
    console.log('user list');

    return new Promise<User[]>(resolve => {
      var _resourceUrl = this.RS + '/api/v1/user/list?'
        + 'role=' + role
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

  update(user: User) {
    console.log('user update');

    return new Promise<User>(resolve => {
      var _resourceUrl = this.RS + '/api/v1/user/update/' + user.id;
      var headers = new Headers();

      delete user["selected"];

      var data_str = JSON.stringify(user);

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

  create(user: User) {
    console.log('user create');

    return new Promise<User>(resolve => {
      var _resourceUrl = this.RS + '/api/v1/user/create'
      var headers = new Headers();

      var data_str = JSON.stringify(user);

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
