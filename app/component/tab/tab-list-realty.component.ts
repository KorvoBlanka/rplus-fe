import {
  Component,
  ChangeDetectionStrategy,
  ElementRef
} from 'angular2/core';

import {RealtyService} from '../../service/realty.service';
import {ConfigService} from '../../service/config.service';

import {Tab} from '../../class/tab';
import {Realty} from '../../class/realty';

import {UISelect, UISelectConfig} from '../ui/ui-select.component';

import {RealtyDigestComponent} from '../digest/realty-digest.component';
import {RealtyTableComponent} from '../realty-table.component';
import {GoogleMapComponent, GoogleMapMarkerComponent} from '../google-map.component';


@Component({
  //changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tab-list-realty',
  inputs: ['tab'],
  directives: [GoogleMapComponent, GoogleMapMarkerComponent, RealtyDigestComponent, RealtyTableComponent, UISelect],
  template: `

  <div class="search-form" [class.table-mode]="table_mode">
    <div class="search-box">
      <input type="text" class="" placeholder="" style="height: 28px; width: 100%;">
      <span class="icon-search" style="position: absolute; right: 12px; top: 7px;"></span>
    </div>
    <div class="tool-box">

      <div class="pull-left">
        <div class="inline-select">
          <ui-select class="view-value edit-value"
            [values] = "[
              {val: 0, label: 'Все'},
              {val: 1, label: 'Не активен'},
              {val: 2, label: 'Активен'},
              {val: 3, label: 'В работе'},
              {val: 4, label: 'Приостановлен'},
              {val: 5, label: 'Архив'}
            ]"
            [label]="'Все'"
            [config]="{icon: 'icon-square', draw_arrow: true}"
          >
          </ui-select>
        </div>
        <div class="inline-select">
          <ui-select class="view-value edit-value"
            [values] = "[
              {val: 1, label: 'Агент 1_1'},
              {val: 2, label: 'Агент 1_2'},
              {val: 3, label: 'Агент 1_3'},
              {val: 4, label: 'Агент 1_4'},
              {val: 5, label: 'Агент 1_5'}
            ]"
            [label]="'Агент 1_1'"
            [config]="{icon: 'icon-person', draw_arrow: true}"
          >
          </ui-select>
        </div>
        <div class="inline-select">
          <ui-select class="view-value edit-value"
            [values] = "[
              {val: 0, label: 'Все'},
              {val: 1, label: 'Красный', icon: 'icon-circle tag-red'},
              {val: 2, label: 'Оранжевый', icon: 'icon-circle tag-orange'},
              {val: 3, label: 'Желтый', icon: 'icon-circle tag-yellow'},
              {val: 4, label: 'Зеленый', icon: 'icon-circle tag-green'},
              {val: 5, label: 'Голубой', icon: 'icon-circle tag-blue'},
              {val: 6, label: 'Лиловый', icon: 'icon-circle tag-violet'},
              {val: 7, label: 'Серый', icon: 'icon-circle tag-gray'}
            ]"
            [label]="'Все'"
            [config]="{icon: 'icon-tag', draw_arrow: true}"
          >
          </ui-select>
        </div>
        <div class="inline-select">
          <ui-select class="view-value edit-value"
            [values] = "[
              {val: 1, label: '1 день'},
              {val: 2, label: '3 дня'},
              {val: 3, label: 'Неделя'},
              {val: 4, label: '2 недели'},
              {val: 5, label: 'Месяц'},
              {val: 6, label: '3 месяца'},
              {val: 7, label: 'Все'}
            ]"
            [label]="'3 месяца'"
            [config]="{icon: 'icon-month', draw_arrow: true}"
          >
          </ui-select>
        </div>
      </div>
      <div class="pull-right">
        <a (click)="toggleDraw()" [hidden]="table_mode">
          <span
            [ngClass]="{'icon-cancel': map_draw_allowed, 'icon-edit': !map_draw_allowed}"
            ></span>
        </a>
        <a (click)="toggleMode()">
          <span
            [ngClass]="{'icon-globus': table_mode, 'icon-table': !table_mode}"
            ></span>
        </a>
      </div>
    </div>
  </div>

  <realty-table
    [hidden]="!table_mode"
    [realty]="realtys"
  >
  </realty-table>

  <div class="tab-button fixed-button" (click)="toggleLeftPane()">
    <span [ngClass]="{'icon-arrow-right': pane_hidden, 'icon-arrow-left': !pane_hidden}"></span>
  </div>

  <div class="realty-list"
    [hidden]="table_mode"
    (window:resize)="onResize($event)"
    >
    <div class="pane" [hidden]="pane_hidden" [style.width.px]="pane_width">
      <div class="header">
        <div class="header-label">
          {{ tab.header }}
        </div>
      </div>
      <div class="digest-list"
        (scroll)="scroll($event)"
        [style.height]="pane_height"
        >
        <reaty-digest *ngFor="#realty of realtys"
          [realty]="realty"
          (click)="select(realty)"
          >
        </reaty-digest>
      </div>
    </div>
    <div class="work-area" [style.width.px]="map_width">
      <google-map
        [latitude]="lat"
        [longitude]="lon"
        [zoom]="zoom"
        [draw_allowed]="map_draw_allowed"
        (drawFinished)="finishDraw($event)"
        >
        <t *ngFor="#r of realtys">
          <google-map-marker
            *ngIf="r.location"
            (click)="markerClick(r)"
            [is_selected]="r.selected"
            [latitude]="parseFloat(r.location.lat)"
            [longitude]="parseFloat(r.location.lon)"
            [info_str]="getRealtyDigest(r)"
            >
          </google-map-marker>
        </t>
      </google-map>
    </div>
  </div>
  `,
  styles: [`
    .search-form {
      position: absolute;
      width: 45%;
      margin-left: 27.5%;
      margin-top: 10px;
      background: #fff;
      z-index: 1;
      border: 1px solid #eee;
    }

    .search-form.table-mode {
      border: 1px solid #fff;
    }

    .tool-box {
      height: 30px;
      margin: 0 12px;
    }

    .search-box {
      position: relative;
      margin: 12px;
      margin-bottom: 8px;
    }

    .realty-list {
      position: relative;
    }

    .digest-list {
      overflow-x: scroll;
    }

    .pane {
      float: left;
      width: 370px;
      height: 100%;
      border-right: 1px solid #ccc;
    }

    .work-area {
      float: left;
      width: 77%;
      height: 100%;
    }

    .fixed-button {
      position: fixed;
      top: 0;
      left: 0;
    }

    .inline-select {
      display: inline-block;
      height: 20px;
      padding: 0 15px;
      font-size: 14;
      color: #666;
    }
    `]
  })

  export class TabListRealtyComponent {
    public tab: Tab;
    public table_mode: boolean = false;
    public map_draw_allowed = false;

    pane_height: number;
    pane_width: number;
    map_width: number;
    pane_hidden: boolean = false;

    lat: number;
    lon: number;
    zoom: number;

    realtys: Realty[] = [];
    page: number = 0;

    to: number;
    list: HTMLElement;


    parseFloat(v: any) {
      return parseFloat(v);
    }

    constructor(private _elem: ElementRef, private _realtyService: RealtyService, private _configService: ConfigService) {

      this._realtyService.getRealty(1, 32).then(realty => {
        this.realtys = realty;
        this.page ++;
      });

      setTimeout(() => { this.tab.header = 'Недвижимость'; });
    }

    ngOnInit() {
      this.list = this._elem.nativeElement.querySelector('.digest-list');
      var c = this._configService.getConfig();
      this.lat = c.map.lat;
      this.lon = c.map.lon;
      this.zoom = c.map.zoom;

      this.calcSize();
    }

    onResize(e) {
      this.calcSize();
    }

    toggleMode() {
      this.table_mode = !this.table_mode;
    }

    toggleDraw() {
      this.map_draw_allowed = !this.map_draw_allowed;
    }

    finishDraw(e) {
      console.log('yay! finish')
      //this.map_draw_allowed = false;
      console.log(e);
    }

    calcSize() {
      if (this.pane_hidden) {
        this.pane_width = 0;
      } else {
        this.pane_width = 420;
      }
      this.map_width = document.body.clientWidth - (30 * 2) - this.pane_width;
      this.pane_height = document.body.clientHeight - 31;
    }

    toggleLeftPane() {
      this.pane_hidden = !this.pane_hidden;
      this.calcSize();
    }

    select(r: Realty) {
      if (r.location) {
        this.lat = r.location.lat;
        this.lon = r.location.lon;
      }
    }

    scroll(e) {
      if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
        this._realtyService.getRealty(this.page, 10).then(realty => {
          for (let i = 0; i < realty.length; i++) {
              this.realtys.push(realty[i]);
          }
          this.page ++;
        });

      }
    }

    markerClick(r: Realty) {
      console.log('markerClick');
      console.log(r);
      r.selected = !r.selected;
      // scroll to object !?
      // let get dirty!
      if (r.selected) {
        var e :HTMLElement = <HTMLElement>this.list.querySelector('#r' + r._id);
        this.list.scrollTop = e.offsetTop - e.clientHeight;
      }
    }

    getRealtyDigest(r: Realty) {
      return Realty.getDigest(r);
    }
  }
