import {Component,  OnInit} from '@angular/core';
import {Almanac} from "./almanac.component";
import {Task} from '../../class/task';

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
                <div class='view_icon' [style.background-image]="'url(assets/person_icon/category.png)'"></div>
                <div class="view-group">
                    <span class="view-label pull-left">Раздел:</span>
                    <ui-slidingMenu class="view-value edit-value"
                        [options] = "[
                            {value: 'NOT', label: 'Предложения'},
                            {value: 'client', label: 'Клиент'},
                            {value: 'realtor', label: 'Конкурент'},
                            {value: 'company', label: 'Наша компания'},
                            {value: 'partner', label: 'Партнер'}
                        ]"
                        [value]="task.type"
                        (onChange)="task.type = $event.selected.value">
                    >
                    </ui-slidingMenu>
                </div>
                <hr>
                <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                    <ui-input-line [placeholder] = "'Описание: '" [value] = "task.discride"
                        [width] = "'225px'" (onChange)= "task.discride = $event">
                    </ui-input-line>
                </div>
                <hr>
                <div class='view_icon' [style.background-image]="'url(assets/user_icon/user.png)'"></div>
                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                    <ui-input-line [placeholder] = "'Дата: '" [value] = "task.date.format('DD.MM.YYYY kk:mm')"
                        [width] = "'225px'" (onChange)= "task.date = new_date($event, task.date)">
                    </ui-input-line>
                </div>
                <div class="view-group" style='overflow: hidden; position: relative; display: block;'>
                    <ui-input-line [placeholder] = "'Дата окончания: '" [value] = "task.end_date.format('DD.MM.YYYY kk:mm')"
                        [width] = "'225px'" (onChange)= "task.end_date = new_date($event)">
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
    task: Task;
    mode: string = 'new';
    constructor(

    ) {

    }

    ngOnInit(){

    }

    new_date(ev, date?){
        let new_date = moment(ev, 'DD.MM.YYYY kk:mm');
        if(date){
            let diff = new_date.diff(date, 'minute');
            if(diff != 0)
                this.task.scr_top += 56/60*diff;
        }
        return new_date;
    }
}
