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
var UICarousel = (function () {
    function UICarousel() {
        this.position = 0;
        this.editable = false;
        this.slide_width = 134;
        this.slider_pos = 0;
        this.tr_duration = '1s';
        this.busy = false;
    }
    UICarousel.prototype.slideLeft = function () {
        var _this = this;
        if (this.busy)
            return;
        this.busy = true;
        this.tr_duration = '1s';
        this.slider_pos = -this.slide_width;
        this.photos.push(this.photos[0]);
        setTimeout(function () {
            _this.tr_duration = '0s';
            _this.photos.shift();
            _this.slider_pos = 0;
            _this.busy = false;
        }, 1000);
    };
    UICarousel.prototype.slideRight = function () {
        var _this = this;
        if (this.busy)
            return;
        this.busy = true;
        this.tr_duration = '0s';
        this.slider_pos = -this.slide_width;
        this.photos.unshift(this.photos[this.photos.length - 1]);
        setTimeout(function () {
            _this.tr_duration = '1s';
            _this.slider_pos = 0;
        });
        setTimeout(function () {
            _this.photos.pop();
            _this.busy = false;
        }, 1000);
    };
    return UICarousel;
}());
UICarousel = __decorate([
    core_1.Component({
        selector: 'ui-carousel',
        inputs: ['photos'],
        template: "\n    <div class=\"ui-carousel\">\n\n      <a class=\"slide-left\" style=\"color: white; display: block;\" href=\"#\" (click)=\"slideLeft()\"><span class=\"icon-arrow-left\"></span></a>\n      <a class=\"slide-right\" style=\"color: white; display: block;\" href=\"#\" (click)=\"slideRight()\"><span class=\"icon-arrow-right\"></span></a>\n\n      <div class=\"ribbon\" [style.left]=\"slider_pos\" [style.transition-duration]=\"tr_duration\">\n\n        <div *ngFor=\"let photo of photos\" class=\"img-wrap pull-left\" style=\"margin-left: 1px;\">\n          <div class=\"img-overlay\" style=\"position: relative; display: inline-block;\">\n            <img class=\"carousel-img\" [attr.src]=\"photo\" style=\"height: 100px;\">\n          </div>\n        </div>\n\n      </div>\n\n    </div>\n  ",
        styles: ["\n    .class {\n      position: relative;\n    }\n\n    .ui-carousel {\n      position: relative;\n      height: 100px;\n      overflow: hidden;\n      margin: 0 -5px;\n\n    }\n\n    .ribbon {\n      height: 120px;\n      width: 1920px;\n      position: absolute;\n      top: 0;\n      left: 0;\n    }\n\n    .slide-left, .slide-right {\n      display: block;\n      position: absolute;\n      top: 0px;\n      outline: 0;\n      cursor: pointer;\n      text-decoration: none;\n      width: 50px;\n      height: 100px;\n      line-height: 100px;\n      background: #000;\n      opacity: 0.0;\n      text-align: center;\n      -webkit-transition: opacity 500ms linear;\n      -moz-transition: opacity 500ms linear;\n      -o-transition: opacity 500ms linear;\n      transition: opacity 500ms linear;\n\n      z-index: 1;\n    }\n    .slide-left {\n      left: 0px;\n    }\n    .slide-right {\n      right: 0px;\n    }\n\n    .ui-carousel:hover > .slide-left, .ui-carousel:hover > .slide-right {\n        opacity: 0.4;\n    }\n\n  "]
    }),
    __metadata("design:paramtypes", [])
], UICarousel);
exports.UICarousel = UICarousel;
//# sourceMappingURL=ui-carousel.component.js.map