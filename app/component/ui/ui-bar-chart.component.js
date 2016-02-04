System.register(['angular2/core'], function(exports_1) {
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
    var core_1;
    var UIBarChart;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            UIBarChart = (function () {
                function UIBarChart(_elem, renderer) {
                    this._elem = _elem;
                    this.data = [];
                    //renderer.setElementClass(elem, 'wtf-class', true);
                }
                UIBarChart.prototype.ngOnChanges = function () {
                    if (!this.container) {
                        this.container = this._elem.nativeElement.querySelector('.ui-bar-chart');
                    }
                    this.draw();
                };
                UIBarChart.prototype.draw = function () {
                    // Create the data table.
                    var data = google.visualization.arrayToDataTable(this.data);
                    var options = {
                        legend: { position: "none" },
                        height: 272,
                        hAxis: {
                            format: '#'
                        }
                    };
                    var chart = new google.visualization.BarChart(this.container);
                    chart.draw(data, options);
                };
                UIBarChart = __decorate([
                    core_1.Component({
                        selector: 'ui-bar-chart',
                        inputs: ['title', 'data'],
                        template: "\n    <div class=\"ui-bar-chart\">\n    </div>\n  ",
                        styles: ["\n    .class {\n\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], UIBarChart);
                return UIBarChart;
            }());
            exports_1("UIBarChart", UIBarChart);
        }
    }
});
//# sourceMappingURL=ui-bar-chart.component.js.map