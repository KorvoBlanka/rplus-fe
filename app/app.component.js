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
var account_service_1 = require("./service/account.service");
var session_service_1 = require("./service/session.service");
var upload_service_1 = require("./service/upload.service");
var suggestion_service_1 = require("./service/suggestion.service");
var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'rplus-app',
        styles: [""],
        template: "\n        <login-screen></login-screen>\n        <router-outlet></router-outlet>\n    ",
        providers: [hub_service_1.HubService, config_service_1.ConfigService, suggestion_service_1.SuggestionService, user_service_1.UserService, organisation_service_1.OrganisationService, person_service_1.PersonService, request_service_1.RequestService, offer_service_1.OfferService, task_service_1.TaskService, analysis_service_1.AnalysisService, history_service_1.HistoryService, photo_service_1.PhotoService, account_service_1.AccountService, session_service_1.SessionService, upload_service_1.UploadService]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map