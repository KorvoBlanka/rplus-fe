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
var AsyncSubject_1 = require("rxjs/AsyncSubject");
var UserService = (function () {
    function UserService(_configService, _http) {
        this._configService = _configService;
        this._http = _http;
        this.RS = "";
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/user/';
    }
    ;
    UserService.prototype.list = function (role, superiorId, searchQuery) {
        console.log('user list');
        var query = [];
        if (role) {
            query.push("role=" + role);
        }
        if (superiorId) {
            query.push("superiorId=" + superiorId.toString());
        }
        if (searchQuery) {
            query.push("searchQuery=" + searchQuery);
        }
        var _resourceUrl = this.RS + 'list?' + query.join("&");
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl)
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var users = data.result;
            ret_subj.next(users);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    UserService.prototype.get = function (userId) {
        console.log('user get');
        var _resourceUrl = this.RS + 'get/' + userId;
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl)
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var u = data.result;
            // TODO: pass copy????
            ret_subj.next(u);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    UserService.prototype.save = function (user) {
        console.log('user save');
        var _resourceUrl = this.RS + 'save';
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        var data_str = JSON.stringify(user);
        this._http.post(_resourceUrl, data_str)
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var u = data.result;
            // TODO: pass copy????
            ret_subj.next(u);
            ret_subj.complete();
        }, function (err) {
            console.log(err);
        });
        return ret_subj;
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map