import {Component} from '@angular/core';


import {Tab} from '../../class/tab';
import {Offer} from '../../class/offer';
import {Person} from '../../class/person';
import {Organisation} from '../../class/organisation';
import {Request} from '../../class/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';
import {User} from '../../class/user';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {OfferService, OfferSource} from '../../service/offer.service';
import {RequestService} from '../../service/request.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service'
import {PersonService} from '../../service/person.service';
import {UserService} from '../../service/user.service';
import {AnalysisService} from '../../service/analysis.service'
import {Observable} from "rxjs";


@Component({
    selector: 'tab-request',
    inputs: ['tab'],
    styles: [`
        .search-form {
            position: absolute;
            width: 50%;
            margin-left: 25%;
            margin-top: 10px;
            background: #fff;
            z-index: 1;
            border: 1px solid #eee;
        }

        .search-form > input {
            height: 28px;
            width: 100%;
        }

        .with-button {
            overflow: hidden;
        }

        .with-button > input {
            float: left;
            width: calc(100% - 120px);
        }

        .search-button {
            float: right;
            width: 120px;
            height: 24px;
            background-color: #3366cc;
            color: #fff;
            text-align: center;
            cursor: pointer;
        }

        .search-form.table-mode {
            border: 1px solid #fff;
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

        .pane {
            float: left;
            width: 370px;
            height: 100%;
            border-right: 1px solid #ccc;
        }
        
        .work-area {
            float: left;
            width: 100%;
            height: 100%;
        }
        
        .tab-button {
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            font-size: 12px !important;
            cursor: pointer;
            color: #666;
        }
      
        .fixed-button {
            position: fixed;
            top: 0;
            left: 0;
        }

        .request-prop {
            overflow-y: scroll;
        }

        .view-group {
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
        }
      
        .view-label {
            white-space: nowrap;
            color: #bbb;
            font-size: 15px;
        }
        
        .view-value {
            width: 100%;
            text-align: right;
            color: #696969;
            font-size: 15px;
    
            height: 19px; /* костыль */
        }
        
        .edit-value {
            width: 100%;
            text-align: right;
            color: #696969;
            font-size: 15px;
            height: 19px; /* костыль */
            border: none !important;
            border-bottom: 1px solid #E5E5E5 !important;
        }

        .text-value {
            height: 3rem;
            border: 1px solid #E5E5E5 !important;
        }

        .edit-block > .view-group {
            margin-bottom: 26px;
        }

        .tile-x {
            margin-right: 10px;
            width: 150px;
            height: 150px;
            color: #fff;
            position: relative;
        }

        .tile {
            margin: 0;
            margin-right: 10px;
        }
        
        .icon {
            line-height: 64px;
        }
        
        .tile-content.iconic .icon {
            width: 128px;
            margin-left: -64px;
        }
        
        .chart-block {
            overflow:hidden;
            border: 1px solid #e5e5e5;
        }
      
        .chart-header {
            width: 100%;
            height: 30px;
            border-bottom: 1px solid #e5e5e5;
            line-height: 30px;
            color: #fff;
        }

        .array-container > span {
            display: block;
            margin-bottom: 5px;
        }

        .array-container > input {
            margin-bottom: 5px;
        }
    `],
    template: `

        <div class="tab-button fixed-button" (click)="toggleLeftPane()">
            <span [ngClass]="{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}"></span>
        </div>
        
        <div class="new-request"
            [hidden]="!newRequest"
        >
            <div class="search-form" [class.table-mode]="tableMode">
                <div class="search-box with-button">
                    <input type="text" class="" placeholder="" [(ngModel)]="request.request" (keydown)="offer_search_keydown($event)">
                    <div class="search-button" (click)="createRequest()">Создать</div>
                </div>
                <div class="tool-box">
                    <div class="pull-left">
                        <div class="inline-select">
                            <ui-select class="view-value edit-value"
                                [options] = "offerTypeCodeOptions"
                                [value]="request.offerTypeCode"
                                [config]="{icon: 'icon-', draw_arrow: true}"
                                (onChange)="request.offerTypeCode = $event.selected.value; offer_search();"
                                >
                            </ui-select>
                        </div>
                    </div>
                    <div class="pull-right">
                        <a (click)="toggleDraw()" [hidden]="tableMode">
                            <span
                                [ngClass]="{'icon-cancel': mapDrawAllowed, 'icon-edit': !mapDrawAllowed}"
                            ></span>
                        </a>
                    </div>
                </div>
            </div>
        
            <!-- сильное колдунство, св-во right получаем из HubService -->
            <!-- TODO: сделать это отдельным компонентом -->
            <div  style="position: absolute; top: 0px; z-index: 1; border-left: 1px solid #ccc;" [style.right]="_hubService.shared_var['nb_width']">
                <div style="width: 330px; background-color: #fff;">
                    <div class="header">
                        <input type="text" style="width: 280px; margin-left: 10px; border: none;">
                        <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                            (click)="offer_search()"
                        ></span>
                    </div>
                    <div class="" style="width: 100%; overflow-y: scroll;" [style.height]="paneHeight">
                        <digest-offer *ngFor="let offer of offers"
                            [offer]="offer"
                            [compact]="true"
                        >
                        </digest-offer>
                    </div>
                </div>
            </div>
            <google-map
                [latitude]="lat"
                [longitude]="lon"
                [zoom]="zoom"
                [objects]="offers"
                [draw_allowed]="mapDrawAllowed"
                (drawFinished)="drawFinished($event)"
            >
            </google-map>
        </div>


        <!------------------>


        <div class="request"
            (window:resize)="onResize($event)"
            [hidden]="newRequest"
        >

            <!-- ЛЕВАЯ СТВОРКА: НАЧАЛО -->

            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="header">
                    <div class="header-label">{{ tab.header }}</div>
                </div>
                <div class="request-prop" [style.height]="paneHeight">
                    <div style="margin: 5px;">
                        <div class="pull-container">
                            <div class="font-sz-2 pull-left">Источник: звонок<span class="color-g1"><a href="" target="_blank"></a></span></div>
                            <div class="font-sz-1 color-g2 pull-right"> {{ request.changeDate | formatDate }} </div>
                        </div>
                        <hr>

                        <div class="pull-container" style="margin: 0 10px;">
                            <div class="pull-right" [hidden]="editEnabled" (click)="toggleEdit()"><a href="#" >Изменить</a></div>
                            <div class="pull-right" [hidden]="!editEnabled" (click)="save()"><a href="#" >Готово</a></div>
                        </div>

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->
    
                        <div class="edit-block" [hidden]="!editEnabled" style="margin: 20px 10px;">
    
                            <div class="view-group">
                                <span class="view-label">Контакт</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "personOpts"
                                    [value]="person?.id"
                                    (onChange)="personChanged($event)"
                                >
                                </ui-select>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Договор</span>
                                <span class="view-value"></span>
                            </div>
                            <br>
        
                            <div class="view-group">
                                <span class="view-label">Ответственный</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "agentOpts"
                                    [value]="agent?.id"
                                    (onChange)="agentChanged($event)"
                                >
                                </ui-select>
                            </div>
                            <div class="view-group">
                                <span class="view-label">Статус</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "stateCodeOptions"
                                    [value]="request?.stateCode"
                                    (onChange)="request.stateCode = $event.selected.value"
                                >
                                </ui-select>
                            </div>
                            <div class="view-group">
                                <span class="view-label">Стадия</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "stageCodeOptions"
                                    [value]="request?.stageCode"
                                    (onChange)="request.stageCode = $event.selected.value"
                                >
                                </ui-select>
                            </div>
                            <br>
                            
                            <div class="view-group">
                                <span class="view-label">Тип</span>
                                <input type="text" class="view-value edit-value" readonly [(ngModel)]="request.offerTypeCode">
                            </div>
                            
                            <div class="view-group">
                                <span class="view-label">Запрос</span>
                                <input type="text" class="view-value edit-value" readonly [(ngModel)]="request.request">
                            </div>
                            <br>
                            <div class="view-group" style="flex-wrap: wrap;">
                                <span class="view-label">Иформация</span>
                                <textarea class="view-value text-value" placeholder="" [(ngModel)]="request.info" style="text-align: left;"></textarea>
                            </div>
                        </div>

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: КОНЕЦ -->
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->
    
                        <div class="view-block" [hidden]="editEnabled" style="margin: 20px 10px;">
                            <div class="view-group">
                                <span class="view-label">Контакт</span>
                                <span class="view-value">{{ person.name }}</span>
                            </div>
                            <div class="view-group">
                                <span class="view-label pull-left">Договор</span>
                                <span class="view-value"></span>
                            </div>
                            <br>
                            <div class="view-group">
                                <span class="view-label">Ответственный</span>
                                <span class="view-value"> {{ agent.name }} </span>
                            </div>
                            <div class="view-group">
                                <span class="view-label">Статус</span>
                                <ui-view-value
                                    [options] = "stateCodeOptions"
                                    [value]="request.stateCode"
                                > 
                                </ui-view-value>
                            </div>
                            <div class="view-group">
                                <span class="view-label">Стадия</span>
                                <ui-view-value
                                    [options] = "stageCodeOptions"
                                    [value]="request.stageCode"
                                >
                                </ui-view-value>
                            </div>
                            <br>
                            
                            <div class="view-group">
                                <span class="view-label pull-left">Тип</span>
                                <span class="view-value"> {{ request.offerTypeCode }}</span>
                            </div>
                            
                            <div class="view-group">
                                <span class="view-label pull-left">Запрос</span>
                                <span class="view-value"> {{ request.request }}</span>
                            </div>
                            <br>
                            <div class="view-group">
                                <span class="view-label pull-left">Информация</span>
                                <span class="view-value" style="height: initial;"> {{ request.info }} </span>
                            </div>
                        </div>

                    <!-- РЕЖИМ ОТОБРАЖЕНИЯ: КОНЕЦ -->

                        <div style="margin-bottom: 20px;">
                            <div class="view-group">
                                <span class="icon-tag"> Тэги</span>
                            </div>
                            <ui-tag-block
                                [value] = "person.tag"
                                (valueChange) = "person.tag = $event.value"
                            ></ui-tag-block>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Левая СТВОРКА: КОНЕЦ -->
            <!-- РАБОЧАЯ ОБЛАСТЬ: НАЧАЛО -->

            <div class="work-area" [style.width.px]="mapWidth">
                <ui-tabs
                    [headerMode]="!paneHidden"
                >
                    <ui-tab
                        [title]="'Предложения'"
                        (tabSelect)="offersSelected()"
                    >
                        <!-- сильное колдунство, св-во right получаем из HubService -->
                        <!-- TODO: сделать это отдельным компонентом -->
                        <div  style="position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;" [style.right]="_hubService.shared_var['nb_width']">
                            <div style="width: 330px; background-color: #fff;">
                                <div class="header">
                                    <input type="text" style="width: 280px; margin-left: 10px; border: none;"
                                        (keydown)="offer_search_keydown($event)"
                                    >
                                    <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                                        (click)="offer_search()"
                                    ></span>
                                </div>
                                <div class="" style="width: 100%; overflow-y: scroll;" [style.height]="paneHeight">
                                    <digest-offer *ngFor="let offer of offers"
                                        [offer]="offer"
                                        [compact]="true"
                                    >
                                    </digest-offer>
                                </div>
                            </div>
                        </div>
                        <google-map
                            [latitude]="lat"
                            [longitude]="lon"
                            [zoom]="zoom"
                            [objects]="offers"
                            [polygone_points]="request?.searchArea"
                        >
                        </google-map>
                    </ui-tab>
                    <ui-tab [title]="'Аналитика'"
                        (tabSelect)="analysisSelected()"
                    >
                        <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="paneHeight">
                            <div style="padding: 15px;">
                                <div class="tile bg-gred fg-white">
                                    <div class="tile-content iconic">
                                        <span class="icon">{{ ch1_data_v1 }}</span>
                                    </div>
                                    <span class="tile-label">Всего задач</span>
                                </div>
                                <div class="chart-block">
                                    <div class="chart-header bg-gred">
                                        <span style="margin-left: 25px;">Активность</span>
                                    </div>
                                    <div>
                                        <ui-pie-chart
                                            [title]="''"
                                            [data]="ch1_data"
                                        >
                                        </ui-pie-chart>
                                    </div>
                                </div>
                            </div>
                            <div style="padding: 15px;">
                                <div style="float: left; display: flex; flex-direction: column;">
                                    <div class="tile bg-gorange fg-white" style="margin-bottom: 5px;">
                                        <div class="tile-content iconic">
                                            <span class="icon" style="font-size: 48px;">{{ ch4_data_v1 }}</span>
                                        </div>
                                        <span class="tile-label">Всего объявлений</span>
                                    </div>
                                    <div class="tile bg-gorange fg-white" >
                                        <div class="tile-content iconic">
                                            <span class="icon" style="font-size: 48px;">{{ ch4_data_v2 }}</span>
                                        </div>
                                        <span class="tile-label">Потрачено руб.</span>
                                    </div>
                                </div>
                                <div class="chart-block">
                                    <div class="chart-header bg-gorange">
                                        <span style="margin-left: 25px;">Реклама</span>
                                    </div>
                                    <div>
                                        <ui-bar-chart
                                            [title]="''"
                                            [data]="ch4_data"
                                        >
                                        </ui-bar-chart>
                                    </div>
                                </div>
                            </div>
                            <div style="padding: 15px;">
                                <div class="tile bg-gblue fg-white">
                                    <div class="tile-content iconic">
                                        <span class="icon">{{ ch2_data_v1 }}</span>
                                    </div>
                                    <span class="tile-label">Всего заявок</span>
                                </div>
                                <div class="chart-block">
                                    <div class="chart-header bg-gblue">
                                        <span style="margin-left: 25px;">Заявки</span>
                                    </div>
                                    <div>
                                        <ui-line-chart
                                            [title]="''"
                                            [data]="ch2_data"
                                        >
                                        </ui-line-chart>
                                    </div>
                                </div>
                            </div>
                            <div style="padding: 15px;">
                                <div style="float: left; display: flex; flex-direction: column;">
                                    <div class="tile bg-ggreen fg-white" style="margin-bottom: 5px;">
                                        <div class="tile-content iconic">
                                            <span class="icon">{{ ch3_data_v1 }}</span>
                                        </div>
                                        <span class="tile-label">Успешно</span>
                                    </div>
                                    <div class="tile bg-ggreen fg-white">
                                        <div class="tile-content iconic">
                                            <span class="icon">{{ ch3_data_v2 }}</span>
                                        </div>
                                        <span class="tile-label">Не успешно</span>
                                    </div>
                                </div>
                                <div class="chart-block">
                                    <div class="chart-header bg-ggreen">
                                        <span style="margin-left: 25px;">Показы</span>
                                    </div>
                                    <div>
                                        <ui-line-chart
                                            [title]="''"
                                            [data]="ch3_data"
                                        >
                                        </ui-line-chart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ui-tab>
                    <ui-tab
                        [title]="'История'"
                        (tabSelect)="historySelected()"
                    >
                        <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="paneHeight">
                            <digest-history *ngFor="let record of historyRecs"
                                [historyRecord]="record"
                            >
                            </digest-history>
                        </div>
                    </ui-tab>
                </ui-tabs>
            </div>
            <!-- РАБОЧАЯ ОБЛАСТЬ: КОНЕЦ -->
        </div>
    `
})

export class TabRequestComponent {
    public tab: Tab;
    public request: Request;

    offers: Offer[];

    agent: User = new User();
    agentOpts: any[] = [];

    person: Person = new Person();
    personOpts: any[] = [];

    historyRecs: HistoryRecord[];

    newRequest: boolean = false;
    editEnabled: boolean = false;
    mapDrawAllowed: boolean = false;

    paneHidden: boolean = false;
    paneHeight: number;
    paneWidth: number;
    mapWidth: number;

    lat: number;
    lon: number;
    zoom: number;

    ch1_data: any[] = [];
    ch2_data: any[] = [];
    ch3_data: any[] = [];

    ch4_data: any[] = [];

    ch1_data_v1: number;
    ch2_data_v1: number;
    ch3_data_v1: number;
    ch3_data_v2: number;
    ch4_data_v1: number;
    ch4_data_v2: number;

    offerTypeCodeOptions =[
        {value: 'sale', label: 'Продажа'},
        {value: 'rent', label: 'Аренда'}
    ];

    stateCodeOptions = [
        {value: 'raw', label: 'Не активен'},
        {value: 'active', label: 'Активен'},
        {value: 'work', label: 'В работе'},
        {value: 'suspended', label: 'Приостановлен'},
        {value: 'archive', label: 'Архив'}
    ];

    stageCodeOptions = [
        {value: 'contact', label: 'Первичный контакт'},
        {value: 'pre_deal', label: 'Заключение договора'},
        {value: 'show', label: 'Показ'},
        {value: 'prep_deal', label: 'Подготовка договора'},
        {value: 'decision', label: 'Принятие решения'},
        {value: 'negs', label: 'Переговоры'},
        {value: 'deal', label: 'Сделка'}
    ];


    constructor(private _hubService: HubService,
                private _configService: ConfigService,
                private _offerService: OfferService,
                private _requestService: RequestService,
                private _taskService: TaskService,
                private _analysisService: AnalysisService,
                private _historyService: HistoryService,
                private _personService: PersonService,
                private _userService: UserService) {

        this._userService.list(null, null, "").subscribe(agents => {
            for (let i = 0; i < agents.length; i++) {
                var a = agents[i];
                this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });


        this._personService.list(null, null, "").subscribe(persons => {
            for (let i = 0; i < persons.length; i++) {
                var p = persons[i];
                this.personOpts.push({
                    value: p.id,
                    label: p.name
                });
            }
        });

        setTimeout(() => {
            if (this.request.id) {
                this.tab.header = 'Запрос ' + this.request.id;
            } else {
                this.tab.header = 'Новый запрос';
            }
        });
    }

    ngOnInit() {
        this.request = this.tab.args.request;

        var c = this._configService.getConfig();

        this.zoom = c.map.zoom;
        if (this.request.searchArea && this.request.searchArea.length > 0) {

            var lat: number = 0.0;
            var lon: number = 0.0;
            this.request.searchArea.forEach(p => {
                lat += p.lat;
                lon += p.lon;
            })

            this.lat = lat / this.request.searchArea.length;
            this.lon = lon / this.request.searchArea.length;

        } else {
            this.lat = c.map.lat;
            this.lon = c.map.lon;
        }

        if (this.request.id == null) {
            this.newRequest = true;
        } else {

        }

        this._offerService.list(0, 32, OfferSource.LOCAL, {offerTypeCode: this.request.offerTypeCode}, null, this.request.request, this.request.searchArea).subscribe(
            offers => {
                this.offers = offers.list;
            },
            err => console.log(err)
        );

        if (this.request.personId != null) {
            this._personService.get(this.request.personId).subscribe(
                data => {
                    this.person = data;
                }
            );
        }


        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(agent => {
                this.agent = agent;
            });
        }

        this.calcSize();
    }

    onResize(e) {
        this.calcSize();
    }

    calcSize() {
        if (this.paneHidden) {
            this.paneWidth = 0;
        } else {
            this.paneWidth = 420;
        }
        this.mapWidth = document.body.clientWidth - (30 * 2) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 31;
    }

    toggleLeftPane() {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    }

    toggleEdit() {
        this.editEnabled = !this.editEnabled;
    }

    agentChanged(e) {
        this.request.agentId = e.selected.value;
        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(agent => {
                this.agent = agent;
            });
        }
    }

    personChanged(e) {
        this.request.personId = e.selected.value;
        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(agent => {
                this.agent = agent;
            });
        }
    }

    save() {
        this._requestService.save(this.request).subscribe(request => {
            setTimeout(() => {
                this.request = request;
            });
            this.toggleEdit();
        });
    }

    offersSelected() {
        this.getOffers(0, 16);
    }

    analysisSelected() {
        var a_data = this._analysisService.getObjAnalysis();
        this.ch1_data = a_data.ch1_data;
        this.ch1_data_v1 = a_data.ch1_data_v1;

        this.ch2_data = a_data.ch2_data;
        this.ch2_data_v1 = a_data.ch2_data_v1;

        this.ch3_data = a_data.ch3_data;
        this.ch3_data_v1 = a_data.ch3_data_v1;
        this.ch3_data_v2 = a_data.ch3_data_v2;

        this.ch4_data = [
            ['media', 'подано'],
            ['avito', 7],
            ['из рук в руки', 4],
            ['презент', 6],
            ['фарпост', 8],
            ['ВНХ', 6],
        ];

        this.ch4_data_v1 = 31;
        this.ch4_data_v2 = 5000;
    }

    historySelected() {
        this.historyRecs = this._historyService.getObjHistory();
    }

    getOffers(page, per_page) {
        this._offerService.list(page, per_page, OfferSource.LOCAL, {offerTypeCode: this.request.offerTypeCode}, null, this.request.request, this.request.searchArea).subscribe(
            offers => {
                this.offers = offers.list;
            },
            err => console.log(err)
        );
    }

    offer_search() {
        this.getOffers(0, 16);
    }

    offer_search_keydown(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            this.offer_search();
        }
    }

    markerClick(r: Offer) {
        //r.selected = !r.selected;
        // scroll to object ???
    }

    drawFinished(e) {
        this.request.searchArea = e;
        this.offer_search();
    }

    toggleDraw() {
        this.mapDrawAllowed = !this.mapDrawAllowed;
        if (!this.mapDrawAllowed) {
            this.request.searchArea = [];
            this.offer_search();
        }
    }

    createRequest() {
        this.newRequest = false;

        this.save();
    }

    getOfferDigest(r: Offer) {
        return Offer.getDigest(r);
    }
}
