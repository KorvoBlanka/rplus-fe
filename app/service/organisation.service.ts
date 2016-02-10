import {Injectable} from 'angular2/core';

import {Organisation} from '../class/organisation';


@Injectable()
export class OrganisationService {

    getOrganisationList(page: number, per_page: number) {
        var len = ORGANISATIONS.length;
        var f_idx = (page - 1) * per_page;
        if (f_idx >= len) return [];

        var l_idx = page * per_page;
        var itm_num = per_page;

        if (l_idx >= len) {
            itm_num = len % per_page;
        }

        return ORGANISATIONS.slice(f_idx, itm_num);
    }
}

var ORGANISATIONS: Organisation[] = [
  {
    id: 0,
    name: 'Частное лицо',
    address: '',

    info: '',

    add_date: 0,
    change_date: 0,
  },
  {
    id: 1,
    name: 'Агенство 1',
    address: 'ул. Каковато 16, офис ННН',

    info: 'бла-бла',

    add_date: 1000000000,
    change_date: 1300000000,
  },
];
