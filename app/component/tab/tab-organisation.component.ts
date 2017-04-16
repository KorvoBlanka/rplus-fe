import {Component} from '@angular/core';

import {AnalysisService} from '../../service/analysis.service'
import {Tab} from '../../class/tab';
import {Offer} from '../../class/offer';
import {Person} from '../../class/person';
import {Organisation} from '../../class/organisation';
import {Request} from '../../class/request';
import {Task} from '../../class/task';
import {HistoryRecord} from '../../class/historyRecord';

import {HubService} from '../../service/hub.service';
import {ConfigService} from '../../service/config.service';
import {UserService} from '../../service/user.service';
import {OrganisationService} from '../../service/organisation.service';
import {TaskService} from '../../service/task.service';
import {HistoryService} from '../../service/history.service'
import {OfferService} from '../../service/offer.service';
import {PersonService} from '../../service/person.service';


import {Observable} from 'rxjs/Observable';


@Component({
    selector: 'tab-organisation',
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

        .request-prop {
            overflow-y: scroll;
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
            margin-left: 57px;
        }

        .show_value{
            flex: 0 0 190px;
            margin-right: 30px;
            position: relative;
            margin-top: 5px;
            text-align: right;
            height: 30px;
            font-size: 11pt;
            color: #696969;
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
            margin-top: 25px;
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

        .multiselect{
            width: 287px;
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

        <div class="organisation" (window:resize)="onResize($event)">

        <!-- ЛЕВАЯ СТВОРКА: НАЧАЛО -->

            <div class="pane" [hidden]="paneHidden" [style.width.px]="paneWidth">
                <div class="header">
                    <div class="header-label">{{ tab.header }}</div>
                </div>
                <div style="overflow: scroll; overflow-x: hidden; height: calc(100% - 111px);
                        border-right: 1px solid #cccccc;">
                        <div class = "person_face">
                    <img src="">
                    <div class="view-group" *ngIf="!editEnabled" style="flex-wrap: wrap;margin-top: -1px;">
                        <div class="view-value name" style="text-transform: uppercase;"> {{ organisation.name }}</div>
                        <div class="view-value name" style="font-size: 14pt; margin-top: 3px;"> {{ organisation.name}}</div>
                    </div>
                    <div class="view-group" *ngIf="editEnabled">
                        <input type="text" class="view-value edit-value name" [(ngModel)]="organisation.name">
                        <div class="pensil" style="position: relative; margin-right: 35px;"></div>
                    </div>
                    <div class="rate"></div>
                </div>
                <!--<div class="pull-container">
                    <div class="font-sz-2 pull-left">Источник: ???<span class="color-g1"><a href="" target="_blank"></a></span></div>
                    <div class="font-sz-1 color-g2 pull-right"> {{ organisation.add_date | formatDate }} </div>
                </div>
                <hr>-->
                <div class="pull-container" style="margin: 20px 10px 0px;">
                    <div class="pull-right" [hidden]="editEnabled" (click)="toggleEdit()"><a href="#" >Изменить</a></div>
                    <div class="pull-right" [hidden]="!editEnabled" (click)="save()"><a href="#" >Готово</a></div>
                </div>
                <div class="organisation-prop" [style.height]="paneHeight">

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: НАЧАЛО -->

                    <div class="edit-block" [hidden]="!editEnabled" style="margin: 10px 10px 10px 0px">
                        <div class="header_col">Общая информация</div>
                        <div class='view_icon' [style.background-image]="'url(res/user_icon/office.png)'"></div>
                        <div class="view-group multiselect" style='height: 30px;'>
                            <span class="view-label pull-left">Название:</span>
                            <div class="show_value">{{organisation.name || " "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'OOO', label: 'ООО'},
                                    {value: 'ZAO', label: 'ЗАО'},
                                    {value: 'ZAO', label: 'АО'},
                                    {value: 'PAO', label: 'ПАО'},
                                    {value: 'IP', label: 'ИП'},
                                    {value: 'OAO', label: 'ОАО'}]"
                                [masks] = "['', '', '', '', '']"
                                [values]="[organisation.name]"
                                [width]="'36%'"
                                (onChange)="organisation.name = $event.selected.value">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(res/person_icon/category.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Тип:</span>
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
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(res/person_icon/requisites.png)'"></div>
                        <div class="view-group multiselect" style='height: 30px;'>
                            <span class="view-label pull-left">Реквизиты:</span>
                            <div class="show_value">{{'Показать...' || " "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'INN', label: 'ИНН'},
                                    {value: 'KPP', label: 'КПП'},
                                    {value: 'KS', label: 'Кор.счет'},
                                    {value: 'BIK', label: 'БИК'},
                                    {value: 'OTHER', label: 'Другое'}]"
                                [masks] = "['', '', '', '', '']"
                                [values]="['555555555']"
                                [width]="'36%'"
                                (onChange)="$event.selected.value">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                            <ui-input-line [placeholder] = "'Руководитель:'" [value] = ""
                                [width] = "'225px'" (onChange)= "user.date = $event">
                            </ui-input-line>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(res/person_icon/source.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Источник:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "[
                                    {value: 'CLIENT', label: 'Входящий звонок'},
                                    {value: 'KONK', label: 'Интернет'},
                                    {value: 'OUR', label: 'Печатное издание'},
                                    {value: 'OUR', label: 'Рекомендация клиента'},
                                    {value: 'OUR', label: 'Рекомендация партнера'},
                                    {value: 'OUR', label: 'Соц. сети'},
                                    {value: 'OUR', label: 'Успешный опыт сотрудничества'},
                                    {value: 'PARTHER', label: 'Рассылка'}
                                ]"
                                [value]="'Партнер'"
                                (onChange)="$event.selected.value">
                            >
                            </ui-slidingMenu>
                        </div>
                        <div class="header_col">Контакты</div>
                        <div class='view_icon' [style.background-image]="'url(res/user_icon/phone.png)'"></div>
                        <div class="view-group multiselect" style='height: 30px;'>
                            <span class="view-label pull-left">Телефон:</span>
                            <div class="show_value">{{'+7 (914) 123-45-67' || " "}}</div><div class='arrow' (click)="showMenu($event)"></div>
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
                            [values]="['+7 (914) 123-45-67']"
                            [width]="'43%'"
                            (onChange)="$event.selected.value">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(res/user_icon/email.png)'"></div>
                        <div class="view-group multiselect" style='height: 30px;'>
                            <span class="view-label pull-left">E-mail:</span>
                            <div class="show_value">{{'123@mail.ru' || " "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'MOBILE', label: 'Рабочий'},
                                    {value: 'HOME', label: 'Основной'}
                                ]"
                                [masks] = "['', '']"
                                [values]="['123@mail.ru']"
                                [width]="'36%'"
                                (onChange)="$event.selected.value">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(res/user_icon/website.png)'"></div>
                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                            <ui-input-line [placeholder] = "'WEB-сайт:'" [value] = "'www.google.ru'"
                                [width] = "'225px'" (onChange)= "$event">
                            </ui-input-line>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                            <ui-input-line [placeholder] = "'Контактное лицо:'" [value] = "'Петров Иван'"
                                [width] = "'225px'" (onChange)= "$event">
                            </ui-input-line>
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
                        <div class="header_col">Взаимодействие</div>
                        <div class='view_icon' [style.background-image]="'url(res/person_icon/contract.png)'"></div>
                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                            <ui-input-line [placeholder] = "'Договор № от'" [value] = "''"
                                    [width] = "'225px'" (onChange)= "$event">
                            </ui-input-line>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(res/user_icon/status.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Статус:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "[
                                    {value: 'ACTIVE', label: 'Активно'},
                                    {value: 'NOT_ACTIVE', label: 'Не активно'},
                                    {value: 'ARCHIVE', label: 'Архив'}
                                ]"
                                [value]="'Архив'"
                                (onChange)="$event.selected.value">
                            >
                            </ui-slidingMenu>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Ответственный:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "agentOpts"
                                [value]="agent?.id"
                                (onChange)="agentChanged($event)"
                            >
                            </ui-slidingMenu>
                        </div>

                        <div class="header_col">Дополнительная информация</div>
                        <div class="view-group" style="flex-wrap: wrap; height: 50px; margin-left: 20px;">
                            <textarea class="view-value text-value"
                            placeholder="" [(ngModel)]="organisation.description"
                            style="text-align: left;"></textarea>
                        </div>
                    </div>

                        <!-- РЕЖИМ РЕДАКТИРОВАНИЯ: КОНЕЦ -->
                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: НАЧАЛО -->

                        <div class="view-block" [hidden]="editEnabled" style="margin: 10px 10px 10px 0px;">
                            <div class="header_col">Общая информация</div>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/office.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Название:</span>
                                <span class="view-value"> {{ organisation.name }}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/person_icon/category.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Тип:</span>
                                <span class="view-value"> Партнер</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/person_icon/requisites.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Реквизиты:</span>
                                <span class="view-value"> ИНН: 423552...</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Руководитель:</span>
                                <span class="view-value"> Завьявлов Дмит ...</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/person_icon/source.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Источник:</span>
                                <span class="view-value"> Соц. сети</span>
                            </div>
                            <div class="header_col">Контакты</div>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/phone.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Телефон:</span>
                                <div class="array-container">
                                    <div style="display: flex; flex-direction: column; height: 32px; margin-right: 15px;
                                        margin-top: -5px; color: dimgrey;">
                                        <span style="font-size: 8pt; color: #c0c0c0;">Сотовый</span>
                                        <span style="margin-top: -3px;">+7 (999) 888-66-66</span>
                                    </div>
                                    <!--<span *ngFor="let phone of user.phones" class="view-value"> {{ phone }} </span>-->
                                </div>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/email.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">E-mail:</span>
                                <div class="array-container">
                                    <div style="display: flex; flex-direction: column; height: 32px; margin-right: 15px;
                                        margin-top: -5px; color: dimgrey;">
                                        <span style="font-size: 8pt; color: #c0c0c0;">Основной</span>
                                        <span style="margin-top: -3px;">123@mail.ru</span>
                                    </div>
                                    <!--<span *ngFor="let phone of user.phones" class="view-value"> {{ phone }} </span>-->
                                </div>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/website.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">WEB-сайт:</span>
                                <span class="view-value"> www.google.ru</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Контактное лицо:</span>
                                <span class="view-value"> Петров Иван</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/address.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Адрес:</span>
                                <span class="view-value"> {{ organisation.address }}</span>
                            </div>

                            <div class="header_col">Взаимодействие</div>
                            <div class='view_icon' [style.background-image]="'url(res/person_icon/contract.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Договор:</span>
                                <span class="view-value">Отсутствует</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/status.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Состояние:</span>
                                <span class="view-value">Активно</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(res/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Ответственный:</span>
                                <span class="view-value"> </span>
                            </div>

                            <div class="header_col">Дополнительная информация</div>
                            <div class="view-group">
                                <span class="view-value" style="height: initial;"> {{ organisation.description }} </span>
                            </div>
                        </div>

                        <!-- РЕЖИМ ОТОБРАЖЕНИЯ: КОНЕЦ -->
                        <div class="header_col">Тэги</div>
                        <div style="margin: 0 0 20px 20px;">
                            <ui-tag-block
                                [value] = "organisation.tag"
                                (valueChange) = "organisation.tag = $event.value"
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
                    [iconUrls]="['res/main_offers.png', 'res/base.png', 'res/base_plus.png']"
                    [iconUrls_active]="['res/main_offers_color.png', 'res/base_color.png', 'res/base_plus_color.png']"
                >
                    <ui-tab
                      [title]="'Главная'"
                      (tabSelect)="personsSelected()"

                    >
                        <div class="" style="margin-top: 25px; max-width: 915px; overflow-y: scroll;" [style.height]="paneHeight">
                            <div class="button" (click)="addContact()">Добавить контакт</div>
                            <digest-person *ngFor="let p of persons | async"
                                [person]="p"
                            >
                            </digest-person>
                        </div>
                    </ui-tab>
                    <ui-tab
                        [title]="'Заявки'"
                        (tabSelect)="offersSelected()"
                    >

                        <!-- сильное колдунство, св-во right получаем из HubService -->
                        <!-- TODO: сделать это отдельным компонентом -->
                        <div  style="position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;" [style.right]="_hubService.shared_var['nb_width']">
                            <div style="width: 330px; background-color: #fff;">
                                <div class="header">
                                    <input type="text" style="width: 280px; margin-left: 10px; border: none;"
                                        (keydown)="offerSearchKeydown($event)"
                                    >
                                    <span class="icon-search" style="margin-left: 10px; cursor: pointer;"
                                        (click)="offerSearch()"
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
                            [polygone_points]="searchArea"
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

                    <!--<ui-tab
                        [title]="'История'"
                        (tabSelect)="historySelected()"
                        >
                        <div class="" style="max-width: 910px; overflow-y: scroll;" [style.height]="paneHeight">
                            <digest-history *ngFor="let record of historyRecs"
                                [historyRecord]="record"
                            >
                            </digest-history>
                        </div>
                    </ui-tab>-->
                </ui-tabs>
            </div>
            <!-- РАБОЧАЯ ОБЛАСТЬ: КОНЕЦ -->
        </div>
    `
})

export class TabOrganisationComponent {
    public tab: Tab;
    public organisation: Organisation;

    persons: Observable<Person[]>;
    offers: Offer[];

    agentOpts: any[] = [];

    historyRecs: HistoryRecord[];

    newRequest: boolean = false;
    editEnabled: boolean = false;

    paneHidden: boolean = false;
    paneHeight: number;
    paneWidth: number;
    mapWidth: number;


    lat: number = 48.480007;
    lon: number = 135.054954;
    zoom: number = 16;

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
                private _userService: UserService,
                private _offerService: OfferService,
                private _taskService: TaskService,
                private _analysisService: AnalysisService,
                private _historyService: HistoryService,
                private _personService: PersonService,
                private _organisationService: OrganisationService) {
        setTimeout(() => {
            this.tab.header = 'Контрагент'
        });

        _userService.list(null, null, "").subscribe(agents => {
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
        this.organisation = this.tab.args.organisation;
        if (this.organisation.id == null) {
            this.toggleEdit();
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
        this.mapWidth = document.body.clientWidth - (31) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 31;
    }

    toggleLeftPane() {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    }

    toggleEdit() {
        this.editEnabled = !this.editEnabled;
    }

    save() {

        this._organisationService.save(this.organisation).subscribe(org => {
            this.organisation = org;
        });

        this.toggleEdit();
    }

    offersSelected() {
        //this.getOffers(1, 16);
    }

    personsSelected() {
        this.getPersons(0, 32);
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

    getPersons(page, perPage) {
        if (this.organisation.id) {
            this._personService.list(null, this.organisation.id, "");
        }
    }

    getOffers(page, per_page) {
        //this._offerService.getSimilarOffer(page, per_page);
    }

    offerSearch() {
        //this.getOffers(Math.floor(Math.random() * 4), 16);
    }

    offerSearchKeydown(e: KeyboardEvent) {
        if (e.keyCode == 13) {
            this.offerSearch();
        }
    }

    markerClick(r: Offer) {
        //r.selected = !r.selected;
        // scroll to object ???
    }

    addContact() {
        var tab_sys = this._hubService.getProperty('tab_sys');
        var p = new Person();
        p.organisationId = this.organisation.id;
        tab_sys.addTab('person', {person: p});
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
