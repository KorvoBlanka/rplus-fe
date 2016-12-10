import {Component, OnInit, AfterViewInit} from '@angular/core';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {OrganisationService} from '../../service/organisation.service';

import {Tab} from '../../class/tab';
import {Organisation} from '../../class/organisation';


@Component({
    selector: 'tab-list-organisation',
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
        <div class="organisation-list-wrapper">
            <div class="scroll-wrapper">
                <div class="button"
                    (click)="addOrganisation()"
                >
                Добавить организацию
                </div>
                <digest-organisation
                    *ngFor="let o of organisations"
                    [organisation]="o"
                >
                </digest-organisation>
            </div>
        </div>
    `
})

export class TabListOrganisationComponent implements OnInit, AfterViewInit {
    public tab: Tab;

    organisations: Organisation[] = [];
    page: number = 0;
    perPage: number = 32;
    searchQuery: string = "";

    constructor(private _configService: ConfigService, private _hubService: HubService, private _organisationService: OrganisationService) {
    }

    ngOnInit() {
        this._organisationService.list(this.page, this.perPage, "").then(orgs => {
            this.organisations = orgs;
            this.page++;
        });
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.tab.header = 'Контрагенты';
        });
    }

    scroll(e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this._organisationService.list(this.page, this.perPage, "").then(orgs => {
                for (let i = 0; i < orgs.length; i++) {
                    this.organisations.push(orgs[i]);
                }
                this.page++;
            });
        }
    }

    addOrganisation() {
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('organisation', {organisation: new Organisation()});
    }

    searchParamChanged(event: any) {
        this.page = 0;

        this._organisationService.list(this.page, this.perPage, this.searchQuery).then(orgs => {
            this.organisations = orgs;
            this.page++;
        });

    }
}
