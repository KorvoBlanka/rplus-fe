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
var suggestion_service_1 = require("../../service/suggestion.service");
var offer_1 = require("../../class/offer");
var UIInputLine = (function () {
    function UIInputLine(_suggestionService) {
        this._suggestionService = _suggestionService;
        this.searchQuery = '';
        this.sgList = [];
        this.opacity = 1;
        this.onChange = new core_2.EventEmitter();
    }
    UIInputLine.prototype.isClick = function (event) {
        if (this.isAddress) {
            var parent_1 = event.currentTarget.parentElement.parentElement.parentElement;
            var height = void 0;
            if (parent_1.getElementsByTagName('input').length > 0)
                height = parent_1.getElementsByTagName('input').length * 35;
            else
                height = (parent_1.getElementsByTagName('input').length - 1) * 35;
            if (parent_1.offsetHeight == 30) {
                parent_1.style.setProperty('height', "" + (height + 15) + 'px');
                parent_1.style.setProperty('overflow', "visible");
            }
        }
    };
    UIInputLine.prototype.ngOnInit = function () {
        if (this.value)
            this.opacity = 1;
        else
            this.opacity = 0;
    };
    UIInputLine.prototype.getOpacity = function () {
        return this.opacity;
    };
    UIInputLine.prototype.setOpacity = function () {
        this.opacity = 1;
    };
    UIInputLine.prototype.editOpacity = function (event) {
        if (this.isAddress)
            this.searchParamChanged(event);
        if (event.target.value == "")
            this.opacity = 0;
        else if (!this.isAddress)
            this.onChange.emit(event.target.value);
    };
    UIInputLine.prototype.ngOnChanges = function () {
    };
    UIInputLine.prototype.searchParamChanged = function (e) {
        var _this = this;
        if (this.searchQuery.length > 0) {
            var sq = this.searchQuery.split(" ");
            var lp = sq.pop();
            var q = sq.join(" ");
            this.sgList = [];
            if (lp.length > 0) {
                this._suggestionService.list(this.searchQuery).subscribe(function (sgs) {
                    sgs.forEach(function (e) {
                        _this.sgList.push(e);
                    });
                });
            }
        }
    };
    UIInputLine.prototype.select = function (itm, event) {
        this.searchQuery = itm;
        var fullAddress = offer_1.Offer.parseAddress(itm);
        this.onChange.emit(fullAddress.reverse());
        this.sgList = [];
        var parent = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        var height = fullAddress.length * 36;
        parent.style.setProperty('height', "" + (height + 56) + 'px');
    };
    return UIInputLine;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], UIInputLine.prototype, "onChange", void 0);
UIInputLine = __decorate([
    core_1.Component({
        selector: 'ui-input-line',
        inputs: ['placeholder', 'value', 'width', 'isAddress'],
        template: "\n        <div class=\"ui-input-line\">\n            <span class=\"label\" [style.opacity]=\"getOpacity()\">{{placeholder}}</span>\n            <input type=\"text\" value = \"{{ value }}\" style = \"width: {{width}}\" class = \"input_line\" [(ngModel)]=\"searchQuery\"\n                (keydown) = \"setOpacity()\" (keyup) = \"editOpacity($event)\" placeholder = \"{{placeholder}}\"\n                (click) =\"isClick($event)\" [class.short_field]=\"isAddress\"\n            >\n\n            <div class=\"suggestions\" (document:click)=\"docClick()\" *ngIf=\"sgList.length > 0 && isAddress\">\n                <ul *ngFor=\"let item of sgList\" >\n                    <li >\n                        <a (click)=\"select(item, $event)\">{{item}}</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
        styles: ["\n        .short_field{\n            width: 250px;\n        }\n        .input_line{\n            border: 0;\n            margin-top: -3px;\n            height: 19px;\n            color: dimgrey;\n            text-overflow: ellipsis;\n        }\n        .label{\n            font-size: 8pt;\n        }\n\n        .ui-input-line {\n            display: flex;\n            flex-direction: column;\n            height: 35px;\n            margin-top: -3px;\n        }\n\n        .option_field{\n            height: 25px;\n            width: 100%;\n            display: flex;\n            justify-content: space-between;\n            border-bottom: 1px solid silver;\n            margin-bottom: 10px;\n            align-items: center;\n        }\n        .suggestions{\n            position: absolute;\n            z-index: 100;\n            background-color: white;\n            left: -57px;\n            width: 370px;\n            margin-top: 35px;\n            border-bottom: 1px solid silver;\n            font-size: 10pt;\n        }\n\n        .suggestions ul{\n            list-style-type: none;\n            padding: 0 15px;\n            text-align: left;\n            margin: 0 0 10px 0;\n        }\n\n        .suggestions ul li{\n            cursor: default;\n        }\n        .suggestions  ul:hover {\n            background: #f7f7f7;\n            cursor: default;\n        }\n        .finder{\n            height: 28px;\n            position: relative;\n            left: -45;\n            width: 125%;\n            background-color: rgb(247, 247, 247);\n            border: 1px solid rgba(204, 204, 204, 0.47);\n            font-size: 10pt;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [suggestion_service_1.SuggestionService])
], UIInputLine);
exports.UIInputLine = UIInputLine;
//# sourceMappingURL=ui-input-line.component.js.map