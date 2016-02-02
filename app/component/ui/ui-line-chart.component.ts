import {
  Component,
  ElementRef,
} from 'angular2/core';

@Component({
  selector: 'ui-line-chart',
  inputs: ['title', 'data'],
  template: `
    <div class="ui-line-chart">
    </div>
  `,
  styles: [`
    .class {

    }
  `]
})

export class UILineChart {
    public title: string;
    public data: any[];
    container: any;

    constructor(elem: ElementRef) {
        this.data = [];
        this.container = elem.nativeElement.querySelector('.ui-line-chart');
    }

    ngOnChanges() {
        this.draw();
    }

    draw() {

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

    }

}
