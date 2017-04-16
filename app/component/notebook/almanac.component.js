"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Almanac = (function () {
    function Almanac() {
        this.mainDate = new Date();
        this.hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    }
    Almanac.prototype.getNameMonth = function () {
        switch (this.mainDate.getMonth()) {
            case 0: return "Января";
            case 1: return "Февраля";
            case 2: return "Марта";
            case 3: return "Апреля";
            case 4: return "Мая";
            case 5: return "Июня";
            case 6: return "Июля";
            case 7: return "Августа";
            case 8: return "Сентября";
            case 9: return "Октября";
            case 10: return "Ноября";
            case 11: return "Декабря";
        }
    };
    Almanac.prototype.getNameDay = function () {
        switch (this.mainDate.getDay()) {
            case 1: return "понедельник";
            case 2: return "вторник";
            case 3: return "среда";
            case 4: return "четверг";
            case 5: return "пятница";
            case 6: return "суббота";
            case 0: return "воскресенье";
        }
    };
    return Almanac;
}());
Almanac = __decorate([
    core_1.Component({
        selector: 'almanac',
        styles: ["\n      .main_date{\n          font-size: 20pt;\n          margin: 20px 0px 0px 25px;\n      }\n\n      .main_date>span{\n          color: silver;\n      }\n\n      .main_week{\n          color: rgba(0, 0, 0, 0.7);\n          text-transform: capitalize;\n          font-size: 14pt;\n          margin: 0px 0px 0px 25px;\n          font-weight: lighter;\n      }\n\n      @font-face {\n          font-family: MyFont;\n          src: url(fonts/9652.ttf);\n      }\n\n      hr{\n          margin: 15px auto 0px 0px;\n          width: 100%;\n          border: 0;\n          border-bottom: 1px solid rgba(127, 125, 125, 0.19);\n      }\n\n      .hours{\n          height: calc(100% - 65px);\n          overflow-y: scroll;\n          background-color: white;\n      }\n\n      .hours > div{\n          display: flex;\n          height: 30px;\n          align-items: flex-end;\n          margin-left: 10px;\n      }\n\n      .hours > div >span{\n          font-size: 8pt;\n          color: rgba(204, 204, 204, 0.94);\n          margin-left: 35px;\n      }\n\n      .hours > div >div{\n          width: 280px;\n          border-bottom: 1px solid rgba(185, 185, 185, 0.4);\n          margin-left: 10px;\n      }\n\n      ::-webkit-scrollbar {\n          width: 0px;\n      }\n\n    "],
        template: "\n        <div class=\"main_date\">{{mainDate.getDate()}} {{getNameMonth()}} <span>{{mainDate.getFullYear()}}</span> \u0433.</div>\n        <div class=\"main_week\">{{getNameDay()}}</div>\n        <hr>\n        <div class=\"hours\">\n            <div *ngFor=\"let hour of hours\">\n                <span><span *ngIf=\"hour<10\">0</span>{{hour}}:00</span><div></div>\n            </div>\n        </div>\n    "
    })
], Almanac);
exports.Almanac = Almanac;
//# sourceMappingURL=almanac.component.js.map