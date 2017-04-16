import {
    Component,
    ElementRef, OnInit
} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

import {HubService} from '../service/hub.service'
import {OfferService} from '../service/offer.service';
import {Offer} from '../class/offer';

import * as moment from 'moment/moment';
import {UserService} from "../service/user.service";
import {User} from "../class/user";


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

        .seen > td {
            background-color: #dbe2f0 !important;
        }

        .modified > td {
            background-color: #dff0d8 !important;
        }

        .table > tbody > tr.selected > td {
            color: #fff;
            background-color: #3366cc !important;
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

                            [class.seen]="o.openDate > timestamp"
                            [class.modified]="o.changeDate > timestamp"

                            [class.selected]="selectedOffers.indexOf(o) > -1"
                            (click)="click($event, o)"
                            (contextmenu)="click($event, o)"
                            (dblclick)="dblClick(o)"
                            (touchstart)="tStart(o)"
                            (touchend)="tEnd(o)"
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

    selectedOffers: Offer[] = [];
    contentHeight: number = 600;
    page: number = 0;
    to: any;

    lastClckIdx: number = 0;

    timestamp: number = (Date.now() / 1000) - 1000;


    @Output() onSort: EventEmitter<any> = new EventEmitter();
    @Output() onListEnd: EventEmitter<any> = new EventEmitter();
    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    stageCodeOptions = [
        {value: 'raw', label: 'Не активен'},
        {value: 'active', label: 'Активен'},
        {value: 'price', label: 'Прайс'},
        {value: 'deal', label: 'Сделка'},
        {value: 'suspended', label: 'Приостановлен'},
        {value: 'archive', label: 'Архив'}
    ];

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

    apSchemaOptions = {
        0: '-',
        1: 'Индивидуальная',
        2: 'Новая',
        3: 'Общежитие',
        4: 'Сталинка',
        5: 'Улучшенная',
        6: 'Хрущевка'
    };

    roomSchemeOptions = {
        0: '-',
        1: 'Икарус',
        2: 'Кухня-гостинная',
        3: 'Раздельные',
        4: 'Смежно-раздельные',
        5: 'Смежные',
        6: 'Студия'
    };

    houseTypeOptions = {
        0: '-',
        1: 'Брус',
        2: 'Деревянный',
        3: 'Каркасно-засыпной',
        4: 'Кирпичный'
    };

    conditionOptions = {
        0: '-',
        1: 'социальный ремонт',
        2: 'сделан ремонт',
        3: 'дизайнерский ремонт',
        4: 'требуется ремонт',
        5: 'требуется косм. ремонт',
        6: 'после строителей',
        7: 'евроремонт',
        8: 'удовлетворительное',
        9: 'нормальное'
    };

    balconyOptions = {
        0: '-',
        1: 'без балкона',
        2: 'балкон',
        3: 'лоджия',
        4: '2 балкона',
        5: '2 лоджии',
        6: 'балкон и лоджия',
        7: 'балкон застеклен',
        8: 'лоджия застеклена'
    };

    bathroomOptions = {
        0: '-',
        1: 'без удобств',
        2: 'туалет',
        3: 'с удобствами',
        4: 'душ и туалет',
        5: '2 смежных санузла',
        6: '2 раздельных санузла',
        7: 'санузел совмещенный'
    };

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
            return this.typeCodeOptions[ofr.typeCode];
        }
        },
        {
            id: 'locality', label: 'Город', visible: false, sort: 0, val: (ofr: Offer) => {
            return ofr.locality;
        }
        },
        {
            id: 'district', label: 'Район', visible: false, sort: 0, val: (ofr: Offer) => {
            return ofr.district;
        }
        },
        {
            id: 'poi', label: 'Ориентир', visible: false, sort: 0, val: (ofr: Offer) => {
            return ofr.poi;
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
            id: 'apScheme', label: 'Планировка', visible: true, sort: 0, val: (ofr: Offer) => {
            return this.apSchemaOptions[ofr.apSchemeId];
        }
        },
        {
            id: 'houseType', label: 'Материал', visible: true, sort: 0, val: (ofr: Offer) => {
            return this.houseTypeOptions[ofr.houseTypeId];
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
            id: 'personName', label: 'Контакт', visible: true, sort: 0, val: (ofr: Offer) => {
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
            id: 'agentName', label: 'Агент', visible: true, sort: 0, val: (ofr: Offer) => {
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
            return moment(ofr.addDate * 1000).format('DD.MM.YY hh:mm');
        }
        },
        {
            id: 'changeDate', label: 'Назначено', visible: false, sort: 0, val: (ofr: Offer) => {
            //return moment(ofr.assignDate * 1000).format('DD.MM.YY hh:mm')
            return moment(ofr.changeDate * 1000).format('DD.MM.YY hh:mm');
        }
        },
        {
            id: 'changeDate', label: 'Изменено', visible: false, sort: 0, val: (ofr: Offer) => {
            return moment(ofr.changeDate * 1000).format('DD.MM.YY hh:mm');
        }
        },
        {
            id: 'lastSeenDate', label: 'Актуально', visible: true, sort: 0, val: (ofr: Offer) => {
            return moment(ofr.lastSeenDate * 1000).format('DD.MM.YY hh:mm');
        }
        }
    ];

    constructor(private _elem: ElementRef, private _hubService: HubService, private _offerService: OfferService, private _userService: UserService) {
    };

    ngOnInit() {
        this.calcSize();

        let tfStr = localStorage.getItem('tableFields');
        if (tfStr) {
            let tf = JSON.parse(tfStr);
            console.log(tf);

            for (var fid in tf) {
                console.log(fid);
                this.fields.forEach(f => {
                    if (f.id == fid) {
                        f.visible = tf[fid];
                    }
                });
            }

        }
    }

    onResize(e) {
        this.calcSize();
    }

    scroll(e) {
        if (e.currentTarget.scrollTop + this.contentHeight >= e.currentTarget.scrollHeight) {
            this.onListEnd.emit({bla: 'bla'});
        }
    }

    openOffer(offer: Offer) {
        var tab_sys = this._hubService.getProperty('tab_sys');
        offer.openDate = Math.round((Date.now() / 1000));
        tab_sys.addTab('offer', {offer: offer});
    }

    click(event: MouseEvent, offer: Offer) {
        var cIdx = this.offers.indexOf(offer);

        if (event.button == 2) {    // right click
            if (this.selectedOffers.indexOf(offer) == -1) { // if not over selected items
                this.lastClckIdx = cIdx;
                this.selectedOffers = [offer];
            }
        } else {
            if (event.ctrlKey) {
                // add to selection
                this.lastClckIdx = cIdx;
                this.selectedOffers.push(offer);
            } else if (event.shiftKey) {
                this.selectedOffers = [];
                var idx = cIdx;
                var idx_e = this.lastClckIdx;
                if (cIdx > this.lastClckIdx) {
                    idx = this.lastClckIdx;
                    idx_e = cIdx;
                }
                while (idx <= idx_e) {
                    var oi = this.offers[idx++];
                    this.selectedOffers.push(oi);
                }
            } else {
                this.lastClckIdx = cIdx;
                this.selectedOffers = [offer];
            }
        }
        this.onSelect.emit(this.selectedOffers);
    }

    dblClick(offer: Offer) {
        this.openOffer(offer);
    }

    tStart(offer: Offer) {
        clearTimeout(this.to);
        this.to = setTimeout(() => {
            this.openOffer(offer);
        }, 1000);
    }

    tEnd(offer: Offer) {
        clearTimeout(this.to);
    }

    tableContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();

        var c = this;
        var users: User[] = this._userService.listCached("", 0, "");
        var uOpt = [];
        uOpt.push(
            {class: "entry", disabled: false, label: "Не задано", callback: function() {
                c.selectedOffers.forEach(o => {
                    o.agentId = null;
                    o.agent = null;
                    c._offerService.save(o);
                })
            }},
        );
        users.forEach(u => {
            uOpt.push(
                {class: "entry", disabled: false, label: u.name, callback: function() {
                    c.selectedOffers.forEach(o => {
                        o.agentId = u.id;
                        o.agent = u;
                        c._offerService.save(o);
                    })
                }},
            )
        });

        var stageOpt = [];

        this.stageCodeOptions.forEach(s => {
            stageOpt.push(
                {
                    class: "entry", disabled: false, label: s.label, callback: function () {
                    c.selectedOffers.forEach(o => {
                        o.stageCode = s.value;
                        c._offerService.save(o);
                    });
                    /*)
                    setTimeout(function () {
                        c.listOffers();
                    }, 1200);
                    */
                }
                }
            )
        });

        let menu = {
            pX: e.pageX,
            pY: e.pageY,
            scrollable: false,
            items: [
                {class: "entry", disabled: false, icon: "check", label: 'Проверить', callback: () => {
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    var rq = [];
                    this.selectedOffers.forEach(o => {
                        rq.push(o.person.phones.join(" "));
                    });
                    tab_sys.addTab('list_offer', {query: rq.join(" ")});
                }},
                {class: "entry", disabled: false, icon: "document", label: 'Открыть', callback: () => {
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    this.selectedOffers.forEach(o => {
                        tab_sys.addTab('offer', {offer: o});
                    })
                }},
                {class: "entry", disabled: false, icon: "trash", label: 'Удалить', callback: () => {
                    this.selectedOffers.forEach(o => {
                        o.stageCode = 'archive';
                        c._offerService.save(o);
                    });
                    /*
                    setTimeout(function () {
                        c.listOffers();
                    }, 1200);
                    */
                }},
                {class: "delimiter"},
                {class: "submenu", disabled: false, icon: "edit", label: "Стадия", items: stageOpt},
                {class: "submenu", disabled: false, icon: "person", label: "Назначить", items: uOpt},
                {class: "submenu", disabled: true, icon: "month", label: "Задача", items: [
                    {class: "entry", disabled: false, label: "пункт x1", callback: function() {alert('yay s1!')}},
                    {class: "entry", disabled: false, label: "пункт x2", callback: function() {alert('yay s2!')}},
                ]},
                {class: "submenu", disabled: true, icon: "", label: "Реклама", items: [
                    {class: "entry", disabled: false, label: "пункт x1", callback: function() {alert('yay s1!')}},
                    {class: "entry", disabled: false, label: "пункт x2", callback: function() {alert('yay s2!')}},
                ]},
                {class: "delimiter"},
                {class: "entry", disabled: false, icon: "tag", label: 'Теги', callback: () => {}},
            ]
        };

        this._hubService.shared_var['cm'] = menu;
        this._hubService.shared_var['cm_hidden'] = false;
    }

    theaderContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();

        let menu = {
            pX: e.pageX,
            pY: e.pageY,
            scrollable: true,
            items: []
        };

        this.fields.forEach(f => {
            menu.items.push(
                {
                    class: "entry_cb", disabled: false, value: f.visible, label: f.label, callback: () => {
                        this.toggleVisibility(f.id);
                    }
                }
            );
        })

        this._hubService.shared_var['cm'] = menu;
        this._hubService.shared_var['cm_hidden'] = false;
    }

    toggleVisibility(field_id: string) {
        let flds = {};
        this.fields.forEach(f => {
            if (f.id == field_id) {
                f.visible = !f.visible;
            }
            flds[f.id] = f.visible;
        });
        localStorage.setItem('tableFields', JSON.stringify(flds));
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
