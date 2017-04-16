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
var session_service_1 = require("./session.service");
var RequestService = (function () {
    function RequestService(_http, _configService, _sessionService) {
        this._http = _http;
        this._configService = _configService;
        this._sessionService = _sessionService;
        this.RS = "";
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/request/';
    }
    ;
    RequestService.prototype.list = function (page, perPage, offerTypeCode, stageCode, agentId, personId, searchQuery) {
        console.log('request list');
        var query = [];
        var user = this._sessionService.getUser();
        query.push('accountId=' + user.accountId);
        query.push('page=' + page);
        query.push('per_page=' + perPage);
        query.push('offerTypeCode=' + offerTypeCode);
        query.push('stageCode=' + stageCode);
        query.push('agent_id=' + (agentId ? agentId : ''));
        query.push('person_id=' + (personId ? personId : ''));
        query.push('search_query=' + searchQuery);
        var _resourceUrl = this.RS + 'list?' + query.join("&");
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var requests = data.result;
            ret_subj.next(requests);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    RequestService.prototype.listForOffer = function (offer) {
        console.log('request list for offer');
        var page = 0;
        var perPage = 16;
        var query = [];
        var user = this._sessionService.getUser();
        query.push('accountId=' + user.accountId);
        query.push('page=' + page);
        query.push('per_page=' + perPage);
        var _resourceUrl = this.RS + 'list_for_offer/' + offer.id + '?' + query.join("&");
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var requests = data.result;
            ret_subj.next(requests);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    RequestService.prototype.save = function (request) {
        console.log('request save');
        var user = this._sessionService.getUser();
        request.accountId = user.accountId;
        var _resourceUrl = this.RS + 'save';
        delete request["selected"];
        var data_str = JSON.stringify(request);
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.post(_resourceUrl, data_str, { withCredentials: true })
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
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService, session_service_1.SessionService])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map