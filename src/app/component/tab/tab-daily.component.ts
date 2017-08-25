import {Component, OnInit, AfterViewInit, trigger, state, style, transition, animate } from '@angular/core';

import {FormatDatePipe} from '../../pipe/format-date.pipe';
import * as moment from 'moment/moment';
import 'moment/locale/ru.js';

import {Tab} from '../../class/tab';
import {User} from '../../entity/user';
import {Offer} from '../../entity/offer';
import {Person} from '../../entity/person';
import {Organisation} from '../../entity/organisation';
import {Request} from '../../entity/request';
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
import {NotebookService} from "../../service/notebook.service";
import { Subscription }   from 'rxjs/Subscription';

@Component({
    selector: 'tab-daily',
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
            background-color: #bcbfc1;
            color: #807982;
            border: 2px solid #bcbfc1;
        }

        .button_active, .button:hover{
            border-color: #1061c4;
            background-color: #1061c4;
        }

        .underline{
            border: 2px solid;
            color: #f0a30a;
            background-color: #f0a30a;
            position: relative;
            top: -2;
            width: 100vw;
            margin-bottom: 0;
        }

        .work_list{
            width: 100%;
            height: calc(100% - 117px);
            overflow: hidden;
        }

        .work_list > .central_panel{
            float: right;
            width: 100%;
            height: 100%;
        }

        .work_list > .central_panel > .head{
            width: 100%;
            height: 90px;
            padding-left: 20px;
        }

        .head > .today_day{
            text-transform: uppercase;
            width: 200px;
            height: 30px;
            line-height: 30px;
            font-size: 21px;
            color: #676767;
            padding-top: 30px;
        }

        .head > .today_day > span:last-child{
            font-size: 27px;
            font-weight: lighter;
        }

        .head > .today_button{
            font-size: 11px;
            color: silver;
            cursor: hand;
            text-transform: uppercase;
            width: 55px;
        }

        .dailytable{
            width: 100%;
            height: calc(100% - 90px);
        }


        table{
            border-spacing: 0;
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
        }

        td{
            margin: 0;
            padding: 0;
        }

        thead{
            overflow: hidden;
            display: block;
            width: calc(100% - 10px);
            margin-left: 10px;
        }

        thead tr{
            display: flex;
            width: 100%;
            height: 30px;
            line-height: 30px;
        }

        thead td{
            width: 221px;
            text-align: center;
            flex: 0 0 221px;
            //border-right: 1px solid #e3e3e3;
            border-bottom: 1px solid #aba3a3;
            font-size: 14px;
            color: #797474;
            text-transform: capitalize;
            display: flex;
            justify-content: center;
        }

        thead td:hover{
            color: silver;
            cursor: hand;
        }

        thead td div:first-child{
            margin-right: 3px;
        }

        thead td div:last-child{

        }

        thead td:first-child{
            width: 45px;
            flex: 0 0 45px;
            border-right: 0;
        }

        .first-column{
            float: left;
            display: block;
            height: calc(100% - 29px);
            width: 55px;
            overflow: hidden;
            position: relative;
        }

        .first-column tr{
            float: left;
            display: block;
        }

        .first-column td{
            float: left;
            display: block;
            height: 55px;
            text-align: left;
            padding: 0;
            line-height: 56px;
            font-size: 10pt;
            color: rgba(204, 204, 204, 0.94);
            margin-left: 15px;
            border-bottom: 1px solid #e3e3e3;
            width: 100%;
        }

        .data{
            width: calc(100% - 55px);
            height: calc(100% - 29px);
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            position: relative;
        }

        .data tr{
            position: relative;
            display: flex;
        }

        .data td{
            width: 220px;
            height: 55px;
            text-align: center;
            padding: 0;
            border-right: 1px solid #e3e3e3;
            border-bottom: 1px solid #e3e3e3;
            flex: 0 0 220px;
        }

        .data td:hover{
            background-color: #f6f6f6 !important;
        }


        .selected > div:last-child{
            background-color: #000;
            border-radius: 30px;
            color: white;
            width: 25px;
            height: 25px;
            margin: auto 0 auto;
            line-height: 25px;
        }

        .now_hour{
            //color: red !important;
        }

        .today > div:last-child{
            background-color: #fd1313;
            border-radius: 30px;
            color: white;
            width: 25px;
            height: 25px;
            margin: auto 0 auto;
            line-height: 25px;
        }

        tbody .weekend{
            background-color: #f8f8f8 !important;
        }

        hr.now_time{
            position: absolute;
            width: 200%;
            background-color: rgba(255, 0, 0, 0.39);
            height: 2px;
            border: 0;
            margin: 0;
            z-index: 88;
        }
        div.now_time{
            position: absolute;
            color: red;
            font-size: 13px;
            line-height: 1px;
            margin-left: 15px;
        }

        .task, .avatar{
            position: absolute;
            background-color: #e0f2f1;
            z-index: 99;
        }

        .avatar{
              opacity: 0.5;
        }

        .vertical{
            height: 100%;
            display: block;
            width: 5px;
            background-color: #009688;
            float: left;
        }

        .text{
            display: block;
            width: calc(100% - 10px);
            height: 26px;
            font-size: 12px;
            margin-left: 10px;
            line-height: 26px;
            color: #149e91;
        }

        .text:nth-child(3){
            color: #16675f;
            line-height: 15px;
            height: calc(100% - 29px);
        }

        .selected_task{
            z-index: 199;
            background-color: #009688;
        }

        .selected_task .text{
            color: #b4d1d3;
        }

        .selected_task .text:nth-child(3){
            color: #fbfdfd;

        }

        .scale{
            display: block;
            width: calc(100% - 5px);
            height: 3px;
        }

        .selected_task .scale{
            cursor: row-resize;
        }

    `],
    template: `
        <div class="header-label-abs" style="margin: 2px 0 0 30px;">{{ tab.header }}</div>
        <div class = "round_menu">
            <div (click)="toggleSource('main')"    class="button"  [class.button_active]="this.activeMenu == 0" [style.background-image]="'url(assets/main_offers.png)'">Главная</div>
            <div (click)="toggleSource('analitic')" class="button" [class.button_active]="this.activeMenu == 1" [style.background-image]="'url(assets/analitic.png)'">Отчеты</div>
            <div (click)="toggleSource('history')"  class="button" [class.button_active]="this.activeMenu == 2" [style.background-image]="'url(assets/history.png)'">История</div>
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
            <div class="central_panel">
                <div class="head">
                    <div class="today_day">
                        <span>{{header_date.format("MMMM ")}}</span>
                        <span>{{header_date.format("YYYY")}}</span>
                    </div>
                    <div class="today_button" (click) = "setCenter()">Сегодня</div>
                </div>
                <div class="dailytable">
                    <table style="border-spacing: 0;">
                        <thead>
                            <tr>
                                <td></td>
                                <td *ngFor="let day of days" [class.today]="day.day_number == now_Date" (click)="move_to($event, day)"
                                    [class.selected] = "selected_date == day.day_number"
                                    [class.weekend] = "day.day_number.format('ddd') == 'сб' || day.day_number.format('ddd') == 'вс'"
                                >
                                    <div>{{day.day_number.format("ddd,")}}</div>
                                    <div>{{day.day_number.format("DD")}}</div>
                                </td>
                            </tr>
                        </thead>
                        <tbody class='first-column'>
                            <div class="now_time"  [style.top] = "now_time_top" >{{now_Date | date :'HH:mm'}}</div>
                            <tr *ngFor="let hour of daily">
                                <td [class.now_hour] = "hour.hour_name.split(':')[0] == (now_Date | date :'HH')">{{hour.hour_name}}</td>
                            </tr>
                        </tbody>
                        <tbody (mousedown)="enable_scroll($event)" (mousemove)="move_table($event)" (mouseup)="disable_scroll()"
                            (mouseleave)="disable_scroll()" class="data" (wheel) = "scroolTable($event)" (mousemove)="drag_task($event)" (mouseup)="drag_task_off($event)"
                            (mouseup)="drag_task_off($event)"
                        >
                            <hr class="now_time"  [style.top] = "now_time_top" [style.width] = "now_time_width">
                            <div class="avatar" *ngIf = "avatar" [style.width] = "avatar.width"
                                [style.height] = "55/60*avatar.duration"
                                [style.top] = "avatar.scr_top" [style.left] = "avatar.scr_left"
                            >
                                <span class="vertical"></span>
                                <span class= "text">{{avatar.date.format('HH:mm')}}</span>
                                <span class= "text">{{'Задачная задача'}}</span>
                                <span class= "scale"></span>
                            </div>
                            <div *ngFor="let task of tasks" class="task" [style.width] = "task.width"
                                [style.height] = "55/60*task.duration + task.duration/60 - 1"
                                [style.top] = "task.scr_top" [style.left] = "task.scr_left" (dblclick)="open_task($event,task)"
                                (mousedown)="drag_task_on($event, task)"
                            >
                                <span class="vertical"></span>
                                <span class= "text">{{task.date.format('HH:mm')}}</span>
                                <span class= "text">{{'Задачная задача'}}</span>
                                <span class= "scale"></span>
                            </div>
                            <tr *ngFor="let hour of daily">

                                <td *ngFor="let day of days" (dblclick)="add_task(day, hour, $event)"
                                    [class.weekend] = "day.day_number.format('ddd') == 'сб' || day.day_number.format('ddd') == 'вс'"
                                >

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
})

export class TabDailyComponent implements OnInit, AfterViewInit {
    public tab: Tab;
    activeMenu: number = 0;
    source: OfferSource = OfferSource.LOCAL;
    subscription: Subscription;
    can_scroll_table: boolean = false;
    scroll_start_x: number;
    scroll_start_y: number;
    now_Date = moment();
    selected_date = this.now_Date;
    header_date = this.now_Date;
    now_time_top = 30;
    now_time_width = "100%";
    filter: any = {
        stageCode: 'all',
        agentId: 'all',
        tag: 'all',
        changeDate: 90,
        offerTypeCode: 'sale',
    };
    dragTask: Task;
    dragTask_start_x: number;
    dragTask_start_y: number;
    scale_mode: boolean = false;
    daily: any=[
        {hour_name: '00:00'},
        {hour_name: '01:00'},
        {hour_name: '02:00'},
        {hour_name: '03:00'},
        {hour_name: '04:00'},
        {hour_name: '05:00'},
        {hour_name: '06:00'},
        {hour_name: '07:00'},
        {hour_name: '08:00'},
        {hour_name: '09:00'},
        {hour_name: '10:00'},
        {hour_name: '11:00'},
        {hour_name: '12:00'},
        {hour_name: '13:00'},
        {hour_name: '14:00'},
        {hour_name: '15:00'},
        {hour_name: '16:00'},
        {hour_name: '17:00'},
        {hour_name: '18:00'},
        {hour_name: '19:00'},
        {hour_name: '20:00'},
        {hour_name: '21:00'},
        {hour_name: '22:00'},
        {hour_name: '23:00'}
    ];
    days: Array<any> = [
        {day_number: moment().subtract(5, 'days')},
        {day_number: moment().subtract(4, 'days')},
        {day_number: moment().subtract(3, 'days')},
        {day_number: moment().subtract(2, 'days')},
        {day_number: moment().subtract(1, 'days')},
        {day_number: this.now_Date},
        {day_number: moment().add(1, 'days')},
        {day_number: moment().add(2, 'days')},
        {day_number: moment().add(3, 'days')},
        {day_number: moment().add(4, 'days')},
        {day_number: moment().add(5, 'days')}
    ]
    stages: Array<any>;
    tasks: Array<Task>=[];
    td_temp: HTMLElement;
    task_div: HTMLElement;
    avatar: Task;
    old_td: HTMLElement;
    constructor(private _hubService: HubService,
                private _userService: UserService,
                private _configService: ConfigService,
                private _offerService: OfferService,
                private _analysisService: AnalysisService,
                private _historyService: HistoryService,
                private _sessionService: SessionService,
                private _notebookService: NotebookService
    ) {
        moment.locale("ru");
        this.subscription = _notebookService.is_update().subscribe(message => {
                                console.log("message", message.old.format("DD.MM.YYYY"));
                                this.recalc_width(message.task, message.old);
                            });
    }

    ngOnInit() {
        this.tab.header="Ежедневник";
        this.setCenter();


    }

    ngAfterViewInit() {

    }

    toggleSource(s: string) {
        if (s == 'main') {
            this.activeMenu = 0;
            this.setCenter();
        } else if(s == 'analitic') {
            this.activeMenu = 1;
        }else {
            this.activeMenu = 2;
        }
    }

    enable_scroll(e: MouseEvent){
        if((<HTMLElement>e.target).className != 'task selected_task' && (<HTMLElement>e.target).parentElement.className != 'task selected_task'){
            this.can_scroll_table = true;
            this.scroll_start_x = (<HTMLElement>e.currentTarget).scrollLeft + e.pageX;
            this.scroll_start_y = (<HTMLElement>e.currentTarget).scrollTop  + e.pageY;
        }
    }

    disable_scroll(){
        this.can_scroll_table = false;
        this.scale_mode = false;
    }

    move_table(e){
        if(this.can_scroll_table && (<HTMLElement>e.currentTarget).className != "task selected_task"){
            let target=(<HTMLElement>e.currentTarget);
            if(target.scrollLeft + target.clientWidth  >= target.scrollWidth){
                this.add_days(true);
            } else if(target.scrollLeft + this.scroll_start_x - e.pageX <= 0){
                this.add_days(false);
                this.add_days(false);
                target.scrollLeft = 440;
                this.scroll_start_x = target.scrollLeft + e.pageX;
                return;
            }

            let first_column = target.previousElementSibling;
            let header = <HTMLElement>first_column.previousElementSibling;
            target.scrollTop = this.scroll_start_y - e.pageY;
            first_column.scrollTop = target.scrollTop;
            target.scrollLeft = this.scroll_start_x - e.pageX;
            header.scrollLeft = target.scrollLeft;
            this.now_time_width = "" + target.scrollWidth;
            let day_list = header.getElementsByTagName('td');
            for (let i = 0; i < day_list.length; ++i) {
                    if(day_list[i].offsetLeft > header.scrollLeft + header.offsetWidth/2 - 225
                        && day_list[i].offsetLeft < header.scrollLeft + header.offsetWidth/2 - 75
                    ){
                        this.header_date = this.days[i].day_number;
                        break;
                    }
            }
        }
    }

    add_days(yes: boolean){
        if(yes){
            this.days.push({day_number: moment(this.days[this.days.length -1].day_number).add(1, 'days')});
        } else {
            this.days.unshift({day_number: moment(this.days[0].day_number).subtract(1, 'days')});
            this.tasks.forEach(task =>{
                task.scr_left +=221;
            });
        }
    }

    setCenter(){
        setTimeout(() =>{
            let header_day =( <HTMLElement>document.getElementsByClassName("today").item(0));
            let header_hour = ( <HTMLElement>document.getElementsByClassName("now_hour").item(0));
            let header = header_day.parentElement.parentElement;
            let left_header  = header_hour.parentElement.parentElement;
            let body = header.nextElementSibling.nextElementSibling;
            header.scrollLeft = header_day.offsetLeft - header.offsetWidth/2 +  75;
            left_header.scrollTop = header_hour.offsetTop - left_header.offsetHeight/2;
            body.scrollLeft = header.scrollLeft;
            body.scrollTop = left_header.scrollTop;
            this.now_time_top =  header_hour.offsetTop + 55/60*parseFloat(moment().format("mm"));
            this.header_date = this.now_Date;
            this.now_time_width = "" + body.scrollWidth;
        }, 10);
    }

    move_to(event, day){
            this.selected_date = day.day_number;
            this.header_date = this.selected_date;
            let header_day = <HTMLElement>event.currentTarget;
            let header = header_day.parentElement.parentElement;
            let body = header.nextElementSibling.nextElementSibling;
            if(header_day.offsetLeft - header.offsetWidth/2 +  65 > header.scrollLeft ){
                let timer = setInterval(() =>{
                    if(header.scrollLeft < header_day.offsetLeft - header.offsetWidth/2 +  75){
                        if(header.scrollLeft + header.clientWidth + 10 >= header.scrollWidth)
                            this.add_days(true);
                        header.scrollLeft = header.scrollLeft + 10;
                        body.scrollLeft = header.scrollLeft;
                        this.now_time_width = "" + body.scrollWidth;
                    } else {
                        clearInterval(timer);
                    }
                }, 10);
            } else{
                let timer = setInterval(() =>{
                    if(header.scrollLeft >= header_day.offsetLeft - header.offsetWidth/2 +  85){
                        if(header.scrollLeft == 0){
                            this.add_days(false);
                            this.add_days(false);
                            header.scrollLeft = 300;
                        }
                        header.scrollLeft = header.scrollLeft - 10;
                        body.scrollLeft = header.scrollLeft;
                        this.now_time_width = "" + body.scrollWidth;
                    } else {
                        clearInterval(timer);
                    }
                }, 10);
            }
    }

    scroolTable(ev: WheelEvent){
        (<HTMLElement>ev.currentTarget).scrollTop += ev.deltaY;
        let body = <HTMLElement>ev.currentTarget;
        let left_header  = body.previousElementSibling;
        body.scrollTop += ev.deltaY / 2;
        left_header.scrollTop = body.scrollTop;
    }

    add_task(day: any, hour: any, event: MouseEvent){
        let task = new Task();
        task.scr_left = (<HTMLElement>event.currentTarget).offsetLeft;
        task.scr_top = (<HTMLElement>event.currentTarget).parentElement.offsetTop;
        task.date = moment(day.day_number.format('YYYY-MM-DD') + hour.hour_name, 'YYYY-MM-DD kk:mm');
        task.duration = 60;
        this.tasks.push(task);
        this._notebookService.set({show: 1, state: 'new', data: task});
    }

    open_task(event: MouseEvent,task: Task){
        if((!this.task_div || (<HTMLElement>event.currentTarget).className == "task") && !this.can_scroll_table){
            this._notebookService.set({show: 1, state: 'new', data: task});
            this.task_div ? this.task_div.className = 'task' : null;
            this.task_div = (<HTMLElement>event.currentTarget).tagName == 'DIV' ? (<HTMLElement>event.currentTarget) : (<HTMLElement>event.currentTarget).parentElement;
            this.task_div.style.display = "none";
            this.td_temp = <HTMLElement>document.elementFromPoint(event.pageX,event.pageY);
            if(this.td_temp.tagName == "HR"){
                this.td_temp.style.display = "none";
                let back_back = <HTMLElement>document.elementFromPoint(event.pageX,event.pageY);
                this.td_temp.style.display = "";
                this.td_temp = back_back;
            }
            if(this.td_temp.tagName == "SPAN")
                this.td_temp = this.td_temp.parentElement;
            this.task_div.className = 'task selected_task';
            this.task_div.style.display = "";
        } else{
            this.task_div.className = 'task';
            this.task_div = null;
        }

    }

    drag_task_on(event: MouseEvent, task: Task){
        if((<HTMLElement>event.target).className == "task selected_task" ||
            (<HTMLElement>event.target).parentElement.className == "task selected_task" && (<HTMLElement>event.target).className != "scale"
             && this.task_div
        ){
            this.dragTask = task;
            this.avatar = new Task();
            this.avatar.scr_top = this.dragTask.scr_top;
            this.avatar.scr_left = this.dragTask.scr_left;
            this.avatar.date = moment(this.dragTask.date);
            this.avatar.duration = this.dragTask.duration;
            this.avatar.width = this.dragTask.width;
            let tasks = document.getElementsByClassName('data').item(0).getElementsByTagName("DIV");
            for(let i = 0 ; i < tasks.length; ++i)
                (<HTMLElement>tasks.item(i)).style.display = "none";
            this.old_td = <HTMLElement>document.elementFromPoint(event.pageX,event.pageY);
            if(this.old_td.tagName == "HR"){
                this.old_td.style.display = "none";
                let back_back = <HTMLElement>document.elementFromPoint(event.pageX,event.pageY);
                this.old_td.style.display = "";
                this.old_td = back_back;
            }
            this.dragTask.width = 220;
            this.dragTask.scr_left = this.old_td.offsetLeft;
            for(let i = 0 ; i < tasks.length; ++i)
                (<HTMLElement>tasks.item(i)).style.display = "";
            this.dragTask_start_y = event.pageY;
            this.dragTask_start_x = event.pageX;
        } else if((<HTMLElement>event.target).className == "scale" &&  this.task_div){
            this.dragTask = task;
            this.scale_mode = true;
            this.dragTask_start_y = event.pageY;
        } else {
            this.dragTask = null;
            let act_task = document.getElementsByClassName("task selected_task");
            for(let i = 0; i < act_task.length; i++){
                act_task.item(i).className = "task";
            }
            (<HTMLElement>event.target).tagName == "SPAN" ? (<HTMLElement>event.target).parentElement.className = "task selected_task" : (<HTMLElement>event.target).className = "task selected_task";
        }
    }

    drag_task_off(event: MouseEvent){
        if(this.dragTask && this.task_div){
            this.dragTask.scr_left += 1;
            this.dragTask.width -= 2;
            let tasks = document.getElementsByClassName('data').item(0).getElementsByTagName("DIV");
            for(let i = 0 ; i < tasks.length; ++i)
                (<HTMLElement>tasks.item(i)).style.display = "none";
            this.td_temp = <HTMLElement>document.elementFromPoint(event.pageX,event.pageY);

            if(this.td_temp.tagName == "HR"){
                this.td_temp.style.display = "none";
                let back_back = <HTMLElement>document.elementFromPoint(event.pageX,event.pageY);
                this.td_temp.style.display = "";
                this.td_temp = back_back;
            }
            for(let i = 0 ; i < tasks.length; ++i)
                (<HTMLElement>tasks.item(i)).style.display = "";
            this.recalc_width(this.dragTask, this.avatar.date);
            this.avatar = null;
            this.dragTask = null;
        }

        this.scale_mode = false;
    }

    drag_task(event: MouseEvent){
        if(this.dragTask && !this.scale_mode && this.task_div){
            this.task_div.style.display = "none";
            let background_obj = <HTMLElement>document.elementFromPoint(event.pageX,event.pageY);
            if(background_obj.tagName == "HR"){
                background_obj.style.display = "none";
                let back_back = <HTMLElement>document.elementFromPoint(event.pageX,event.pageY);
                background_obj.style.display = "";
                background_obj = back_back;
            }
            if(background_obj.tagName == "SPAN")
                background_obj = background_obj.parentElement
            if (background_obj.offsetLeft != this.td_temp.offsetLeft){
                this.td_temp = background_obj;
                if(this.td_temp.tagName != "TD"){
                    if(this.td_temp != this.task_div){
                        if(this.td_temp.className != "avatar"){
                            let tmp = <HTMLElement>document.elementFromPoint(event.pageX,222);
                            if(tmp.tagName == "TD"){
                                this.dragTask.scr_left = tmp.offsetLeft - 56;
                                let index = Array.prototype.indexOf.call(tmp.parentElement.children, tmp) - 1;
                                this.dragTask.date.set({'year': this.days[index].day_number.year(), 'month': this.days[index].day_number.month(), 'day': this.days[index].day_number.day()});
                            } else if(tmp.tagName == "DIV"){
                                this.dragTask.scr_left = tmp.parentElement.offsetLeft - 56;
                                let index = Array.prototype.indexOf.call(tmp.parentElement.parentElement.children, tmp.parentElement) - 1;
                                this.dragTask.date.set({'year': this.days[index].day_number.year(), 'month': this.days[index].day_number.month(), 'day': this.days[index].day_number.day()});
                            }
                        } else{
                            this.dragTask.date = moment(this.avatar.date);
                            this.dragTask.duration = this.avatar.duration;
                            this.td_temp.style.display = "none";
                            this.dragTask.scr_left = (<HTMLElement>document.elementFromPoint(event.pageX,event.pageY)).offsetLeft;
                            this.td_temp.style.display = "";
                        }
                    } else{
                        this.dragTask.scr_left = this.td_temp.offsetLeft - 1;
                    }
                } else{
                    let tmp = <HTMLElement>document.elementFromPoint(event.pageX,222);
                    if(tmp.tagName == "TD"){
                        let index = Array.prototype.indexOf.call(tmp.parentElement.children, tmp) - 1;
                        this.dragTask.date.set({'year': this.days[index].day_number.year(), 'month': this.days[index].day_number.month(), 'date': this.days[index].day_number.date()});
                    } else if(tmp.tagName == "DIV"){
                        let index = Array.prototype.indexOf.call(tmp.parentElement.parentElement.children, tmp.parentElement) - 1;
                        this.dragTask.date.set({'year': this.days[index].day_number.year(), 'month': this.days[index].day_number.month(), 'date': this.days[index].day_number.date()});
                    }
                    this.dragTask.scr_left = this.td_temp.offsetLeft;
                }
            } else{
                let td_elem = <HTMLElement>event.target;
                if(td_elem.tagName == "SPAN"){
                    td_elem = td_elem.parentElement;
                }

                if(td_elem.tagName == "TD"){
                    this.dragTask.date.add((td_elem.parentElement.offsetTop - this.dragTask.scr_top) / 14 *15, 'minutes');
                    this.dragTask.scr_top = td_elem.parentElement.offsetTop;
                    this.dragTask_start_y = event.pageY;
                } else if(td_elem.className == "avatar"){
                    this.dragTask.date.add((td_elem.offsetTop - this.dragTask.scr_top) / 14 * 15, 'minutes');
                    this.dragTask.scr_top = td_elem.offsetTop;
                    this.dragTask_start_y = event.pageY;
                }  else {
                    if(Math.abs(this.dragTask_start_y - event.pageY) > 14){
                        this.dragTask.scr_top += (this.dragTask_start_y - event.pageY) < 0 ? 14 : -14;
                        (this.dragTask_start_y - event.pageY) < 0 ? this.dragTask.date.add(15, 'minutes') : this.dragTask.date.subtract(15, 'minutes');
                        this.dragTask_start_y = event.pageY;
                    }
                }
                let tr = document.getElementsByClassName("first-column").item(0).getElementsByTagName("TR");
                let i = 0;
                for(; i < tr.length; ++i){
                    if(this.dragTask.scr_top >= (<HTMLElement>tr.item(i)).offsetTop && this.dragTask.scr_top < (<HTMLElement>tr.item(i+1)).offsetTop){
                        break;
                    }
                }
                if(this.daily[i].hour_name.split(":")[0] != this.dragTask.date.hour()){
                    this.dragTask.date.hour(parseInt(this.daily[i].hour_name.split(":")[0]));
                }
                if( Math.abs((<HTMLElement>tr.item(i)).offsetTop - this.dragTask.scr_top) == 14)
                    this.dragTask.date.minute(15);
                if( Math.abs((<HTMLElement>tr.item(i)).offsetTop - this.dragTask.scr_top) == 28)
                    this.dragTask.date.minute(30);
                if( Math.abs((<HTMLElement>tr.item(i)).offsetTop - this.dragTask.scr_top) == 42)
                    this.dragTask.date.minute(45);
            }
            this.task_div.style.display = "";
        } else if(this.dragTask && this.scale_mode && this.task_div){
            this.dragTask.duration += event.pageY - this.dragTask_start_y;
            this.dragTask_start_y = event.pageY;
        }
    }

    recalc_width(dragTask: Task, date_old: any){
        let elements = document.getElementsByTagName("THEAD").item(0).getElementsByTagName('TD');
        let new_td, old_td;
        for(let i = 0; i < this.days.length; ++i){
            if(this.days[i].day_number.format("DD.MM.YYYY") == dragTask.date.format("DD.MM.YYYY"))
                new_td = elements.item(i+1);
            else if(this.days[i].day_number.format("DD.MM.YYYY") == date_old.format("DD.MM.YYYY"))
                old_td = elements.item(i+1);
        }

        function sort_function(a: Task, b: Task) {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
        };

        let finale_day_arr : Array<Task> = [];
        let old_day_arr : Array<Task> = [];

        this.tasks.forEach(task => {
            if(dragTask.date.format("DD.MM.YYYY") == task.date.format("DD.MM.YYYY"))
                finale_day_arr.push(task);
            else if(date_old.format("DD.MM.YYYY") == task.date.format("DD.MM.YYYY") && date_old.format("DD.MM.YYYY") != dragTask.date.format("DD.MM.YYYY"))
                old_day_arr.push(task);
        });

        finale_day_arr.sort(sort_function);
        old_day_arr.sort(sort_function);
        let DayArray: Array<Array<Task>>=[];
        DayArray.push([finale_day_arr[0]]);
        for(let i = 0,  j = 0; i < finale_day_arr.length; ++i){
            let end_time = moment(finale_day_arr[i].date).add(finale_day_arr[i].duration, "minutes");
            if(finale_day_arr.length != i+1 && finale_day_arr[i+1].date < end_time){
                DayArray[j].push(finale_day_arr[i+1]);
            } else if(finale_day_arr.length != i+1){
                DayArray.push([finale_day_arr[i+1]]);
                j++;
            }
        }

        DayArray.forEach(grArr => {
            let width = (220 - grArr.length + 1) / grArr.length ;
            for(let i=0; i< grArr.length ; i++){
                grArr[i].width = width;
                if(i == 0)
                    grArr[i].scr_left = new_td.offsetLeft - 55;
                else
                    grArr[i].scr_left = grArr[i-1].scr_left + width + 1;
            }
        });

        if(old_day_arr.length != 0){
            DayArray = [[old_day_arr[0]]];
            for(let i = 0,  j = 0; i < old_day_arr.length; ++i){
                let end_time = moment(old_day_arr[i].date).add(old_day_arr[i].duration, "minutes");
                if(old_day_arr.length != i+1 && old_day_arr[i+1].date < end_time){
                    DayArray[j].push(old_day_arr[i+1]);
                } else if(old_day_arr.length != i+1){
                    DayArray.push([old_day_arr[i+1]]);
                    j++;
                }
            }

            DayArray.forEach(grArr => {
                let width = (220 - grArr.length + 1) / grArr.length ;
                for(let i=0; i< grArr.length ; i++){
                    grArr[i].width = width;
                    if(i == 0)
                        grArr[i].scr_left = old_td.offsetLeft - 55;
                    else
                        grArr[i].scr_left = grArr[i-1].scr_left + width + 1;
                }
            });
        }
    }
}
