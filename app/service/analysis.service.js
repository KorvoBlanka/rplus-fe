System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var AnalysisService, OBJ_ANALYSIS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AnalysisService = (function () {
                function AnalysisService() {
                }
                AnalysisService.prototype.getObjAnalysis = function () {
                    return OBJ_ANALYSIS;
                };
                AnalysisService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AnalysisService);
                return AnalysisService;
            }());
            exports_1("AnalysisService", AnalysisService);
            OBJ_ANALYSIS = {
                ch1_data: [
                    ['Задача', 'Значение'],
                    ['Звонок', 42],
                    ['Встреча', 28],
                    ['Показ', 25],
                    ['Задача А', 4],
                    ['Задача Б', 2],
                ],
                ch1_data_v1: 101,
                ch2_data: [
                    ['Дата', 'Запросы'],
                    [0, 10],
                    [1, 11],
                    [2, 16],
                    [3, 21],
                    [4, 21],
                    [5, 22],
                    [6, 22],
                    [7, 23],
                ],
                ch2_data_v1: 23,
                ch3_data: [
                    ['День', 'успешно', 'не успешно'],
                    [0, 1, 4],
                    [1, 2, 8],
                    [2, 2, 9],
                    [3, 4, 16],
                    [4, 4, 16],
                    [5, 4, 17],
                    [6, 5, 18],
                    [7, 6, 19],
                ],
                ch3_data_v1: 6,
                ch3_data_v2: 19,
            };
        }
    }
});
//# sourceMappingURL=analysis.service.js.map