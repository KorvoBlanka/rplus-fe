import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {Person} from '../class/person';
import {Organisation} from '../class/organisation';


import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {
    RS: String = "";
    persons$: Observable<Person[]>;
    private _personsObserver: Observer<Person[]>;
    private _dataStore: {
        persons: Person[],
    };

    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer;

        this.persons$ = new Observable(observer => this._personsObserver = observer).share();
        this._dataStore = {persons: []};
    };

    get(personId: number) {
        console.log('person get');

        return new Promise<Person>(resolve => {
            var _resourceUrl = this.RS + '/api/v1/person/get/' + personId;
            this._http.get(_resourceUrl)
                .map(res => res.json()).subscribe(
                data => {
                    if (data.response == "ok") {

                        var gPerson: Person = data.result;
                        this._dataStore.persons.forEach((person, i) => {
                            if (person.id === gPerson.id) {
                                this._dataStore.persons[i] = gPerson;
                            }
                        });

                        resolve(gPerson);
                    }
                },
                err => console.log(err)
            );
        });
    }

    list(page: number, perPage: number, userId: number, organisationId: number, searchQuery: string) {
        console.log('person list');

        if (page == 0) {
            this._dataStore.persons = [];
        }

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

        var _resourceUrl = this.RS + '/api/v1/person/list?' + query.join("&");

        this._http.get(_resourceUrl)
            .map(res => res.json()).subscribe(
            data => {
                if (data.response == "ok") {

                    var res: Person[] = data.result;
                    var persons: Person[] = [];
                    for (var person of res) {
                        this._dataStore.persons.push(person);
                    }
                    this._personsObserver.next(this._dataStore.persons);
                }
            },
            err => console.log(err)
        );
    }

    save(person: Person) {
        console.log('person save');
        console.log(person);

        var _resourceUrl = this.RS + '/api/v1/person/save'

        delete person["selected"];
        var data_str = JSON.stringify(person);

        return new Promise<Person>(resolve => {
            this._http.post(_resourceUrl, data_str)
                .map(res => res.json()).subscribe(
                data => {
                    if (data.response == "ok") {
                        var cPerson: Person = data.result;
                        this._dataStore.persons.splice(0, 0, cPerson);
                        resolve(cPerson);
                    }
                },
                err => console.log(err)
            );
        });
    }
}
