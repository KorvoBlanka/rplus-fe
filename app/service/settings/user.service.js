System.register(['angular2/core', '../config.service', 'angular2/http'], function(exports_1, context_1) {
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
    var UserService;
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
            UserService = (function () {
                function UserService(_configService, _http) {
                    this._configService = _configService;
                    this._http = _http;
                    this.RS = "";
                    this.RS = this._configService.getConfig().RESTServer;
                }
                ;
                UserService.prototype.get = function (userId) {
                    var _this = this;
                    console.log('user get');
                    return new Promise(function (resolve) {
                        var _resourceUrl = _this.RS + '/api/v1/user/get/' + userId;
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
                UserService.prototype.list = function (role, searchQuery) {
                    var _this = this;
                    console.log('user list');
                    return new Promise(function (resolve) {
                        var _resourceUrl = _this.RS + '/api/v1/user/list?'
                            + 'role=' + role
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
                UserService.prototype.update = function (user) {
                    var _this = this;
                    console.log('user update');
                    return new Promise(function (resolve) {
                        var _resourceUrl = _this.RS + '/api/v1/user/update/' + user.id;
                        var headers = new http_1.Headers();
                        delete user["selected"];
                        var data_str = JSON.stringify(user);
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
                UserService.prototype.create = function (user) {
                    var _this = this;
                    console.log('user create');
                    return new Promise(function (resolve) {
                        var _resourceUrl = _this.RS + '/api/v1/user/create';
                        var headers = new http_1.Headers();
                        var data_str = JSON.stringify(user);
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
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [config_service_1.ConfigService, http_1.Http])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map