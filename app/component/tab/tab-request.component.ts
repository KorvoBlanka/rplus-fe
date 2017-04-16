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
        .header_col{
            width: calc(100% - 10px);
            height: 40px;
            background-color: #f7f7f7;
            padding-left: 20px;
            text-transform: uppercase;
            font-size: 10pt;
            color: #5f5d5d;
            line-height: 40px;
            margin-bottom: 10px;
        }

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
            align-items: flex-start;
        }

        .view-label {
            white-space: nowrap;
            color: rgb(80, 80, 80);
            margin-top: 5px;
            font-size: 10pt;
        }

        .view-value {
            width: 100%;
            text-align: right;
            color: #696969;
            font-size: 10pt;
            margin-top: 5px;
            height: 19px; /* костыль */
            margin-right: 17px;
        }

        .edit-value {
            width: 100%;
            text-align: right;
            color: #696969;
            font-size: 10pt;
            margin-right: 15px;
            height: 19px; /* костыль */
            border: none !important;
        }

        .text-value {
            height: 3rem;
            border: 1px solid #E5E5E5 !important;
        }

        .edit-block > .view-group, .view-block > .view-group {
            height: 30px;
            height: 30px;
            margin-left: 57px;
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

        .button {
            text-align: center;
            padding: 5px 15px;
            background-color: #3366cc;
            color: #fff;
            cursor: pointer;
        }

        .person_face{
            height: 220px;
            background-color: #f7f7f7;
        }

        .person_face > .rate{
            height: 20px;
            background-image: url(res/star_rate.png);
            background-size: contain;
            width: 100px;
            margin-left: 20px;
            margin-top: 10px;
        }

        .person_face > img{
            width: 120px;
            height: 90px;
            margin: 20px 0 10 20px;
        }

        .person_face  .name{
            margin: 0 0 0 20px;
            border: 0 !important;
            font-size: 16pt;
            text-align: left;
            background-color: transparent;
            color: #595a5a;
            height: 23px;
            line-height: 23px;
        }
        .view_icon{
            width: 28px;
            height: 25px;
            background-size: contain;
            float: left;
            background-repeat: no-repeat;
            background-position: center;
            margin-right: 12px;
            margin-top: 2px;
            margin-left: 17px;
        }

        .edit-block >hr, .view-block >hr{
                margin: 5px -10px 5px 55px;
        }

        .arrow{
            background-image: url(res/arrow.png);
            width: 18px;
            height: 10px;
            background-size: cover;
            margin: 0 10px;
            background-position: center;
            flex: 0 0 18px;
            position: absolute;
            top: 5px;
            right: -10px;
        }

        .show_value{
            flex: 0 0 190px;
            margin-right: 30px;
            position: relative;
            text-align: right;
            height: 30px;
            display: flex;
            flex-direction: column;
        }

        .show_value > span:first-child{
            height: 10px;
            font-size: 8pt;
        }
        .show_value > span:last-child{
            font-size: 10pt;
            color: #959595;
        }

        .multiselect{
            width: 270px;
            position: relative;
            display: block;
            margin-right: 15px;
            overflow: hidden;
        }
    `],
    template: `

        <div class="tab-button fixed-button" (click)="toggleLeftPane()">
            <span [ngClass]="{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}"></span>
        </div>

        <div class="new-request" [hidden]="!newRequest">
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

        <div class="request" (window:resize)="onResize($event)" [hidden]="newRequest">

            <!-- ЛЕВАЯ СТВОРКА: НАЧАЛО -->

            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="header">
                    <div class="header-label">{{ tab.header }}</div>
                </div>

                <div style="overflow: scroll; overflow-x: hidden; height: calc(100% - 111px);
                        border-right: 1px solid #cccccc;">
                    <div class = "person_face">
                        <img src="/res/offer_icon/district.png">
                        <div class="view-group" style="flex-wrap: wrap;margin-top: -1px;">
                            <div class="view-value name" style="text-transform: uppercase;"> {{ 'Заявка'}}</div>
                            <div class="view-value name" style="font-size: 14pt; margin-top: 3px;"> </div>
                        </div>
                        <div class="rate"></div>
                    </div>
                    <div class="pull-container" style="margin: 20px 10px 0px;">
                        <div class="pull-right" [hidden]="editEnabled" (click)="toggleEdit()"><a href="#" >Изменить</a></div>
                        <div class="pull-right" [hidden]="!editEnabled" (click)="save()"><a href="#" >Готово</a></div>
                    </div>

                    <div class="request-prop">
                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->

                        <div class="edit-block" [hidden]="!editEnabled" style="margin: 10px 10px 10px 0px;">
                            <div class="header_col">Общее</div>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/date_start.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Дата заявки:'" [value] = "request.changeDate | formatDate"
                                    [width] = "'225px'" (onChange)= "request.changeDate = $event">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/person_icon/category.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Тип:</span>
                                <input type="text" class="view-value edit-value" readonly [(ngModel)]="request.offerTypeCode">

                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/status.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Стадия:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "stateCodeOptions"
                                    [value]="request?.stateCode"
                                    (onChange)="request.stateCode = $event.selected.value">
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/person_icon/source.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Источник:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'CALL', label: 'Входящий звонок'},
                                        {value: 'INTERNET', label: 'Интернет'},
                                        {value: 'PRINT', label: 'Печатное издание'},
                                        {value: 'PARTHER', label: 'Рассылка'},
                                        {value: 'CL_RECOMMEND', label: 'Рекомендация клиента'},
                                        {value: 'PAR_RECOMMEND', label: 'Рекомендация партнера'},
                                        {value: 'SOCIAL', label: 'Соц. сети'},
                                        {value: 'OTHER', label: 'Успешный опыт сотрудничества'}
                                    ]"
                                    [value]="'Партнер'"
                                    (onChange)="$event.selected.value">
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Ответственный</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "agentOpts"
                                    [value]="agent?.id"
                                    (onChange)="agentChanged($event)"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/date_start.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Запрос</span>
                                <input type="text" class="view-value edit-value" readonly [(ngModel)]="request.request">
                            </div>

                            <div class="header_col">Контакт</div>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">ФИО:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "personOpts"
                                    [value] = "person?.id"
                                    (onChange) = "personChanged($event)"
                                >
                                </ui-slidingMenu>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/phone.png)'"></div>
                            <div class="view-group multiselect" style='height: 30px;'>
                                <span class="view-label pull-left">Телефон:</span>
                                <div class="show_value">{{person?.phones[0] || " "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'MOBILE', label: 'Мобильный'},
                                        {value: 'HOME', label: 'Домашний'},
                                        {value: 'WORK', label: 'Рабочий'},
                                        {value: 'MAIN', label: 'Основной'},
                                        {value: 'FAKS', label: 'Факс'},
                                        {value: 'SAME', label: 'Другой'}
                                    ]"
                                    [masks] = "['+_ (___) ___-__-__',
                                                '+_ (____) __-__-__',
                                                '+_ (___) ___-__-__',
                                                '+_ (____) ___-___',
                                                '+_ (____) __-__-__']"
                                [values]="person?.phones"
                                [width]="'43%'"
                                (onChange)="$event.selected.value">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/email.png)'"></div>
                            <div class="view-group multiselect" style='height: 30px;'>
                                <span class="view-label pull-left">E-mail:</span>
                                <div class="show_value">{{person?.emails[0] || " "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'MOBILE', label: 'Рабочий'},
                                        {value: 'HOME', label: 'Основной'}
                                    ]"
                                    [masks] = "['', '']"
                                    [values]="person?.emails"
                                    [width]="'36%'"
                                    (onChange)="$event.selected.value">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/website.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'WEB-сайт:'" [value] = "person?.site"
                                    [width] = "'225px'" (onChange)= "$event">
                                </ui-input-line>
                                    <div class="pensil"></div>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/address.png)'"></div>
                            <div class="view-group multiselect" style='height: 30px;'>
                                <span class="view-label pull-left">Адрес:</span>
                                <div class="show_value">{{" "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'KRAY', label: 'Регион'},
                                        {value: 'CITY', label: 'Нас. пункт'},
                                        {value: 'DISTRICT', label: 'Район'},
                                        {value: 'STREET', label: 'Улица'},
                                        {value: 'HOUSE', label: 'Дом'},
                                        {value: 'HOUSING', label: 'Корпус'},
                                        {value: 'FLAT', label: 'Квартира'}
                                    ]"
                                    [masks] = "['','','','','','','']"
                                    [values]="[]"
                                    [width]="'36%'"
                                    (onChange)="$event.selected.value">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Тип контакта:</span>
                                <ui-slidingMenu class="view-value edit-value"
                                    [options] = "[
                                        {value: 'CLIENT', label: 'Клиент'},
                                        {value: 'KONK', label: 'Конкурент'},
                                        {value: 'OUR', label: 'Наша компания'},
                                        {value: 'PARTHER', label: 'Партнер'}
                                    ]"
                                    [value]="'Партнер'"
                                    (onChange)="$event.selected.value">
                                >
                                </ui-slidingMenu>
                            </div>

                            <div class="header_col">Контрагент</div>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/office.png)'"></div>
                            <div class="view-group multiselect" style='height: 30px;'>
                                <span class="view-label pull-left">Название:</span>
                                <div class="show_value">{{" " || " "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'OOO', label: 'ООО'},
                                        {value: 'ZAO', label: 'ЗАО'},
                                        {value: 'ZAO', label: 'АО'},
                                        {value: 'PAO', label: 'ПАО'},
                                        {value: 'IP', label: 'ИП'},
                                        {value: 'OAO', label: 'ОАО'}]"
                                    [masks] = "['', '', '', '', '']"
                                    [values]="[]"
                                    [width]="'36%'"
                                    (onChange)="$event.selected.value">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/address.png)'"></div>
                            <div class="view-group multiselect" style='height: 30px;'>
                                <span class="view-label pull-left">Адрес:</span>
                                <div class="show_value">{{" " || " "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'KRAY', label: 'Регион'},
                                        {value: 'CITY', label: 'Нас. пункт'},
                                        {value: 'DISTRICT', label: 'Район'},
                                        {value: 'STREET', label: 'Улица'},
                                        {value: 'HOUSE', label: 'Дом'},
                                        {value: 'HOUSING', label: 'Корпус'},
                                        {value: 'OFFICE', label: 'Офис'}
                                    ]"
                                    [masks] = "['','','','','','','']"
                                    [values]="[]"
                                    [width]="'36%'"
                                    (onChange)="$event.selected.value">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Руководитель:'" [value] = "organisation?.shef"
                                    [width] = "'225px'" (onChange)= "$event">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'Контактное лицо:'" [value] = "organisation?.contact"
                                    [width] = "'225px'" (onChange)= "$event">
                                </ui-input-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/phone.png)'"></div>
                            <div class="view-group multiselect" style='height: 30px;'>
                                <span class="view-label pull-left">Телефон:</span>
                                <div class="show_value">{{' ' || " "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'MOBILE', label: 'Мобильный'},
                                        {value: 'HOME', label: 'Домашний'},
                                        {value: 'WORK', label: 'Рабочий'},
                                        {value: 'MAIN', label: 'Основной'},
                                        {value: 'FAKS', label: 'Факс'},
                                        {value: 'SAME', label: 'Другой'}
                                    ]"
                                    [masks] = "['+_ (___) ___-__-__',
                                                '+_ (____) __-__-__',
                                                '+_ (___) ___-__-__',
                                                '+_ (____) ___-___',
                                                '+_ (____) __-__-__']"
                                [values]="[]"
                                [width]="'43%'"
                                (onChange)="$event.selected.value">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/email.png)'"></div>
                            <div class="view-group multiselect" style='height: 30px;'>
                                <span class="view-label pull-left">E-mail:</span>
                                <div class="show_value">{{" " || " "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                                <ui-multiselect class="view-value edit-value" style=""
                                    [options] = "[
                                        {value: 'MOBILE', label: 'Рабочий'},
                                        {value: 'HOME', label: 'Основной'}
                                    ]"
                                    [masks] = "['', '']"
                                    [values]="[]"
                                    [width]="'36%'"
                                    (onChange)="$event.selected.value">
                                </ui-multiselect>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/website.png)'"></div>
                            <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                                <ui-input-line [placeholder] = "'WEB-сайт:'" [value] = "organisation?.site"
                                    [width] = "'225px'" (onChange)= "$event">
                                </ui-input-line>
                            </div>

                            <div class="header_col">Дополнительная информация</div>
                            <div class="view-group" style="flex-wrap: wrap; height: 50px; margin-left: 20px;">
                                <textarea class="view-value text-value"
                                placeholder="" [(ngModel)]="request.info"
                                style="text-align: left;"></textarea>
                            </div>
                            <!--<div class="view-group">
                                <span class="view-label">Стадия</span>
                                <ui-select class="view-value edit-value"
                                    [options] = "stageCodeOptions"
                                    [value]="request?.stageCode"
                                    (onChange)="request.stageCode = $event.selected.value"
                                >
                                </ui-select>
                            </div>-->
                        </div>

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: КОНЕЦ -->
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->

                        <div class="view-block" [hidden]="editEnabled" style="margin: 10px 10px 10px 0px;">
                            <div class="header_col">Общее</div>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/date_start.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Дата заявки:</span>
                                <span class="view-value"> {{ request.changeDate | formatDate }} </span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/person_icon/category.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Тип:</span>
                                <span class="view-value"> {{ request.offerTypeCode }}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/status.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Стадия:</span>
                                <ui-view-value
                                    [options] = "stateCodeOptions"
                                    [value]="request.stateCode"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/person_icon/source.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Источник:</span>
                                <span class="view-value"> {{ 'Входящий звонок' }}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/post.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Ответственный:</span>
                                <span class="view-value"> {{ agent.name }} </span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/date_end.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Запрос</span>
                                <span class="view-value"> {{ request.request }}</span>
                            </div>

                            <div class="header_col">Контакт</div>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/post.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">ФИО:</span>
                                <span class="view-value">{{ person.name }}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/phone.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Телефон:</span>
                                <span class="view-value">{{ person.phones[0] || ''}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/email.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">E-mail:</span>
                                <span class="view-value">{{ person.emails[0] || ''}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/website.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Web-сайт:</span>
                                <span class="view-value">{{ person.phones[0] || ''}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/address.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Адрес:</span>
                                <span class="view-value">{{ person.address || ''}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/person_icon/category.png)'"></div>
                            <div class="view-group">
                                <span class="view-label">Тип контакта:</span>
                                <span class="view-value">{{ person.type || ''}}</span>
                            </div>

                            <div class="header_col">Контрагент</div>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/office.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Организация:</span>
                                <span class="view-value"></span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/address.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Адрес:</span>
                                <span class="view-value"></span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Руководитель:</span>
                                <span class="view-value"></span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Контактное лицо:</span>
                                <span class="view-value"></span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/phone.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Телефон:</span>
                                <span class="view-value"></span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/email.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">E-mail:</span>
                                <span class="view-value"></span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/website.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Web-сайт:</span>
                                <span class="view-value"></span>
                            </div>
                            <div class="header_col">Дополнительная информация</div>
                            <div class="view-group">
                                <span class="view-value" style="height: initial;"> {{ request.info }} </span>
                            </div>
                        </div>

                    <!-- РЕЖИМ ОТОБРАЖЕНИЯ: КОНЕЦ -->
                        <div class="header_col">Тэги</div>
                        <div style="margin: 0 0 20px 20px;">
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
                    [iconUrls]="['res/main_offers.png', 'res/request1.png', 'res/analitic.png']"
                    [iconUrls_active]="['res/main_offers_color.png', 'res/request1_color.png', 'res/analitic_color.png']"
                >
                    <ui-tab
                        [title]="'Главная'"
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
                this.tab.header = 'Запрос';
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
            this.paneWidth = 370;
        }
        this.mapWidth = document.body.clientWidth - (30) - this.paneWidth;
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
    showMenu(event){
        let parent: HTMLElement = (<HTMLElement>event.currentTarget).parentElement;
        let height: number = parent.getElementsByTagName('input').length * 35;
        if(parent.offsetHeight == 30){
            console.log(height);
            parent.style.setProperty('height', ""+(height+60)+'px');
            parent.style.setProperty('overflow', "visible");
             (<HTMLElement>event.currentTarget).style.setProperty('transform', 'rotate(180deg)');
        }
        else{
             parent.style.setProperty('height', "30px");
             parent.style.setProperty('overflow', "hidden");
              (<HTMLElement>event.currentTarget).style.setProperty('transform', 'rotate(0deg)')
        }
    }
}
