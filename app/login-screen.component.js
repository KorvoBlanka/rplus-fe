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
var config_service_1 = require("./service/config.service");
var session_service_1 = require("./service/session.service");
var LoginScreenComponent = (function () {
    function LoginScreenComponent(_sessionService, _configService) {
        this._sessionService = _sessionService;
        this._configService = _configService;
        this.authorized = _sessionService.authorized;
        this.msg = _sessionService.msg;
        this.account = "";
        this.login = "";
        this.password = "";
    }
    LoginScreenComponent.prototype.ngOnInit = function () {
        var cuStr = localStorage.getItem('currentUser');
        if (cuStr) {
            var cu = JSON.parse(cuStr);
            this.account = cu.account;
            this.login = cu.login;
        }
        this.checkSession();
    };
    LoginScreenComponent.prototype._login = function () {
        localStorage.setItem('currentUser', JSON.stringify({ account: this.account, login: this.login }));
        this._sessionService.login(this.account, this.login, this.password);
    };
    LoginScreenComponent.prototype._logout = function () {
        this._sessionService.logout();
    };
    LoginScreenComponent.prototype.checkSession = function () {
        this._sessionService.check();
    };
    return LoginScreenComponent;
}());
LoginScreenComponent = __decorate([
    core_1.Component({
        selector: 'login-screen',
        styles: ["\n        .login-screen {\n            position: absolute;\n            top: 0px;\n            left: 0px;\n            z-index: 2;\n\n            width: 100%;\n            height: 100%;\n        }\n\n        .login-form {\n            position: absolute;\n            top: 100px;\n            left: calc(50% - 200px);\n            background-color: #fff;\n            width: 400px;\n            padding: 20px 20px 40px 20px;\n        }\n\n        .login-form > .form-header {\n            font-size: 26px;\n        }\n\n        .input-control {\n            margin-top: 5px;\n        }\n\n        .input-control > label {\n\n        }\n\n        .input-control > input {\n            width: 100%;\n            height: 28px;\n        }\n\n        .action-block {\n            margin-top: 25px;\n        }\n\n        .button {\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #3366cc;\n            color: #fff;\n            cursor: pointer;\n        }\n\n        .ver-str {\n            color: #eeeeee;\n        }\n\n        .login-msg {\n            color: #eeeeee;\n        }\n\n    "],
        template: "\n        <div class=\"login-screen bg-darkTeal\" [hidden]=\"authorized | async\">\n            <div class=\"ver-str\"><span>v: {{_configService.getConfig().version}}</span></div>\n            <div class=\"login-msg\"><span>msg: {{msg | async}}</span></div>\n            <div class=\"login-form\" (keyup.enter)=\"_login();\">\n                <div class=\"form-header\">\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C</div>\n                <hr>\n\n                <div class=\"input-control\">\n                    <label>\u0410\u043A\u043A\u0430\u0443\u043D\u0442</label>\n                    <input [(ngModel)]=\"account\">\n                </div>\n\n                <div class=\"input-control\">\n                    <label>\u041B\u043E\u0433\u0438\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</label>\n                    <input [(ngModel)]=\"login\">\n                </div>\n                <div class=\"input-control\">\n                    <label>\u041F\u0430\u0440\u043E\u043B\u044C</label>\n                    <input type=\"password\" [(ngModel)]=\"password\">\n                </div>\n                <div class=\"action-block\" (click)=\"_login()\">\n                    <div class=\"button\">\u0412\u0445\u043E\u0434</div>\n                </div>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [session_service_1.SessionService, config_service_1.ConfigService])
], LoginScreenComponent);
exports.LoginScreenComponent = LoginScreenComponent;
//# sourceMappingURL=login-screen.component.js.map