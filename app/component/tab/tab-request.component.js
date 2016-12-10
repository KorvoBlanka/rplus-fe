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
var TabRequestComponent = (function () {
    function TabRequestComponent(_hubService, _configService, _offerService, _requestService, _taskService, _analysisService, _historyService, _personService, _userService) {
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
        this.person = new person_1.Person();
        this.agent = new user_1.User();
        this.agentOpts = [];
        this.newRequest = false;
        this.editEnabled = false;
        this.mapDrawAllowed = false;
        this.paneHidden = false;
        //
        this.lat = 48.480007;
        this.lon = 135.054954;
        this.zoom = 16;
        this.ch1_data = [];
        this.ch2_data = [];
        this.ch3_data = [];
        this.ch4_data = [];
        this._userService.list("AGENT", null, "").then(function (agents) {
            for (var i = 0; i < agents.length; i++) {
                var a = agents[i];
                _this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
        setTimeout(function () {
            _this.tab.header = 'Запрос';
        });
    }
    TabRequestComponent.prototype.log = function (e) {
        console.log(e);
    };
    TabRequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.request = this.tab.args.request;
        if (this.request.id == null) {
            this.newRequest = true;
        }
        else {
        }
        this._personService.get(this.request.person_id).then(function (person) {
            _this.person = person;
        });
        if (this.request.agent_id != null) {
            this._userService.get(this.request.agent_id).then(function (agent) {
                _this.agent = agent;
            });
        }
        this.calcSize();
        console.log(this.request);
    };
    TabRequestComponent.prototype.onResize = function (e) {
        this.calcSize();
    };
    TabRequestComponent.prototype.calcSize = function () {
        if (this.paneHidden) {
            this.paneWidth = 0;
        }
        else {
            this.paneWidth = 420;
        }
        this.mapWidth = document.body.clientWidth - (30 * 2) - this.paneWidth;
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
        this.request.agent_id = e.value.val;
        if (this.request.agent_id != null) {
            this._userService.get(this.request.agent_id).then(function (agent) {
                _this.agent = agent;
            });
        }
    };
    TabRequestComponent.prototype.save = function () {
        var _this = this;
        if (this.request.id == null) {
            this._requestService.create(this.request).then(function (request) {
                _this.request = request;
                _this.toggleEdit();
            });
        }
        else {
            this._requestService.update(this.request).then(function (request) {
                _this.request = request;
                _this.toggleEdit();
            });
        }
    };
    TabRequestComponent.prototype.offersSelected = function () {
        this.getOffers(1, 16);
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
        this.offers = this._offerService.getSimilarOffer(page, per_page);
    };
    TabRequestComponent.prototype.offer_search = function () {
        this.getOffers(Math.floor(Math.random() * 4), 16);
    };
    TabRequestComponent.prototype.offer_search_keydown = function (e) {
        if (e.keyCode == 13) {
            this.offer_search();
        }
    };
    TabRequestComponent.prototype.markerClick = function (r) {
        console.log('markerClick');
        console.log(r);
        //r.selected = !r.selected;
        // scroll to object ???
    };
    TabRequestComponent.prototype.drawFinished = function (e) {
        console.log('draw_finished');
        console.log(e);
        this.searchArea = e;
    };
    TabRequestComponent.prototype.createRequest = function () {
        this.newRequest = false;
        //this.request = this._requestService.getEmpty();
        this.request.request = this.queryText;
    };
    TabRequestComponent.prototype.toggleDraw = function () {
        this.mapDrawAllowed = !this.mapDrawAllowed;
    };
    TabRequestComponent.prototype.getOfferDigest = function (r) {
        return offer_1.Offer.getDigest(r);
    };
    return TabRequestComponent;
}());
TabRequestComponent = __decorate([
    core_1.Component({
        selector: 'tab-request',
        inputs: ['tab'],
        styles: ["\n        .search-form {\n            position: absolute;\n            width: 50%;\n            margin-left: 25%;\n            margin-top: 10px;\n            background: #fff;\n            z-index: 1;\n            border: 1px solid #eee;\n        }\n\n        .search-form > input {\n            height: 28px;\n            width: 100%;\n        }\n\n        .with-button {\n            overflow: hidden;\n        }\n\n        .with-button > input {\n            float: left;\n            width: calc(100% - 120px);\n        }\n\n        .search-button {\n            float: right;\n            width: 120px;\n            height: 24px;\n            background-color: #3366cc;\n            color: #fff;\n            text-align: center;\n            cursor: pointer;\n        }\n\n        .search-form.table-mode {\n            border: 1px solid #fff;\n        }\n\n        .tool-box {\n            height: 30px;\n            margin: 0 12px;\n        }\n\n        .search-box {\n            position: relative;\n            margin: 12px;\n            margin-bottom: 8px;\n        }\n\n        .pane {\n            float: left;\n            width: 370px;\n            height: 100%;\n            border-right: 1px solid #ccc;\n        }\n        \n        .work-area {\n            float: left;\n            width: 100%;\n            height: 100%;\n        }\n        \n        .tab-button {\n            width: 30px;\n            height: 30px;\n            text-align: center;\n            line-height: 30px;\n            font-size: 12px !important;\n            cursor: pointer;\n            color: #666;\n        }\n      \n        .fixed-button {\n            position: fixed;\n            top: 0;\n            left: 0;\n        }\n\n        .request-prop {\n            overflow-y: scroll;\n        }\n\n        .view-group {\n            margin-bottom: 5px;\n            display: flex;\n            justify-content: space-between;\n        }\n      \n        .view-label {\n            white-space: nowrap;\n            color: #bbb;\n            font-size: 15px;\n        }\n        \n        .view-value {\n            width: 100%;\n            text-align: right;\n            color: #696969;\n            font-size: 15px;\n    \n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n        }\n        \n        .edit-value {\n            width: 100%;\n            text-align: right;\n            color: #696969;\n            font-size: 15px;\n            height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n            border: none !important;\n            border-bottom: 1px solid #E5E5E5 !important;\n        }\n\n        .text-value {\n            height: 3rem;\n            border: 1px solid #E5E5E5 !important;\n        }\n\n        .edit-block > .view-group {\n            margin-bottom: 26px;\n        }\n\n        .tile-x {\n            margin-right: 10px;\n            width: 150px;\n            height: 150px;\n            color: #fff;\n            position: relative;\n        }\n\n        .tile {\n            margin: 0;\n            margin-right: 10px;\n        }\n        \n        .icon {\n            line-height: 64px;\n        }\n        \n        .tile-content.iconic .icon {\n            width: 128px;\n            margin-left: -64px;\n        }\n        \n        .chart-block {\n            overflow:hidden;\n            border: 1px solid #e5e5e5;\n        }\n      \n        .chart-header {\n            width: 100%;\n            height: 30px;\n            border-bottom: 1px solid #e5e5e5;\n            line-height: 30px;\n            color: #fff;\n        }\n\n        .array-container > span {\n            display: block;\n            margin-bottom: 5px;\n        }\n\n        .array-container > input {\n            margin-bottom: 5px;\n        }\n    "],
        template: "\n\n        <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n            <span [ngClass]=\"{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}\"></span>\n        </div>\n        \n        <div class=\"new-request\"\n            [hidden]=\"!newRequest\"\n        >\n            <div class=\"search-form\" [class.table-mode]=\"tableMode\">\n                <div class=\"search-box with-button\">\n                    <input type=\"text\" class=\"\" placeholder=\"\" [(ngModel)]=\"queryText\">\n                    <div class=\"search-button\" (click)=\"createRequest()\">\u0421\u043E\u0437\u0434\u0430\u0442\u044C</div>\n                </div>\n                <div class=\"tool-box\">\n                    <div class=\"pull-left\">\n                    </div>\n                    <div class=\"pull-right\">\n                        <a (click)=\"toggleDraw()\" [hidden]=\"tableMode\">\n                            <span\n                                [ngClass]=\"{'icon-cancel': mapDrawAllowed, 'icon-edit': !mapDrawAllowed}\"\n                            ></span>\n                        </a>\n                    </div>\n                </div>\n            </div>\n        \n            <!-- \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0434\u0443\u043D\u0441\u0442\u0432\u043E, \u0441\u0432-\u0432\u043E right \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0438\u0437 HubService -->\n            <!-- TODO: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C -->\n            <div  style=\"position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;\" [style.right]=\"_hubService.shared_var['nb_width']\">\n                <div style=\"width: 330px; background-color: #fff;\">\n                    <div class=\"header\">\n                        <input type=\"text\" style=\"width: 280px; margin-left: 10px; border: none;\"\n                            (keydown)=\"offer_search_keydown($event)\"\n                        >\n                        <span class=\"icon-search\" style=\"margin-left: 10px; cursor: pointer;\"\n                            (click)=\"offer_search()\"\n                        ></span>\n                    </div>\n                    <div class=\"\" style=\"width: 100%; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                        <digest-offer *ngFor=\"let offer of offers\"\n                            [offer]=\"offer\"\n                            [compact]=\"true\"\n                        >\n                        </digest-offer>\n                    </div>\n                </div>\n            </div>\n        \n            <google-map\n                [latitude]=\"lat\"\n                [longitude]=\"lon\"\n                [zoom]=\"zoom\"\n                [draw_allowed]=\"mapDrawAllowed\"\n                (drawFinished)=\"drawFinished($event)\"\n            >\n            </google-map>\n        </div>\n\n        <div class=\"request\"\n            (window:resize)=\"onResize($event)\"\n            [hidden]=\"newRequest\"\n        >\n\n            <!-- \u041B\u0415\u0412\u0410\u042F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"pane\" [hidden]=\"paneHidden\" [style.width.px]=\"paneWidth\">\n                <div class=\"header\">\n                    <div class=\"header-label\">{{ tab.header }}</div>\n                </div>\n                <div class=\"request-prop\" [style.height]=\"paneHeight\">\n                    <div style=\"margin: 5px;\">\n                        <div class=\"pull-container\">\n                            <div class=\"font-sz-2 pull-left\">\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: \u0437\u0432\u043E\u043D\u043E\u043A<span class=\"color-g1\"><a href=\"\" target=\"_blank\"></a></span></div>\n                            <div class=\"font-sz-1 color-g2 pull-right\"> {{ request.add_date | formatDate }} </div>\n                        </div>\n                        <hr>\n\n                        <div class=\"pull-container\" style=\"margin: 0 10px;\">\n                            <div class=\"pull-right\" [hidden]=\"editEnabled\" (click)=\"toggleEdit()\"><a href=\"#\" >\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</a></div>\n                            <div class=\"pull-right\" [hidden]=\"!editEnabled\" (click)=\"save()\"><a href=\"#\" >\u0413\u043E\u0442\u043E\u0432\u043E</a></div>\n                        </div>\n\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n    \n                        <div class=\"edit-block\" [hidden]=\"!editEnabled\" style=\"margin: 20px 10px;\">\n    \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442</span>\n                                <span class=\"view-value\">{{ person.name }}</span>\n                            </div>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0414\u043E\u0433\u043E\u0432\u043E\u0440</span>\n                                <span class=\"view-value\"> #4242421365 \u043E\u0442 08.02.22</span>\n                            </div>\n                            <br>\n        \n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"agentOpts\"\n                                    [value]=\"agent.id\"\n                                    (onChange)=\"agentChanged($event)\"\n                                >\n                                </ui-select>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0442\u0443\u0441</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"[\n                                        {value: 1, label: '\u041D\u0435 \u0430\u043A\u0442\u0438\u0432\u0435\u043D'},\n                                        {value: 2, label: '\u0410\u043A\u0442\u0438\u0432\u0435\u043D'},\n                                        {value: 3, label: '\u0412 \u0440\u0430\u0431\u043E\u0442\u0435'},\n                                        {value: 4, label: '\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D'},\n                                        {value: 5, label: '\u0410\u0440\u0445\u0438\u0432'}\n                                    ]\"\n                                    [value]=\"1\"\n                                    (onChange)=\"log($event)\"\n                                >\n                                </ui-select>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0434\u0438\u044F</span>\n                                <ui-select class=\"view-value edit-value\"\n                                    [options] = \"[\n                                        {value: 1, label: '\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442'},\n                                        {value: 2, label: '\u0417\u0430\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430'},\n                                        {value: 3, label: '\u041F\u043E\u043A\u0430\u0437'},\n                                        {value: 4, label: '\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430'},\n                                        {value: 5, label: '\u041F\u0440\u0438\u043D\u044F\u0442\u0438\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F'},\n                                        {value: 6, label: '\u041F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u044B'},\n                                        {value: 7, label: '\u0421\u0434\u0435\u043B\u043A\u0430'}\n                                    ]\"\n                                    [value]=\"1\"\n                                    (onChange)=\"log($event)\"\n                                >\n                                </ui-select>\n                            </div>\n                            <br>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0417\u0430\u043F\u0440\u043E\u0441</span>\n                                <input type=\"text\" class=\"view-value edit-value\" readonly [(ngModel)]=\"request.request\">\n                            </div>\n                            <br>\n                            <div class=\"view-group\" style=\"flex-wrap: wrap;\">\n                                <span class=\"view-label\">\u0418\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</span>\n                                <textarea class=\"view-value text-value\" placeholder=\"\" [(ngModel)]=\"request.info\" style=\"text-align: left;\"></textarea>\n                            </div>\n                        </div>\n\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n                        <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n    \n                        <div class=\"view-block\" [hidden]=\"editEnabled\" style=\"margin: 20px 10px;\">\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442</span>\n                                <span class=\"view-value\">{{ person.name }}</span>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0414\u043E\u0433\u043E\u0432\u043E\u0440</span>\n                                <span class=\"view-value\"> #4242421365 \u043E\u0442 08.02.22</span>\n                            </div>\n                            <br>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                                <span class=\"view-value\"> {{ agent.name }} </span>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0442\u0443\u0441</span>\n                                <span class=\"view-value\"> \u0410\u043A\u0442\u0438\u0432\u0435\u043D</span>\n                            </div>\n                            <div class=\"view-group\">\n                                <span class=\"view-label\">\u0421\u0442\u0430\u0434\u0438\u044F</span>\n                                <span class=\"view-value\"> {{ request.state_code }} </span>\n                            </div>\n                            <br>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0417\u0430\u043F\u0440\u043E\u0441</span>\n                                <span class=\"view-value\"> {{ request.request }}</span>\n                            </div>\n                            <br>\n                            <div class=\"view-group\">\n                                <span class=\"view-label pull-left\">\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</span>\n                                <span class=\"view-value\" style=\"height: initial;\"> {{ request.info }} </span>\n                            </div>\n                        </div>\n\n                    <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n\n                        <div style=\"margin-bottom: 20px;\">\n                            <div class=\"view-group\">\n                                <span class=\"icon-tag\"> \u0422\u044D\u0433\u0438</span>\n                            </div>\n                            <ui-tag-block\n                                [value] = \"person.tag\"\n                                (valueChange) = \"person.tag = $event.value\"\n                            ></ui-tag-block>\n                        </div>\n\n                    </div>\n                </div>\n            </div>\n\n            <!-- \u041B\u0435\u0432\u0430\u044F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041A\u041E\u041D\u0415\u0426 -->\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n            <div class=\"work-area\" [style.width.px]=\"mapWidth\">\n                <ui-tabs\n                    [header_mode]=\"!paneHidden\"\n                >\n                    <ui-tab\n                        [title]=\"'\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F'\"\n                        (tabSelect)=\"offersSelected()\"\n                    >\n                        <!-- \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0434\u0443\u043D\u0441\u0442\u0432\u043E, \u0441\u0432-\u0432\u043E right \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0438\u0437 HubService -->\n                        <!-- TODO: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C -->\n                        <div  style=\"position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;\" [style.right]=\"_hubService.shared_var['nb_width']\">\n                            <div style=\"width: 330px; background-color: #fff;\">\n                                <div class=\"header\">\n                                    <input type=\"text\" style=\"width: 280px; margin-left: 10px; border: none;\"\n                                        (keydown)=\"offer_search_keydown($event)\"\n                                    >\n                                    <span class=\"icon-search\" style=\"margin-left: 10px; cursor: pointer;\"\n                                        (click)=\"offer_search()\"\n                                    ></span>\n                                </div>\n                                <div class=\"\" style=\"width: 100%; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                                    <digest-offer *ngFor=\"let offer of offers\"\n                                        [offer]=\"offer\"\n                                        [compact]=\"true\"\n                                    >\n                                    </digest-offer>\n                                </div>\n                            </div>\n                        </div>\n                        <google-map\n                            [latitude]=\"lat\"\n                            [longitude]=\"lon\"\n                            [zoom]=\"zoom\"\n                            [polygone_points]=\"searchArea\"\n                        >\n                            <div *ngFor=\"let r of offers\">\n                                <google-map-marker\n                                    *ngIf=\"r.location\"\n                                    (click)=\"markerClick(r)\"\n                                    [is_selected]=\"r.selected\"\n                                    [latitude]=\"parseFloat(r.location.lat)\"\n                                    [longitude]=\"parseFloat(r.location.lon)\"\n                                    [info_str]=\"getOfferDigest(r)\">\n                                    [icon_id]=\"1\"\n                                </google-map-marker>\n                            </div>\n                        </google-map>\n                    </ui-tab>\n                    <ui-tab [title]=\"'\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430'\"\n                        (tabSelect)=\"analysisSelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gred fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch1_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u0434\u0430\u0447</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gred\">\n                                        <span style=\"margin-left: 25px;\">\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C</span>\n                                    </div>\n                                    <div>\n                                        <ui-pie-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch1_data\"\n                                        >\n                                        </ui-pie-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-gorange fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439</span>\n                                    </div>\n                                    <div class=\"tile bg-gorange fg-white\" >\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u0440\u0443\u0431.</span>\n                                    </div>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gorange\">\n                                        <span style=\"margin-left: 25px;\">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</span>\n                                    </div>\n                                    <div>\n                                        <ui-bar-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch4_data\"\n                                        >\n                                        </ui-bar-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div class=\"tile bg-gblue fg-white\">\n                                    <div class=\"tile-content iconic\">\n                                        <span class=\"icon\">{{ ch2_data_v1 }}</span>\n                                    </div>\n                                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u044F\u0432\u043E\u043A</span>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-gblue\">\n                                        <span style=\"margin-left: 25px;\">\u0417\u0430\u044F\u0432\u043A\u0438</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch2_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"padding: 15px;\">\n                                <div style=\"float: left; display: flex; flex-direction: column;\">\n                                    <div class=\"tile bg-ggreen fg-white\" style=\"margin-bottom: 5px;\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v1 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u0423\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                    <div class=\"tile bg-ggreen fg-white\">\n                                        <div class=\"tile-content iconic\">\n                                            <span class=\"icon\">{{ ch3_data_v2 }}</span>\n                                        </div>\n                                        <span class=\"tile-label\">\u041D\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                                    </div>\n                                </div>\n                                <div class=\"chart-block\">\n                                    <div class=\"chart-header bg-ggreen\">\n                                        <span style=\"margin-left: 25px;\">\u041F\u043E\u043A\u0430\u0437\u044B</span>\n                                    </div>\n                                    <div>\n                                        <ui-line-chart\n                                            [title]=\"''\"\n                                            [data]=\"ch3_data\"\n                                        >\n                                        </ui-line-chart>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </ui-tab>\n                    <ui-tab\n                        [title]=\"'\u0418\u0441\u0442\u043E\u0440\u0438\u044F'\"\n                        (tabSelect)=\"historySelected()\"\n                    >\n                        <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"paneHeight\">\n                            <digest-history *ngFor=\"let record of historyRecs\"\n                                [historyRecord]=\"record\"\n                            >\n                            </digest-history>\n                        </div>\n                    </ui-tab>\n                </ui-tabs>\n            </div>\n            <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041A\u041E\u041D\u0415\u0426 -->\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService,
        config_service_1.ConfigService,
        offer_service_1.OfferService,
        request_service_1.RequestService,
        task_service_1.TaskService,
        analysis_service_1.AnalysisService,
        history_service_1.HistoryService,
        person_service_1.PersonService,
        user_service_1.UserService])
], TabRequestComponent);
exports.TabRequestComponent = TabRequestComponent;
//# sourceMappingURL=tab-request.component.js.map