import {Injectable} from 'angular2/core';

@Injectable()
export class HubService {

    getProperty(name: string) {
        return stash[name];
    }

    setProperty(name: string, val: any) {
        stash[name] = val;
    }
}

var stash = {
    some_prop: 'some_val',
}
