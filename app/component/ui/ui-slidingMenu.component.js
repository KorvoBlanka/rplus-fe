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
var UISlidingMenu = (function () {
    function UISlidingMenu() {
        this.hidden = true;
        this.onChange = new core_2.EventEmitter();
    }
    UISlidingMenu.prototype.ngOnInit = function () {
    };
    UISlidingMenu.prototype.toggleHidden = function (e) {
        this.hidden = !this.hidden;
        var parent = event.target.parentElement.parentElement.parentElement.parentElement;
        if (parent.offsetHeight == 30) {
            parent.style.setProperty('height', '' + (this.options.length * 26 + 30) + 'px');
        }
        else
            parent.style.setProperty('height', '30px');
    };
    UISlidingMenu.prototype.clickedOutside = function () {
        //this.closePanel();
        //this.hidden = true;
    };
    UISlidingMenu.prototype.select = function (opt, event) {
        this.value = opt.value;
        this.selected = opt;
        this.hidden = true;
        this.onChange.emit({ selected: opt });
        var parent = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        if (parent.offsetHeight == 30) {
            parent.style.setProperty('height', '80px');
        }
        else
            parent.style.setProperty('height', '30px');
    };
    UISlidingMenu.prototype.ngOnChanges = function () {
        var con = true;
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var o = _a[_i];
            if (this.value == o.value) {
                this.selected = o;
                con = false;
            }
        }
        if ((this.selected == null && this.options.length > 0) || con) {
            this.selected = this.options[0];
        }
    };
    return UISlidingMenu;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], UISlidingMenu.prototype, "onChange", void 0);
UISlidingMenu = __decorate([
    core_1.Component({
        selector: 'ui-slidingMenu',
        inputs: ['options', 'config', 'value', 'isUndependent'],
        template: "\n        <div class=\"ui-select\">\n            <div class=\"dropdown-toggle\"\n\n            >\n                <span *ngIf=\"config?.icon\" class=\"{{ config?.icon }}\"></span>\n                <span class = 'label'>{{ selected?.label }}</span>\n                <div class='arrow' (click)=\"toggleHidden($event)\"\n                (offClick)=\"clickedOutside($event)\"></div>\n                <span *ngIf=\"config?.drawArrow\" class=\"icon-triangle-down\"></span>\n            </div>\n            <ul class=\"dropdown-menu pull-right\" [hidden]=\"hidden\">\n                <li *ngFor=\"let opt of options\"\n                    [class.selected]=\"opt.value == selected?.value\"\n                    (click)=\"select(opt, $event)\"\n                >\n                    <label><span *ngIf=\"opt?.icon\" class=\"{{ opt?.icon }}\"></span> {{ opt.label }} </label>\n                </li>\n            </ul>\n        </div>\n    ",
        styles: ["\n        .label{\n            margin-right: 30px;\n            width: 143px;\n            display: inline-block;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n\n        .ui-select {\n            position: relative;\n        }\n\n        .dropdown-menu {\n            position: absolute;\n            top: 100%;\n            left: 0;\n            z-index: 1000;\n            float: left;\n            min-width: 160px;\n            padding: 5px 0;\n            margin: 5px 0 0;\n            font-size: 14px;\n            list-style: none;\n            background-clip: padding-box;\n        }\n\n        .dropdown-menu.pull-right {\n            right: 0;\n            left: auto;\n            width: 345px;\n        }\n\n        .dropdown-toggle {\n            display: inline-block;\n            width: 100%;\n            height: 100%;\n            max-width: 200px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-align: right;\n            background: #fff;\n            cursor: pointer;\n        }\n\n        .dropdown-menu>li>label {\n            display: block;\n            padding: 3px 20px;\n            clear: both;\n            font-weight: 400;\n            line-height: 1.42857143;\n            color: #0575b5;\n            white-space: nowrap;\n        }\n\n        .dropdown-menu>li:hover {\n            background-color: #efefef;\n        }\n\n        .dropdown-menu>li.selected>label {\n            background-color: #3366CC;\n            color: #fff;\n        }\n\n        .inline {\n            width: 120px;\n            display: inline-block;\n        }\n\n        .inline > .dropdown-toggle {\n            font-weight: 200;\n            font-size: 14px;\n        }\n\n        .arrow{\n            background-image: url(res/arrow.png);\n            width: 18px;\n            height: 10px;\n            background-size: cover;\n            margin: 0 10px;\n            background-position: center;\n            flex: 0 0 23px;\n            position: absolute;\n            top: 5px;\n            right: -10px;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [])
], UISlidingMenu);
exports.UISlidingMenu = UISlidingMenu;
//# sourceMappingURL=ui-slidingMenu.component.js.map