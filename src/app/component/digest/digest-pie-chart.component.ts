import {Component, OnInit, OnChanges} from '@angular/core';

import {HubService} from '../../service/hub.service';



@Component({
    selector: 'digest-pie-chart',
    inputs: ['data', 'header', 'hard_data' , 'height', 'width', 'result'],
    styles: [`
        .container {
            background-color: white;
            font-size: 15px;
            position: relative;
            display: inline-block;
            min-height: 159px;
            height: 100%;
            width: 100%;
            overflow: hidden;
        }
        .head{
            text-transform: uppercase;
            color: #4c4c4c;
            margin: 7px 0 0px 10px;
            position: relative;
            z-index: 10;
            height: 40px;
            display: flex;
            justify-content: space-between;
        }
        .chart{
            margin-right: 5px;
        }

        table{
            font-size: 12px;
            color: rgba(101, 101, 101, 0.81);
            flex: 1 1 calc(50% - 10px);
            display: block;
        }

        .total{
            font-size: 17pt;
            color: rgba(0, 0, 0, 0.67);
            display: flex;
            align-items: center;
            height: 15px;
            margin-right: 10px;
        }

        .total>div:nth-child(1){
            float: left;
            margin-right: 6px;
        }

        .total>div:nth-child(2){
            font-size: 10pt;
            height: 16px;
            line-height: 25px;
        }

        .total>div:nth-child(2):after{
            font-size: 10pt;
            position: relative;
            top: 0px;
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
        <div class="container" (window:resize)="resize()">
            <div class="head">{{header}}
                <div class="total" *ngIf="result">
                    <div>{{result[0]}}</div>
                    <div *ngIf="hard_data"
                        [class.green]="result[1] > 0" [class.icon_plus]="result[1] > 0" [class.icon_arrow_up]="result[1] > 0"
                        [class.red]="result[1] < 0"  [class.icon_minus]="result[1] < 0" [class.icon_arrow_bottom]="result[1] < 0"
                    >{{abs(result[1])}}</div>
                </div>
            </div>
            <div style="margin-left: 10px; height: calc(100% - 58px); display: flex; align-items: center; justify-content: space-between;">
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
                <div id={{chartID}}
                    [data]="pie_ChartData"
                    [chartOptions] = "pie_ChartOptions"
                    chartType="PieChart" GoogleChart
                    class="chart"
                >
                </div>
            </div>


        </div>
    `
})

export class DigestPieChartComponent implements OnInit, OnChanges {
    chartID: string = "Chart"+Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    hard_data: boolean = false;
    pie_ChartData: any[] =[];
    data: any[]= [];
    height = "160px";
    width = "300px";
    chartSize = 136;

    pie_ChartOptions: any;
    constructor(private _hubService: HubService) {
    };

    ngOnInit() {

        if(!this.data){
            this.pie_ChartData.push(['Данных нет', 1]);
        }else if(!this.hard_data)
            this.pie_ChartData = [].concat(this.data);
        else{
            for(let i of this.data)
                this.pie_ChartData.push([i[0], i[1]]);
        }
        this.pie_ChartData.unshift(['', '']);
        setTimeout(() => {
            this.resize();
        }, 1);

    }

    ngOnChanges(){}

    abs(num: number){
        return Math.abs(num);
    }

    resize(){
        this.pie_ChartOptions  = {
            width: this.getSize(),
            height: this.getSize(),
            pieHole: 0.53,
            legend: 'none',
            chartArea: {left:7,top:7,width: this.getSize() - 14 ,height: this.getSize() - 14},
            pieSliceText: 'none',
            slices: [
                {color: '#AB47BC'},
                {color: '#FF7043'},
                //{color: '#29B6F6'},
                {color: '#26A69A'},
                {color: '#EF5350'},
                {color: '#5C6BC0'}


            ]
        };
    }

    getSize(){
        let container = document.getElementById(this.chartID).parentElement;
        if(container){
            let containerHeight = container.clientHeight;
            let containerWidth = container.clientWidth;
            if(containerWidth / containerHeight  < 1.77 )
                return Math.round(containerHeight);
            else return Math.round(containerWidth* 0.4);
        }
        else return 136;

    }

}
