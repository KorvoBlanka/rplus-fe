System.register(['angular2/core', './config.service', 'angular2/http', 'rxjs/Observable', 'rxjs/add/operator/share', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, config_service_1, http_1, Observable_1;
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
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            PersonService = (function () {
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
                PersonService.prototype.list = function (page, perPage, organisationId, searchQuery) {
                    var _this = this;
                    console.log('person list');
                    if (page == 0) {
                        this._dataStore.persons = [];
                    }
                    var _resourceUrl = this.RS + '/api/v1/person/list?'
                        + 'page=' + page
                        + '&per_page=' + perPage
                        + '&organisation_id=' + organisationId
                        + '&search_query=' + searchQuery;
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
                PersonService.prototype.update = function (person) {
                    var _this = this;
                    console.log('person update');
                    console.log(person);
                    var _resourceUrl = this.RS + '/api/v1/person/update/' + person.id;
                    delete person["selected"];
                    var data_str = JSON.stringify(person);
                    return new Promise(function (resolve) {
                        _this._http.post(_resourceUrl, data_str)
                            .map(function (res) { return res.json(); }).subscribe(function (data) {
                            if (data.response == "ok") {
                                var uPerson = data.result;
                                _this._dataStore.persons.forEach(function (person, i) {
                                    if (person.id === uPerson.id) {
                                        _this._dataStore.persons[i] = uPerson;
                                        resolve(uPerson);
                                    }
                                });
                            }
                        }, function (err) { return console.log(err); });
                    });
                };
                PersonService.prototype.create = function (person) {
                    var _this = this;
                    console.log('person create');
                    console.log(person);
                    var _resourceUrl = this.RS + '/api/v1/person/create';
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