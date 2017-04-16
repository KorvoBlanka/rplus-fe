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
/**
 * Created by Aleksandr on 23.01.17.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var config_service_1 = require("./config.service");
var AsyncSubject_1 = require("rxjs/AsyncSubject");
var AccountService = (function () {
    function AccountService(_configService, _http) {
        this._configService = _configService;
        this._http = _http;
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/account/';
    }
    ;
    AccountService.prototype.list = function () {
        console.log('account list');
        var _resourceUrl = this.RS + 'list';
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var accounts = data.result;
            ret_subj.next(accounts);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    AccountService.prototype.save = function (account) {
        console.log('account save');
        var _resourceUrl = this.RS + 'save';
        var data_str = JSON.stringify(account);
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var a = data.result;
            ret_subj.next(a);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    return AccountService;
}());
AccountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.Http])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map