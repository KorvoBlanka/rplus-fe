import {
  Component,
} from 'angular2/core';

import {HubService} from '../../../service/hub.service';
import {ConfigService} from '../../../service/config.service';
import {UserService} from '../../../service/settings/user.service';

import {Tab} from '../../../class/tab';
import {User} from '../../../class/user';

import {UISelect} from '../../ui/ui-select.component';

import {UserDigestComponent} from '../../digest/user-digest.component';

@Component({
  selector: 'tab-list-user',
  inputs: ['tab'],
  directives: [UserDigestComponent, UISelect],
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

      <div class="pull-left">
        <a (click)="addUser()">
          <span class="icon-add"></span>
        </a>
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

    </div>
  </div>

  <div class="user-list-wrapper">

      <user-digest *ngFor="#u of users"
        [user]="u"
      >
      </user-digest>

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

    .person-list-wrapper {
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

  export class TabListUserComponent {
    public tab: Tab;

    users: User[] = [];
    searchQuery: string = "";

    constructor(private _configService: ConfigService, private _hubService: HubService, private _userService: UserService) {
      this._userService.list("", "").then(users => {
        this.users = users;
      });
      setTimeout(() => { this.tab.header = 'Пользователи'; });
    }

    addUser() {
      var tab_sys = this._hubService.getProperty('tab_sys');
      tab_sys.addTab('user', { user: new User() });
    }

    searchParamChanged() {
      this._userService.list("", this.searchQuery).then(users => {
        this.users = users;
      });
    }
  }
