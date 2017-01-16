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
var user_service_1 = require("../../service/user.service");
var user_1 = require("../../class/user");
var TabListUserComponent = (function () {
    function TabListUserComponent(_configService, _hubService, _userService) {
        var _this = this;
        this._configService = _configService;
        this._hubService = _hubService;
        this._userService = _userService;
        this.superiorOpts = [{
                value: 0,
                label: '-'
            }];
        setTimeout(function () { _this.tab.header = 'Пользователи'; });
    }
    TabListUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._userService.list("MANAGER", null, "").subscribe(function (managers) {
            for (var _i = 0, managers_1 = managers; _i < managers_1.length; _i++) {
                var m = managers_1[_i];
                console.log(m);
                _this.superiorOpts.push({
                    value: m.id,
                    label: m.name
                });
            }
        });
        this._userService.list(this.role, this.superiorId, this.searchQuery).subscribe(function (data) {
            _this.users = data;
        }, function (err) { return console.log(err); });
    };
    TabListUserComponent.prototype.addUser = function () {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('user', { user: new user_1.User() });
    };
    TabListUserComponent.prototype.searchParamChanged = function () {
        var _this = this;
        this._userService.list(this.role, this.superiorId, this.searchQuery).subscribe(function (users) {
            _this.users = users;
        });
    };
    return TabListUserComponent;
}());
TabListUserComponent = __decorate([
    core_1.Component({
        selector: 'tab-list-user',
        inputs: ['tab'],
        styles: ["\n        .search-form {\n            width: 50%;\n            min-width: 800px;\n            margin: 0 auto;\n            margin-top: 10px;\n            background: #fff;\n            z-index: 1;\n        }\n    \n        .tool-box {\n            height: 30px;\n            margin: 0 12px;\n        }\n    \n        .search-box {\n            position: relative;\n            margin: 12px 12px 8px 12px;\n        }\n    \n        .person-list-wrapper {\n            padding-top: 25px;\n            max-width: 1200px;\n            margin: 0 auto;\n            height: 100%;\n            width: 100%;\n        }\n    \n        .scroll-wrapper {\n            height: calc(100% - 115px);\n            overflow-y: auto;\n        }\n    \n        .inline-select {\n            display: inline-block;\n            height: 20px;\n            padding: 0 15px;\n            font-size: 14px;\n            color: #666;\n        }\n    \n        .button {\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #3366cc;\n            color: #fff;\n            cursor: pointer;\n        }\n    "],
        template: "\n\n        <div class=\"header-label-abs\">{{ tab.header }}</div>\n        <div class=\"search-form\" [class.table-mode]=\"tableMode\">\n            <div class=\"search-box\">\n                <input type=\"text\" class=\"\" placeholder=\"\" style=\"height: 28px; width: 100%;\"\n                    [(ngModel)]=\"searchQuery\" (keyup)=\"searchParamChanged($event)\"\n                >\n                <span class=\"icon-search\" style=\"position: absolute; right: 12px; top: 7px;\"></span>\n            </div>\n            <div class=\"tool-box\">\n                <div class=\"pull-left\">\n                    <a (click)=\"addUser()\">\n                        <span class=\"icon-add\"></span>\n                    </a>\n                </div>\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"superiorOpts\"\n                        [value]=\"0\"\n                        [config]=\"{icon: 'icon-person', drawArrow: true}\"\n                        (onChange)=\"superiorId = $event.selected.value; searchParamChanged()\"\n                    >\n                    </ui-select>\n                </div>\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: '', label: '\u0412\u0441\u0435'},\n                            {value: 'AGENT', label: '\u0410\u0433\u0435\u043D\u0442'},\n                            {value: 'MANAGER', label: '\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440'},\n                            {value: 'TOP', label: '\u0422\u043E\u043F'}\n                        ]\"\n                        [value]=\"''\"\n                        [config]=\"{icon: 'icon-person', drawArrow: true}\"\n                        (onChange)=\"role = $event.selected.value; searchParamChanged()\"\n                    >\n                    </ui-select>\n                </div>\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 0, label: '\u0412\u0441\u0435'},\n                            {value: 1, label: '\u041A\u0440\u0430\u0441\u043D\u044B\u0439', icon: 'icon-circle tag-red'},\n                            {value: 2, label: '\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439', icon: 'icon-circle tag-orange'},\n                            {value: 3, label: '\u0416\u0435\u043B\u0442\u044B\u0439', icon: 'icon-circle tag-yellow'},\n                            {value: 4, label: '\u0417\u0435\u043B\u0435\u043D\u044B\u0439', icon: 'icon-circle tag-green'},\n                            {value: 5, label: '\u0413\u043E\u043B\u0443\u0431\u043E\u0439', icon: 'icon-circle tag-blue'},\n                            {value: 6, label: '\u041B\u0438\u043B\u043E\u0432\u044B\u0439', icon: 'icon-circle tag-violet'},\n                            {value: 7, label: '\u0421\u0435\u0440\u044B\u0439', icon: 'icon-circle tag-gray'}\n                        ]\"\n                        [value]=\"0\"\n                        [config]=\"{icon: 'icon-tag', drawArrow: true}\"\n                    >\n                    </ui-select>\n                </div>\n            </div>\n        </div>\n        <div class=\"user-list-wrapper\">\n            <digest-user *ngFor=\"let u of users\"\n                [user]=\"u\"\n            >\n            </digest-user>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, hub_service_1.HubService, user_service_1.UserService])
], TabListUserComponent);
exports.TabListUserComponent = TabListUserComponent;
//# sourceMappingURL=tab-list-user.component.js.map