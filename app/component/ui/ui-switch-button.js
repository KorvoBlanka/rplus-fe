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
var UISwitchButton = (function () {
    function UISwitchButton() {
        this.value = false;
        this.newValue = new core_1.EventEmitter();
    }
    UISwitchButton.prototype.ngOnInit = function () {
    };
    UISwitchButton.prototype.ngOnChanges = function () {
    };
    UISwitchButton.prototype.reverse = function () {
        this.value = !this.value;
        this.newValue.emit(this.value);
    };
    return UISwitchButton;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], UISwitchButton.prototype, "newValue", void 0);
UISwitchButton = __decorate([
    core_1.Component({
        selector: 'ui-switch-button',
        inputs: ['value'],
        template: "\n        <div class=\"ui-switch\" (click)=\"reverse()\" [class.on]='value'>\n            <div [class.reverse]='value'>   </div>\n        </div>\n\n    ",
        styles: ["\n        .ui-switch{\n            width: 41px;\n            height: 20px;\n            background-color: silver;\n            border-radius: 20px;\n            cursor: pointer;\n            transition: all 0.5s;\n        }\n        \n        .ui-switch > div{\n            width: 17px;\n            height: 17px;\n            background-color: white;\n            border-radius: 20px;\n            position: relative;\n            top: 1px;\n            transform: translate(10%, 0);\n            transition: all 0.5s;\n        }\n\n        .ui-switch > .reverse{\n            position: relative;\n            transform: translate(133%, 0);\n        }\n        .on{\n            background-color: #3d9be9;\n            transition: all 0.5s;\n        }\n    "]
    })
], UISwitchButton);
exports.UISwitchButton = UISwitchButton;
//# sourceMappingURL=ui-switch-button.js.map