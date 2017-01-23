import {Component, OnInit, AfterViewInit} from '@angular/core';


import {AnalysisService} from '../../service/analysis.service'
import {Tab} from '../../class/tab';
import {User} from '../../class/user';
import {Offer} from '../../class/offer';
import {Person} from '../../class/person';
import {Organisation} from '../../class/organisation';
import {Request} from '../../class/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {OfferService, OfferSource} from '../../service/offer.service';
import {RequestService} from '../../service/request.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service';
import {PersonService} from '../../service/person.service';
import {OrganisationService} from '../../service/organisation.service';
import {UserService} from '../../service/user.service';


@Component({
    selector: 'tab-person',
    inputs: ['tab'],
    styles: [`
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
            width: 100%;;
            text-align: right;
            color: #696969;
            font-size: 15px;
            height: 19px; /* костыль */
        }
        
        .edit-value {
            width: 100%;;
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

        .two-way-switch {
            display: table;
            border: 1px solid #3366cc;
            cursor: pointer;
        }

        .two-way-switch > div {
            display: table-cell;
            width: 90px;
            text-align: center;
            padding: 5px 15px;
            background-color: #fff;
            color: #333;
        }

        .two-way-switch > div.active {
            background-color: #3366cc;
            color: #fff;
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

        <div class="tab-button fixed-button" (click)="toggleLeftPane()">
            <span [ngClass]="{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}"></span>
        </div>

        <div class="person" (window:resize)="onResize($event)">

        <!-- ЛЕВАЯ СТВОРКА: НАЧАЛО -->

            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="header">
                    <div class="header-label">
                        {{ tab.header }}
                    </div>
                </div>
                <div class="person-prop" [style.height]="paneHeight">
                    <div style="margin: 5px;">
                        <div class="pull-container">
                            <div class="font-sz-2 pull-left">Источник: <span class="color-g1"><a href="" target="_blank"></a></span></div>
                            <div class="font-sz-1 color-g2 pull-right"> {{ person.add_date | formatDate }} </div>
                        </div>
                        <hr>
                        <div class="pull-container" style="margin: 0 10px;">
                            <div class="pull-right" [hidden]="editEnabled" (click)="toggleEdit()"><a href="#" >Изменить</a></div>
                            <div class="pull-right" [hidden]="!editEnabled" (click)="save()"><a href="#" >Готово</a></div>
                        </div>
                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->
                        <div class="edit-block" [hidden]="!editEnabled" style="margin: 20px 10px;">
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
                                <span class="view-label">Имя</span>
                                <input type="text" class="view-value edit-value" [(ngModel)]="person.name">
                            </div>
                            <div class="view-group">
                                <span class="view-label pull-left">Телефон <a *ngIf="person.phones.length < 3" href="#" (click)="addPhone()"><span class="icon-add"></span></a></span>
                                <div class="array-container">    
                                    <input *ngIf="person.phones.length > 0" type="text" class="view-value edit-value" [(ngModel)]="person.phones[0]">
                                    <input *ngIf="person.phones.length > 1" type="text" class="view-value edit-value" [(ngModel)]="person.phones[1]">
                                    <input *ngIf="person.phones.length > 2" type="text" class="view-value edit-value" [(ngModel)]="person.phones[2]">
                                </div>
                            </div>
                            <div class="view-group">
                                <span class="view-label pull-left">e-mail <a *ngIf="person.emails.length < 3" href="#" (click)="addEmail()" ><span class="icon-add"></span></a></span>
                                <div class="array-container">
                                    <input *ngIf="person.emails.length > 0" type="text" class="view-value edit-value" [(ngModel)]="person.emails[0]">
                                    <input *ngIf="person.emails.length > 1" type="text" class="view-value edit-value" [(ngModel)]="person.emails[1]">
                                    <input *ngIf="person.emails.length > 2" type="text" class="view-value edit-value" [(ngModel)]="person.emails[2]">
                                </div>
                            </div>
                            <div class="view-group">
                                <span class="view-label pull-left">Организация</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "organisationsOpts"
                                    [value]="organisation?.id"
                                    (onChange)="person.organisationId = $event.selected.value"
                                >
                                </ui-select>
                            </div>
                            <br>
                            <div class="view-group" style="flex-wrap: wrap;">
                                <span class="view-label">Иформация</span>
                                <textarea class="view-value text-value" placeholder="" [(ngModel)]="person.info" style="text-align: left;"></textarea>
                            </div>
                        </div>

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: КОНЕЦ -->
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->

                        <div class="view-block" [hidden]="editEnabled" style="margin: 20px 10px;">
                            <div class="view-group">
                                <span class="view-label">Ответственный</span>
                                <span class="view-value"> {{ agent?.name }}</span>
                            </div>
                            <div class="view-group">
                                <span class="view-label">Имя</span>
                                <span class="view-value"> {{ person.name }}</span>
                            </div>
                            <div class="view-group">
                                <span class="view-label pull-left">Телефон </span>
                                <div class="array-container">
                                    <span *ngFor="let phone of person.phones" class="view-value"> {{ phone }} </span>
                                </div>
                            </div>
                            <div class="view-group">
                                <span class="view-label pull-left">e-mail</span>
                                <div class="array-container">
                                    <span *ngFor="let email of person.emails" class="view-value"> {{ email }} </span>
                                </div>
                            </div>
                            <div class="view-group">
                                <span class="view-label pull-left">Организация</span>
                                <span class="view-value"> {{ organisation?.name }}</span>
                            </div>
                            <br>
                            <div class="view-group">
                                <span class="view-label pull-left">Информация</span>
                                <span class="view-value" style="height: initial;"> {{ person.info }} </span>
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
                        <div class="" style="position: absolute; top: 15px; left: 15px; z-index: 1;">
                            <div class="two-way-switch">
                                <div [class.active]="requestOfferType == 'sale'" (click)="toggleOffer('sale')">Продажа</div>
                                <div [class.active]="requestOfferType == 'rent'" (click)="toggleOffer('rent')">Аренда</div>
                            </div>
                        </div>
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
                                    <div class="button" (click)="createOffer()">
                                        Добавить предложение
                                    </div>
                                    <digest-offer *ngFor="let offer of offers"
                                      [offer]="offer"
                                      [compact]="true"
                                     >
                                    </digest-offer>
                                </div>
                            </div>
                        </div>
                        <google-map [latitude]="lat" [longitude]="lon" [objects]="offers" [zoom]="zoom">
                        </google-map>
                    </ui-tab>
                    <ui-tab
                        [title]="'Заявки'"
                        (tabSelect)="requestsSelected()"
                    >
                        <div class="" style="margin: 15px;">
                            <div class="two-way-switch">
                                <div [class.active]="requestOfferType == 'sale'" (click)="toggleOffer('sale')">Продажа</div>
                                <div [class.active]="requestOfferType == 'rent'" (click)="toggleOffer('rent')">Аренда</div>
                            </div>
                        </div>
                        <div class="" style="max-width: 910px; overflow-y: scroll; " [style.height]="paneHeight">
                            <div class="button" (click)="createRequest()">Добавить заявку</div>
                            <digest-request *ngFor="let request of requests"
                                [request]="request"
                            >
                            </digest-request>
                        </div>
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

export class TabPersonComponent implements OnInit, AfterViewInit {
    public tab: Tab;

    person: Person = new Person();

    organisationsOpts: any[] = [];
    agentOpts: any[] = [];

    agent: User;
    organisation: Organisation;
    offers: Offer[];
    requests: Request[];
    historyRecs: HistoryRecord[];

    paneHidden: boolean = false;
    paneHeight: number;
    paneWidth: number;
    mapWidth: number;

    editEnabled: boolean = false;

    requestOfferType: string = 'sale';

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

    log(e) {
        console.log(e);
    }

    constructor(private _hubService: HubService,
                private _configService: ConfigService,
                private _offerService: OfferService,
                private _requestService: RequestService,
                private _taskService: TaskService,
                private _analysisService: AnalysisService,
                private _historyService: HistoryService,
                private _personService: PersonService,
                private _organisationService: OrganisationService,
                private _userService: UserService) {

        _organisationService.list("").subscribe(organisations => {
                for (let i = 0; i < organisations.length; i++) {
                    var o = organisations[i];
                    this.organisationsOpts.push({
                        value: o.id,
                        label: o.name
                    });
                }
            }
        );

        _userService.listX("AGENT", null, "").subscribe(agents => {
            for (let i = 0; i < agents.length; i++) {
                var a = agents[i];
                this.agentOpts.push({
                    value: a.id,
                    label: a.name
                });
            }
        });
    }

    ngOnInit() {
        this.person = this.tab.args.person;

        var c = this._configService.getConfig();
        this.zoom = c.map.zoom;
        this.lat = c.map.lat;
        this.lon = c.map.lon;

        if (this.person.organisationId) {
            this._organisationService.get(this.person.organisationId).subscribe(org => {
                this.organisation = org;
            });
        }

        if (this.person.userId != null) {
            this._userService.get(this.person.userId).subscribe(agent => {
                this.agent = agent;
            });
        }

        if (this.person.id == null) {
            this.toggleEdit();
        }

        this.calcSize();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.tab.header = 'Контакт';
        });
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
        this.person.userId = e.selected.value;
        if (this.person.userId != null) {
            this._userService.get(this.person.userId).subscribe(agent => {
                this.agent = agent;
            });
        }
    }

    save() {
        var subj = this._personService.save(this.person);

        var component = this;

        subj.subscribe(
            function (x) {
                //console.log('Next: ' + x.toString());
            },
            function (err) {
                //console.log('Error: ' + err);
            },
            function () {
                component.toggleEdit();
            }
        );
    }

    offersSelected() {
        this._offerService.list(0, 32, OfferSource.LOCAL, {offerTypeCode: this.requestOfferType, personId: this.person.id}, "", []).subscribe(offers => {
            this.offers = offers;
        });
    }

    requestsSelected() {
        this._requestService.list(0, 32, this.requestOfferType, null, this.person.id, "").subscribe(requests => {
            this.requests = requests;
        });
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
        this._offerService.getSimilar(page, per_page).subscribe(
            data => {
                this.offers = data;
            }
        );
    }

    offer_search() {
        this.getOffers(Math.floor(Math.random() * 4), 16);
    }

    offer_search_keydown(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            this.offer_search();
        }
    }

    markerClick(r: Offer) {
        console.log('markerClick');
        console.log(r);
        //r.selected = !r.selected;
        // scroll to object ???
    }

    addPhone() {
        this.person.phones.push('');
    }

    addEmail() {
        this.person.emails.push('');
    }

    createRequest() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        var req = new Request();
        req.personId = this.person.id;
        tab_sys.addTab('request', {request: req});
    }

    toggleOffer(offer_type: string) {
        this.requestOfferType = offer_type;

        this._offerService.list(0, 32, OfferSource.LOCAL, {offerTypeCode: this.requestOfferType, personId: this.person.id}, "", []).subscribe(offers => {
            this.offers = offers;
        });

        this._requestService.list(0, 32, this.requestOfferType, null, this.person.id, "").subscribe(requests => {
            this.requests = requests;
        });

    }

    createOffer() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', {offer: {}, person: this.person});
    }

    getOfferDigest(r: Offer) {
        return Offer.getDigest(r);
    }
}
