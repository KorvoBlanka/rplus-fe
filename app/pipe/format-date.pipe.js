"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var moment = require("moment/moment");
var FormatDatePipe = (function () {
    function FormatDatePipe() {
    }
    FormatDatePipe.prototype.transform = function (value, args) {
        var r = '';
        if (value) {
            var d = moment(value * 1000);
            r = d.format('DD.MM.YY hh:mm');
        }
        return r;
    };
    return FormatDatePipe;
}());
FormatDatePipe = __decorate([
    core_1.Pipe({ name: 'formatDate' })
], FormatDatePipe);
exports.FormatDatePipe = FormatDatePipe;
//# sourceMappingURL=format-date.pipe.js.map