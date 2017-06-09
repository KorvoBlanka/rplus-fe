import {Component, OnInit, OnChanges} from '@angular/core';

import {HubService} from '../../service/hub.service';

declare var google:any;

@Component({
    selector: 'digest-area-chart',
    inputs: ['data', 'header', 'hard_data' , 'height', 'width', 'result'],
    styles: [`
        .container {
            background-color: white;
            font-size: 16px;
            position: relative;
            display: inline-block;
            min-height: 160px;
        }
        .head{
            text-transform: uppercase;
            color: #4c4c4c;
            margin: 7px 0 10px 10px;
            position: relative;
            z-index: 10;
        }
        .chart{
            position: absolute;
            top: 17px;
            right: 0;
        }

        table{
            font-size: 12px;
            color: rgba(101, 101, 101, 0.81);
        }

        .total{
            font-size: 20pt;
            color: rgba(0, 0, 0, 0.67);
            margin-left: 10px;
            margin-top: 5px;
            height: 30px;
            display: flex;
            align-items: center;
        }

        .total>div:nth-child(1){
            float: left;
            margin-right: 10px;
        }

        .total>div:nth-child(2){
            font-size: 16pt;
        }

        .total>div:nth-child(2):after{
            font-size: 14pt;
            position: relative;
            top: -2px;
        }

        td>div{
            height: 13px;
            line-height: 13px;
        }

        .red{
            color: red;
        }
        .green{
            color: green;
        }

    `],
    template: `
        <div class="container" [style.height]="height" [style.width]="width">
            <div class="head">{{header}}</div>
            <div class="total" *ngIf="result">
                <div>{{result[0]}}</div>
                <div *ngIf="hard_data"
                    [class.green]="result[1] > 0" [class.icon_plus]="result[1] > 0" [class.icon_arrow_up]="result[1] > 0"
                    [class.red]="result[1] < 0"  [class.icon_minus]="result[1] < 0" [class.icon_arrow_bottom]="result[1] < 0"
                >{{abs(result[1])}}</div>
            </div>
            <div id={{chartID}}
                [data]="area_ChartData"
                [chartOptions] = "area_ChartOptions"
                chartType="AreaChart" GoogleChart
                class="chart"
            >
            </div>
        </div>
    `
})

export class DigestAreaChartComponent implements OnInit, OnChanges {
    chartID: string = "Chart"+Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    hard_data: boolean = false;
    pie_ChartData: any[]=[['Данных нет', 1]];
    data: any[]= [];
    height = "160px";
    width = "300px";

    area_ChartOptions = {
        backgroundColor: 'transparent',
        height: '350',
        width: '900',
        legend: 'none',
        axisTitlesPosition: 'in',
        hAxis: {
            textStyle: {color: '#ccc', fontName: 'OpenSans', fontSize: '10px'},
            baselineColor: '#ccc',
            gridlines: {
                color: '#ccc',
                count: 10
            },
            format: 'MM.yyyy'
        },
        vAxis: {
                minValue: 0,
                textStyle: {color: '#ccc', fontName: 'OpenSans', fontSize: '10px'},
                baselineColor: '#ccc',
                gridlines: {color: '#ccc', count: 10},
        },
        colors: ['#8e44ad', '#dc3912', '#ff9900'],
        pointSize: 2,
        chartArea:{
            backgroundColor: 'transparent',
            left: 50,
            top: 10,
            width: 800,
            height: 300
        }
    };

    area_ChartData: any;

    constructor(private _hubService: HubService) {
        this.setData();
    };

    ngOnInit() {
        if(!this.hard_data)
            this.pie_ChartData = this.data;
        else
            for(let i of this.data)
                this.pie_ChartData.push([i[0], i[1]]);

        this.pie_ChartData.unshift(['', '']);
    }

    ngOnChanges(){

    }

    abs(num: number){
        return Math.abs(num);
    }

    setData(){
        this.area_ChartData= new google.visualization.DataTable();
        this.area_ChartData.addColumn('date', 'Time of Day');
        this.area_ChartData.addColumn('number', 'Rating');
        this.area_ChartData.addColumn('number', 'Rating1');
        this.area_ChartData.addColumn('number', 'Rating2');
        this.area_ChartData.addRows([
              [new Date(2016, 0, 1),  120,      100,  75],
              [new Date(2016, 1, 1),  132,      150,  65],
              [new Date(2016, 2, 1),  122,      165,  55],
              [new Date(2016, 3, 1),  189,      89,  50],
              [new Date(2016, 4, 1),  179,      40,  65],
              [new Date(2016, 5, 1),  185,      70,  40],
              [new Date(2016, 6, 1),  185,      95,  30],
              [new Date(2016, 7, 1),   166,      150,  10],
              [new Date(2016, 8, 1),  74,      100,  20]
         ]);
    }

}
