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
var user_1 = require("../../class/user");
var offer_1 = require("../../class/offer");
var hub_service_1 = require("../../service/hub.service");
var user_service_1 = require("../../service/user.service");
var config_service_1 = require("../../service/config.service");
var offer_service_1 = require("../../service/offer.service");
var request_service_1 = require("../../service/request.service");
var task_service_1 = require("../../service/task.service");
var history_service_1 = require("../../service/history.service");
var person_service_1 = require("../../service/person.service");
var organisation_service_1 = require("../../service/organisation.service");
var analysis_service_1 = require("../../service/analysis.service");
var session_service_1 = require("../../service/session.service");
var TabUserComponent = (function () {
    function TabUserComponent(_hubService, _userService, _configService, _offerService, _requestService, _taskService, _analysisService, _historyService, _personService, _organisationService, _sessionService) {
        var _this = this;
        this._hubService = _hubService;
        this._userService = _userService;
        this._configService = _configService;
        this._offerService = _offerService;
        this._requestService = _requestService;
        this._taskService = _taskService;
        this._analysisService = _analysisService;
        this._historyService = _historyService;
        this._personService = _personService;
        this._organisationService = _organisationService;
        this._sessionService = _sessionService;
        this.getDateUser = user_1.User.getData;
        this.superior = new user_1.User();
        this.superiorOpts = [];
        this.userPhone = [];
        this.userEmail = [];
        this.userAddress = [];
        this.addressStr = '';
        this.agentOpts = [];
        this.paneHidden = false;
        this.editEnabled = false;
        this.requestOfferType = 'sale';
        this.ch1_data = [];
        this.ch2_data = [];
        this.ch3_data = [];
        this.ch4_data = [];
        _userService.list(null, null, "").subscribe(function (agents) {
            for (var i = 0; i < agents.length; i++) {
                var a = agents[i];
                _this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
    }
    TabUserComponent.prototype.log = function (e) {
        //console.log(e);
    };
    TabUserComponent.prototype.getRole = function (val) {
        switch (val) {
            case 'AGENT': return null;
            case 'MANAGER': return 'Менеджер';
            case 'TOP': return 'Директор';
        }
    };
    TabUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.tab.args.user;
        console.log(this.user);
        var c = this._configService.getConfig();
        var loc = this._sessionService.getAccount().location;
        if (c.map[loc]) {
            this.lat = c.map[loc].lat;
            this.lon = c.map[loc].lon;
            this.zoom = c.map[loc].zoom;
        }
        else {
            this.lat = c.map['default'].lat;
            this.lon = c.map['default'].lon;
            this.zoom = c.map['default'].zoom;
        }
        if (this.user.id == null) {
            this.editEnabled = true;
        }
        this.updateArrays();
        this._userService.list("MANAGER", null, "").subscribe(function (managers) {
            for (var _i = 0, managers_1 = managers; _i < managers_1.length; _i++) {
                var m = managers_1[_i];
                _this.superiorOpts.push({
                    value: m.id,
                    label: m.name
                });
            }
        });
        if (this.user.superiorId != null) {
            this._userService.get(this.user.superiorId).subscribe(function (superior) {
                _this.superior = superior;
            });
        }
        this.calcSize();
    };
    TabUserComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.user.id) {
                _this.tab.header = 'Пользователь ';
            }
            else {
                _this.tab.header = 'Новый пользователь';
            }
        });
    };
    TabUserComponent.prototype.onResize = function (e) {
        this.calcSize();
    };
    TabUserComponent.prototype.calcSize = function () {
        if (this.paneHidden) {
            this.paneWidth = 0;
        }
        else {
            this.paneWidth = 370;
        }
        this.mapWidth = document.body.clientWidth - (31) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 31;
    };
    TabUserComponent.prototype.toggleLeftPane = function () {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    };
    TabUserComponent.prototype.toggleEdit = function () {
        this.editEnabled = !this.editEnabled;
    };
    TabUserComponent.prototype.addPhone = function (event) {
        this.user.phones.push('');
        var parent = event.currentTarget.parentElement.parentElement;
        var height = this.user.phones.length * 30;
        parent.style.setProperty('height', "" + (height + 60) + 'px');
    };
    TabUserComponent.prototype.addEmail = function () {
        this.user.emails.push('');
        var parent = event.currentTarget.parentElement.parentElement;
        var height = this.user.emails.length * 30;
        parent.style.setProperty('height', "" + (height + 60) + 'px');
    };
    TabUserComponent.prototype.superiorChanged = function (e) {
        var _this = this;
        this.user.superiorId = e.selected.value;
        if (this.user.superiorId != null) {
            this._userService.get(this.user.superiorId).subscribe(function (superior) {
                _this.superior = superior;
            });
        }
    };
    TabUserComponent.prototype.save = function () {
        var _this = this;
        var tem = this.getIndex(this.userPhone, "MOBILE");
        this.user.cellPhone_n = tem > -1 ? this.userPhone[tem].value : null;
        tem = this.getIndex(this.userPhone, "HOME");
        this.user.homePhone_n = tem > -1 ? this.userPhone[tem].value : null;
        tem = this.getIndex(this.userPhone, "WORK");
        this.user.officePhone_n = tem > -1 ? this.userPhone[tem].value : null;
        tem = this.getIndex(this.userPhone, "MAIN");
        this.user.mainPhone_n = tem > -1 ? this.userPhone[tem].value : null;
        tem = this.getIndex(this.userPhone, "SAME");
        this.user.otherPhone_n = tem > -1 ? this.userPhone[tem].value : null;
        tem = this.getIndex(this.userPhone, "FAX");
        this.user.fax_n = tem > -1 ? this.userPhone[tem].value : null;
        tem = this.getIndex(this.userAddress, "KRAY");
        this.user.region_n = tem > -1 ? this.userAddress[tem].value : undefined;
        tem = this.getIndex(this.userAddress, "CITY");
        this.user.city_n = tem > -1 ? this.userAddress[tem].value : undefined;
        tem = this.getIndex(this.userAddress, "DISTRICT");
        this.user.area_n = tem > -1 ? this.userAddress[tem].value : undefined;
        tem = this.getIndex(this.userAddress, "STREET");
        this.user.street_n = tem > -1 ? this.userAddress[tem].value : undefined;
        tem = this.getIndex(this.userAddress, "HOUSE");
        this.user.house_n = tem > -1 ? this.userAddress[tem].value : undefined;
        tem = this.getIndex(this.userAddress, "HOUSING");
        this.user.housing_n = tem > -1 ? this.userAddress[tem].value : undefined;
        tem = this.getIndex(this.userAddress, "FLAT");
        this.user.apartment_n = tem > -1 ? this.userAddress[tem].value : undefined;
        tem = this.getIndex(this.userEmail, "MAIN");
        this.user.mainEmail_n = tem > -1 ? this.userEmail[tem].value : null;
        tem = this.getIndex(this.userEmail, "WORK");
        this.user.workEmail_n = tem > -1 ? this.userEmail[tem].value : null;
        console.log(this.user);
        this._userService.save(this.user).subscribe(function (user) {
            setTimeout(function () {
                _this.user = user;
            });
            _this.toggleEdit();
        });
        setTimeout(function () {
            _this.updateArrays();
        }, 1000);
    };
    TabUserComponent.prototype.offersSelected = function () {
        this.getOffers(1, 16);
    };
    TabUserComponent.prototype.requestsSelected = function () {
        this.getRequests(0, 32);
    };
    TabUserComponent.prototype.analysisSelected = function () {
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
    TabUserComponent.prototype.historySelected = function () {
        this.historyRecs = this._historyService.getObjHistory();
    };
    TabUserComponent.prototype.getOffers = function (page, perPage) {
        var _this = this;
        this._offerService.list(0, 32, offer_service_1.OfferSource.LOCAL, { agentId: this.user.id, offerTypeCode: this.requestOfferType }, null, "", []).subscribe(function (offers) {
            _this.offers = offers.list;
        });
    };
    TabUserComponent.prototype.getRequests = function (page, perPage) {
        var _this = this;
        this._requestService.list(0, 32, this.requestOfferType, "all", this.user.id, null, "").subscribe(function (requests) {
            _this.requests = requests;
        });
    };
    TabUserComponent.prototype.offerSearchKeydown = function (e) {
        if (e.keyCode == 13) {
            this.getOffers(0, 16);
        }
    };
    TabUserComponent.prototype.markerClick = function (r) {
        //r.selected = !r.selected;
        // scroll to object ???
    };
    TabUserComponent.prototype.toggleOffer = function (offer_type) {
        this.requestOfferType = offer_type;
        this.getOffers(0, 16);
        this.getRequests(0, 32);
    };
    TabUserComponent.prototype.getOfferDigest = function (r) {
        return offer_1.Offer.getDigest(r);
    };
    TabUserComponent.prototype.showMenu = function (event) {
        var parent = event.currentTarget.parentElement;
        var height = parent.getElementsByTagName('input').length * 35;
        if (parent.offsetHeight == 30) {
            parent.style.setProperty('height', "" + (height + 60) + 'px');
            parent.style.setProperty('overflow', "visible");
            event.currentTarget.style.setProperty('transform', 'rotate(180deg)');
        }
        else {
            parent.style.setProperty('height', "30px");
            parent.style.setProperty('overflow', "hidden");
            event.currentTarget.style.setProperty('transform', 'rotate(0deg)');
        }
    };
    TabUserComponent.prototype.agentChanged = function (e) {
        var _this = this;
        this.user.superiorId = e.selected.value;
        this._userService.get(this.user.superiorId).subscribe(function (agent) {
            _this.superior = agent;
        });
    };
    TabUserComponent.prototype.parseArray = function (values, obj, isAddress) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var val = values_1[_i];
            var no = true;
            for (var _a = 0, obj_1 = obj; _a < obj_1.length; _a++) {
                var en = obj_1[_a];
                if (val.type == en.type) {
                    en.value = val.value;
                    no = false;
                }
            }
            if (no && val.value)
                obj.push(val);
        }
        for (var i = 0; i < obj.length; ++i) {
            if (obj[i].value === undefined || obj[i].value === null) {
                obj.splice(i, 1);
                i--;
            }
        }
        if (isAddress) {
            this.getAddressStr();
        }
    };
    TabUserComponent.prototype.getIndex = function (array, str) {
        for (var i = 0; i < array.length; ++i) {
            if (array[i].type == str)
                if (array[i].value && array[i].value.trim() != '')
                    return i;
                else
                    return -1;
        }
        return -1;
    };
    TabUserComponent.prototype.setDate = function (value, place) {
        value = value.replace('/', '.');
        if (value.split('.').length == 3 && value.split('.')[2]) {
            if (value.split('.')[2].length > 3) {
                if (place)
                    this.user.recruitmentDate_n = Math.round(new Date(value.split('.')[2], value.split('.')[1] - 1, value.split('.')[0]).getTime());
                else
                    this.user.dismissalDate_n = Math.round(new Date(value.split('.')[2], value.split('.')[1] - 1, value.split('.')[0]).getTime());
            }
        }
    };
    TabUserComponent.prototype.getAddressStr = function () {
        this.addressStr = this.user.city_n !== undefined ? "" + this.user.city_n : '';
        this.addressStr += this.user.street_n !== undefined ? ", " + this.user.street_n : '';
        this.addressStr += this.user.house_n !== undefined ? ", " + this.user.house_n : '';
        if (this.userAddress.length == 0)
            this.addressStr = '';
    };
    TabUserComponent.prototype.updateArrays = function () {
        this.userPhone = [
            { type: 'MOBILE', value: this.user.cellPhone_n },
            { type: 'HOME', value: this.user.homePhone_n },
            { type: 'WORK', value: this.user.officePhone_n },
            { type: 'MAIN', value: this.user.mainPhone_n },
            { type: 'SAME', value: this.user.otherPhone_n },
            { type: 'FAX', value: this.user.fax_n }
        ];
        this.userEmail = [
            { type: 'WORK', value: this.user.workEmail_n },
            { type: 'MAIN', value: this.user.mainEmail_n }
        ];
        this.userAddress = [
            { type: 'KRAY', value: this.user.region_n },
            { type: 'CITY', value: this.user.city_n },
            { type: 'DISTRICT', value: this.user.area_n },
            { type: 'STREET', value: this.user.street_n },
            { type: 'HOUSE', value: this.user.house_n },
            { type: 'HOUSING', value: this.user.housing_n },
            { type: 'FLAT', value: this.user.apartment_n }
        ];
        this.getAddressStr();
    };
    return TabUserComponent;
}());
TabUserComponent = __decorate([
    core_1.Component({
        selector: 'tab-user',
        inputs: ['tab'],
        styles: ["\n        .header1{\n            width: 100%;\n            height: 110px;\n            line-height: 30px;\n            border-bottom: 4px solid rgb(11, 151, 0);\n            display: flex;\n        }\n        .header_col{\n            width: calc(100% - 10px);\n            height: 40px;\n            background-color: #f7f7f7;\n            padding-left: 20px;\n            text-transform: uppercase;\n            font-size: 10pt;\n            color: #5f5d5d;\n            line-height: 40px;\n            margin-bottom: 10px;\n        }\n        .pane {\n            float: left;\n            width: 370px;\n            height: 100%;\n        }\n\n        .work-area {\n            float: left;\n            width: 100%;\n            height: 100%;\n        }\n\n        .tab-button {\n            width: 30px;\n            height: 30px;\n            text-align: center;\n            line-height: 30px;\n            font-size: 12px !important;\n            cursor: pointer;\n            color: #666;\n        }\n\n        .fixed-button {\n            position: fixed;\n            top: 0;\n            left: 0;\n        }\n\n        .sebm-google-map-container {\n            height: 100%;\n        }\n\n        .offer-prop {\n            overflow-y: scroll;\n        }\n\n        .view-group {\n            margin-bottom: 5px;\n            display: flex;\n            justify-content: space-between;\n            align-items: flex-start;\n            height: 30px;\n        }\n\n        .view-label {\n            white-space: nowrap;\n            color: rgb(80, 80, 80);\n            margin-top: 5px;\n            font-size: 10pt;\n        }\n\n        .view-value {\n            width: 100%;\n            text-align: right;\n            color: #696969;\n            font-size: 10pt;\n            margin-top: 5px;\n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n        }\n\n        .edit-value {\n            width: 100%;\n            text-align: right;\n            color: #696969;\n            font-size: 10pt;\n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n            border: none !important;\n        }\n\n        .text-value {\n            height: 3rem;\n            border: 1px solid #E5E5E5 !important;\n        }\n\n        .edit-block > .view-group, .view-block > .view-group {\n            height: 30px;\n            margin-left: 57px;\n        }\n\n        .tile-x {\n            margin-right: 10px;\n            width: 150px;\n            height: 150px;\n            color: #fff;\n            position: relative;\n        }\n\n        .tile {\n            margin: 0;\n            margin-right: 10px;\n        }\n\n        .icon {\n            line-height: 64px;\n        }\n\n        .tile-content.iconic .icon {\n            width: 128px;\n            margin-left: -64px;\n        }\n\n        .chart-block {\n            overflow:hidden;\n            border: 1px solid #e5e5e5;\n        }\n\n        .chart-header {\n            swidth: 100%;\n            height: 30px;\n            border-bottom: 1px solid #e5e5e5;\n            line-height: 30px;\n            color: #fff;\n        }\n\n        .array-container{\n            display: flex;\n            flex-wrap: wrap;\n            justify-content: flex-end;\n        }\n\n        .array-container > span {\n            display: block;\n            margin-bottom: 5px;\n        }\n\n        .array-container > input {\n            margin-bottom: 5px;\n            width: 80%;\n        }\n\n        .two-way-switch {\n            display: table;\n            border: 1px solid #3366cc;\n            cursor: pointer;\n            display: none;\n        }\n\n        .two-way-switch > div {\n            display: table-cell;\n            width: 90px;\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #fff;\n            color: #333;\n        }\n\n        .two-way-switch > div.active {\n            background-color: #3366cc;\n            color: #fff;\n        }\n\n        .button {\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #3366cc;\n            color: #fff;\n            cursor: pointer;\n        }\n\n        .person_face{\n            height: 220px;\n            background-color: #f7f7f7;\n        }\n\n        .person_face > .rate{\n            height: 20px;\n            background-image: url(res/star_active.png);\n            background-size: contain;\n            width: 100px;\n            margin-left: 20px;\n            margin-top: 10px;\n        }\n\n        .person_face > img{\n            width: 120px;\n            height: 90px;\n            margin: 20px 0 10 20px;\n        }\n\n        .person_face  .name{\n            margin: 0 0 0 20px;\n            border: 0 !important;\n            font-size: 16pt;\n            text-align: left;\n            background-color: transparent;\n            color: #595a5a;\n            height: 23px;\n            line-height: 23px;\n        }\n\n        .head{\n            width: 100%;\n            height: 31px;\n            display: block;\n            border-bottom: 4px solid rgba(61, 155, 233, 1);\n        }\n\n        .view_icon{\n            width: 28px;\n            height: 25px;\n            background-size: contain;\n            float: left;\n            background-repeat: no-repeat;\n            background-position: center;\n            margin-right: 12px;\n            margin-top: 2px;\n            margin-left: 17px;\n        }\n\n        .edit-block >hr, .view-block >hr{\n                margin: 5px -10px 5px 55px;\n        }\n\n        .arrow{\n            background-image: url(res/arrow.png);\n            width: 18px;\n            height: 10px;\n            background-size: cover;\n            margin: 0 10px;\n            background-position: center;\n            flex: 0 0 18px;\n            position: absolute;\n            top: 5px;\n            right: -10px;\n        }\n\n        .show_value{\n            flex: 0 0 190px;\n            margin-right: 30px;\n            position: relative;\n            text-align: right;\n            height: 30px;\n            display: flex;\n            flex-direction: column;\n        }\n\n        .show_value > span:first-child{\n            height: 10px;\n            font-size: 8pt;\n        }\n        .show_value > span:last-child{\n            font-size: 10pt;\n            color: #959595;\n        }\n\n        .add_button{\n            height: 25px;\n            margin-left: 0;\n            margin-right: auto;\n            font-size: 10pt;\n            text-align: right;\n            line-height: 25px;\n            color: #29ac3b;\n        }\n\n        .multiply{\n            position: relative;\n            display: block;\n            height: 30px;\n            width: 280px;\n            margin-right: 15px;\n            margin-left: 0;\n            overflow: hidden;\n        }\n\n    "],
        template: "\n        <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n            <span [ngClass]=\"{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}\"></span>\n        </div>\n\n        <div class=\"person\" (window:resize)=\"onResize($event)\">\n\n            <!-- \u041B\u0415\u0412\u0410\u042F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"pane\" [hidden]=\"paneHidden\" [style.width.px]=\"paneWidth\">\n                <div class=\"header1\">\n                    <div class=\"header-label\">{{ tab.header }}</div>\n                </div>\n\n                <div style=\"overflow: scroll; overflow-x: hidden; height: calc(100% - 111px);\n                        border-right: 1px solid #cccccc;\">\n                    <div class = \"person_face\">\n                        <img src=\"\">\n                        <div style=\"flex-wrap: wrap;margin-top: -1px;\">\n                            <div class=\"view-value name\" style=\"text-transform: uppercase;\"> {{ (user.name?.split(' ')[0] === undefined ? \" \" : user.name?.split(' ')[0])}}</div>\n                            <div class=\"view-value name\" style=\"font-size: 14pt; margin-top: 3px;\">\n                                {{ (user.name?.split(' ')[1] === undefined ? \" \" : user.name?.split(' ')[1]) }} {{(user.name?.split(' ')[2] === undefined ? \" \" : user.name?.split(' ')[2])}}\n                            </div>\n                        </div>\n                        <div class=\"rate\"></div>\n                    </div>\n                    <div class=\"pull-container\">\n                        <div class=\"font-sz-2 pull-left\"><span class=\"color-g1\" ><a  href=\"\" target=\"_blank\"></a></span></div>\n                        <div class=\"font-sz-1 color-g2 pull-right\"> {{ user.add_date | formatDate }} </div>\n                    </div>\n                    <div class=\"pull-container\" style=\"margin: 20px 10px 0px;\">\n                        <div class=\"pull-right\" [hidden]=\"editEnabled\" (click)=\"toggleEdit()\" style=\"font-size: 10pt;\"><a href=\"#\" >\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</a></div>\n                        <div class=\"pull-right\" [hidden]=\"!editEnabled\" (click)=\"save()\" style=\"font-size: 10pt;\"><a href=\"#\" >\u0413\u043E\u0442\u043E\u0432\u043E</a></div>\n                    </div>\n                    <div class=\"person-prop\">\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n                        <div class=\"edit-block\" [hidden]=\"!editEnabled\" style=\"margin: 10px 10px 10px 0px;\">\n                            <div class=\"header_col\">\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/user.png)'\"></div>\n                            <div class=\"view-group\" style='overflow: hidden; position: relative; display: block;'>\n                                <ui-input-line [placeholder] = \"'\u0424\u0418\u041E'\" [value] = \"user.name\"\n                                    [width] = \"'225px'\" (onChange)= \"user.name = $event\">\n                                </ui-input-line>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/office.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0444\u0438\u0441:</span>\n                                <ui-slidingMenu class=\"view-value edit-value\"\n                                    [options] = \"[\n                                        {value: 'NO', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'},\n                                        {value: 'CENTRAL', label: '\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439'},\n                                        {value: 'MAIN', label: '\u0413\u043E\u043B\u043E\u0432\u043D\u043E\u0439'}\n                                    ]\"\n                                    [value]=\"user.office_n\"\n                                    (onChange)=\"user.office_n = $event.selected.value\">\n                                </ui-slidingMenu>\n\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/department.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0434\u0435\u043B:</span>\n                                <ui-slidingMenu class=\"view-value edit-value\"\n                                    [options] = \"[\n                                        {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'},\n                                        {value: 'LIVING', label: '\u0416\u0438\u043B\u0430\u044F \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C'},\n                                        {value: 'COMMERSIAL', label: '\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0430\u044F \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C'},\n                                        {value: 'SUBURBAN', label: '\u0417\u0430\u0433\u043E\u0440\u043E\u0434\u043D\u0430\u044F \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C'}\n                                    ]\"\n                                    [value]=\"user.departmentCode_n\"\n                                    (onChange)=\"user.departmentCode_n = $event.selected.value\">\n                                </ui-slidingMenu>\n\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/post.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0442\u0443\u0441:</span>\n                                <ui-slidingMenu class=\"view-value edit-value\"\n                                    [options] = \"[\n                                        {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'},\n                                        {value: 'TRAINEE', label: '\u0421\u0442\u0430\u0436\u0435\u0440'},\n                                        {value: 'OPERATOR', label: '\u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 Call-\u0446\u0435\u043D\u0442\u0440\u0430'},\n                                        {value: 'AGENT', label: '\u0410\u0433\u0435\u043D\u0442'},\n                                        {value: 'MANAGER', label: '\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440'},\n                                        {value: 'TOP_MANAGER', label: '\u0422\u043E\u043F \u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440'},\n                                        {value: 'DIRECTOR', label: '\u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440'}\n                                    ]\"\n                                    [value]=\"user.positionCode_n\"\n                                    (onChange)=\"user.positionCode_n = $event.selected.value\">\n                                </ui-slidingMenu>\n                            </div>\n                            <hr>\n\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/date_start.png)'\"></div>\n                            <div class=\"view-group\" style='overflow: hidden; position: relative; display: block;'>\n                                <ui-input-line [placeholder] = \"'\u0414\u0430\u0442\u0430 \u043F\u0440\u0438\u0451\u043C\u0430'\" [value] = \"user.recruitmentDate_n |  date:'dd.MM.yyyy'\"\n                                    [width] = \"'225px'\" (onChange)= \"setDate($event, true)\">\n                                </ui-input-line>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/date_end.png)'\"></div>\n                            <div class=\"view-group\" style='overflow: hidden; position: relative; display: block;'>\n                                <ui-input-line [placeholder] = \"'\u0414\u0430\u0442\u0430 \u0443\u0432\u043E\u043B\u044C\u043D\u0435\u043D\u0438\u044F'\" [value] = \"user.dismissalDate_n |  date:'dd.MM.yyyy'\"\n                                    [width] = \"'225px'\" (onChange)= \"setDate($event, false)\">\n                                </ui-input-line>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/responsible.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439:</span>\n                                <ui-slidingMenu class=\"view-value edit-value\"\n                                    [options] = \"agentOpts\"\n                                    [value]=\"superior.id\"\n                                    (onChange)=\"agentChanged($event)\"\n                                >\n                                </ui-slidingMenu>\n\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/status.png)'\"></div>\n                            <div class=\"view-group\" >\n                                <span class=\"view-label\">\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435:</span>\n                                <ui-slidingMenu class=\"view-value edit-value\"\n                                    [options] = \"[\n                                        {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E'},\n                                        {value: 'ACTIVE', label: '\u0410\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                        {value: 'NOT_ACTIVE', label: '\u041D\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                        {value: 'ARCHIVE', label: '\u0410\u0440\u0445\u0438\u0432'}\n                                    ]\"\n                                [value]=\"user.statusCode_n\"\n                                (onChange)=\"user.statusCode_n = $event.selected.value\">\n                                >\n                                </ui-slidingMenu>\n                            </div>\n\n                            <div class=\"header_col\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/phone.png)'\"></div>\n                            <div class=\"view-group multiply\">\n                                <span class=\"view-label pull-left\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D\u044B:</span>\n                                <div class=\"show_value\">{{\" \"}}</div>\n                                <div class='arrow' (click)=\"showMenu($event)\"></div>\n                                <ui-multiselect class=\"view-value edit-value\" style=\"\"\n                                    [options] = \"[\n                                        {value: 'MOBILE', label: '\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439'},\n                                        {value: 'HOME', label: '\u0414\u043E\u043C\u0430\u0448\u043D\u0438\u0439'},\n                                        {value: 'WORK', label: '\u0420\u0430\u0431\u043E\u0447\u0438\u0439'},\n                                        {value: 'MAIN', label: '\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439'},\n                                        {value: 'SAME', label: '\u0414\u0440\u0443\u0433\u043E\u0439'}\n                                    ]\"\n                                    [masks] = \"['+_ (___) ___-__-__',\n                                                '+_ (____) __-__-__',\n                                                '+_ (___) ___-__-__',\n                                                '+_ (____) ___-___',\n                                                '+_ (____) __-__-__']\"\n                                    [values]=\"userPhone\"\n                                    [width]=\"'43%'\"\n                                    (onChange)=\"parseArray($event, userPhone)\">\n                                </ui-multiselect>\n                            </div>\n\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/email.png)'\"></div>\n                            <div class=\"view-group multiply\">\n                                <span class=\"view-label pull-left\">E-mail:</span>\n                                <div class=\"show_value\">{{\" \"}}</div>\n                                <div class='arrow' (click)=\"showMenu($event)\"></div>\n                                <ui-multiselect class=\"view-value edit-value\" style=\"\"\n                                    [options] = \"[\n                                        {value: 'WORK', label: '\u0420\u0430\u0431\u043E\u0447\u0438\u0439'},\n                                        {value: 'MAIN', label: '\u041B\u0438\u0447\u043D\u044B\u0439'}\n                                    ]\"\n                                    [masks] = \"['', '']\"\n                                    [values]=\"userEmail\"\n                                    [width]=\"'36%'\"\n                                    (onChange)=\"parseArray($event, userEmail)\">\n                                </ui-multiselect>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/website.png)'\"></div>\n                            <div class=\"view-group\" style='overflow: hidden; position: relative; display: block;'>\n                                <ui-input-line [placeholder] = \"'WEB-\u0441\u0430\u0439\u0442:'\" [value] = \"user.webSite_n\"\n                                    [width] = \"'225px'\" (onChange)= \"user.webSite_n = $event\">\n                                </ui-input-line>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/address.png)'\"></div>\n                            <div class=\"view-group multiply\">\n                                <ui-input-line [placeholder] = \"'\u0410\u0434\u0440\u0435\u0441 \u043F\u0440\u043E\u0436\u0438\u0432\u0430\u043D\u0438\u044F:'\" [value] = \"addressStr\"\n                                    [width] = \"'225px'\" (onChange)= \"parseArray($event, userAddress, true)\" [queryTipe]=\"'address'\" (clicked)=\"showMenu($event)\">\n                                </ui-input-line >\n                                <div class='arrow' (click)=\"showMenu($event)\" *ngIf=\"userAddress[0] && userAddress[0].value !== undefined\"></div>\n                                <ui-multiselect class=\"view-value edit-value\" style=\"\"\n                                    [options] = \"[\n                                        {value: 'KRAY', label: '\u0420\u0435\u0433\u0438\u043E\u043D'},\n                                        {value: 'CITY', label: '\u041D\u0430\u0441. \u043F\u0443\u043D\u043A\u0442'},\n                                        {value: 'DISTRICT', label: '\u0420\u0430\u0439\u043E\u043D'},\n                                        {value: 'STREET', label: '\u0423\u043B\u0438\u0446\u0430'},\n                                        {value: 'HOUSE', label: '\u0414\u043E\u043C'},\n                                        {value: 'HOUSING', label: '\u041A\u043E\u0440\u043F\u0443\u0441'},\n                                        {value: 'FLAT', label: '\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430'}\n                                    ]\"\n                                    [masks] = \"['','','','','','','']\"\n                                    [values]=\"userAddress\"\n                                    [width]=\"'36%'\"\n                                    (onChange)=\"parseArray($event, userAddress)\">\n                                </ui-multiselect>\n                            </div>\n\n                            <div class=\"header_col\">\u0412\u0445\u043E\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/login.png)'\"></div>\n                            <div class=\"view-group\" style='overflow: hidden; position: relative; display: block;'>\n                                <ui-input-line [placeholder] = \"'\u041B\u043E\u0433\u0438\u043D'\" [value] = \"user.login\"\n                                    [width] = \"'225px'\" (onChange)= \"user.login = $event\">\n                                </ui-input-line>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/password.png)'\"></div>\n                            <div class=\"view-group\" style='overflow: hidden; position: relative; display: block;'>\n                                <ui-input-line [placeholder] = \"'\u041F\u0430\u0440\u043E\u043B\u044C'\" [value] = \"user.password\"\n                                    [width] = \"'225px'\" (onChange)= \"user.password = $event\">\n                                </ui-input-line>\n                            </div>\n\n                            <div class=\"header_col\">\u0422\u044D\u0433\u0438</div>\n                            <div style=\"margin: 0 0 20px 20px;\">\n                                <ui-tag-block\n                                    [value] = \"user.tag\"\n                                    (valueChange) = \"user.tag = $event.value\"\n                                ></ui-tag-block>\n                            </div>\n\n                            <div class=\"header_col\">\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class=\"view-group\" style=\"flex-wrap: wrap; height: 50px; margin-left: 20px;\">\n                                <textarea class=\"view-value text-value\"\n                                    placeholder=\"\" [(ngModel)]=\"user.workEmail_n\"\n                                    style=\"text-align: left;\">\n                                </textarea>\n                            </div>\n                        </div>\n\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n                        <div class=\"view-block\" [hidden]=\"editEnabled\" style=\"margin: 10px 10px 10px 0px;\">\n                            <div class=\"header_col\">\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/user.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0424\u0418\u041E:</span>\n                                <span class=\"view-value\" > {{ user.name || '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'}}</span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/office.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0444\u0438\u0441:</span>\n                                <ui-view-value\n                                    [options] = \"[\n                                        {value: 'NO', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'},\n                                        {value: 'CENTRAL', label: '\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439'},\n                                        {value: 'MAIN', label: '\u0413\u043E\u043B\u043E\u0432\u043D\u043E\u0439'}\n                                    ]\"\n                                    [value]=\"user.office_n\"\n                                >\n                                </ui-view-value>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/department.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0434\u0435\u043B:</span>\n                                <ui-view-value\n                                    [options] = \"[\n                                        {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'},\n                                        {value: 'LIVING', label: '\u0416\u0438\u043B\u0430\u044F \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C'},\n                                        {value: 'COMMERSIAL', label: '\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0430\u044F \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C'},\n                                        {value: 'SUBURBAN', label: '\u0417\u0430\u0433\u043E\u0440\u043E\u0434\u043D\u0430\u044F \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C'}\n                                    ]\"\n                                    [value]=\"user.departmentCode_n\"\n                                >\n                                </ui-view-value>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/post.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0442\u0443\u0441:</span>\n                                <ui-view-value\n                                    [options] = \"[\n                                        {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D'},\n                                        {value: 'TRAINEE', label: '\u0421\u0442\u0430\u0436\u0435\u0440'},\n                                        {value: 'OPERATOR', label: '\u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 Call-\u0446\u0435\u043D\u0442\u0440\u0430'},\n                                        {value: 'AGENT', label: '\u0410\u0433\u0435\u043D\u0442'},\n                                        {value: 'MANAGER', label: '\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440'},\n                                        {value: 'TOP_MANAGER', label: '\u0422\u043E\u043F \u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440'},\n                                        {value: 'DIRECTOR', label: '\u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440'}\n                                    ]\"\n                                    [value]=\"user.positionCode_n\"\n                                >\n                                </ui-view-value>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/date_start.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0414\u0430\u0442\u0430 \u043F\u0440\u0438\u0451\u043C\u0430:</span>\n                                <span class=\"view-value\"> {{ (user.recruitmentDate_n | date:'dd.MM.yyyy') || '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043Da'}}</span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/date_end.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0414\u0430\u0442\u0430 \u0443\u0432\u043E\u043B\u044C\u043D\u0435\u043D\u0438\u044F:</span>\n                                <span class=\"view-value\"> {{ (user.dismissalDate_n | date:'dd.MM.yyyy') || '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043Da'}}</span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/responsible.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439:</span>\n                                <span class=\"view-value\"> {{ superior.name || '\u041D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D'}}</span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/status.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435:</span>\n                                <ui-view-value\n                                    [options] = \"[\n                                        {value: 'NOT', label: '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E'},\n                                        {value: 'ACTIVE', label: '\u0410\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                        {value: 'NOT_ACTIVE', label: '\u041D\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                        {value: 'ARCHIVE', label: '\u0410\u0440\u0445\u0438\u0432'}\n                                    ]\"\n                                    [value]=\"user.statusCode_n\"\n                                >\n                                </ui-view-value>\n                            </div>\n\n                            <div class=\"header_col\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/phone.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D:</span>\n                                <ui-multi-view\n                                    [options] = \"[\n                                        {value: 'MOBILE', label: '\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0439'},\n                                        {value: 'HOME', label: '\u0414\u043E\u043C\u0430\u0448\u043D\u0438\u0439'},\n                                        {value: 'WORK', label: '\u0420\u0430\u0431\u043E\u0447\u0438\u0439'},\n                                        {value: 'MAIN', label: '\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439'},\n                                        {value: 'SAME', label: '\u0414\u0440\u0443\u0433\u043E\u0439'}\n                                    ]\"\n                                    [values] = \"[\n                                        {type: getDateUser(userPhone).type, value: getDateUser(userPhone).value}\n                                    ]\"\n                                >\n                                </ui-multi-view>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/email.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">E-mail:</span>\n                                <ui-multi-view\n                                    [options] = \"[\n                                        {value: 'WORK', label: '\u0420\u0430\u0431\u043E\u0447\u0438\u0439'},\n                                        {value: 'MAIN', label: '\u041B\u0438\u0447\u043D\u044B\u0439'}\n                                    ]\"\n                                    [values] = \"[\n                                        {type: getDateUser(userEmail).type, value: getDateUser(userEmail).value}\n                                    ]\"\n                                >\n                                </ui-multi-view>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/email.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">WEB-\u0441\u0430\u0439\u0442:</span>\n                                <span class=\"view-value\"> {{ user.webSite_n || \"\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\"}}</span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/address.png)'\"></div>\n                            <div class=\"view-group\">\n                                <ui-view-line\n                                    [placeholder]= \"'\u0410\u0434\u0440\u0435\u0441 \u043F\u0440\u043E\u0436\u0438\u0432\u0430\u043D\u0438\u044F:'\" [value]=\"addressStr\"\n                                >\n                                </ui-view-line>\n                            </div>\n                            <div class=\"header_col\">\u0412\u0445\u043E\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/login.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041B\u043E\u0433\u0438\u043D</span>\n                                <span class=\"view-value\"> {{ user.login }}</span>\n                            </div>\n\n                            <div class=\"header_col\">\u0422\u044D\u0433\u0438</div>\n                            <div style=\"margin: 0 0 20px 20px;\">\n                                <ui-tag-block\n                                    [value] = \"user.tag\"\n                                    (valueChange) = \"user.tag = $event.value\"\n                                ></ui-tag-block>\n                            </div>\n\n                            <div class=\"header_col\">\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class=\"view-group\">\n                                <span class=\"view-value\" style=\"height: initial;\"> {{ user.info }} </span>\n                            </div>\n                        </div>\n\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n                </div>\n            </div>\n            </div>\n\n            <!-- \u041B\u0435\u0432\u0430\u044F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041A\u041E\u041D\u0415\u0426 -->\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"work-area\" [style.width.px]=\"mapWidth\">\n                <ui-tabs\n                    [headerMode]=\"!paneHidden\"\n                    [iconUrls]=\"['res/main_offers.png', 'res/request1.png', 'res/analitic.png']\"\n                    [iconUrls_active]=\"['res/main_offers_color.png', 'res/request1_color.png', 'res/analitic_color.png']\"\n                    [color] = \"'#0b9700'\"\n                >\n                    <!--<ui-tab\n                        [title]=\"'\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F'\"\n                        (tabSelect)=\"offersSelected()\"\n                    >\n\n                        <div class=\"\" style=\"position: absolute; top: 15px; left: 15px; z-index: 1;\">\n                            <div class=\"two-way-switch\">\n                                <div [class.active]=\"requestOfferType == 'sale'\" (click)=\"toggleOffer('sale')\">\u041F\u0440\u043E\u0434\u0430\u0436\u0430</div>\n                                <div [class.active]=\"requestOfferType == 'rent'\" (click)=\"toggleOffer('rent')\">\u0410\u0440\u0435\u043D\u0434\u0430</div>\n                            </div>\n                        </div>\n\n                        <!-- \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0434\u0443\u043D\u0441\u0442\u0432\u043E, \u0441\u0432-\u0432\u043E right \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0438\u0437 HubService -->\n                        <!-- TODO: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C -->\n                        <!--<div  style=\"position: absolute; top: 0px; z-index: 1; border-left: 1px solid #ccc;\" [style.right]=\"_hubService.shared_var['nb_width']\">\n                            <div style=\"width: 330px; background-color: #fff;\">\n                                <div class=\"head\">\n                                    <input type=\"text\" style=\"width: 280px; margin-left: 10px; border: 1px solid silver;\n                                                                background-color: #f7f7f7;\"\n                                        (keydown)=\"offerSearchKeydown($event)\"\n                                    >\n                                    <span class=\"icon-search\" style=\"margin-left: 10px; cursor: pointer;\"\n                                        (click)=\"offerSearch()\"\n                                    ></span>\n                                </div>\n                                <div class=\"\" style=\"width: 100%; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n\n                                    <digest-offer *ngFor=\"let offer of offers\"\n                                        [offer]=\"offer\"\n                                        [compact]=\"true\"\n                                    >\n                                    </digest-offer>\n                                </div>\n                            </div>\n                        </div>\n                        <!--<google-map [latitude]=\"lat\" [longitude]=\"lon\" [objects]=\"offers\" [zoom]=\"zoom\">\n                        </google-map>\n                    </ui-tab>-->\n\n                    <ui-tab\n                        [title]=\"'\u0413\u043B\u0430\u0432\u043D\u0430\u044F'\"\n                        (tabSelect)=\"requestsSelected()\"\n                    >\n                        <div class=\"\" style=\"margin: 15px;\">\n                            <div class=\"two-way-switch\">\n                                <div [class.active]=\"requestOfferType == 'sale'\" (click)=\"toggleOffer('sale')\">\u041F\u0440\u043E\u0434\u0430\u0436\u0430</div>\n                                <div [class.active]=\"requestOfferType == 'rent'\" (click)=\"toggleOffer('rent')\">\u0410\u0440\u0435\u043D\u0434\u0430</div>\n                            </div>\n                        </div>\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll; \" [style.height]=\"paneHeight\">\n\n                            <digest-request *ngFor=\"let request of requests\"\n                                [request]=\"request\"\n                            >\n                            </digest-request>\n                        </div>\n                    </ui-tab>\n\n                    <ui-tab [title]=\"'\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430'\"\n                        (tabSelect)=\"analysisSelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gred fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch1_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u0434\u0430\u0447</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gred\">\n                                        <span style=\"margin-left: 25px;\">\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C</span>\n                                    </div>\n                                    <div>\n                                        <ui-pie-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch1_data\"\n                                        >\n                                        </ui-pie-chart>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-gorange fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439</span>\n                                    </div>\n                                    <div class=\"tile bg-gorange fg-white\" >\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u0440\u0443\u0431.</span>\n                                    </div>\n                                </div>\n\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gorange\">\n                                        <span style=\"margin-left: 25px;\">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</span>\n                                    </div>\n                                    <div>\n                                        <ui-bar-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch4_data\"\n                                        >\n                                        </ui-bar-chart>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gblue fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch2_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u044F\u0432\u043E\u043A</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gblue\">\n                                        <span style=\"margin-left: 25px;\">\u0417\u0430\u044F\u0432\u043A\u0438</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch2_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-ggreen fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0423\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                    <div class=\"tile bg-ggreen fg-white\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041D\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-ggreen\">\n                                        <span style=\"margin-left: 25px;\">\u041F\u043E\u043A\u0430\u0437\u044B</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch3_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </ui-tab>\n                    <ui-tab\n                        [title]=\"'\u0418\u0441\u0442\u043E\u0440\u0438\u044F'\"\n                        (tabSelect)=\"historySelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <digest-history *ngFor=\"let record of historyRecs\"\n                                [historyRecord]=\"record\"\n                            >\n                            </digest-history>\n                        </div>\n                    </ui-tab>\n                </ui-tabs>\n            </div>\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041A\u041E\u041D\u0415\u0426 -->\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService,
        user_service_1.UserService,
        config_service_1.ConfigService,
        offer_service_1.OfferService,
        request_service_1.RequestService,
        task_service_1.TaskService,
        analysis_service_1.AnalysisService,
        history_service_1.HistoryService,
        person_service_1.PersonService,
        organisation_service_1.OrganisationService,
        session_service_1.SessionService])
], TabUserComponent);
exports.TabUserComponent = TabUserComponent;
//# sourceMappingURL=tab-user.component.js.map