import {Component} from 'angular2/core';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {OrganisationService} from '../../service/organisation.service';

import {Tab} from '../../class/tab';
import {Organisation} from '../../class/organisation';

import {UISelect} from '../ui/ui-select.component';

import {OrganisationDigestComponent} from '../digest/organisation-digest.component';

@Component({
  selector: 'tab-list-organisation',
  inputs: ['tab'],
  directives: [OrganisationDigestComponent, UISelect],
  template: `

  <div class="header-label-abs">
    {{ tab.header }}
  </div>

  <div class="search-form" [class.table-mode]="table_mode">
    <div class="search-box">
      <input type="text" class="" placeholder="" style="height: 28px; width: 100%;"
        [(ngModel)]="searchQuery" (keyup)="searchParamChanged($event)"
      >
      <span class="icon-search" style="position: absolute; right: 12px; top: 7px;"></span>
    </div>
    <div class="tool-box">

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
  </div>

  <div class="organisation-list-wrapper">
    <div class="scroll-wrapper">

      <div class="button"
        (click)="addOrganisation()"
      >
        Добавить организацию
      </div>

      <organisation-digest
        *ngFor="#o of organisations"
        [organisation]="o"
      >
      </organisation-digest>

    </div>
  </div>
  `,
  styles: [`

    .search-form {
      width: 50%;
      min-width: 800px;
      margin: 0 auto;
      margin-top: 10px;
      background: #fff;
      z-index: 1;
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

    .organisation-list-wrapper {
      padding-top: 25px;
      max-width: 1200px;
      margin: 0 auto;
      height: 100%;
      width: 100%;
    }

    .scroll-wrapper {
      height: calc(100% - 115px);
      overflow-y: auto;
    }

    .inline-select {
      display: inline-block;
      height: 20px;
      padding: 0 15px;
      font-size: 14;
      color: #666;
    }

    .button {
      text-align: center;
      padding: 5px 15px;
      background-color: #3366cc;
      color: #fff;
      cursor: pointer;
    }

  `]
})

  export class TabListOrganisationComponent {
    public tab: Tab;

    organisations: Organisation[] = [];
    page: number = 0;
    perPage: number = 32;
    searchQuery: string = "";

    constructor(private _configService: ConfigService, private _hubService: HubService, private _organisationService: OrganisationService) {
      this._organisationService.list(this.page, this.perPage, "").then(orgs => {
        this.organisations = orgs;
        this.page ++;
      });
      setTimeout(() => { this.tab.header = 'Контрагенты'; });
    }

    scroll(e) {
      if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
        this._organisationService.list(this.page, this.perPage, "").then(orgs => {
          for (let i = 0; i < orgs.length; i++) {
              this.organisations.push(orgs[i]);
          }
          this.page ++;
        });
      }
    }

    addOrganisation() {
      var tab_sys = this._hubService.getProperty('tab_sys');
      tab_sys.addTab('organisation', { organisation: new Organisation() });
    }

    searchParamChanged(event: any) {
      this.page = 0;

      this._organisationService.list(this.page, this.perPage, this.searchQuery).then(orgs => {
        this.organisations = orgs;
        this.page ++;
      });

    }
  }
