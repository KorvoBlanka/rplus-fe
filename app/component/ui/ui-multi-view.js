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
        var temp = [];
        for (var _i = 0, _a = this.values; _i < _a.length; _i++) {
            var val = _a[_i];
            if (val.value)
                temp.push(val);
        }
        this.values = temp;
        if (this.options) {
            for (var _b = 0, _c = this.options; _b < _c.length; _b++) {
                var opt = _c[_b];
                if (opt.value == this.values[0].type) {
                    this.type = opt.label;
                }
            }
        }
    };
    UIMultiView.prototype.ngOnChanges = function () {
        this.ngOnInit();
    };
    return UIMultiView;
}());
UIMultiView = __decorate([
    core_1.Component({
        selector: 'ui-multi-view',
        inputs: ['values', 'options'],
        template: "\n            <div style= \"margin-top: -6px;\"><div class=\"total\" *ngFor=\"let val of values\">\n                <span *ngIf=\"val.value && !options\">{{ val.type }}</span>\n                <span *ngIf=\"val.value && options\">{{ type }}</span>\n                <span [class.empty]=\"val.value.indexOf('\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D') > -1\">{{ val.value }}</span>\n\n            </div></div>\n    ",
        styles: ["\n\n        .total{\n            display: flex;\n            flex-direction: column;\n            height: 32px;\n            margin-right: 15px;\n            color: dimgrey;\n            float: left;\n            align-items: flex-end;\n        }\n\n        div>span:last-child{\n            margin-right: 0;\n            font-size: 9pt;\n            margin-top: -3px;\n        }\n\n        .total span:first-child{\n            font-size: 8pt;\n            color: #c0c0c0;\n            display: block;\n        }\n\n        .total:last-child{\n            margin-right: 0;\n        }\n        .empty{\n            margin-top: 10px !important;\n            font-size: 10pt !important;\n        }\n    "]
    })
], UIMultiView);
exports.UIMultiView = UIMultiView;
//# sourceMappingURL=ui-multi-view.js.map