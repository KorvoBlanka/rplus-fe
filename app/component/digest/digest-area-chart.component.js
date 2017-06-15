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
var DigestAreaChartComponent = (function () {
    function DigestAreaChartComponent(_hubService) {
        this._hubService = _hubService;
        this.chartID = "Chart" + Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        this.hard_data = false;
        this.pie_ChartData = [['Данных нет', 1]];
        this.data = [];
        this.height = "160px";
        this.width = "300px";
        this.setData();
    }
    ;
    DigestAreaChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.hard_data)
            this.pie_ChartData = this.data;
        else
            for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
                var i = _a[_i];
                this.pie_ChartData.push([i[0], i[1]]);
            }
        this.pie_ChartData.unshift(['', '']);
        setTimeout(function () {
            _this.getOption();
        }, 100);
    };
    DigestAreaChartComponent.prototype.ngOnChanges = function () {
        this.getOption();
    };
    DigestAreaChartComponent.prototype.abs = function (num) {
        return Math.abs(num);
    };
    DigestAreaChartComponent.prototype.setData = function () {
        this.area_ChartData = new google.visualization.DataTable();
        this.area_ChartData.addColumn('date', 'Time of Day');
        this.area_ChartData.addColumn('number', 'Rating');
        this.area_ChartData.addColumn('number', 'Rating1');
        this.area_ChartData.addColumn('number', 'Rating2');
        this.area_ChartData.addRows([
            [new Date(2016, 0, 1), 120, 100, 75],
            [new Date(2016, 1, 1), 132, 150, 65],
            [new Date(2016, 2, 1), 122, 165, 55],
            [new Date(2016, 3, 1), 189, 89, 50],
            [new Date(2016, 4, 1), 179, 40, 65],
            [new Date(2016, 5, 1), 185, 70, 40],
            [new Date(2016, 6, 1), 185, 95, 30],
            [new Date(2016, 7, 1), 166, 150, 10],
            [new Date(2016, 8, 1), 74, 100, 20]
        ]);
    };
    DigestAreaChartComponent.prototype.getWidth = function (str) {
        var par = document.getElementById(this.chartID);
        if (par)
            return '' + (par.parentElement.clientWidth);
        else
            return str;
    };
    DigestAreaChartComponent.prototype.getHeight = function (str) {
        var par = document.getElementById(this.chartID);
        if (par)
            return '' + (par.parentElement.parentElement.clientHeight);
        else
            return str;
    };
    DigestAreaChartComponent.prototype.getContainerHeight = function () {
        var par = document.getElementById(this.chartID);
        if (par) {
            return '' + (par.parentElement.parentElement.parentElement.clientHeight - 20);
        }
        else
            return '540px';
    };
    DigestAreaChartComponent.prototype.getOption = function () {
        this.area_ChartOptions = {
            //backgroundColor: 'transparent',
            height: this.getHeight('330'),
            width: this.getWidth('900'),
            legend: 'none',
            axisTitlesPosition: 'in',
            hAxis: {
                //textStyle: {color: '#ccc', fontName: 'OpenSans', fontSize: '10px'},
                //baselineColor: '#ccc',
                //gridlines: {
                //    color: '#ccc',
                //    count: 10
                //},
                format: 'MM.yyyy'
            },
            vAxis: {
                minValue: 0,
            },
            //colors: ['#8e44ad', '#dc3912', '#ff9900'],
            pointSize: 5,
            chartArea: {
                //backgroundColor: 'transparent',
                left: 50,
                top: 30,
                width: this.getWidth('900') - 80,
                height: this.getHeight('330') - 55
            }
        };
    };
    return DigestAreaChartComponent;
}());
DigestAreaChartComponent = __decorate([
    core_1.Component({
        selector: 'digest-area-chart',
        inputs: ['data', 'header', 'hard_data', 'height', 'width', 'result'],
        styles: ["\n        .container {\n            font-size: 16px;\n            position: relative;\n            display: inline-block;\n            height: 100%;\n            width: 100%;\n        }\n        .head{\n            text-transform: uppercase;\n            color: #4c4c4c;\n            margin: 7px 0 10px 50px;\n            position: relative;\n            z-index: 10;\n        }\n        .chart{\n            position: absolute;\n            right: 0;\n            top: 0;\n        }\n\n        table{\n            font-size: 12px;\n            color: rgba(101, 101, 101, 0.81);\n        }\n\n        .total{\n            font-size: 20pt;\n            color: rgba(0, 0, 0, 0.67);\n            margin-left: 55px;\n            margin-top: 5px;\n            height: 30px;\n            display: flex;\n            align-items: center;\n        }\n\n        .total>div:nth-child(1){\n            float: left;\n            margin-right: 10px;\n        }\n\n        .total>div:nth-child(2){\n            font-size: 16pt;\n        }\n\n        .total>div:nth-child(2):after{\n            font-size: 14pt;\n            position: relative;\n            top: -2px;\n        }\n\n        td>div{\n            height: 13px;\n            line-height: 13px;\n        }\n\n        .red{\n            color: red;\n        }\n        .green{\n            color: green;\n        }\n\n    "],
        template: "\n        <div class=\"container\" [style.width]=\"width\" [style.height]=\"getContainerHeight()\">\n            <div class=\"head\">{{header}}</div>\n            <div class=\"total\" *ngIf=\"result\">\n                <div>{{result[0]}}</div>\n                <div *ngIf=\"hard_data\"\n                    [class.green]=\"result[1] > 0\" [class.icon_plus]=\"result[1] > 0\" [class.icon_arrow_up]=\"result[1] > 0\"\n                    [class.red]=\"result[1] < 0\"  [class.icon_minus]=\"result[1] < 0\" [class.icon_arrow_bottom]=\"result[1] < 0\"\n                >{{abs(result[1])}}</div>\n            </div>\n            <div id={{chartID}}\n                [data]=\"area_ChartData\"\n                [chartOptions] = \"area_ChartOptions\"\n                chartType=\"AreaChart\" GoogleChart\n                class=\"chart\"\n            >\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService])
], DigestAreaChartComponent);
exports.DigestAreaChartComponent = DigestAreaChartComponent;
//# sourceMappingURL=digest-area-chart.component.js.map