System.register(['angular2/core', './service/hub.service', './component/tab-system.component', './component/notebook.component', './component/context-menu.component', './component/login-screen.component'], function(exports_1, context_1) {
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
    var core_1, hub_service_1, tab_system_component_1, notebook_component_1, context_menu_component_1, login_screen_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hub_service_1_1) {
                hub_service_1 = hub_service_1_1;
            },
            function (tab_system_component_1_1) {
                tab_system_component_1 = tab_system_component_1_1;
            },
            function (notebook_component_1_1) {
                notebook_component_1 = notebook_component_1_1;
            },
            function (context_menu_component_1_1) {
                context_menu_component_1 = context_menu_component_1_1;
            },
            function (login_screen_component_1_1) {
                login_screen_component_1 = login_screen_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_hubService) {
                    this._hubService = _hubService;
                    this._hubService.shared_var['cm_hidden'] = true;
                }
                AppComponent.prototype.contextmenu = function (e) {
                    this._hubService.shared_var['cm_hidden'] = true;
                };
                AppComponent.prototype.click = function (e) {
                    this._hubService.shared_var['cm_hidden'] = true;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'rplus-app',
                        template: "\n    <div\n     (contextmenu)=\"contextmenu($event)\"\n     (click)=\"click($event)\"\n    >\n      <context-menu\n        [pos_x]=\"_hubService.shared_var['cm_px']\"\n        [pos_y]=\"_hubService.shared_var['cm_py']\"\n        [hidden]=\"_hubService.shared_var['cm_hidden']\"\n        [items]=\"_hubService.shared_var['cm_items']\"\n      >\n      </context-menu>\n      <login-screen></login-screen>\n      <tab-system></tab-system>\n      <notebook></notebook>\n    </div>\n  ",
                        styles: [""],
                        directives: [tab_system_component_1.TabSystemComponent, notebook_component_1.NotebookComponent, context_menu_component_1.ContextMenuComponent, login_screen_component_1.LoginScreenComponent],
                    }), 
                    __metadata('design:paramtypes', [hub_service_1.HubService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map