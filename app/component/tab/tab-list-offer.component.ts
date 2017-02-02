import {
    Component,
    ElementRef
} from '@angular/core';

import {OfferService, OfferSource} from '../../service/offer.service';
import {ConfigService} from '../../service/config.service';

import {Tab} from '../../class/tab';
import {Offer} from '../../class/offer';
import {HubService} from "../../service/hub.service";
import {UserService} from "../../service/user.service";


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
        
        .button {
            text-align: center;
            padding: 5px 15px;
            background-color: #3366cc;
            color: #fff;
            cursor: pointer;
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
                
                    <div class="inline-select" *ngIf="source == 1">
                        <ui-select class="view-value edit-value"
                            [options]="stateCodeOptions"
                            [value]="filter.state"
                            [config]="{icon: 'icon-square', drawArrow: true}"
                            (onChange)="filter.stateCode = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                    <div class="inline-select" *ngIf="source == 1">
                        <ui-select class="view-value edit-value"
                            [options]="agentOpts"
                            [value]="filter.agent"
                            [config]="{icon: 'icon-person', drawArrow: true}"
                            (onChange)="filter.agentId = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                    <div class="inline-select" *ngIf="source == 1">
                        <ui-select class="view-value edit-value"
                            [options]="[
                                {value: 'all', label: 'Все'},
                                {value: '1', label: 'Красный', icon: 'icon-circle tag-red'},
                                {value: '2', label: 'Оранжевый', icon: 'icon-circle tag-orange'},
                                {value: '3', label: 'Желтый', icon: 'icon-circle tag-yellow'},
                                {value: '4', label: 'Зеленый', icon: 'icon-circle tag-green'},
                                {value: '5', label: 'Голубой', icon: 'icon-circle tag-blue'},
                                {value: '6', label: 'Лиловый', icon: 'icon-circle tag-violet'},
                                {value: '7', label: 'Серый', icon: 'icon-circle tag-gray'}
                            ]"
                            [value]="filter.tag"
                            [config]="{icon: 'icon-tag', drawArrow: true}"
                            (onChange)="filter.tag = $event.selected.value; searchParamChanged($event);"
                        >
                        </ui-select>
                    </div>
                    <div class="inline-select">
                        <ui-select class="view-value edit-value"
                            [options]="[
                                {value: '1', label: '1 день'},
                                {value: '3', label: '3 дня'},
                                {value: '7', label: 'Неделя'},
                                {value: '14', label: '2 недели'},
                                {value: '30', label: 'Месяц'},
                                {value: '90', label: '3 месяца'},
                                {value: 'all', label: 'Все'}
                            ]"
                            [value]="filter.changeDate"
                            [config]="{icon: 'icon-month', drawArrow: true}"
                            (onChange)="filter.changeDate = $event.selected.value; searchParamChanged($event);"
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
                
                <!---------------------------------------------------------------------->
                
                    <div class="header-label" style="float: left;">
                        {{ tab.header }}
                    </div>
                    <div class="two-way-switch" style="float: right; display: flex;">
                        <div (click)="toggleSource('import')">Общая</div>&nbsp;
                        <div (click)="toggleSource('local')">Компании</div>
                    </div>
                    
                <!---------------------------------------------------------------------->
                    
                </div>
                <div class="digest-list"
                     (scroll)="scroll($event)"
                     [style.height]="paneHeight"
                >
                    <div class="button" (click)="addOffer()">
                        Добавить предложение
                    </div>                    
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
                    [objects]="offers"
                    [draw_allowed]="mapDrawAllowed"
                    (drawFinished)="finishDraw($event)"
                >
                </google-map>
            </div>
        </div>
    `
})

export class TabListOfferComponent {
    public tab: Tab;
    public tableMode: boolean = false;

    source: OfferSource = OfferSource.LOCAL;
    searchQuery: string = "";
    searchArea: any[] = [];

    filter: any = {
        stateCode: 'all',
        agentId: 'all',
        tag: 'all',
        changeDate: 90,
        offerTypeCode: 'sale',
    };

    agentOpts = [{
        value: 'all',
        label: '-'
    }];

    stateCodeOptions = [
        {value: 'all', label: 'Все'},
        {value: 'raw', label: 'Не активен'},
        {value: 'active', label: 'Активен'},
        {value: 'work', label: 'В работе'},
        {value: 'suspended', label: 'Приостановлен'},
        {value: 'archive', label: 'Архив'}
    ];

    paneHeight: number;
    paneWidth: number;
    mapWidth: number;
    paneHidden: boolean = false;

    public mapDrawAllowed = false;
    lat: number;
    lon: number;
    zoom: number;

    offers: Offer[];
    page: number = 0;
    perPage: number = 15;

    to: number;
    list: HTMLElement;


    constructor(private _elem: ElementRef, private _hubService: HubService, private _offerService: OfferService, private _userService: UserService, private _configService: ConfigService) {
        setTimeout(() => {
            this.tab.header = 'Недвижимость';
        });
    }

    ngOnInit() {

        this.tab.refreshRq.subscribe(
            sender => {
                this.listOffers();
            }
        )

        this.filter.offerTypeCode = this.tab.args.offerTypeCode;
        this.list = this._elem.nativeElement.querySelector('.digest-list');

        this.page = 0;
        this.listOffers();

        this._userService.list(null, null, "").subscribe(agents => {
            for (let i = 0; i < agents.length; i++) {
                var a = agents[i];
                this.agentOpts.push({
                    value: '' + a.id,
                    label: a.name
                });
            }
        });

        var c = this._configService.getConfig();
        this.lat = c.map.lat;
        this.lon = c.map.lon;
        this.zoom = c.map.zoom;

        this.calcSize();
    }

    listOffers() {
        this._offerService.list(this.page, this.perPage, this.source, this.filter, this.searchQuery, this.searchArea).subscribe(
            data => {
                if (this.page == 0) {
                    this.offers = data;
                } else {
                    data.forEach(i => {
                        this.offers.push(i);
                    })
                }
            },
            err => console.log(err)
        );
    }

    onResize(e) {
        this.calcSize();
    }

    toggleMode() {
        this.tableMode = !this.tableMode;
    }

    toggleDraw() {
        this.mapDrawAllowed = !this.mapDrawAllowed;
        if (!this.mapDrawAllowed) {
            this.page = 0;
            this.offers = [];
            this.searchArea = [];
            this.listOffers();
        }
    }

    finishDraw(e) {
        this.page = 0;
        this.offers = [];
        this.searchArea = e;
        this.listOffers();
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

    select(o: Offer) {
        if (o.locationLat && o.locationLon) {
            this.lat = o.locationLat;
            this.lon = o.locationLon;
        }
    }

    scroll(e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this.page += 1;
            this.listOffers();

        }
    }

    searchParamChanged(e) {
        this.page = 0;
        this.listOffers();
    }

    markerClick(o: Offer) {
        //r.selected = !r.selected;
        // scroll to object !?
        // let get dirty!
        //if (r.selected) {
        var e: HTMLElement = <HTMLElement>this.list.querySelector('#r' + o.id);
        this.list.scrollTop = e.offsetTop - e.clientHeight;
        //}
    }

    addOffer() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', {offer: new Offer()});
    }

    toggleSource(s: string) {

        if (s == 'local') {
            this.source = OfferSource.LOCAL;
        } else {
            this.source = OfferSource.IMPORT;
        }
        this.page = 0;
        this.listOffers();
    }
}
