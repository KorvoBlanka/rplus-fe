import {Component, OnInit} from '@angular/core';
import {Output,Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'ui-advertising',
  inputs: [],
  template: `
    <div class="ui-advertising">
        <div *ngFor="let platform of platforms; let i=index" (click)="platform.select = !platform.select">
            <div class='button'>
                <div *ngIf="platform.select"></div>
            </div>
            <div class="name">{{platform.name}}</div>
        </div>
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
          background-image: url(assets/tick.png);
          background-size: cover;
          position: relative;
          top: -6px;
          left: 1px;
      }
      .name{
          font-size: 10pt;
          color: #5f5d5d;
      }
  `]
})

export class UIAdvertising implements OnInit{
  platforms: any[]=[
      {select: false, name: 'Из рук в руки'},
      {select: false, name: 'Презент'},
      {select: false, name: 'Авито'},
      {select: false, name: 'Циан'},
      {select: false, name: 'ВНХ'},
      {select: false, name: 'Фарпост'},
      {select: false, name: 'Домофонд'},
      {select: false, name: 'Из рук в руки'},
      {select: false, name: 'Презент'},
      {select: false, name: 'Авито'},
      {select: false, name: 'Циан'},
      {select: false, name: 'ВНХ'},
      {select: false, name: 'Фарпост'},
      {select: false, name: 'Из рук в руки'},
      {select: false, name: 'Презент'},
      {select: false, name: 'Авито'},
      {select: false, name: 'Циан'},
      {select: false, name: 'ВНХ'},
      {select: false, name: 'Фарпост'},
      {select: false, name: 'Домофонд'},
      {select: false, name: 'Из рук в руки'},
      {select: false, name: 'Презент'},
      {select: false, name: 'Авито'},
      {select: false, name: 'Циан'},
      {select: false, name: 'ВНХ'},
      {select: false, name: 'Фарпост'},
      {select: false, name: 'Фарпост'},
      {select: false, name: 'Домофонд'},
      {select: false, name: 'Из рук в руки'},
      {select: false, name: 'Презент'},
      {select: false, name: 'Авито'},
      {select: false, name: 'Циан'},
      {select: false, name: 'ВНХ'},
      {select: false, name: 'Фарпост'},
      {select: false, name: 'Домофонд'}
  ];
  ngOnInit(){

  }
}
