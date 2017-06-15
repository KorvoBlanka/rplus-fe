import {Component, OnInit, OnChanges} from '@angular/core';

import {HubService} from '../../service/hub.service';



@Component({
    selector: 'digest-column-chart',
    inputs: ['data', 'header', 'hard_data' , 'height', 'result', 'graph_width', 'width'],
    styles: [`
        .container {
            background-color: white;
            font-size: 16px;
            position: relative;
            display: inline-block;
            min-height: 150px;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .head{
            text-transform: uppercase;
            color: #4c4c4c;
            margin: 7px 0 20px 10px;
            position: relative;
            z-index: 10;
        }
        .chart{
            margin: 0 10px;
        }
        .chart>div{
            width: 100%;
            height: inherit;
            display: flex;
            justify-content: space-between;
        }

        .chart .label{
            font-size: 12px;
            color: rgba(101, 101, 101, 0.81);
        }

        .chart .column{
            height: 20px;
            background-color: #927bc6;
            margin-bottom: 3px;
            align-items: center;
            display: flex;
        }

        .chart .column>div{
            background-color: #e1d4e1;
            height: inherit;
            line-height: 20px;
        }

        .total{
            font-size: 20pt;
            color: rgba(0, 0, 0, 0.67);
            margin-left: 10px;
            margin-top: 5px;
            height: 30px;
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 5;
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
            <div style=" height: calc(100% - 74px);">
                <div class="chart">
                    <div *ngFor="let dt of data">
                        <div class="label">{{dt[0]}}</div>
                        <div class="column" [style.width]="graph_width">
                            <div [style.width]="calcWidth(dt[1])">
                                <span style="font-size: 13px; color: black; margin-left: 5px;">{{dt[1]+ "%"}}</span>
                            </div>
                            <span style="color: white; font-size: 13px; margin-left: 5px;">{{(100-dt[1])+'%'}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="total" *ngIf="result">
                <div>{{result[0]}}</div>
                <div *ngIf="hard_data"
                    [class.green]="result[1] > 0" [class.icon_plus]="result[1] > 0" [class.icon_arrow_up]="result[1] > 0"
                    [class.red]="result[1] < 0"  [class.icon_minus]="result[1] < 0" [class.icon_arrow_bottom]="result[1] < 0"
                >{{result[1]}}</div>
            </div>

        </div>
    `
})

export class DigestColumnChartComponent implements OnInit, OnChanges {
    hard_data: boolean = false;
    data: any[]= [];
    height: string = "160px";
    width: string = "300px"
    graph_width = 100;

    constructor(private _hubService: HubService) {
    };

    ngOnInit() {

    }

    ngOnChanges(){
    }

    abs(num: number){
        return Math.abs(num);
    }

    calcWidth(num: number){
        return ""+Math.round(this.graph_width*num/100)+'px';
    }

}
