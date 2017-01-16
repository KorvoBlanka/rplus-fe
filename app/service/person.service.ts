import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ConfigService} from './config.service';

import {Person} from '../class/person';
import {AsyncSubject} from "rxjs/AsyncSubject";

import 'rxjs/add/operator/map';



@Injectable()
export class PersonService {
    RS: String = "";


    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/person/';
    };

    list(userId: number, organisationId: number, searchQuery: string) {
        console.log('person list');

        var ret_subj = <AsyncSubject<Person[]>>new AsyncSubject();

        var query = [];

        if (userId) {
            query.push("userId=" + userId.toString());
        }
        if (organisationId) {
            query.push("organisationId=" + organisationId.toString());
        }
        if (searchQuery) {
            query.push("searchQuery=" + searchQuery);
        }

        var _resourceUrl = this.RS + 'list?' + query.join("&");

        this._http.get(_resourceUrl)
            .map(res => res.json()).subscribe(
                data => {

                    var persons: Person[] = data.result;
                    ret_subj.next(persons);
                    ret_subj.complete();

                },
                err => console.log(err)
        );

        return ret_subj;
    }

    get(personId: number) {
        console.log('person get');

        var ret_subj = <AsyncSubject<Person>>new AsyncSubject();

        var _resourceUrl = this.RS + 'get/' + personId;
        this._http.get(_resourceUrl)
            .map(res => res.json()).subscribe(
                data => {

                    let notFound = true;

                    var p: Person = data.result;

                    // TODO: pass copy????
                    ret_subj.next(p);
                    ret_subj.complete();
                },
                err => console.log(err)
        );

        return ret_subj;
    }

    save(person: Person) {
        console.log('person save');
        console.log(person);

        var ret_subj = <AsyncSubject<Person>>new AsyncSubject();

        var _resourceUrl = this.RS + 'save'

        delete person["selected"];
        var data_str = JSON.stringify(person);


        this._http.post(_resourceUrl, data_str)
            .map(res => res.json()).subscribe(
                data => {

                    let notFound = true;

                    var p: Person = data.result;

                    // TODO: pass copy????
                    ret_subj.next(p);
                    ret_subj.complete();
                },
                err => console.log(err)
        );


        return ret_subj;
    }
}
