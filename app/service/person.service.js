System.register(['angular2/core', './config.service', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, config_service_1, http_1;
    var PersonService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            PersonService = (function () {
                function PersonService(_configService, _http) {
                    this._configService = _configService;
                    this._http = _http;
                    this.RS = "";
                    this.RS = this._configService.getConfig().RESTServer;
                }
                ;
                PersonService.prototype.get = function (personId) {
                    var _this = this;
                    console.log('person get');
                    return new Promise(function (resolve) {
                        var _resourceUrl = _this.RS + '/api/v1/person/get/' + personId;
                        var headers = new http_1.Headers();
                        _this._http.get(_resourceUrl, {
                            headers: headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            if (data.response == "ok") {
                                //
                                var person = data.result;
                                var t = [];
                                for (var _i = 0, _a = person.phone; _i < _a.length; _i++) {
                                    var phone = _a[_i];
                                    t.push({ s: phone });
                                }
                                person.phone = t;
                                resolve(person);
                            }
                        }, function (err) { return console.log(err); });
                    });
                };
                PersonService.prototype.list = function (page, perPage, organisationId, searchQuery) {
                    var _this = this;
                    console.log('person list');
                    return new Promise(function (resolve) {
                        var _resourceUrl = _this.RS + '/api/v1/person/list?'
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
                                var persons = data.result;
                                for (var _i = 0, persons_1 = persons; _i < persons_1.length; _i++) {
                                    var person = persons_1[_i];
                                    var t = [];
                                    for (var _a = 0, _b = person.phone; _a < _b.length; _a++) {
                                        var phone = _b[_a];
                                        t.push({ s: phone });
                                    }
                                    person.phone = t;
                                }
                                resolve(persons);
                            }
                        }, function (err) { return console.log(err); });
                    });
                };
                PersonService.prototype.update = function (person) {
                    var _this = this;
                    console.log('person update');
                    return new Promise(function (resolve) {
                        var _resourceUrl = _this.RS + '/api/v1/person/update/' + person.id;
                        var headers = new http_1.Headers();
                        delete person["selected"];
                        var t = [];
                        for (var _i = 0, _a = person.phone; _i < _a.length; _i++) {
                            var sp = _a[_i];
                            t.push(sp.s);
                        }
                        person.phone = t;
                        var data_str = JSON.stringify(person);
                        _this._http.post(_resourceUrl, data_str, {
                            headers: headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            if (data.response == "ok") {
                                //
                                var person = data.result;
                                var t = [];
                                for (var _i = 0, _a = person.phone; _i < _a.length; _i++) {
                                    var phone = _a[_i];
                                    t.push({ s: phone });
                                }
                                person.phone = t;
                                resolve(person);
                            }
                        }, function (err) { return console.log(err); });
                    });
                };
                PersonService.prototype.create = function (person) {
                    var _this = this;
                    console.log('person create');
                    return new Promise(function (resolve) {
                        var _resourceUrl = _this.RS + '/api/v1/person/create';
                        var headers = new http_1.Headers();
                        var t = [];
                        for (var _i = 0, _a = person.phone; _i < _a.length; _i++) {
                            var sp = _a[_i];
                            t.push(sp.s);
                        }
                        person.phone = t;
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
                    __metadata('design:paramtypes', [config_service_1.ConfigService, http_1.Http])
                ], PersonService);
                return PersonService;
            }());
            exports_1("PersonService", PersonService);
        }
    }
});
//# sourceMappingURL=person.service.js.map