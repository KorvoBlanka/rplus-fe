"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var UIViewLine = (function () {
    function UIViewLine() {
        this.opacity = 1;
    }
    UIViewLine.prototype.ngOnInit = function () {
        if (this.value)
            this.opacity = 1;
        else
            this.opacity = 0;
    };
    UIViewLine.prototype.ngOnChanges = function () {
    };
    return UIViewLine;
}());
UIViewLine = __decorate([
    core_1.Component({
        selector: 'ui-view-line',
        inputs: ['placeholder', 'value'],
        template: "\n        <div class=\"ui-view-line\" [class.empty-ui]=\"value == ''\">\n            <span class=\"label\" *ngIf=\"value != ''\">{{placeholder}}</span>\n            <span class =\"value\" *ngIf=\"value != ''\">{{value}}</span>\n            <span class =\"emptyValue\" *ngIf=\"value == ''\">{{placeholder}}</span>\n            <span class =\"empty\" *ngIf=\"value == ''\">\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D</span>\n        </div>\n    ",
        styles: ["\n\n        .label{\n            font-size: 8pt;\n        }\n\n        .ui-view-line {\n            display: flex;\n            flex-direction: column;\n            width: 285;\n            height: 32px;\n            margin-top: -3px;\n        }\n\n        .value{\n            width: 100%;\n            text-align: left;\n            color: #696969;\n            font-size: 10pt;\n            height: 19px;\n        }\n\n        .empty-ui {\n            flex-direction: row;\n            justify-content: space-between;\n            width: 293px;\n        }\n\n        .emptyValue{\n            white-space: nowrap;\n            color: rgb(80, 80, 80);\n            margin-top: 8px;\n            font-size: 10pt;\n        }\n        .empty{\n            white-space: nowrap;\n            color: rgb(80, 80, 80);\n            margin-top: 8px;\n            font-size: 10pt;\n            margin-right: 10px;\n        }\n    "]
    })
], UIViewLine);
exports.UIViewLine = UIViewLine;
//# sourceMappingURL=ui-view-line.component.js.map