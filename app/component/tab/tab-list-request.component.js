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
var config_service_1 = require("../../service/config.service");
var request_service_1 = require("../../service/request.service");
var request_1 = require("../../class/request");
var hub_service_1 = require("../../service/hub.service");
var TabListRequestComponent = (function () {
    function TabListRequestComponent(_configService, _hubService, _requerstService) {
        var _this = this;
        this._configService = _configService;
        this._hubService = _hubService;
        this._requerstService = _requerstService;
        this.isImport = false;
        this.searchQuery = "";
        this.offerTypeCode = 'sale';
        this.page = 0;
        this.perPage = 32;
        setTimeout(function () {
            _this.tab.header = 'Заявки';
        });
    }
    TabListRequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tab.refreshRq.subscribe(function (sender) {
            _this.listRequests();
        });
        this.listRequests();
    };
    TabListRequestComponent.prototype.listRequests = function () {
        var _this = this;
        this._requerstService.list(this.page, this.perPage, this.offerTypeCode, "all", null, null, this.searchQuery).subscribe(function (data) {
            _this.requests = data;
        }, function (err) { return console.log(err); });
    };
    TabListRequestComponent.prototype.addRequest = function () {
        var tab_sys = this._hubService.getProperty('tab_sys');
        var r = new request_1.Request();
        r.offerTypeCode = this.offerTypeCode;
        tab_sys.addTab('request', { request: r });
    };
    TabListRequestComponent.prototype.searchParamChanged = function () {
        this.page = 0;
        this.listRequests();
    };
    TabListRequestComponent.prototype.scroll = function (e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this.listRequests();
        }
    };
    TabListRequestComponent.prototype.getImage = function (s) {
        if (s == 'local') {
            if (this.isImport)
                return "url(res/base.png)";
            else
                return "url(res/base_color.png)";
        }
        else {
            if (this.isImport)
                return "url(res/base_plus_color.png)";
            else
                return "url(res/base_plus.png)";
        }
    };
    return TabListRequestComponent;
}());
TabListRequestComponent = __decorate([
    core_1.Component({
        selector: 'tab-list-request',
        inputs: ['tab'],
        styles: ["\n        .search-form {\n            background: #fff;\n            z-index: 1;\n            width: 38%;\n            margin-left: 610;\n            margin-top: 27px;\n        }\n\n        .tool-box {\n            height: 30px;\n            margin: 0 12px;\n        }\n\n        .round_menu{\n            width: 170px;\n            height: 50px;\n            position: absolute;\n            left: 450;\n            top: 15px;\n            text-align: center;\n            z-index: 10;\n            line-height: 50px;\n            display: flex;\n            justify-content: space-around;\n        }\n\n        .search-box {\n            position: relative;\n            margin: 12px;\n            margin-bottom: 8px;\n        }\n\n        .request-list-wrapper {\n            padding-top: 25px;\n            max-width: 1200px;\n            margin: 0 auto;\n            height: 100%;\n            width: 100%;\n        }\n\n        .scroll-wrapper {\n            height: calc(100% - 115px);\n            overflow-y: auto;\n        }\n\n        .inline-select {\n            display: inline-block;\n            height: 20px;\n            padding: 0 15px;\n            font-size: 14px;\n            color: #666;\n        }\n\n        .button {\n            height: 50px;\n            width: 50px;\n            border-radius: 40px;\n            cursor: pointer;\n            font-size: 11px;\n            line-height: 120px;\n            background-size: cover;\n            color: #6b6c6d;\n        }\n\n        .plus:hover{\n            background-image: url(res/plus_color.png);\n        }\n\n        .plus {\n            background-image: url(res/Plus.png);\n        }\n        .import:hover{\n            background-image: url(res/base_plus_color.png) !important;\n        }\n\n        .import {\n            background-image: url(res/base_plus.png);\n        }\n        .local:hover{\n            background-image: url(res/base_color.png) !important;\n        }\n\n        .local {\n            background-image: url(res/base.png);\n        }\n    "],
        template: "\n        <div class=\"header-label-abs\">{{ tab.header }}</div>\n        <div class = \"round_menu\">\n            <div class=\"button plus\"  (click) =\"addRequest()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</div>\n            <div (click)=\"toggleSource('import')\" [style.background-image]=\"getImage('import')\" class=\"button import\" style=\"\">\u041E\u0431\u0449\u0430\u044F</div>\n            <div (click)=\"toggleSource('local')\"  class=\"button local\"  [style.background-image1]=\"getImage('local')\">\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F</div>\n        </div>\n        <div class=\"search-form\" [class.table-mode]=\"tableMode\">\n            <div class=\"search-box\">\n                <input type=\"text\" class=\"\" placeholder=\"\" style=\"height: 28px; width: 100%;\n                background-color: rgb(247, 247, 247); border: 1px solid rgba(204, 204, 204, 0.47);\"\n                    [(ngModel)]=\"searchQuery\" (keyup)=\"searchParamChanged($event)\"\n                >\n                <span class=\"icon-search\" style=\"position: absolute; right: 12px; top: 7px;\"></span>\n            </div>\n            <div class=\"tool-box\">\n\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 'sale', label: '\u041F\u0440\u043E\u0434\u0430\u0436\u0430'},\n                            {value: 'rent', label: '\u0410\u0440\u0435\u043D\u0434\u0430'}\n                        ]\"\n                        [value]=\"sale\"\n                        [config]=\"{icon: 'icon-', draw_arrow: true}\"\n                        (onChange)=\"offerTypeCode = $event.selected.value; searchParamChanged();\"\n                        >\n                    </ui-select>\n                </div>\n\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 0, label: '\u0412\u0441\u0435'},\n                            {value: 1, label: '\u041A\u0440\u0430\u0441\u043D\u044B\u0439', icon: 'icon-circle tag-red'},\n                            {value: 2, label: '\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439', icon: 'icon-circle tag-orange'},\n                            {value: 3, label: '\u0416\u0435\u043B\u0442\u044B\u0439', icon: 'icon-circle tag-yellow'},\n                            {value: 4, label: '\u0417\u0435\u043B\u0435\u043D\u044B\u0439', icon: 'icon-circle tag-green'},\n                            {value: 5, label: '\u0413\u043E\u043B\u0443\u0431\u043E\u0439', icon: 'icon-circle tag-blue'},\n                            {value: 6, label: '\u041B\u0438\u043B\u043E\u0432\u044B\u0439', icon: 'icon-circle tag-violet'},\n                            {value: 7, label: '\u0421\u0435\u0440\u044B\u0439', icon: 'icon-circle tag-gray'}\n                        ]\"\n                        [value]=\"0\"\n                        [config]=\"{icon: 'icon-tag', draw_arrow: true}\"\n                        (onChange)=\"searchParamChanged();\"\n                        >\n                    </ui-select>\n                </div>\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 1, label: '1 \u0434\u0435\u043D\u044C'},\n                            {value: 2, label: '3 \u0434\u043D\u044F'},\n                            {value: 3, label: '\u041D\u0435\u0434\u0435\u043B\u044F'},\n                            {value: 4, label: '2 \u043D\u0435\u0434\u0435\u043B\u0438'},\n                            {value: 5, label: '\u041C\u0435\u0441\u044F\u0446'},\n                            {value: 6, label: '3 \u043C\u0435\u0441\u044F\u0446\u0430'},\n                            {value: 7, label: '\u0412\u0441\u0435'}\n                        ]\"\n                        [value]=\"6\"\n                        [config]=\"{icon: 'icon-month', drawArrow: true}\"\n                        (onChange)=\"searchParamChanged();\"\n                    >\n                    </ui-select>\n                </div>\n            </div>\n        </div>\n        <div class=\"request-list-wrapper\">\n            <div class=\"scroll-wrapper\" (scroll)=\"scroll($event)\">\n                <digest-request\n                    *ngFor=\"let r of requests\"\n                    [request]=\"r\"\n                >\n                </digest-request>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, hub_service_1.HubService, request_service_1.RequestService])
], TabListRequestComponent);
exports.TabListRequestComponent = TabListRequestComponent;
//# sourceMappingURL=tab-list-request.component.js.map