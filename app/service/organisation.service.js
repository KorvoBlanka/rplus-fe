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
    var OrganisationService, ORGANISATIONS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            OrganisationService = (function () {
                function OrganisationService() {
                }
                OrganisationService.prototype.getOrganisationList = function (page, per_page) {
                    var len = ORGANISATIONS.length;
                    var f_idx = (page - 1) * per_page;
                    if (f_idx >= len)
                        return [];
                    var l_idx = page * per_page;
                    var itm_num = per_page;
                    if (l_idx >= len) {
                        itm_num = len % per_page;
                    }
                    return ORGANISATIONS.slice(f_idx, itm_num);
                };
                OrganisationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], OrganisationService);
                return OrganisationService;
            }());
            exports_1("OrganisationService", OrganisationService);
            ORGANISATIONS = [
                {
                    id: 0,
                    name: 'Частное лицо',
                    address: '',
                    info: '',
                    add_date: 0,
                    change_date: 0,
                },
                {
                    id: 1,
                    name: 'Агенство 1',
                    address: 'ул. Каковато 16, офис ННН',
                    info: 'бла-бла',
                    add_date: 1000000000,
                    change_date: 1300000000,
                },
            ];
        }
    }
});
//# sourceMappingURL=organisation.service.js.map