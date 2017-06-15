import {Component, OnInit, OnChanges} from '@angular/core';

import {HubService} from '../../service/hub.service';



@Component({
    selector: 'digest-pie-chart',
    inputs: ['data', 'header', 'hard_data' , 'height', 'width', 'result'],
    styles: [`
        .container {
            background-color: white;
            font-size: 16px;
            position: relative;
            display: inline-block;
            min-height: 150px;
            height: 100%;
            width: 100%;
            overflow: hidden;
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
        <div class="container">
            <div class="head">{{header}}</div>
            <div style="margin-left: 10px; height: calc(100% - 74px);">
                <table>
                    <tr *ngFor="let dat of data">
                        <td><div>{{dat[0]}}</div></td>
                        <td><div>{{dat[1]}}</div></td>
                        <td *ngIf="dat[2]"><div
                            [class.green]="dat[2] > 0" [class.icon_plus]="dat[2] > 0" [class.icon_arrow_up]="dat[2] > 0"
                            [class.red]="dat[2] < 0"  [class.icon_minus]="dat[2] < 0" [class.icon_arrow_bottom]="dat[2] < 0"
                        >{{abs(dat[2])}}</div></td>
                    </tr>
                </table>
            </div>
            <div class="total" *ngIf="result">
                <div>{{result[0]}}</div>
                <div *ngIf="hard_data"
                    [class.green]="result[1] > 0" [class.icon_plus]="result[1] > 0" [class.icon_arrow_up]="result[1] > 0"
                    [class.red]="result[1] < 0"  [class.icon_minus]="result[1] < 0" [class.icon_arrow_bottom]="result[1] < 0"
                >{{abs(result[1])}}</div>
            </div>
            <div id={{chartID}}
                [data]="pie_ChartData"
                [chartOptions] = "pie_ChartOptions"
                chartType="PieChart" GoogleChart
                class="chart"
            >
            </div>
        </div>
    `
})

export class DigestPieChartComponent implements OnInit, OnChanges {
    chartID: string = "Chart"+Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    hard_data: boolean = false;
    pie_ChartData: any[]=[['Данных нет', 1]];
    data: any[]= [];
    height = "160px";
    width = "300px";

    pie_ChartOptions  = {
        width: 146,
        height: 146,
        pieHole: 0.5,
        legend: 'none',
        chartArea: {left:11,top:11,width:123,height:123},
        slices: {
            0: { color: '#8e44ad' }
          }
    };
    constructor(private _hubService: HubService) {
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

}
