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
var organisation_service_1 = require("../../service/organisation.service");
var organisation_1 = require("../../class/organisation");
var TabListOrganisationComponent = (function () {
    function TabListOrganisationComponent(_configService, _hubService, _organisationService) {
        var _this = this;
        this._configService = _configService;
        this._hubService = _hubService;
        this._organisationService = _organisationService;
        this.searchQuery = "";
        setTimeout(function () {
            _this.tab.header = 'Контрагенты';
        });
    }
    TabListOrganisationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tab.refreshRq.subscribe(function (sender) {
            _this.listOrganisation();
        });
        this.listOrganisation();
    };
    TabListOrganisationComponent.prototype.listOrganisation = function () {
        var _this = this;
        this._organisationService.list("").subscribe(function (data) {
            _this.organisations = data;
        }, function (err) { return console.log(err); });
    };
    TabListOrganisationComponent.prototype.addOrganisation = function () {
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('organisation', { organisation: new organisation_1.Organisation() });
    };
    TabListOrganisationComponent.prototype.searchParamChanged = function (event) {
        this.listOrganisation();
    };
    TabListOrganisationComponent.prototype.scroll = function (e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
        }
    };
    return TabListOrganisationComponent;
}());
TabListOrganisationComponent = __decorate([
    core_1.Component({
        selector: 'tab-list-organisation',
        inputs: ['tab'],
        styles: ["\n        .search-form {\n            width: 50%;\n            min-width: 800px;\n            margin: 0 auto;\n            margin-top: 10px;\n            background: #fff;\n            z-index: 1;\n        }\n    \n        .tool-box {\n            height: 30px;\n            margin: 0 12px;\n        }\n    \n        .search-box {\n            position: relative;\n            margin: 12px;\n            margin-bottom: 8px;\n        }\n    \n        .organisation-list-wrapper {\n            padding-top: 25px;\n            max-width: 1200px;\n            margin: 0 auto;\n            height: 100%;\n            width: 100%;\n        }\n    \n        .scroll-wrapper {\n            height: calc(100% - 115px);\n            overflow-y: auto;\n        }\n    \n        .inline-select {\n            display: inline-block;\n            height: 20px;\n            padding: 0 15px;\n            font-size: 14px;\n            color: #666;\n        }\n    \n        .button {\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #3366cc;\n            color: #fff;\n            cursor: pointer;\n        }\n    "],
        template: "\n        <div class=\"header-label-abs\">{{ tab.header }}</div>\n    \n        <div class=\"search-form\" [class.table-mode]=\"tableMode\">\n            <div class=\"search-box\">\n                <input type=\"text\" class=\"\" placeholder=\"\" style=\"height: 28px; width: 100%;\"\n                    [(ngModel)]=\"searchQuery\" (keyup)=\"searchParamChanged($event)\"\n                >\n                <span class=\"icon-search\" style=\"position: absolute; right: 12px; top: 7px;\"></span>\n            </div>\n            <div class=\"tool-box\">\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 0, label: '\u0412\u0441\u0435'},\n                            {value: 1, label: '\u041A\u0440\u0430\u0441\u043D\u044B\u0439', icon: 'icon-circle tag-red'},\n                            {value: 2, label: '\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439', icon: 'icon-circle tag-orange'},\n                            {value: 3, label: '\u0416\u0435\u043B\u0442\u044B\u0439', icon: 'icon-circle tag-yellow'},\n                            {value: 4, label: '\u0417\u0435\u043B\u0435\u043D\u044B\u0439', icon: 'icon-circle tag-green'},\n                            {value: 5, label: '\u0413\u043E\u043B\u0443\u0431\u043E\u0439', icon: 'icon-circle tag-blue'},\n                            {value: 6, label: '\u041B\u0438\u043B\u043E\u0432\u044B\u0439', icon: 'icon-circle tag-violet'},\n                            {value: 7, label: '\u0421\u0435\u0440\u044B\u0439', icon: 'icon-circle tag-gray'}\n                        ]\"\n                        [value]=\"0\"\n                        [config]=\"{icon: 'icon-tag', drawArrow: true}\"\n                    >\n                    </ui-select>\n                </div>\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 1, label: '1 \u0434\u0435\u043D\u044C'},\n                            {value: 2, label: '3 \u0434\u043D\u044F'},\n                            {value: 3, label: '\u041D\u0435\u0434\u0435\u043B\u044F'},\n                            {value: 4, label: '2 \u043D\u0435\u0434\u0435\u043B\u0438'},\n                            {value: 5, label: '\u041C\u0435\u0441\u044F\u0446'},\n                            {value: 6, label: '3 \u043C\u0435\u0441\u044F\u0446\u0430'},\n                            {value: 7, label: '\u0412\u0441\u0435'}\n                        ]\"\n                        [value]=\"6\"\n                        [config]=\"{icon: 'icon-month', drawArrow: true}\"\n                    >\n                    </ui-select>\n                </div>\n            </div>\n        </div>\n        <div class=\"organisation-list-wrapper\">\n            <div class=\"scroll-wrapper\">\n                <div class=\"button\"\n                    (click)=\"addOrganisation()\"\n                >\n                \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044E\n                </div>\n                <digest-organisation\n                    *ngFor=\"let o of organisations\"\n                    [organisation]=\"o\"\n                >\n                </digest-organisation>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, hub_service_1.HubService, organisation_service_1.OrganisationService])
], TabListOrganisationComponent);
exports.TabListOrganisationComponent = TabListOrganisationComponent;
//# sourceMappingURL=tab-list-organisation.component.js.map