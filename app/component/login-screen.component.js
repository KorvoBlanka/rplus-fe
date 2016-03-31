System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1) {
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
    var core_1, http_1, Observable_1;
    var LoginScreenComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            LoginScreenComponent = (function () {
                function LoginScreenComponent(_http) {
                    this._http = _http;
                    this._logingUrl = 'http://localhost:4567/session/login';
                    this._logoutUrl = 'http://localhost:4567/session/logout';
                    this.is_logged_in = true;
                }
                LoginScreenComponent.prototype.login = function () {
                    this._login();
                };
                LoginScreenComponent.prototype._login = function () {
                    var _this = this;
                    var headers = new http_1.Headers();
                    var auth_header = btoa(this.user_name + ":" + this.password);
                    //headers.append('Authorization', 'Basic ' + auth_header);
                    this._http.post(this._logingUrl, "auth: " + auth_header, {
                        headers: headers
                    })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        if (data.result == "OK") {
                            _this.is_logged_in = true;
                        }
                    }, function (err) { return console.log(err); });
                };
                LoginScreenComponent.prototype._logout = function () {
                    console.log(this._http.get(this._logoutUrl)
                        .map(function (res) { return res.json().data; })
                        .catch(this.handleError));
                };
                LoginScreenComponent.prototype.handleError = function (error) {
                    // in a real world app, we may send the error to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                LoginScreenComponent = __decorate([
                    core_1.Component({
                        selector: 'login-screen',
                        template: "\n  <div class=\"login-screen bg-darkTeal\" [hidden]=\"is_logged_in\">\n    <div class=\"login-form\">\n      <div class=\"form-header\">\n        \u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C\n      </div>\n      <hr>\n      <div class=\"input-control\">\n        <label>\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F</label>\n        <input [(ngModel)]=\"user_name\">\n      </div>\n      <div class=\"input-control\">\n        <label>\u041F\u0430\u0440\u043E\u043B\u044C</label>\n        <input type=\"password\" [(ngModel)]=\"password\">\n      </div>\n      <div class=\"action-block\" (click)=\"login()\">\n        <div class=\"button\">\u0412\u0445\u043E\u0434</div>\n      </div>\n    </div>\n  </div>\n  ",
                        styles: ["\n    .login-screen {\n      position: absolute;\n      top: 0px;\n      left: 0px;\n      z-index: 2;\n\n      width: 100%;\n      height: 100%;\n    }\n\n    .login-form {\n      position: absolute;\n      top: 100px;\n      left: calc(50% - 200px);\n      background-color: #fff;\n      width: 400px;\n      padding: 20px;\n      padding-bottom: 40px;\n    }\n\n    .login-form > .form-header {\n      font-size: 26;\n    }\n\n    .input-control {\n      margin-top: 5px;\n    }\n\n    .input-control > label {\n\n    }\n\n    .input-control > input {\n      width: 100%;\n      height: 28px;\n    }\n\n    .action-block {\n      margin-top: 25px;\n    }\n\n    .button {\n      text-align: center;\n      padding: 5px 15px;\n      background-color: #3366cc;\n      color: #fff;\n      cursor: pointer;\n    }\n\n  "],
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LoginScreenComponent);
                return LoginScreenComponent;
            }());
            exports_1("LoginScreenComponent", LoginScreenComponent);
        }
    }
});
//# sourceMappingURL=login-screen.component.js.map