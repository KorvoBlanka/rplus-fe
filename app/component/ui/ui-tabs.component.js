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
        var _this = this;
        this.iconUrls = [];
        this.iconUrls_active = [];
        this.currentUrl = [];
        this.color = '#3d9be9';
        setTimeout(function () {
            if (_this.iconUrls) {
                _this.currentUrl[0] = _this.iconUrls_active[0];
                for (var i = 1; i < _this.iconUrls.length; ++i) {
                    _this.currentUrl.push(_this.iconUrls[i]);
                }
            }
        }, 100);
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
        this._deactivateAllTabs(this.tabs.toArray());
        this.currentUrl[0] = this.iconUrls[0];
        this.currentUrl[1] = this.iconUrls[1];
        this.currentUrl[2] = this.iconUrls[2];
        tab.selectTab();
    };
    UITabs.prototype._deactivateAllTabs = function (tabs) {
        tabs.forEach(function (tab) { return tab.active = false; });
    };
    UITabs.prototype.selectedIcon = function (act, i) {
        //if(iconUrls_active && iconUrls){
        if (act)
            return this.iconUrls_active[i] || '';
        else {
            return this.currentUrl[i];
        }
        ;
        //}
    };
    UITabs.prototype.setIcon = function (i, act, event) {
        if (event.target.classList[0] == "tab-header") {
            if (event.target.className != "tab-header active") {
                if (act)
                    this.currentUrl[i] = this.iconUrls_active[i];
                else {
                    this.currentUrl[i] = this.iconUrls[i];
                }
            }
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
        inputs: ['headerMode', 'iconUrls', 'iconUrls_active', 'color'],
        template: "\n        <div class=\"head\" [style.border-bottom-color] = \"color\">\n            <div class=\"tabs\" [class.align-left]=\"headerMode\">\n                <div *ngFor=\"let tab of tabs; let i = index;\" class=\"tab-header\"\n                 (click)=\"selectTab(tab)\" [class.active]=\"tab.active\"\n                 [ngStyle]=\"{'background-image': 'url(' + selectedIcon(tab.active, i) + ')'}\"\n                 (mouseover) = \"setIcon(i, true, $event)\"\n                 (mouseout) = \"setIcon(i, false, $event)\">\n                    {{tab.title}}\n                </div>\n            </div>\n        </div>\n        <ng-content></ng-content>\n    ",
        styles: ["\n        .head{\n            height: 110px;\n            display: flex;\n            border-bottom: 4px solid;\n        }\n        .tabs {\n            display: flex;\n            margin-top: 15px;\n            height: 70px;\n            width: 170px;\n            justify-content: center;\n            margin-left: 50px;\n        }\n        .tabs.align-left {\n            justify-content: flex-start;\n        }\n        .tab-header {\n            width: 70px;\n            height: 50px;\n            font-size: 11px;\n            background-size: contain;\n            background-repeat: no-repeat;\n            background-position: center;\n            color: #6b6c6d;\n            line-height: 120px;\n            text-align: center;\n        }\n        .tab-header:first-child {\n            //width: 80px;\n        }\n\n        .tab-header:hover {\n        }\n\n        .tab-header > span {\n            color: #aaa;\n            margin-top: 40px;\n            margin-left: -15px;\n            display: block;\n        }\n        .tab-header.active > a {\n            color: #157ad3;\n        }\n        .tab-header.active::after {\n            /*content: '';\n            position: absolute;\n            left: 0;\n            top: 26px;\n            width: 80%;\n            margin-left: 10%;\n            height: 2px;\n            background-color: #157ad3;/*\n        }\n  "]
    }),
    __metadata("design:paramtypes", [])
], UITabs);
exports.UITabs = UITabs;
//# sourceMappingURL=ui-tabs.component.js.map