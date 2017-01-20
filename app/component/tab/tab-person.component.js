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
var analysis_service_1 = require("../../service/analysis.service");
var offer_1 = require("../../class/offer");
var person_1 = require("../../class/person");
var request_1 = require("../../class/request");
var hub_service_1 = require("../../service/hub.service");
var config_service_1 = require("../../service/config.service");
var offer_service_1 = require("../../service/offer.service");
var request_service_1 = require("../../service/request.service");
var task_service_1 = require("../../service/task.service");
var history_service_1 = require("../../service/history.service");
var person_service_1 = require("../../service/person.service");
var organisation_service_1 = require("../../service/organisation.service");
var user_service_1 = require("../../service/user.service");
var TabPersonComponent = (function () {
    function TabPersonComponent(_hubService, _configService, _offerService, _requestService, _taskService, _analysisService, _historyService, _personService, _organisationService, _userService) {
        var _this = this;
        this._hubService = _hubService;
        this._configService = _configService;
        this._offerService = _offerService;
        this._requestService = _requestService;
        this._taskService = _taskService;
        this._analysisService = _analysisService;
        this._historyService = _historyService;
        this._personService = _personService;
        this._organisationService = _organisationService;
        this._userService = _userService;
        this.person = new person_1.Person();
        this.organisationsOpts = [];
        this.agentOpts = [];
        this.paneHidden = false;
        this.editEnabled = false;
        this.requestOfferType = 'sale';
        this.ch1_data = [];
        this.ch2_data = [];
        this.ch3_data = [];
        this.ch4_data = [];
        _organisationService.list("").subscribe(function (organisations) {
            for (var i = 0; i < organisations.length; i++) {
                var o = organisations[i];
                _this.organisationsOpts.push({
                    value: o.id,
                    label: o.name
                });
            }
        });
        _userService.list("AGENT", null, "").subscribe(function (agents) {
            for (var i = 0; i < agents.length; i++) {
                var a = agents[i];
                _this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
    }
    TabPersonComponent.prototype.log = function (e) {
        console.log(e);
    };
    TabPersonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.person = this.tab.args.person;
        var c = this._configService.getConfig();
        this.zoom = c.map.zoom;
        this.lat = c.map.lat;
        this.lon = c.map.lon;
        if (this.person.organisationId) {
            this._organisationService.get(this.person.organisationId).subscribe(function (org) {
                _this.organisation = org;
            });
        }
        if (this.person.userId != null) {
            this._userService.get(this.person.userId).subscribe(function (agent) {
                _this.agent = agent;
            });
        }
        if (this.person.id == null) {
            this.toggleEdit();
        }
        this.calcSize();
    };
    TabPersonComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.tab.header = 'Контакт';
        });
    };
    TabPersonComponent.prototype.onResize = function (e) {
        this.calcSize();
    };
    TabPersonComponent.prototype.calcSize = function () {
        if (this.paneHidden) {
            this.paneWidth = 0;
        }
        else {
            this.paneWidth = 420;
        }
        this.mapWidth = document.body.clientWidth - (30 * 2) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 31;
    };
    TabPersonComponent.prototype.toggleLeftPane = function () {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    };
    TabPersonComponent.prototype.toggleEdit = function () {
        this.editEnabled = !this.editEnabled;
    };
    TabPersonComponent.prototype.agentChanged = function (e) {
        var _this = this;
        this.person.userId = e.selected.value;
        if (this.person.userId != null) {
            this._userService.get(this.person.userId).subscribe(function (agent) {
                _this.agent = agent;
            });
        }
    };
    TabPersonComponent.prototype.save = function () {
        var subj = this._personService.save(this.person);
        var component = this;
        subj.subscribe(function (x) {
            //console.log('Next: ' + x.toString());
        }, function (err) {
            //console.log('Error: ' + err);
        }, function () {
            component.toggleEdit();
        });
    };
    TabPersonComponent.prototype.offersSelected = function () {
        var _this = this;
        this._offerService.list(0, 32, offer_service_1.OfferSource.LOCAL, { offerTypeCode: this.requestOfferType, personId: this.person.id }, "", []).subscribe(function (offers) {
            _this.offers = offers;
        });
    };
    TabPersonComponent.prototype.requestsSelected = function () {
        var _this = this;
        this._requestService.list(0, 32, this.requestOfferType, null, this.person.id, "").subscribe(function (requests) {
            _this.requests = requests;
        });
    };
    TabPersonComponent.prototype.analysisSelected = function () {
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
    TabPersonComponent.prototype.historySelected = function () {
        this.historyRecs = this._historyService.getObjHistory();
    };
    TabPersonComponent.prototype.getOffers = function (page, per_page) {
        var _this = this;
        this._offerService.getSimilar(page, per_page).subscribe(function (data) {
            _this.offers = data;
        });
    };
    TabPersonComponent.prototype.offer_search = function () {
        this.getOffers(Math.floor(Math.random() * 4), 16);
    };
    TabPersonComponent.prototype.offer_search_keydown = function (e) {
        if (e.keyCode == 13) {
            this.offer_search();
        }
    };
    TabPersonComponent.prototype.markerClick = function (r) {
        console.log('markerClick');
        console.log(r);
        //r.selected = !r.selected;
        // scroll to object ???
    };
    TabPersonComponent.prototype.addPhone = function () {
        this.person.phones.push('');
    };
    TabPersonComponent.prototype.addEmail = function () {
        this.person.emails.push('');
    };
    TabPersonComponent.prototype.createRequest = function () {
        var tab_sys = this._hubService.getProperty('tab_sys');
        var req = new request_1.Request();
        req.personId = this.person.id;
        tab_sys.addTab('request', { request: req });
    };
    TabPersonComponent.prototype.toggleOffer = function (offer_type) {
        var _this = this;
        this.requestOfferType = offer_type;
        this._offerService.list(0, 32, offer_service_1.OfferSource.LOCAL, { offerTypeCode: this.requestOfferType, personId: this.person.id }, "", []).subscribe(function (offers) {
            _this.offers = offers;
        });
        this._requestService.list(0, 32, this.requestOfferType, null, this.person.id, "").subscribe(function (requests) {
            _this.requests = requests;
        });
    };
    TabPersonComponent.prototype.createOffer = function () {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', { offer: {}, person: this.person });
    };
    TabPersonComponent.prototype.getOfferDigest = function (r) {
        return offer_1.Offer.getDigest(r);
    };
    return TabPersonComponent;
}());
TabPersonComponent = __decorate([
    core_1.Component({
        selector: 'tab-person',
        inputs: ['tab'],
        styles: ["\n        .pane {\n            float: left;\n            width: 370px;\n            height: 100%;\n            border-right: 1px solid #ccc;\n        }\n        \n        .work-area {\n            float: left;\n            width: 100%;\n            height: 100%;\n        }\n        \n        .tab-button {\n            width: 30px;\n            height: 30px;\n            text-align: center;\n            line-height: 30px;\n            font-size: 12px !important;\n            cursor: pointer;\n            color: #666;\n        }\n        \n        .fixed-button {\n            position: fixed;\n            top: 0;\n            left: 0;\n        }\n\n        .view-group {\n            margin-bottom: 5px;\n            display: flex;\n            justify-content: space-between;\n        }\n        \n        .view-label {\n            white-space: nowrap;\n            color: #bbb;\n\n            font-size: 15px;\n        }\n      \n        .view-value {\n            width: 100%;;\n            text-align: right;\n            color: #696969;\n            font-size: 15px;\n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n        }\n        \n        .edit-value {\n            width: 100%;;\n            text-align: right;\n            color: #696969;\n            font-size: 15px;\n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n            border: none !important;\n            border-bottom: 1px solid #E5E5E5 !important;\n        }\n\n        .text-value {\n            height: 3rem;\n            border: 1px solid #E5E5E5 !important;\n        }\n\n        .edit-block > .view-group {\n            margin-bottom: 26px;\n        }\n\n        .tile-x {\n            margin-right: 10px;\n            width: 150px;\n            height: 150px;\n            color: #fff;\n            position: relative;\n        }\n\n\n        .tile {\n            margin: 0;\n            margin-right: 10px;\n        }\n        \n        .icon {\n            line-height: 64px;\n        }\n        \n        .tile-content.iconic .icon {\n            width: 128px;\n            margin-left: -64px;\n        }\n        \n        .chart-block {\n            overflow:hidden;\n            border: 1px solid #e5e5e5;\n        }\n      \n        .chart-header {\n            width: 100%;\n            height: 30px;\n            border-bottom: 1px solid #e5e5e5;\n            line-height: 30px;\n            color: #fff;\n        }\n\n        .array-container > span {\n            display: block;\n            margin-bottom: 5px;\n        }\n\n        .array-container > input {\n            margin-bottom: 5px;\n        }\n\n        .two-way-switch {\n            display: table;\n            border: 1px solid #3366cc;\n            cursor: pointer;\n        }\n\n        .two-way-switch > div {\n            display: table-cell;\n            width: 90px;\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #fff;\n            color: #333;\n        }\n\n        .two-way-switch > div.active {\n            background-color: #3366cc;\n            color: #fff;\n        }\n\n        .button {\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #3366cc;\n            color: #fff;\n            cursor: pointer;\n        }\n\n    "],
        template: "\n\n        <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n            <span [ngClass]=\"{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}\"></span>\n        </div>\n\n        <div class=\"person\" (window:resize)=\"onResize($event)\">\n\n        <!-- \u041B\u0415\u0412\u0410\u042F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"pane\" [hidden]=\"paneHidden\" [style.width.px]=\"paneWidth\">\n                <div class=\"header\">\n                    <div class=\"header-label\">\n                        {{ tab.header }}\n                    </div>\n                </div>\n                <div class=\"person-prop\" [style.height]=\"paneHeight\">\n                    <div style=\"margin: 5px;\">\n                        <div class=\"pull-container\">\n                            <div class=\"font-sz-2 pull-left\">\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: <span class=\"color-g1\"><a href=\"\" target=\"_blank\"></a></span></div>\n                            <div class=\"font-sz-1 color-g2 pull-right\"> {{ person.add_date | formatDate }} </div>\n                        </div>\n                        <hr>\n                        <div class=\"pull-container\" style=\"margin: 0 10px;\">\n                            <div class=\"pull-right\" [hidden]=\"editEnabled\" (click)=\"toggleEdit()\"><a href=\"#\" >\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</a></div>\n                            <div class=\"pull-right\" [hidden]=\"!editEnabled\" (click)=\"save()\"><a href=\"#\" >\u0413\u043E\u0442\u043E\u0432\u043E</a></div>\n                        </div>\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n                        <div class=\"edit-block\" [hidden]=\"!editEnabled\" style=\"margin: 20px 10px;\">\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"agentOpts\"\n                                    [value]=\"agent?.id\"\n                                    (onChange)=\"agentChanged($event)\"\n                                >\n                                </ui-select>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0418\u043C\u044F</span>\n                                <input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"person.name\">\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D <a *ngIf=\"person.phones.length < 3\" href=\"#\" (click)=\"addPhone()\"><span class=\"icon-add\"></span></a></span>\n                                <div class=\"array-container\">    \n                                    <input *ngIf=\"person.phones.length > 0\" type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"person.phones[0]\">\n                                    <input *ngIf=\"person.phones.length > 1\" type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"person.phones[1]\">\n                                    <input *ngIf=\"person.phones.length > 2\" type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"person.phones[2]\">\n                                </div>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">e-mail <a *ngIf=\"person.emails.length < 3\" href=\"#\" (click)=\"addEmail()\" ><span class=\"icon-add\"></span></a></span>\n                                <div class=\"array-container\">\n                                    <input *ngIf=\"person.emails.length > 0\" type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"person.emails[0]\">\n                                    <input *ngIf=\"person.emails.length > 1\" type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"person.emails[1]\">\n                                    <input *ngIf=\"person.emails.length > 2\" type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"person.emails[2]\">\n                                </div>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"organisationsOpts\"\n                                    [value]=\"organisation?.id\"\n                                    (onChange)=\"person.organisationId = $event.selected.value\"\n                                >\n                                </ui-select>\n                            </div>\n                            <br>\n                            <div class=\"view-group\" style=\"flex-wrap: wrap;\">\n                                <span class=\"view-label\">\u0418\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</span>\n                                <textarea class=\"view-value text-value\" placeholder=\"\" [(ngModel)]=\"person.info\" style=\"text-align: left;\"></textarea>\n                            </div>\n                        </div>\n\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n                        <div class=\"view-block\" [hidden]=\"editEnabled\" style=\"margin: 20px 10px;\">\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                                <span class=\"view-value\"> {{ agent?.name }}</span>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0418\u043C\u044F</span>\n                                <span class=\"view-value\"> {{ person.name }}</span>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D </span>\n                                <div class=\"array-container\">\n                                    <span *ngFor=\"let phone of person.phones\" class=\"view-value\"> {{ phone }} </span>\n                                </div>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">e-mail</span>\n                                <div class=\"array-container\">\n                                    <span *ngFor=\"let email of person.emails\" class=\"view-value\"> {{ email }} </span>\n                                </div>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F</span>\n                                <span class=\"view-value\"> {{ organisation?.name }}</span>\n                            </div>\n                            <br>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</span>\n                                <span class=\"view-value\" style=\"height: initial;\"> {{ person.info }} </span>\n                            </div>\n                        </div>\n\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n\n                        <div style=\"margin-bottom: 20px;\">\n                            <div class=\"view-group\">\n                                <span class=\"icon-tag\"> \u0422\u044D\u0433\u0438</span>\n                            </div>\n                            <ui-tag-block\n                                [value] = \"person.tag\"\n                                (valueChange) = \"person.tag = $event.value\"\n                            ></ui-tag-block>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n\n            <!-- \u041B\u0435\u0432\u0430\u044F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041A\u041E\u041D\u0415\u0426 -->\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"work-area\" [style.width.px]=\"mapWidth\">\n                <ui-tabs\n                    [headerMode]=\"!paneHidden\"\n                >\n                    <ui-tab\n                        [title]=\"'\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F'\"\n                        (tabSelect)=\"offersSelected()\"\n                    >\n                        <div class=\"\" style=\"position: absolute; top: 15px; left: 15px; z-index: 1;\">\n                            <div class=\"two-way-switch\">\n                                <div [class.active]=\"requestOfferType == 'sale'\" (click)=\"toggleOffer('sale')\">\u041F\u0440\u043E\u0434\u0430\u0436\u0430</div>\n                                <div [class.active]=\"requestOfferType == 'rent'\" (click)=\"toggleOffer('rent')\">\u0410\u0440\u0435\u043D\u0434\u0430</div>\n                            </div>\n                        </div>\n                        <!-- \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0434\u0443\u043D\u0441\u0442\u0432\u043E, \u0441\u0432-\u0432\u043E right \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0438\u0437 HubService -->\n                        <!-- TODO: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C -->\n                        <div  style=\"position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;\" [style.right]=\"_hubService.shared_var['nb_width']\">\n                            <div style=\"width: 330px; background-color: #fff;\">\n                                <div class=\"header\">\n                                    <input type=\"text\" style=\"width: 280px; margin-left: 10px; border: none;\"\n                                        (keydown)=\"offer_search_keydown($event)\"\n                                    >\n                                    <span class=\"icon-search\" style=\"margin-left: 10px; cursor: pointer;\"\n                                        (click)=\"offer_search()\"\n                                    ></span>\n                                </div>\n                                \n                                <div class=\"\" style=\"width: 100%; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                                    <div class=\"button\" (click)=\"createOffer()\">\n                                        \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435\n                                    </div>\n                                    <digest-offer *ngFor=\"let offer of offers\"\n                                      [offer]=\"offer\"\n                                      [compact]=\"true\"\n                                     >\n                                    </digest-offer>\n                                </div>\n                            </div>\n                        </div>\n                        <google-map [latitude]=\"lat\" [longitude]=\"lon\" [objects]=\"offers\" [zoom]=\"zoom\">\n                        </google-map>\n                    </ui-tab>\n                    <ui-tab\n                        [title]=\"'\u0417\u0430\u044F\u0432\u043A\u0438'\"\n                        (tabSelect)=\"requestsSelected()\"\n                    >\n                        <div class=\"\" style=\"margin: 15px;\">\n                            <div class=\"two-way-switch\">\n                                <div [class.active]=\"requestOfferType == 'sale'\" (click)=\"toggleOffer('sale')\">\u041F\u0440\u043E\u0434\u0430\u0436\u0430</div>\n                                <div [class.active]=\"requestOfferType == 'rent'\" (click)=\"toggleOffer('rent')\">\u0410\u0440\u0435\u043D\u0434\u0430</div>\n                            </div>\n                        </div>\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll; \" [style.height]=\"paneHeight\">\n                            <div class=\"button\" (click)=\"createRequest()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443</div>\n                            <digest-request *ngFor=\"let request of requests\"\n                                [request]=\"request\"\n                            >\n                            </digest-request>\n                        </div>\n                    </ui-tab>\n                    <ui-tab [title]=\"'\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430'\"\n                        (tabSelect)=\"analysisSelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gred fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch1_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u0434\u0430\u0447</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gred\">\n                                        <span style=\"margin-left: 25px;\">\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C</span>\n                                    </div>\n                                    <div>\n                                        <ui-pie-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch1_data\"\n                                        >\n                                        </ui-pie-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-gorange fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439</span>\n                                    </div>\n                                    <div class=\"tile bg-gorange fg-white\" >\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u0440\u0443\u0431.</span>\n                                    </div>\n                                </div>\n        \n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gorange\">\n                                        <span style=\"margin-left: 25px;\">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</span>\n                                    </div>\n                                    <div>\n                                        <ui-bar-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch4_data\"\n                                        >\n                                        </ui-bar-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gblue fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch2_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u044F\u0432\u043E\u043A</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gblue\">\n                                        <span style=\"margin-left: 25px;\">\u0417\u0430\u044F\u0432\u043A\u0438</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch2_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-ggreen fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0423\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                    <div class=\"tile bg-ggreen fg-white\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041D\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-ggreen\">\n                                        <span style=\"margin-left: 25px;\">\u041F\u043E\u043A\u0430\u0437\u044B</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch3_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n        \n                        </div>\n                    </ui-tab>\n            \n            \n                    <ui-tab\n                        [title]=\"'\u0418\u0441\u0442\u043E\u0440\u0438\u044F'\"\n                        (tabSelect)=\"historySelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <digest-history *ngFor=\"let record of historyRecs\"\n                                [historyRecord]=\"record\"\n                            >\n                            </digest-history>\n                        </div>\n                    </ui-tab>\n                </ui-tabs>\n            </div>\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041A\u041E\u041D\u0415\u0426 -->\n      </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService,
        config_service_1.ConfigService,
        offer_service_1.OfferService,
        request_service_1.RequestService,
        task_service_1.TaskService,
        analysis_service_1.AnalysisService,
        history_service_1.HistoryService,
        person_service_1.PersonService,
        organisation_service_1.OrganisationService,
        user_service_1.UserService])
], TabPersonComponent);
exports.TabPersonComponent = TabPersonComponent;
//# sourceMappingURL=tab-person.component.js.map