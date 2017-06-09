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
var core_2 = require("@angular/core");
var UIDocument = (function () {
    function UIDocument() {
        this.fileChange = new core_2.EventEmitter();
    }
    UIDocument.prototype.ngOnInit = function () {
    };
    return UIDocument;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], UIDocument.prototype, "fileChange", void 0);
UIDocument = __decorate([
    core_1.Component({
        selector: 'ui-document',
        inputs: ['doc'],
        template: "\n        <div>\n            <div class='icon'></div>\n            <span class=\"label\">{{doc}}</span>\n\n        <div>\n    ",
        styles: ["\n        .icon{\n            width: 87px;\n            height: 55px;\n            background-image: url(res/document.png);\n            background-size: contain;\n            margin-top: 10px;\n            background-repeat: no-repeat;\n            background-position: center;\n        }\n\n        .label{\n            font-size: 9pt;\n            padding: 0 3px;\n            text-align: center;\n            width: 87px;\n            display: block;\n        }\n    "]
    })
], UIDocument);
exports.UIDocument = UIDocument;
//# sourceMappingURL=ui-document.component.js.map