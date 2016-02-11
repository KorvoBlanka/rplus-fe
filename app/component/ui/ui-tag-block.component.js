System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2;
    var UITagBlock;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            UITagBlock = (function () {
                function UITagBlock() {
                    this.tags = [
                        { id: 1, color: 'rgb(253, 123, 126)', selected_color: 'rgb(203, 73, 76)' },
                        { id: 2, color: 'rgb(254, 188, 70)', selected_color: 'rgb(204, 138, 20)' },
                        { id: 3, color: 'rgb(244, 229, 77)', selected_color: 'rgb(194, 179, 27)' },
                        { id: 4, color: 'rgb(180, 224, 66)', selected_color: 'rgb(130, 174, 16)' },
                        { id: 5, color: 'rgb(131, 201, 252)', selected_color: 'rgb(81, 151, 202)' },
                        { id: 6, color: 'rgb(228, 166, 252)', selected_color: 'rgb(178, 116, 202)' },
                        { id: 7, color: 'rgb(200, 200, 200)', selected_color: 'rgb(150, 150, 150)' }
                    ];
                    this.valueChange = new core_2.EventEmitter();
                }
                UITagBlock.prototype.ngOnInit = function () {
                    for (var i = 0; i < this.tags.length; i++) {
                        if (this.tags[i].id == this.value) {
                            this.selected = this.tags[i];
                            return;
                        }
                    }
                };
                UITagBlock.prototype.getBorderColor = function (tag) {
                    var val = 'rgb(255,255,255)';
                    if (this.selected == tag) {
                        val = tag.selected_color;
                    }
                    return val;
                };
                UITagBlock.prototype.select = function (tag) {
                    var val = null;
                    if (this.selected == tag) {
                        this.selected = null;
                    }
                    else {
                        this.selected = tag;
                        val = tag.id;
                    }
                    this.valueChange.emit({ value: val }); // из за этого эмита не срабатывает [class.selected]="v === value"
                };
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_2.EventEmitter)
                ], UITagBlock.prototype, "valueChange", void 0);
                UITagBlock = __decorate([
                    core_1.Component({
                        selector: 'ui-tag-block',
                        inputs: ['value'],
                        template: "\n    <div class=\"ui-tag-block\">\n      <div *ngFor=\"#tag of tags\" class=\"tag\" \n        [style.background-color]=\"tag.color\"\n        [style.border-color]=\"getBorderColor(tag)\"\n        (click)=\"select(tag)\"\n      >\n      </div>\n    </div>\n  ",
                        styles: ["\n    .ui-tag-block {\n      overflow: hidden;\n    }\n    .tag {\n      height: 14px;\n      width: 14px;\n      border-radius: 14px;\n      margin-right: 5px;\n      float: left;\n      border: 2px solid #fff;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], UITagBlock);
                return UITagBlock;
            }());
            exports_1("UITagBlock", UITagBlock);
        }
    }
});
//# sourceMappingURL=ui-tag-block.component.js.map