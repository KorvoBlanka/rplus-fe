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
            margin: 12px 12px 8px 12px;
        }
    
        .user-list-wrapper {
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
            font-size: 14px;
            color: #666;
        }
    
        .button {
            text-align: center;
            padding: 5px 15px;
            background-color: #3366cc;
            color: #fff;
            cursor: pointer;
        }
    `],
    template: `

        <div class="header-label-abs">{{ tab.header }}</div>
        <div class="search-form" [class.table-mode]="tableMode">
            <div class="search-box">
                <input type="text" class="" placeholder="" style="height: 28px; width: 100%;"
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
        
         <div class="user-list-wrapper">
            <div class="scroll-wrapper">
                <div class="button"
                    (click)="addUser()"
                >
                Добавить пользователя
                </div>
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

    users: User[];
    searchQuery: string;
    superiorId: number;
    role: string;

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

        this._userService.listX("MANAGER", null, "").subscribe(managers => {
            for (let m of managers) {
                console.log(m);
                this.superiorOpts.push({
                    value: m.id,
                    label: m.name
                });
            }
        });
    }

    listUsers() {
        this._userService.listX(this.role, this.superiorId, this.searchQuery).subscribe(
            data => {
                this.users = data;
            },
            err => console.log(err)
        );
    }

    addUser() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('user', {user: new User()});
    }

    searchParamChanged() {
        this._userService.listX(this.role, this.superiorId, this.searchQuery).subscribe(users => {
            this.users = users;
        });
    }
}
