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
var ui_tab_component_1 = require("./ui-tab.component");
var UITabs = (function () {
    function UITabs() {
    }
    UITabs.prototype.ngAfterContentInit = function () {
        if (!_hasActiveTab(this.tabs)) {
            this.selectTab(this.tabs.first);
        }
        function _hasActiveTab(tabs) {
            var activeTabs = tabs.filter(function (tab) { return tab.active; });
            return Boolean(activeTabs.length);
        }
    };
    UITabs.prototype.selectTab = function (tab) {
        _deactivateAllTabs(this.tabs.toArray());
        tab.selectTab();
        function _deactivateAllTabs(tabs) {
            tabs.forEach(function (tab) { return tab.active = false; });
        }
    };
    return UITabs;
}());
__decorate([
    core_1.ContentChildren(ui_tab_component_1.UITab),
    __metadata("design:type", core_1.QueryList)
], UITabs.prototype, "tabs", void 0);
UITabs = __decorate([
    core_1.Component({
        selector: 'ui-tabs',
        inputs: ['headerMode'],
        template: "\n        <div class=\"header\">\n            <div class=\"tabs\" [class.align-left]=\"headerMode\">\n                <div *ngFor=\"let tab of tabs\" class=\"tab-header\" (click)=\"selectTab(tab)\" [class.active]=\"tab.active\">\n                    <a href=\"#\">{{tab.title}}</a>\n                </div>\n            </div>\n        </div>\n        <ng-content></ng-content>\n    ",
        styles: ["\n        .tabs {\n            display: flex;\n            justify-content: center;\n        }\n        .tabs.align-left {\n            justify-content: flex-start; \n        }\n        .tab-header {\n            display: inline-block;\n            position: relative;\n            width: 180px;\n            border-right: 1px solid #eee;\n            text-align: center;\n        }\n        .tab-header:first-child {\n            border-left: 1px solid #eee;\n        }\n        .tab-header > a {\n            color: #aaa;\n        }\n        .tab-header.active > a {\n            color: #157ad3;\n        }\n        .tab-header.active::after {\n            content: '';\n            position: absolute;\n            left: 0;\n            top: 26px;\n            width: 80%;\n            margin-left: 10%;\n            height: 2px;\n            background-color: #157ad3;\n        }\n  "]
    }),
    __metadata("design:paramtypes", [])
], UITabs);
exports.UITabs = UITabs;
//# sourceMappingURL=ui-tabs.component.js.map