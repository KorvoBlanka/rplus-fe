import {Component, OnInit, AfterViewInit} from '@angular/core';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {OrganisationService} from '../../service/organisation.service';

import {Tab} from '../../class/tab';
import {Organisation} from '../../class/organisation';
import {Observable} from "rxjs";


@Component({
    selector: 'tab-list-organisation',
    inputs: ['tab'],
    styles: [`
        .underline{
            margin: 0;
            border: 2px solid;
            margin-top: 16px;
            color: #8F5128;
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
        .import:hover{
            background-image: url(res/base_plus_color.png) !important;
        }

        .local:hover{
            background-image: url(res/base_color.png) !important;
        }
    `],
    template: `
        <div class="header-label-abs">{{ tab.header }}</div>
        <div class = "round_menu">
            <div class="button plus"  (click) ="addOrganisation()">Добавить</div>
            <div (click)="toggleSource('import')" class="button import" [style.background-image]="iconSource[0]">Общая</div>
            <div (click)="toggleSource('local')"  class="button local"  [style.background-image]="iconSource[1]">Компания</div>
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
        <hr class='underline'>
        <div class="organisation-list-wrapper">
            <div class="scroll-wrapper">

                <digest-organisation
                    *ngFor="let o of organisations"
                    [organisation]="o"
                >
                </digest-organisation>
            </div>
        </div>
    `
})

export class TabListOrganisationComponent implements OnInit {
    public tab: Tab;

    organisations: Organisation[];
    searchQuery: string = "";
    isImport: boolean = true;
    iconSource: string[]=["url(res/base_plus.png)", "url(res/base_color.png)"];

    constructor(private _configService: ConfigService, private _hubService: HubService, private _organisationService: OrganisationService) {
        setTimeout(() => {
            this.tab.header = 'Контрагенты';
        });
    }

    ngOnInit() {

        this.tab.refreshRq.subscribe(
            sender => {
                this.listOrganisation();
            }
        )

        this.listOrganisation();
    }

    listOrganisation() {
        this._organisationService.list("").subscribe(
            data => {
                this.organisations = data;
            },
            err => console.log(err)
        );
    }

    toggleSource(s: string) {
        if (s == 'local') {
            this.iconSource[0]="url(res/base_plus.png)";
            this.iconSource[1]="url(res/base_color.png)";
        } else {
            this.iconSource[0]="url(res/base_plus_color.png)";
            this.iconSource[1]="url(res/base.png)";
        }
    }

    addOrganisation() {
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('organisation', {organisation: new Organisation()});
    }

    searchParamChanged(event: any) {
        this.listOrganisation();

    }

    scroll(e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {

        }
    }

    getImage(s: string){
        if (s == 'local') {
          if(this.isImport)
            return "url(res/base.png)";
          else
            return "url(res/base_color.png)";
        } else {
          if(this.isImport)
            return "url(res/base_plus_color.png)";
          else
            return "url(res/base_plus.png)";
        }
    }
}
