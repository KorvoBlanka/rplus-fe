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
        this.isImport = false;
        this.superiorOpts = [{
                value: 0,
                label: '-'
            }];
        setTimeout(function () { _this.tab.header = 'Пользователи'; });
    }
    TabListUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tab.refreshRq.subscribe(function (sender) {
            _this.listUsers();
        });
        this.listUsers();
        this._userService.list("MANAGER", null, "").subscribe(function (managers) {
            for (var _i = 0, managers_1 = managers; _i < managers_1.length; _i++) {
                var m = managers_1[_i];
                _this.superiorOpts.push({
                    value: m.id,
                    label: m.name
                });
            }
        });
    };
    TabListUserComponent.prototype.listUsers = function () {
        var _this = this;
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
    TabListUserComponent.prototype.getImage = function (s) {
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
    return TabListUserComponent;
}());
TabListUserComponent = __decorate([
    core_1.Component({
        selector: 'tab-list-user',
        inputs: ['tab'],
        styles: ["\n        .underline{\n            margin: 0;\n            border: 2px solid;\n            margin-top: 16px;\n            color: #0b9700;\n        }\n\n        .search-form {\n            background: #fff;\n            z-index: 1;\n            width: 38%;\n            margin-left: 655;\n            margin-top: 27px;\n        }\n\n        .tool-box {\n            height: 30px;\n            margin: 0 12px;\n        }\n\n        .round_menu{\n            width: 210;\n            height: 50px;\n            position: absolute;\n            left: 445px;\n            top: 15px;\n            text-align: center;\n            z-index: 10;\n            line-height: 50px;\n            display: flex;\n            justify-content: space-around;\n        }\n\n        .search-box {\n            position: relative;\n            margin: 12px 12px 8px 12px;\n        }\n\n        .user-list-wrapper {\n            padding-top: 25px;\n            max-width: 1200px;\n            margin: 0 auto;\n            height: 100%;\n            width: 100%;\n        }\n\n        .scroll-wrapper {\n            height: calc(100% - 115px);\n            overflow-y: auto;\n        }\n\n        .inline-select {\n            display: inline-block;\n            height: 20px;\n            padding: 0 15px;\n            font-size: 14px;\n            color: #666;\n        }\n\n        .button {\n            height: 50px;\n            width: 50px;\n            border-radius: 40px;\n            cursor: pointer;\n            font-size: 11px;\n            line-height: 120px;\n            background-size: cover;\n            color: #6b6c6d;\n        }\n\n        .plus:hover{\n            background-image: url(res/plus_color.png);\n        }\n\n        .plus {\n            background-image: url(res/Plus.png);\n        }\n        .import:hover{\n            background-image: url(res/base_plus_color.png) !important;\n        }\n\n        .import {\n            background-image: url(res/base_plus.png);\n        }\n        .local:hover{\n            background-image: url(res/base_color.png) !important;\n        }\n\n        .local {\n            background-image: url(res/base.png);\n        }\n    "],
        template: "\n        <div class=\"header-label-abs\">{{ tab.header }}</div>\n        <div class = \"round_menu\">\n            <div class=\"button plus\"  (click) =\"addUser()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</div>\n            <div (click)=\"toggleSource('import')\" [style.background-image]=\"getImage('import')\" class=\"button import\" style=\"\">\u041E\u0431\u0449\u0430\u044F</div>\n            <div (click)=\"toggleSource('local')\"  class=\"button local\"  [style.background-image1]=\"getImage('local')\">\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F</div>\n        </div>\n        <div class=\"search-form\" [class.table-mode]=\"tableMode\">\n            <div class=\"search-box\">\n                <input type=\"text\" class=\"\" placeholder=\"\" style=\"height: 28px; width: 100%;\n                background-color: rgb(247, 247, 247); border: 1px solid rgba(204, 204, 204, 0.47);\"\n                    [(ngModel)]=\"searchQuery\" (keyup)=\"searchParamChanged($event)\"\n                >\n                <span class=\"icon-search\" style=\"position: absolute; right: 12px; top: 7px;\"></span>\n            </div>\n            <div class=\"tool-box\">\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"superiorOpts\"\n                        [value]=\"0\"\n                        [config]=\"{icon: 'icon-person', drawArrow: true}\"\n                        (onChange)=\"superiorId = $event.selected.value; searchParamChanged()\"\n                    >\n                    </ui-select>\n                </div>\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: '', label: '\u0412\u0441\u0435'},\n                            {value: 'AGENT', label: '\u0410\u0433\u0435\u043D\u0442'},\n                            {value: 'MANAGER', label: '\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440'},\n                            {value: 'TOP', label: '\u0422\u043E\u043F'}\n                        ]\"\n                        [value]=\"''\"\n                        [config]=\"{icon: 'icon-person', drawArrow: true}\"\n                        (onChange)=\"role = $event.selected.value; searchParamChanged()\"\n                    >\n                    </ui-select>\n                </div>\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 0, label: '\u0412\u0441\u0435'},\n                            {value: 1, label: '\u041A\u0440\u0430\u0441\u043D\u044B\u0439', icon: 'icon-circle tag-red'},\n                            {value: 2, label: '\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439', icon: 'icon-circle tag-orange'},\n                            {value: 3, label: '\u0416\u0435\u043B\u0442\u044B\u0439', icon: 'icon-circle tag-yellow'},\n                            {value: 4, label: '\u0417\u0435\u043B\u0435\u043D\u044B\u0439', icon: 'icon-circle tag-green'},\n                            {value: 5, label: '\u0413\u043E\u043B\u0443\u0431\u043E\u0439', icon: 'icon-circle tag-blue'},\n                            {value: 6, label: '\u041B\u0438\u043B\u043E\u0432\u044B\u0439', icon: 'icon-circle tag-violet'},\n                            {value: 7, label: '\u0421\u0435\u0440\u044B\u0439', icon: 'icon-circle tag-gray'}\n                        ]\"\n                        [value]=\"0\"\n                        [config]=\"{icon: 'icon-tag', drawArrow: true}\"\n                    >\n                    </ui-select>\n                </div>\n            </div>\n        </div>\n        <hr class='underline'>\n         <div class=\"user-list-wrapper\">\n            <div class=\"scroll-wrapper\">\n\n                <digest-user *ngFor=\"let u of users\"\n                    [user]=\"u\"\n                >\n                </digest-user>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, hub_service_1.HubService, user_service_1.UserService])
], TabListUserComponent);
exports.TabListUserComponent = TabListUserComponent;
//# sourceMappingURL=tab-list-user.component.js.map