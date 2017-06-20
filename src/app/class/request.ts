import {GeoPoint} from "./geoPoint";
export class Request {
    id: String;

    agentId: number;
    personId: number;

    stateCode: string;
    stageCode: string;
    offerTypeCode: string;

    request: string;
    addDate: Number;

    searchArea: GeoPoint[];

    accountId: number;

    info_n: string;

    constructor () {
        // set default vals
        this.offerTypeCode = 'sale';
        this.searchArea = [];
        this.request = '';
    }
}
