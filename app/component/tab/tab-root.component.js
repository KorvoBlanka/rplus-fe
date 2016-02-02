System.register(['angular2/core', './tab-main.component', './tab-list-realty.component', './tab-realty.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, tab_main_component_1, tab_list_realty_component_1, tab_realty_component_1;
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
            }],
        execute: function() {
            TabRootComponent = (function () {
                function TabRootComponent() {
                }
                TabRootComponent = __decorate([
                    core_1.Component({
                        selector: 'tab-root',
                        inputs: ['tab'],
                        template: "\n    <div [ngSwitch]=\"tab.type\">\n      <tab-main [tab]=\"tab\" *ngSwitchWhen=\"'main'\"></tab-main>\n      <tab-list-realty [tab]=\"tab\" *ngSwitchWhen=\"'list_realty'\"></tab-list-realty>\n      <tab-realty [tab]=\"tab\" *ngSwitchWhen=\"'realty'\"></tab-realty>\n      <div *ngSwitchDefault>tab.type == {{ tab.type }}</div>\n    </div>\n  ",
                        directives: [tab_main_component_1.TabMainComponent, tab_list_realty_component_1.TabListRealtyComponent, tab_realty_component_1.TabRealtyComponent],
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