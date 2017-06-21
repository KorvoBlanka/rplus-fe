import {Component, OnInit} from '@angular/core';
import {Output,Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'ui-advertising',
  inputs: [],
  template: `
    <div class="ui-advertising">

        <table cellspacing="0" style="width: 100%; display: block;">
            <div class="head">
                <span class="text">Обновлено</span><span>Изменить</span>
                <div class="search"></div>
            </div>
            <thead>
                <tr>
                    <td>Площадка</td>
                    <td>Неделя</td>
                    <td>2 Недели</td>
                    <td>Месяц</td>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let platform of platforms; let i=index">
                    <td width = '41%'>
                        <div class="name">{{platform.name}}</div>
                    </td>
                    <td width = '18%'>
                        <div class='button' (click)="platform.select = !platform.select">
                            <div *ngIf="platform.select"></div>
                        </div>
                    </td>
                    <td width = '23%'>
                        <div class='button' (click)="platform.select2 = !platform.select2">
                            <div *ngIf="platform.select2"></div>
                        </div>
                    </td>
                    <td width = '18%'>
                        <div class='button' (click)="platform.select3 = !platform.select3">
                            <div *ngIf="platform.select3"></div>
                        </div>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
  `,
  styles: [`
      .ui-advertising{
          cursor: pointer;
      }
      .ui-advertising>div{
          height: 30px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
      }

      .ui-advertising>div:nth-child(odd){

      }
      .ui-advertising>div:nth-child(even){
          background-color: #f1f3ef;
      }
      .button{
          width: 10px;
          height: 10px;
          margin: 0 10px 0 20px;
          background-color: #d4d4d4;
          border: 1px solid #b2b2b2;
          border-radius: 2px;
      }
      .button > div{
          width: 15px;
          height: 15px;
          background-image: url(res/tick.png);
          background-size: cover;
          position: relative;
          top: -6px;
          left: 1px;
      }
      .name{
          font-size: 10pt;
          color: #5f5d5d;
          text-align: left;
      }

      thead, tbody{
          display: block;
      }

      tr{
         width: 100%;
         display: flex;
      }

      thead tr{
          justify-content: center;
      }

      thead tr td {
          font-size: 10pt;
          color: #5f5d5d;
      }

      tr td  {
          flex: 0 0 20%;
          text-align: center;
      }
      tr td:first-child {
          flex: 0 0 40%;
      }

      .head{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
      }

      .head > span{
          flex: 0 0 50%;
      }

      .search{
          width: calc(100% - 20px);
          height: 20px;
          background-color: white;
          margin-left: 20px;
      }
  `]
})

export class UIAdvertising implements OnInit{
  platforms: any[]=[
      {select1: false, select2: false, select3: false, name: 'Из рук в руки'},
      {select: false, select2: false, select3: false, name: 'Презент'},
      {select: false, select2: false, select3: false, name: 'Авито'},
      {select: false, select2: false, select3: false, name: 'Циан'},
      {select: false, select2: false, select3: false, name: 'ВНХ'},
      {select: false, select2: false, select3: false, name: 'Фарпост'},
      {select: false, select2: false, select3: false, name: 'Домофонд'}
  ];
  ngOnInit(){
      this.platforms.concat(this.platforms);
      this.platforms.concat(this.platforms);
      this.platforms.concat(this.platforms);
  }
}
