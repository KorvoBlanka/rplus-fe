/**
 * Created by Aleksandr on 23.11.16.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var UIViewValue = (function () {
    function UIViewValue() {
    }
    UIViewValue.prototype.ngOnInit = function () {
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var o = _a[_i];
            if (this.value == o.value) {
                this.selected = o;
            }
        }
        if (this.selected == null && this.options.length > 0) {
            this.selected = this.options[0];
        }
    };
    UIViewValue.prototype.getStyle = function () {
        if (this.Style)
            return this.Style;
        else
            return "";
    };
    return UIViewValue;
}());
UIViewValue = __decorate([
    core_1.Component({
        selector: 'ui-view-value',
        inputs: ['options', 'value', 'Style'],
        template: "\n        <div class=\"ui-view-value\" [ngStyle]=\"Style\">\n                {{ selected?.label }}\n        </div>\n    ",
        styles: ["\n        .ui-view-value{\n            width: 170px;\n            text-align: right;\n            color: #696969;\n            font-size: 10pt;\n            margin-top: 5px;\n            height: 19px;\n            margin-right: 20px;\n            text-overflow: ellipsis;\n            overflow: hidden;\n            white-space: nowrap;\n        }\n    "]
    })
], UIViewValue);
exports.UIViewValue = UIViewValue;
//# sourceMappingURL=ui-view-value.js.map