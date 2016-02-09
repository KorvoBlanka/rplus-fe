System.register(['angular2/core', './tab-main.component', './tab-list-realty.component', './tab-realty.component', './tab-list-person.component', './tab-person.component', './tab-list-organisation.component', './tab-list-request.component', './tab-request.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, tab_main_component_1, tab_list_realty_component_1, tab_realty_component_1, tab_list_person_component_1, tab_person_component_1, tab_list_organisation_component_1, tab_list_request_component_1, tab_request_component_1;
    var TabRootComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tab_main_component_1_1) {
                tab_main_component_1 = tab_main_component_1_1;
            },
            function (tab_list_realty_component_1_1) {
                tab_list_realty_component_1 = tab_list_realty_component_1_1;
            },
            function (tab_realty_component_1_1) {
                tab_realty_component_1 = tab_realty_component_1_1;
            },
            function (tab_list_person_component_1_1) {
                tab_list_person_component_1 = tab_list_person_component_1_1;
            },
            function (tab_person_component_1_1) {
                tab_person_component_1 = tab_person_component_1_1;
            },
            function (tab_list_organisation_component_1_1) {
                tab_list_organisation_component_1 = tab_list_organisation_component_1_1;
            },
            function (tab_list_request_component_1_1) {
                tab_list_request_component_1 = tab_list_request_component_1_1;
            },
            function (tab_request_component_1_1) {
                tab_request_component_1 = tab_request_component_1_1;
            }],
        execute: function() {
            TabRootComponent = (function () {
                function TabRootComponent() {
                }
                TabRootComponent = __decorate([
                    core_1.Component({
                        selector: 'tab-root',
                        inputs: ['tab'],
                        template: "\n    <div [ngSwitch]=\"tab.type\">\n      <tab-main [tab]=\"tab\" *ngSwitchWhen=\"'main'\"></tab-main>\n      <tab-list-realty [tab]=\"tab\" *ngSwitchWhen=\"'list_realty'\"></tab-list-realty>\n      <tab-realty [tab]=\"tab\" *ngSwitchWhen=\"'realty'\"></tab-realty>\n      <tab-list-person [tab]=\"tab\" *ngSwitchWhen=\"'list_person'\"></tab-list-person>\n      <tab-person [tab]=\"tab\" *ngSwitchWhen=\"'person'\"></tab-person>\n      <tab-list-organisation [tab]=\"tab\" *ngSwitchWhen=\"'list_organisation'\"></tab-list-organisation>\n      <tab-list-request [tab]=\"tab\" *ngSwitchWhen=\"'list_request'\"></tab-list-request>\n      <tab-request [tab]=\"tab\" *ngSwitchWhen=\"'request'\"></tab-request>\n      <div *ngSwitchDefault>tab.type == {{ tab.type }}</div>\n    </div>\n  ",
                        directives: [
                            tab_main_component_1.TabMainComponent,
                            tab_list_realty_component_1.TabListRealtyComponent,
                            tab_realty_component_1.TabRealtyComponent,
                            tab_list_person_component_1.TabListPersonComponent,
                            tab_person_component_1.TabPersonComponent,
                            tab_list_organisation_component_1.TabListOrganisationComponent,
                            tab_list_request_component_1.TabListRequestComponent,
                            tab_request_component_1.TabRequestComponent,
                        ],
                    }), 
                    __metadata('design:paramtypes', [])
                ], TabRootComponent);
                return TabRootComponent;
            })();
            exports_1("TabRootComponent", TabRootComponent);
        }
    }
});
//# sourceMappingURL=tab-root.component.js.map