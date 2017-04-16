/**
 * Created by owl on 2/6/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var StrNnPipe = (function () {
    function StrNnPipe() {
    }
    StrNnPipe.prototype.transform = function (value, args) {
        if (value) {
            return value;
        }
        return '';
    };
    return StrNnPipe;
}());
StrNnPipe = __decorate([
    core_1.Pipe({ name: 'strNn' })
], StrNnPipe);
exports.StrNnPipe = StrNnPipe;
//# sourceMappingURL=str-nn.pipe.js.map