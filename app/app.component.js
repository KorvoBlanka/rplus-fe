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
var core_1 = require("@angular/core");
var hub_service_1 = require("./service/hub.service");
var request_service_1 = require("./service/request.service");
var config_service_1 = require("./service/config.service");
var person_service_1 = require("./service/person.service");
var user_service_1 = require("./service/user.service");
var offer_service_1 = require("./service/offer.service");
var organisation_service_1 = require("./service/organisation.service");
var task_service_1 = require("./service/task.service");
var analysis_service_1 = require("./service/analysis.service");
var history_service_1 = require("./service/history.service");
var photo_service_1 = require("./service/photo.service");
var AppComponent = (function () {
    function AppComponent(_hubService) {
        this._hubService = _hubService;
        this._hubService.shared_var['cm_hidden'] = true;
    }
    AppComponent.prototype.contextMenu = function (e) {
        this._hubService.shared_var['cm_hidden'] = true;
    };
    AppComponent.prototype.click = function (e) {
        this._hubService.shared_var['cm_hidden'] = true;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'rplus-app',
        styles: [""],
        template: "\n        <div\n            (contextmenu)=\"contextMenu($event)\"\n            (click)=\"click($event)\"\n        >\n            <context-menu\n                [posX]=\"_hubService.shared_var['cm_px']\"\n                [posY]=\"_hubService.shared_var['cm_py']\"\n                [hidden]=\"_hubService.shared_var['cm_hidden']\"\n                [items]=\"_hubService.shared_var['cm_items']\"\n            >\n            </context-menu>\n            <login-screen></login-screen>\n            <tab-system></tab-system>\n            <notebook></notebook>\n        </div>\n    ",
        providers: [hub_service_1.HubService, config_service_1.ConfigService, user_service_1.UserService, organisation_service_1.OrganisationService, person_service_1.PersonService, request_service_1.RequestService, offer_service_1.OfferService, task_service_1.TaskService, analysis_service_1.AnalysisService, history_service_1.HistoryService, photo_service_1.PhotoService]
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map