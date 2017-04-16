import {Component, OnInit} from '@angular/core';

import {ConfigService} from '../../service/config.service';
import {RequestService} from '../../service/request.service';

import {Tab} from '../../class/tab';
import {Request} from '../../class/request';
import {HubService} from "../../service/hub.service";
import {Observable} from "rxjs";


@Component({
    selector: 'tab-list-request',
    inputs: ['tab'],
    styles: [`
        .search-form {
            background: #fff;
            z-index: 1;
            width: 38%;
            margin-left: 610;
            margin-top: 27px;
        }

        .tool-box {
            height: 30px;
            margin: 0 12px;
        }

        .round_menu{
            width: 170px;
            height: 50px;
            position: absolute;
            left: 450;
            top: 15px;
            text-align: center;
            z-index: 10;
            line-height: 50px;
            display: flex;
            justify-content: space-around;
        }

        .search-box {
            position: relative;
            margin: 12px;
            margin-bottom: 8px;
        }

        .request-list-wrapper {
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

        .import {
            background-image: url(res/base_plus.png);
        }
        .local:hover{
            background-image: url(res/base_color.png) !important;
        }

        .local {
            background-image: url(res/base.png);
        }
    `],
    template: `
        <div class="header-label-abs">{{ tab.header }}</div>
        <div class = "round_menu">
            <div class="button plus"  (click) ="addRequest()">Добавить</div>
            <div (click)="toggleSource('import')" [style.background-image]="getImage('import')" class="button import" style="">Общая</div>
            <div (click)="toggleSource('local')"  class="button local"  [style.background-image1]="getImage('local')">Компания</div>
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
                            {value: 'sale', label: 'Продажа'},
                            {value: 'rent', label: 'Аренда'}
                        ]"
                        [value]="sale"
                        [config]="{icon: 'icon-', draw_arrow: true}"
                        (onChange)="offerTypeCode = $event.selected.value; searchParamChanged();"
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
                        [config]="{icon: 'icon-tag', draw_arrow: true}"
                        (onChange)="searchParamChanged();"
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
                        (onChange)="searchParamChanged();"
                    >
                    </ui-select>
                </div>
            </div>
        </div>
        <div class="request-list-wrapper">
            <div class="scroll-wrapper" (scroll)="scroll($event)">
                <digest-request
                    *ngFor="let r of requests"
                    [request]="r"
                >
                </digest-request>
            </div>
        </div>
    `
})

export class TabListRequestComponent implements OnInit {
    public tab: Tab;
    isImport: boolean = false;
    searchQuery: string = "";
    offerTypeCode: string = 'sale';
    requests: Request[];
    page: number = 0;
    perPage: number = 32;

    constructor(private _configService: ConfigService, private _hubService: HubService, private _requerstService: RequestService) {
        setTimeout(() => {
            this.tab.header = 'Заявки';
        });
    }

    ngOnInit() {

        this.tab.refreshRq.subscribe(
            sender => {
                this.listRequests();
            }
        )

        this.listRequests();
    }

    listRequests() {
        this._requerstService.list(this.page, this.perPage, this.offerTypeCode, "all",null, null, this.searchQuery).subscribe(
            data => {
                this.requests = data;
            },
            err => console.log(err)
        );
    }

    addRequest() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        var r = new Request();
        r.offerTypeCode = this.offerTypeCode;
        tab_sys.addTab('request', {request: r});
    }

    searchParamChanged() {
        this.page = 0;
        this.listRequests();
    }

    scroll(e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this.listRequests();
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
