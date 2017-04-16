"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var UIMultiView = (function () {
    function UIMultiView() {
    }
    UIMultiView.prototype.ngOnInit = function () {
        console.log(this.values);
    };
    return UIMultiView;
}());
UIMultiView = __decorate([
    core_1.Component({
        selector: 'ui-multi-view',
        inputs: ['values'],
        template: "\n            <div><div class=\"total\" *ngFor=\"let val of values\">\n                <span *ngIf='val.value'>{{ val.type }}</span>\n                <span>{{ val.value }}</span>\n            </div></div>\n    ",
        styles: ["\n\n        .total{\n            display: inline-block;\n            flex-direction: column;\n            height: 32px;\n            margin-right: 15px;\n            margin-top: -3px;\n            color: dimgrey;\n        }\n\n        div>div:last-child{\n            margin-right: 0;\n        }\n\n        .total span:first-child{\n            font-size: 8pt;\n            color: #c0c0c0;\n            display: block;\n        }\n\n        .total span:last-child{\n            margin-top: -3px;\n        }\n    "]
    })
], UIMultiView);
exports.UIMultiView = UIMultiView;
//# sourceMappingURL=ui-multi-view.js.map