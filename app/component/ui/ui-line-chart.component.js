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
    var core_1;
    var UILineChart;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            UILineChart = (function () {
                function UILineChart(_elem) {
                    this._elem = _elem;
                    this.data = [];
                }
                UILineChart.prototype.ngOnChanges = function () {
                    if (!this.container) {
                        this.container = this._elem.nativeElement.querySelector('.ui-line-chart');
                    }
                    console;
                    this.draw();
                };
                UILineChart.prototype.draw = function () {
                    // Create the data table.
                    var data = google.visualization.arrayToDataTable(this.data);
                    // Set chart options
                    var options = {
                        title: this.title,
                        //curveType: 'function',
                        legend: { position: 'none' },
                        height: 272,
                        hAxis: {
                            baseline: 0,
                            format: '#'
                        },
                        vAxis: {
                            baseline: 0,
                            format: '#'
                        }
                    };
                    var chart = new google.visualization.LineChart(this.container);
                    chart.draw(data, options);
                };
                UILineChart = __decorate([
                    core_1.Component({
                        selector: 'ui-line-chart',
                        inputs: ['title', 'data'],
                        template: "\n    <div class=\"ui-line-chart\">\n    </div>\n  ",
                        styles: ["\n    .class {\n\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], UILineChart);
                return UILineChart;
            }());
            exports_1("UILineChart", UILineChart);
        }
    }
});
//# sourceMappingURL=ui-line-chart.component.js.map