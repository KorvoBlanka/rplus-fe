import {Component} from 'angular2/core';

import {HubService} from '../../service/hub.service'

import {Realty} from '../../class/realty';

import {UITag} from '../ui/ui-tag.component'


@Component({
  selector: 'reaty-digest',
  inputs: ['realty', 'compact'],

  template: `
    <div class="billet" data-id="r{{realty._id}}"
      [class.selected]="realty.selected"
      (click)="select()"
      (dblclick)="open()"
      (touchstart)="tstart()"
      (touchend)="tsend()">

      <div style="width: 100%;">
        <div class="timestamp">07.01.16 11:09</div>
        <div class="tag-mark">
          <ui-tag
            [value]="realty.tag"
          >
          </ui-tag>
        </div>
        <img *ngIf="!compact" src="{{ realty.main_photo_thumbnail }}" style="height: 60px; min-width: 80px; float: left; margin: 10px;">
        <div class="" style="min-height: 70px; margin-left: 10px;">
          <span style="font-weight: 400;">{{ realty.type_code }}</span>, {{ realty.rooms_count }} комн., {{ realty.floor }} эт., {{ realty.sqare_total }} кв. м.<br> {{ realty.address }} <br>
          <span class="text-primary">{{ realty.owner_price }} тыс. руб.</span>, <br>
          <span class="owner">Собственник (914)1593476</span>
        </div>
        <div class="healthbar">
          <div class="health"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .billet {
      background-color: inherit;
      color: #696969;
      font-weight: 200;
      font-size: 14;
      position: relative;
      padding-top: 5px;
    }
    .billet.selected {
      background-color: #157ad3;
      color: #fff !important;
    }
    .healthbar {
      height: 1px;
      width: 95%;
      margin: 5px 0 0 5px;
      background: #ccc;
      position: relative;
    }
    .healthbar > .health {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0%;
      background-color: red;
    }
    .timestamp {
      position: absolute;
      top: 6px; right: 6px;
      font-size: 11;
      color: #bbb;
    }
    .owner {
      color: #bbb;
    }
    .tag-mark {
      position: absolute;
      right: 10px;
      top: 40%;
    }
  `],
  directives: [UITag],
})

export class RealtyDigestComponent {
    public realty: Realty;
    public compact: boolean = false;
    to: any;

    constructor(private _hubService: HubService) {};

    select() {
      this.realty.selected = !this.realty.selected;
    }

    open() {
      this.realty.selected = true;
      var tab_sys = this._hubService.getProperty('tab_sys');
      tab_sys.addTab('realty', { realty: this.realty });
    }

    tstart() {
      clearTimeout(this.to);
      this.to = setTimeout(() => {
        this.open();
      }, 1000);
    }
    tend() {
      clearTimeout(this.to);
    }

}
