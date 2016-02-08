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

import {RealtyDigestComponent} from '../realty-digest.component';
import {RealtyTableComponent} from '../realty-table.component';
import {GoogleMapComponent, GoogleMapMarkerComponent} from '../google-map.component';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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

      <div class="inline-select">
        <ui-select class="view-value edit-value"
          [values] = "[
            {id: 0, text: 'Все'},
            {id: 1, text: 'Не активен'},
            {id: 2, text: 'Активен'},
            {id: 3, text: 'В работе'},
            {id: 4, text: 'Приостановлен'},
            {id: 5, text: 'Архив'}
          ]"
          [value]="{id: 0, text: 'Все'}"
          [config]="{icon: 'icon-square', draw_arrow: true}"
        >
        </ui-select>
      </div>
      <div class="inline-select">
        <ui-select class="view-value edit-value"
          [values] = "[
            {id: 1, text: 'Агент 1_1'},
            {id: 2, text: 'Агент 1_2'},
            {id: 3, text: 'Агент 1_3'},
            {id: 4, text: 'Агент 1_4'},
            {id: 5, text: 'Агент 1_5'}
          ]"
          [value]="{id: 0, text: 'Агент 1_1'}"
          [config]="{icon: 'icon-person', draw_arrow: true}"
        >
        </ui-select>
      </div>

      <div class="inline-select">
        <ui-select class="view-value edit-value"
          [values] = "[
            {id: 0, text: 'Все'},
            {id: 1, icon: 'icon-circle tag-red', text: 'Красный'},
            {id: 2, icon: 'icon-circle tag-orange', text: 'Оранжевый'},
            {id: 3, icon: 'icon-circle tag-yellow', text: 'Желтый'},
            {id: 4, icon: 'icon-circle tag-green', text: 'Зеленый'},
            {id: 5, icon: 'icon-circle tag-blue', text: 'Голубой'},
            {id: 6, icon: 'icon-circle tag-violet', text: 'Лиловый'},
            {id: 7, icon: 'icon-circle tag-gray', text: 'Серый'}
          ]"
          [value]="{id: 0, text: 'Все'}"
          [config]="{icon: 'icon-tag', draw_arrow: true}"
        >
        </ui-select>
      </div>

      <div class="inline-select">
        <ui-select class="view-value edit-value"
          [values] = "[
            {id: 1, text: '1 день'},
            {id: 2, text: '3 дня'},
            {id: 3, text: 'Неделя'},
            {id: 4, text: '2 недели'},
            {id: 5, text: 'Месяц'},
            {id: 6, text: '3 месяца'},
            {id: 7, text: 'Все'}
          ]"
          [value]="{id: 0, text: '3 месяца'}"
          [config]="{icon: 'icon-month', draw_arrow: true}"
        >
        </ui-select>
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

  <div class="list-realty"
    [hidden]="table_mode"
    (window:resize)="onResize($event)"
    >
    <div class="pane" [hidden]="pane_hidden" [style.width.px]="pane_width">
      <div class="header"></div>
      <div class="digest-list"
        (scroll)="scroll($event)"
        [attr.scrollTop]="scroll_pos"
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
            *ngIf="r._source.location"
            (click)="markerClick(r)"
            [is_selected]="r.selected"
            [latitude]="parseFloat(r._source.location.lat)"
            [longitude]="parseFloat(r._source.location.lon)"
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

    .list-realty {
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
    page: number = 1;

    to: number;
    list: HTMLElement;
    scroll_pos: number;


    parseFloat(v: any) {
      return parseFloat(v);
    }

    constructor(private _elem: ElementRef, private _realtyService: RealtyService, private _configService: ConfigService) {
      this.realtys = this._realtyService.getRealty(1, 32);
      setTimeout(() => { this.tab.header = 'realty list'; });
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
      if (r._source.location) {
        this.lat = r._source.location.lat;
        this.lon = r._source.location.lon;
      }
    }

    scroll(e) {
      if (e.currentTarget.scrollTop + this.pane_height >= e.currentTarget.scrollHeight) {
        this.page ++;
        var r = this._realtyService.getRealty(this.page, 10);
        for (var i = 0; i < r.length; i++) {
          this.realtys.push(r[i])
        }
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
