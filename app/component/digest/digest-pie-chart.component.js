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
var DigestPieChartComponent = (function () {
    function DigestPieChartComponent(_hubService) {
        this._hubService = _hubService;
        this.chartID = "Chart" + Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        this.hard_data = false;
        this.pie_ChartData = [['Данных нет', 1]];
        this.data = [];
        this.height = "160px";
        this.width = "300px";
        this.pie_ChartOptions = {
            width: 146,
            height: 146,
            pieHole: 0.5,
            legend: 'none',
            chartArea: { left: 11, top: 11, width: 123, height: 123 },
            slices: {
                0: { color: '#8e44ad' }
            }
        };
    }
    ;
    DigestPieChartComponent.prototype.ngOnInit = function () {
        if (!this.hard_data)
            this.pie_ChartData = this.data;
        else
            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                var i = _a[_i];
                this.pie_ChartData.push([i[0], i[1]]);
            }
        this.pie_ChartData.unshift(['', '']);
    };
    DigestPieChartComponent.prototype.ngOnChanges = function () {
    };
    DigestPieChartComponent.prototype.abs = function (num) {
        return Math.abs(num);
    };
    return DigestPieChartComponent;
}());
DigestPieChartComponent = __decorate([
    core_1.Component({
        selector: 'digest-pie-chart',
        inputs: ['data', 'header', 'hard_data', 'height', 'width', 'result'],
        styles: ["\n        .container {\n            background-color: white;\n            font-size: 16px;\n            position: relative;\n            display: inline-block;\n            min-height: 150px;\n            height: 100%;\n            width: 100%;\n            overflow: hidden;\n        }\n        .head{\n            text-transform: uppercase;\n            color: #4c4c4c;\n            margin: 7px 0 10px 10px;\n            position: relative;\n            z-index: 10;\n        }\n        .chart{\n            position: absolute;\n            top: 17px;\n            right: 0;\n        }\n\n        table{\n            font-size: 12px;\n            color: rgba(101, 101, 101, 0.81);\n        }\n\n        .total{\n            font-size: 20pt;\n            color: rgba(0, 0, 0, 0.67);\n            margin-left: 10px;\n            margin-top: 5px;\n            height: 30px;\n            display: flex;\n            align-items: center;\n        }\n\n        .total>div:nth-child(1){\n            float: left;\n            margin-right: 10px;\n        }\n\n        .total>div:nth-child(2){\n            font-size: 16pt;\n        }\n\n        .total>div:nth-child(2):after{\n            font-size: 14pt;\n            position: relative;\n            top: -2px;\n        }\n\n        td>div{\n            height: 13px;\n            line-height: 13px;\n        }\n\n        .red{\n            color: red;\n        }\n        .green{\n            color: green;\n        }\n\n    "],
        template: "\n        <div class=\"container\">\n            <div class=\"head\">{{header}}</div>\n            <div style=\"margin-left: 10px; height: calc(100% - 74px);\">\n                <table>\n                    <tr *ngFor=\"let dat of data\">\n                        <td><div>{{dat[0]}}</div></td>\n                        <td><div>{{dat[1]}}</div></td>\n                        <td *ngIf=\"dat[2]\"><div\n                            [class.green]=\"dat[2] > 0\" [class.icon_plus]=\"dat[2] > 0\" [class.icon_arrow_up]=\"dat[2] > 0\"\n                            [class.red]=\"dat[2] < 0\"  [class.icon_minus]=\"dat[2] < 0\" [class.icon_arrow_bottom]=\"dat[2] < 0\"\n                        >{{abs(dat[2])}}</div></td>\n                    </tr>\n                </table>\n            </div>\n            <div class=\"total\" *ngIf=\"result\">\n                <div>{{result[0]}}</div>\n                <div *ngIf=\"hard_data\"\n                    [class.green]=\"result[1] > 0\" [class.icon_plus]=\"result[1] > 0\" [class.icon_arrow_up]=\"result[1] > 0\"\n                    [class.red]=\"result[1] < 0\"  [class.icon_minus]=\"result[1] < 0\" [class.icon_arrow_bottom]=\"result[1] < 0\"\n                >{{abs(result[1])}}</div>\n            </div>\n            <div id={{chartID}}\n                [data]=\"pie_ChartData\"\n                [chartOptions] = \"pie_ChartOptions\"\n                chartType=\"PieChart\" GoogleChart\n                class=\"chart\"\n            >\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService])
], DigestPieChartComponent);
exports.DigestPieChartComponent = DigestPieChartComponent;
//# sourceMappingURL=digest-pie-chart.component.js.map