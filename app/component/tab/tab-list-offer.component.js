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
var offer_service_1 = require("../../service/offer.service");
var config_service_1 = require("../../service/config.service");
var offer_1 = require("../../class/offer");
var hub_service_1 = require("../../service/hub.service");
var user_service_1 = require("../../service/user.service");
var TabListOfferComponent = (function () {
    function TabListOfferComponent(_elem, _hubService, _offerService, _userService, _configService) {
        var _this = this;
        this._elem = _elem;
        this._hubService = _hubService;
        this._offerService = _offerService;
        this._userService = _userService;
        this._configService = _configService;
        this.tableMode = false;
        this.source = offer_service_1.OfferSource.LOCAL;
        this.searchQuery = "";
        this.searchArea = [];
        this.filter = {
            stateCode: 'all',
            agentId: 'all',
            tag: 'all',
            changeDate: 90,
            offerTypeCode: 'sale',
        };
        this.agentOpts = [{
                value: 'all',
                label: '-'
            }];
        this.stateCodeOptions = [
            { value: 'all', label: 'Все' },
            { value: 'raw', label: 'Не активен' },
            { value: 'active', label: 'Активен' },
            { value: 'work', label: 'В работе' },
            { value: 'suspended', label: 'Приостановлен' },
            { value: 'archive', label: 'Архив' }
        ];
        this.paneHidden = false;
        this.mapDrawAllowed = false;
        this.page = 0;
        this.perPage = 32;
        setTimeout(function () {
            _this.tab.header = 'Недвижимость';
        });
    }
    TabListOfferComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tab.refreshRq.subscribe(function (sender) {
            _this.listOffers();
        });
        this.filter.offerTypeCode = this.tab.args.offerTypeCode;
        this.list = this._elem.nativeElement.querySelector('.digest-list');
        this.page = 0;
        this.listOffers();
        this._userService.list("AGENT", null, "").subscribe(function (agents) {
            for (var i = 0; i < agents.length; i++) {
                var a = agents[i];
                _this.agentOpts.push({
                    value: '' + a.id,
                    label: a.name
                });
            }
        });
        var c = this._configService.getConfig();
        this.lat = c.map.lat;
        this.lon = c.map.lon;
        this.zoom = c.map.zoom;
        this.calcSize();
    };
    TabListOfferComponent.prototype.listOffers = function () {
        var _this = this;
        this._offerService.list(this.page, this.perPage, this.source, this.filter, this.searchQuery, this.searchArea).subscribe(function (data) {
            _this.offers = data;
        }, function (err) { return console.log(err); });
    };
    TabListOfferComponent.prototype.onResize = function (e) {
        this.calcSize();
    };
    TabListOfferComponent.prototype.toggleMode = function () {
        this.tableMode = !this.tableMode;
    };
    TabListOfferComponent.prototype.toggleDraw = function () {
        this.mapDrawAllowed = !this.mapDrawAllowed;
        if (!this.mapDrawAllowed) {
            this.page = 0;
            this.offers = [];
            this.searchArea = [];
            this.listOffers();
        }
    };
    TabListOfferComponent.prototype.finishDraw = function (e) {
        this.page = 0;
        this.offers = [];
        this.searchArea = e;
        this.listOffers();
    };
    TabListOfferComponent.prototype.calcSize = function () {
        if (this.paneHidden) {
            this.paneWidth = 0;
        }
        else {
            this.paneWidth = 420;
        }
        this.mapWidth = document.body.clientWidth - (30 * 2) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 31;
    };
    TabListOfferComponent.prototype.toggleLeftPane = function () {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    };
    TabListOfferComponent.prototype.select = function (o) {
        if (o.locationLat && o.locationLon) {
            this.lat = o.locationLat;
            this.lon = o.locationLon;
        }
    };
    TabListOfferComponent.prototype.scroll = function (e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
        }
    };
    TabListOfferComponent.prototype.searchParamChanged = function (e) {
        this.page = 0;
        this.listOffers();
    };
    TabListOfferComponent.prototype.markerClick = function (o) {
        console.log('markerClick');
        console.log(o);
        //r.selected = !r.selected;
        // scroll to object !?
        // let get dirty!
        //if (r.selected) {
        var e = this.list.querySelector('#r' + o.id);
        this.list.scrollTop = e.offsetTop - e.clientHeight;
        //}
    };
    TabListOfferComponent.prototype.addOffer = function () {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', { offer: new offer_1.Offer() });
    };
    TabListOfferComponent.prototype.toggleSource = function (s) {
        if (s == 'local') {
            this.source = offer_service_1.OfferSource.LOCAL;
        }
        else {
            this.source = offer_service_1.OfferSource.IMPORT;
        }
        this.listOffers();
    };
    return TabListOfferComponent;
}());
TabListOfferComponent = __decorate([
    core_1.Component({
        selector: 'tab-list-offer',
        inputs: ['tab'],
        styles: ["\n        .search-form {\n            position: absolute;\n            width: 45%;\n            margin-left: 27.5%;\n            margin-top: 10px;\n            background: #fff;\n            z-index: 1;\n            border: 1px solid #eee;\n        }\n\n        .search-form.table-mode {\n            border: 1px solid #fff;\n        }\n\n        .tool-box {\n            height: 30px;\n            margin: 0 12px;\n        }\n    \n        .search-box {\n            position: relative;\n            margin: 12px 12px 8px 12px;\n        }\n    \n        .offer-list {\n            position: relative;\n        }\n    \n        .digest-list {\n            overflow-x: scroll;\n        }\n    \n        .pane {\n            float: left;\n            width: 370px;\n            height: 100%;\n            border-right: 1px solid #ccc;\n        }\n    \n        .work-area {\n            float: left;\n            width: 77%;\n            height: 100%;\n        }\n    \n        .fixed-button {\n            position: fixed;\n            top: 0;\n            left: 0;\n        }\n    \n        .inline-select {\n            display: inline-block;\n            height: 20px;\n            padding: 0 15px;\n            font-size: 14px;\n            color: #666;\n        }\n        \n        .button {\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #3366cc;\n            color: #fff;\n            cursor: pointer;\n        }\n    "],
        template: "\n        <div class=\"search-form\" [class.table-mode]=\"tableMode\">\n            <div class=\"search-box\">\n                <input type=\"text\" class=\"\" placeholder=\"\" style=\"height: 28px; width: 100%;\" [(ngModel)]=\"searchQuery\"\n                       (keyup)=\"searchParamChanged($event)\">\n                <span class=\"icon-search\" style=\"position: absolute; right: 12px; top: 7px;\"></span>\n            </div>\n            <div class=\"tool-box\">\n        \n                <div class=\"pull-left\">\n                \n                    <div class=\"inline-select\" *ngIf=\"source == 1\">\n                        <ui-select class=\"view-value edit-value\"\n                            [options]=\"stateCodeOptions\"\n                            [value]=\"filter.state\"\n                            [config]=\"{icon: 'icon-square', drawArrow: true}\"\n                            (onChange)=\"filter.stateCode = $event.selected.value; searchParamChanged($event);\"\n                        >\n                        </ui-select>\n                    </div>\n                    <div class=\"inline-select\" *ngIf=\"source == 1\">\n                        <ui-select class=\"view-value edit-value\"\n                            [options]=\"agentOpts\"\n                            [value]=\"filter.agent\"\n                            [config]=\"{icon: 'icon-person', drawArrow: true}\"\n                            (onChange)=\"filter.agentId = $event.selected.value; searchParamChanged($event);\"\n                        >\n                        </ui-select>\n                    </div>\n                    <div class=\"inline-select\" *ngIf=\"source == 1\">\n                        <ui-select class=\"view-value edit-value\"\n                            [options]=\"[\n                                {value: 'all', label: '\u0412\u0441\u0435'},\n                                {value: '1', label: '\u041A\u0440\u0430\u0441\u043D\u044B\u0439', icon: 'icon-circle tag-red'},\n                                {value: '2', label: '\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439', icon: 'icon-circle tag-orange'},\n                                {value: '3', label: '\u0416\u0435\u043B\u0442\u044B\u0439', icon: 'icon-circle tag-yellow'},\n                                {value: '4', label: '\u0417\u0435\u043B\u0435\u043D\u044B\u0439', icon: 'icon-circle tag-green'},\n                                {value: '5', label: '\u0413\u043E\u043B\u0443\u0431\u043E\u0439', icon: 'icon-circle tag-blue'},\n                                {value: '6', label: '\u041B\u0438\u043B\u043E\u0432\u044B\u0439', icon: 'icon-circle tag-violet'},\n                                {value: '7', label: '\u0421\u0435\u0440\u044B\u0439', icon: 'icon-circle tag-gray'}\n                            ]\"\n                            [value]=\"filter.tag\"\n                            [config]=\"{icon: 'icon-tag', drawArrow: true}\"\n                            (onChange)=\"filter.tag = $event.selected.value; searchParamChanged($event);\"\n                        >\n                        </ui-select>\n                    </div>\n                    <div class=\"inline-select\">\n                        <ui-select class=\"view-value edit-value\"\n                            [options]=\"[\n                                {value: '1', label: '1 \u0434\u0435\u043D\u044C'},\n                                {value: '3', label: '3 \u0434\u043D\u044F'},\n                                {value: '7', label: '\u041D\u0435\u0434\u0435\u043B\u044F'},\n                                {value: '14', label: '2 \u043D\u0435\u0434\u0435\u043B\u0438'},\n                                {value: '30', label: '\u041C\u0435\u0441\u044F\u0446'},\n                                {value: '90', label: '3 \u043C\u0435\u0441\u044F\u0446\u0430'},\n                                {value: 'all', label: '\u0412\u0441\u0435'}\n                            ]\"\n                            [value]=\"filter.changeDate\"\n                            [config]=\"{icon: 'icon-month', drawArrow: true}\"\n                            (onChange)=\"filter.changeDate = $event.selected.value; searchParamChanged($event);\"\n                        >\n                        </ui-select>\n                    </div>\n                </div>\n                <div class=\"pull-right\">\n                    <a (click)=\"toggleDraw()\" [hidden]=\"tableMode\">\n                        <span\n                            [ngClass]=\"{'icon-cancel': mapDrawAllowed, 'icon-edit': !mapDrawAllowed}\"\n                        ></span>\n                    </a>\n                    <a (click)=\"toggleMode()\">\n                        <span\n                            [ngClass]=\"{'icon-globus': tableMode, 'icon-table': !tableMode}\"\n                        ></span>\n                    </a>\n                </div>\n            </div>\n        </div>\n        \n        <offer-table\n            [hidden]=\"!tableMode\"\n            [offers]=\"offers\"\n        >\n        </offer-table>\n        \n        <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n            <span [ngClass]=\"{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}\"></span>\n        </div>\n        \n        <div class=\"offer-list\"\n             [hidden]=\"tableMode\"\n             (window:resize)=\"onResize($event)\"\n        >\n            <div class=\"pane\" [hidden]=\"paneHidden\" [style.width.px]=\"paneWidth\">\n                <div class=\"header\">\n                \n                <!---------------------------------------------------------------------->\n                \n                    <div class=\"header-label\" style=\"float: left;\">\n                        {{ tab.header }}\n                    </div>\n                    <div class=\"two-way-switch\" style=\"float: right; display: flex;\">\n                        <div (click)=\"toggleSource('import')\">\u041E\u0431\u0449\u0430\u044F</div>&nbsp;\n                        <div (click)=\"toggleSource('local')\">\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0438</div>\n                    </div>\n                    \n                <!---------------------------------------------------------------------->\n                    \n                </div>\n                <div class=\"digest-list\"\n                     (scroll)=\"scroll($event)\"\n                     [style.height]=\"paneHeight\"\n                >\n                    <div class=\"button\" (click)=\"addOffer()\">\n                        \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435\n                    </div>                    \n                    <digest-offer *ngFor=\"let offer of offers\"\n                                  [offer]=\"offer\"\n                                  (click)=\"select(offer)\"\n                    >\n                    </digest-offer>\n                </div>\n            </div>\n            <div class=\"work-area\" [style.width.px]=\"mapWidth\">\n                <google-map\n                    [latitude]=\"lat\"\n                    [longitude]=\"lon\"\n                    [zoom]=\"zoom\"\n                    [objects]=\"offers\"\n                    [draw_allowed]=\"mapDrawAllowed\"\n                    (drawFinished)=\"finishDraw($event)\"\n                >\n                </google-map>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, hub_service_1.HubService, offer_service_1.OfferService, user_service_1.UserService, config_service_1.ConfigService])
], TabListOfferComponent);
exports.TabListOfferComponent = TabListOfferComponent;
//# sourceMappingURL=tab-list-offer.component.js.map