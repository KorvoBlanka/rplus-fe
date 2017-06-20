import {Component, OnInit, AfterViewInit, trigger, state, style, transition, animate } from '@angular/core';

import {FormatDatePipe} from '../../pipe/format-date.pipe';

import {Tab} from '../../class/tab';
import {User} from '../../class/user';
import {Offer} from '../../class/offer';
import {Person} from '../../class/person';
import {Organisation} from '../../class/organisation';
import {Request} from '../../class/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';

import {HubService} from '../../service/hub.service';
import {UserService} from '../../service/user.service';
import {ConfigService} from '../../service/config.service';
import {OfferService, OfferSource} from '../../service/offer.service';
import {RequestService} from '../../service/request.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service';
import {PersonService} from '../../service/person.service';
import {OrganisationService} from '../../service/organisation.service';
import {AnalysisService} from '../../service/analysis.service';
import {SessionService} from "../../service/session.service";

@Component({
    selector: 'tab-advertising',
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

        .inline-select {
            display: inline-block;
            height: 20px;
            padding: 0 15px;
            font-size: 14px;
            color: #666;
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

        .main:hover{
            background-image: url(assets/main_offers_color.png);
        }

        .analitic:hover{
            background-image: url(assets/analitic_color.png) !important;
        }

        .history:hover{
            background-image: url(assets/history_color.png) !important;
        }

        .underline{
            border: 2px solid;
            color: #9279c8;
            background-color: #9279c8;
            position: relative;
            top: -2;
            width: 100vw;
            margin-bottom: 0;
        }

        .work_list, .work_list1{
            width: calc(100% - 30px);
            height: calc(100% - 117px);
            background: #f8f8f8;
            overflow-y: auto;
            position: absolute;
        }

        .work_list > .left_panel{
            width: calc(100% - 1071px);
            height: 100%;
            float: left;
        }

        .work_list1 > .left_panel{
            width: 65%;
            height: 100%;
            float: left;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: flex-start;
            overflow: hidden;
        }

        .work_list > .central_panel{
            width: 700px;
            height: 100%;
            float: left;
        }

        .work_list >.right_panel{
            width: 370px;
            height: 100%;
            float: left;
        }

        .work_list1 >.right_panel{
            width: 35%;
            height: 100%;
            float: left;
            overflow: hidden;
        }

        .map{
            width: calc(700px - 122px);
            position: relative;
            display: block;
            float: left;
            margin-top: 10px;
        }

        .map_menu{
            width: 100px;
            float: left;
            background-color: #f7f7f7;
            margin-left: 10px;
            margin-top: 10px;
        }
        .map_menu >div {
            height: 30px;
            width: 80%;
            text-align: left;
            background-color: rgba(0, 140, 219, 1);
            color: #ffffff;
            margin: 3px auto;
            line-height: 30px;
            font-size: 10pt;
            padding-left: 20px;
        }

        .map_menu >div:hover, .active_map_menu {
            background-color: rgba(18, 54, 120, 1) !important;
            color: white !important;
        }

        .work_list table, .work_list1 table{
            display: block;
            width: 100%;
            font-size: 9pt;
            border-spacing: 0;
            text-align: center;
            height: 50%;
            min-height: 335px;
        }

        .work_list1 table{
            text-align: center;
            width: calc(100% - 10px);
            padding-left: 10px;
            height: 50%;
            font-size: 10pt;
        }

        .work_list table tr, .work_list1 table tr{
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .work_list table tbody tr:nth-child(odd){
            background-color: #f9f9f9;
        }

        .work_list1 table tbody tr{
            color: #828282;
        }

        .work_list1 .table1 tbody tr:nth-child(odd){
            background-color: #f7faf3;
        }

        .work_list1 .table2 tbody tr:nth-child(odd){
            background-color: #f3f8fd;
        }

        .work_list table tbody tr:nth-child(even), .work_list table thead tr, .work_list1 table tbody tr:nth-child(even), .work_list1 table thead tr{
            background-color: #ffffff;
        }

        .work_list table thead, .work_list1 table thead{
            display: block;
        }

        .work_list1 table thead {
            height: 20px;
            font-size: 10pt;
            color: #587731;
            line-height: 20px;
        }

        .work_list1 .table2 thead {
            color: #205087;
        }

        .work_list table tbody{
            display: block;
            overflow: auto;
            height: calc(100% - 135px);
        }

        .work_list1 table tbody{
            display: block;
            overflow: auto;
            height: calc(100% - 79px);
        }

        digest-pie-chart, digest-column-chart{
            flex: 1 1 30%;
            height: 48%;
            margin: 3px;
        }


    `],
    template: `
        <div class="header-label-abs" style="margin: 2px 0 0 30px;">{{ tab.header }}</div>
        <div class = "round_menu">
            <div (click)="toggleSource('main')"     class="button main"     [style.background-image]="iconSource[0]">Главная</div>
            <div (click)="toggleSource('analitic')" class="button analitic" [style.background-image]="iconSource[1]">Аналитика</div>
            <div (click)="toggleSource('history')"  class="button history"  [style.background-image]="iconSource[2]">История</div>
        </div>
        <div class="search-form">
            <div class="search-box">
                <input type="text" class="" placeholder="" style="height: 28px; width: 100%;
                background-color: rgb(247, 247, 247); border: 1px solid rgba(204, 204, 204, 0.47);"
                    [(ngModel)]="searchQuery" (keyup)="$event"
                >
                <span class="icon-search" style="position: absolute; right: 12px; top: 7px;"></span>
            </div>
            <div class="tool-box">


            <div class="inline-select">
                <ui-select class="view-value edit-value"
                    [options] = "[
                        {value: 'sale', label: 'Мои предложения'},
                        {value: 'rent', label: 'Не мои предложения'}
                    ]"
                    [value]="'sale'"
                    [config]="{icon: 'icon-', draw_arrow: true}"
                    (onChange)="null"
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
                        (onChange)="null"
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
                        (onChange)="null"
                    >
                    </ui-select>
                </div>
                <div class="inline-select">
                    <ui-select class="view-value edit-value"
                        [options]="[
                            {value: 'all', label: 'Все'},
                            {value: 'raw', label: 'Не активен'},
                            {value: 'active', label: 'Активен'},
                            {value: 'price', label: 'Прайс'},
                            {value: 'deal', label: 'Сделка'},
                            {value: 'suspended', label: 'Приостановлен'},
                            {value: 'archive', label: 'Архив'}
                        ]"
                        [value]="filter.stage"
                        [config]="{icon: 'icon-square', drawArrow: true}"
                        (onChange)="filter.stageCode = $event.selected.value; searchParamChanged($event);"
                    >
                    </ui-select>
                </div>
                <div class="inline-select">
                    <ui-select class="view-value edit-value"
                        [options] = "[
                            {value: 'sale', label: 'Продажа'},
                            {value: 'rent', label: 'Аренда'}
                        ]"
                        [value]="'sale'"
                        [config]="{icon: 'icon-', draw_arrow: true}"
                        (onChange)="null"
                        >
                    </ui-select>
                </div>
            </div>
        </div>
        <hr class="underline">
        <div *ngIf="activeMenu == 0" class="work_list">
            <div class="left_panel">
                <table>
                    <thead>
                        <tr>
                            <td style="width: 15px"></td>
                            <td style="width: 15px"><div style="width: 15px">Тэг</div></td>
                            <td style="width: 250px">Объект</td>
                            <td style="width: 75px">Рейтинг</td>
                            <td style="width: 40px">Заявка</td>
                            <td style="width: 40px">Интерес</td>
                            <td style="width: 40px">Дельта</td>
                            <td style="width: 40px">Показ</td>
                        </tr>
                    </thead>
                    <tbody (scroll)="scroll($event)">
                        <tr *ngFor="let offer of offers">
                            <td style="width: 15px">{{"  "}}</td>
                            <td style="width: 15px">{{"  "}}</td>
                            <td>
                                <digest-offer
                                    style="width: 250px; display: block; background-color: transparent;"
                                    [offer]="offer"
                                    [compact]="true"
                                    (click)="click($event, offer)"
                                    (contextmenu)="click($event, offer)"
                                    (dblclick)="dblClick(offer)"
                                    (touchstart)="tStart(offer)"
                                    (touchend)="tEnd(offer)"
                                >
                                </digest-offer>
                            </td>
                            <td style="width: 75px">4</td>
                            <td style="width: 40px">5</td>
                            <td style="width: 40px">6</td>
                            <td style="width: 40px">7</td>
                            <td style="width: 40px">8</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!------------------------------------------------------------------------------------------------------------------->
            <div class="central_panel">
                <digest-pie-chart style="float: left; margin-right: 10px;"
                    [header]="'Объекты по типу'"
                    [data]="[
                        ['Квартиры', 300],
                        ['Малосемейки', 200],
                        ['Комнаты', 170],
                        ['Дома', 90],
                        ['Коммерческая', 110]
                    ]"
                    [hard_data]="false"
                    [result] = "['870']"
                    [width] = "'369px'"
                    [height] = "'174px'"
                >
                </digest-pie-chart>
                <digest-pie-chart style="float: left; margin-right: 10px;"
                    [header]="'Объекты по районам'"
                    [data]="[
                        ['Железнодорожный', 320],
                        ['Кировский'      , 222],
                        ['Краснофлотский' , 120],
                        ['Индустриальный' , 69],
                        ['Центральный'    , 150]
                    ]"
                    [hard_data]="false"
                    [result] = "['1500']"
                    [width] = "'310px'"
                    [height] = "'174px'"
                >
                </digest-pie-chart>
                <digest-column-chart style="float: left; margin-right: 10px;  margin-top: 10px;"
                    [header]="'Заявки по районам'"
                    [data]="[
                        ['Железнодорожный', 73],
                        ['Кировский'      , 58],
                        ['Краснофлотский' , 43],
                        ['Индустриальный' , 28],
                        ['Центральный'    , 41]
                    ]"
                    [hard_data]="false"
                    [result] = "['1500', 40]"
                    [height] = "'176px'"
                    [graph_width] = "200"
                    [width] = "'369px'"
                >
                </digest-column-chart>
                <digest-pie-chart style="float: left; margin-top: 10px;"
                    [header]="'Заявки по типу'"
                    [data]="[
                        ['Квартиры', 15],
                        ['Малосемейки', 24],
                        ['Комнаты', 30],
                        ['Дома', 8],
                        ['Коммерческая', 2]
                    ]"
                    [hard_data]="false"
                    [result] = "['95']"
                    [width] = "'310px'"
                    [height] = "'174px'"
                >
                </digest-pie-chart>
                <div >
                    <google-map class="map"
                    >

                    </google-map>
                    <div class="map_menu">
                        <div [class.active_map_menu]="selectMapMenu == 1" (click)="setMenu(1)" style="margin-top: 1px;">Фото</div>
                        <div [class.active_map_menu]="selectMapMenu == 2" (click)="setMenu(2)">Карта</div>
                        <div [class.active_map_menu]="selectMapMenu == 3" (click)="setMenu(3)">Понорама</div>
                        <div [class.active_map_menu]="selectMapMenu == 4" (click)="setMenu(4)">Маршруты</div>
                        <div [class.active_map_menu]="selectMapMenu == 5" (click)="similarObjSelected()">Похожие</div>
                        <div [class.active_map_menu]="selectMapMenu == 6" (click)="requestsSelected()">Заявки</div>
                        <div [class.active_map_menu]="selectMapMenu == 7" (click)="setMenu(7)">Реклама</div>
                        <div [class.active_map_menu]="selectMapMenu == 8" (click)="setMenu(8)">Документы</div>
                        <div [class.active_map_menu]="selectMapMenu == 9" (click)="setMapQuery('Образование', 9)">Образование</div>
                        <div [class.active_map_menu]="selectMapMenu == 10" (click)="setMapQuery('магазины', 10)">Продукты</div>
                    </div>
                </div>
            </div>
            <!------------------------------------------------------------------------------------------------------------------->
            <div class="right_panel">
                <digest-pie-chart
                    [header]="'Реклама объектов'"
                    [data]="[
                        ['Авито', 800, +18.7],
                        ['Фарпост', 400, -18.3],
                        ['Презент', 350, +10.3]
                    ]"
                    [hard_data]="true"
                    [result] = "['1500', 16.7]"
                    [height] = "'160px'"
                    [width] = "'338px'"
                >
                </digest-pie-chart>
                <ui-advertising> </ui-advertising>
            </div>
        </div>

<!------------------------------------------------------------------------------------------------------------------->
<!-------------------------------АНАЛИТИКА---------------------------------------------------->
<!------------------------------------------------------------------------------------------------------------------->

        <div *ngIf="activeMenu == 1" class="work_list1">
            <div class="left_panel">
                <div style="height: 50%; min-height:335px; display: flex; flex-wrap: wrap; justify-content: space-between;
                        align-content: space-between;"
                >
                    <digest-pie-chart
                        [header]="'Расходы по источникам'"
                        [data]="[
                            ['Авито', 8000, 18.7],
                            ['Фарпост', 4000, -18.7],
                            ['Презент', 3000, 18.7],
                            ['Из рук в руки', 2000],
                            ['ВНХ', 1000, -40.5]
                        ]"
                        [hard_data]="true"
                        [result] = "['14000', -20.2]"
                        [width] = "'375px'"
                        [height] = "calcHeight()"
                    >
                    </digest-pie-chart>
                    <digest-pie-chart
                        [header]="'Предложения по районам'"
                        [data]="[
                            ['Железнодорожный', 320],
                            ['Кировский'      , 222],
                            ['Краснофлотский' , 120],
                            ['Индустриальный' , 69],
                            ['Центральный'    , 150]
                        ]"
                        [hard_data]="false"
                        [result] = "['1500']"
                        [width] = "'335px'"
                        [height] = "'180px'"
                    >
                    </digest-pie-chart>

                    <digest-column-chart
                        [header]="'Предложения по типу'"
                        [data]="[
                            ['Комната', 48],
                            ['Квартира', 34],
                            ['Малосемейка', 18],
                            ['Гостинка', 20],
                            ['Коттедж', 25],
                            ['Участок', 45]
                        ]"
                        [hard_data]="false"
                        [result] = "['1500', 40]"
                        [height] = "'180px'"
                        [graph_width] = "200"
                        [width] = "'360px'"
                    >
                    </digest-column-chart>

                    <digest-pie-chart
                    [header]="'Заявки по типу'"
                    [data]="[
                        ['Квартиры', 15, 3.4],
                        ['Малосемейки', 24, 4.8],
                        ['Комнаты', 30, -5.3],
                        ['Дома', 8, -3.2],
                        ['Коммерческая', 2, 10.1]
                    ]"
                    [hard_data]="true"
                    [result] = "['95', 5.6]"
                    [width] = "'335px'"
                    [height] = "'165px'"
                    >
                    </digest-pie-chart>
                    <digest-pie-chart
                        [header]="'Заявки по источникам'"
                        [data]="[
                            ['Интернет', 329, 13.4],
                            ['Печатное издание', 270, -14.8],
                            ['Входящий звонок', 120, 15.3]
                        ]"
                        [hard_data]="true"
                        [result] = "['759', -45.6]"
                        [width] = "'360px'"
                        [height] = "'165px'"
                    >
                    </digest-pie-chart>
                    <digest-column-chart
                        [header]="'Заявки по районам'"
                        [data]="[
                            ['Железнодорожный', 73],
                            ['Кировский'      , 58],
                            ['Краснофлотский' , 43],
                            ['Индустриальный' , 28],
                            ['Центральный'    , 41]
                        ]"
                        [hard_data]="false"
                        [result] = "['1500', 40]"
                        [height] = "'165px'"
                        [graph_width] = "200"
                        [width] = "'375px'"
                    >
                    </digest-column-chart>
                </div>
                <div style="width: 100%; height: 50%; min-height:335px; position: relative;">
                    <digest-area-chart style="width: 100%;position: absolute;bottom: 0;right: 0;"
                        [header]="'Реклама в динамике'"
                        [data]="[
                            ['Интернет', 329, 13.4],
                            ['Печатное издание', 270, -14.8],
                            ['Входящий звонок', 120, 15.3]
                        ]"
                        [hard_data]="true"
                        [result] = "['759', -45.6]"
                        [width] = "'100%'"
                    >
                    </digest-area-chart>
                </div>
            </div>
            <!------------------------------------------------------------------------------------------------------------------->

            <!------------------------------------------------------------------------------------------------------------------->
            <div class="right_panel">
                <table class="table1">
                <div style="height: 60px; display: flex; background-color: white; width: 100%; justify-content: space-between;">
                    <div style="text-transform: uppercase; color: #4c4c4c; margin: 7px 0 20px 10px; font-size: 13pt;">
                            Конверсия рекламы
                    </div>
                    <div style="text-transform: uppercase;color: #008000;margin: 2px 30 20px;font-size: 19pt;">40%</div>
                </div>
                    <thead>
                        <tr>
                            <td style="width: calc(100% - 390px)">Источник</td>
                            <td style="width: 60px">Объект</td>
                            <td style="width: 60px">Заявки</td>
                            <td style="width: 60px">Показы</td>
                            <td style="width: 60px">Цены</td>
                            <td style="width: 70px">Договора</td>
                            <td style="width: 80px">Конверсия</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let data of advArray">
                            <td style="width: calc(100% - 390px)">{{data[0]}}</td>
                            <td style="width: 60px">{{data[1]}}</td>
                            <td style="width: 60px">{{data[2]}}</td>
                            <td style="width: 60px">{{data[3]}}</td>
                            <td style="width: 60px">{{data[4]}}</td>
                            <td style="width: 70px">{{data[5]}}</td>
                            <td style="width: 80px">{{data[6] + '%'}}</td>
                        </tr>
                    </tbody>
                </table>

                <table class="table2" style="margin-top: 20px;height: calc(50% - 20px);">
                    <div style="height: 60px; display: flex; background-color: white; width: 100%; justify-content: space-between;">
                        <div style="text-transform: uppercase; color: #4c4c4c; margin: 7px 0 20px 10px; font-size: 13pt;">
                            Лидеры спроса
                        </div>
                        <div style="text-transform: uppercase;color: #008000;margin: 2px 30 20px;font-size: 19pt;"></div>
                    </div>
                    <thead>
                        <tr>
                            <td style="width: calc(100% - 250px)">Объект</td>
                            <td style="width: 60px">Заявка</td>
                            <td style="width: 60px">Интерес</td>
                            <td style="width: 60px">Дельта</td>
                            <td style="width: 70px">Показ</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ngFor="let data of offers">
                            <td style="width: calc(100% - 250px)">
                                <digest-offer
                                    style="width: 250px; display: block; background-color: transparent;"
                                    [offer]="data"
                                    [compact]="true"
                                    (click)="click($event, data)"
                                    (contextmenu)="click($event, data)"
                                    (dblclick)="dblClick(data)"
                                    (touchstart)="tStart(data)"
                                    (touchend)="tEnd(data)"
                                >
                                </digest-offer>
                            </td>
                            <td style="width: 60px">70</td>
                            <td style="width: 60px">20</td>
                            <td style="width: 60px">150</td>
                            <td style="width: 70px">14</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div *ngIf="activeMenu == 2" class="work_list1">

        </div>
    `
})

export class TabAdvertisingComponent implements OnInit, AfterViewInit {
    public tab: Tab;
    iconSource: string[]=["url(assets/main_offers_color.png)", "url(assets/analitic.png)", "url(assets/history.png)"];
    activeMenu: number = 0;

    chartID: string = "Chart"+Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    offers: Offer[];
    hitsCount: number = 0;
    page: number = 0;
    perPage: number = 32;
    source: OfferSource = OfferSource.LOCAL;
    filter: any = {
        stageCode: 'all',
        agentId: 'all',
        tag: 'all',
        changeDate: 90,
        offerTypeCode: 'sale',
    };

    sort: any = {};
    searchQuery: string = "";
    searchArea: any[] = [];

    advArray = [
        ['Авито', 500, 400, 329, 230, 150, 50],
        ['Фарпост', 500, 400, 329, 230, 150, -50],
        ['ВНХ', 500, 400, 329, 230, 150, -24],
        ['Из рук в руки', 500, 400, 329, 230, 150, -18],
        ['Презент', 500, 400, 329, 230, 150, 17],
        ['ЦИАН', 500, 400, 329, 230, 150, 24],
        ['Барахла', 500, 400, 329, 230, 150, -3],
        ['Авито', 500, 400, 329, 230, 150, -10]
    ];

    advArray1=[

    ]


    constructor(private _hubService: HubService,
                private _userService: UserService,
                private _configService: ConfigService,
                private _offerService: OfferService,
                private _analysisService: AnalysisService,
                private _historyService: HistoryService,
                private _sessionService: SessionService
    ) {

    }

    ngOnInit() {
        this.tab.header="Реклама";
        this.listOffers();
    }

    ngAfterViewInit() {

    }

    toggleSource(s: string) {
        if (s == 'main') {
            this.iconSource[0]="url(assets/main_offers_color.png)";
            this.iconSource[1]="url(assets/analitic.png)";
            this.iconSource[2]="url(assets/history.png)";
            this.activeMenu = 0;
        } else if(s == 'analitic') {
            this.iconSource[0]="url(assets/main_offers.png)";
            this.iconSource[1]="url(assets/analitic_color.png)";
            this.iconSource[2]="url(assets/history.png)";
            this.activeMenu = 1;
        }else {
            this.iconSource[0]="url(assets/main_offers.png)";
            this.iconSource[1]="url(assets/analitic.png)";
            this.iconSource[2]="url(assets/history_color.png)";
            this.activeMenu = 2;
        }
    }

    listOffers() {

        this._offerService.list(this.page, this.perPage, this.source, this.filter, this.sort, this.searchQuery, this.searchArea).subscribe(
            data => {

                this.hitsCount = data.hitsCount || 0;

                if (this.page == 0) {
                    this.offers = data.list;
                } else {
                    data.list.forEach(i => {
                        this.offers.push(i);
                    })
                }
            },
            err => console.log(err)
        );
    }

    scroll(e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this.page += 1;
            this.listOffers();
        }
    }

    rand(max, min){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    calcHeight(){

    }

}
