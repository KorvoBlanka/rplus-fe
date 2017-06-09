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
var hub_service_1 = require("../../service/hub.service");
var DigestColumnChartComponent = (function () {
    function DigestColumnChartComponent(_hubService) {
        this._hubService = _hubService;
        this.hard_data = false;
        this.data = [];
        this.height = "160px";
        this.width = "300px";
        this.graph_width = 100;
    }
    ;
    DigestColumnChartComponent.prototype.ngOnInit = function () {
    };
    DigestColumnChartComponent.prototype.ngOnChanges = function () {
    };
    DigestColumnChartComponent.prototype.abs = function (num) {
        return Math.abs(num);
    };
    DigestColumnChartComponent.prototype.calcWidth = function (num) {
        return "" + Math.round(this.graph_width * num / 100) + 'px';
    };
    return DigestColumnChartComponent;
}());
DigestColumnChartComponent = __decorate([
    core_1.Component({
        selector: 'digest-column-chart',
        inputs: ['data', 'header', 'hard_data', 'height', 'result', 'graph_width', 'width'],
        styles: ["\n        .container {\n            background-color: white;\n            font-size: 16px;\n            position: relative;\n            display: inline-block;\n            min-height: 160px;\n        }\n        .head{\n            text-transform: uppercase;\n            color: #4c4c4c;\n            margin: 7px 0 20px 10px;\n            position: relative;\n            z-index: 10;\n        }\n        .chart{\n            margin: 0 10px;\n        }\n        .chart>div{\n            width: 100%;\n            height: inherit;\n            display: flex;\n            justify-content: space-between;\n        }\n\n        .chart .label{\n            font-size: 12px;\n            color: rgba(101, 101, 101, 0.81);\n        }\n\n        .chart .column{\n            height: 20px;\n            background-color: #927bc6;\n            margin-bottom: 3px;\n            align-items: center;\n            display: flex;\n        }\n\n        .chart .column>div{\n            background-color: #e1d4e1;\n            height: inherit;\n            line-height: 20px;\n        }\n\n        .total{\n            font-size: 20pt;\n            color: rgba(0, 0, 0, 0.67);\n            margin-left: 10px;\n            margin-top: 5px;\n            height: 30px;\n            display: flex;\n            align-items: center;\n            position: absolute;\n            top: 0;\n            right: 5;\n        }\n\n        .total>div:nth-child(1){\n            float: left;\n            margin-right: 10px;\n        }\n\n        .total>div:nth-child(2){\n            font-size: 16pt;\n        }\n\n        .total>div:nth-child(2):after{\n            font-size: 14pt;\n            position: relative;\n            top: -2px;\n        }\n\n        .red{\n            color: red;\n        }\n        .green{\n            color: green;\n        }\n\n    "],
        template: "\n        <div class=\"container\" [style.height]=\"height\" [style.width]=\"width\">\n            <div class=\"head\">{{header}}</div>\n            <div style=\"margin-left: 10px; height: calc(100% - 74px);\">\n                <div class=\"chart\">\n                    <div *ngFor=\"let dt of data\">\n                        <div class=\"label\">{{dt[0]}}</div>\n                        <div class=\"column\" [style.width]=\"graph_width\">\n                            <div [style.width]=\"calcWidth(dt[1])\">\n                                <span style=\"font-size: 13px; color: black; margin-left: 5px;\">{{dt[1]+ \"%\"}}</span>\n                            </div>\n                            <span style=\"color: white; font-size: 13px; margin-left: 5px;\">{{(100-dt[1])+'%'}}</span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"total\" *ngIf=\"result\">\n                <div>{{result[0]}}</div>\n                <div *ngIf=\"hard_data\"\n                    [class.green]=\"result[1] > 0\" [class.icon_plus]=\"result[1] > 0\" [class.icon_arrow_up]=\"result[1] > 0\"\n                    [class.red]=\"result[1] < 0\"  [class.icon_minus]=\"result[1] < 0\" [class.icon_arrow_bottom]=\"result[1] < 0\"\n                >{{result[1]}}</div>\n            </div>\n\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService])
], DigestColumnChartComponent);
exports.DigestColumnChartComponent = DigestColumnChartComponent;
//# sourceMappingURL=digest-column-chart.component.js.map