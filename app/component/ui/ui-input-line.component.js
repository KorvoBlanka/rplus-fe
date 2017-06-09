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
var person_service_1 = require("../../service/person.service");
var session_service_1 = require("../../service/session.service");
var organisation_service_1 = require("../../service/organisation.service");
var offer_1 = require("../../class/offer");
var UIInputLine = (function () {
    function UIInputLine(_suggestionService, _personService, _sessionService, _organisationService) {
        this._suggestionService = _suggestionService;
        this._personService = _personService;
        this._sessionService = _sessionService;
        this._organisationService = _organisationService;
        this.type = "text";
        this.sgList = [];
        this.opacity = 1;
        this.onChange = new core_2.EventEmitter();
    }
    UIInputLine.prototype.isClick = function (event) {
        if (this.queryTipe && this.queryTipe == "address") {
            var parent_1 = event.currentTarget.parentElement;
            while (parent_1.className.indexOf('view-group') == -1 && parent_1.className !== null) {
                parent_1 = parent_1.parentElement;
            }
            var field = parent_1.getElementsByTagName('ui-multiselect').item(0);
            if (field.style.getPropertyValue('visibility') == 'hidden') {
                field.style.setProperty('visibility', 'visible');
            }
            else if (field.style.getPropertyValue('visibility') == '') {
                field.style.setProperty('visibility', 'hidden');
            }
            var height = void 0;
            if (parent_1.getElementsByTagName('input').length > 0)
                height = parent_1.getElementsByTagName('input').length * 35;
            else
                height = (parent_1.getElementsByTagName('input').length - 1) * 35;
            if (parent_1.offsetHeight == 30) {
                //parent.style.setProperty('height', ""+(height+15)+'px');
                parent_1.style.setProperty('overflow', "visible");
            }
        }
    };
    UIInputLine.prototype.isClick1 = function (event) {
        if (this.queryTipe && this.queryTipe == "address") {
            var parent_2 = event.currentTarget.parentElement;
            while (parent_2.className.indexOf('view-group') == -1 && parent_2.className !== null) {
                parent_2 = parent_2.parentElement;
            }
            var field = parent_2.getElementsByTagName('ui-multiselect').item(0);
            var inputs = field.getElementsByTagName('input');
            if (inputs.length < 1) {
                if (field.style.getPropertyValue('visibility') == '') {
                    field.style.setProperty('visibility', 'hidden');
                }
                var height = void 0;
                if (parent_2.getElementsByTagName('input').length > 0)
                    height = parent_2.getElementsByTagName('input').length * 35;
                else
                    height = (parent_2.getElementsByTagName('input').length - 1) * 35;
                if (parent_2.offsetHeight == 30) {
                    //parent.style.setProperty('height', ""+(height+15)+'px');
                    parent_2.style.setProperty('overflow', "visible");
                }
            }
        }
    };
    UIInputLine.prototype.ngOnInit = function () {
        if (this.value)
            this.opacity = 1;
        else
            this.opacity = 0;
        this.searchQuery = this.value;
    };
    UIInputLine.prototype.getOpacity = function () {
        return this.opacity;
    };
    UIInputLine.prototype.setOpacity = function () {
        this.opacity = 1;
    };
    UIInputLine.prototype.editOpacity = function (event) {
        if (this.queryTipe) {
            this.searchParamChanged(event);
        }
        if (event.target.value == "")
            this.opacity = 0;
        else if (!this.queryTipe) {
            this.onChange.emit(event.target.value);
        }
    };
    UIInputLine.prototype.ngOnChanges = function () {
        this.searchQuery = this.value;
    };
    UIInputLine.prototype.docClick = function () {
        this.sgList = [];
    };
    UIInputLine.prototype.searchParamChanged = function (e) {
        var _this = this;
        if (this.searchQuery && this.searchQuery.length > 0) {
            var sq = this.searchQuery.split(" ");
            var lp = sq.pop();
            var q = sq.join(" ");
            this.sgList = [];
            if (lp.length > 0) {
                if (this.queryTipe == "address") {
                    this._suggestionService.list(this.searchQuery).subscribe(function (sgs) {
                        sgs.forEach(function (e) {
                            _this.sgList.push(e);
                        });
                    });
                }
                else if (this.queryTipe == "person") {
                    this._personService.list(this._sessionService.getUser(), null, this.searchQuery).subscribe(function (sgs) {
                        sgs.forEach(function (e) {
                            _this.sgList.push(e);
                        });
                    });
                }
                else if (this.queryTipe == "organisation") {
                    this._organisationService.list(this.searchQuery).subscribe(function (sgs) {
                        sgs.forEach(function (e) {
                            _this.sgList.push(e);
                        });
                    });
                }
            }
        }
        else if (this.queryTipe == "address") {
            var nullAddress = [
                { type: 'KRAY', value: null },
                { type: 'CITY', value: null },
                { type: 'DISTRICT', value: null },
                { type: 'STREET', value: null },
                { type: 'HOUSE', value: null },
                { type: 'HOUSING', value: null },
                { type: 'FLAT', value: null }
            ];
            this.onChange.emit(nullAddress);
            var parent_3 = event.target.parentElement.parentElement.parentElement;
            parent_3.style.setProperty('height', "" + (35) + 'px');
            var field = parent_3.getElementsByTagName('ui-multiselect').item(0);
            field.style.setProperty('visibility', 'hidden');
            parent_3.style.setProperty('overflow', "visible");
        }
    };
    UIInputLine.prototype.select = function (itm, event) {
        this.searchQuery = itm;
        if (this.queryTipe && this.queryTipe == "address") {
            this.isClick(event);
            var fullAddress = offer_1.Offer.parseAddress(itm);
            this.onChange.emit(fullAddress.reverse());
            var parent_4 = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            var height = fullAddress.length * 36;
            parent_4.style.setProperty('height', "" + (height + 56) + 'px');
        }
        else if (this.queryTipe && this.queryTipe == "person") {
            this.onChange.emit(itm);
        }
        else if (this.queryTipe && this.queryTipe == "organisation") {
            this.onChange.emit(itm);
        }
        this.sgList = [];
    };
    return UIInputLine;
}());
__decorate([
    core_2.Input(),
    __metadata("design:type", String)
], UIInputLine.prototype, "value", void 0);
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], UIInputLine.prototype, "onChange", void 0);
UIInputLine = __decorate([
    core_1.Component({
        selector: 'ui-input-line',
        inputs: ['placeholder', 'width', 'queryTipe', 'type'],
        template: "\n        <div class=\"ui-input-line\">\n            <span class=\"label\" [style.opacity]=\"getOpacity()\">{{placeholder}}</span>\n            <input type=\"{{type}}\" value = \"{{ value }}\" style = \"width: {{width}}\" class = \"input_line\" [(ngModel)]=\"searchQuery\"\n                (keydown) = \"setOpacity()\" (keyup) = \"editOpacity($event)\" placeholder = \"{{placeholder}}\"\n                (click) =\"isClick1($event)\" [class.short_field]=\"queryTipe\"\n            >\n\n            <div class=\"suggestions\" (document:click)=\"docClick()\" *ngIf=\"sgList.length > 0 && queryTipe\">\n                <ul *ngFor=\"let item of sgList\" >\n                    <li >\n                        <a (click)=\"select(item, $event)\" *ngIf=\"this.queryTipe == 'address'\">{{item}}</a>\n                        <a (click)=\"select(item, $event)\" *ngIf=\"this.queryTipe == 'organisation'\">{{item.name}}</a>\n                        <a (click)=\"select(item, $event)\" *ngIf=\"this.queryTipe == 'person'\">{{item.name}}</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
        styles: ["\n        .short_field{\n            width: 250px;\n        }\n        .input_line{\n            border: 0;\n            margin-top: -3px;\n            height: 19px;\n            color: dimgrey;\n            text-overflow: ellipsis;\n        }\n        .label{\n            font-size: 8pt;\n        }\n\n        .ui-input-line {\n            display: flex;\n            flex-direction: column;\n            height: 35px;\n            margin-top: -3px;\n        }\n\n        .option_field{\n            height: 25px;\n            width: 100%;\n            display: flex;\n            justify-content: space-between;\n            border-bottom: 1px solid silver;\n            margin-bottom: 10px;\n            align-items: center;\n        }\n        .suggestions{\n            position: absolute;\n            z-index: 100;\n            background-color: white;\n            left: -57px;\n            width: 370px;\n            margin-top: 35px;\n            border-bottom: 1px solid silver;\n            font-size: 10pt;\n        }\n\n        .suggestions ul{\n            list-style-type: none;\n            padding: 0 15px;\n            text-align: left;\n            margin: 0 0 10px 0;\n        }\n\n        .suggestions ul li{\n            cursor: default;\n        }\n        .suggestions  ul:hover {\n            background: #f7f7f7;\n            cursor: default;\n        }\n        .finder{\n            height: 28px;\n            position: relative;\n            left: -45;\n            width: 125%;\n            background-color: rgb(247, 247, 247);\n            border: 1px solid rgba(204, 204, 204, 0.47);\n            font-size: 10pt;\n        }\n    "]
    }),
    __metadata("design:paramtypes", [suggestion_service_1.SuggestionService,
        person_service_1.PersonService,
        session_service_1.SessionService,
        organisation_service_1.OrganisationService])
], UIInputLine);
exports.UIInputLine = UIInputLine;
//# sourceMappingURL=ui-input-line.component.js.map