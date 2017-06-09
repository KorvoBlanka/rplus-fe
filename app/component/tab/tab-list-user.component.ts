import {
    Component, OnInit, AfterViewInit,
} from '@angular/core';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {UserService} from '../../service/user.service';

import {Tab} from '../../class/tab';
import {User} from '../../class/user';
import {Observable} from "rxjs";


@Component({
    selector: 'tab-list-user',
    inputs: ['tab'],
    styles: [`
        .underline{
            margin: 0;
            border: 2px solid;
            margin-top: 16px;
            color: #0b9700;
        }

        .search-form {
            background: #fff;
            z-index: 1;
            width: 38%;
            margin-left: 610px;
            margin-top: 27px;
        }

        .tool-box {
            height: 30px;
            margin: 0 12px;
        }

        .round_menu{
            width: 170;
            height: 50px;
            position: absolute;
            left: 450px;
            top: 15px;
            text-align: center;
            z-index: 10;
            line-height: 50px;
            display: flex;
            justify-content: space-around;
        }

        .search-box {
            position: relative;
            margin: 12px 12px 8px 12px;
        }

        .user-list-wrapper {
            padding-top: 25px;
            max-width: 1200px;
            margin: 0 auto;
            height: calc(100vh - 23px);
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
            font-size: 14px;
            color: #666;
        }

        .button {
            height: 50px;
            width: 50px;
            border-radius: 40px;
            cursor: pointer;
            font-size: 11px;
            line-height: 120px;
            background-size: cover;
            color: #6b6c6d;
        }

        .plus:hover{
            background-image: url(res/plus_color.png);
        }

        .plus {
            background-image: url(res/Plus.png);
        }

        .main:hover{
            background-image: url(res/main_offers_color.png) !important;
        }


        .analitic:hover{
            background-image: url(res/analitic_color.png) !important;
        }

    `],
    template: `
        <div class="header-label-abs">{{ tab.header }}</div>
        <div class = "round_menu">
            <div class="button plus"  (click) ="addUser()">Добавить</div>
            <div (click)="toggleSource('main')"      class="button main"      [style.background-image]="iconSource[0]">Главная</div>
            <div (click)="toggleSource('analitic')"  class="button analitic"  [style.background-image]="iconSource[1]">Аналитика</div>
        </div>
        <div class="search-form" [class.table-mode]="tableMode">
            <div class="search-box">
                <input type="text" class="" placeholder="" style="height: 28px; width: 100%;
                background-color: rgb(247, 247, 247); border: 1px solid rgba(204, 204, 204, 0.47);"
                    [(ngModel)]="searchQuery" (keyup)="searchParamChanged($event)"
                >
                <span class="icon-search" style="position: absolute; right: 12px; top: 7px;"></span>
            </div>
            <div class="tool-box">
                <div class="inline-select">
                    <ui-select class="view-value edit-value"
                        [options] = "superiorOpts"
                        [value]="0"
                        [config]="{icon: 'icon-person', drawArrow: true}"
                        (onChange)="superiorId = $event.selected.value; searchParamChanged()"
                    >
                    </ui-select>
                </div>
                <div class="inline-select">
                    <ui-select class="view-value edit-value"
                        [options] = "[
                            {value: '', label: 'Все'},
                            {value: 'AGENT', label: 'Агент'},
                            {value: 'MANAGER', label: 'Менеджер'},
                            {value: 'TOP', label: 'Топ'}
                        ]"
                        [value]="''"
                        [config]="{icon: 'icon-person', drawArrow: true}"
                        (onChange)="role = $event.selected.value; searchParamChanged()"
                    >
                    </ui-select>
                </div>
                <div class="inline-select">
                    <ui-select class="view-value edit-value"
                        [options] = "[
                            {value: 0, label: 'Все'},
                            {value: 1, label: 'Красный', icon: 'icon-circle tag-red'},
                            {value: 2, label: 'Оранжевый', icon: 'icon-circle tag-orange'},
                            {value: 3, label: 'Желтый', icon: 'icon-circle tag-yellow'},
                            {value: 4, label: 'Зеленый', icon: 'icon-circle tag-green'},
                            {value: 5, label: 'Голубой', icon: 'icon-circle tag-blue'},
                            {value: 6, label: 'Лиловый', icon: 'icon-circle tag-violet'},
                            {value: 7, label: 'Серый', icon: 'icon-circle tag-gray'}
                        ]"
                        [value]="0"
                        [config]="{icon: 'icon-tag', drawArrow: true}"
                    >
                    </ui-select>
                </div>
            </div>
        </div>
        <hr class='underline'>
         <div class="user-list-wrapper">
            <div class="scroll-wrapper">

                <digest-user *ngFor="let u of users"
                    [user]="u"
                >
                </digest-user>
            </div>
        </div>
    `
})

export class TabListUserComponent implements OnInit {
    public tab: Tab;
    isImport: boolean = false;
    users: User[];
    searchQuery: string;
    superiorId: number;
    role: string;
    iconSource: string[]=["url(res/main_offers_color.png)", "url(res/analitic.png)"];

    superiorOpts = [{
        value: 0,
        label: '-'
    }];

    constructor(private _configService: ConfigService, private _hubService: HubService, private _userService: UserService) {
        setTimeout(() => {this.tab.header = 'Пользователи'});
    }

    ngOnInit() {

        this.tab.refreshRq.subscribe(
            sender => {
                this.listUsers();
            }
        )

        this.listUsers();

        this._userService.list("MANAGER", null, "").subscribe(managers => {
            for (let m of managers) {
                this.superiorOpts.push({
                    value: m.id,
                    label: m.name
                });
            }
        });
    }

    listUsers() {
        this._userService.list(this.role, this.superiorId, this.searchQuery).subscribe(
            data => {
                this.users = data;
            },
            err => console.log(err)
        );
    }

    toggleSource(s: string) {
        if (s == 'main') {
            this.iconSource[0]="url(res/main_offers_color.png)";
            this.iconSource[1]="url(res/analitic.png)";
        } else {
            this.iconSource[0]="url(res/main_offers.png)";
            this.iconSource[1]="url(res/analitic_color.png)";
        }
    }

    addUser() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('user', {user: new User()});
    }

    searchParamChanged() {
        this._userService.list(this.role, this.superiorId, this.searchQuery).subscribe(users => {
            this.users = users;
        });
    }
    getImage(s: string){
        if (s == 'local') {
          if(this.isImport)
            return "url(res/main_offers.png)";
          else
            return "url(res/main_offers_color.png)";
        } else {
          if(this.isImport)
            return "url(res/main_offers_color.png)";
          else
            return "url(res/main_offers.png)";
        }
    }
}
