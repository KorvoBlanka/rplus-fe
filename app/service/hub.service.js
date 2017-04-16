"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var HubService = (function () {
    function HubService() {
        this.shared_var = {};
        this.stash = {
            some_prop: 'some_val',
            seenOffers: [],
            modifiedOffers: []
        };
    }
    HubService.prototype.getProperty = function (name) {
        return this.stash[name];
    };
    HubService.prototype.setProperty = function (name, val) {
        this.stash[name] = val;
    };
    return HubService;
}());
HubService = __decorate([
    core_1.Injectable()
], HubService);
exports.HubService = HubService;
//# sourceMappingURL=hub.service.js.map