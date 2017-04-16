"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var hub_service_1 = require("../service/hub.service");
var offer_service_1 = require("../service/offer.service");
var moment = require("moment/moment");
var user_service_1 = require("../service/user.service");
var OfferTableComponent = (function () {
    function OfferTableComponent(_elem, _hubService, _offerService, _userService) {
        var _this = this;
        this._elem = _elem;
        this._hubService = _hubService;
        this._offerService = _offerService;
        this._userService = _userService;
        this.selectedOffers = [];
        this.contentHeight = 600;
        this.page = 0;
        this.lastClckIdx = 0;
        this.timestamp = (Date.now() / 1000) - 1000;
        this.onSort = new core_2.EventEmitter();
        this.onListEnd = new core_2.EventEmitter();
        this.onSelect = new core_2.EventEmitter();
        this.stageCodeOptions = [
            { value: 'raw', label: 'Не активен' },
            { value: 'active', label: 'Активен' },
            { value: 'price', label: 'Прайс' },
            { value: 'deal', label: 'Сделка' },
            { value: 'suspended', label: 'Приостановлен' },
            { value: 'archive', label: 'Архив' }
        ];
        this.typeCodeOptions = {
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
        this.apSchemaOptions = {
            0: '-',
            1: 'Индивидуальная',
            2: 'Новая',
            3: 'Общежитие',
            4: 'Сталинка',
            5: 'Улучшенная',
            6: 'Хрущевка'
        };
        this.roomSchemeOptions = {
            0: '-',
            1: 'Икарус',
            2: 'Кухня-гостинная',
            3: 'Раздельные',
            4: 'Смежно-раздельные',
            5: 'Смежные',
            6: 'Студия'
        };
        this.houseTypeOptions = {
            0: '-',
            1: 'Брус',
            2: 'Деревянный',
            3: 'Каркасно-засыпной',
            4: 'Кирпичный'
        };
        this.conditionOptions = {
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
        this.balconyOptions = {
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
        this.bathroomOptions = {
            0: '-',
            1: 'без удобств',
            2: 'туалет',
            3: 'с удобствами',
            4: 'душ и туалет',
            5: '2 смежных санузла',
            6: '2 раздельных санузла',
            7: 'санузел совмещенный'
        };
        this.fields = [
            {
                id: 'stateCode', label: '#', visible: true, sort: 0, val: function (ofr) {
                    return ofr.stateCode;
                }
            },
            {
                id: 'photo', label: 'Фото', visible: true, sort: 0, val: function (ofr) {
                    //return ofr.main_photo_thumbnail;
                    return '';
                }
            },
            {
                id: 'typeCode', label: 'Тип', visible: true, sort: 0, val: function (ofr) {
                    return _this.typeCodeOptions[ofr.typeCode];
                }
            },
            {
                id: 'locality', label: 'Город', visible: false, sort: 0, val: function (ofr) {
                    return ofr.locality;
                }
            },
            {
                id: 'district', label: 'Район', visible: false, sort: 0, val: function (ofr) {
                    return ofr.district;
                }
            },
            {
                id: 'poi', label: 'Ориентир', visible: false, sort: 0, val: function (ofr) {
                    return ofr.poi;
                }
            },
            {
                id: 'address', label: 'Адрес', visible: true, sort: 0, val: function (ofr) {
                    return ofr.address;
                }
            },
            {
                id: 'roomsCount', label: 'Комнаты', visible: true, sort: 0, val: function (ofr) {
                    var res;
                    if (ofr.roomsOfferCount) {
                        res = ofr.roomsOfferCount;
                    }
                    if (ofr.roomsCount) {
                        if (res)
                            res += '/';
                        res += ofr.roomsCount;
                    }
                    return res;
                }
            },
            {
                id: 'apScheme', label: 'Планировка', visible: true, sort: 0, val: function (ofr) {
                    return _this.apSchemaOptions[ofr.apSchemeId];
                }
            },
            {
                id: 'houseType', label: 'Материал', visible: true, sort: 0, val: function (ofr) {
                    return _this.houseTypeOptions[ofr.houseTypeId];
                }
            },
            {
                id: 'floor', label: 'Этаж', visible: true, sort: 0, val: function (ofr) {
                    var res = '';
                    if (ofr.floor) {
                        res += ofr.floor;
                    }
                    if (ofr.floorsCount) {
                        if (res)
                            res += '/';
                        res += ofr.floorsCount;
                    }
                    return res;
                }
            },
            {
                id: 'squareTotal', label: 'Площадь', visible: true, sort: 0, val: function (ofr) {
                    return ofr.squareTotal;
                }
            },
            {
                id: 'sourceMedia', label: 'Источник', visible: true, sort: 0, val: function (ofr) {
                    return ofr.sourceMedia;
                }
            },
            {
                id: 'mediator', label: 'Предложение', visible: false, sort: 0, val: function (ofr) {
                    return '~';
                }
            },
            {
                id: 'personName', label: 'Контакт', visible: true, sort: 0, val: function (ofr) {
                    if (ofr.person)
                        return ofr.person.name;
                    return '';
                }
            },
            {
                id: 'ownerPrice', label: 'Цена', visible: true, sort: 0, val: function (ofr) {
                    return ofr.ownerPrice;
                }
            },
            {
                id: 'priceSq', label: 'Цена м2', visible: false, sort: 0, val: function (ofr) {
                    if (ofr.ownerPrice && ofr.squareTotal) {
                        return (ofr.ownerPrice / ofr.squareTotal) + '';
                    }
                    return '';
                }
            },
            {
                id: 'mls', label: 'MLS', visible: false, sort: 0, val: function (ofr) {
                    return '';
                }
            },
            {
                id: 'agentName', label: 'Агент', visible: true, sort: 0, val: function (ofr) {
                    if (ofr.agent)
                        return ofr.agent.name;
                    return '';
                }
            },
            {
                id: 'manager', label: 'Менеджер', visible: false, sort: 0, val: function (ofr) {
                    return '~';
                }
            },
            {
                id: 'reqests', label: 'Заявки', visible: false, sort: 0, val: function (ofr) {
                    return '10';
                }
            },
            {
                id: 'click_count', label: 'Кол-во кликов', visible: false, sort: 0, val: function (ofr) {
                    return '100';
                }
            },
            {
                id: 'progress', label: 'Прогресс', visible: false, sort: 0, val: function (ofr) {
                    return '50%';
                }
            },
            {
                id: 'addDate', label: 'Добавлено', visible: true, sort: 0, val: function (ofr) {
                    return moment(ofr.addDate * 1000).format('DD.MM.YY hh:mm');
                }
            },
            {
                id: 'changeDate', label: 'Назначено', visible: false, sort: 0, val: function (ofr) {
                    //return moment(ofr.assignDate * 1000).format('DD.MM.YY hh:mm')
                    return moment(ofr.changeDate * 1000).format('DD.MM.YY hh:mm');
                }
            },
            {
                id: 'changeDate', label: 'Изменено', visible: false, sort: 0, val: function (ofr) {
                    return moment(ofr.changeDate * 1000).format('DD.MM.YY hh:mm');
                }
            },
            {
                id: 'lastSeenDate', label: 'Актуально', visible: true, sort: 0, val: function (ofr) {
                    return moment(ofr.lastSeenDate * 1000).format('DD.MM.YY hh:mm');
                }
            }
        ];
    }
    ;
    OfferTableComponent.prototype.ngOnInit = function () {
        this.calcSize();
        var tfStr = localStorage.getItem('tableFields');
        if (tfStr) {
            var tf_1 = JSON.parse(tfStr);
            console.log(tf_1);
            for (var fid in tf_1) {
                console.log(fid);
                this.fields.forEach(function (f) {
                    if (f.id == fid) {
                        f.visible = tf_1[fid];
                    }
                });
            }
        }
    };
    OfferTableComponent.prototype.onResize = function (e) {
        this.calcSize();
    };
    OfferTableComponent.prototype.scroll = function (e) {
        if (e.currentTarget.scrollTop + this.contentHeight >= e.currentTarget.scrollHeight) {
            this.onListEnd.emit({ bla: 'bla' });
        }
    };
    OfferTableComponent.prototype.openOffer = function (offer) {
        var tab_sys = this._hubService.getProperty('tab_sys');
        offer.openDate = Math.round((Date.now() / 1000));
        tab_sys.addTab('offer', { offer: offer });
    };
    OfferTableComponent.prototype.click = function (event, offer) {
        var cIdx = this.offers.indexOf(offer);
        if (event.button == 2) {
            if (this.selectedOffers.indexOf(offer) == -1) {
                this.lastClckIdx = cIdx;
                this.selectedOffers = [offer];
            }
        }
        else {
            if (event.ctrlKey) {
                // add to selection
                this.lastClckIdx = cIdx;
                this.selectedOffers.push(offer);
            }
            else if (event.shiftKey) {
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
            }
            else {
                this.lastClckIdx = cIdx;
                this.selectedOffers = [offer];
            }
        }
        this.onSelect.emit(this.selectedOffers);
    };
    OfferTableComponent.prototype.dblClick = function (offer) {
        this.openOffer(offer);
    };
    OfferTableComponent.prototype.tStart = function (offer) {
        var _this = this;
        clearTimeout(this.to);
        this.to = setTimeout(function () {
            _this.openOffer(offer);
        }, 1000);
    };
    OfferTableComponent.prototype.tEnd = function (offer) {
        clearTimeout(this.to);
    };
    OfferTableComponent.prototype.tableContextMenu = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        var c = this;
        var users = this._userService.listCached("", 0, "");
        var uOpt = [];
        uOpt.push({ class: "entry", disabled: false, label: "Не задано", callback: function () {
                c.selectedOffers.forEach(function (o) {
                    o.agentId = null;
                    o.agent = null;
                    c._offerService.save(o);
                });
            } });
        users.forEach(function (u) {
            uOpt.push({ class: "entry", disabled: false, label: u.name, callback: function () {
                    c.selectedOffers.forEach(function (o) {
                        o.agentId = u.id;
                        o.agent = u;
                        c._offerService.save(o);
                    });
                } });
        });
        var stageOpt = [];
        this.stageCodeOptions.forEach(function (s) {
            stageOpt.push({
                class: "entry", disabled: false, label: s.label, callback: function () {
                    c.selectedOffers.forEach(function (o) {
                        o.stageCode = s.value;
                        c._offerService.save(o);
                    });
                    /*)
                    setTimeout(function () {
                        c.listOffers();
                    }, 1200);
                    */
                }
            });
        });
        var menu = {
            pX: e.pageX,
            pY: e.pageY,
            scrollable: false,
            items: [
                { class: "entry", disabled: false, icon: "check", label: 'Проверить', callback: function () {
                        var tab_sys = _this._hubService.getProperty('tab_sys');
                        var rq = [];
                        _this.selectedOffers.forEach(function (o) {
                            rq.push(o.person.phones.join(" "));
                        });
                        tab_sys.addTab('list_offer', { query: rq.join(" ") });
                    } },
                { class: "entry", disabled: false, icon: "document", label: 'Открыть', callback: function () {
                        var tab_sys = _this._hubService.getProperty('tab_sys');
                        _this.selectedOffers.forEach(function (o) {
                            tab_sys.addTab('offer', { offer: o });
                        });
                    } },
                { class: "entry", disabled: false, icon: "trash", label: 'Удалить', callback: function () {
                        _this.selectedOffers.forEach(function (o) {
                            o.stageCode = 'archive';
                            c._offerService.save(o);
                        });
                        /*
                        setTimeout(function () {
                            c.listOffers();
                        }, 1200);
                        */
                    } },
                { class: "delimiter" },
                { class: "submenu", disabled: false, icon: "edit", label: "Стадия", items: stageOpt },
                { class: "submenu", disabled: false, icon: "person", label: "Назначить", items: uOpt },
                { class: "submenu", disabled: true, icon: "month", label: "Задача", items: [
                        { class: "entry", disabled: false, label: "пункт x1", callback: function () { alert('yay s1!'); } },
                        { class: "entry", disabled: false, label: "пункт x2", callback: function () { alert('yay s2!'); } },
                    ] },
                { class: "submenu", disabled: true, icon: "", label: "Реклама", items: [
                        { class: "entry", disabled: false, label: "пункт x1", callback: function () { alert('yay s1!'); } },
                        { class: "entry", disabled: false, label: "пункт x2", callback: function () { alert('yay s2!'); } },
                    ] },
                { class: "delimiter" },
                { class: "entry", disabled: false, icon: "tag", label: 'Теги', callback: function () { } },
            ]
        };
        this._hubService.shared_var['cm'] = menu;
        this._hubService.shared_var['cm_hidden'] = false;
    };
    OfferTableComponent.prototype.theaderContextMenu = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        var menu = {
            pX: e.pageX,
            pY: e.pageY,
            scrollable: true,
            items: []
        };
        this.fields.forEach(function (f) {
            menu.items.push({
                class: "entry_cb", disabled: false, value: f.visible, label: f.label, callback: function () {
                    _this.toggleVisibility(f.id);
                }
            });
        });
        this._hubService.shared_var['cm'] = menu;
        this._hubService.shared_var['cm_hidden'] = false;
    };
    OfferTableComponent.prototype.toggleVisibility = function (field_id) {
        var flds = {};
        this.fields.forEach(function (f) {
            if (f.id == field_id) {
                f.visible = !f.visible;
            }
            flds[f.id] = f.visible;
        });
        localStorage.setItem('tableFields', JSON.stringify(flds));
    };
    OfferTableComponent.prototype.calcSize = function () {
        this.contentHeight = document.body.clientHeight - 115;
    };
    OfferTableComponent.prototype.toggleSort = function (f) {
        f.sort++;
        if (f.sort > 2)
            f.sort = 0;
        this.onSort.emit({ field: f.id, order: f.sort });
    };
    return OfferTableComponent;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], OfferTableComponent.prototype, "onSort", void 0);
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], OfferTableComponent.prototype, "onListEnd", void 0);
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], OfferTableComponent.prototype, "onSelect", void 0);
OfferTableComponent = __decorate([
    core_1.Component({
        selector: 'offer-table',
        inputs: ['offers'],
        styles: ["\n        .offer-table-wrapper {\n            padding-top: 115px;\n            height: 100%;\n            width: 100%;\n        }\n\n        .scroll-wrapper {\n            overflow: auto;\n        }\n\n        .table {\n            width: 100%;\n            font-size: 14px;\n            border-collapse: collapse;\n        }\n\n        .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {\n            padding: 5px;\n            font-weight: 200;\n            text-align: left;\n            vertical-align: top;\n            border-top: 1px solid #ddd;\n        }\n\n        .table>thead>tr>th, .table>thead>tr>td {\n            font-weight: 400;\n            border-bottom: 1px solid #ddd;\n            white-space: nowrap;\n\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n\n            cursor: pointer;\n        }\n\n        .table-striped>tbody>tr:nth-child(odd)>td, .table-striped>tbody>tr:nth-child(odd)>th {\n            background-color: #f9f9f9;\n        }\n\n        .seen > td {\n            background-color: #dbe2f0 !important;\n        }\n\n        .modified > td {\n            background-color: #dff0d8 !important;\n        }\n\n        .table > tbody > tr.selected > td {\n            color: #fff;\n            background-color: #3366cc !important;\n        }\n    "],
        template: "\n        <div class=\"offer-table-wrapper\" (window:resize)=\"onResize($event)\">\n            <div class=\"scroll-wrapper\" [style.height]=\"contentHeight\" (scroll)=\"scroll($event)\">\n                <table class=\"table table-striped\">\n                    <thead\n                        (contextmenu)=\"theaderContextMenu($event)\"\n                    >\n                        <tr>\n                            <th *ngFor=\"let f of fields\"\n                                [hidden]=\"!f.visible\"\n                                [style.width.xx]=\"f.width\"\n                                (click)=\"toggleSort(f)\"\n                            >\n                            {{ f.label }}\n                                <span *ngIf=\"f.sort==0\" class=\"icon-none\"></span>\n                                <span *ngIf=\"f.sort==1\" class=\"icon-chevron-up\"></span>\n                                <span *ngIf=\"f.sort==2\" class=\"icon-chevron-down\"></span>\n                            </th>\n                        </tr>\n                    </thead>\n                    <tbody\n                        (contextmenu)=\"tableContextMenu($event)\"\n                    >\n                        <tr *ngFor=\"let o of offers\"\n\n                            [class.seen]=\"o.openDate > timestamp\"\n                            [class.modified]=\"o.changeDate > timestamp\"\n\n                            [class.selected]=\"selectedOffers.indexOf(o) > -1\"\n                            (click)=\"click($event, o)\"\n                            (contextmenu)=\"click($event, o)\"\n                            (dblclick)=\"dblClick(o)\"\n                            (touchstart)=\"tStart(o)\"\n                            (touchend)=\"tEnd(o)\"\n                        >\n                            <td *ngFor=\"let f of fields\"\n                                [hidden]=\"!f.visible\"\n                                [style.width.xx]=\"f.width\"\n                            >\n                                <span *ngIf=\"f.id=='stateCode'\" class=\"icon-{{ f.val(o) }}\"></span>\n                                <span *ngIf=\"f.id=='photo' && o.photoUrl\" class=\"icon-photo\"></span>\n                                <span *ngIf=\"f.id!='stateCode' && f.id!='photo'\">{{ f.val(o) }}</span>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, hub_service_1.HubService, offer_service_1.OfferService, user_service_1.UserService])
], OfferTableComponent);
exports.OfferTableComponent = OfferTableComponent;
//# sourceMappingURL=offer-table.component.js.map