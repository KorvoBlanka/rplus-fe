
import {GeoPoint} from "./geoPoint";
export class Offer {

    id: number;

    stateCode: string;

    stageCode: string;

    typeCode: string;

    offerTypeCode: string;

    locality: string;

    address: string;

    houseNum: string;

    apNum: string;

    district: string;

    poi: string;


//-----------------------------
    houseTypeId: number;

    apSchemeId: number;

    roomSchemeId: number;

    conditionId: number;

    balconyId: number;

    bathroomId: number;
//-----------------------------


    roomsCount: number;

    roomsOfferCount: number;

    floor: number;

    floorsCount: number;

    levelsCount: number;

    squareTotal: number;

    squareLiving: number;

    squareKitchen: number;

    squareLand: number;

    ownerPrice: number;

    agencyPrice: number;

    leaseDeposite: number;

    workInfo: string;

    description: string;

    sourceMedia: string;

    sourceUrl: string;

    sourceMediaText: string;


    addDate: number;
    openDate: number;
    changeDate: number;

    deleteDate: number;

    lastSeenDate: number;

    multylisting: boolean;

    mlsPriceType: string;

    mlsPrice: number;

    agentId: number;

    personId: number;


    locationLat: number;
    locationLon: number;

    photoUrl: string[];
    //photo_tumb???

    person: any;
    agent: any;

    accountId: number;


    constructor () {
        // set default vals
        this.stateCode = 'raw';
        this.stageCode = 'contact';
        this.offerTypeCode = 'sale';
        this.typeCode = 'apartment';
    }

    public static getDigest(o: Offer) {
        var digest = [];

        digest.push('<strong>' + o.typeCode + '</strong>');
        if (o.roomsCount) digest.push(o.roomsCount + 'к');
        if (o.floor && o.floorsCount) {
            digest.push(o.floor + '/' + o.floorsCount + ' эт.')
        } else if (o.floor || o.floorsCount) {
            digest.push((o.floor || o.floorsCount) + ' эт.');
        }
        {
            var squares = [];
            if (o.squareTotal) squares.push(o.squareTotal);
            if (o.squareLiving) squares.push(o.squareLiving);
            if (o.squareKitchen) squares.push(o.squareKitchen);
            if (squares.length) digest.push(squares.join('/') + ' кв. м.');
        }
        digest.push('<br>');
        if (o.apSchemeId) digest.push(o.apSchemeId);
        if (o.houseTypeId) digest.push(o.houseTypeId);
        if (o.roomSchemeId) digest.push(o.roomSchemeId);
        if (o.conditionId) digest.push(o.conditionId);
        if (o.balconyId) digest.push(o.balconyId);
        if (o.bathroomId) digest.push(o.bathroomId);
        if (o.squareLand) digest.push(o.squareLand + ' га');
        if (o.description) {
            digest.push(o.description);
        }
        digest.push('<br>');
        if (o.ownerPrice) digest.push('<span class="text-primary">' + o.ownerPrice + ' тыс. руб.' + '</span>');

        return digest.join(' ');
    }
}
