import {
    Component, OnInit, AfterViewInit,
} from '@angular/core';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {PersonService} from '../../service/person.service';

import {Tab} from '../../class/tab';
import {Person} from '../../class/person';

import {Observable} from 'rxjs/Observable';
import {User} from "../../class/user";
import {UserService} from "../../service/user.service";


@Component({
    selector: 'tab-list-person',
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
                        [options] = "agentOpts"
                        [value]="0"
                        [config]="{icon: 'icon-person', drawArrow: true}"
                        (onChange)="userId = $event.selected.value; searchParamChanged()"
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
                <div class="inline-select">
                    <ui-select class="view-value edit-value"
                        [options] = "[
                            {value: 1, label: '1 день'},
                            {value: 2, label: '3 дня'},
                            {value: 3, label: 'Неделя'},
                            {value: 4, label: '2 недели'},
                            {value: 5, label: 'Месяц'},
                            {value: 6, label: '3 месяца'},
                            {value: 7, label: 'Все'}
                        ]"
                        [value]="6"
                        [config]="{icon: 'icon-month', drawArrow: true}"
                    >
                    </ui-select>
                </div>
            </div>
        </div>
        <div class="person-list-wrapper">
            <div class="scroll-wrapper">
                <div class="button"
                    (click)="addPerson()"
                >
                Добавить контакт
                </div>
                <digest-person *ngFor="let p of persons"
                    [person]="p"
                >
                </digest-person>
            </div>
        </div>
    `
})

export class TabListPersonComponent implements OnInit {
    public tab: Tab;

    persons: Person[];
    userId: number;
    searchQuery: string = "";
    agentOpts = [{
        value: 0,
        label: '-'
    }];

    constructor(private _configService: ConfigService, private _hubService: HubService, private _personService: PersonService, private _userService: UserService) {
        setTimeout(() => {
            this.tab.header = 'Контакты';
        });
    }

    ngOnInit() {

        this.tab.refreshRq.subscribe(
            sender => {
                this.listPersons();
            }
        )

        this.listPersons();

        this._userService.listX("AGENT", null, "").subscribe(agents => {
            for (let i = 0; i < agents.length; i++) {
                var a = agents[i];
                this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
    }

    listPersons() {
        this._personService.list(null, null, "").subscribe(
            data => {
                this.persons = data;
            },
            err => console.log(err)
        );
    }

    addPerson() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('person', {person: new Person()});
    }

    searchParamChanged() {
        this.listPersons();
    }

    scroll(e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this.listPersons();
        }
    }
}
