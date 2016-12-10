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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/share");
require("rxjs/add/operator/map");
var PersonService = (function () {
    function PersonService(_configService, _http) {
        var _this = this;
        this._configService = _configService;
        this._http = _http;
        this.RS = "";
        this.RS = this._configService.getConfig().RESTServer;
        this.persons$ = new Observable_1.Observable(function (observer) { return _this._personsObserver = observer; }).share();
        this._dataStore = { persons: [] };
    }
    ;
    PersonService.prototype.get = function (personId) {
        var _this = this;
        console.log('person get');
        return new Promise(function (resolve) {
            var _resourceUrl = _this.RS + '/api/v1/person/get/' + personId;
            _this._http.get(_resourceUrl)
                .map(function (res) { return res.json(); }).subscribe(function (data) {
                if (data.response == "ok") {
                    var gPerson = data.result;
                    _this._dataStore.persons.forEach(function (person, i) {
                        if (person.id === gPerson.id) {
                            _this._dataStore.persons[i] = gPerson;
                        }
                    });
                    resolve(gPerson);
                }
            }, function (err) { return console.log(err); });
        });
    };
    PersonService.prototype.list = function (page, perPage, userId, organisationId, searchQuery) {
        var _this = this;
        console.log('person list');
        if (page == 0) {
            this._dataStore.persons = [];
        }
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
        var _resourceUrl = this.RS + '/api/v1/person/list?' + query.join("&");
        this._http.get(_resourceUrl)
            .map(function (res) { return res.json(); }).subscribe(function (data) {
            if (data.response == "ok") {
                var res = data.result;
                var persons = [];
                for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                    var person = res_1[_i];
                    _this._dataStore.persons.push(person);
                }
                _this._personsObserver.next(_this._dataStore.persons);
            }
        }, function (err) { return console.log(err); });
    };
    PersonService.prototype.save = function (person) {
        var _this = this;
        console.log('person save');
        console.log(person);
        var _resourceUrl = this.RS + '/api/v1/person/save';
        delete person["selected"];
        var data_str = JSON.stringify(person);
        return new Promise(function (resolve) {
            _this._http.post(_resourceUrl, data_str)
                .map(function (res) { return res.json(); }).subscribe(function (data) {
                if (data.response == "ok") {
                    var cPerson = data.result;
                    _this._dataStore.persons.splice(0, 0, cPerson);
                    resolve(cPerson);
                }
            }, function (err) { return console.log(err); });
        });
    };
    return PersonService;
}());
PersonService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.Http])
], PersonService);
exports.PersonService = PersonService;
//# sourceMappingURL=person.service.js.map