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
    var HistoryService, OBJ_HISTORY;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HistoryService = (function () {
                function HistoryService() {
                }
                HistoryService.prototype.getObjHistory = function () {
                    return OBJ_HISTORY;
                };
                HistoryService.prototype.putRecord = function (r) {
                    OBJ_HISTORY.push(r);
                };
                HistoryService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], HistoryService);
                return HistoryService;
            }());
            exports_1("HistoryService", HistoryService);
            OBJ_HISTORY = [
                {
                    id: 6511,
                    ts: 0,
                    type_id: 2,
                    type: 'импорт',
                    text: 'Объект импортирован, источник ???, ссылка ???',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: '',
                    property_id: 0,
                    old_val: null,
                    new_val: null,
                }, {
                    id: 6512,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'Описание',
                    property_id: 0,
                    old_val: 'Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности позволяет выполнять важные задания по разработке соответствующий условий активизации.',
                    new_val: 'С другой стороны новая модель организационной деятельности требуют от нас анализа модели развития.',
                }, {
                    id: 6513,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '1100',
                }, {
                    id: 6514,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1100',
                    new_val: '1200',
                }, {
                    id: 6515,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6516,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6517,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6518,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6519,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6520,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6521,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6522,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6523,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6524,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6525,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6526,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6527,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6528,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }, {
                    id: 6529,
                    ts: 0,
                    type_id: 1,
                    type: 'изменение значение',
                    text: '',
                    user_id: 0,
                    _user_name: 'Агент 1',
                    object_type: 'realty',
                    object_id: 0,
                    property_name: 'цена',
                    property_id: 0,
                    old_val: '1200',
                    new_val: '900',
                }
            ];
        }
    }
});
//# sourceMappingURL=history.service.js.map