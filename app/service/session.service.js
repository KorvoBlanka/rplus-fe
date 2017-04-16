/**
 * Created by Aleksandr on 24.01.17.
 */
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
var config_service_1 = require("./config.service");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var SessionService = (function () {
    function SessionService(_configService, _http) {
        this._configService = _configService;
        this._http = _http;
        this.dataStore = {
            authorized: false,
            msg: "",
            user: null,
            account: null
        };
        this.RS = this._configService.getConfig().RESTServer + '/session/';
        this.dataStore.authorized = false;
        this.dataStore.user = null;
        this.dataStore.account = null;
        this._authorized = new BehaviorSubject_1.BehaviorSubject(false);
        this.authorized = this._authorized.asObservable();
        this._msg = new BehaviorSubject_1.BehaviorSubject("");
        this.msg = this._msg.asObservable();
        this._user = new BehaviorSubject_1.BehaviorSubject(null);
        this.user = this._user.asObservable();
        this._account = new BehaviorSubject_1.BehaviorSubject(null);
        this.account = this._account.asObservable();
    }
    ;
    SessionService.prototype.getUser = function () {
        return this.dataStore.user;
    };
    SessionService.prototype.getAccount = function () {
        return this.dataStore.account;
    };
    SessionService.prototype.login = function (accountName, login, password) {
        var _this = this;
        console.log('login');
        var _endpointUrl = this.RS + 'login';
        var data_str = JSON.stringify({
            account: accountName,
            login: login,
            password: password
        });
        this._http.post(_endpointUrl, data_str, { withCredentials: true })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.result == "OK") {
                _this.dataStore.authorized = true;
                _this._authorized.next(Object.assign({}, _this.dataStore).authorized);
                _this.dataStore.msg = "logged in";
                _this._msg.next(Object.assign({}, _this.dataStore).msg);
                _this.dataStore.user = data.user;
                _this._user.next(Object.assign({}, _this.dataStore).user);
                _this.dataStore.account = data.account;
                _this._account.next(Object.assign({}, _this.dataStore).account);
            }
            else {
                _this.dataStore.authorized = false;
                _this._authorized.next(Object.assign({}, _this.dataStore).authorized);
                _this.dataStore.msg = data.msg;
                _this._msg.next(Object.assign({}, _this.dataStore).msg);
            }
        }, function (err) { return console.log(err); });
    };
    SessionService.prototype.logout = function () {
        var _this = this;
        console.log('logout');
        var _endpointUrl = this.RS + 'logout';
        this._http.post(_endpointUrl, "", { withCredentials: true })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.dataStore.authorized = false;
            _this._authorized.next(Object.assign({}, _this.dataStore).authorized);
            _this.dataStore.msg = "logged out";
            _this._msg.next(Object.assign({}, _this.dataStore).msg);
        });
    };
    SessionService.prototype.check = function () {
        var _this = this;
        console.log('check');
        var _endpointUrl = this.RS + 'check';
        this._http.get(_endpointUrl, { withCredentials: true })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.result == "OK") {
                _this.dataStore.authorized = true;
                _this._authorized.next(Object.assign({}, _this.dataStore).authorized);
                _this.dataStore.msg = "logged in";
                _this._msg.next(Object.assign({}, _this.dataStore).msg);
                _this.dataStore.user = data.user;
                _this._user.next(Object.assign({}, _this.dataStore).user);
                _this.dataStore.account = data.account;
                _this._account.next(Object.assign({}, _this.dataStore).account);
            }
            else {
                _this.dataStore.authorized = false;
                _this._authorized.next(Object.assign({}, _this.dataStore).authorized);
            }
        }, function (err) { return console.log(err); });
    };
    return SessionService;
}());
SessionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.Http])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map