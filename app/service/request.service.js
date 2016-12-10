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
var RequestService = (function () {
    function RequestService(_configService, _http) {
        this._configService = _configService;
        this._http = _http;
        this.RS = "";
        this.RS = this._configService.getConfig().RESTServer;
    }
    ;
    RequestService.prototype.list = function (page, perPage, personId, searchQuery) {
        var _this = this;
        console.log('request list');
        return new Promise(function (resolve) {
            var _resourceUrl = _this.RS + '/api/v1/request/list?'
                + 'page=' + page
                + '&per_page=' + perPage
                + '&person_id=' + personId
                + '&search_query=' + searchQuery;
            var headers = new http_1.Headers();
            _this._http.get(_resourceUrl, {
                headers: headers
            })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.response == "ok") {
                    resolve(data.result);
                }
            }, function (err) { return console.log(err); });
        });
    };
    RequestService.prototype.update = function (request) {
        var _this = this;
        console.log('request update');
        return new Promise(function (resolve) {
            var _resourceUrl = _this.RS + '/api/v1/request/update/' + request.id;
            var headers = new http_1.Headers();
            delete request["selected"];
            var data_str = JSON.stringify(request);
            _this._http.post(_resourceUrl, data_str, {
                headers: headers
            })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.response == "ok") {
                    resolve(data.result);
                }
            }, function (err) { return console.log(err); });
        });
    };
    RequestService.prototype.create = function (request) {
        var _this = this;
        console.log('request create');
        return new Promise(function (resolve) {
            var _resourceUrl = _this.RS + '/api/v1/request/create';
            var headers = new http_1.Headers();
            var data_str = JSON.stringify(request);
            _this._http.post(_resourceUrl, data_str, {
                headers: headers
            })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.response == "ok") {
                    resolve(data.result);
                }
            }, function (err) { return console.log(err); });
        });
    };
    return RequestService;
}());
RequestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.Http])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map