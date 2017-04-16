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
var listResult_1 = require("../class/listResult");
var OfferSource;
(function (OfferSource) {
    OfferSource[OfferSource["LOCAL"] = 1] = "LOCAL";
    OfferSource[OfferSource["IMPORT"] = 2] = "IMPORT";
})(OfferSource = exports.OfferSource || (exports.OfferSource = {}));
var OfferService = (function () {
    function OfferService(_http, _configService, _sessionService) {
        this._http = _http;
        this._configService = _configService;
        this._sessionService = _sessionService;
        this.RS = "";
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/offer/';
    }
    ;
    OfferService.prototype.list = function (page, perPage, source, filter, sort, searchQuery, searchArea) {
        console.log('offers list');
        var query = [];
        var user = this._sessionService.getUser();
        var source_str = 'local';
        if (source == OfferSource.IMPORT) {
            source_str = 'import';
        }
        query.push('accountId=' + user.accountId);
        query.push('page=' + page);
        query.push('per_page=' + perPage);
        query.push('source=' + source_str);
        query.push('filter=' + JSON.stringify(filter));
        if (sort) {
            query.push('sort=' + JSON.stringify(sort));
        }
        query.push('search_query=' + searchQuery);
        query.push('search_area=' + JSON.stringify(searchArea));
        var _resourceUrl = this.RS + 'list?' + query.join("&");
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var obj = new listResult_1.ListResult();
            obj.hitsCount = data.result.hitsCount;
            obj.list = data.result.list;
            ret_subj.next(obj);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    OfferService.prototype.save = function (offer) {
        console.log('offer save', offer);
        var user = this._sessionService.getUser();
        offer.accountId = user.accountId;
        var _resourceUrl = this.RS + 'save';
        var data_str = JSON.stringify(offer, function (key, value) {
            if (typeof value === 'string' && value.length == 0) {
                return undefined;
            }
            return value;
        });
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.post(_resourceUrl, data_str, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var o = data.result;
            // TODO: pass copy????
            ret_subj.next(o);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    OfferService.prototype.getSimilar = function (offer, page, perPage) {
        console.log('offer get similar');
        console.log(offer);
        var query = [];
        var user = this._sessionService.getUser();
        var source_str = 'local';
        query.push('accountId=' + user.accountId);
        query.push('page=' + page);
        query.push('per_page=' + perPage);
        var _resourceUrl = this.RS + 'list_similar/' + offer.id + '?' + query.join("&");
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl, { withCredentials: true })
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var obj = new listResult_1.ListResult();
            obj.hitsCount = data.result.hitsCount;
            obj.list = data.result.list;
            ret_subj.next(obj);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    return OfferService;
}());
OfferService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService, session_service_1.SessionService])
], OfferService);
exports.OfferService = OfferService;
//# sourceMappingURL=offer.service.js.map