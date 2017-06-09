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
var UIMultiSelect = (function () {
    function UIMultiSelect() {
        this.onChange = new core_2.EventEmitter();
    }
    UIMultiSelect.prototype.ngOnInit = function () {
        for (var i = 0; i < this.values.length; ++i) {
            if (!this.values[i].value || this.values[i].value == "" || this.values[i].value === undefined || this.values[i].value.length == 0) {
                this.values.splice(i, 1);
                i--;
            }
        }
        if (this.values.length == 1 && this.values[0].value === undefined) {
            this.values.pop();
        }
    };
    UIMultiSelect.prototype.ngOnChanges = function () {
        this.ngOnInit();
    };
    UIMultiSelect.prototype.ngDoCheck = function () {
        this.ngOnInit();
    };
    UIMultiSelect.prototype.add_field = function (event) {
        var parent = event.target.parentElement.parentElement.parentElement;
        var height = parent.getElementsByClassName('input_field').length * 36;
        parent.style.setProperty('height', "" + (height + 90) + 'px');
        this.values.push({ type: this.options[0].value, value: ' ' });
    };
    //Array.prototype.forEach.call(document.body.querySelectorAll("*[data-mask]"), applyDataMask);
    UIMultiSelect.prototype.selectValue = function (event, i) {
        //event.selected.value + '&' +
    };
    UIMultiSelect.prototype.changed = function (event, mas, i) {
        var field = event.target;
        if (this.masks[i] != '') {
            var mask = this.masks[i].split('');
            var oldStart = field.selectionStart;
            var oldEnd = field.selectionEnd;
            field.value = this.applyMask(this.stripMask(field.value), mask);
            field.selectionStart = oldStart;
            field.selectionEnd = oldEnd;
            field.setSelectionRange(field.value.length, field.value.length);
            field.focus();
        }
        this.values[this.values.indexOf(mas)].value = field.value;
        this.onChange.emit(this.values);
    };
    UIMultiSelect.prototype.applyMask = function (data, mask) {
        return mask.map(function (char) {
            if (char != '_')
                return char;
            if (data.length == 0)
                return char;
            return data.shift();
        }).join('');
    };
    UIMultiSelect.prototype.stripMask = function (maskedData) {
        function isDigit(char) {
            return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
    };
    UIMultiSelect.prototype.delete = function (event, i) {
        if (i >= 0) {
            this.values[i].value = null;
            this.onChange.emit(this.values);
            this.values.splice(i, 1);
        }
        this.resize_min(event);
    };
    UIMultiSelect.prototype.getValue = function (temp) {
        if (temp.indexOf(":") > -1)
            return temp.split(":")[1];
        else
            return temp;
    };
    UIMultiSelect.prototype.getPlaceholder = function (val) {
        return this.masks[0];
        //masks[values[i].split('.')[0]]
    };
    UIMultiSelect.prototype.resize_min = function (event) {
        var parent = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
        ;
        var height = parent.getElementsByClassName('input_field').length * 35;
        var arrow = parent.getElementsByClassName('arrow').length;
        if (arrow > 0 && this.values.length == 0) {
            parent.getElementsByClassName('input_line').item(0).value = "";
            parent.style.setProperty('height', "" + (height) + 'px');
            var field = parent.getElementsByTagName('ui-multiselect').item(0);
            var inputs = field.getElementsByTagName('input');
            if (inputs.length == 1) {
                field.style.setProperty('visibility', 'hidden');
            }
        }
        else {
            parent.style.setProperty('height', "" + (height + 18) + 'px');
        }
        parent.style.setProperty('overflow', "visible");
    };
    UIMultiSelect.prototype.resize_max = function (event) {
        var parent = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
        ;
        var height = parent.getElementsByClassName('input_field').length * 35;
        parent.style.setProperty('height', "" + (height + 18) + 'px');
        parent.style.setProperty('overflow', "visible");
    };
    return UIMultiSelect;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], UIMultiSelect.prototype, "onChange", void 0);
UIMultiSelect = __decorate([
    core_1.Component({
        selector: 'ui-multiselect',
        inputs: ['options', 'values', 'masks', 'width'],
        template: "\n        <div class=\"ui-multiselect\">\n            <div class=\"option_field\" *ngFor=\"let value of values; let i = index\" >\n                <ui-select class=\"value\" [style.width] = \"width\"\n                    [options] = \"options\"\n                    [value]=\"value.type\"\n                    [config] = \"{icon: 'select_arrow', drawArrow: false}\"\n                    (onChange)=\"value.type = $event.selected.value\">\n                </ui-select>\n                <input class = \"input_field\" type=\"text\" (keyup)=\"changed($event, value, i)\"\n                    placeholder=\"{{getPlaceholder(values[i])}}\" value=\"{{value.value}}\">\n                <div class=\"remove\" (click)=\"delete($event, i)\"></div>\n            </div>\n            <div class=\"add_button\" (click)=\"add_field($event)\" style=\"color: #3bb24b;\n                text-align: left;\n                cursor: pointer;\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</div>\n        </div>\n    ",
        styles: ["\n        .remove{\n            background-image: url(res/cross.png);\n            background-size: contain;\n            width: 15px;\n            height: 15px;\n        }\n\n        .input_field{\n            width: 130px;\n            border: 0;\n            color: #505050;\n        }\n        .label{\n            margin-right: 30px;\n        }\n\n        .ui-multiselect {\n            position: relative;\n        }\n\n        .option_field{\n            height: 25px;\n            width: 100%;\n            display: flex;\n            justify-content: space-between;\n            border-bottom: 1px solid silver;\n            margin-bottom: 10px;\n        align-items: center;\n        }\n\n        .value{\n            width: 40%;\n            height: 20px;\n            padding-right: 10px;\n            border-right: 1px solid silver;\n        }\n\n        .dropdown-menu {\n            position: absolute;\n            top: 100%;\n            left: 0;\n            z-index: 1000;\n            float: left;\n            min-width: 160px;\n            padding: 5px 0;\n            margin: 5px 0 0;\n            font-size: 14px;\n            list-style: none;\n            //background-color: #fff;\n            //border: 1px solid #ccc;\n            //border: 1px solid rgba(0,0,0,0.15);\n            background-clip: padding-box;\n        }\n\n        .dropdown-menu.pull-right {\n            right: 0;\n            left: auto;\n            width: 345px;\n        }\n\n        .dropdown-toggle {\n            display: inline-block;\n            width: 100%;\n            height: 100%;\n            max-width: 200px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-align: right;\n            background: #fff;\n            cursor: pointer;\n            margin-top: 5px;\n        }\n\n        .dropdown-menu>li>label {\n            display: block;\n            padding: 3px 20px;\n            clear: both;\n            font-weight: 400;\n            line-height: 1.42857143;\n            color: #333;\n            white-space: nowrap;\n        }\n\n        .dropdown-menu>li:hover {\n            background-color: #efefef;\n        }\n\n        .dropdown-menu>li.selected>label {\n            background-color: #3366CC;\n            color: #fff;\n        }\n\n        .inline {\n            width: 120px;\n            display: inline-block;\n        }\n\n        .inline > .dropdown-toggle {\n            font-weight: 200;\n            font-size: 14px;\n        }\n\n        .arrow{\n            background-image: url(res/arrow.png);\n            width: 23px;\n            height: 15px;\n            background-size: cover;\n            margin: 0 10px;\n            background-position: center;\n            flex: 0 0 23px;\n            position: absolute;\n            top: 5px;\n            right: -10px;\n        }\n    "]
    })
], UIMultiSelect);
exports.UIMultiSelect = UIMultiSelect;
//# sourceMappingURL=ui-multiselect.component.js.map