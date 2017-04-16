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
var user_service_1 = require("../../service/user.service");
var organisation_service_1 = require("../../service/organisation.service");
var task_service_1 = require("../../service/task.service");
var organisation_1 = require("../../class/organisation");
var user_1 = require("../../class/user");
var task_1 = require("../../class/task");
var DigestPersonComponent = (function () {
    function DigestPersonComponent(_hubService, _userService, _organisationService, _taskService) {
        this._hubService = _hubService;
        this._userService = _userService;
        this._organisationService = _organisationService;
        this._taskService = _taskService;
        this.selected = false;
        this.organisation = new organisation_1.Organisation();
        this.agent = new user_1.User();
    }
    ;
    DigestPersonComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.task = this._taskService.getRandomTask();
        if (this.person.organisationId) {
            this._organisationService.get(this.person.organisationId).subscribe(function (org) {
                _this.organisation = org;
            });
        }
        if (this.person.userId != null) {
            this._userService.get(this.person.userId).subscribe(function (agent) {
                _this.agent = agent;
            });
        }
        this.resultText = this.getResultText();
    };
    DigestPersonComponent.prototype.select = function () {
        this.selected = !this.selected;
    };
    DigestPersonComponent.prototype.open = function () {
        this.selected = true;
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('person', { person: this.person });
    };
    DigestPersonComponent.prototype.tStart = function () {
        var _this = this;
        clearTimeout(this.to);
        this.to = setTimeout(function () {
            _this.open();
        }, 1000);
    };
    DigestPersonComponent.prototype.tEnd = function () {
        clearTimeout(this.to);
    };
    DigestPersonComponent.prototype.getResultText = function () {
        return task_1.Task.getResultText(this.task);
    };
    return DigestPersonComponent;
}());
DigestPersonComponent = __decorate([
    core_1.Component({
        selector: 'digest-person',
        inputs: ['person'],
        styles: ["\n        .billet {\n            background-color: inherit;\n            color: #696969;\n            font-weight: 200;\n            font-size: 14px;\n            position: relative;\n    \n            border-bottom: 1px solid #e5e5e5;\n            overflow: hidden;\n    \n            padding: 10px 20px;\n        }\n    \n        .billet-label {\n            font-weight: 400;\n            color:  #666;\n            font-size: 17px;\n            white-space: nowrap;\n            margin-left: 50px;\n        }\n    \n        .billet.selected {\n            background-color: #157ad3;\n            color: #fff !important;\n        }\n    \n        .billet-block {\n            display: inline-block;\n            width: 32%;\n        }\n    \n        .entry-header {\n            display: inline-block;\n            width: 90px;\n            color: #aaa;\n        }\n    \n        .badge-gray {\n            display: inline-block;\n            width: 85px;\n            text-align: center;\n            color: #666;\n            background-color: #eee;\n        }\n        .badge-red {\n            display: inline-block;\n            width: 85px;\n            text-align: center;\n            color: #fff;\n            background-color: #e05050;\n        }\n        .badge-green {\n            display: inline-block;\n            width: 85px;\n            text-align: center;\n            color: #fff;\n            background-color: #50e050;\n        }\n    "],
        template: "\n        <div class=\"billet\"\n             [class.selected]=\"selected\"\n             (click)=\"select()\"\n             (dblclick)=\"open()\"\n             (touchstart)=\"tStart()\"\n             (touchend)=\"tEnd()\"\n        >\n            <div style=\"display: flex; justify-content: space-between;\">\n                <span>\u041A\u043E\u043D\u0442\u0430\u043A\u0442 {{ person.id }}\n                    <span class=\"billet-label\">{{ person.name }}</span>\n                </span>\n                <span>{{ person.change_date | formatDate }} / {{ person.add_date | formatDate }}</span>\n            </div>\n            <table style=\"width: 100%;\">\n                <tbody style=\"vertical-align: top; font-size: 14px; font-weight: 200;\">\n                <tr>\n                    <td width=\"33%\">\n                        <span class=\"entry-header\" style=\"width: 105px;\">\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F:</span> {{ organisation.name }}\n                    </td>\n                    <td width=\"33%\">\n                        <span class=\"entry-header\">\u0417\u0430\u0434\u0430\u0447\u0430:</span> {{ task.type }}\n                    </td>\n                    <td width=\"33%\">\n                        <div style=\"float: left; display: block;\">\n                            <span class=\"entry-header\" style=\"width: 90px;\">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439:</span>\n                        </div>\n                        <div style=\"oveflow: hidden;\">\n                            <span class=\"line-clamp line-clamp-1\" style=\"font-style: italic; line-height: normal;\"> {{ task.comment }} </span>\n                        </div>\n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        <span class=\"entry-header\" style=\"width: 105px;\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439:</span> <a href=\"#\"> {{ agent.name\n                        }} </a>\n                    </td>\n                    <td>\n                        <span class=\"entry-header\">\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442:</span> <span [class.badge-gray]=\"task.result_id == 0\"\n                                                                           [class.badge-green]=\"task.result_id == 1\"\n                                                                           [class.badge-red]=\"task.result_id == 2\">{{ resultText }}</span>\n                    </td>\n                    <td>\n        \n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        <span class=\"entry-header\" style=\"width: 105px;\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D:</span> {{ person.phones[0]?person.phones[0]:''\n                        }}\n                    </td>\n                    <td></td>\n                    <td>\n        \n                    </td>\n                </tr>\n                </tbody>\n            </table>\n        \n        \n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService, user_service_1.UserService, organisation_service_1.OrganisationService, task_service_1.TaskService])
], DigestPersonComponent);
exports.DigestPersonComponent = DigestPersonComponent;
//# sourceMappingURL=digest-person.component.js.map