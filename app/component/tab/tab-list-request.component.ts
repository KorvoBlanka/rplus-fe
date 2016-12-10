import {Component} from '@angular/core';

import {ConfigService} from '../../service/config.service';
import {RequestService} from '../../service/request.service';

import {Tab} from '../../class/tab';
import {Request} from '../../class/request';


@Component({
    selector: 'tab-list-request',
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
                        [config]="{icon: 'icon-tag', draw_arrow: true}"
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

export class TabListRequestComponent {
    public tab: Tab;
    searchQuery: string;
    requests: Request[] = [];
    page: number = 0;
    perPage: number = 32;

    constructor(private _configService: ConfigService, private _requerstService: RequestService) {
        this._requerstService.list(this.page, this.perPage, null, "").then(requests => {
            this.requests = requests;
        });
        setTimeout(() => {
            this.tab.header = 'Заявки';
        });
    }

    scroll(e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this.page++;
            this._requerstService.list(this.page, this.perPage, null, "").then(requests => {
                for (var i = 0; i < requests.length; i++) {
                    this.requests.push(requests[i])
                }
            });
        }
    }

    searchParamChanged() {
        this.page = 0;

        this._requerstService.list(this.page, this.perPage, null, this.searchQuery).then(requests => {
            this.requests = requests;
            this.page++;
        });
    }

}
