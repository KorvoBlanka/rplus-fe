import {Component, OnInit, AfterViewInit} from '@angular/core';


import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {OfferService} from '../../service/offer.service';
import {RequestService} from '../../service/request.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service'
import {PhotoService} from '../../service/photo.service'
import {UserService} from '../../service/user.service'

import {AnalysisService} from '../../service/analysis.service'
import {Tab} from '../../class/tab';
import {Offer} from '../../class/offer';
import {Request} from '../../class/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';
import {Photo} from '../../class/photo';
import {User} from '../../class/user';
import {PersonService} from "../../service/person.service";
import {Person} from "../../class/person";


@Component({
    selector: 'tab-offer',
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

        .offer-prop {
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
            width: 100%;;
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
            margin: 0 10px 0 0;
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
    `],
    template: `
        <div class="tab-button fixed-button" (click)="toggleLeftPane()">
            <span [ngClass]="{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}"></span>
        </div>

        <div class="offer" (window:resize)="onResize($event)">

            <!-- ПРАВАЯ СТВОРКА: НАЧАЛО -->

            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="header">
                    <div class="header-label">{{ tab.header }}</div>
                </div>
                <div class="offer-prop" [style.height]="paneHeight">
                    <div style="margin: 5px;">
                        <div class="pull-container">
                            <div class="font-sz-2 pull-left">Источник: <span class="color-g1"><a href="{{ offer.sourceUrl }}" target="_blank">{{ offer.sourceMedia }}</a></span></div>
                            <div class="font-sz-1 color-g2 pull-right"> {{offer.changeDate | formatDate }} </div>
                        </div>
                        <div class="font-sz-2 color-g2 line-clamp line-clamp-2" style="margin: 5px 5px 0 5px;">{{ offer.sourceMediaText }}</div>
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
                                    [value]="offer.agent?.id"
                                    (onChange)="agentChanged($event)"
                                >
                                </ui-select>
                            </div>
                            <div class="view-group">
                                <span class="view-label">Статус</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "stateCodeOptions"
                                    [value]="offer.stateCode"
                                    (onChange)="offer.stateCode = $event.selected.value"
                                >
                                </ui-select>
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Стадия</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "stageCodeOptions"
                                    [value]="1"
                                    (onChange)="offer.stageCode = $event.selected.value"
                                >
                                </ui-select>
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Собственник</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "personOpts"
                                    [value]="offer.person?.id"
                                    (onChange)="personChanged($event)"
                                >
                                </ui-select>
                            </div>
                            <div class="view-group">
                                <span class="view-label pull-left"></span>
                                <span class="view-value"> </span>
                            </div>
                            <div class="view-group">
                                <span class="view-label pull-left">Договор</span>
                                <span class="view-value"> ... </span>
                            </div>
    
                            <br>
    
                            <div class="view-group">
                                <span class="view-label pull-left">Предложение</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "offerTypeCodeOptions"
                                    [value]="offer.offerTypeCode"
                                    (onChange)="offer.offerTypeCode = $event.selected.value"
                                >
                                </ui-select>
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Тип недвижимости</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "typeCodeOptions"
                                    [value]="offer.typeCode"
                                    (onChange)="offer.typeCode = $event.selected.value"
                                >
                                </ui-select>
                            </div>
    
    
                            <div class="view-group">
                                <span class="view-label">Город</span>
                                <input type="text" class="view-value edit-value" [(ngModel)]="offer.locality">
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Район</span>
                                <input type="text" class="view-value edit-value" [(ngModel)]="offer.district">
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Адрес</span>
                                <input type="text" class="view-value edit-value" [(ngModel)]="offer.address">
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Номер</span>
                                <input class="view-value edit-value vv-2" [(ngModel)]="offer.houseNum">/
                                <input class="view-value edit-value vv-2" [(ngModel)]="offer.apNum">
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Планировка</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "apSchemaOptions"
                                    [value]="offer.apSchemeId"
                                    (onChange)="offer.apSchemeId = $event.selected.value"
                                >
                                </ui-select>
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Материал стен</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "houseTypeOptions"
                                    [value]="offer.houseTypeId"
                                    (onChange)="offer.houseTypeId = $event.selected.value"
                                >
                                </ui-select>
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Количество комнат</span>
                                <input type="number" class="view-value edit-value vv-2" [(ngModel)]="offer.roomsOfferCount">/
                                <input type="number" class="view-value edit-value vv-2" [(ngModel)]="offer.roomsCount">
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Тип комнаты</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "roomSchemeOptions"
                                    [value]="offer.roomSchemeId"
                                    (onChange)="offer.roomSchemeId = $event.selected.value"
                                >
                                </ui-select>
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Этаж</span>
                                <input class="view-value edit-value vv-3" [(ngModel)]="offer.floor">/
                                <input class="view-value edit-value vv-3" [(ngModel)]="offer.floorsCount">/
                                <input class="view-value edit-value vv-3" [(ngModel)]="offer.levelsCount">
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Площадь</span>
                                <input class="view-value edit-value vv-3" [(ngModel)]="offer.squareTotal">/
                                <input class="view-value edit-value vv-3" [(ngModel)]="offer.squareLiving">/
                                <input class="view-value edit-value vv-3" [(ngModel)]="offer.squareKitchen">
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Балкон</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "balconyOptions"
                                    [value]="offer.balconyId"
                                    (onChange)="offer.balconyId = $event.selected.value"
                                >
                                </ui-select>
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Санузел</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "bathroomOptions"
                                    [value]="offer.bathroomId"
                                    (onChange)="offer.bathroomId = $event.selected.value"
                                >
                                </ui-select>
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Состояние</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "conditionOptions"
                                    [value]="offer.conditionId"
                                    (onChange)="offer.conditionId = $event.selected.value"
                                >
                                </ui-select>
                            </div>
    
                            <div class="view-group">
                                <span class="view-label">Цена</span>
                                <input class="view-value edit-value vv-2" [(ngModel)]="offer.ownerPrice">/
                                <input class="view-value edit-value vv-2" [(ngModel)]="offer.agencyPrice">
                            </div>
    
                            <div class="view-group" style="flex-wrap: wrap;">
                                <span class="view-label">Описание</span>
                                <textarea class="view-value text-value" placeholder="" [(ngModel)]="offer.description" style="text-align: left;"></textarea>
                            </div>
    
                        </div>
    
                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: ???? -->
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->
    
                        <div class="view-block" [hidden]="editEnabled" style="margin: 20px 10px;">
    
                            <div class="view-group">
                                <span class="view-label">Ответственный</span>
                                <span class="view-value"> {{ offer.agent?.name }} </span>
                            </div>
                            <div class="view-group">
                                <span class="view-label">Статус</span>
                                <ui-view-value
                                    [options] = "stateCodeOptions"
                                    [value]="offer.stateCode"
                                > 
                                </ui-view-value>
                            </div>
                            <div class="view-group">
                                <span class="view-label">Стадия</span>
                                <ui-view-value
                                    [options] = "stageCodeOptions"
                                    [value]="offer.stageCode"
                                >
                                </ui-view-value>
                            </div>
                            <div class="view-group">
                                <span class="view-label">Собственник</span>
                                <span class="view-value"> {{ offer.person?.name }} </span>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left"></span>
                                <span class="view-value"> </span>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Договор</span>
                                <span class="view-value"> </span>
                            </div>
        
                            <br>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Предложение</span>
                                <ui-view-value
                                    [options] = "offerTypeCodeOptions"
                                    [value]="offer.offerTypeCode"
                                >
                                </ui-view-value>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Тип недвижимости</span>
                                <ui-view-value
                                    [options] = "typeCodeOptions"
                                    [value]="offer.typeCode"
                                >
                                </ui-view-value>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Город</span>
                                <span class="view-value"> {{ offer.locality }} </span>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Район</span>
                                <span class="view-value"> {{ offer.district }} </span>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Адрес</span>
                                <span class="view-value"> {{ offer.address + ' ' + (offer.houseNum | strNn) }} </span>
                            </div>
                            
        
                            <div class="view-group">
                                <span class="view-label pull-left">Планировка</span>                               
                                <ui-view-value
                                    [options] = "apSchemaOptions"
                                    [value]="offer.apSchemeId"
                                >
                                </ui-view-value>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Материал стен</span>
                                <ui-view-value
                                    [options] = "houseTypeOptions"
                                    [value]="offer.houseTypeId"
                                >
                                </ui-view-value>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Количество комнат</span>
                                <span class="view-value"> {{ offer.roomsCount }} </span>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Тип комнат</span>
                                <ui-view-value
                                    [options] = "roomSchemeOptions"
                                    [value]="offer.roomSchemeId"
                                >
                                </ui-view-value>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Этаж</span>
                                <span class="view-value"> {{ offer.floor }} </span>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Площадь</span>
                                <span class="view-value"> {{ offer.squareTotal }} </span>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Балкон</span>
                                <ui-view-value
                                    [options] = "balconyOptions"
                                    [value]="offer.balconyId"
                                >
                                </ui-view-value>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Санузел</span>
                                <ui-view-value
                                    [options] = "bathroomOptions"
                                    [value]="offer.bathroomId"
                                >
                                </ui-view-value>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Состояние</span>
                                <ui-view-value
                                    [options] = "conditionOptions"
                                    [value]="offer.conditionId"
                                >
                                </ui-view-value>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Цена</span>
                                <span class="color-attention view-value"> {{ offer.ownerPrice }} тыс. руб.</span>
                            </div>
        
                            <div class="view-group">
                                <span class="view-label pull-left">Описание</span>
                                <span class="view-value" style="height: initial;"> {{ offer.description }} </span>
                            </div>
        
                        </div>
    
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: КОНЕЦ -->
            
                        <div style="margin-bottom: 20px;">
                            <div class="view-group">
                                <span class="icon-tag"> Тэги</span>
                            </div>
                            <ui-tag-block
                                [value] = "offer.tag"
                                (valueChange) = "offer.tag = $event.value"
                            ></ui-tag-block>
                        </div>
            
                        <div style="margin-bottom: 20px;">
                            <div class="view-group">
                                <span class="icon-photo"> Фотографии</span>
                            </div>
                            <ui-carousel
                                [photos] = "offer.photoUrl"
                            >
                            </ui-carousel>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ПРАВАЯ СТВОРКА: КОНЕЦ -->
            <!-- РАБОЧАЯ ОБЛАСТЬ: НАЧАЛО -->

            <div class="work-area" [style.width.px]="mapWidth">
                <ui-tabs
                    [headerMode]="!paneHidden"
                >
                    <ui-tab
                        [title]="'Карта'"
                    >
                        <google-map [latitude]="lat" [longitude]="lon" [zoom]="zoom">
                            <google-map-marker
                                *ngIf="offer.locationLat"
                                (markerClick)="markerClick(offer)"
                                [latitude]="offer.locationLat"
                                [longitude]="offer.locationLon"
                                [info_str]=""
                            >
                            </google-map-marker>
                        </google-map>
                    </ui-tab>
                    <ui-tab
                        [title]="'Похожие объекты'"
                        (tabSelect)="similarObjSelected()"
                    >
                    <!-- сильное колдунство, св-во right получаем из HubService -->
                    <!-- TODO: сделать это отдельным компонентом -->
                        <div  style="position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;" [style.right]="_hubService.shared_var['nb_width']">
                            <div style="width: 330px; background-color: #fff;">
                                <div class="header">
                                    <input type="text" style="width: 280px; margin-left: 10px; border: none;"
                                        (keydown)="simSearchKeydown($event)"
                                    >
                                    <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                                        (click)="simSearch()"
                                    ></span>
                                </div>
                                <div class="" style="width: 100%; overflow-y: scroll;" [style.height]="paneHeight">
                                    <digest-offer *ngFor="let offer of similarOffers"
                                        [offer]="offer"
                                        [compact]="true"
                                    >
                                    </digest-offer>
                                </div>
                            </div>
                        </div>
                        <google-map [latitude]="lat" [longitude]="lon" [zoom]="zoom" [objects]="similarOffers">
                            <google-map-marker
                                *ngIf="offer.locationLat"
                                (markerClick)="markerClick(offer)"
                                [latitude]="offer.locationLat"
                                [longitude]="offer.locationLon"
                                [info_str]=""
                            >
                            </google-map-marker>
                        </google-map>
                    </ui-tab>
                    <ui-tab
                        [title]="'Заявки'"
                        (tabSelect)="requestsSelected()"
                    >
                        <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="paneHeight">
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
    `,
    providers: [OfferService]
})

export class TabOfferComponent implements OnInit {
    public tab: Tab;
    public offer: Offer;
    public photos: Photo[];

    agentOpts: any[] = [];

    personOpts: any[] = [];

    similarOffers: Offer[];
    requests: Request[];
    historyRecs: HistoryRecord[];

    paneHidden: boolean = false;
    paneHeight: number;
    paneWidth: number;
    mapWidth: number;

    editEnabled: boolean = false;


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

    offerTypeCodeOptions = [
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

    typeCodeOptions = [
        {value: 'room', label: 'Комната'},
        {value: 'apartment', label: 'Квартира'},
        {value: 'apartment_small', label: 'Малосемейка'},
        {value: 'apartment_new', label: 'Новостройка'},

        {value: 'house', label: 'Дом'},
        {value: 'dacha', label: 'Дача'},
        {value: 'cottage', label: 'Коттедж'},

        {value: 'townhouse', label: 'Таунхаус'},

        {value: 'other', label: 'Другое'},
        {value: 'land', label: 'Земля'},

        {value: 'building', label: 'здание'},
        {value: 'office_place', label: 'офис'},
        {value: 'office', label: 'офис'},
        {value: 'market_place', label: 'торговая площадь'},
        {value: 'production_place', label: 'производственное помещение'},
        {value: 'gpurpose_place', label: 'помещение общего назначения'},
        {value: 'autoservice_place', label: 'автосервис'},
        {value: 'service_place', label: 'помещение под сферу услуг'},
        {value: 'warehouse_place', label: 'склад база'},
        {value: 'garage', label: 'гараж'}
    ];

    apSchemaOptions = [
        {value: 0, label: '-'},
        {value: 1, label: 'Индивидуальная'},
        {value: 2, label: 'Новая'},
        {value: 3, label: 'Общежитие'},
        {value: 4, label: 'Сталинка'},
        {value: 5, label: 'Улучшенная'},
        {value: 6, label: 'Хрущевка'}
    ];

    roomSchemeOptions = [
        {value: 0, label: '-'},
        {value: 1, label: 'Икарус'},
        {value: 2, label: 'Кухня-гостинная'},
        {value: 3, label: 'Раздельные'},
        {value: 4, label: 'Смежно-раздельные'},
        {value: 5, label: 'Смежные'},
        {value: 6, label: 'Студия'}
    ];

    houseTypeOptions = [
        {value: 0, label: '-'},
        {value: 1, label: 'Брус'},
        {value: 2, label: 'Деревянный'},
        {value: 3, label: 'Каркасно-засыпной'},
        {value: 4, label: 'Кирпичный'}
    ];

    conditionOptions = [
        {value: 0, label: '-'},
        {value: 1, label: 'социальный ремонт'},
        {value: 2, label: 'сделан ремонт'},
        {value: 3, label: 'дизайнерский ремонт'},
        {value: 4, label: 'требуется ремонт'},
        {value: 5, label: 'требуется косм. ремонт'},
        {value: 6, label: 'после строителей'},
        {value: 7, label: 'евроремонт'},
        {value: 8, label: 'удовлетворительное'},
        {value: 9, label: 'нормальное'}
    ];

    balconyOptions = [
        {value: 0, label: '-'},
        {value: 1, label: 'без балкона'},
        {value: 2, label: 'балкон'},
        {value: 3, label: 'лоджия'},
        {value: 4, label: '2 балкона'},
        {value: 5, label: '2 лоджии'},
        {value: 6, label: 'балкон и лоджия'},
        {value: 7, label: 'балкон застеклен'},
        {value: 8, label: 'лоджия застеклена'}
    ];

    bathroomOptions = [
        {value: 0, label: '-'},
        {value: 1, label: 'без удобств'},
        {value: 2, label: 'туалет'},
        {value: 3, label: 'с удобствами'},
        {value: 4, label: 'душ и туалет'},
        {value: 5, label: '2 смежных санузла'},
        {value: 6, label: '2 раздельных санузла'},
        {value: 7, label: 'санузел совмещенный'}
    ];

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
                private _photoService: PhotoService,
                private _userService: UserService,
                private _personService: PersonService) {

        setTimeout(() => {
            if (this.offer.id) {
                this.tab.header = 'Объект ' + this.offer.id;
            } else {
                this.tab.header = 'Новый Объект';
            }

        });

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
    }

    ngOnInit() {
        this.offer = this.tab.args.offer;

        var c = this._configService.getConfig();

        this.zoom = c.map.zoom;
        if (this.offer.locationLat) {
            this.lat = this.offer.locationLat;
            this.lon = this.offer.locationLon;
        } else {
            this.lat = c.map.lat;
            this.lon = c.map.lon;
        }

        if (this.offer.id == null && this.offer.sourceUrl == null) {
            this.offer = new Offer();

            if (this.tab.args.person) {
                this.offer.personId = this.tab.args.person.id;
            }

            this.editEnabled = true;
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
        this.offer.agentId = e.selected.value;
        if (this.offer.agentId != null) {
            this._userService.get(this.offer.agentId).subscribe(agent => {
                this.offer.agent = agent;
            });
        }
    }

    personChanged(e) {
        this.offer.personId = e.selected.value;
        if (this.offer.personId != null) {
            this._personService.get(this.offer.personId).subscribe(person => {
                this.offer.person = person;
            });
        }
    }

    save() {
        this._offerService.save(this.offer).subscribe(offer => {
            setTimeout(() => {
                this.offer = offer;
            });
            this.toggleEdit();
        });
    }

    similarObjSelected() {
        this.getSimilarOffers(1, 16);
    }

    requestsSelected() {
        //this.requests = this._requestService.list(1, 16, "", "");
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

    getSimilarOffers(page, per_page) {
        this._offerService.getSimilar(page, per_page).subscribe(
            data => {
                this.similarOffers = data;
            },
            err => console.log(err)
        );
    }

    simSearch() {
        this.getSimilarOffers(Math.floor(Math.random() * 4), 16);
    }

    simSearchKeydown(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            this.simSearch();
        }
    }

    markerClick(o: Offer) {
        //r.selected = !r.selected;
        // scroll to object ???
    }
}
