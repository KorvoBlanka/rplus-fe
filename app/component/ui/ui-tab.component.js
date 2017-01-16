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
var core_2 = require("@angular/core");
var UITab = (function () {
    function UITab() {
        this.active = false;
        this.tabSelect = new core_2.EventEmitter();
    }
    UITab.prototype.selectTab = function () {
        this.active = true;
        this.tabSelect.emit(this);
    };
    return UITab;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], UITab.prototype, "tabSelect", void 0);
UITab = __decorate([
    core_1.Component({
        selector: 'ui-tab',
        inputs: [
            'title',
            'active'
        ],
        styles: [""],
        template: "\n    <div [hidden]=\"!active\" style=\"position: relative;\">\n      <ng-content></ng-content>\n    </div>\n  "
    })
], UITab);
exports.UITab = UITab;
//# sourceMappingURL=ui-tab.component.js.map