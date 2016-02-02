import {
  Component,
  Renderer,
  ElementRef,
} from 'angular2/core';

@Component({
  selector: 'ui-pie-chart',
  inputs: ['title', 'data'],
  template: `
    <div class="ui-pie-chart">
    </div>
  `,
  styles: [`
    .class {

    }
  `]
})

export class UIPieChart {
    public title: string;
    public data: any[];
    container: any;
    constructor(elem: ElementRef, renderer: Renderer) {
        this.data = [];
        //renderer.setElementClass(elem, 'wtf-class', true);
        this.container = elem.nativeElement.querySelector('.ui-pie-chart');
    }

    ngOnChanges() {
        this.draw();
    }

    draw() {

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

    }

}
