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
var hub_service_1 = require("../../service/hub.service");
var config_service_1 = require("../../service/config.service");
var offer_service_1 = require("../../service/offer.service");
var request_service_1 = require("../../service/request.service");
var task_service_1 = require("../../service/task.service");
var history_service_1 = require("../../service/history.service");
var photo_service_1 = require("../../service/photo.service");
var user_service_1 = require("../../service/user.service");
var analysis_service_1 = require("../../service/analysis.service");
var offer_1 = require("../../class/offer");
var person_service_1 = require("../../service/person.service");
var TabOfferComponent = (function () {
    function TabOfferComponent(_hubService, _configService, _offerService, _requestService, _taskService, _analysisService, _historyService, _photoService, _userService, _personService) {
        var _this = this;
        this._hubService = _hubService;
        this._configService = _configService;
        this._offerService = _offerService;
        this._requestService = _requestService;
        this._taskService = _taskService;
        this._analysisService = _analysisService;
        this._historyService = _historyService;
        this._photoService = _photoService;
        this._userService = _userService;
        this._personService = _personService;
        this.agentOpts = [];
        this.personOpts = [];
        this.paneHidden = false;
        this.editEnabled = false;
        this.ch1_data = [];
        this.ch2_data = [];
        this.ch3_data = [];
        this.ch4_data = [];
        this.offerTypeCodeOptions = [
            { value: 'sale', label: 'Продажа' },
            { value: 'rent', label: 'Аренда' }
        ];
        this.stateCodeOptions = [
            { value: 'raw', label: 'Не активен' },
            { value: 'active', label: 'Активен' },
            { value: 'work', label: 'В работе' },
            { value: 'suspended', label: 'Приостановлен' },
            { value: 'archive', label: 'Архив' }
        ];
        this.stageCodeOptions = [
            { value: 'contact', label: 'Первичный контакт' },
            { value: 'pre_deal', label: 'Заключение договора' },
            { value: 'show', label: 'Показ' },
            { value: 'prep_deal', label: 'Подготовка договора' },
            { value: 'decision', label: 'Принятие решения' },
            { value: 'negs', label: 'Переговоры' },
            { value: 'deal', label: 'Сделка' }
        ];
        this.typeCodeOptions = [
            { value: 'room', label: 'Комната' },
            { value: 'apartment', label: 'Квартира' },
            { value: 'apartment_small', label: 'Малосемейка' },
            { value: 'apartment_new', label: 'Новостройка' },
            { value: 'house', label: 'Дом' },
            { value: 'dacha', label: 'Дача' },
            { value: 'cottage', label: 'Коттедж' },
            { value: 'townhouse', label: 'Таунхаус' },
            { value: 'other', label: 'Другое' },
            { value: 'land', label: 'Земля' },
            { value: 'building', label: 'здание' },
            { value: 'office_place', label: 'офис' },
            { value: 'office', label: 'офис' },
            { value: 'market_place', label: 'торговая площадь' },
            { value: 'production_place', label: 'производственное помещение' },
            { value: 'gpurpose_place', label: 'помещение общего назначения' },
            { value: 'autoservice_place', label: 'автосервис' },
            { value: 'service_place', label: 'помещение под сферу услуг' },
            { value: 'warehouse_place', label: 'склад база' },
            { value: 'garage', label: 'гараж' }
        ];
        this.apSchemaOptions = [
            { value: 0, label: '-' },
            { value: 1, label: 'Индивидуальная' },
            { value: 2, label: 'Новая' },
            { value: 3, label: 'Общежитие' },
            { value: 4, label: 'Сталинка' },
            { value: 5, label: 'Улучшенная' },
            { value: 6, label: 'Хрущевка' }
        ];
        this.roomSchemeOptions = [
            { value: 0, label: '-' },
            { value: 1, label: 'Икарус' },
            { value: 2, label: 'Кухня-гостинная' },
            { value: 3, label: 'Раздельные' },
            { value: 4, label: 'Смежно-раздельные' },
            { value: 5, label: 'Смежные' },
            { value: 6, label: 'Студия' }
        ];
        this.houseTypeOptions = [
            { value: 0, label: '-' },
            { value: 1, label: 'Брус' },
            { value: 2, label: 'Деревянный' },
            { value: 3, label: 'Каркасно-засыпной' },
            { value: 4, label: 'Кирпичный' }
        ];
        this.conditionOptions = [
            { value: 0, label: '-' },
            { value: 1, label: 'социальный ремонт' },
            { value: 2, label: 'сделан ремонт' },
            { value: 3, label: 'дизайнерский ремонт' },
            { value: 4, label: 'требуется ремонт' },
            { value: 5, label: 'требуется косм. ремонт' },
            { value: 6, label: 'после строителей' },
            { value: 7, label: 'евроремонт' },
            { value: 8, label: 'удовлетворительное' },
            { value: 9, label: 'нормальное' }
        ];
        this.balconyOptions = [
            { value: 0, label: '-' },
            { value: 1, label: 'без балкона' },
            { value: 2, label: 'балкон' },
            { value: 3, label: 'лоджия' },
            { value: 4, label: '2 балкона' },
            { value: 5, label: '2 лоджии' },
            { value: 6, label: 'балкон и лоджия' },
            { value: 7, label: 'балкон застеклен' },
            { value: 8, label: 'лоджия застеклена' }
        ];
        this.bathroomOptions = [
            { value: 0, label: '-' },
            { value: 1, label: 'без удобств' },
            { value: 2, label: 'туалет' },
            { value: 3, label: 'с удобствами' },
            { value: 4, label: 'душ и туалет' },
            { value: 5, label: '2 смежных санузла' },
            { value: 6, label: '2 раздельных санузла' },
            { value: 7, label: 'санузел совмещенный' }
        ];
        setTimeout(function () {
            if (_this.offer.id) {
                _this.tab.header = 'Объект ' + _this.offer.id;
            }
            else {
                _this.tab.header = 'Новый Объект';
            }
        });
        this._userService.list(null, null, "").subscribe(function (agents) {
            for (var i = 0; i < agents.length; i++) {
                var a = agents[i];
                _this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
        this._personService.list(null, null, "").subscribe(function (persons) {
            for (var i = 0; i < persons.length; i++) {
                var p = persons[i];
                _this.personOpts.push({
                    value: p.id,
                    label: p.name
                });
            }
        });
    }
    TabOfferComponent.prototype.log = function (e) {
        console.log(e);
    };
    TabOfferComponent.prototype.ngOnInit = function () {
        this.offer = this.tab.args.offer;
        var c = this._configService.getConfig();
        this.zoom = c.map.zoom;
        if (this.offer.locationLat) {
            this.lat = this.offer.locationLat;
            this.lon = this.offer.locationLon;
        }
        else {
            this.lat = c.map.lat;
            this.lon = c.map.lon;
        }
        if (this.offer.id == null && this.offer.sourceUrl == null) {
            this.offer = new offer_1.Offer();
            if (this.tab.args.person) {
                this.offer.personId = this.tab.args.person.id;
            }
            this.editEnabled = true;
        }
        this.calcSize();
    };
    TabOfferComponent.prototype.onResize = function (e) {
        this.calcSize();
    };
    TabOfferComponent.prototype.calcSize = function () {
        if (this.paneHidden) {
            this.paneWidth = 0;
        }
        else {
            this.paneWidth = 420;
        }
        this.mapWidth = document.body.clientWidth - (30 * 2) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 31;
    };
    TabOfferComponent.prototype.toggleLeftPane = function () {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    };
    TabOfferComponent.prototype.toggleEdit = function () {
        this.editEnabled = !this.editEnabled;
    };
    TabOfferComponent.prototype.agentChanged = function (e) {
        var _this = this;
        this.offer.agentId = e.selected.value;
        if (this.offer.agentId != null) {
            this._userService.get(this.offer.agentId).subscribe(function (agent) {
                _this.offer.agent = agent;
            });
        }
    };
    TabOfferComponent.prototype.personChanged = function (e) {
        var _this = this;
        this.offer.personId = e.selected.value;
        if (this.offer.personId != null) {
            this._personService.get(this.offer.personId).subscribe(function (person) {
                _this.offer.person = person;
            });
        }
    };
    TabOfferComponent.prototype.save = function () {
        var _this = this;
        this._offerService.save(this.offer).subscribe(function (offer) {
            setTimeout(function () {
                _this.offer = offer;
            });
            _this.toggleEdit();
        });
    };
    TabOfferComponent.prototype.similarObjSelected = function () {
        this.getSimilarOffers(1, 16);
    };
    TabOfferComponent.prototype.requestsSelected = function () {
        //this.requests = this._requestService.list(1, 16, "", "");
    };
    TabOfferComponent.prototype.analysisSelected = function () {
        var a_data = this._analysisService.getObjAnalysis();
        this.ch1_data = a_data.ch1_data;
        this.ch1_data_v1 = a_data.ch1_data_v1;
        this.ch2_data = a_data.ch2_data;
        this.ch2_data_v1 = a_data.ch2_data_v1;
        this.ch3_data = a_data.ch3_data;
        this.ch3_data_v1 = a_data.ch3_data_v1;
        this.ch3_data_v2 = a_data.ch3_data_v2;
        this.ch4_data = [
            ['media', 'подано'],
            ['avito', 7],
            ['из рук в руки', 4],
            ['презент', 6],
            ['фарпост', 8],
            ['ВНХ', 6],
        ];
        this.ch4_data_v1 = 31;
        this.ch4_data_v2 = 5000;
    };
    TabOfferComponent.prototype.historySelected = function () {
        this.historyRecs = this._historyService.getObjHistory();
    };
    TabOfferComponent.prototype.getSimilarOffers = function (page, per_page) {
        var _this = this;
        this._offerService.getSimilar(page, per_page).subscribe(function (data) {
            _this.similarOffers = data;
        }, function (err) { return console.log(err); });
    };
    TabOfferComponent.prototype.simSearch = function () {
        this.getSimilarOffers(Math.floor(Math.random() * 4), 16);
    };
    TabOfferComponent.prototype.simSearchKeydown = function (e) {
        if (e.keyCode == 13) {
            this.simSearch();
        }
    };
    TabOfferComponent.prototype.markerClick = function (o) {
        //r.selected = !r.selected;
        // scroll to object ???
    };
    return TabOfferComponent;
}());
TabOfferComponent = __decorate([
    core_1.Component({
        selector: 'tab-offer',
        inputs: ['tab'],
        styles: ["\n        .pane {\n            float: left;\n            width: 370px;\n            height: 100%;\n            border-right: 1px solid #ccc;\n        }\n        \n        .work-area {\n            float: left;\n            width: 100%;\n            height: 100%;\n        }\n        \n        .tab-button {\n            width: 30px;\n            height: 30px;\n            text-align: center;\n            line-height: 30px;\n            font-size: 12px !important;\n            cursor: pointer;\n            color: #666;\n        }\n        \n        .fixed-button {\n            position: fixed;\n            top: 0;\n            left: 0;\n        }\n\n        .offer-prop {\n            overflow-y: scroll;\n        }\n\n        .view-group {\n            margin-bottom: 5px;    \n            display: flex;\n            justify-content: space-between;\n\n        }\n        \n        .view-label {\n            white-space: nowrap;\n            color: #bbb;\n    \n            font-size: 15px;\n        }\n        \n        .view-value {\n            width: 100%;;\n            text-align: right;\n            color: #696969;\n            font-size: 15px;\n    \n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n        }\n        \n        .edit-value {\n            width: 100%;\n            text-align: right;\n            color: #696969;\n            font-size: 15px;\n    \n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n    \n            border: none !important;\n            border-bottom: 1px solid #E5E5E5 !important;\n        }\n\n        .text-value {\n            height: 3rem;\n            border: 1px solid #E5E5E5 !important;\n        }\n\n        .edit-block > .view-group {\n            margin-bottom: 26px;\n        }\n\n        .tile-x {\n            margin-right: 10px;\n            width: 150px;\n            height: 150px;\n            color: #fff;\n            position: relative;\n        }\n\n        .tile {\n            margin: 0 10px 0 0;\n        }\n        \n        .icon {\n            line-height: 64px;\n        }\n        \n        .tile-content.iconic .icon {\n            width: 128px;\n            margin-left: -64px;\n        }\n        \n        .chart-block {\n            overflow:hidden;\n            border: 1px solid #e5e5e5;\n        }\n        \n        .chart-header {\n            width: 100%;\n            height: 30px;\n            border-bottom: 1px solid #e5e5e5;\n            line-height: 30px;\n            color: #fff;\n        }\n    "],
        template: "\n        <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n            <span [ngClass]=\"{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}\"></span>\n        </div>\n\n        <div class=\"offer\" (window:resize)=\"onResize($event)\">\n\n            <!-- \u041F\u0420\u0410\u0412\u0410\u042F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"pane\" [hidden]=\"paneHidden\" [style.width.px]=\"paneWidth\">\n                <div class=\"header\">\n                    <div class=\"header-label\">{{ tab.header }}</div>\n                </div>\n                <div class=\"offer-prop\" [style.height]=\"paneHeight\">\n                    <div style=\"margin: 5px;\">\n                        <div class=\"pull-container\">\n                            <div class=\"font-sz-2 pull-left\">\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: <span class=\"color-g1\"><a href=\"\" target=\"_blank\">{{ offer.sourceMedia }}</a></span></div>\n                            <div class=\"font-sz-1 color-g2 pull-right\"> {{offer.changeDate | formatDate }} </div>\n                        </div>\n                        <div class=\"font-sz-2 color-g2 line-clamp line-clamp-2\" style=\"margin: 5px 5px 0 5px;\">{{ offer.sourceMediaText }}</div>\n                        <hr>\n    \n                        <div class=\"pull-container\" style=\"margin: 0 10px;\">\n                            <div class=\"pull-right\" [hidden]=\"editEnabled\" (click)=\"toggleEdit()\"><a href=\"#\" >\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</a></div>\n                            <div class=\"pull-right\" [hidden]=\"!editEnabled\" (click)=\"save()\"><a href=\"#\" >\u0413\u043E\u0442\u043E\u0432\u043E</a></div>\n                        </div>\n    \n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n    \n                        <div class=\"edit-block\" [hidden]=\"!editEnabled\" style=\"margin: 20px 10px;\">\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"agentOpts\"\n                                    [value]=\"offer.agent?.id\"\n                                    (onChange)=\"agentChanged($event)\"\n                                >\n                                </ui-select>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0442\u0443\u0441</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"stateCodeOptions\"\n                                    [value]=\"offer.stateCode\"\n                                    (onChange)=\"offer.stateCode = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0434\u0438\u044F</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"stageCodeOptions\"\n                                    [value]=\"1\"\n                                    (onChange)=\"offer.stageCode = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"personOpts\"\n                                    [value]=\"offer.person?.id\"\n                                    (onChange)=\"personChanged($event)\"\n                                >\n                                </ui-select>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\"></span>\n                                <span class=\"view-value\"> </span>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0414\u043E\u0433\u043E\u0432\u043E\u0440</span>\n                                <span class=\"view-value\"> ... </span>\n                            </div>\n    \n                            <br>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"offerTypeCodeOptions\"\n                                    [value]=\"offer.offerTypeCode\"\n                                    (onChange)=\"offer.offerTypeCode = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0422\u0438\u043F \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"typeCodeOptions\"\n                                    [value]=\"offer.typeCode\"\n                                    (onChange)=\"offer.typeCode = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n    \n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0413\u043E\u0440\u043E\u0434</span>\n                                <input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"offer.locality\">\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0420\u0430\u0439\u043E\u043D</span>\n                                <input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"offer.district\">\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0410\u0434\u0440\u0435\u0441</span>\n                                <input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"offer.address\">\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041D\u043E\u043C\u0435\u0440</span>\n                                <input class=\"view-value edit-value vv-2\" [(ngModel)]=\"offer.houseNum\">/\n                                <input class=\"view-value edit-value vv-2\" [(ngModel)]=\"offer.apNum\">\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u043A\u0430</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"apSchemaOptions\"\n                                    [value]=\"offer.apSchemeId\"\n                                    (onChange)=\"offer.apSchemeId = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0441\u0442\u0435\u043D</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"houseTypeOptions\"\n                                    [value]=\"offer.houseTypeId\"\n                                    (onChange)=\"offer.houseTypeId = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u043E\u043C\u043D\u0430\u0442</span>\n                                <input type=\"number\" class=\"view-value edit-value vv-2\" [(ngModel)]=\"offer.roomsOfferCount\">/\n                                <input type=\"number\" class=\"view-value edit-value vv-2\" [(ngModel)]=\"offer.roomsCount\">\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0422\u0438\u043F \u043A\u043E\u043C\u043D\u0430\u0442\u044B</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"roomSchemeOptions\"\n                                    [value]=\"offer.roomSchemeId\"\n                                    (onChange)=\"offer.roomSchemeId = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u042D\u0442\u0430\u0436</span>\n                                <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"offer.floor\">/\n                                <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"offer.floorsCount\">/\n                                <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"offer.levelsCount\">\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041F\u043B\u043E\u0449\u0430\u0434\u044C</span>\n                                <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"offer.squareTotal\">/\n                                <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"offer.squareLiving\">/\n                                <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"offer.squareKitchen\">\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0411\u0430\u043B\u043A\u043E\u043D</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"balconyOptions\"\n                                    [value]=\"offer.balconyId\"\n                                    (onChange)=\"offer.balconyId = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0430\u043D\u0443\u0437\u0435\u043B</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"bathroomOptions\"\n                                    [value]=\"offer.bathroomId\"\n                                    (onChange)=\"offer.bathroomId = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"conditionOptions\"\n                                    [value]=\"offer.conditionId\"\n                                    (onChange)=\"offer.conditionId = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0426\u0435\u043D\u0430</span>\n                                <input class=\"view-value edit-value vv-2\" [(ngModel)]=\"offer.ownerPrice\">/\n                                <input class=\"view-value edit-value vv-2\" [(ngModel)]=\"offer.agencyPrice\">\n                            </div>\n    \n                            <div class=\"view-group\" style=\"flex-wrap: wrap;\">\n                                <span class=\"view-label\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</span>\n                                <textarea class=\"view-value text-value\" placeholder=\"\" [(ngModel)]=\"offer.description\" style=\"text-align: left;\"></textarea>\n                            </div>\n    \n                        </div>\n    \n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: ???? -->\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n    \n                        <div class=\"view-block\" [hidden]=\"editEnabled\" style=\"margin: 20px 10px;\">\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                                <span class=\"view-value\"> {{ offer.agent?.name }} </span>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0442\u0443\u0441</span>\n                                <ui-view-value\n                                    [options] = \"stateCodeOptions\"\n                                    [value]=\"offer.stateCode\"\n                                > \n                                </ui-view-value>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0434\u0438\u044F</span>\n                                <ui-view-value\n                                    [options] = \"stageCodeOptions\"\n                                    [value]=\"offer.stageCode\"\n                                >\n                                </ui-view-value>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A</span>\n                                <span class=\"view-value\"> {{ offer.person?.name }} </span>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\"></span>\n                                <span class=\"view-value\"> </span>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0414\u043E\u0433\u043E\u0432\u043E\u0440</span>\n                                <span class=\"view-value\"> </span>\n                            </div>\n        \n                            <br>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</span>\n                                <ui-view-value\n                                    [options] = \"offerTypeCodeOptions\"\n                                    [value]=\"offer.offerTypeCode\"\n                                >\n                                </ui-view-value>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0422\u0438\u043F \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438</span>\n                                <ui-view-value\n                                    [options] = \"typeCodeOptions\"\n                                    [value]=\"offer.typeCode\"\n                                >\n                                </ui-view-value>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0413\u043E\u0440\u043E\u0434</span>\n                                <span class=\"view-value\"> {{ offer.locality }} </span>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0420\u0430\u0439\u043E\u043D</span>\n                                <span class=\"view-value\"> {{ offer.district }} </span>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0410\u0434\u0440\u0435\u0441</span>\n                                <span class=\"view-value\"> {{ offer.address + ' ' + (offer.houseNum | strNn) }} </span>\n                            </div>\n                            \n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u043A\u0430</span>                               \n                                <ui-view-value\n                                    [options] = \"apSchemaOptions\"\n                                    [value]=\"offer.apSchemeId\"\n                                >\n                                </ui-view-value>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0441\u0442\u0435\u043D</span>\n                                <ui-view-value\n                                    [options] = \"houseTypeOptions\"\n                                    [value]=\"offer.houseTypeId\"\n                                >\n                                </ui-view-value>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u043E\u043C\u043D\u0430\u0442</span>\n                                <span class=\"view-value\"> {{ offer.roomsCount }} </span>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0422\u0438\u043F \u043A\u043E\u043C\u043D\u0430\u0442</span>\n                                <ui-view-value\n                                    [options] = \"roomSchemeOptions\"\n                                    [value]=\"offer.roomSchemeId\"\n                                >\n                                </ui-view-value>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u042D\u0442\u0430\u0436</span>\n                                <span class=\"view-value\"> {{ offer.floor }} </span>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041F\u043B\u043E\u0449\u0430\u0434\u044C</span>\n                                <span class=\"view-value\"> {{ offer.squareTotal }} </span>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0411\u0430\u043B\u043A\u043E\u043D</span>\n                                <ui-view-value\n                                    [options] = \"balconyOptions\"\n                                    [value]=\"offer.balconyId\"\n                                >\n                                </ui-view-value>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0421\u0430\u043D\u0443\u0437\u0435\u043B</span>\n                                <ui-view-value\n                                    [options] = \"bathroomOptions\"\n                                    [value]=\"offer.bathroomId\"\n                                >\n                                </ui-view-value>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435</span>\n                                <ui-view-value\n                                    [options] = \"conditionOptions\"\n                                    [value]=\"offer.conditionId\"\n                                >\n                                </ui-view-value>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0426\u0435\u043D\u0430</span>\n                                <span class=\"color-attention view-value\"> {{ offer.ownerPrice }} \u0442\u044B\u0441. \u0440\u0443\u0431.</span>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</span>\n                                <span class=\"view-value\" style=\"height: initial;\"> {{ offer.description }} </span>\n                            </div>\n        \n                        </div>\n    \n                        <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n            \n                        <div style=\"margin-bottom: 20px;\">\n                            <div class=\"view-group\">\n                                <span class=\"icon-tag\"> \u0422\u044D\u0433\u0438</span>\n                            </div>\n                            <ui-tag-block\n                                [value] = \"offer.tag\"\n                                (valueChange) = \"offer.tag = $event.value\"\n                            ></ui-tag-block>\n                        </div>\n            \n                        <div style=\"margin-bottom: 20px;\">\n                            <div class=\"view-group\">\n                                <span class=\"icon-photo\"> \u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438</span>\n                            </div>\n                            <ui-carousel\n                                [photos] = \"offer.photoUrl\"\n                            >\n                            </ui-carousel>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <!-- \u041F\u0420\u0410\u0412\u0410\u042F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041A\u041E\u041D\u0415\u0426 -->\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"work-area\" [style.width.px]=\"mapWidth\">\n                <ui-tabs\n                    [headerMode]=\"!paneHidden\"\n                >\n                    <ui-tab\n                        [title]=\"'\u041A\u0430\u0440\u0442\u0430'\"\n                    >\n                        <google-map [latitude]=\"lat\" [longitude]=\"lon\" [zoom]=\"zoom\">\n                            <google-map-marker\n                                *ngIf=\"offer.locationLat\"\n                                (markerClick)=\"markerClick(offer)\"\n                                [latitude]=\"offer.locationLat\"\n                                [longitude]=\"offer.locationLon\"\n                                [info_str]=\"\"\n                            >\n                            </google-map-marker>\n                        </google-map>\n                    </ui-tab>\n                    <ui-tab\n                        [title]=\"'\u041F\u043E\u0445\u043E\u0436\u0438\u0435 \u043E\u0431\u044A\u0435\u043A\u0442\u044B'\"\n                        (tabSelect)=\"similarObjSelected()\"\n                    >\n                    <!-- \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0434\u0443\u043D\u0441\u0442\u0432\u043E, \u0441\u0432-\u0432\u043E right \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0438\u0437 HubService -->\n                    <!-- TODO: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C -->\n                        <div  style=\"position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;\" [style.right]=\"_hubService.shared_var['nb_width']\">\n                            <div style=\"width: 330px; background-color: #fff;\">\n                                <div class=\"header\">\n                                    <input type=\"text\" style=\"width: 280px; margin-left: 10px; border: none;\"\n                                        (keydown)=\"simSearchKeydown($event)\"\n                                    >\n                                    <span class=\"icon-search\" style=\"margin-left: 10px; cursor: pointer;\"\n                                        (click)=\"simSearch()\"\n                                    ></span>\n                                </div>\n                                <div class=\"\" style=\"width: 100%; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                                    <digest-offer *ngFor=\"let offer of similarOffers\"\n                                        [offer]=\"offer\"\n                                        [compact]=\"true\"\n                                    >\n                                    </digest-offer>\n                                </div>\n                            </div>\n                        </div>\n                        <google-map [latitude]=\"lat\" [longitude]=\"lon\" [zoom]=\"zoom\" [objects]=\"similarOffers\">\n                            <google-map-marker\n                                *ngIf=\"offer.locationLat\"\n                                (markerClick)=\"markerClick(offer)\"\n                                [latitude]=\"offer.locationLat\"\n                                [longitude]=\"offer.locationLon\"\n                                [info_str]=\"\"\n                            >\n                            </google-map-marker>\n                        </google-map>\n                    </ui-tab>\n                    <ui-tab\n                        [title]=\"'\u0417\u0430\u044F\u0432\u043A\u0438'\"\n                        (tabSelect)=\"requestsSelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <digest-request *ngFor=\"let request of requests\"\n                                [request]=\"request\"\n                            >\n                            </digest-request>\n                        </div>\n                    </ui-tab>\n                    <ui-tab [title]=\"'\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430'\"\n                        (tabSelect)=\"analysisSelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gred fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch1_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u0434\u0430\u0447</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gred\">\n                                        <span style=\"margin-left: 25px;\">\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C</span>\n                                    </div>\n                                    <div>\n                                        <ui-pie-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch1_data\"\n                                        >\n                                        </ui-pie-chart>\n                                    </div>\n                                </div>\n                            </div>\n        \n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-gorange fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439</span>\n                                    </div>\n                                    <div class=\"tile bg-gorange fg-white\" >\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u0440\u0443\u0431.</span>\n                                    </div>\n                                </div>\n        \n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gorange\">\n                                        <span style=\"margin-left: 25px;\">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</span>\n                                    </div>\n                                    <div>\n                                        <ui-bar-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch4_data\"\n                                        >\n                                        </ui-bar-chart>\n                                    </div>\n                                </div>\n                            </div>\n        \n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gblue fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch2_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u044F\u0432\u043E\u043A</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gblue\">\n                                        <span style=\"margin-left: 25px;\">\u0417\u0430\u044F\u0432\u043A\u0438</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch2_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n        \n        \n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-ggreen fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0423\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                    <div class=\"tile bg-ggreen fg-white\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041D\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-ggreen\">\n                                        <span style=\"margin-left: 25px;\">\u041F\u043E\u043A\u0430\u0437\u044B</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch3_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n        \n                        </div>\n                    </ui-tab>\n                    \n                    <ui-tab\n                        [title]=\"'\u0418\u0441\u0442\u043E\u0440\u0438\u044F'\"\n                        (tabSelect)=\"historySelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <digest-history *ngFor=\"let record of historyRecs\"\n                                [historyRecord]=\"record\"\n                            >\n                            </digest-history>\n                        </div>\n                    </ui-tab>\n                    \n                </ui-tabs>\n            </div>\n\n        <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041A\u041E\u041D\u0415\u0426 -->\n\n        </div>\n    ",
        providers: [offer_service_1.OfferService]
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService,
        config_service_1.ConfigService,
        offer_service_1.OfferService,
        request_service_1.RequestService,
        task_service_1.TaskService,
        analysis_service_1.AnalysisService,
        history_service_1.HistoryService,
        photo_service_1.PhotoService,
        user_service_1.UserService,
        person_service_1.PersonService])
], TabOfferComponent);
exports.TabOfferComponent = TabOfferComponent;
//# sourceMappingURL=tab-offer.component.js.map