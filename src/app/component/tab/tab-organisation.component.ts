import {Component} from '@angular/core';

import {AnalysisService} from '../../service/analysis.service'
import {Tab} from '../../class/tab';
import {Offer} from '../../class/offer';
import {User} from '../../class/user';
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
import {SessionService} from "../../service/session.service";


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
            height: 30px;
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
        }

        .edit-value {
            width: 100%;
            text-align: right;
            color: #696969;
            font-size: 10pt;
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
            text-align: right;
            height: 30px;
            display: flex;
            flex-direction: column;
            width: 143px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .edit-block >hr, .view-block >hr{
                margin: 5px -10px 5px 55px;
        }

        .show_value > span:first-child{
            height: 10px;
            font-size: 8pt;
        }
        .show_value > span:last-child{
            font-size: 10pt;
            color: #959595;
        }

        .arrow{
            background-image: url(assets/arrow.png);
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
            background-image: url(assets/star_rate.png);
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
            width: 280px;
            position: relative;
            display: block;
            margin-right: 15px;
            overflow: hidden;
        }

        .multiply{
            position: relative;
            display: block;
            height: 30px;
            width: 280px;
            margin-right: 15px;
            margin-left: 0;
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
                <div class="header" [style.border-bottom-color]="'#8F5128'">
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
                        <div class='view_icon' [style.background-image]="'url(assets/person_icon/category.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Тип:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "[
                                    {value: 'NOT', label: 'Не указан'},
                                    {value: 'CLIENT', label: 'Клиент'},
                                    {value: 'KONK', label: 'Конкурент'},
                                    {value: 'OUR', label: 'Наша компания'},
                                    {value: 'PARTHER', label: 'Партнер'}
                                ]"
                                [value]="organisation.typeCode_n"
                                (onChange)="organisation.typeCode_n = $event.selected.value">
                            >
                            </ui-slidingMenu>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/office.png)'"></div>
                        <div class="view-group multiselect" style='height: 30px;'>
                            <span class="view-label pull-left">Название:</span>
                            <div class="show_value">
                                {{" "}}
                            </div><div class='arrow' (click)="showMenu($event)"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'OOO', label: 'ООО'},
                                    {value: 'ZAO', label: 'ЗАО'},
                                    {value: 'AO', label: 'АО'},
                                    {value: 'PAO', label: 'ПАО'},
                                    {value: 'IP', label: 'ИП'},
                                    {value: 'OAO', label: 'ОАО'}]"
                                [masks] = "['', '', '', '', '']"
                                [values]="orgNameArray"
                                [width]="'36%'"
                                (onChange)="parseArray($event, orgNameArray)">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                        <div class="view-group multiselect" style='height: 30px;'>
                            <ui-input-line [placeholder] = "'Адрес:'" [value] = "addressStr"
                                [width] = "'225px'" (onChange)= "parseArray($event, orgAddress, true)" [queryTipe]="'address'" (clicked)="showMenu($event)">
                            </ui-input-line>
                            <div class='arrow' (click)="showMenu($event)" *ngIf="orgAddress[0] && orgAddress[0].value !== undefined"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'KRAY', label: 'Регион'},
                                    {value: 'CITY', label: 'Нас. пункт'},
                                    {value: 'DISTRICT', label: 'Район'},
                                    {value: 'STREET', label: 'Улица'},
                                    {value: 'HOUSE', label: 'Дом'},
                                    {value: 'HOUSING', label: 'Корпус'},
                                    {value: 'FLAT', label: 'Офис'}
                                ]"
                                [masks] = "['','','','','','','']"
                                [values]="orgAddress"
                                [width]="'36%'"
                                (onChange)="parseArray($event, orgAddress, true)">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/phone.png)'"></div>
                        <div class="view-group multiply">
                            <span class="view-label pull-left">Телефоны:</span>
                            <div class="show_value">{{" "}}</div>
                            <div class='arrow' (click)="showMenu($event)"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'MOBILE', label: 'Мобильный'},
                                    {value: 'HOME', label: 'Домашний'},
                                    {value: 'WORK', label: 'Рабочий'},
                                    {value: 'MAIN', label: 'Основной'},
                                    {value: 'SAME', label: 'Другой'}
                                ]"
                                [masks] = "['+_ (___) ___-__-__',
                                            '+_ (____) __-__-__',
                                            '+_ (___) ___-__-__',
                                            '+_ (____) ___-___',
                                            '+_ (____) __-__-__']"
                                [values]="orgPhone"
                                [width]="'43%'"
                                (onChange)="parseArray($event, orgPhone)">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/email.png)'"></div>
                        <div class="view-group multiply">
                            <span class="view-label pull-left">E-mail:</span>
                            <div class="show_value">{{" "}}</div>
                            <div class='arrow' (click)="showMenu($event)"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'WORK', label: 'Рабочий'},
                                    {value: 'MAIN', label: 'Личный'}
                                    ]"
                                [masks] = "['', '']"
                                [values]="orgEmail"
                                [width]="'36%'"
                                (onChange)="parseArray($event, orgEmail)">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/website.png)'"></div>
                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                            <ui-input-line [placeholder] = "'WEB-сайт:'" [value] = "organisation.webSite_n"
                                [width] = "'225px'" (onChange)= "organisation.webSite_n = $event">
                            </ui-input-line>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/person_icon/requisites.png)'"></div>
                        <div class="view-group multiselect" style='height: 30px;'>
                            <span class="view-label pull-left">Реквизиты:</span>
                            <div class="show_value">{{" "}}</div><div class='arrow' (click)="showMenu($event)"></div>
                            <ui-multiselect class="view-value edit-value" style=""
                                [options] = "[
                                    {value: 'INN', label: 'ИНН'},
                                    {value: 'KPP', label: 'КПП'},
                                    {value: 'KS', label: 'Кор.счет'},
                                    {value: 'BIK', label: 'БИК'},
                                    {value: 'OTHER', label: 'Другое'}]"
                                [masks] = "['', '', '', '', '']"
                                [values]="orgRequisit"
                                [width]="'36%'"
                                (onChange)="parseArray($event, orgRequisit)">
                            </ui-multiselect>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                        <div class="view-group" style='position: relative; display: block;'>
                            <ui-input-line [placeholder] = "'Руководитель:'" [value] = "organisation.head_n?.name"
                                [width] = "'225px'" (onChange)= "organisation.head_n = $event" [queryTipe]="'person'">
                            </ui-input-line>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                        <div class="view-group" style='position: relative; display: block;'>
                            <ui-input-line [placeholder] = "'Контактное лицо:'" [value] = "organisation.contact_n?.name"
                                [width] = "'225px'" (onChange)= "organisation.contact_n = $event" [queryTipe]="'person'">
                            </ui-input-line>
                        </div>

                        <div class="header_col">Сопроводительная информация</div>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Ответственный:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "agentOpts"
                                [value]="agent?.id"
                                (onChange)="agentChanged($event)"
                            >
                            </ui-slidingMenu>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/person_icon/contract.png)'"></div>
                        <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                            <ui-input-line [placeholder] = "'Договор № от'" [value] = "organisation.contract_n"
                                    [width] = "'225px'" (onChange)= "organisation.contract_n = $event">
                            </ui-input-line>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/user_icon/status.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Состояние:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "[
                                    {value: 'NOT', label: 'Не указано'},
                                    {value: 'ACTIVE', label: 'Активно'},
                                    {value: 'NOT_ACTIVE', label: 'Не активно'},
                                    {value: 'ARCHIVE', label: 'Архив'}
                                ]"
                                [value]="organisation.stateCode_n"
                                (onChange)="organisation.stateCode_n = $event.selected.value">
                            >
                            </ui-slidingMenu>
                        </div>
                        <hr>
                        <div class='view_icon' [style.background-image]="'url(assets/person_icon/source.png)'"></div>
                        <div class="view-group">
                            <span class="view-label pull-left">Источник:</span>
                            <ui-slidingMenu class="view-value edit-value"
                                [options] = "[
                                    {value: 'NOT', label: 'Не указан'},
                                    {value: 'input', label: 'Входящий звонок'},
                                    {value: 'internet', label: 'Интернет'},
                                    {value: 'print', label: 'Печатное издание'},
                                    {value: 'spam', label: 'Рассылка'},
                                    {value: 'reccomend_cl', label: 'Рекомендация клиента'},
                                    {value: 'reccomend_pt', label: 'Рекомендация парнера'},
                                    {value: 'social', label: 'Социальные сети'},
                                    {value: 'excelent', label: 'Успешный опыт сотрудничества'},
                                    {value: 'cold', label: 'Холодная база'}
                                ]"
                                [value]="organisation.sourceCode_n"
                                (onChange)="organisation.sourceCode_n = $event.selected.value">
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
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/category.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Тип:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указан'},
                                        {value: 'CLIENT', label: 'Клиент'},
                                        {value: 'KONK', label: 'Конкурент'},
                                        {value: 'OUR', label: 'Наша компания'},
                                        {value: 'PARTHER', label: 'Партнер'}
                                    ]"
                                    [value]="organisation.typeCode_n"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/office.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Название:</span>
                                <span class="view-value"> {{getTypeName(organisation.orgName_n)}}
                                     &laquo;{{ organisation.name }}&raquo;
                                </span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/address.png)'"></div>
                            <div class="view-group">
                                <ui-view-line
                                    [placeholder]= "'Адрес:'" [value]="addressStr"
                                >
                                </ui-view-line>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/phone.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Телефон:</span>
                                <ui-multi-view
                                    [options] = "[
                                        {value: 'MOBILE', label: 'Мобильный'},
                                        {value: 'HOME', label: 'Домашний'},
                                        {value: 'WORK', label: 'Рабочий'},
                                        {value: 'MAIN', label: 'Основной'},
                                        {value: 'SAME', label: 'Другой'}
                                    ]"
                                    [values] = "[
                                        {type: getDateUser(orgPhone).type, value: getDateUser(orgPhone).value}
                                    ]"
                                >
                                </ui-multi-view>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/email.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">E-mail:</span>
                                <ui-multi-view
                                    [options] = "[
                                        {value: 'WORK', label: 'Рабочий'},
                                        {value: 'MAIN', label: 'Личный'}
                                        ]"
                                    [values] = "[
                                        {type: getDateUser(orgEmail).type, value: getDateUser(orgEmail).value}
                                    ]"
                                >
                                </ui-multi-view>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/website.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">WEB-сайт:</span>
                                <span class="view-value"> <a [href]="'http://'+organisation.webSite_n" target="_blank">{{organisation.webSite_n}}</a></span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/requisites.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Реквизиты:</span>
                                <span class="view-value"> {{"ИНН: "+ (organisation.inn_n === undefined ? " ": organisation.inn_n) + "; КПП: " + organisation.kpp_n}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Руководитель:</span>
                                <span class="view-value">{{organisation.head_n?.name}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Контактное лицо:</span>
                                <span class="view-value">{{organisation.contact_n?.name}}</span>
                            </div>

                            <div class="header_col">Сопроводительная информация</div>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Ответственный:</span>
                                <span class="view-value"> </span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/contract.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Договор:</span>
                                <span class="view-value">{{organisation.contract_n}}</span>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/user_icon/status.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Состояние:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указано'},
                                        {value: 'ACTIVE', label: 'Активно'},
                                        {value: 'NOT_ACTIVE', label: 'Не активно'},
                                        {value: 'ARCHIVE', label: 'Архив'}
                                    ]"
                                    [value]="organisation.stateCode_n"
                                >
                                </ui-view-value>
                            </div>
                            <hr>
                            <div class='view_icon' [style.background-image]="'url(assets/person_icon/source.png)'"></div>
                            <div class="view-group">
                                <span class="view-label pull-left">Источник:</span>
                                <ui-view-value
                                    [options] = "[
                                        {value: 'NOT', label: 'Не указан'},
                                        {value: 'input', label: 'Входящий звонок'},
                                        {value: 'internet', label: 'Интернет'},
                                        {value: 'print', label: 'Печатное издание'},
                                        {value: 'spam', label: 'Рассылка'},
                                        {value: 'reccomend_cl', label: 'Рекомендация клиента'},
                                        {value: 'reccomend_pt', label: 'Рекомендация парнера'},
                                        {value: 'social', label: 'Социальные сети'},
                                        {value: 'excelent', label: 'Успешный опыт сотрудничества'},
                                        {value: 'cold', label: 'Холодная база'}
                                    ]"
                                    [value]="organisation.sourceCode_n"
                                >
                                </ui-view-value>
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
                    [iconUrls]="['assets/main_offers.png', 'assets/base.png', 'assets/base_plus.png']"
                    [iconUrls_active]="['assets/main_offers_color.png', 'assets/base_color.png', 'assets/base_plus_color.png']"
                    [color]="'#8F5128'"
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

    getDateUser = User.getData;

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

    orgNameArray: Array<any> = [];
    orgRequisit: Array<any> = [];
    orgEmail: Array<any> = [];
    orgPhone: Array<any> = [];
    orgAddress: Array<any> = [];

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
    addressStr: string = '';

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
                private _organisationService: OrganisationService,
                private _sessionService: SessionService
    ) {
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

        this.updateArrays();

        var c = this._configService.getConfig();
        let loc = this._sessionService.getAccount().location;

        if (c.map[loc]) {
           this.lat = c.map[loc].lat;
           this.lon = c.map[loc].lon;
           this.zoom = c.map[loc].zoom;
        } else {
           this.lat = c.map['default'].lat;
           this.lon = c.map['default'].lon;
           this.zoom = c.map['default'].zoom;
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
        this.organisation.name = this.orgNameArray[0].value;
        this.organisation.orgName_n = this.orgNameArray[0].type;
        let tem = this.getIndex(this.orgPhone, "MOBILE");
        this.organisation.cellPhone_n =  tem > -1 ? this.orgPhone[tem].value : null;
        tem =  this.getIndex(this.orgPhone, "HOME");
        this.organisation.homePhone_n =  tem > -1 ? this.orgPhone[tem].value : null;
        tem = this.getIndex(this.orgPhone, "WORK");
        this.organisation.officePhone_n =  tem > -1 ? this.orgPhone[tem].value : null;
        tem = this.getIndex(this.orgPhone, "MAIN");
        this.organisation.mainPhone_n =  tem > -1 ? this.orgPhone[tem].value : null;
        tem = this.getIndex(this.orgPhone, "SAME");
        this.organisation.otherPhone_n =  tem > -1 ? this.orgPhone[tem].value : null;
        tem = this.getIndex(this.orgPhone, "FAX");
        this.organisation.fax_n =  tem > -1 ? this.orgPhone[tem].value : null;

        tem = this.getIndex(this.orgAddress, "KRAY");
        this.organisation.region_n =  tem > -1 ? this.orgAddress[tem].value : undefined;
        tem = this.getIndex(this.orgAddress, "CITY");
        this.organisation.city_n =  tem > -1 ? this.orgAddress[tem].value : undefined;
        tem = this.getIndex(this.orgAddress, "DISTRICT");
        this.organisation.area_n =  tem > -1 ? this.orgAddress[tem].value : undefined;
        tem = this.getIndex(this.orgAddress, "STREET");
        this.organisation.street_n =  tem > -1 ? this.orgAddress[tem].value : undefined;
        tem = this.getIndex(this.orgAddress, "HOUSE");
        this.organisation.house_n =  tem > -1 ? this.orgAddress[tem].value : undefined;
        tem = this.getIndex(this.orgAddress, "HOUSING");
        this.organisation.housing_n =  tem > -1 ? this.orgAddress[tem].value : undefined;
        tem = this.getIndex(this.orgAddress, "FLAT");
        this.organisation.apartment_n =  tem > -1 ? this.orgAddress[tem].value : undefined;

        tem =  this.getIndex(this.orgEmail, "MAIN");
        this.organisation.mainEmail_n =  tem > -1 ? this.orgEmail[tem].value : null;
        tem = this.getIndex(this.orgEmail, "WORK");
        this.organisation.workEmail_n =  tem > -1 ? this.orgEmail[tem].value : null;

        tem = this.getIndex(this.orgRequisit, "INN");
        this.organisation.inn_n =  tem > -1 ? this.orgRequisit[tem].value : null;
        tem = this.getIndex(this.orgRequisit, "KPP");
        this.organisation.kpp_n =  tem > -1 ? this.orgRequisit[tem].value : null;
        tem = this.getIndex(this.orgRequisit, "KS");
        this.organisation.cor_n =  tem > -1 ? this.orgRequisit[tem].value : null;
        tem = this.getIndex(this.orgRequisit, "BIK");
        this.organisation.bic_n =  tem > -1 ? this.orgRequisit[tem].value : null;
        tem = this.getIndex(this.orgRequisit, "OTHER");
        this.organisation.other_n =  tem > -1 ? this.orgRequisit[tem].value : null;

        this._organisationService.save(this.organisation).subscribe(org => {
            setTimeout(() => {
                this.organisation = org;
            });
        });
        this.toggleEdit();

        setTimeout(()=> {
            this.updateArrays();
        },1000);
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

    agentChanged(e) {
        /*this.organisation.agentId = e.selected.value;
        if (this.organisation.agentId != null) {
            this._userService.get(this.organisation.agentId).subscribe(agent => {
                this.organisation.agent = agent;
            });
        }*/
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

    parseArray(values: Array<any>, obj, isAddress?: boolean){
        for(let val of values){
            let no = true;
            for(let en of obj){
                if(val.type == en.type){
                    en.value = val.value;
                    no = false;
                }
            }
            if(no && val.value)
                obj.push(val);
        }
        for(let i=0 ; i< obj.length; ++i){
            if(obj[i].value === undefined || obj[i].value === null){
                obj.splice(i,1);
                i--;
            }
        }
        if(isAddress){
            this.getAddressStr();
        }

    }

    getIndex(array: Array<any>, str: string){
        for(let i =0; i<array.length; ++i){
            if(array[i].type == str)
                return i;
        }
        return -1;
    }

    getTypeName(type){
        switch(type){
            case "OOO": return "ООО";
            case "ZAO": return "ЗАО";
            case "AO": return "АО";
            case "PAO": return "ПАО";
            case "IP": return "ИП";
            case "OAO": return "ОАО";
            default: return "";
        }
    }

    getAddressStr(){
            this.addressStr = this.organisation.city_n !== undefined ? ""+this.organisation.city_n : '';
            this.addressStr += this.organisation.street_n !== undefined ? ", " + this.organisation.street_n : '';
            this.addressStr += this.organisation.house_n !== undefined ? ", " + this.organisation.house_n : '';
            if(this.orgAddress.length == 0)
                this.addressStr = '';
    }

    updateArrays(){
        this.orgNameArray = [{type: this.organisation.orgName_n, value: this.organisation.name}];
        this.orgRequisit =[
            {type: "INN", value: this.organisation.inn_n},
            {type: "KPP", value: this.organisation.kpp_n},
            {type: "KS", value: this.organisation.cor_n},
            {type: "BIK", value: this.organisation.bic_n},
            {type: "OTHER", value: this.organisation.other_n}
        ];
        this.orgAddress=[
            {type: 'KRAY', value: this.organisation.region_n},
            {type: 'CITY', value: this.organisation.city_n},
            {type: 'DISTRICT', value: this.organisation.area_n},
            {type: 'STREET', value: this.organisation.street_n},
            {type: 'HOUSE', value: this.organisation.house_n},
            {type: 'HOUSING', value: this.organisation.housing_n},
            {type: 'FLAT', value: this.organisation.apartment_n}
        ];

        this.getAddressStr();

        this.orgPhone=[
            {type: 'MOBILE', value:  this.organisation.cellPhone_n},
            {type: 'HOME', value:  this.organisation.homePhone_n},
            {type: 'WORK', value: this.organisation.officePhone_n},
            {type: 'MAIN', value:  this.organisation.mainPhone_n},
            {type: 'SAME', value:  this.organisation.otherPhone_n},
            {type: 'FAX', value:  this.organisation.fax_n}
        ];
        this.orgEmail=[
            {type: 'WORK', value:  this.organisation.workEmail_n},
            {type: 'MAIN', value:  this.organisation.mainEmail_n}
        ];

        this.getAddressStr();
    }
}
