import {
    Component,
    ElementRef
} from '@angular/core';

import {OfferService} from '../../service/offer.service';
import {ConfigService} from '../../service/config.service';

import {Tab} from '../../class/tab';
import {Offer} from '../../class/offer';
import {HubService} from "../../service/hub.service";


@Component({
    selector: 'tab-list-offer',
    inputs: ['tab'],
    styles: [`
        .search-form {
            position: absolute;
            width: 45%;
            margin-left: 27.5%;
            margin-top: 10px;
            background: #fff;
            z-index: 1;
            border: 1px solid #eee;
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
            margin: 12px 12px 8px 12px;
        }
    
        .offer-list {
            position: relative;
        }
    
        .digest-list {
            overflow-x: scroll;
        }
    
        .pane {
            float: left;
            width: 370px;
            height: 100%;
            border-right: 1px solid #ccc;
        }
    
        .work-area {
            float: left;
            width: 77%;
            height: 100%;
        }
    
        .fixed-button {
            position: fixed;
            top: 0;
            left: 0;
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
        <div class="search-form" [class.table-mode]="tableMode">
            <div class="search-box">
                <input type="text" class="" placeholder="" style="height: 28px; width: 100%;" [(ngModel)]="searchQuery"
                       (keyup)="searchParamChanged($event)">
                <span class="icon-search" style="position: absolute; right: 12px; top: 7px;"></span>
            </div>
            <div class="tool-box">
        
                <div class="pull-left">
                
                    <button (click)="addOffer()">+</button>
                
                    <div class="inline-select">
                        <ui-select class="view-value edit-value"
                            [options]="[
                                {value: 'all', label: 'Все'},
                                {value: 1, label: 'Не активен'},
                                {value: 2, label: 'Активен'},
                                {value: 3, label: 'В работе'},
                                {value: 4, label: 'Приостановлен'},
                                {value: 5, label: 'Архив'}
                            ]"
                            [value]="'all'"
                            [config]="{icon: 'icon-square', drawArrow: true}"
                            (onChange)="filter.state = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                    <div class="inline-select">
                        <ui-select class="view-value edit-value"
                            [options]="[
                                {value: 1, label: 'Агент 1_1'},
                                {value: 2, label: 'Агент 1_2'},
                                {value: 3, label: 'Агент 1_3'},
                                {value: 4, label: 'Агент 1_4'},
                                {value: 5, label: 'Агент 1_5'}
                            ]"
                            [value]="1"
                            [config]="{icon: 'icon-person', drawArrow: true}"
                            (onChange)="filter.agent = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                    <div class="inline-select">
                        <ui-select class="view-value edit-value"
                            [options]="[
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
                            (onChange)="filter.tag = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                    <div class="inline-select">
                        <ui-select class="view-value edit-value"
                            [options]="[
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
                            (onChange)="filter.depth = $event.selected.value; searchParamChanged($event);"
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
                    <a (click)="toggleMode()">
                        <span
                            [ngClass]="{'icon-globus': tableMode, 'icon-table': !tableMode}"
                        ></span>
                    </a>
                </div>
            </div>
        </div>
        
        <offer-table
            [hidden]="!tableMode"
            [offers]="offers"
        >
        </offer-table>
        
        <div class="tab-button fixed-button" (click)="toggleLeftPane()">
            <span [ngClass]="{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}"></span>
        </div>
        
        <div class="offer-list"
             [hidden]="tableMode"
             (window:resize)="onResize($event)"
        >
            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="header">
                    <div class="header-label">
                        {{ tab.header }}
                    </div>
                </div>
                <div class="digest-list"
                     (scroll)="scroll($event)"
                     [style.height]="paneHeight"
                >
                    <digest-offer *ngFor="let offer of offers"
                                  [offer]="offer"
                                  (click)="select(offer)"
                    >
                    </digest-offer>
                </div>
            </div>
            <div class="work-area" [style.width.px]="mapWidth">
                <google-map
                        [latitude]="lat"
                        [longitude]="lon"
                        [zoom]="zoom"
                        [draw_allowed]="mapDrawAllowed"
                        (drawFinished)="finishDraw($event)"
                >
                    <div *ngFor="let r of offers">
                        <google-map-marker
                                *ngIf="r.location"
                                (click)="markerClick(r)"
                                [is_selected]="r.selected"
                                [latitude]="parseFloat(r.location.lat)"
                                [longitude]="parseFloat(r.location.lon)"
                                [info_str]="getOfferDigest(r)"
                        >
                        </google-map-marker>
                    </div>
                </google-map>
            </div>
        </div>
    `
})

export class TabListOfferComponent {
    public tab: Tab;
    public tableMode: boolean = false;

    searchQuery: string;

    filter: any = {
        state: null,
        agent: null,
        tag: null,
        depth: null,
    }

    paneHeight: number;
    paneWidth: number;
    mapWidth: number;
    paneHidden: boolean = false;

    public mapDrawAllowed = false;
    lat: number;
    lon: number;
    zoom: number;

    offers: Offer[] = [];
    page: number = 0;

    to: number;
    list: HTMLElement;


    constructor(private _elem: ElementRef, private _hubService: HubService, private _offerService: OfferService, private _configService: ConfigService) {

        this._offerService.listOffers(1, 32, "{}", "").then(offers => {
            this.offers = offers;
            this.page++;
        });

        setTimeout(() => {
            this.tab.header = 'Недвижимость';
        });
    }

    ngOnInit() {
        this.list = this._elem.nativeElement.querySelector('.digest-list');
        var c = this._configService.getConfig();
        this.lat = c.map.lat;
        this.lon = c.map.lon;
        this.zoom = c.map.zoom;

        this.calcSize();
    }

    onResize(e) {
        this.calcSize();
    }

    toggleMode() {
        this.tableMode = !this.tableMode;
    }

    toggleDraw() {
        this.mapDrawAllowed = !this.mapDrawAllowed;
    }

    finishDraw(e) {
        console.log('yay! finish')
        //this.mapDrawAllowed = false;
        console.log(e);
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

    select(r: Offer) {
        if (r.location) {
            this.lat = r.location.lat;
            this.lon = r.location.lon;
        }
    }

    scroll(e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this._offerService.listOffers(this.page, 10, JSON.stringify(this.filter), this.searchQuery).then(offers => {
                for (let i = 0; i < offers.length; i++) {
                    this.offers.push(offers[i]);
                }
                this.page++;
            });

        }
    }

    searchParamChanged(e) {
        this.page = 0;
        this._offerService.listOffers(this.page, 10, JSON.stringify(this.filter), this.searchQuery).then(offers => {
            this.offers = offers;
            this.page++;
        });
    }

    markerClick(r: Offer) {
        console.log('markerClick');
        console.log(r);
        //r.selected = !r.selected;
        // scroll to object !?
        // let get dirty!
        //if (r.selected) {
        var e: HTMLElement = <HTMLElement>this.list.querySelector('#r' + r.id);
        this.list.scrollTop = e.offsetTop - e.clientHeight;
        //}
    }

    getOfferDigest(r: Offer) {
        return Offer.getDigest(r);
    }

    addOffer() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', {user: new Offer()});
    }
}
