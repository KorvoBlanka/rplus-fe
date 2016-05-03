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
import {OrganisationService} from '../../service/organisation.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service'
import {RealtyService} from '../../service/realty.service';
import {PersonService} from '../../service/person.service';

import {UISelect} from '../ui/ui-select.component';
import {UICarousel} from '../ui/ui-carousel.component';
import {UITagBlock} from '../ui/ui-tag-block.component';
import {UITabs} from '../ui/ui-tabs.component';
import {UITab} from '../ui/ui-tab.component';
import {UIPieChart} from '../ui/ui-pie-chart.component';
import {UILineChart} from '../ui/ui-line-chart.component';
import {UIBarChart} from '../ui/ui-bar-chart.component';

import {HistoryDigestComponent} from '../digest/history-digest.component';
import {RealtyDigestComponent} from '../digest/realty-digest.component';
import {PersonDigestComponent} from '../digest/person-digest.component';
import {GoogleMapComponent, GoogleMapMarkerComponent} from '../google-map.component';


@Component({
    selector: 'tab-organisation',
    inputs: ['tab'],
    pipes: [FormatDatePipe],
    directives: [
      HistoryDigestComponent,
      RealtyDigestComponent,
      PersonDigestComponent,
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


      <div class="organisation"
        (window:resize)="onResize($event)"
      >

    <!-- ЛЕВАЯ СТВОРКА: НАЧАЛО -->

        <div class="pane" [hidden]="pane_hidden" [style.width.px]="pane_width">
          <div class="header">
            <div class="header-label">
              {{ tab.header }}
            </div>
          </div>
          <div class="organisation-prop" [style.height]="pane_height">

            <div style="margin: 5px;">

              <div class="pull-container">
                <div class="font-sz-2 pull-left">Источник: ???<span class="color-g1"><a href="" target="_blank"></a></span></div>
                <div class="font-sz-1 color-g2 pull-right"> {{ organisation.add_date | formatDate }} </div>
              </div>

              <hr>

              <div class="pull-container" style="margin: 0 10px;">
                <div class="pull-right" [hidden]="edit_enabled" (click)="toggleEdit()"><a href="#" >Изменить</a></div>
                <div class="pull-right" [hidden]="!edit_enabled" (click)="save()"><a href="#" >Готово</a></div>
              </div>

          <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->

              <div class="edit-block" [hidden]="!edit_enabled" style="margin: 20px 10px;">

                <div class="view-group">
                  <span class="view-label">Название</span>
                  <input type="text" class="view-value edit-value" [(ngModel)]="organisation.name">
                </div>
                <br>

                <div class="view-group">
                  <span class="view-label">Адрес</span>
                  <input type="text" class="view-value edit-value" [(ngModel)]="organisation.address">
                </div>

                <br>
                <div class="view-group" style="flex-wrap: wrap;">
                  <span class="view-label">Иформация</span>
                  <textarea class="view-value text-value" placeholder="" [(ngModel)]="organisation.description" style="text-align: left;"></textarea>
                </div>

              </div>

          <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: КОНЕЦ -->
          <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->

              <div class="view-block" [hidden]="edit_enabled" style="margin: 20px 10px;">

                <div class="view-group">
                  <span class="view-label pull-left">Название</span>
                  <span class="view-value"> {{ organisation.name }}</span>
                </div>

                <div class="view-group">
                  <span class="view-label pull-left">Адрес</span>
                  <span class="view-value"> {{ organisation.address }}</span>
                </div>

                <br>
                <div class="view-group">
                  <span class="view-label pull-left">Информация</span>
                  <span class="view-value" style="height: initial;"> {{ organisation.description }} </span>
                </div>

              </div>

          <!-- РЕЖИМ ОТОБРАЖЕНИЯ: КОНЕЦ -->

              <div style="margin-bottom: 20px;">
                <div class="view-group">
                  <span class="icon-tag"> Тэги</span>
                </div>
                <ui-tag-block
                  [value] = "organisation.tag"
                  (valueChange) = "organisation.tag = $event.value"
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
              [title]="'Контакты'"
              (tabSelect)="personsSelected()"
            >

              <div class="" style="margin-top: 25xp; max-width: 915px; overflow-y: scroll;" [style.height]="pane_height">
                <div class="button" (click)="addContact()">
                  Добавить контакт
                </div>

                <person-digest *ngFor="#p of persons"
                  [person]="p"
                >
                </person-digest>
              </div>

            </ui-tab>

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

      .button {
        text-align: center;
        padding: 5px 15px;
        background-color: #3366cc;
        color: #fff;
        cursor: pointer;

        margin-top: 25px;
      }
    `]
})

export class TabOrganisationComponent {
    public tab: Tab;
    public organisation: Organisation;

    persons: Person[];
    offers: Realty[];

    history_recs: HistoryRecord[];

    new_request: boolean = false;
    edit_enabled: boolean = false;

    pane_hidden: boolean = false;
    pane_height: number;
    pane_width: number;
    map_width: number;


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
        private _taskService: TaskService,
        private _analysisService: AnalysisService,
        private _historyService: HistoryService,
        private _personService: PersonService,
        private _organisationService: OrganisationService
      ) {
      setTimeout(() => { this.tab.header = 'Контрагент' });
    }

    ngOnInit() {
      this.organisation = this.tab.args.organisation;
      if (this.organisation.id == null) {
        this.toggleEdit();
      }
      this.calcSize();
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
      if (this.organisation.id == null) {
        this._organisationService.create(this.organisation).then(org => {
          this.organisation = org;
        });
      } else {
        this._organisationService.update(this.organisation).then(org => {
          this.organisation = org;
        });;
      }
      this.toggleEdit();
    }

    offersSelected() {
      //this.getOffers(1, 16);
    }

    personsSelected() {
      this.getPersons(0, 32);
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

    getPersons(page, per_page) {
      this._personService.list(page, per_page, this.organisation.id, "").then(persons => {
        this.persons = persons;
      });;
    }

    getOffers(page, per_page) {
      //this._realtyService.getSimilarRealty(page, per_page);
    }

    offer_search() {
      //this.getOffers(Math.floor(Math.random() * 4), 16);
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

    addContact() {
      var tab_sys = this._hubService.getProperty('tab_sys');
      var p = new Person();
      p.organisation_id = this.organisation.id;
      tab_sys.addTab('person', { person: p});
    }

    getRealtyDigest(r: Realty) {
      return Realty.getDigest(r);
    }
}
