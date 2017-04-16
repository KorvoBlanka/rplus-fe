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
var hub_service_1 = require("../service/hub.service");
var NotebookComponent = (function () {
    function NotebookComponent(_hubService) {
        this._hubService = _hubService;
        this.hidden = true;
        this.eventHidden = true;
        this.menuNumber = 0;
        this.widthChange = new core_1.EventEmitter();
        this._hubService.shared_var['nb_width'] = 1;
    }
    NotebookComponent.prototype.toggleNotebook = function () {
        this.hidden = !this.hidden;
        this.emitWidth();
    };
    NotebookComponent.prototype.toggleEvent = function () {
        this.eventHidden = !this.eventHidden;
        this.emitWidth();
    };
    NotebookComponent.prototype.emitWidth = function () {
        var w = 1;
        if (!this.hidden) {
            // TODO: wtf 371?!
            w += 371;
            if (!this.eventHidden) {
                w += 371;
            }
        }
        this._hubService.shared_var['nb_width'] = w;
        this.widthChange.emit({ value: w });
    };
    NotebookComponent.prototype.selectMenu = function (num) {
        this.menuNumber = num;
    };
    return NotebookComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NotebookComponent.prototype, "widthChange", void 0);
NotebookComponent = __decorate([
    core_1.Component({
        selector: 'notebook',
        styles: ["\n        .notebook {\n          position: absolute;\n          top: 0px;\n          right: 0px;\n          height: 100%;\n          background-color: rgba(247, 247, 247, 1);;\n          z-index: 3;\n        }\n        .head {\n            width: 100%;\n            height: 0;\n\n        }\n        .notebook > .border-stripe {\n            width: 30px;\n            height: 100%;\n            background-color: #ccc;\n            float: right;\n        }\n        .notebook > .main-tab {\n            width: 370px;\n            height: 100%;\n            float: right;\n        }\n\n        .notebook > .main-tab > .main_menu {\n            display: flex;\n            justify-content: center;\n            padding: 0;\n            margin: 25px 10 0;\n            border: 1px solid #0e60c5;\n        }\n\n        .notebook > .main-tab > .main_menu > li {\n            display: inline-block;\n            padding: 2px 10px;\n            color: rgb(14, 96, 197);\n            border-left: 1px solid #0e60c5;\n            flex-grow: 2;\n            font-size: 12px;\n            text-align: center;\n        }\n\n        .notebook > .main-tab > .main_menu > .menu_active {\n            color: #fff;\n            background-color: #0e60c5;\n            border: 0;\n        }\n\n        .notebook > .event-tab {\n            width: 370px;\n            height: 100%;\n            float: right;\n            border-left: 1px solid #ccc;\n        }\n        .tab-button {\n            width: 30px;\n            height: 30px;\n            text-align: center;\n            line-height: 30px;\n            font-size: 12px !important;\n            cursor: pointer;\n            color: #666;\n            position: absolute;\n            left: 0px;\n        }\n\n        notebook-task{\n           display: flex;\n           flex-wrap: wrap;\n        }\n\n        .forever_menu{\n            width: 35px;\n            height: 150px;\n            position: absolute;\n            background-color: #0b9700;\n            top: calc(50% - 75px);\n            right: 0;\n            display: flex;\n            flex-wrap: wrap;\n            align-content: space-around;\n            justify-content: center;\n            z-index: 999;\n        }\n        .forever_menu > div{\n            width: 35px;\n            height: 35px;\n            background-size: 70% 70%;\n            background-repeat: no-repeat;\n            background-position: center;\n        }\n\n        .forever_menu > div:hover {\n            background-color: #127d0a;\n        }\n\n        .forever_menu > hr{\n            width: 35px;\n            margin: 0;\n            border-color: #4aa24a;\n\n        }\n    "],
        template: "\n        <div class='forever_menu' (click)=\"toggleNotebook()\"    >\n            <div (click) = \"selectMenu(0)\" style=\"background-image: url(res/task.png);\"></div>\n             <hr>\n            <div (click) = \"selectMenu(1)\" style=\"background-image: url(res/notes.png);\"></div>\n             <hr>\n            <div (click) = \"selectMenu(2)\" style=\"background-image: url(res/phone.png);\"></div>\n             <hr>\n            <div (click) = \"selectMenu(3)\" style=\"background-image: url(res/chat.png);\"></div>\n        </div>\n        <div class=\"notebook\">\n            <div class=\"head\">\n                <div class=\"tab-button\" (click)=\"toggleNotebook()\">\n                    <span [ngClass]=\"{'icon-arrow-left': hidden, 'icon-arrow-right': !hidden}\"></span>\n                </div>\n            </div>\n            <div class=\"event-tab\" [hidden]=\"hidden || eventHidden\">\n                <div class=\"head\"></div>\n            </div>\n            <div class=\"main-tab\" [hidden]=\"hidden\" (click)=\"toggleEvent()\">\n                <ul class = \"main_menu\">\n                  <li (click) = \"selectMenu(0)\" [class.menu_active] = \"menuNumber == 0\">\u0417\u0430\u0434\u0430\u0447\u0438</li>\n                  <li (click) = \"selectMenu(1)\" [class.menu_active] = \"menuNumber == 1\">\u0417\u0430\u043C\u0435\u0442\u043A\u0438</li>\n                  <li (click) = \"selectMenu(2)\" [class.menu_active] = \"menuNumber == 2\">IP-\u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0438\u044F</li>\n                  <li (click) = \"selectMenu(3)\" [class.menu_active] = \"menuNumber == 3\">\u0427\u0430\u0442</li>\n                </ul>\n                <notebook-task *ngIf=\"menuNumber == 0\">  </notebook-task>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService])
], NotebookComponent);
exports.NotebookComponent = NotebookComponent;
//# sourceMappingURL=notebook.component.js.map