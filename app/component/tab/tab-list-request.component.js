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
var TabListRequestComponent = (function () {
    function TabListRequestComponent(_configService, _requerstService) {
        var _this = this;
        this._configService = _configService;
        this._requerstService = _requerstService;
        this.requests = [];
        this.page = 0;
        this.perPage = 32;
        this._requerstService.list(this.page, this.perPage, null, "").then(function (requests) {
            _this.requests = requests;
        });
        setTimeout(function () {
            _this.tab.header = 'Заявки';
        });
    }
    TabListRequestComponent.prototype.scroll = function (e) {
        var _this = this;
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this.page++;
            this._requerstService.list(this.page, this.perPage, null, "").then(function (requests) {
                for (var i = 0; i < requests.length; i++) {
                    _this.requests.push(requests[i]);
                }
            });
        }
    };
    TabListRequestComponent.prototype.searchParamChanged = function () {
        var _this = this;
        this.page = 0;
        this._requerstService.list(this.page, this.perPage, null, this.searchQuery).then(function (requests) {
            _this.requests = requests;
            _this.page++;
        });
    };
    return TabListRequestComponent;
}());
TabListRequestComponent = __decorate([
    core_1.Component({
        selector: 'tab-list-request',
        inputs: ['tab'],
        styles: ["\n        .search-form {\n            width: 50%;\n            min-width: 800px;\n            margin: 0 auto;\n            margin-top: 10px;\n            background: #fff;\n            z-index: 1;\n        }\n    \n        .tool-box {\n            height: 30px;\n            margin: 0 12px;\n        }\n    \n        .search-box {\n            position: relative;\n            margin: 12px;\n            margin-bottom: 8px;\n        }\n    \n        .request-list-wrapper {\n            padding-top: 25px;\n            max-width: 1200px;\n            margin: 0 auto;\n            height: 100%;\n            width: 100%;\n        }\n    \n        .scroll-wrapper {\n            height: calc(100% - 115px);\n            overflow-y: auto;\n        }\n    \n        .inline-select {\n            display: inline-block;\n            height: 20px;\n            padding: 0 15px;\n            font-size: 14px;\n            color: #666;\n        }\n    "],
        template: "\n        <div class=\"header-label-abs\">{{ tab.header }}</div>\n    \n        <div class=\"search-form\" [class.table-mode]=\"tableMode\">\n            <div class=\"search-box\">\n                <input type=\"text\" class=\"\" placeholder=\"\" style=\"height: 28px; width: 100%;\"\n                    [(ngModel)]=\"searchQuery\" (keyup)=\"searchParamChanged($event)\"\n                >\n                <span class=\"icon-search\" style=\"position: absolute; right: 12px; top: 7px;\"></span>\n            </div>\n            <div class=\"tool-box\">\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 0, label: '\u0412\u0441\u0435'},\n                            {value: 1, label: '\u041A\u0440\u0430\u0441\u043D\u044B\u0439', icon: 'icon-circle tag-red'},\n                            {value: 2, label: '\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439', icon: 'icon-circle tag-orange'},\n                            {value: 3, label: '\u0416\u0435\u043B\u0442\u044B\u0439', icon: 'icon-circle tag-yellow'},\n                            {value: 4, label: '\u0417\u0435\u043B\u0435\u043D\u044B\u0439', icon: 'icon-circle tag-green'},\n                            {value: 5, label: '\u0413\u043E\u043B\u0443\u0431\u043E\u0439', icon: 'icon-circle tag-blue'},\n                            {value: 6, label: '\u041B\u0438\u043B\u043E\u0432\u044B\u0439', icon: 'icon-circle tag-violet'},\n                            {value: 7, label: '\u0421\u0435\u0440\u044B\u0439', icon: 'icon-circle tag-gray'}\n                        ]\"\n                        [value]=\"0\"\n                        [config]=\"{icon: 'icon-tag', draw_arrow: true}\"\n                        >\n                    </ui-select>\n                </div>\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 1, label: '1 \u0434\u0435\u043D\u044C'},\n                            {value: 2, label: '3 \u0434\u043D\u044F'},\n                            {value: 3, label: '\u041D\u0435\u0434\u0435\u043B\u044F'},\n                            {value: 4, label: '2 \u043D\u0435\u0434\u0435\u043B\u0438'},\n                            {value: 5, label: '\u041C\u0435\u0441\u044F\u0446'},\n                            {value: 6, label: '3 \u043C\u0435\u0441\u044F\u0446\u0430'},\n                            {value: 7, label: '\u0412\u0441\u0435'}\n                        ]\"\n                        [value]=\"6\"\n                        [config]=\"{icon: 'icon-month', drawArrow: true}\"\n                    >\n                    </ui-select>\n                </div>\n            </div>\n        </div>\n        <div class=\"request-list-wrapper\">\n            <div class=\"scroll-wrapper\" (scroll)=\"scroll($event)\">    \n                <digest-request\n                    *ngFor=\"let r of requests\"\n                    [request]=\"r\"\n                >\n                </digest-request>\n        \n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, request_service_1.RequestService])
], TabListRequestComponent);
exports.TabListRequestComponent = TabListRequestComponent;
//# sourceMappingURL=tab-list-request.component.js.map