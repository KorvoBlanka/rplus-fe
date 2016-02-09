import {Component} from 'angular2/core';

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

  <div class="search-form" [class.table-mode]="table_mode">
    <div class="search-box">
      <input type="text" class="" placeholder="" style="height: 28px; width: 100%;">
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

      <div class="pull-right">
        <a (click)="addContact()">
          <span class="icon-add"></span>
        </a>
      </div>

    </div>
  </div>

  <div class="organisation-list-wrapper">
    <div class="scroll-wrapper">

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

  `]
})

  export class TabListOrganisationComponent {
    public tab: Tab;

    organisations: Organisation[] = [];
    page: number = 1;

    constructor(private _configService: ConfigService, private _organisationService: OrganisationService) {
      this.organisations = this._organisationService.getOrganisationList(1, 32);
      setTimeout(() => { this.tab.header = 'organisation list'; });
    }

    scroll(e) {
      if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
        this.page ++;
        var r = this._organisationService.getOrganisationList(this.page, 10);
        for (var i = 0; i < r.length; i++) {
          this.organisations.push(r[i])
        }
      }
    }

  }
