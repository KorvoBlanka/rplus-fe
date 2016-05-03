System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var PersonService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            PersonService = (function () {
                function PersonService(_http) {
                    this._http = _http;
                }
                ;
                PersonService.prototype.list = function (page, perPage, organisationId, searchQuery) {
                    var _this = this;
                    console.log('person list');
                    return new Promise(function (resolve) {
                        var _resourceUrl = 'http://localhost:4567/api/v1/person/list?'
                            + 'page=' + page
                            + '&per_page=' + perPage
                            + '&organisation_id=' + organisationId
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
                PersonService.prototype.update = function (person) {
                    var _this = this;
                    console.log('person update');
                    return new Promise(function (resolve) {
                        var _resourceUrl = 'http://localhost:4567/api/v1/person/update/' + person.id;
                        var headers = new http_1.Headers();
                        delete person["selected"];
                        var data_str = JSON.stringify(person);
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
                PersonService.prototype.create = function (person) {
                    var _this = this;
                    console.log('person create');
                    return new Promise(function (resolve) {
                        var _resourceUrl = 'http://localhost:4567/api/v1/person/create';
                        var headers = new http_1.Headers();
                        var data_str = JSON.stringify(person);
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
                PersonService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], PersonService);
                return PersonService;
            }());
            exports_1("PersonService", PersonService);
        }
    }
});
//# sourceMappingURL=person.service.js.map