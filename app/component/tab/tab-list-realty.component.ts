import {Component} from 'angular2/core';

import {RealtyService} from '../../service/realty.service';
import {ConfigService} from '../../service/config.service';

import {Tab} from '../../class/tab';
import {Realty} from '../../class/realty';

import {RealtyDigestComponent} from '../realty-digest.component';
import {GoogleMapComponent, GoogleMapMarkerComponent} from '../google-map.component';


@Component({
    selector: 'tab-list-realty',
    inputs: ['tab'],
    directives: [GoogleMapComponent, GoogleMapMarkerComponent, RealtyDigestComponent],
    template: `
      <div class="tab-button fixed-button" (click)="toggleLeftPane()">
        <span [ngClass]="{'icon-chevron-right': pane_hidden, 'icon-chevron-left': !pane_hidden}"></span>
      </div>
      <div class="list-realty" (window:resize)="onResize($event)">
        <div class="pane" [hidden]="pane_hidden" [style.width.px]="pane_width">
          <div class="header">
          </div>
          <div class="digest-list" [style.height]="pane_height" (scroll)="scroll($event)">
            <reaty-digest *ngFor="#realty of realtys" [realty]="realty" (click)="select(realty)">
            </reaty-digest>
          </div>
        </div>
        <div class="work-area" [style.width.px]="map_width">
          <google-map [latitude]="lat" [longitude]="lon" [zoom]="zoom">
            <t *ngFor="#r of realtys">
            <google-map-marker
 	            *ngIf="r._source.location"
              (click)="markerClick(r)"
              [latitude]="parseFloat(r._source.location.lat)"
              [longitude]="parseFloat(r._source.location.lon)"
              [info_str]="r._source.description"></google-map-marker>
            </t>
          </google-map>
        </div>
      </div>
    `,
    styles: [`

      reaty-digest:nth-child(odd) {
        /*background: #f0f0f0;*/
      }

      .digest-list {
        overflow-x: scroll;
      }

      .list-realty {
        position: relative;
      }
      .header {
        width: 100%;
        height: 30px;
        border-bottom: 1px solid rgba(0,0,0,.2);
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
      .tab-button {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 12px !important;
        cursor: pointer;
        color: #666;
      }
      .fixed-button {
        position: fixed;
        top: 0;
        left: 0;
      }
      .sebm-google-map-container {
         height: 100%;
      }
    `]
})

export class TabListRealtyComponent {
    public tab: Tab;
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

    parseFloat(v: any) {
      return parseFloat(v);
    }

    constructor(private _realtyService: RealtyService, private _configService: ConfigService) { }

    ngOnInit() {
        var c = this._configService.getConfig();
        this.lat = c.map.lat;
        this.lon = c.map.lon;
        this.zoom = c.map.zoom;

        this.realtys = this._realtyService.getRealty(1, 16);
        this.calcSize();
    }

    ngAfterContentInit() {
        setTimeout(() => { this.tab.header = 'realty list'; });
    }

    onResize(e) {
        this.calcSize();
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

    markerClick(r: any) {
        r.selected = true;
        // scroll to object ???
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
}
