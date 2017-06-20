
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


    // new stuff
    stageCode_n: string;

    sourceCode_n: string;

    sourceUrl_n: string;

    offerTypeCode_n: string;

    typeCode_n: string;;

    region_n: string;

    city_n: string;

    area_n: string;

    admArea_n: string;

    street_n: string;

    house_n: string;

    housing_n: string;

    apartment_n: string;

    settlement_n: string;

    newBuilding_n: boolean;

    objectStage_n: string;

    buildYear_n: string;

    houseType_n: string;

    houseMaterial_n: string;

    roomsCount_n: number;

    roomsType_n: string;

    floor_n: number;

    floorsCount_n: number;

    levelsCount_n: number;

    squareTotal_n: number;

    squareLiving_n: number;

    squareKitchen_n: number;

    squareLand_n: number;

    squareLandType_n: number;

    balcony_n: boolean;

    loggia_n: boolean;

    bathroom_n: boolean;

    condition_n: string;

    price_n: number;

    comission_n: number;

    comissionPerc_n: number;

    distance_n: number;

    guard_n: boolean;

    waterSupply_n: boolean;

    gasification_n: boolean;

    electrification_n: boolean;

    sewerage_n: boolean;

    centralHeating_n: boolean;

    lift_n: boolean;

    parking_n: boolean;

    landPurpose_n: string;

    objectName_n: string;

    buildingType_n: string;

    buildingClass_n: string;

    сeilingHeight_n: number;

    contractStr_n: string;

    // raitings
    locRaiting0_n: string;
    locRaiting1_n: string;
    locRaiting2_n: string;
    locRaiting3_n: string;
    locRaiting4_n: string;
    locRaiting5_n: string;
    locRaiting6_n: string;
    locRaiting7_n: string;
    locRaiting8_n: string;

    offerRaiting0_n: string;
    offerRaiting1_n: string;
    offerRaiting2_n: string;
    offerRaiting3_n: string;
    offerRaiting4_n: string;
    offerRaiting5_n: string;
    offerRaiting6_n: string;
    offerRaiting7_n: string;
    offerRaiting8_n: string;


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

    public static parseAddress(itm: string){
        let fullAddress: Array<any> = [];
        let address: Array<string> = itm.split(',');
        for(var i=0; i< address.length; ++i)
            address[i] = address[i].trim();
        if(parseInt(address[1]) > 0) {
            fullAddress.push({type:"HOUSE", value: address[1]});
            fullAddress.push({type:"STREET", value: address[0]});
            if(address.length == 5){
                if(address[4].indexOf("Москва") != -1){
                    fullAddress.push({type:"DISTRICT", value: address[2]});
                    fullAddress.push({type:"CITY", value: address[4]});
                }
                else if(address[3].indexOf("р-н") != -1){
                    fullAddress.push({type:"CITY", value: address[2]});
                    fullAddress.push({type:"DISTRICT", value: address[3].split(" ")[0]});
                    fullAddress.push({type:"KRAY", value: address[4]});
                } else{
                    fullAddress.push({type:"CITY", value: address[3]});
                    fullAddress.push({type:"KRAY", value: address[4]});
                }

            } else if(address.length == 4 && address[3].indexOf("Санкт-Петербург") != -1){
                fullAddress.push({type:"CITY", value: address[3].split(" ")[1]});
            } else if(address.length == 4){
                fullAddress.push({type:"CITY", value: address[2]});
                fullAddress.push({type:"KRAY", value: address[3]});
            }
        }
        else if(address.length == 4){
            fullAddress.push({type:"STREET", value: address[0]});
            if(address[3].indexOf("Москва") != -1){
                fullAddress.push({type:"DISTRICT", value: address[1]});
                fullAddress.push({type:"CITY", value: address[3]});
            } else{
                fullAddress.push({type:"CITY", value: address[1]});
                if(address[2].indexOf("р-н") != -1)
                    fullAddress.push({type:"DISTRICT", value: address[2]});
                fullAddress.push({type:"KRAY", value: address[3]});
            }

        } else if(address.length == 3){
            if(address[1].indexOf("р-н") != -1){
                fullAddress.push({type:"CITY", value: address[0]});
                fullAddress.push({type:"DISTRICT", value: address[1]});
                fullAddress.push({type:"KRAY", value: address[2]});
            } else if(address[2].indexOf("Санкт-Петербург") != -1){
                fullAddress.push({type:"STREET", value: address[0]});
                fullAddress.push({type:"CITY", value: address[2].split(" ")[1]});
            }
            else{
                fullAddress.push({type:"STREET", value: address[0]});
                fullAddress.push({type:"CITY", value: address[1]});
                fullAddress.push({type:"KRAY", value: address[2]});
            }
        }
        return fullAddress;
    }
}
