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
            height: inherit;
            background-color: #AB47BC;
            margin-bottom: 2px;
            align-items: center;
            display: flex;
            padding: 0;
        }

        .chart .column>div{
            background-color: #EDE7F6;
            height: inherit;
            line-height: 20px;
            position: relative;
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
        <div class="container" (window:resize)="resize()">
            <div class="head">{{header}}</div>
            <div style=" height: calc(100% - 74px);">
                <div class="chart" id={{chartID}}>
                    <table cellspacing = "0" width="100%">
                    <tr *ngFor="let dt of data" style="width: calc(100% - 20px);">
                        <td class="label"  style="padding: 0;">
                            <div [style.height]="graphHeight" [style.width]="graph_width*0.4" style="overflow: hidden;text-overflow: ellipsis;"
                            >{{dt[0]}}
                            </div>
                        </td>
                        <td class="column" [style.width]="graph_width*0.6"  [style.height]="graphHeight" style="padding: 0;">
                            <span style="position: absolute; font-size: 10px; color: black; margin-left: 5px;">{{dt[1]+ "%"}}</span>
                            <div [style.width]="calcWidth(dt[1])" [style.height]="graphHeight">
                                <span style="color: white; font-size: 10px; margin-left: 5px;position: absolute;">{{(100-dt[1])+'%'}}</span>
                            </div>

                        </td>
                    </tr>
                    </table>
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
    chartID: string = "Chart"+Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    hard_data: boolean = false;
    data: any[]= [];
    height: string = "160px";
    width: string = "300px"
    graph_width = 100;
    graphHeight: number;

    constructor(private _hubService: HubService) {
    };

    ngOnInit() {
        setTimeout(() =>{
            this.resize();
        },10);
    }

    ngOnChanges(){

    }

    abs(num: number){
        return Math.abs(num);
    }

    calcWidth(num: number){
        return ""+Math.floor(this.graph_width*num/100)+'px';
    }

    resize(){
        let container = document.getElementById(this.chartID).parentElement;
        if(container){
            let containerHeight = container.parentElement.clientHeight;
            let containerWidth = container.parentElement.clientWidth;
            console.log(container.parentElement.clientWidth);
            this.graphHeight = Math.floor((containerHeight - 74)/this.data.length - 2);
            this.graph_width = Math.floor(containerWidth - 30);

        }
    }

}
