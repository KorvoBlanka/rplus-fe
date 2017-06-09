"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var UIAdvertising = (function () {
    function UIAdvertising() {
        this.platforms = [
            { select: false, name: 'Из рук в руки' },
            { select: false, name: 'Презент' },
            { select: false, name: 'Авито' },
            { select: false, name: 'Циан' },
            { select: false, name: 'ВНХ' },
            { select: false, name: 'Фарпост' },
            { select: false, name: 'Домофонд' },
            { select: false, name: 'Из рук в руки' },
            { select: false, name: 'Презент' },
            { select: false, name: 'Авито' },
            { select: false, name: 'Циан' },
            { select: false, name: 'ВНХ' },
            { select: false, name: 'Фарпост' },
            { select: false, name: 'Из рук в руки' },
            { select: false, name: 'Презент' },
            { select: false, name: 'Авито' },
            { select: false, name: 'Циан' },
            { select: false, name: 'ВНХ' },
            { select: false, name: 'Фарпост' },
            { select: false, name: 'Домофонд' },
            { select: false, name: 'Из рук в руки' },
            { select: false, name: 'Презент' },
            { select: false, name: 'Авито' },
            { select: false, name: 'Циан' },
            { select: false, name: 'ВНХ' },
            { select: false, name: 'Фарпост' },
            { select: false, name: 'Фарпост' },
            { select: false, name: 'Домофонд' },
            { select: false, name: 'Из рук в руки' },
            { select: false, name: 'Презент' },
            { select: false, name: 'Авито' },
            { select: false, name: 'Циан' },
            { select: false, name: 'ВНХ' },
            { select: false, name: 'Фарпост' },
            { select: false, name: 'Домофонд' }
        ];
    }
    UIAdvertising.prototype.ngOnInit = function () {
    };
    return UIAdvertising;
}());
UIAdvertising = __decorate([
    core_1.Component({
        selector: 'ui-advertising',
        inputs: [],
        template: "\n    <div class=\"ui-advertising\">\n        <div *ngFor=\"let platform of platforms; let i=index\" (click)=\"platform.select = !platform.select\">\n            <div class='button'>\n                <div *ngIf=\"platform.select\"></div>\n            </div>\n            <div class=\"name\">{{platform.name}}</div>\n        </div>\n    </div>\n  ",
        styles: ["\n      .ui-advertising{\n          cursor: pointer;\n      }\n      .ui-advertising>div{\n          height: 30px;\n          display: flex;\n          justify-content: flex-start;\n          align-items: center;\n      }\n\n      .ui-advertising>div:nth-child(odd){\n\n      }\n      .ui-advertising>div:nth-child(even){\n          background-color: #f1f3ef;\n      }\n      .button{\n          width: 10px;\n          height: 10px;\n          margin: 0 10px 0 20px;\n          background-color: #d4d4d4;\n          border: 1px solid #b2b2b2;\n          border-radius: 2px;\n      }\n      .button > div{\n          width: 15px;\n          height: 15px;\n          background-image: url(res/tick.png);\n          background-size: cover;\n          position: relative;\n          top: -6px;\n          left: 1px;\n      }\n      .name{\n          font-size: 10pt;\n          color: #5f5d5d;\n      }\n  "]
    })
], UIAdvertising);
exports.UIAdvertising = UIAdvertising;
//# sourceMappingURL=ui-advertising.component.js.map