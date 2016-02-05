System.register(['angular2/core'], function(exports_1) {
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
    var UIPieChart;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            UIPieChart = (function () {
                function UIPieChart(_elem) {
                    this._elem = _elem;
                    this.data = [];
                }
                UIPieChart.prototype.ngOnChanges = function () {
                    if (!this.container) {
                        this.container = this._elem.nativeElement.querySelector('.ui-pie-chart');
                    }
                    this.draw();
                };
                UIPieChart.prototype.draw = function () {
                    // Create the data table.
                    var data = google.visualization.arrayToDataTable(this.data);
                    var options = {
                        title: this.title,
                        is3D: true,
                        height: 500,
                        legend: {
                            position: 'labeled',
                            labeledValueText: 'value'
                        }
                    };
                    var chart = new google.visualization.PieChart(this.container);
                    chart.draw(data, options);
                };
                UIPieChart = __decorate([
                    core_1.Component({
                        selector: 'ui-pie-chart',
                        inputs: ['title', 'data'],
                        template: "\n    <div class=\"ui-pie-chart\">\n    </div>\n  ",
                        styles: ["\n    .class {\n\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], UIPieChart);
                return UIPieChart;
            })();
            exports_1("UIPieChart", UIPieChart);
        }
    }
});
//# sourceMappingURL=ui-pie-chart.component.js.map