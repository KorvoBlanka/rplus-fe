import {Injectable} from 'angular2/core';

import {Person} from '../class/person';


@Injectable()
export class PersonService {

    getPersonList(page: number, per_page: number) {
        var len = PERSONS.length;
        var f_idx = (page - 1) * per_page;
        if (f_idx >= len) return [];

        var l_idx = page * per_page;
        var itm_num = per_page;

        if (l_idx >= len) {
            itm_num = len % per_page;
        }

        return PERSONS.slice(f_idx, itm_num);
    }
}

var PERSONS: Person[] = [
  {
    id: 1,
    name: 'Вася',
    company_id: null,
    agent_id: null,

    phone: [{s: '9294121474'}, {s: '4212784512'}],
    email: [{s: 'mail1@mail.ru'}, {s: 'mail2@mail.ru'}],

    info: 'че-то че-то',

    add_date: 1000000000,
    change_date: 1000000000,

    selected: false,
    tag: 0,
  },
  {
    id: 2,
    name: 'Петя',
    company_id: null,
    agent_id: null,

    phone: [{s: '9294121474'}, {s: '4212784512'}],
    email: [{s: 'mail1@mail.ru'}, {s: 'mail2@mail.ru'}],

    info: 'че-то че-то еще',

    add_date: 1200000000,
    change_date: 1300000000,

    selected: false,
    tag: 0,
  },
];
