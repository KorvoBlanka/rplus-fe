import {Injectable} from 'angular2/core';

import {Person} from '../class/person';
import {Organisation} from '../class/organisation';

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

    getRandom() {
        var idx = Math.floor(Math.random() * 5.5);
        return PERSONS[idx];
    }
}

var ORGANISATIONS: Organisation[] = [
  {
    id: 0,
    name: 'Частное лицо',
  },
  {
    id: 1,
    name: 'Агенство 1',
  },
];

var PERSONS: Person[] = [
  {
    id: 1,
    name: 'Вася',
    organisation: ORGANISATIONS[0],
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
    organisation: ORGANISATIONS[1],
    agent_id: null,

    phone: [{s: '9294121474'}, {s: '4212784512'}],
    email: [{s: 'mail1@mail.ru'}, {s: 'mail2@mail.ru'}],

    info: 'че-то че-то еще',

    add_date: 1200000000,
    change_date: 1300000000,

    selected: false,
    tag: 0,
  },
  {
    id: 3,
    name: 'Мария Петровна',
    organisation: ORGANISATIONS[1],
    agent_id: null,

    phone: [{s: '9294121474'}, {s: '4212784512'}],
    email: [{s: 'mail1@mail.ru'}, {s: 'mail2@mail.ru'}],

    info: 'че-то че-то еще',

    add_date: 1200000000,
    change_date: 1300000000,

    selected: false,
    tag: 0,
  },
  {
    id: 4,
    name: 'Василий Иванович',
    organisation: ORGANISATIONS[0],
    agent_id: null,

    phone: [{s: '9294121474'}, {s: '4212784512'}],
    email: [{s: 'mail1@mail.ru'}, {s: 'mail2@mail.ru'}],

    info: 'че-то че-то еще',

    add_date: 1200000000,
    change_date: 1300000000,

    selected: false,
    tag: 0,
  },
  {
    id: 5,
    name: 'Петр Алексеевич',
    organisation: ORGANISATIONS[1],
    agent_id: null,

    phone: [{s: '9294121474'}, {s: '4212784512'}],
    email: [{s: 'mail1@mail.ru'}, {s: 'mail2@mail.ru'}],

    info: 'че-то че-то еще',

    add_date: 1200000000,
    change_date: 1300000000,

    selected: false,
    tag: 0,
  },
  {
    id: 6,
    name: 'Екатерина Петровна',
    organisation: ORGANISATIONS[1],
    agent_id: null,

    phone: [{s: '9294121474'}, {s: '4212784512'}],
    email: [{s: 'mail1@mail.ru'}, {s: 'mail2@mail.ru'}],

    info: 'че-то че-то еще',

    add_date: 1200000000,
    change_date: 1300000000,

    selected: false,
    tag: 0,
  },
  {
    id: 7,
    name: 'Владимир Владимирович',
    organisation: ORGANISATIONS[1],
    agent_id: null,

    phone: [{s: '9294121474'}, {s: '4212784512'}],
    email: [{s: 'mail1@mail.ru'}, {s: 'mail2@mail.ru'}],

    info: 'че-то че-то еще',

    add_date: 1200000000,
    change_date: 1300000000,

    selected: false,
    tag: 0,
  },
  {
    id: 8,
    name: 'Абырвалг',
    organisation: ORGANISATIONS[1],
    agent_id: null,

    phone: [{s: '9294121474'}, {s: '4212784512'}],
    email: [{s: 'mail1@mail.ru'}, {s: 'mail2@mail.ru'}],

    info: 'че-то че-то еще',

    add_date: 1200000000,
    change_date: 1300000000,

    selected: false,
    tag: 0,
  },
  {
    id: 9,
    name: 'Илья',
    organisation: ORGANISATIONS[1],
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
