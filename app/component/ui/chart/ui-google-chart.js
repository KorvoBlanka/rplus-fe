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
var GoogleChartComponent = (function () {
    function GoogleChartComponent(element) {
        this.element = element;
        this._element = this.element.nativeElement;
    }
    GoogleChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            google.charts.load('current', { 'packages': ['corechart'] });
            setTimeout(function () {
                _this.drawGraph(_this.chartOptions, _this.chartType, _this.chartData, _this._element);
            }, 1000);
        }, 1000);
    };
    GoogleChartComponent.prototype.drawGraph = function (chartOptions, chartType, chartData, ele) {
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var wrapper;
            wrapper = new google.visualization.ChartWrapper({
                chartType: chartType,
                dataTable: chartData,
                options: chartOptions || {},
                containerId: ele.id
            });
            wrapper.draw();
        }
    };
    return GoogleChartComponent;
}());
__decorate([
    core_1.Input('chartType'),
    __metadata("design:type", String)
], GoogleChartComponent.prototype, "chartType", void 0);
__decorate([
    core_1.Input('chartOptions'),
    __metadata("design:type", Object)
], GoogleChartComponent.prototype, "chartOptions", void 0);
__decorate([
    core_1.Input('chartData'),
    __metadata("design:type", Object)
], GoogleChartComponent.prototype, "chartData", void 0);
GoogleChartComponent = __decorate([
    core_1.Directive({
        selector: '[GoogleChart]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], GoogleChartComponent);
exports.GoogleChartComponent = GoogleChartComponent;
//# sourceMappingURL=ui-google-chart.js.map