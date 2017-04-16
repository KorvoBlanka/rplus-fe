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
/**
 * Created by Aleksandr on 25.01.17.
 */
var core_1 = require("@angular/core");
var hub_service_1 = require("./service/hub.service");
var MainComponent = (function () {
    function MainComponent(_hubService) {
        this._hubService = _hubService;
        this._hubService.shared_var['cm_hidden'] = true;
    }
    MainComponent.prototype.contextMenu = function (e) {
        this._hubService.shared_var['cm_hidden'] = true;
    };
    MainComponent.prototype.click = function (e) {
        this._hubService.shared_var['cm_hidden'] = true;
    };
    return MainComponent;
}());
MainComponent = __decorate([
    core_1.Component({
        selector: 'main',
        styles: [""],
        template: "\n        <div\n            (contextmenu)=\"contextMenu($event)\"\n            (click)=\"click($event)\"\n        >\n            <context-menu\n                [menu]=\"_hubService.shared_var['cm']\"\n                [hidden]=\"_hubService.shared_var['cm_hidden']\"\n            >\n            </context-menu>\n            <tab-system></tab-system>\n            <notebook></notebook>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService])
], MainComponent);
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map