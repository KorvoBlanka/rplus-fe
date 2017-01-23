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
var OrganisationService = (function () {
    function OrganisationService(_configService, _http) {
        this._configService = _configService;
        this._http = _http;
        this.RS = "";
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/organisation/';
    }
    ;
    OrganisationService.prototype.list = function (searchQuery) {
        console.log('org list');
        var _resourceUrl = this.RS + 'list?'
            + '&search_query=' + searchQuery;
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var organisations = data.result;
            ret_subj.next(organisations);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    OrganisationService.prototype.get = function (organisationId) {
        console.log('org get');
        var _resourceUrl = this.RS + 'get/' + organisationId;
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var o = data.result;
            // TODO: pass copy????
            ret_subj.next(o);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    OrganisationService.prototype.save = function (org) {
        console.log('org save');
        var _resourceUrl = this.RS + 'save';
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        var data_str = JSON.stringify(org);
        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var o = data.result;
            // TODO: pass copy????
            ret_subj.next(o);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    return OrganisationService;
}());
OrganisationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.Http])
], OrganisationService);
exports.OrganisationService = OrganisationService;
//# sourceMappingURL=organisation.service.js.map