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
var offer_1 = require("../../class/offer");
var person_1 = require("../../class/person");
var user_1 = require("../../class/user");
var hub_service_1 = require("../../service/hub.service");
var config_service_1 = require("../../service/config.service");
var offer_service_1 = require("../../service/offer.service");
var request_service_1 = require("../../service/request.service");
var task_service_1 = require("../../service/task.service");
var history_service_1 = require("../../service/history.service");
var person_service_1 = require("../../service/person.service");
var user_service_1 = require("../../service/user.service");
var analysis_service_1 = require("../../service/analysis.service");
var session_service_1 = require("../../service/session.service");
var TabRequestComponent = (function () {
    /*
    stageCodeOptions = [
        {value: 'contact', label: 'Первичный контакт'},
        {value: 'pre_deal', label: 'Заключение договора'},
        {value: 'show', label: 'Показ'},
        {value: 'prep_deal', label: 'Подготовка договора'},
        {value: 'decision', label: 'Принятие решения'},
        {value: 'negs', label: 'Переговоры'},
        {value: 'deal', label: 'Сделка'}
    ];
    */
    function TabRequestComponent(_hubService, _configService, _offerService, _requestService, _taskService, _analysisService, _historyService, _personService, _userService, _sessionService) {
        var _this = this;
        this._hubService = _hubService;
        this._configService = _configService;
        this._offerService = _offerService;
        this._requestService = _requestService;
        this._taskService = _taskService;
        this._analysisService = _analysisService;
        this._historyService = _historyService;
        this._personService = _personService;
        this._userService = _userService;
        this._sessionService = _sessionService;
        this.page = 0;
        this.perPage = 16;
        this.source = offer_service_1.OfferSource.LOCAL;
        this.agent = new user_1.User();
        this.agentOpts = [];
        this.person = new person_1.Person();
        this.personOpts = [];
        this.newRequest = false;
        this.editEnabled = false;
        this.mapDrawAllowed = false;
        this.paneHidden = false;
        this.ch1_data = [];
        this.ch2_data = [];
        this.ch3_data = [];
        this.ch4_data = [];
        this.offerTypeCodeOptions = [
            { value: 'sale', label: 'Продажа' },
            { value: 'rent', label: 'Аренда' }
        ];
        this.stageCodeOptions = [
            { value: 'raw', label: 'Не активен' },
            { value: 'active', label: 'Активен' },
            { value: 'listing', label: 'Листинг' },
            { value: 'deal', label: 'Сделка' },
            { value: 'suspended', label: 'Приостановлен' },
            { value: 'archive', label: 'Архив' }
        ];
        this.rate = [
            { persent: 10, text: "Предприятия и промышленность", isRated: false },
            { persent: 25, text: "Образование, школы, д/сады", isRated: true },
            { persent: 50, text: "Парки, кинотеатры и отдых", isRated: false },
            { persent: 55, text: "Здоровье, поликлиники, аптеки", isRated: false },
            { persent: 45, text: "Спорт и фитнес", isRated: false },
            { persent: 40, text: "Развлечения и ночная жизнь", isRated: false },
            { persent: 75, text: "Рестораны и шопинг", isRated: false },
            { persent: 90, text: "Красота", isRated: false },
            { persent: 65, text: "Культура", isRated: false },
        ];
        this._userService.list(null, null, "").subscribe(function (agents) {
            for (var i = 0; i < agents.length; i++) {
                var a = agents[i];
                _this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
        /*this._personService.list(null, null, "").subscribe(persons => {
            for (let i = 0; i < persons.length; i++) {
                var p = persons[i];
                this.personOpts.push({
                    value: p.id,
                    label: p.name
                });
            }
        });*/
        setTimeout(function () {
            if (_this.request.id) {
                _this.tab.header = 'Заявка';
            }
            else {
                _this.tab.header = 'Новая заявка';
            }
        });
    }
    TabRequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.request = this.tab.args.request;
        var c = this._configService.getConfig();
        var loc = this._sessionService.getAccount().location;
        if (this.request.searchArea && this.request.searchArea.length > 0) {
            var lat = 0.0;
            var lon = 0.0;
            this.request.searchArea.forEach(function (p) {
                lat += p.lat;
                lon += p.lon;
            });
            this.lat = lat / this.request.searchArea.length;
            this.lon = lon / this.request.searchArea.length;
        }
        else {
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
        }
        if (this.request.id == null) {
            this.newRequest = true;
        }
        else {
        }
        this._offerService.list(0, 32, offer_service_1.OfferSource.LOCAL, { offerTypeCode: this.request.offerTypeCode }, null, this.request.request, this.request.searchArea).subscribe(function (offers) {
            _this.offers = offers.list;
        }, function (err) { return console.log(err); });
        if (this.request.personId != null) {
            this._personService.get(this.request.personId).subscribe(function (data) {
                _this.person = data;
            });
        }
        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(function (agent) {
                _this.agent = agent;
            });
        }
        this.calcSize();
    };
    TabRequestComponent.prototype.onResize = function (e) {
        this.calcSize();
    };
    TabRequestComponent.prototype.calcSize = function () {
        if (this.paneHidden) {
            this.paneWidth = 0;
        }
        else {
            this.paneWidth = 370;
        }
        this.mapWidth = document.body.clientWidth - (31) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 31;
    };
    TabRequestComponent.prototype.toggleLeftPane = function () {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    };
    TabRequestComponent.prototype.toggleEdit = function () {
        this.editEnabled = !this.editEnabled;
    };
    TabRequestComponent.prototype.agentChanged = function (e) {
        var _this = this;
        this.request.agentId = e.selected.value;
        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(function (agent) {
                _this.agent = agent;
            });
        }
    };
    TabRequestComponent.prototype.personChanged = function (e) {
        var _this = this;
        this.request.personId = e.selected.value;
        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(function (agent) {
                _this.agent = agent;
            });
        }
    };
    TabRequestComponent.prototype.save = function () {
        var _this = this;
        this._requestService.save(this.request).subscribe(function (request) {
            setTimeout(function () {
                _this.request = request;
            });
            _this.toggleEdit();
        });
    };
    TabRequestComponent.prototype.offersSelected = function () {
        this.getOffers(0, 16);
    };
    TabRequestComponent.prototype.analysisSelected = function () {
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
    TabRequestComponent.prototype.historySelected = function () {
        this.historyRecs = this._historyService.getObjHistory();
    };
    TabRequestComponent.prototype.getOffers = function (page, per_page) {
        var _this = this;
        this._offerService.list(page, per_page, this.source, { offerTypeCode: this.request.offerTypeCode }, null, this.request.request, this.request.searchArea).subscribe(function (offers) {
            _this.offers = offers.list;
        }, function (err) { return console.log(err); });
    };
    TabRequestComponent.prototype.offerSearch = function () {
        this.getOffers(this.page, this.perPage);
    };
    TabRequestComponent.prototype.offer_search_keydown = function (e) {
        if (e.keyCode == 13) {
            this.offerSearch();
        }
    };
    TabRequestComponent.prototype.markerClick = function (r) {
        //r.selected = !r.selected;
        // scroll to object ???
    };
    TabRequestComponent.prototype.drawFinished = function (e) {
        this.request.searchArea = e;
        this.offerSearch();
    };
    TabRequestComponent.prototype.toggleDraw = function () {
        this.mapDrawAllowed = !this.mapDrawAllowed;
        if (!this.mapDrawAllowed) {
            this.request.searchArea = [];
            this.offerSearch();
        }
    };
    TabRequestComponent.prototype.createRequest = function () {
        this.newRequest = false;
        this.save();
    };
    TabRequestComponent.prototype.getOfferDigest = function (r) {
        return offer_1.Offer.getDigest(r);
    };
    TabRequestComponent.prototype.toggleSource = function (bool) {
        if (!bool) {
            this.source = offer_service_1.OfferSource.LOCAL;
        }
        else {
            this.source = offer_service_1.OfferSource.IMPORT;
        }
        this.page = 0;
        this.offerSearch();
    };
    TabRequestComponent.prototype.showMenu = function (event) {
        var parent = event.currentTarget.parentElement;
        var height = parent.getElementsByTagName('input').length * 35;
        if (parent.offsetHeight == 30) {
            console.log(height);
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
    return TabRequestComponent;
}());
TabRequestComponent = __decorate([
    core_1.Component({
        selector: 'tab-request',
        inputs: ['tab'],
        styles: ["\n        .header_col{\n            width: calc(100% - 10px);\n            height: 40px;\n            background-color: #f7f7f7;\n            padding-left: 20px;\n            text-transform: uppercase;\n            font-size: 10pt;\n            color: #5f5d5d;\n            line-height: 40px;\n            margin-bottom: 10px;\n        }\n\n        .search-form {\n            position: absolute;\n            width: 41%;\n            margin-left: 610;\n            margin-top: 15px;\n            z-index: 1;\n        }\n\n        .search-box > a {\n            font-size: 10pt;\n            color: #fbfbfb;\n            background-color: #0e60c5;\n            height: 28px;\n            line-height: 28px;\n            width: 80px;\n            cursor: pointer;\n            text-align: center;\n            display: inline-block;\n            float: left;\n        }\n\n        .with-button {\n            overflow: hidden;\n        }\n\n        .with-button > input {\n            float: left;\n            width: calc(100% - 184px);\n        }\n\n        .search-button {\n            width: 90px;\n            height: 28px;\n            background-color: #0b9700;\n            color: #fff;\n            cursor: pointer;\n            font-size: 10pt;\n            float: left;\n            text-align: center;\n        }\n\n        .search-form.table-mode {\n            border: 1px solid #fff;\n        }\n\n        .tool-box {\n            height: 30px;\n            margin: 0 12px;\n        }\n\n        .search-box {\n            position: relative;\n            margin: 12px 12 0 12;\n        }\n\n        .pane {\n            float: left;\n            width: 370px;\n            height: 100%;\n        }\n\n        .work-area {\n            float: left;\n            width: 100%;\n            height: 100%;\n        }\n\n        .tab-button {\n            width: 30px;\n            height: 30px;\n            text-align: center;\n            line-height: 30px;\n            font-size: 12px !important;\n            cursor: pointer;\n            color: #666;\n        }\n\n        .fixed-button {\n            position: fixed;\n            top: 0;\n            left: 0;\n        }\n\n        .view-group {\n            margin-bottom: 5px;\n            display: flex;\n            justify-content: space-between;\n            align-items: flex-start;\n        }\n\n        .view-label {\n            white-space: nowrap;\n            color: rgb(80, 80, 80);\n            margin-top: 5px;\n            font-size: 10pt;\n        }\n\n        .view-value {\n            width: 100%;\n            text-align: right;\n            color: #696969;\n            font-size: 10pt;\n            margin-top: 5px;\n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n        }\n\n        .edit-value {\n            width: 100%;\n            text-align: right;\n            color: #696969;\n            font-size: 10pt;\n            margin-right: 15px;\n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n            border: none !important;\n        }\n\n        .text-value {\n            height: 3rem;\n            border: 1px solid #E5E5E5 !important;\n        }\n\n        .edit-block > .view-group, .view-block > .view-group {\n            height: 30px;\n            height: 30px;\n            margin-left: 57px;\n        }\n\n\n        .tile-x {\n            margin-right: 10px;\n            width: 150px;\n            height: 150px;\n            color: #fff;\n            position: relative;\n        }\n\n        .tile {\n            margin: 0;\n            margin-right: 10px;\n        }\n\n        .icon {\n            line-height: 64px;\n        }\n\n        .tile-content.iconic .icon {\n            width: 128px;\n            margin-left: -64px;\n        }\n\n        .chart-block {\n            overflow:hidden;\n            border: 1px solid #e5e5e5;\n        }\n\n        .chart-header {\n            width: 100%;\n            height: 30px;\n            border-bottom: 1px solid #e5e5e5;\n            line-height: 30px;\n            color: #fff;\n        }\n\n        .array-container > span {\n            display: block;\n            margin-bottom: 5px;\n        }\n\n        .array-container > input {\n            margin-bottom: 5px;\n        }\n\n        .button {\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #3366cc;\n            color: #fff;\n            cursor: pointer;\n        }\n\n        .person_face{\n            height: 220px;\n            background-color: #f7f7f7;\n        }\n\n        .person_face > .rate{\n            height: 20px;\n            background-image: url(res/star_rate.png);\n            background-size: contain;\n            width: 100px;\n            margin-left: 20px;\n            margin-top: 10px;\n        }\n\n        .person_face > img{\n            width: 120px;\n            height: 90px;\n            margin: 20px 0 10 20px;\n        }\n\n        .person_face  .name{\n            margin: 0 0 0 20px;\n            border: 0 !important;\n            font-size: 16pt;\n            text-align: left;\n            background-color: transparent;\n            color: #595a5a;\n            height: 23px;\n            line-height: 23px;\n        }\n        .view_icon{\n            width: 28px;\n            height: 25px;\n            background-size: contain;\n            float: left;\n            background-repeat: no-repeat;\n            background-position: center;\n            margin-right: 12px;\n            margin-top: 2px;\n            margin-left: 17px;\n        }\n\n        .edit-block >hr, .view-block >hr{\n                margin: 5px -10px 5px 55px;\n        }\n\n        .arrow{\n            background-image: url(res/arrow.png);\n            width: 18px;\n            height: 10px;\n            background-size: cover;\n            margin: 0 10px;\n            background-position: center;\n            flex: 0 0 18px;\n            position: absolute;\n            top: 5px;\n            right: -10px;\n        }\n\n        .show_value{\n            flex: 0 0 190px;\n            margin-right: 30px;\n            position: relative;\n            text-align: right;\n            height: 30px;\n            display: flex;\n            flex-direction: column;\n        }\n\n        .show_value > span:first-child{\n            height: 10px;\n            font-size: 8pt;\n        }\n        .show_value > span:last-child{\n            font-size: 10pt;\n            color: #959595;\n        }\n\n        .multiselect{\n            width: 270px;\n            position: relative;\n            display: block;\n            margin-right: 15px;\n            overflow: hidden;\n        }\n\n        .head{\n            width: 100%;\n            height: 73px;\n            display: block;\n            background-color: #f7f7f7;\n        }\n        .new-request .rate{\n            width: 370px;\n            min-height: 150px;\n            height: calc(100vh - 500px);\n            background: white;\n            overflow: scroll;\n        }\n\n        .new-request .rate >div:first-child{\n            height: 40px;\n            background: #f7f7f7;\n            line-height: 40px;\n            padding-left: 15px;\n            text-transform: uppercase;\n            font-size: 10pt;\n            color: #5f5d5d;\n            margin-top: 20px;\n            margin-bottom: 20px;\n        }\n\n        .new-request .rate_line{\n            width: 350px;\n            margin-left: 15px;\n            height: 20px;\n            margin-top: 0px;\n            display: flex;\n        }\n\n        .new-request .rate_line>div:last-child{\n            line-height: 20px;\n            margin-left: 15px;\n            font-size: 9pt;\n            color: #5b5b5b;\n        }\n\n        .new-request .rate_line >div:first-child {\n            background-image: url(res/star_rate.png);\n            background-size: 13px 13px;\n            width: 64px;\n            background-position: left center;\n            background-repeat: repeat-x;\n        }\n\n        .new-request .rate_line>div:first-child>div{\n            background-image: url(res/star_active.png);\n            height: 20px;\n            background-size: 13px 13px;\n            background-position: left center;\n            background-repeat: repeat-x;\n        }\n    "],
        template: "\n\n        <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n            <span [ngClass]=\"{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}\"></span>\n        </div>\n\n        <div class=\"new-request\" [hidden]=\"!newRequest\">\n            <div class=\"header\">\n                <div class=\"header-label\">{{ tab.header }}</div>\n                <div class=\"search-form\" [class.table-mode]=\"tableMode\">\n                    <div class=\"search-box with-button\">\n                        <input type=\"text\" class=\"\" placeholder=\"\" [(ngModel)]=\"request.request\" (keydown)=\"offer_search_keydown($event)\"\n                            style=\"height: 28px; background-color: rgb(247, 247, 247); border: 1px solid rgba(204, 204, 204, 0.47);\"\n                        >\n                        <span class=\"icon-search\" style=\"position: absolute; right: 190px;\"></span>\n                        <a (click)=\"toggleDraw()\"><span>\u041E\u0431\u0432\u0435\u0441\u0442\u0438</span></a>\n                        <div class=\"search-button\" (click)=\"createRequest()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</div>\n                    </div>\n                    <div class=\"tool-box\">\n                        <div class=\"pull-left\">\n                            <div class=\"inline-select\">\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"offerTypeCodeOptions\"\n                                    [value]=\"request.offerTypeCode\"\n                                    [config]=\"{icon: 'icon-', draw_arrow: true}\"\n                                    (onChange)=\"request.offerTypeCode = $event.selected.value; offer_search();\"\n                                    >\n                                </ui-select>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n            <!-- \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0434\u0443\u043D\u0441\u0442\u0432\u043E, \u0441\u0432-\u0432\u043E right \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0438\u0437 HubService -->\n            <!-- TODO: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C -->\n            <div  style=\"position: absolute; top: 114px; z-index: 1; \" [style.right]=\"_hubService.shared_var['nb_width']\">\n                <div style=\"width: 370px; background-color: #fff; height: 500px; overflow: hidden;\">\n                    <div class=\"head\">\n                        <input type=\"text\" style=\"width: 319px; margin-left: 10px; border: none; margin-top: 10px;\"\n                            (keydown)=\"offer_search_keydown($event)\"\n                        >\n                        <span class=\"icon-search\" style=\"margin-left: 10px; cursor: pointer;\"\n                            (click)=\"offer_search()\"\n                        ></span>\n                        <div style=\"margin-top: 8px; margin-right: 35px; margin-left: auto; width: 126px; display: flex; align-items: center;\">\n                            <span style=\"margin-top: 0;margin-right: 5px;color: rgb(80, 80, 80);font-size: 10pt;\">\u041E\u0431\u0449\u0430\u044F \u0431\u0430\u0437\u0430</span>\n                            <ui-switch-button (newValue)=\"toggleSource($event)\" [value]=\"source > 1 ? true : false\"> </ui-switch-button>\n                        </div>\n\n                    </div>\n                    <div class=\"\" style=\"width: 100%; overflow-y: scroll; height: 427px;\">\n                        <digest-offer *ngFor=\"let offer of offers\"\n                            [offer]=\"offer\"\n                            [compact]=\"true\"\n                        >\n                        </digest-offer>\n                    </div>\n                </div>\n                <div class=\"rate\">\n                    <div>\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043B\u043E\u043A\u0430\u0446\u0438\u0438</div>\n                    <div class=\"rate_line\" *ngFor=\"let rat of rate; let i = index\">\n                        <div on-mousemove ='inRate($event, i)' on-mouseout='outRate($event, i)' on-click='estimate($event,i)'>\n                            <div [ngStyle]=\"{'width': rat.persent+'%'}\"></div>\n                        </div>\n                        <div>{{rat.text}}</div>\n                    </div>\n                </div>\n            </div>\n            <google-map\n                [latitude]=\"lat\"\n                [longitude]=\"lon\"\n                [zoom]=\"zoom\"\n                [objects]=\"offers\"\n                [draw_allowed]=\"mapDrawAllowed\"\n                (drawFinished)=\"drawFinished($event)\"\n            >\n            </google-map>\n        </div>\n\n\n        <!------------------>\n\n        <div class=\"request\" (window:resize)=\"onResize($event)\" [hidden]=\"newRequest\">\n\n            <!-- \u041B\u0415\u0412\u0410\u042F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"pane\" [hidden]=\"paneHidden\" [style.width.px]=\"paneWidth\">\n                <div class=\"header\">\n                    <div class=\"header-label\">{{ tab.header }}</div>\n                </div>\n\n                <div style=\"overflow: scroll; overflow-x: hidden; height: calc(100% - 111px);\n                        border-right: 1px solid #cccccc;\">\n                    <div class = \"person_face\">\n                        <img src=\"/res/offer_icon/district.png\">\n                        <div class=\"view-group\" style=\"flex-wrap: wrap;margin-top: -1px;\">\n                            <div class=\"view-value name\" style=\"text-transform: uppercase;\"> {{ '\u0417\u0430\u044F\u0432\u043A\u0430'}}</div>\n                            <div class=\"view-value name\" style=\"font-size: 14pt; margin-top: 3px;\"> </div>\n                        </div>\n                        <div class=\"rate\"></div>\n                    </div>\n                    <div class=\"pull-container\" style=\"margin: 20px 10px 0px;\">\n                        <div class=\"pull-right\" [hidden]=\"editEnabled\" (click)=\"toggleEdit()\"><a href=\"#\" >\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</a></div>\n                        <div class=\"pull-right\" [hidden]=\"!editEnabled\" (click)=\"save()\"><a href=\"#\" >\u0413\u043E\u0442\u043E\u0432\u043E</a></div>\n                    </div>\n\n                    <div class=\"request-prop\">\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n                        <div class=\"edit-block\" [hidden]=\"!editEnabled\" style=\"margin: 10px 10px 10px 0px;\">\n                            <div class=\"header_col\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/date_start.png)'\"></div>\n                            <div class=\"view-group\" style='overflow: hidden; position: relative; display: block;'>\n                                <ui-input-line [placeholder] = \"'\u0414\u0430\u0442\u0430 \u0437\u0430\u044F\u0432\u043A\u0438:'\" [value] = \"request.changeDate | formatDate\"\n                                    [width] = \"'225px'\" (onChange)= \"request.changeDate = $event\">\n                                </ui-input-line>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/phone.png)'\"></div>\n                            <div class=\"view-group\" style='position: relative; display: block;'>\n                                <ui-input-line [placeholder] = \"'\u0422\u0435\u043B\u0435\u0444\u043E\u043D:'\" [value] = \"person.name\"\n                                    [width] = \"'225px'\" (onChange)= \"person = $event\" [queryTipe]=\"'person'\">\n                                </ui-input-line>\n                            </div>\n                            <div class=\"header_col\">\u0421\u043E\u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/user.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                                <ui-slidingMenu class=\"view-value edit-value\"\n                                    [options] = \"agentOpts\"\n                                    [value]=\"agent?.id\"\n                                    (onChange)=\"agentChanged($event)\"\n                                >\n                                </ui-slidingMenu>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/status.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0434\u0438\u044F:</span>\n                                <ui-slidingMenu class=\"view-value edit-value\"\n                                    [options] = \"[\n                                        {value: 'NO', label: '-'},\n                                        {value: 'ACTIVE', label: '\u0410\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                        {value: 'NOT_ACTIVE', label: '\u041D\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                        {value: 'ARCHIVE', label: '\u0410\u0440\u0445\u0438\u0432'}\n                                    ]\"\n                                    [value]=\"request.stateCode\"\n                                    (onChange)=\"request.stateCode = $event.selected.value\">\n                                </ui-slidingMenu>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/person_icon/source.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A:</span>\n                                <ui-slidingMenu class=\"view-value edit-value\"\n                                    [options] = \"[\n                                        {value: 'CALL', label: '\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0439 \u0437\u0432\u043E\u043D\u043E\u043A'},\n                                        {value: 'INTERNET', label: '\u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442'},\n                                        {value: 'PRINT', label: '\u041F\u0435\u0447\u0430\u0442\u043D\u043E\u0435 \u0438\u0437\u0434\u0430\u043D\u0438\u0435'},\n                                        {value: 'PARTHER', label: '\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430'},\n                                        {value: 'CL_RECOMMEND', label: '\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430'},\n                                        {value: 'PAR_RECOMMEND', label: '\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430'},\n                                        {value: 'SOCIAL', label: '\u0421\u043E\u0446. \u0441\u0435\u0442\u0438'},\n                                        {value: 'OTHER', label: '\u0423\u0441\u043F\u0435\u0448\u043D\u044B\u0439 \u043E\u043F\u044B\u0442 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430'}\n                                    ]\"\n                                    [value]=\"request.stageCode\"\n                                    (onChange)=\"request.stageCode = $event.selected.value\">\n                                </ui-slidingMenu>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/offer_icon/offer.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0422\u0438\u043F:</span>\n                                <ui-slidingMenu class=\"view-value edit-value\"\n                                    [options] = \"[\n                                        {value: 'sale', label: '\u041F\u0440\u043E\u0434\u0430\u0436\u0430'},\n                                        {value: 'rent', label: '\u0410\u0440\u0435\u043D\u0434\u0430'}\n                                    ]\"\n                                    [value]=\"request.offerTypeCode\"\n                                    (onChange)=\"request.offerTypeCode = $event.selected.value\">\n                                </ui-slidingMenu>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/date_start.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0417\u0430\u044F\u0432\u043A\u0430:</span>\n                                <input type=\"text\" class=\"view-value edit-value\" readonly [(ngModel)]=\"request.request\">\n                            </div>\n\n                            <div class=\"header_col\">\u0422\u044D\u0433\u0438</div>\n                            <div style=\"margin: 0 0 20px 20px;\">\n                                <ui-tag-block\n                                    [value] = \"person.tag\"\n                                    (valueChange) = \"person.tag = $event.value\"\n                                ></ui-tag-block>\n                            </div>\n\n                            <div class=\"header_col\">\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class=\"view-group\" style=\"flex-wrap: wrap; height: 50px; margin-left: 20px;\">\n                                <textarea class=\"view-value text-value\"\n                                placeholder=\"\" [(ngModel)]=\"request.info\"\n                                style=\"text-align: left;\"></textarea>\n                            </div>\n                        </div>\n\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n                        <div class=\"view-block\" [hidden]=\"editEnabled\" style=\"margin: 10px 10px 10px 0px;\">\n                            <div class=\"header_col\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/date_start.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0414\u0430\u0442\u0430 \u0437\u0430\u044F\u0432\u043A\u0438:</span>\n                                <span class=\"view-value\"> {{ request.changeDate | formatDate }} </span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/post.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442:</span>\n                                <span class=\"view-value\"> {{ person.name }} </span>\n                            </div>\n\n                            <div class=\"header_col\">\u0421\u043E\u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/post.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439:</span>\n                                <span class=\"view-value\"> {{ agent.name }} </span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/person_icon/contract.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0414\u043E\u0433\u043E\u0432\u043E\u0440:</span>\n                                <span class=\"view-value\">{{person.contract_n}}</span>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/status.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0434\u0438\u044F:</span>\n                                <ui-view-value\n                                    [options] = \"[\n                                        {value: 'NO', label: '-'},\n                                        {value: 'ACTIVE', label: '\u0410\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                        {value: 'NOT_ACTIVE', label: '\u041D\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u043E'},\n                                        {value: 'ARCHIVE', label: '\u0410\u0440\u0445\u0438\u0432'}\n                                    ]\"\n                                    [value]=\"request.stateCode\"\n                                >\n                                </ui-view-value>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/person_icon/source.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A:</span>\n                                <ui-view-value\n                                    [options] = \"[\n                                        {value: 'CALL', label: '\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0439 \u0437\u0432\u043E\u043D\u043E\u043A'},\n                                        {value: 'INTERNET', label: '\u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442'},\n                                        {value: 'PRINT', label: '\u041F\u0435\u0447\u0430\u0442\u043D\u043E\u0435 \u0438\u0437\u0434\u0430\u043D\u0438\u0435'},\n                                        {value: 'PARTHER', label: '\u0420\u0430\u0441\u0441\u044B\u043B\u043A\u0430'},\n                                        {value: 'CL_RECOMMEND', label: '\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430'},\n                                        {value: 'PAR_RECOMMEND', label: '\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430'},\n                                        {value: 'SOCIAL', label: '\u0421\u043E\u0446. \u0441\u0435\u0442\u0438'},\n                                        {value: 'OTHER', label: '\u0423\u0441\u043F\u0435\u0448\u043D\u044B\u0439 \u043E\u043F\u044B\u0442 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430'}\n                                    ]\"\n                                    [value]=\"request.stageCode\"\n                                >\n                                </ui-view-value>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/offer_icon/offer.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0422\u0438\u043F:</span>\n                                <ui-view-value\n                                    [options] = \"[\n                                        {value: 'sale', label: '\u041F\u0440\u043E\u0434\u0430\u0436\u0430'},\n                                        {value: 'rent', label: '\u0410\u0440\u0435\u043D\u0434\u0430'}\n                                    ]\"\n                                    [value]=\"request.offerTypeCode\"\n                                >\n                                </ui-view-value>\n                            </div>\n                            <hr>\n                            <div class='view_icon' [style.background-image]=\"'url(res/user_icon/date_end.png)'\"></div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0417\u0430\u044F\u0432\u043A\u0430:</span>\n                                <span class=\"view-value\"> {{ request.request }}</span>\n                            </div>\n\n                            <div class=\"header_col\">\u0422\u044D\u0433\u0438</div>\n                            <div style=\"margin: 0 0 20px 20px;\">\n                                <ui-tag-block\n                                    [value] = \"person.tag\"\n                                    (valueChange) = \"person.tag = $event.value\"\n                                ></ui-tag-block>\n                            </div>\n\n                            <div class=\"header_col\">\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n                            <div class=\"view-group\">\n                                <span class=\"view-value\" style=\"height: initial;\"> {{ request.info }} </span>\n                            </div>\n                        </div>\n\n                    <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n\n                    </div>\n                </div>\n            </div>\n\n            <!-- \u041B\u0435\u0432\u0430\u044F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041A\u041E\u041D\u0415\u0426 -->\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"work-area\" [style.width.px]=\"mapWidth\">\n                <ui-tabs\n                    [headerMode]=\"!paneHidden\"\n                    [iconUrls]=\"['res/main_offers.png', 'res/request1.png', 'res/analitic.png']\"\n                    [iconUrls_active]=\"['res/main_offers_color.png', 'res/request1_color.png', 'res/analitic_color.png']\"\n                >\n                    <ui-tab\n                        [title]=\"'\u0413\u043B\u0430\u0432\u043D\u0430\u044F'\"\n                        (tabSelect)=\"offersSelected()\"\n                    >\n                        <!-- \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0434\u0443\u043D\u0441\u0442\u0432\u043E, \u0441\u0432-\u0432\u043E right \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0438\u0437 HubService -->\n                        <!-- TODO: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C -->\n                        <div  style=\"position: absolute; z-index: 1; border-left: 1px solid #ccc;\" [style.right]=\"_hubService.shared_var['nb_width']\">\n                            <div style=\"width: 370px; background-color: #fff;\">\n                                    <div class=\"head\">\n                                        <input type=\"text\" style=\"width: 319px; margin-left: 10px; border: none; margin-top: 10px;\"\n                                            (keydown)=\"offer_search_keydown($event)\"\n                                        >\n                                        <span class=\"icon-search\" style=\"margin-left: 10px; cursor: pointer;\"\n                                            (click)=\"offer_search()\"\n                                        ></span>\n                                        <div style=\"margin-top: 8px; margin-right: 35px; margin-left: auto; width: 126px; display: flex; align-items: center;\">\n                                            <span style=\"margin-top: 0;margin-right: 5px;color: rgb(80, 80, 80);font-size: 10pt;\">\u041E\u0431\u0449\u0430\u044F \u0431\u0430\u0437\u0430</span>\n                                            <ui-switch-button (newValue)=\"toggleSource($event)\" [value]=\"source > 1 ? true : false\"> </ui-switch-button>\n                                        </div>\n                                    </div>\n                                <div class=\"\" style=\"width: 100%; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                                    <digest-offer *ngFor=\"let offer of offers\"\n                                        [offer]=\"offer\"\n                                        [compact]=\"true\"\n                                    >\n                                    </digest-offer>\n                                </div>\n                            </div>\n                        </div>\n                        <google-map\n                            [latitude]=\"lat\"\n                            [longitude]=\"lon\"\n                            [zoom]=\"zoom\"\n                            [objects]=\"offers\"\n                            [polygone_points]=\"request?.searchArea\"\n                        >\n                        </google-map>\n                    </ui-tab>\n                    <ui-tab [title]=\"'\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430'\"\n                        (tabSelect)=\"analysisSelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gred fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch1_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u0434\u0430\u0447</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gred\">\n                                        <span style=\"margin-left: 25px;\">\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C</span>\n                                    </div>\n                                    <div>\n                                        <ui-pie-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch1_data\"\n                                        >\n                                        </ui-pie-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-gorange fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439</span>\n                                    </div>\n                                    <div class=\"tile bg-gorange fg-white\" >\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u0440\u0443\u0431.</span>\n                                    </div>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gorange\">\n                                        <span style=\"margin-left: 25px;\">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</span>\n                                    </div>\n                                    <div>\n                                        <ui-bar-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch4_data\"\n                                        >\n                                        </ui-bar-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gblue fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch2_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u044F\u0432\u043E\u043A</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gblue\">\n                                        <span style=\"margin-left: 25px;\">\u0417\u0430\u044F\u0432\u043A\u0438</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch2_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-ggreen fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0423\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                    <div class=\"tile bg-ggreen fg-white\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041D\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-ggreen\">\n                                        <span style=\"margin-left: 25px;\">\u041F\u043E\u043A\u0430\u0437\u044B</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch3_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </ui-tab>\n                    <ui-tab\n                        [title]=\"'\u0418\u0441\u0442\u043E\u0440\u0438\u044F'\"\n                        (tabSelect)=\"historySelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <digest-history *ngFor=\"let record of historyRecs\"\n                                [historyRecord]=\"record\"\n                            >\n                            </digest-history>\n                        </div>\n                    </ui-tab>\n                </ui-tabs>\n            </div>\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041A\u041E\u041D\u0415\u0426 -->\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService,
        config_service_1.ConfigService,
        offer_service_1.OfferService,
        request_service_1.RequestService,
        task_service_1.TaskService,
        analysis_service_1.AnalysisService,
        history_service_1.HistoryService,
        person_service_1.PersonService,
        user_service_1.UserService,
        session_service_1.SessionService])
], TabRequestComponent);
exports.TabRequestComponent = TabRequestComponent;
//# sourceMappingURL=tab-request.component.js.map