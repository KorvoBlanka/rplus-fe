import {
    Component,
    ElementRef, OnInit
} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

import {HubService} from '../service/hub.service'
import {OfferService} from '../service/offer.service';
import {Offer} from '../class/offer';

import * as moment from 'moment/moment';


@Component({
    selector: 'offer-table',
    inputs: ['offers'],
    styles: [`
        .offer-table-wrapper {
            padding-top: 115px;
            height: 100%;
            width: 100%;
        }
    
        .scroll-wrapper {
            overflow: auto;
        }
    
        .table {
            width: 100%;
            font-size: 14px;
            border-collapse: collapse;
        }
    
        .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {
            padding: 5px;
            font-weight: 200;
            text-align: left;
            vertical-align: top;
            border-top: 1px solid #ddd;
        }
    
        .table>thead>tr>th, .table>thead>tr>td {
            font-weight: 400;
            border-bottom: 1px solid #ddd;
            white-space: nowrap;
    
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
    
            cursor: pointer;
        }
    
        .table-striped>tbody>tr:nth-child(odd)>td, .table-striped>tbody>tr:nth-child(odd)>th {
            background-color: #f9f9f9;
        }
    
        .table > tbody > tr.selected > td {
            color: #fff;
            background-color: #3366cc;
        }
    
    `],
    template: `
        <div class="offer-table-wrapper" (window:resize)="onResize($event)">
            <div class="scroll-wrapper" [style.height]="contentHeight" (scroll)="scroll($event)">
                <table class="table table-striped">
                    <thead
                        (contextmenu)="theaderContextMenu($event)"
                    >
                        <tr>
                            <th *ngFor="let f of fields"
                                [hidden]="!f.visible"
                                [style.width.xx]="f.width"
                                (click)="toggleSort(f)"
                            >
                            {{ f.label }}
                                <span *ngIf="f.sort==0" class="icon-none"></span>
                                <span *ngIf="f.sort==1" class="icon-chevron-up"></span>
                                <span *ngIf="f.sort==2" class="icon-chevron-down"></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        (contextmenu)="tableContextMenu($event)"
                    >
                        <tr *ngFor="let o of offers"
                            [class.selected]="o.selected"
                            (click)="click(o)"
                            (dblclick)="dblClick(o)"
                        >
                            <td *ngFor="let f of fields"
                                [hidden]="!f.visible"
                                [style.width.xx]="f.width"
                            >
                                <span *ngIf="f.id=='stateCode'" class="icon-{{ f.val(o) }}"></span>
                                <span *ngIf="f.id=='photo' && o.photoUrl" class="icon-photo"></span>
                                <span *ngIf="f.id!='stateCode' && f.id!='photo'">{{ f.val(o) }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
})

export class OfferTableComponent implements OnInit {
    public offers: Offer[];

    contentHeight: number = 600;
    page: number = 0;
    to: any;

    @Output() onSort: EventEmitter<any> = new EventEmitter();
    @Output() onListEnd: EventEmitter<any> = new EventEmitter();

    private fields = [
        {
            id: 'stateCode', label: '#', visible: true, sort: 0, val: (ofr: Offer) => {
            return ofr.stateCode;
        }
        },
        {
            id: 'photo', label: 'Фото', visible: true, sort: 0, val: (ofr: Offer) => {
            //return ofr.main_photo_thumbnail;
            return '';
        }
        },
        {
            id: 'typeCode', label: 'Тип', visible: true, sort: 0, val: (ofr: Offer) => {
            return ofr.typeCode;
        }
        },
        {
            id: 'locality', label: 'Город', visible: false, sort: 0, val: (ofr: Offer) => {
            return ofr.locality;
        }
        },
        {
            id: 'address', label: 'Адрес', visible: true, sort: 0, val: (ofr: Offer) => {
            return ofr.address;
        }
        },
        {
            id: 'roomsCount', label: 'Комнаты', visible: true, sort: 0, val: (ofr: Offer) => {
            var res;
            if (ofr.roomsOfferCount) {
                res = ofr.roomsOfferCount;
            }
            if (ofr.roomsCount) {
                if (res) res += '/'
                res += ofr.roomsCount;
            }
            return res;
        }
        },
        {
            id: 'apSchemeId', label: 'Планировка', visible: true, sort: 0, val: (ofr: Offer) => {
            return ofr.apSchemeId;
        }
        },
        {
            id: 'houseTypeId', label: 'Материал', visible: true, sort: 0, val: (ofr: Offer) => {
            return ofr.houseTypeId;
        }
        },
        {
            id: 'floor', label: 'Этаж', visible: true, sort: 0, val: (ofr: Offer) => {
            var res = '';
            if (ofr.floor) {
                res += ofr.floor;
            }
            if (ofr.floorsCount) {
                if (res) res += '/'
                res += ofr.floorsCount;
            }
            return res;
        }
        },
        {
            id: 'squareTotal', label: 'Площадь', visible: true, sort: 0, val: (ofr: Offer) => {

            return ofr.squareTotal;
        }
        },
        {
            id: 'sourceMedia', label: 'Источник', visible: true, sort: 0, val: (ofr: Offer) => {
            return ofr.sourceMedia;
        }
        },
        {
            id: 'mediator', label: 'Предложение', visible: false, sort: 0, val: (ofr: Offer) => {
            return '~'
        }
        },
        {
            id: 'contact', label: 'Контакт', visible: true, sort: 0, val: (ofr: Offer) => {
            if (ofr.person) return ofr.person.name;
            return '';
        }
        },
        {
            id: 'ownerPrice', label: 'Цена', visible: true, sort: 0, val: (ofr: Offer) => {
            return ofr.ownerPrice;
        }
        },
        {
            id: 'priceSq', label: 'Цена м2', visible: false, sort: 0, val: (ofr: Offer) => {
            if (ofr.ownerPrice && ofr.squareTotal) {
                return (ofr.ownerPrice / ofr.squareTotal) + '';
            }
            return '';
        }
        },
        {
            id: 'mls', label: 'MLS', visible: false, sort: 0, val: (ofr: Offer) => {
            return '';
        }
        },
        {
            id: 'agent', label: 'Агент', visible: true, sort: 0, val: (ofr: Offer) => {
            if (ofr.agent) return ofr.agent.name;
            return '';
        }
        },
        {
            id: 'manager', label: 'Менеджер', visible: false, sort: 0, val: (ofr: Offer) => {
            return '~';
        }
        },

        {
            id: 'reqests', label: 'Заявки', visible: false, sort: 0, val: (ofr: Offer) => {
            return '10';
        }
        },
        {
            id: 'click_count', label: 'Кол-во кликов', visible: false, sort: 0, val: (ofr: Offer) => {
            return '100';
        }
        },
        {
            id: 'progress', label: 'Прогресс', visible: false, sort: 0, val: (ofr: Offer) => {
            return '50%';
        }
        },

        {
            id: 'addDate', label: 'Добавлено', visible: true, sort: 0, val: (ofr: Offer) => {
            return moment(ofr.addDate).format('DD.MM.YY hh:mm');
        }
        },
        {
            id: 'changeDate', label: 'Назначено', visible: false, sort: 0, val: (ofr: Offer) => {
            //return moment(ofr.assignDate * 1000).format('DD.MM.YY hh:mm')
            return moment(ofr.changeDate).format('DD.MM.YY hh:mm');
        }
        },
        {
            id: 'changeDate', label: 'Изменено', visible: false, sort: 0, val: (ofr: Offer) => {
            return moment(ofr.changeDate).format('DD.MM.YY hh:mm');
        }
        },
        {
            id: 'lastSeenDate', label: 'Актуально', visible: true, sort: 0, val: (ofr: Offer) => {
            return moment(ofr.lastSeenDate).format('DD.MM.YY hh:mm');
        }
        }
    ];

    constructor(private _elem: ElementRef, private _hubService: HubService, private _offerService: OfferService) {
    };

    ngOnInit() {
        this.calcSize();
    }

    onResize(e) {
        this.calcSize();
    }

    scroll(e) {
        if (e.currentTarget.scrollTop + this.contentHeight >= e.currentTarget.scrollHeight) {
            this.onListEnd.emit({bla: 'bla'});
        }
    }

    click(ofr: Offer) {
        //r.selected = !r.selected;
    }

    tableContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        this._hubService.shared_var['cm_px'] = e.pageX;
        this._hubService.shared_var['cm_py'] = e.pageY;

        let items = [];

        items.push({
                class: "entry", disabled: false, label: 'пункт 1', callback: () => {

                }
            }
        );

        items.push({
                class: "delimiter"
            }
        );

        items.push({
                class: "entry", disabled: false, label: 'пункт 2', callback: () => {

                }
            }
        );

        items.push({
                class: "entry", disabled: false, label: 'пункт 3', callback: () => {

                }
            }
        );


        this._hubService.shared_var['cm_items'] = items;
        this._hubService.shared_var['cm_hidden'] = false;
    }

    theaderContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        this._hubService.shared_var['cm_px'] = e.pageX;
        this._hubService.shared_var['cm_py'] = e.pageY;

        let items = [];

        this.fields.forEach(f => {
            items.push(
                {
                    class: "entry_cb", disabled: false, value: f.visible, label: f.label, callback: () => {
                    this.toggleVisibility(f.id)
                }
                }
            );
        })

        this._hubService.shared_var['cm_items'] = items;
        this._hubService.shared_var['cm_hidden'] = false;
    }

    toggleVisibility(field_id: string) {
        this.fields.forEach(f => {
            if (f.id == field_id) {
                f.visible = !f.visible;
            }
        });
    }

    dblClick(o: Offer) {
        //r.selected = true;
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', {offer: o});
    }

    calcSize() {
        this.contentHeight = document.body.clientHeight - 115;
    }

    toggleSort(f) {
        f.sort++;
        if (f.sort > 2) f.sort = 0;
        this.onSort.emit({field: f.id, order: f.sort});
    }
}
