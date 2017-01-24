import {Component, OnInit} from '@angular/core';

import {HubService} from '../../service/hub.service'
import {PersonService} from '../../service/person.service'
import {TaskService} from '../../service/task.service'

import {Request} from '../../class/request';
import {Person} from '../../class/person';
import {Task} from '../../class/task';
import {User} from "../../class/user";
import {UserService} from "../../service/user.service";

@Component({
    selector: 'digest-request',
    inputs: ['request'],
    styles: [`
        .billet {
            background-color: inherit;
            color: #696969;
            font-weight: 200;
            font-size: 14px;
            position: relative;
    
            border-bottom: 1px solid #e5e5e5;
            overflow: hidden;
    
            padding: 10px 20px;
        }
    
        .billet-label {
            font-weight: 400;
            color:  #666;
            font-size: 17px;
            white-space: nowrap;
            margin-left: 20px;
        }
    
        .billet.selected {
            background-color: #157ad3;
            color: #fff !important;
        }
    
        .billet-block {
            display: inline-block;
            width: 32%;
        }
    
        .entry-header {
            display: inline-block;
            width: 80px;
            color: #aaa;
        }
    
        .badge-gray {
            display: inline-block;
            width: 85px;
            text-align: center;
            color: #666;
            background-color: #eee;
        }
        .badge-red {
            display: inline-block;
            width: 85px;
            text-align: center;
            color: #fff;
            background-color: #e05050;
        }
        .badge-green {
            display: inline-block;
            width: 85px;
            text-align: center;
            color: #fff;
            background-color: #50e050;
        }
    `],
    template: `
        <div class="billet"
             [class.selected]="selected"
             (click)="select()"
             (dblclick)="open()"
             (touchstart)="tStart()"
             (touchend)="tEnd()"
        >
            <div style="display: flex; justify-content: space-between;">
                <span>Заявка {{ request._id }}
                  <span class="billet-label">{{ request.request }} ( {{ request.offerTypeCode }} )</span>
                </span>
        
                <span></span>
            </div>
            <table style="width: 100%;">
                <tbody style="vertical-align: top; font-size: 14px; font-weight: 200;">
                <tr>
                    <td width="33%">
                        <span class="entry-header" style="width: 105px;">Контакт:</span> <a href="#">{{ person.name }}</a>
                    </td>
                    <td width="33%">
                        <span class="entry-header">Задача:</span> {{ task.type }}
                    </td>
                    <td width="33%">
                        <div style="float: left; display: block;">
                            <span class="entry-header" style="width: 90px;">Комментарий:</span>
                        </div>
                        <div style="oveflow: hidden;">
                            <span class="line-clamp line-clamp-1" style="font-style: italic; line-height: normal;"> {{ task.comment }} </span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="entry-header" style="width: 105px;">Ответственный:</span> <a href="#"> {{ agent.name }} </a>
                    </td>
                    <td>
                        <span class="entry-header">Результат:</span> <span [class.badge-gray]="task.result_id == 0"
                                                                           [class.badge-green]="task.result_id == 1"
                                                                           [class.badge-red]="task.result_id == 2">{{ resultText }}</span>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="entry-header" style="width: 105px;">Стадия:</span> 
                    </td>
                    <td></td>
                    <td>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    `
})

export class DigestRequestComponent implements OnInit {

    public request: Request;

    private selected = false;
    person: Person = new Person();
    agent: User = new User();
    resultText: string;
    task: Task;
    to: any;

    constructor(private _hubService: HubService, private _userService: UserService, private _taskService: TaskService, private _personService: PersonService) { };

    ngOnInit() {
        this.task = this._taskService.getRandomTask();
        this.resultText = this.getResultText();

        if (this.request.personId != null) {
            this._personService.get(this.request.personId).subscribe(person => {
                this.person = person;
            });
        }

        if (this.request.agentId != null) {
            this._userService.get(this.request.agentId).subscribe(agent => {
                this.agent = agent;
            });
        }

    }

    select() {
        this.selected = !this.selected;
    }

    open() {
        this.selected = true;
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('request', {request: this.request});
    }

    tStart() {
        clearTimeout(this.to);
        this.to = setTimeout(() => {
            this.open();
        }, 1000);
    }

    tEnd() {
        clearTimeout(this.to);
    }

    getResultText() {
        return Task.getResultText(this.task);
    }
}
