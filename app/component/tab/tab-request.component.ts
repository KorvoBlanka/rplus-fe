import {Component} from 'angular2/core';

import {FormatDatePipe} from '../../pipe/format-date.pipe';

import {AnalysisService} from '../../service/analysis.service'
import {Tab} from '../../class/tab';
import {Realty} from '../../class/realty';
import {Person} from '../../class/person';
import {Organisation} from '../../class/organisation';
import {Request} from '../../class/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {RealtyService} from '../../service/realty.service';
import {RequestService} from '../../service/request.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service'
import {PersonService} from '../../service/person.service';

import {UISelect} from '../ui/ui-select.component';
import {UICarousel} from '../ui/ui-carousel.component';
import {UITagBlock} from '../ui/ui-tag-block.component';
import {UITabs} from '../ui/ui-tabs.component';
import {UITab} from '../ui/ui-tab.component';
import {UIPieChart} from '../ui/ui-pie-chart.component';
import {UILineChart} from '../ui/ui-line-chart.component';
import {UIBarChart} from '../ui/ui-bar-chart.component';

import {RealtyDigestComponent} from '../digest/realty-digest.component';
import {RequestDigestComponent} from '../digest/request-digest.component';
import {HistoryDigestComponent} from '../digest/history-digest.component';
import {GoogleMapComponent, GoogleMapMarkerComponent} from '../google-map.component';


@Component({
    selector: 'tab-request',
    inputs: ['tab'],
    pipes: [FormatDatePipe],
    directives: [
      RealtyDigestComponent,
      RequestDigestComponent,
      HistoryDigestComponent,
      GoogleMapComponent,
      GoogleMapMarkerComponent,
      UISelect,
      UICarousel,
      UITagBlock,
      UITabs,
      UITab,
      UIPieChart,
      UILineChart,
      UIBarChart
    ],
    template: `

      <div class="tab-button fixed-button" (click)="toggleLeftPane()">
        <span [ngClass]="{'icon-arrow-right': pane_hidden, 'icon-arrow-left': !pane_hidden}"></span>
      </div>

      <div class="new-request"
        [hidden]="!new_request"
      >
        <div class="search-form" [class.table-mode]="table_mode">
          <div class="search-box with-button">
            <input type="text" class="" placeholder="" [(ngModel)]="query_text">
            <div class="search-button" (click)="createRequest()">Создать</div>
          </div>
          <div class="tool-box">
            <div class="pull-left">
            </div>
            <div class="pull-right">
              <a (click)="toggleDraw()" [hidden]="table_mode">
                <span
                  [ngClass]="{'icon-cancel': map_draw_allowed, 'icon-edit': !map_draw_allowed}"
                ></span>
              </a>
            </div>
          </div>
        </div>

        <!-- сильное колдунство, св-во right получаем из HubService -->
        <!-- TODO: сделать это отдельным компонентом -->
        <div  style="position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;" [style.right]="_hubService.shared_var['nb_width']">
          <div style="width: 330px; background-color: #fff;">
            <div class="header">
              <input type="text" style="width: 280px; margin-left: 10px; border: none;"
                (keydown)="offer_search_keydown($event)"
               >
               <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                 (click)="offer_search()"
               ></span>
            </div>
            <div class="" style="width: 100%; overflow-y: scroll;" [style.height]="pane_height">
              <reaty-digest *ngFor="#realty of offers"
                [realty]="realty"
                [compact]="true"
               >
              </reaty-digest>
            </div>
          </div>
        </div>

        <google-map
          [latitude]="lat"
          [longitude]="lon"
          [zoom]="zoom"
          [draw_allowed]="map_draw_allowed"
          (drawFinished)="drawFinished($event)"
        >
        </google-map>
      </div>

      <div class="request"
        (window:resize)="onResize($event)"
        [hidden]="new_request"
      >

    <!-- ЛЕВАЯ СТВОРКА: НАЧАЛО -->

        <div class="pane" [hidden]="pane_hidden" [style.width.px]="pane_width">
          <div class="header">
            <div class="header-label">
              {{ tab.header }}
            </div>
          </div>
          <div class="request-prop" [style.height]="pane_height">

            <div style="margin: 5px;">

              <div class="pull-container">
                <div class="font-sz-2 pull-left">Источник: звонок<span class="color-g1"><a href="" target="_blank"></a></span></div>
                <div class="font-sz-1 color-g2 pull-right"> {{ request.add_date | formatDate }} </div>
              </div>

              <hr>

              <div class="pull-container" style="margin: 0 10px;">
                <div class="pull-right" [hidden]="edit_enabled" (click)="toggleEdit()"><a href="#" >Изменить</a></div>
                <div class="pull-right" [hidden]="!edit_enabled" (click)="save()"><a href="#" >Готово</a></div>
              </div>

          <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->

              <div class="edit-block" [hidden]="!edit_enabled" style="margin: 20px 10px;">

                <div class="view-group">
                  <span class="view-label">Контакт</span>
                  <span class="view-value">{{ person.name }}</span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Договор</span>
                  <span class="view-value"> #4242421365 от 08.02.22</span>
                </div>
                <br>

                <div class="view-group">
                  <span class="view-label">Ответственный</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Агент 1_1'},
                      {val: 2, label: 'Агент 1_2'},
                      {val: 3, label: 'Агент 1_3'},
                      {val: 4, label: 'Агент 1_4'},
                      {val: 5, label: 'Агент 1_5'}
                    ]"
                    [label]="'Агент 1_1'"
                    (valueChange)="log($event)"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Статус</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Не активен'},
                      {val: 2, label: 'Активен'},
                      {val: 3, label: 'В работе'},
                      {val: 4, label: 'Приостановлен'},
                      {val: 5, label: 'Архив'}
                    ]"
                    [label]="request.state_code"
                    (valueChange)="log($event)"
                  >
                  </ui-select>
                </div>

                <div class="view-group">
                  <span class="view-label">Стадия</span>
                  <ui-select class="view-value edit-value"
                    [values] = "[
                      {val: 1, label: 'Первичный контакт'},
                      {val: 2, label: 'Заключение договора'},
                      {val: 3, label: 'Показ'},
                      {val: 4, label: 'Подготовка договора'},
                      {val: 5, label: 'Принятие решения'},
                      {val: 6, label: 'Переговоры'},
                      {val: 7, label: 'Сделка'}
                    ]"
                    [label]="'Первичный контакт'"
                    (valueChange)="log($event)"
                  >
                  </ui-select>
                </div>

                <br>
                <div class="view-group">
                  <span class="view-label">Запрос</span>
                  <input type="text" class="view-value edit-value" readonly [(ngModel)]="request._source.req_text">
                </div>
                <br>

                <div class="view-group" style="flex-wrap: wrap;">
                  <span class="view-label">Иформация</span>
                  <textarea class="view-value text-value" placeholder="" [(ngModel)]="request.info" style="text-align: left;"></textarea>
                </div>

              </div>

          <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: КОНЕЦ -->
          <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->

              <div class="view-block" [hidden]="edit_enabled" style="margin: 20px 10px;">

                <div class="view-group">
                  <span class="view-label">Контакт</span>
                  <span class="view-value">{{ person.name }}</span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Договор</span>
                  <span class="view-value"> #4242421365 от 08.02.22</span>
                </div>
                <br>

                <div class="view-group">
                  <span class="view-label">Ответственный</span>
                  <span class="view-value"> Агент 1_1</span>
                </div>

                <div class="view-group">
                  <span class="view-label">Статус</span>
                  <span class="view-value"> Активен</span>
                </div>
                <div class="view-group">
                  <span class="view-label">Стадия</span>
                  <span class="view-value"> {{ request.state_code }} </span>
                </div>

                <br>
                <div class="view-group">
                  <span class="view-label pull-left">Запрос</span>
                  <span class="view-value"> {{ request._source.req_text }}</span>
                </div>
                <br>

                <div class="view-group">
                  <span class="view-label pull-left">Информация</span>
                  <span class="view-value" style="height: initial;"> {{ request.info }} </span>
                </div>

              </div>

          <!-- РЕЖИМ ОТОБРАЖЕНИЯ: КОНЕЦ -->

              <div style="margin-bottom: 20px;">
                <div class="view-group">
                  <span class="icon-tag"> Тэги</span>
                </div>
                <ui-tag-block
                  [value] = "person.tag"
                  (valueChange) = "person.tag = $event.value"
                ></ui-tag-block>
              </div>

            </div>
          </div>
        </div>

    <!-- Левая СТВОРКА: КОНЕЦ -->
    <!-- РАБОЧАЯ ОБЛАСТЬ: НАЧАЛО -->

        <div class="work-area" [style.width.px]="map_width">
          <ui-tabs
            [header_mode]="!pane_hidden"
          >
            <ui-tab
              [title]="'Предложения'"
              (tabSelect)="offersSelected()"
            >

              <!-- сильное колдунство, св-во right получаем из HubService -->
              <!-- TODO: сделать это отдельным компонентом -->
              <div  style="position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;" [style.right]="_hubService.shared_var['nb_width']">
                <div style="width: 330px; background-color: #fff;">
                  <div class="header">
                    <input type="text" style="width: 280px; margin-left: 10px; border: none;"
                      (keydown)="offer_search_keydown($event)"
                     >
                     <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                       (click)="offer_search()"
                     ></span>
                  </div>
                  <div class="" style="width: 100%; overflow-y: scroll;" [style.height]="pane_height">
                    <reaty-digest *ngFor="#realty of offers"
                      [realty]="realty"
                      [compact]="true"
                     >
                    </reaty-digest>
                  </div>
                </div>
              </div>
              <google-map
                [latitude]="lat"
                [longitude]="lon"
                [zoom]="zoom"
                [polygone_points]="search_area"
              >
                <t *ngFor="#r of offers">
                <google-map-marker
                  *ngIf="r._source.location"
                  (click)="markerClick(r)"
                  [is_selected]="r.selected"
                  [latitude]="parseFloat(r._source.location.lat)"
                  [longitude]="parseFloat(r._source.location.lon)"
                  [info_str]="getRealtyDigest(r)">
                  [icon_id]="1"
                </google-map-marker>
                </t>

              </google-map>
            </ui-tab>

            <ui-tab [title]="'Аналитика'"
              (tabSelect)="analysisSelected()"
            >
              <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="pane_height">
                <div style="padding: 15px;">
                  <div class="tile bg-gred fg-white">
                    <div class="tile-content iconic">
                        <span class="icon">{{ ch1_data_v1 }}</span>
                    </div>
                    <span class="tile-label">Всего задач</span>
                  </div>
                  <div class="chart-block">
                    <div class="chart-header bg-gred">
                      <span style="margin-left: 25px;">Активность</span>
                    </div>
                    <div>
                      <ui-pie-chart
                        [title]="''"
                        [data]="ch1_data"
                      >
                      </ui-pie-chart>
                    </div>
                  </div>
                </div>

                <div style="padding: 15px;">

                  <div style="float: left; display: flex; flex-direction: column;">
                    <div class="tile bg-gorange fg-white" style="margin-bottom: 5px;">
                      <div class="tile-content iconic">
                          <span class="icon" style="font-size: 48px;">{{ ch4_data_v1 }}</span>
                      </div>
                      <span class="tile-label">Всего объявлений</span>
                    </div>
                    <div class="tile bg-gorange fg-white" >
                      <div class="tile-content iconic">
                          <span class="icon" style="font-size: 48px;">{{ ch4_data_v2 }}</span>
                      </div>
                      <span class="tile-label">Потрачено руб.</span>
                    </div>
                  </div>

                  <div class="chart-block">
                    <div class="chart-header bg-gorange">
                      <span style="margin-left: 25px;">Реклама</span>
                    </div>
                    <div>
                      <ui-bar-chart
                        [title]="''"
                        [data]="ch4_data"
                      >
                      </ui-bar-chart>
                    </div>
                  </div>
                </div>

                <div style="padding: 15px;">
                  <div class="tile bg-gblue fg-white">
                    <div class="tile-content iconic">
                        <span class="icon">{{ ch2_data_v1 }}</span>
                    </div>
                    <span class="tile-label">Всего заявок</span>
                  </div>
                  <div class="chart-block">
                    <div class="chart-header bg-gblue">
                      <span style="margin-left: 25px;">Заявки</span>
                    </div>
                    <div>
                      <ui-line-chart
                        [title]="''"
                        [data]="ch2_data"
                      >
                      </ui-line-chart>
                    </div>
                  </div>
                </div>


                <div style="padding: 15px;">
                  <div style="float: left; display: flex; flex-direction: column;">
                    <div class="tile bg-ggreen fg-white" style="margin-bottom: 5px;">
                      <div class="tile-content iconic">
                        <span class="icon">{{ ch3_data_v1 }}</span>
                      </div>
                      <span class="tile-label">Успешно</span>
                    </div>
                    <div class="tile bg-ggreen fg-white">
                      <div class="tile-content iconic">
                        <span class="icon">{{ ch3_data_v2 }}</span>
                      </div>
                      <span class="tile-label">Не успешно</span>
                    </div>
                  </div>
                  <div class="chart-block">
                    <div class="chart-header bg-ggreen">
                      <span style="margin-left: 25px;">Показы</span>
                    </div>
                    <div>
                      <ui-line-chart
                        [title]="''"
                        [data]="ch3_data"
                      >
                      </ui-line-chart>
                    </div>
                  </div>
                </div>

              </div>
            </ui-tab>
            <ui-tab
              [title]="'История'"
              (tabSelect)="historySelected()"
            >

              <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="pane_height">
                <history-digest *ngFor="#record of history_recs"
                  [history_record]="record"
                >
                </history-digest>
              </div>

            </ui-tab>
          </ui-tabs>

        </div>

    <!-- РАБОЧАЯ ОБЛАСТЬ: КОНЕЦ -->

      </div>
    `,
    styles: [`

      .search-form {
        position: absolute;
        width: 50%;
        margin-left: 25%;
        margin-top: 10px;
        background: #fff;
        z-index: 1;
        border: 1px solid #eee;
      }

      .search-form > input {
        height: 28px;
        width: 100%;
      }

      .with-button {
        overflow: hidden;
      }

      .with-button > input {
        float: left;
        width: calc(100% - 120px);
      }

      .search-button {
        float: right;
        width: 120px;
        height: 24px;
        background-color: #3366cc;
        color: #fff;
        text-align: center;
        cursor: pointer;
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

      .pane {
        float: left;
        width: 370px;
        height: 100%;
        border-right: 1px solid #ccc;
      }
      .work-area {
        float: left;
        width: 100%;
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

      .request-prop {
        overflow-y: scroll;
      }

      .view-group {
        margin-bottom: 5px;

        display: flex;
        justify-content: space-between;

      }
      .view-label {
        white-space: nowrap;
        color: #bbb;

        font-size: 15;
      }
      .view-value {
        width: 100%;;
        text-align: right;
        color: #696969;
        font-size: 15;

        height: 19px; /* костыль */
      }
      .edit-value {
        width: 100%;;
        text-align: right;
        color: #696969;
        font-size: 15;

        height: 19px; /* костыль */

        border: none !important;
        border-bottom: 1px solid #E5E5E5 !important;
      }

      .text-value {
        height: 3rem;
        border: 1px solid #E5E5E5 !important;
      }

      .edit-block > .view-group {
        margin-bottom: 26px;
      }

      .tile-x {
        margin-right: 10px;
        width: 150px;
        height: 150px;
        color: #fff;
        position: relative;
      }


      .tile {
        margin: 0;
        margin-right: 10px;
      }
      .icon {
        line-height: 64px;
      }
      .tile-content.iconic .icon {
        width: 128px;
        margin-left: -64px;
      }
      .chart-block {
        overflow:hidden;
        border: 1px solid #e5e5e5;
      }
      .chart-header {
        width: 100%;
        height: 30px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 30px;
        color: #fff;
      }

      .array-container > span {
        display: block;
        margin-bottom: 5px;
      }

      .array-container > input {
        margin-bottom: 5px;
      }
    `]
})

export class TabRequestComponent {
    public tab: Tab;
    public request: Request;

    person: Person;
    offers: Realty[];

    history_recs: HistoryRecord[];

    new_request: boolean = false;
    edit_enabled: boolean = false;
    map_draw_allowed: boolean = false;

    pane_hidden: boolean = false;
    pane_height: number;
    pane_width: number;
    map_width: number;

    // для нового запроса
    search_area: any;
    query_text: string;
    //

    lat: number = 48.480007;
    lon: number = 135.054954;
    zoom: number = 16;

    ch1_data: any[] = [];
    ch2_data: any[] = [];
    ch3_data: any[] = [];

    ch4_data: any[] = [];

    ch1_data_v1: number;
    ch2_data_v1: number;
    ch3_data_v1: number;
    ch3_data_v2: number;
    ch4_data_v1: number;
    ch4_data_v2: number;

    log(e) {
      console.log(e);
    }
    parseFloat(v: any) {    // сделать пайп
      return parseFloat(v);
    }

    constructor(private _hubService: HubService,
        private _configService: ConfigService,
        private _realtyService: RealtyService,
        private _requestService: RequestService,
        private _taskService: TaskService,
        private _analysisService: AnalysisService,
        private _historyService: HistoryService,
        private _personService: PersonService
      ) {
      setTimeout(() => { this.tab.header = 'Запрос' });
    }

    ngOnInit() {
      this.request = this.tab.args.request;
      if (!this.request) {
        this.new_request = true;
        this.request = this._requestService.getEmpty();
        this.person = this.tab.args.person;
      } else {
        this.person = this._personService.getRandom();
      }
      this.calcSize();

      console.log(this.request);
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

    toggleEdit() {
      this.edit_enabled = !this.edit_enabled;
    }

    save() {
      this.toggleEdit();
    }

    offersSelected() {
      this.getOffers(1, 16);
    }

    analysisSelected() {
      var a_data = this._analysisService.getObjAnalysis();
      this.ch1_data = a_data.ch1_data;
      this.ch1_data_v1 = a_data.ch1_data_v1;

      this.ch2_data = a_data.ch2_data;
      this.ch2_data_v1 = a_data.ch2_data_v1;

      this.ch3_data = a_data.ch3_data;
      this.ch3_data_v1 = a_data.ch3_data_v1;
      this.ch3_data_v2 = a_data.ch3_data_v2;

      this.ch4_data = [
        ['media', 'подано'],
        ['avito', 7],
        ['из рук в руки', 4],
        ['презент', 6],
        ['фарпост', 8],
        ['ВНХ', 6],
      ];

      this.ch4_data_v1 = 31;
      this.ch4_data_v2 = 5000;
    }

    historySelected() {
      this.history_recs = this._historyService.getObjHistory();
    }

    getOffers(page, per_page) {
      this.offers = this._realtyService.getSimilarRealty(page, per_page);
    }

    offer_search() {
      this.getOffers(Math.floor(Math.random() * 4), 16);
    }

    offer_search_keydown(e: KeyboardEvent) {
      if (e.keyCode == 13) {
        this.offer_search();
      }
    }

    markerClick(r: Realty) {
      console.log('markerClick');
      console.log(r);
      r.selected = !r.selected;
      // scroll to object ???
    }

    drawFinished(e) {
      console.log('draw_finished');
      console.log(e);
      this.search_area = e;
    }

    createRequest() {
      this.new_request = false;

      //this.request = this._requestService.getEmpty();

      this.request._source.req_text = this.query_text;
    }

    toggleDraw() {
      this.map_draw_allowed = !this.map_draw_allowed;
    }

    getRealtyDigest(r: Realty) {
      return Realty.getDigest(r);
    }
}
