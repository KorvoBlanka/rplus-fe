/**
 * Created by owl on 3/14/17.
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
var AsyncSubject_1 = require("rxjs/AsyncSubject");
require("rxjs/add/operator/map");
var SuggestionService = (function () {
    function SuggestionService(_configService, _http) {
        this._configService = _configService;
        this._http = _http;
        this.RS = "";
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/offer/';
    }
    ;
    SuggestionService.prototype.list = function (prefix) {
        console.log('suggestion list');
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        var sgs = [];
        /*
        var _resourceUrl = this.RS + 'suggestion?'
            + '&prefix=' + prefix;
        */
        var _resourceUrl = 'http://maps.googleapis.com/maps/api/geocode/json?'
            + "address=" + prefix
            + "&sensor=" + false
            + "&language=" + 'ru'
            + "&components=" + 'country:ru';
        var ret_subj = new AsyncSubject_1.AsyncSubject();
        this._http.get(_resourceUrl, {})
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            var sgs = [];
            data.results.forEach(function (e) {
                var short_addr = [];
                e.address_components.forEach(function (ac) {
                    if (ac.types[0] == "street_number") {
                        short_addr[0] = "";
                        short_addr[1] = ac.short_name;
                    }
                    else if (ac.types[0] == "route") {
                        short_addr[0] = ac.short_name;
                    }
                    else if (ac.types[0] != "postal_code" && ac.types[0] != "country") {
                        short_addr.push(ac.short_name);
                    }
                });
                var ts = short_addr.join(", ");
                if (ts) {
                    sgs.push(ts);
                }
            });
            var arr = [];
            for (var i = 0; i < sgs.length; i++) {
                if (arr.indexOf(sgs[i]) == -1) {
                    arr.push(sgs[i]);
                }
            }
            ret_subj.next(arr);
            ret_subj.complete();
        }, function (err) { return console.log(err); });
        return ret_subj;
    };
    return SuggestionService;
}());
SuggestionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.Http])
], SuggestionService);
exports.SuggestionService = SuggestionService;
//# sourceMappingURL=suggestion.service.js.map