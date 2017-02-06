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
var UITag = (function () {
    function UITag() {
        this.tags = [
            { id: 1, color: 'rgb(253, 123, 126)', selected_color: 'rgb(203, 73, 76)' },
            { id: 2, color: 'rgb(254, 188, 70)', selected_color: 'rgb(204, 138, 20)' },
            { id: 3, color: 'rgb(244, 229, 77)', selected_color: 'rgb(194, 179, 27)' },
            { id: 4, color: 'rgb(180, 224, 66)', selected_color: 'rgb(130, 174, 16)' },
            { id: 5, color: 'rgb(131, 201, 252)', selected_color: 'rgb(81, 151, 202)' },
            { id: 6, color: 'rgb(228, 166, 252)', selected_color: 'rgb(178, 116, 202)' },
            { id: 7, color: 'rgb(200, 200, 200)', selected_color: 'rgb(150, 150, 150)' }
        ];
    }
    UITag.prototype.getColor = function (id) {
        for (var i = 0; i < this.tags.length; i++) {
            if (this.tags[i].id == id) {
                return this.tags[i].color;
            }
        }
        return 'rgba(255, 255, 255, 0)';
    };
    return UITag;
}());
UITag = __decorate([
    core_1.Component({
        selector: 'ui-tag',
        inputs: ['value'],
        template: "\n    <div class=\"tag\" \n        [style.background-color]=\"getColor(value)\"\n    >\n    </div>\n  ",
        styles: ["\n    .tag {\n      height: 14px;\n      width: 14px;\n      border-radius: 14px;\n      margin-right: 5px;\n      float: left;\n      border: 0px solid #fff;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [])
], UITag);
exports.UITag = UITag;
//# sourceMappingURL=ui-tag.component.js.map