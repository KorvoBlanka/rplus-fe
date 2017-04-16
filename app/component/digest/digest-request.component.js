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
var person_service_1 = require("../../service/person.service");
var task_service_1 = require("../../service/task.service");
var person_1 = require("../../class/person");
var task_1 = require("../../class/task");
var user_1 = require("../../class/user");
var user_service_1 = require("../../service/user.service");
var DigestRequestComponent = (function () {
    function DigestRequestComponent(_hubService, _userService, _taskService, _personService) {
        this._hubService = _hubService;
        this._userService = _userService;
        this._taskService = _taskService;
        this._personService = _personService;
        this.selected = false;
        this.person = new person_1.Person();
        this.agent = new user_1.User();
    }
    ;
    DigestRequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.task = this._taskService.getRandomTask();
        this.resultText = this.getResultText();
        if (this.request.personId != null) {
            this._personService.get(this.request.personId).subscribe(function (person) {
                _this.person = person;
            });
        }
        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(function (agent) {
                _this.agent = agent;
            });
        }
    };
    DigestRequestComponent.prototype.select = function () {
        this.selected = !this.selected;
    };
    DigestRequestComponent.prototype.open = function () {
        this.selected = true;
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('request', { request: this.request });
    };
    DigestRequestComponent.prototype.tStart = function () {
        var _this = this;
        clearTimeout(this.to);
        this.to = setTimeout(function () {
            _this.open();
        }, 1000);
    };
    DigestRequestComponent.prototype.tEnd = function () {
        clearTimeout(this.to);
    };
    DigestRequestComponent.prototype.getResultText = function () {
        return task_1.Task.getResultText(this.task);
    };
    return DigestRequestComponent;
}());
DigestRequestComponent = __decorate([
    core_1.Component({
        selector: 'digest-request',
        inputs: ['request', 'compact', 'color'],
        styles: ["\n        .billet, .billet_small {\n            background-color: inherit;\n            color: #696969;\n            font-weight: 200;\n            font-size: 14px;\n            position: relative;\n            border-bottom: 1px solid #e5e5e5;\n            overflow: hidden;\n            padding: 10px 20px;\n\n        }\n\n        .billet_small {\n            padding: 10px;\n        }\n\n        .billet-label {\n            font-weight: 400;\n            color:  #666;\n            font-size: 17px;\n            white-space: nowrap;\n            margin-left: 20px;\n        }\n\n        .billet_small .billet-label{\n            font-size: 13px;\n            width: calc(100% - 20px);\n            margin-left: 0px;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n\n        .billet.selected {\n            background-color: #157ad3;\n            color: #fff !important;\n        }\n\n        .billet-block {\n            display: inline-block;\n            width: 32%;\n        }\n\n        .entry-header {\n            display: inline-block;\n            width: 80px;\n            color: #aaa;\n        }\n\n        .badge-gray {\n            display: inline-block;\n            width: 85px;\n            text-align: center;\n            color: #666;\n            background-color: #eee;\n        }\n        .badge-red {\n            display: inline-block;\n            width: 85px;\n            text-align: center;\n            color: #fff;\n            background-color: #e05050;\n        }\n        .badge-green {\n            display: inline-block;\n            width: 85px;\n            text-align: center;\n            color: #fff;\n            background-color: #50e050;\n        }\n    "],
        template: "\n        <div class=\"billet\"\n             [class.selected]=\"selected\"\n             (click)=\"select()\"\n             (dblclick)=\"open()\"\n             (touchstart)=\"tStart()\"\n             (touchend)=\"tEnd()\"\n             *ngIf=\"!compact\"\n        >\n            <div style=\"display: flex; justify-content: space-between;\">\n                <span>\u0417\u0430\u044F\u0432\u043A\u0430 {{ request._id }}\n                  <span class=\"billet-label\">{{ request.request }} ( {{ request.offerTypeCode }} )</span>\n                </span>\n\n                <span></span>\n            </div>\n            <table style=\"width: 100%;\">\n                <tbody style=\"vertical-align: top; font-size: 14px; font-weight: 200;\">\n                <tr>\n                    <td width=\"33%\">\n                        <span class=\"entry-header\" style=\"width: 105px;\">\u041A\u043E\u043D\u0442\u0430\u043A\u0442:</span> <a href=\"#\">{{ person.name }}</a>\n                    </td>\n                    <td width=\"33%\">\n                        <span class=\"entry-header\">\u0417\u0430\u0434\u0430\u0447\u0430:</span> {{ task.type }}\n                    </td>\n                    <td width=\"33%\">\n                        <div style=\"float: left; display: block;\">\n                            <span class=\"entry-header\" style=\"width: 90px;\">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439:</span>\n                        </div>\n                        <div style=\"oveflow: hidden;\">\n                            <span class=\"line-clamp line-clamp-1\" style=\"font-style: italic; line-height: normal;\"> {{ task.comment }} </span>\n                        </div>\n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        <span class=\"entry-header\" style=\"width: 105px;\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439:</span> <a href=\"#\"> {{ agent.name }} </a>\n                    </td>\n                    <td>\n                        <span class=\"entry-header\">\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442:</span> <span [class.badge-gray]=\"task.result_id == 0\"\n                                                                           [class.badge-green]=\"task.result_id == 1\"\n                                                                           [class.badge-red]=\"task.result_id == 2\">{{ resultText }}</span>\n                    </td>\n                    <td>\n                    </td>\n                </tr>\n                <tr>\n                    <td>\n                        <span class=\"entry-header\" style=\"width: 105px;\">\u0421\u0442\u0430\u0434\u0438\u044F:</span>\n                    </td>\n                    <td></td>\n                    <td>\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"billet_small\"\n             [class.selected]=\"selected\"\n             (click)=\"select()\"\n             (dblclick)=\"open()\"\n             (touchstart)=\"tStart()\"\n             (touchend)=\"tEnd()\"\n             *ngIf=\"compact\"\n        >\n            <div class=\"billet-label\" style=\"font-style: italic; white-space: normal;\" [style.color]=\"color\">\n                <span class=\"billet-label\" style=\"margin-right: 7px; font-style: normal;\">\n                    {{ (request.addDate | formatDate).toString().split(\" \")[0]}}\n                </span>\n                {{ request.request }}\n            </div>\n            <div class=\"billet-label\" style=\"width: calc(100% - 32px); color: #a9a8a8 ;\">\n                \u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439: <span [style.color]=\"color\">{{ agent.name || person.name }}</span>\n            </div>\n            <div class=\"billet-label\" style=\"width: calc(100% - 32px);   color: #a9a8a8 !important;\">\n                \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B: {{ agent.phones[0] || person.phones[0] }}\n            </div>\n        </div>\n\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService, user_service_1.UserService, task_service_1.TaskService, person_service_1.PersonService])
], DigestRequestComponent);
exports.DigestRequestComponent = DigestRequestComponent;
//# sourceMappingURL=digest-request.component.js.map