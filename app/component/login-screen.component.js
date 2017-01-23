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
var http_1 = require("@angular/http");
var config_service_1 = require("../service/config.service");
var LoginScreenComponent = (function () {
    function LoginScreenComponent(_http, _configService) {
        this._http = _http;
        this._configService = _configService;
        this._logingUrl = this._configService.getConfig().RESTServer + '/session/login';
        this._logoutUrl = this._configService.getConfig().RESTServer + '/session/logout';
        this.isLoggedIn = false;
    }
    LoginScreenComponent.prototype.login = function () {
        this._login();
    };
    LoginScreenComponent.prototype._login = function () {
        //headers.append('Authorization', 'Basic ' + auth_header);
        var _this = this;
        var data_str = JSON.stringify({
            account: this.account,
            userName: this.userName,
            password: this.password
        });
        this._http.post(this._logingUrl, data_str, { withCredentials: true })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.result == "OK") {
                _this.isLoggedIn = true;
            }
        }, function (err) { return console.log(err); });
    };
    LoginScreenComponent.prototype._logout = function () {
        console.log(this._http.get(this._logoutUrl).map(function (res) { return res.json().data; }));
    };
    return LoginScreenComponent;
}());
LoginScreenComponent = __decorate([
    core_1.Component({
        selector: 'login-screen',
        styles: ["\n        .login-screen {\n            position: absolute;\n            top: 0px;\n            left: 0px;\n            z-index: 2;\n\n            width: 100%;\n            height: 100%;\n        }\n\n        .login-form {\n            position: absolute;\n            top: 100px;\n            left: calc(50% - 200px);\n            background-color: #fff;\n            width: 400px;\n            padding: 20px 20px 40px 20px;\n        }\n\n        .login-form > .form-header {\n            font-size: 26px;\n        }\n    \n        .input-control {\n            margin-top: 5px;\n        }\n    \n        .input-control > label {\n    \n        }\n    \n        .input-control > input {\n            width: 100%;\n            height: 28px;\n        }\n    \n        .action-block {\n            margin-top: 25px;\n        }\n    \n        .button {\n            text-align: center;\n            padding: 5px 15px;\n            background-color: #3366cc;\n            color: #fff;\n            cursor: pointer;\n        }\n\n    "],
        template: "\n        <div class=\"login-screen bg-darkTeal\" [hidden]=\"isLoggedIn\">\n            <div class=\"login-form\">\n                <div class=\"form-header\">\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C</div>\n                <hr>\n                \n                <div class=\"input-control\">\n                    <label>\u0410\u043A\u043A\u0430\u0443\u043D\u0442</label>\n                    <input [(ngModel)]=\"account\">\n                </div>\n                \n                <div class=\"input-control\">\n                    <label>\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</label>\n                    <input [(ngModel)]=\"userName\">\n                </div>\n                <div class=\"input-control\">\n                    <label>\u041F\u0430\u0440\u043E\u043B\u044C</label>\n                    <input type=\"password\" [(ngModel)]=\"password\">\n                </div>\n                <div class=\"action-block\" (click)=\"login()\">\n                    <div class=\"button\">\u0412\u0445\u043E\u0434</div>\n                </div>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService])
], LoginScreenComponent);
exports.LoginScreenComponent = LoginScreenComponent;
//# sourceMappingURL=login-screen.component.js.map