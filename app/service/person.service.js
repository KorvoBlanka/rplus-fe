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
require("rxjs/add/operator/map");
var PersonService = (function () {
    function PersonService(_configService, _http) {
        this._configService = _configService;
        this._http = _http;
        this.RS = "";
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/person/';
    }
    ;
    PersonService.prototype.list = function (userId, organisationId, searchQuery) {
        console.log('person list');
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        var query = [];
        if (userId) {
            query.push("userId=" + userId.toString());
        }
        if (organisationId) {
            query.push("organisationId=" + organisationId.toString());
        }
        if (searchQuery) {
            query.push("searchQuery=" + searchQuery);
        }
        var _resourceUrl = this.RS + 'list?' + query.join("&");
        this._http.get(_resourceUrl, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var persons = data.result;
            ret_subj.next(persons);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    PersonService.prototype.get = function (personId) {
        console.log('person get');
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        var _resourceUrl = this.RS + 'get/' + personId;
        this._http.get(_resourceUrl, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var notFound = true;
            var p = data.result;
            // TODO: pass copy????
            ret_subj.next(p);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    PersonService.prototype.save = function (person) {
        console.log('person save');
        console.log(person);
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        var _resourceUrl = this.RS + 'save';
        delete person["selected"];
        var data_str = JSON.stringify(person);
        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var notFound = true;
            var p = data.result;
            // TODO: pass copy????
            ret_subj.next(p);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    return PersonService;
}());
PersonService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.Http])
], PersonService);
exports.PersonService = PersonService;
//# sourceMappingURL=person.service.js.map