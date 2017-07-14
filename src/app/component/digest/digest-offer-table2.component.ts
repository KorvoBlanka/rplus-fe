import {Component, OnInit} from '@angular/core';

import {HubService} from '../../service/hub.service'

import {Offer} from '../../class/offer';



@Component({
    selector: 'digest-offer-table2',
    inputs: ['offer' , 'withPhoto'],
    styles: [`
        .billet {
            text-align: left;
            color: #696969;
            font-weight: 200;
            font-size: 14px;
            height: 80px;
            position: relative;
            margin: 5px 0;
            cursor: hand;
        }

        .billet.selected {
            background-color: #157ad3;
            color: #fff !important;
        }

        .billet > div {
            width: 100%;
        }

        .describe{
            color: black;
            font-size: 12px;
        }

        .healthbar {
            height: 1px;
            width: 95%;
            margin: 5px 0 0 5px;
            background: #ccc;
            position: relative;
        }

        .healthbar > .health {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0%;
            background-color: red;
        }

        .timestamp {
            font-size: 11px;
            color: #bbb;
            width: 100%;
            height: 14px;
            text-align: end;
        }

        .compact_owner {
            color: #bfbcbb !important;
        }

        .tag-mark {
            position: absolute;
            right: 10px;
            top: 40%;
        }

        .compact{
            height: 68px;
            background-color: inherit;
        }

        .agent{
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
            display: block;
            height: 15px;
            font-size: 9pt;
            color: #807982;
            float: left;
            margin-right: 5px;
        }

        .withPh{
            max-width: calc(100% - 90px) !important;
        }
    `],
    template: `
        <div class="billet" data-id="r{{offer._id}}" id="r{{offer.id}}" (dblclick)="open()">
            <div>
                <div class="describe" style=" margin-left: 10px;">
                    <span style="font-size: 12px;"
                        *ngIf ="offer.typeCode"
                    >{{ typeCodeOptions[offer.typeCode].split(" ")[0] }},
                    {{ offer.roomsCount  === undefined ? "" : offer.roomsCount + 'комн., ' }}
                    {{ offer.floor  === undefined ? "?" :  offer.floor}}/{{ offer.floorsCount  === undefined ? "?" : offer.floorsCount}}
                    {{ offer.squareTotal  === undefined ? "?" : offer.squareTotal }}/{{ offer.squareLiving  === undefined ? "?" : offer.squareLiving }}/{{ offer.squareKitchen  === undefined ? "?" : offer.squareKitchen }}
                    </span>
                    <br>
                    <span *ngIf="(offer.locality || ' ').split(',')[1]">{{ (offer.locality || " ").split(",")[1] }}</span >
                    <div style="width: 100%; height: 17px; text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
                            float: left; line-height: 14px;" [class.withPh]= "withPhoto">
                            {{ (offer.locality?.split(",")[0] || offer.city_n ) === undefined ? " " : ""+(offer.locality?.split(",")[0] || offer.city_n) }}
                            {{ (offer.street_n || offer.address) === undefined ? "" : (", "+(offer.street_n || offer.address)) }}
                            {{ offer.house_n === undefined ? "" : (", "+offer.house_n) }}
                    </div>

                    <span class="agent" [class.withPh]= "withPhoto">Отв.: <span class="link" (click)="openUser()">{{offer.agent?.name}}</span></span>
                    <span class="agent" [class.withPh]= "withPhoto">Задача: <span class="link">Непонятно какая задача и нужно наверное для нее отдельное поле</span></span>
                    <div class="timestamp" *ngIf="offer.changeDate"> {{ (offer.changeDate | formatDate).toString().split(" ")[0] }} </div>
                </div>
            </div>
        </div>
    `
})

export class DigestOfferTable2Component {

    public offer: Offer;
    public withPhoto: boolean = false;

    private to: any;

    typeCodeOptions = {
        room: 'Комната',
        apartment: 'Квартира',
        apartment_small: 'Малосемейка',
        apartment_new: 'Новостройка',

        house: 'Дом',
        dacha: 'Дача',
        cottage: 'Коттедж',

        townhouse: 'Таунхаус',

        other: 'Другое',
        land: 'Земля',

        building: 'здание',
        office_place: 'офис',
        office: 'офис',
        market_place: 'торговая площадь',
        production_place: 'производственное помещение',
        gpurpose_place: 'помещение общего назначения',
        autoservice_place: 'автосервис',
        service_place: 'помещение под сферу услуг',
        warehouse_place: 'склад база',
        garage: 'гараж'

    };

    constructor(private _hubService: HubService) { };


    open() {
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('offer', {offer: this.offer});
    }

    openUser(){
        if(this.offer.agent.id){
            var tab_sys = this._hubService.getProperty('tab_sys');
            tab_sys.addTab('user', {user: this.offer.agent});
        }
    }

}
