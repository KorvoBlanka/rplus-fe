"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var TabRootComponent = (function () {
    function TabRootComponent() {
    }
    return TabRootComponent;
}());
TabRootComponent = __decorate([
    core_1.Component({
        selector: 'tab-root',
        inputs: ['tab'],
        template: "\n    <div [ngSwitch]=\"tab.type\">\n        <tab-main [tab]=\"tab\" *ngSwitchCase=\"'main'\"></tab-main>\n        <tab-list-offer [tab]=\"tab\" *ngSwitchCase=\"'list_offer'\"></tab-list-offer>\n        <tab-offer [tab]=\"tab\" *ngSwitchCase=\"'offer'\"></tab-offer>\n        <tab-list-person [tab]=\"tab\" *ngSwitchCase=\"'list_person'\"></tab-list-person>\n        <tab-person [tab]=\"tab\" *ngSwitchCase=\"'person'\"></tab-person>\n        <tab-list-organisation [tab]=\"tab\" *ngSwitchCase=\"'list_organisation'\"></tab-list-organisation>\n        <tab-organisation [tab]=\"tab\" *ngSwitchCase=\"'organisation'\"></tab-organisation>\n        <tab-list-request [tab]=\"tab\" *ngSwitchCase=\"'list_request'\"></tab-list-request>\n        <tab-request [tab]=\"tab\" *ngSwitchCase=\"'request'\"></tab-request>\n    \n        <tab-list-user [tab]=\"tab\" *ngSwitchCase=\"'list_users'\"></tab-list-user>\n        <tab-user [tab]=\"tab\" *ngSwitchCase=\"'user'\"></tab-user>\n    \n        <div *ngSwitchDefault>tab.type == {{ tab.type }}</div>\n    </div>\n    "
    })
], TabRootComponent);
exports.TabRootComponent = TabRootComponent;
//# sourceMappingURL=tab-root.component.js.map