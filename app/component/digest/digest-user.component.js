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
var DigestUserComponent = (function () {
    function DigestUserComponent(_hubService, _userService) {
        this._hubService = _hubService;
        this._userService = _userService;
        this.selected = false;
    }
    ;
    DigestUserComponent.prototype.ngOnInit = function () { };
    DigestUserComponent.prototype.select = function () {
        this.selected = !this.selected;
    };
    DigestUserComponent.prototype.open = function () {
        this.selected = true;
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('user', { user: this.user });
    };
    DigestUserComponent.prototype.tStart = function () {
        var _this = this;
        clearTimeout(this.to);
        this.to = setTimeout(function () {
            _this.open();
        }, 1000);
    };
    DigestUserComponent.prototype.tEnd = function () {
        clearTimeout(this.to);
    };
    return DigestUserComponent;
}());
DigestUserComponent = __decorate([
    core_1.Component({
        selector: 'digest-user',
        inputs: ['user'],
        styles: ["\n        .billet {\n            background-color: inherit;\n            color: #696969;\n            font-weight: 200;\n            font-size: 14px;\n            position: relative;\n\n            border-bottom: 1px solid #e5e5e5;\n            overflow: hidden;\n\n            padding: 10px 20px;\n        }\n\n        .billet-label {\n            font-weight: 400;\n            color:  #666;\n            font-size: 17px;\n            white-space: nowrap;\n            margin-left: 50px;\n        }\n\n        .billet.selected {\n            background-color: #157ad3;\n            color: #fff !important;\n        }\n\n        .billet-block {\n            display: inline-block;\n            width: 32%;\n        }\n\n        .entry-header {\n            display: inline-block;\n            width: 90px;\n            color: #aaa;\n        }\n\n        .badge-gray {\n            display: inline-block;\n            width: 85px;\n            text-align: center;\n            color: #666;\n            background-color: #eee;\n        }\n        .badge-red {\n            display: inline-block;\n            width: 85px;\n            text-align: center;\n            color: #fff;\n            background-color: #e05050;\n        }\n        .badge-green {\n            display: inline-block;\n            width: 85px;\n            text-align: center;\n            color: #fff;\n            background-color: #50e050;\n        }\n    "],
        template: "\n        <div class=\"billet\"\n          [class.selected]=\"selected\"\n          (click)=\"select()\"\n          (dblclick)=\"open()\"\n          (touchstart)=\"tStart()\"\n          (touchend)=\"tEnd()\"\n        >\n            <div style=\"display: flex; justify-content: space-between;\">\n                <span>\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \n                    <span class=\"billet-label\">{{ user.name }}</span>\n                </span>\n                <span>{{ user.change_date | formatDate }} / {{ user.add_date | formatDate }}</span>\n            </div>\n            <table style=\"width: 100%;\">\n                <tbody style=\"vertical-align: top; font-size: 14; font-weight: 200;\">\n\n                </tbody>\n            </table>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService, user_service_1.UserService])
], DigestUserComponent);
exports.DigestUserComponent = DigestUserComponent;
//# sourceMappingURL=digest-user.component.js.map