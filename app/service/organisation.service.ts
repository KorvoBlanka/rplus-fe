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
  },
  {
    id: 1,
    name: 'Агенство 1',
  },
];
