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
var person_service_1 = require("../../service/person.service");
var person_1 = require("../../class/person");
var user_service_1 = require("../../service/user.service");
var TabListPersonComponent = (function () {
    function TabListPersonComponent(_configService, _hubService, _personService, _userService) {
        var _this = this;
        this._configService = _configService;
        this._hubService = _hubService;
        this._personService = _personService;
        this._userService = _userService;
        this.searchQuery = "";
        this.agentOpts = [{
                value: 0,
                label: '-'
            }];
        this.iconSource = ["url(res/base_plus.png)", "url(res/base_color.png)"];
        this.isImport = true;
        setTimeout(function () {
            _this.tab.header = 'Контакты';
        });
    }
    TabListPersonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tab.refreshRq.subscribe(function (sender) {
            _this.listPersons();
        });
        this.listPersons();
        this._userService.list(null, null, "").subscribe(function (agents) {
            for (var i = 0; i < agents.length; i++) {
                var a = agents[i];
                _this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
    };
    TabListPersonComponent.prototype.listPersons = function () {
        var _this = this;
        this._personService.list(null, null, "").subscribe(function (data) {
            _this.persons = data;
        }, function (err) { return console.log(err); });
    };
    TabListPersonComponent.prototype.addPerson = function () {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('person', { person: new person_1.Person() });
    };
    TabListPersonComponent.prototype.searchParamChanged = function () {
        this.listPersons();
    };
    TabListPersonComponent.prototype.toggleSource = function (s) {
        if (s == 'local') {
            this.iconSource[0] = "url(res/base_plus.png)";
            this.iconSource[1] = "url(res/base_color.png)";
        }
        else {
            this.iconSource[0] = "url(res/base_plus_color.png)";
            this.iconSource[1] = "url(res/base.png)";
        }
    };
    TabListPersonComponent.prototype.scroll = function (e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this.listPersons();
        }
    };
    TabListPersonComponent.prototype.getImage = function (s) {
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
    return TabListPersonComponent;
}());
TabListPersonComponent = __decorate([
    core_1.Component({
        selector: 'tab-list-person',
        inputs: ['tab'],
        styles: ["\n        .underline{\n            margin: 0;\n            border: 2px solid;\n            margin-top: 16px;\n            color: rgb(61, 155, 233);\n        }\n        .search-form {\n            background: #fff;\n            z-index: 1;\n            width: 38%;\n            margin-left: 610px;\n            margin-top: 27px;\n        }\n\n        .tool-box {\n            height: 30px;\n            margin: 0 12px;\n        }\n\n        .round_menu{\n            width: 170;\n            height: 50px;\n            position: absolute;\n            left: 450px;\n            top: 15px;\n            text-align: center;\n            z-index: 10;\n            line-height: 50px;\n            display: flex;\n            justify-content: space-around;\n        }\n\n        .search-box {\n            position: relative;\n            margin: 12px 12px 8px 12px;\n        }\n\n        .person-list-wrapper {\n            padding-top: 25px;\n            max-width: 1200px;\n            margin: 0 auto;\n            height: 100%;\n            width: 100%;\n        }\n\n        .scroll-wrapper {\n            height: calc(100% - 115px);\n            overflow-y: auto;\n        }\n\n        .inline-select {\n            display: inline-block;\n            height: 20px;\n            padding: 0 15px;\n            font-size: 14px;\n            color: #666;\n        }\n\n        .button {\n            height: 50px;\n            width: 50px;\n            border-radius: 40px;\n            cursor: pointer;\n            font-size: 11px;\n            line-height: 120px;\n            background-size: cover;\n            color: #6b6c6d;\n        }\n\n        .plus:hover{\n            background-image: url(res/plus_color.png);\n        }\n\n        .plus {\n            background-image: url(res/Plus.png);\n        }\n        .import:hover{\n            background-image: url(res/base_plus_color.png) !important;\n        }\n\n        .local:hover{\n            background-image: url(res/base_color.png) !important;\n        }\n\n    "],
        template: "\n        <div class=\"header-label-abs\">{{ tab.header }}</div>\n        <div class = \"round_menu\">\n            <div class=\"button plus\"  (click)=\"addPerson()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</div>\n            <div (click)=\"toggleSource('import')\" class=\"button import\" [style.background-image]=\"iconSource[0]\">\u041E\u0431\u0449\u0430\u044F</div>\n            <div (click)=\"toggleSource('local')\"  class=\"button local\"  [style.background-image]=\"iconSource[1]\">\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F</div>\n        </div>\n        <div class=\"search-form\" [class.table-mode]=\"tableMode\">\n            <div class=\"search-box\">\n                <input type=\"text\" class=\"\" placeholder=\"\" style=\"height: 28px; width: 100%;\n                background-color: rgb(247, 247, 247); border: 1px solid rgba(204, 204, 204, 0.47);\"\n                    [(ngModel)]=\"searchQuery\" (keyup)=\"searchParamChanged($event)\"\n                >\n                <span class=\"icon-search\" style=\"position: absolute; right: 12px; top: 7px;\"></span>\n            </div>\n            <div class=\"tool-box\">\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"agentOpts\"\n                        [value]=\"0\"\n                        [config]=\"{icon: 'icon-person', drawArrow: true}\"\n                        (onChange)=\"userId = $event.selected.value; searchParamChanged()\"\n                    >\n                    </ui-select>\n                </div>\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 0, label: '\u0412\u0441\u0435'},\n                            {value: 1, label: '\u041A\u0440\u0430\u0441\u043D\u044B\u0439', icon: 'icon-circle tag-red'},\n                            {value: 2, label: '\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439', icon: 'icon-circle tag-orange'},\n                            {value: 3, label: '\u0416\u0435\u043B\u0442\u044B\u0439', icon: 'icon-circle tag-yellow'},\n                            {value: 4, label: '\u0417\u0435\u043B\u0435\u043D\u044B\u0439', icon: 'icon-circle tag-green'},\n                            {value: 5, label: '\u0413\u043E\u043B\u0443\u0431\u043E\u0439', icon: 'icon-circle tag-blue'},\n                            {value: 6, label: '\u041B\u0438\u043B\u043E\u0432\u044B\u0439', icon: 'icon-circle tag-violet'},\n                            {value: 7, label: '\u0421\u0435\u0440\u044B\u0439', icon: 'icon-circle tag-gray'}\n                        ]\"\n                        [value]=\"0\"\n                        [config]=\"{icon: 'icon-tag', drawArrow: true}\"\n                    >\n                    </ui-select>\n                </div>\n                <div class=\"inline-select\">\n                    <ui-select class=\"view-value edit-value\"\n                        [options] = \"[\n                            {value: 1, label: '1 \u0434\u0435\u043D\u044C'},\n                            {value: 2, label: '3 \u0434\u043D\u044F'},\n                            {value: 3, label: '\u041D\u0435\u0434\u0435\u043B\u044F'},\n                            {value: 4, label: '2 \u043D\u0435\u0434\u0435\u043B\u0438'},\n                            {value: 5, label: '\u041C\u0435\u0441\u044F\u0446'},\n                            {value: 6, label: '3 \u043C\u0435\u0441\u044F\u0446\u0430'},\n                            {value: 7, label: '\u0412\u0441\u0435'}\n                        ]\"\n                        [value]=\"6\"\n                        [config]=\"{icon: 'icon-month', drawArrow: true}\"\n                    >\n                    </ui-select>\n                </div>\n            </div>\n        </div>\n        <hr class='underline'>\n        <div class=\"person-list-wrapper\">\n            <div class=\"scroll-wrapper\">\n                <digest-person *ngFor=\"let p of persons\"\n                    [person]=\"p\"\n                >\n                </digest-person>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService, hub_service_1.HubService, person_service_1.PersonService, user_service_1.UserService])
], TabListPersonComponent);
exports.TabListPersonComponent = TabListPersonComponent;
//# sourceMappingURL=tab-list-person.component.js.map