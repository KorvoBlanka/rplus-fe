import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {User} from '../class/user';
import {AsyncSubject} from "rxjs/AsyncSubject";


@Injectable()
export class UserService {

    RS: String = "";


    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/user/';
    };


    listX(role: string, superiorId: number, searchQuery: string) {
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


        var _resourceUrl = this.RS + 'list?' + query.join("&");

        var ret_subj = <AsyncSubject<User[]>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
            data => {
                var users: User[] = data.result;

                ret_subj.next(users);
                ret_subj.complete();
            },
            err => console.log(err)
        );

        return ret_subj;
    }

    list(accountId: number, role: string, superiorId: number, searchQuery: string) {
        console.log('user list');

        var query = [];


        if (accountId) {
            query.push("accountId=" + accountId);
        }
        if (role) {
            query.push("role=" + role);
        }
        if (superiorId) {
            query.push("superiorId=" + superiorId.toString());
        }
        if (searchQuery) {
            query.push("searchQuery=" + searchQuery);
        }


        var _resourceUrl = this.RS + 'list?' + query.join("&");

        var ret_subj = <AsyncSubject<User[]>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {
                    var users: User[] = data.result;

                    ret_subj.next(users);
                    ret_subj.complete();
                },
                err => console.log(err)
            );

        return ret_subj;
    }

    get(userId: number) {
        console.log('user get');

        var _resourceUrl = this.RS + 'get/' + userId;

        var ret_subj = <AsyncSubject<User>>new AsyncSubject();

        this._http.get(_resourceUrl, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {
                    var u: User = data.result;

                    // TODO: pass copy????
                    ret_subj.next(u);
                    ret_subj.complete();
                },
                err => console.log(err)
            );

        return ret_subj;
    }

    save(user: User) {
        console.log('user save');


        var _resourceUrl = this.RS + 'save'

        var ret_subj = <AsyncSubject<User>>new AsyncSubject();

        var data_str = JSON.stringify(user);

        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(res => res.json()).subscribe(
                data => {

                    var u: User = data.result;

                    // TODO: pass copy????
                    ret_subj.next(u);
                    ret_subj.complete();
                },
                err => {
                    console.log(err)
                }
            );

        return ret_subj;
    }
}
