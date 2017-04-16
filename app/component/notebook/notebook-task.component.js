"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var NotebookTask = (function () {
    function NotebookTask() {
    }
    return NotebookTask;
}());
NotebookTask = __decorate([
    core_1.Component({
        selector: 'notebook-task',
        styles: ["\n      .calendar{\n          width: calc(100%);\n          height: calc(70% - 50px);\n      }\n\n      .premap{\n          width: calc(100%);\n          height: calc(30% - 5px);\n          background-color: #f7f7f7;\n          padding: 0 10 0 10px;\n          border-top: 1px solid #e1e1e1;\n      }\n      hr{\n          margin: 0px 0px 9px 10px;\n          width: 100%;\n          position: relative;\n          bottom: -19;\n          border-color: rgb(222, 221, 221);\n      }\n\n      .map{\n\n      }\n\n    "],
        template: "\n        <div class=\"calendar\">\n            <almanac> </almanac>\n        </div>\n\n        <div class=\"premap\"><div class=\"map\">\n          <google-map\n            [latitude]=\"48.479257\"\n            [longitude]=\"135.063030\"\n            [zoom]=\"18\"\n            >\n        </google-map>\n        </div></div>\n    "
    })
], NotebookTask);
exports.NotebookTask = NotebookTask;
//# sourceMappingURL=notebook-task.component.js.map