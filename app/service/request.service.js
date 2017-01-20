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
var RequestService = (function () {
    function RequestService(_configService, _http) {
        this._configService = _configService;
        this._http = _http;
        this.RS = "";
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/request/';
    }
    ;
    RequestService.prototype.list = function (page, perPage, offerTypeCode, agentId, personId, searchQuery) {
        console.log('request list');
        var _resourceUrl = this.RS + 'list?'
            + 'page=' + page
            + '&per_page=' + perPage
            + '&offerTypeCode=' + offerTypeCode
            + '&agent_id=' + (agentId ? agentId : '')
            + '&person_id=' + (personId ? personId : '')
            + '&search_query=' + searchQuery;
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl)
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var requests = data.result;
            ret_subj.next(requests);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    RequestService.prototype.save = function (request) {
        console.log('request save');
        console.log(request);
        var _resourceUrl = this.RS + 'save';
        delete request["selected"];
        var data_str = JSON.stringify(request);
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.post(_resourceUrl, data_str)
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var r = data.result;
            // TODO: pass copy????
            ret_subj.next(r);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    return RequestService;
}());
RequestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.Http])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map