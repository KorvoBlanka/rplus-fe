import {Component,  OnInit, Output, EventEmitter} from '@angular/core';
import {Almanac} from "./almanac.component";
import {UserService} from '../../service/user.service';
import {Task} from '../../class/task';
import {User} from '../../entity/user';

import * as moment from 'moment/moment';
import 'moment/locale/ru.js';

@Component({
    inputs: ['task', 'mode'],
    selector: 'notebook-task-describe',
    styles: [`
        .edit_mode{
            width: calc(100% - 20px);
            margin: 50px 10px 0 10px;
            height: calc(100% - 50px);
        }

        .edit-value {
            width: 100%;
            text-align: right;
            color: #696969;
            font-size: 10pt;
            height: 19px; /* костыль */
            border: none !important;
            overflow: visible;
        }

        .text-value {
            height: 3rem;
            border: 1px solid #E5E5E5 !important;
        }

        .edit_mode > .view-group, .view_mode > .view-group {
            height: 30px;
        }

        .view_mode{

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
            margin-right: 5px;
        }

        .view-value {
            width: 100%;
            text-align: right;
            color: #696969;
            font-size: 10pt;
            margin-top: 5px;
            height: 19px; /* костыль */
            text-overflow: ellipsis;
            white-space: nowrap;
            //overflow: hidden;
        }

        .edit_mode >hr, .view_mode >hr{
            margin: 5px 0 5px 0;
        }

    `],
    template: `
        <div>
            <div class="edit_mode" *ngIf="mode == 'new'">
                <div class="view-group">
                    <span class="view-label">Ответственный:</span>
                    <ui-slidingMenu class="view-value edit-value"
                        [options] = "agentOpts"
                        [value]="superior.id"
                        (onChange)="agentChanged($event)"
                    >
                    </ui-slidingMenu>

                </div>
                <hr>
                <div class="view-group">
                    <span class="view-label pull-left">Приоритет:</span>
                    <ui-slidingMenu class="view-value edit-value"
                        [options] = "[
                            {value: 2, label: 'Высокий'},
                            {value: 1, label: 'Средний'},
                            {value: 0, label: 'Низкий'}
                        ]"
                        [value]="task.priority"
                        (onChange)="task.priority = $event.selected.value">
                    >
                    </ui-slidingMenu>
                </div>
                <hr>
                <div class="view-group">
                    <span class="view-label pull-left">Действие:</span>
                    <ui-slidingMenu class="view-value edit-value"
                        [options] = "[
                            {value: 'CALL', label: 'Звонок'},
                            {value: 'MEET', label: 'Встреча'},
                            {value: 'OTHER', label: 'Прочее'}
                        ]"
                        [value]="task.type"
                        (onChange)="task.type = $event.selected.value">
                    >
                    </ui-slidingMenu>
                </div>
                <hr>
                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                    <ui-input-line [placeholder] = "'Заголовок задачи: '" [value] = "task.title"
                        [width] = "'225px'" (onChange)= "task.title = $event">
                    </ui-input-line>
                </div>
                <hr>
                <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                    <ui-input-line [placeholder] = "'Описание: '" [value] = "task.discride"
                        [width] = "'225px'" (onChange)= "task.discride = $event">
                    </ui-input-line>
                </div>
                <hr>
                <div class="view-group multiply">
                    <ui-input-line [placeholder] = "'Адрес проживания:'" [value] = "addressStr"
                        [width] = "'225px'" (onChange)= "parseArray($event, userAddress, true)" [queryTipe]="'address'" (clicked)="showMenu($event)">
                    </ui-input-line >
                    <div class='arrow' (click)="showMenu($event)" *ngIf="userAddress[0] && userAddress[0]?.value"></div>
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
                        [values]="userAddress"
                        [width]="'36%'"
                        (onChange)="parseArray($event, userAddress)">
                    </ui-multiselect>
                </div>
                <hr>
                <div class="view-group">
                    <span class="view-label pull-left">Маршрут:</span>
                    <ui-slidingMenu class="view-value edit-value"
                        [options] = "[
                            {value: 'CAR', label: 'На автомобиле'},
                            {value: 'BUS', label: 'Общественным транспортом'},
                            {value: 'AFOOT', label: 'Пешком'}
                        ]"
                        [value]="task.route"
                        (onChange)="task.route = $event.selected.value">
                    >
                    </ui-slidingMenu>
                </div>
                <hr>
                <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                    <ui-input-line [placeholder] = "'Дата: '" [value] = "task.date.format('DD.MM.YYYY kk:mm')" [on_enter_save] = "true"
                        [width] = "'225px'" (onChange)= "new_date($event)">
                    </ui-input-line>
                </div>
                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                    <ui-input-line [placeholder] = "'Длительность: '" [value] = "task.duration"
                        [width] = "'225px'" (onChange)= "task.duration = set_duration($event)">
                    </ui-input-line>
                </div>
                <hr>
            </div>
            <div class="view_mode" *ngIf="mode == 'old'">

            </div>
        </div>
    `
})

export class NotebookTaskDescribe implements OnInit{
    date_start: any;
    scr_top: number;
    task: Task;
    mode: string = 'new';
    agentOpts: any[] = [];
    superior: User = new User();
    @Output() update: EventEmitter<any> = new EventEmitter();
    constructor(
        private _userService: UserService,
    ) {
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

    ngOnInit(){
        this.date_start = this.task.date;
        this.scr_top = this.task.scr_top;
    }

    set_duration(event){
        let endDay = moment(this.task.date).hour(24).minute(0);
        let diff = endDay.diff(this.task.date, 'minute');
        if(parseInt(event) > diff)
            return diff;
        else return parseInt(event);
    }

    new_date(ev){
        let new_date = moment(ev, 'DD.MM.YYYY kk:mm');
        let old_date = this.task.date.clone();
        let day_diff = new_date.dayOfYear() - this.task.date.dayOfYear();
        if(day_diff != 0) {
            this.task.date.add(day_diff, 'day')
            this.task.scr_left += 221*day_diff;
        }
        let diff = new_date.diff(this.task.date, 'minute')
            if(diff != 0)
                this.task.scr_top += 56/60*diff;
        this.task.date =  new_date;
        this.update.emit({task: this.task, old: old_date});
    }

    agentChanged(e) {
        this.task.user = e.selected.value;
        this._userService.get(this.task.user).subscribe(agent => {
            this.superior = agent;
        });
    }


}
