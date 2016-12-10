import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {User} from '../class/user';


@Injectable()
export class UserService {

    RS: String = "";

    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer;
    };

    get(userId: number) {
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
                        if (data.response == "ok") {
                            resolve(data.result);
                        }
                    },
                    err => console.log(err)
                );
        });
    }

    list(role: string, superiorId: number, searchQuery: string) {
        console.log('user list');

        var query = [];

        if (role) {
            query.push("role=" + role);
        }
        if (superiorId) {
            query.push("superiorId=" + superiorId.toString());
        }
        if (searchQuery) {
            query.push("searchQuery=" + searchQuery);
        }

        return new Promise<User[]>(resolve => {
            var _resourceUrl = this.RS + '/api/v1/user/list?' + query.join("&");
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

    save(user: User) {
        console.log('user save');

        return new Promise<User>(resolve => {
            var _resourceUrl = this.RS + '/api/v1/user/save'
            var headers = new Headers();

            var data_str = JSON.stringify(user);

            this._http.post(_resourceUrl, data_str, {
                headers: headers
            })
                .map(res => res.json())
                .subscribe(
                    data => {
                        if (data.response == "ok") {
                            resolve(data.result);
                        } else {
                            console.log(data.result);
                        }
                    },
                    err => {
                        console.log(err)
                    }
                );
        });
    }
}
