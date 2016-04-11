System.register(['angular2/core', '../class/realty', 'angular2/http'], function(exports_1) {
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
    var core_1, realty_1, http_1;
    var RealtyService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (realty_1_1) {
                realty_1 = realty_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            RealtyService = (function () {
                function RealtyService(_http) {
                    this._http = _http;
                }
                ;
                RealtyService.prototype.updateRealty = function (realty) {
                    var _this = this;
                    console.log('updateRealty');
                    return new Promise(function (resolve) {
                        var _resourceUrl = 'http://localhost:4567/api/v1/offer/update/' + realty.id;
                        var headers = new http_1.Headers();
                        // TODO
                        // убрать из realty "selected" (ну или засунуть его таки в БД)
                        delete realty["selected"];
                        realty_1.Realty.normalize(realty);
                        var data_str = JSON.stringify(realty);
                        _this._http.post(_resourceUrl, data_str, {
                            headers: headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            resolve(data);
                            if (data.result == "OK") {
                            }
                        }, function (err) { return console.log(err); });
                    });
                };
                RealtyService.prototype.getRealty = function (page, perPage) {
                    var _this = this;
                    console.log('getRealty');
                    return new Promise(function (resolve) {
                        var _resourceUrl = 'http://localhost:4567/api/v1/offer/list?' + 'page=' + page + '&per_page=' + perPage;
                        var headers = new http_1.Headers();
                        _this._http.get(_resourceUrl, {
                            headers: headers
                        })
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            resolve(data);
                            if (data.result == "OK") {
                            }
                        }, function (err) { return console.log(err); });
                    });
                };
                RealtyService.prototype.getSimilarRealty = function (page, per_page) {
                    return [];
                };
                RealtyService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], RealtyService);
                return RealtyService;
            }());
            exports_1("RealtyService", RealtyService);
        }
    }
});
//# sourceMappingURL=realty.service.js.map