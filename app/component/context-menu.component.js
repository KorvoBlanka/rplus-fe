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
var ContextMenuComponent = (function () {
    function ContextMenuComponent(elementRef) {
        this.elementRef = elementRef;
        this.hidden = true;
        this.menu = {
            pX: 0,
            pY: 0,
            scrollable: false,
            items: []
        };
        this.flip = false;
        this.dummy = new core_1.EventEmitter();
    }
    ContextMenuComponent.prototype.click = function (e, item) {
        if (item.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (item.callback) {
            item.callback();
        }
    };
    ContextMenuComponent.prototype.docClick = function () {
    };
    ContextMenuComponent.prototype.ngOnInit = function () {
    };
    ContextMenuComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var cm_element = this.elementRef.nativeElement.querySelector('.context-menu-wrapper');
        console.log(this.hidden);
        if (this.menu && !this.hidden) {
            var pY = this.menu.pY;
            this.menu.pY = 1000;
            setTimeout(function (t) {
                _this.menu.pY = pY;
                if (cm_element.offsetHeight + _this.menu.pY > document.body.clientHeight) {
                    _this.menu.pY -= cm_element.offsetHeight;
                }
                if (cm_element.offsetWidth + _this.menu.pX > document.body.clientWidth) {
                    _this.menu.pX -= cm_element.offsetWidth;
                    _this.flip = true;
                }
            }, 0);
        }
    };
    return ContextMenuComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ContextMenuComponent.prototype, "dummy", void 0);
ContextMenuComponent = __decorate([
    core_1.Component({
        selector: 'context-menu',
        inputs: ['menu', 'hidden'],
        styles: ["\n        .context-menu-wrapper {\n            padding: 5 0;\n            max-height: 450px;\n            font-size: 12px;\n            position: absolute;\n            background-color: #fff;\n            border: 1px solid #eee;\n            z-index: 10;\n        }\n\n        .context-menu-scrollable {\n            overflow-y: auto;\n        }\n\n        .submenu-wrapper {\n            display: none;\n            position: absolute;\n            top: 0px;\n            left: 100%;\n\n            background-color: #fff;\n            border: 1px solid #eee;\n        }\n\n        .submenu-sc:hover:not(.disabled) > .submenu-wrapper {\n            display: block;\n        }\n\n        .submenu-sc:after {\n            display: block;\n            float: right;\n            width: 0;\n            height: 0;\n            margin-top: 5px;\n            margin-right: -10px;\n            border-color: transparent;\n            border-left-color: #666;\n            border-style: solid;\n            border-width: 5px 0 5px 5px;\n            content: \" \";\n        }\n\n        .entry {\n            padding: 3px 20px;\n            font-weight: normal;\n            line-height: 20px;\n            height: 20px;\n            color: #333;\n            white-space: nowrap;\n            min-width: 120px;\n            cursor: pointer;\n\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -khtml-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n        }\n\n        .entry_line {\n            padding: 3px 20px;\n            font-weight: normal;\n            line-height: 20px;\n            height: 40px;\n            color: #333;\n            white-space: nowrap;\n            min-width: 120px;\n        }\n\n        .entry:hover {\n            background-color: #eee;\n        }\n\n        .entry.disabled {\n            background-color: #fff;\n            color: #aaa;\n            cursor: not-allowed;\n        }\n\n        .flip {\n            left: -101%;\n        }\n\n        hr {\n            margin: 5px;\n        }\n    "],
        template: "\n        <div class=\"context-menu-wrapper\"\n            [style.left]=\"menu?.pX\"\n            [style.top]=\"menu?.pY\"\n            [class.context-menu-scrollable]=\"menu?.scrollable\"\n            [hidden]=\"hidden\"\n        (document:click)=\"docClick()\"\n        >\n            <div\n                *ngFor=\"let i of menu?.items\"\n                [ngSwitch]=\"i.class\"\n                (click)=\"click($event, i)\"\n            >\n                <div *ngSwitchCase=\"'submenu'\" class=\"entry submenu-sc\" [class.disabled]=\"i.disabled\" style=\"position: relative;\">\n                    <span *ngIf=\"i.icon\" class=\"icon-{{ i.icon }}\"></span>\n                    {{ i.label }}\n                    <div class=\"submenu-wrapper\" [class.flip]=\"flip\">\n                        <div\n                            *ngFor=\"let si of i.items\"\n                            [ngSwitch]=\"si.class\"\n                            (click)=\"click($event, si)\"\n                        >\n                            <div *ngSwitchCase=\"'entry'\" class=\"entry\" [class.disabled]=\"si.disabled\">\n                                <span *ngIf=\"si.icon\" class=\"icon-{{ si.icon }}\"></span>\n                                {{ si.label }}\n                            </div>\n                            <div *ngSwitchCase=\"'entry_cb'\" class=\"entry\" [class.disabled]=\"si.disabled\">\n                                <span *ngIf=\"si.value\" class=\"icon-check\"></span>\n                                <span *ngIf=\"!si.value\" class=\"icon-none\"></span>\n                                {{ si.label }}\n                            </div>\n                            <hr *ngSwitchCase=\"'delimiter'\">\n                        </div>\n                    </div>\n                </div>\n                <div *ngSwitchCase=\"'entry'\" class=\"entry\" [class.disabled]=\"i.disabled\">\n                    <span *ngIf=\"i.icon\" class=\"icon-{{ i.icon }}\"></span>\n                    {{ i.label }}\n                </div>\n                <div *ngSwitchCase=\"'entry_cb'\" class=\"entry\" [class.disabled]=\"i.disabled\">\n                    <span *ngIf=\"i.value\" class=\"icon-check\"></span>\n                    <span *ngIf=\"!i.value\" class=\"icon-none\"></span>\n                    {{ i.label }}\n                </div>\n                <div *ngSwitchCase=\"'tag'\" class=\"entry_line\">\n                    <span *ngIf=\"i.icon\" class=\"icon-{{ i.icon }}\"></span>\n                    {{ i.label }}\n                    <div>\n                        <span *ngFor=\"let si of i.items\" (click)=\"click($event, si)\"\n                            class=\"icon-{{ si.icon }}\"\n                        >\n                        </span>\n                    </div>\n                </div>\n                <hr *ngSwitchCase=\"'delimiter'\">\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ContextMenuComponent);
exports.ContextMenuComponent = ContextMenuComponent;
/* example
 contextMenu(e) {
 e.preventDefault();
 e.stopPropagation();
 this._hubService.shared_var['cm_px'] = e.pageX;
 this._hubService.shared_var['cm_py'] = e.pageY;
 this._hubService.shared_var['cm_hidden'] = false;
 this._hubService.shared_var['cm_items'] = [
 {class: "entry_cb", disabled: true, value: true, label: "пункт 1", callback: function() {alert('yay 1!')}},
 {class: "submenu", disabled: true, label: "пункт x", items: [
    {class: "entry", disabled: false, label: "пункт x1", callback: function() {alert('yay s1!')}},
    {class: "entry", disabled: false, label: "пункт x2", callback: function() {alert('yay s2!')}},
 ]},
 {class: "entry_cb", disabled: false, value: false, label: "пункт 2", callback: function() {alert('yay 2!')}},
 {class: "entry_cb", disabled: true, value: true, label: "пункт 3", callback: function() {alert('yay 3!')}},
 {class: "entry", disabled: false, icon: "cancel", label: "пункт 4", callback: function() {alert('yay 4!')}},
 {class: "delimiter"},
 {class: "entry", icon: "add", label: "пункт 5", callback: function() {alert('yay 5!')}},
 ];
 }*/
//# sourceMappingURL=context-menu.component.js.map