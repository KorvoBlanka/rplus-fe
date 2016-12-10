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
var tab_1 = require("../class/tab");
var hub_service_1 = require("../service/hub.service");
var TabSystemComponent = (function () {
    function TabSystemComponent(_hubService) {
        this._hubService = _hubService;
        this.tabs = [];
        this.tabHeight = 0;
        this.vtHeight = 0;
        _hubService.setProperty('tab_sys', this);
    }
    ;
    TabSystemComponent.prototype.ngAfterContentInit = function () {
        this.addTab('main', {});
    };
    TabSystemComponent.prototype.calcTabHeight = function () {
        var nominalHeight = 160;
        var minimalHeight = 60;
        var h = document.body.clientHeight - (31 * 2); // - 2 buttons
        this.tabHeight = (h - this.tabs.length) / this.tabs.length;
        if (this.tabHeight > nominalHeight)
            this.tabHeight = nominalHeight;
        if (this.tabHeight < minimalHeight)
            this.tabHeight = minimalHeight;
        this.vtHeight = this.tabHeight - 60;
    };
    TabSystemComponent.prototype.selectTab = function (tab) {
        this.selectedTab = tab;
    };
    TabSystemComponent.prototype.addTab = function (type, args) {
        if (this.tabs.length < 10) {
            var newTab = new tab_1.Tab(this, type, args);
            this.tabs.push(newTab);
            this.calcTabHeight();
            this.selectedTab = newTab;
        }
    };
    TabSystemComponent.prototype.closeTab = function (tab) {
        var _this = this;
        var idx = this.tabs.indexOf(tab);
        this.tabs.splice(idx, 1);
        if (this.tabs.length == 0) {
            this.addTab('main', {});
        }
        else {
            if (this.selectedTab == tab) {
                this.selectedTab = this.tabs[idx ? (idx - 1) : 0];
            }
        }
        clearTimeout(this.to);
        this.to = setTimeout(function () {
            _this.calcTabHeight();
        }, 500);
    };
    return TabSystemComponent;
}());
TabSystemComponent = __decorate([
    core_1.Component({
        selector: 'tab-system',
        styles: ["\n    .tab-content {\n      margin-left: 30px;\n    }\n    .tab-list {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      overflow: hidden;\n      background-color: #ccc;\n    }\n    .tab {\n      width: 30px;\n      border-bottom: 1px solid #aaa;\n      cursor: pointer;\n    }\n    \n    .tab:hover {\n      background-color: #efefef;\n    }\n    \n    .tab.selected {\n      background-color: #fff;\n      border-bottom: 1px solid #fff;\n    }\n    .tab-button {\n      width: 30px;\n      height: 30px;\n      text-align: center;\n      line-height: 30px;\n      font-size: 12px !important;\n      cursor: pointer;\n      color: #666;\n    }\n    .tab-icon {\n      width: 30px;\n      height: 30px;\n      text-align: center;\n      line-height: 30px;\n      font-size: 16px !important;\n      color: #666;\n    }\n    .vertical-text-container {\n      position: relative;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden;\n    }\n    .vertical-text {\n      transform: rotate(-90deg);\n      transform-origin: 0 0;\n      position: absolute;\n      bottom: -25px;\n      line-height: 30px;\n    }\n    .header {\n      width: 100%;\n      height: 30px;\n      border-bottom: 1px solid rgba(0,0,0,.2);\n    }\n    "],
        template: "\n    <div class=\"tab-list\">\n    \n      <div class=\"header\">\n        <div class=\"tab-button\">\n        </div>\n      </div>\n    \n      <div class=\"tab\" *ngFor=\"let tab of tabs\"\n        [class.selected]=\"tab === selectedTab\"\n        (click)=\"selectTab(tab)\">\n        <div class=\"tab-button close-button\" (click)=\"closeTab(tab)\"><span class=\"icon-cancel\"></span></div>\n        <div class=\"vertical-text-container\" [style.height]=\"vtHeight\">\n          <div class=\"vertical-text\">{{ tab.header }}</div>\n        </div>\n        <div class=\"tab-icon\" style=\"display: block;\"><span class=\"icon-start\"></span></div>\n      </div>\n      <div class=\"tab-button\" (click)=\"addTab('main', {})\">\n        <span class=\"icon-add\"></span>\n      </div>\n    </div>\n    <div class=\"tab-content\">\n      <tab-root *ngFor=\"let tab of tabs\"\n        [hidden]=\"tab !== selectedTab\"\n        [tab]=\"tab\">\n      </tab-root>\n    </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService])
], TabSystemComponent);
exports.TabSystemComponent = TabSystemComponent;
//# sourceMappingURL=tab-system.component.js.map