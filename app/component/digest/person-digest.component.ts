import {Component} from 'angular2/core';

import {FormatDatePipe} from '../../pipe/format-date.pipe';

import {HubService} from '../../service/hub.service'
import {TaskService} from '../../service/task.service'

import {Person} from '../../class/person';
import {Task} from '../../class/task';

@Component({
  selector: 'person-digest',
  inputs: ['person'],
  pipes: [FormatDatePipe],
  template: `
    <div class="billet"
      [class.selected]="person.selected"
      (click)="select()"
      (dblclick)="open()"
      (touchstart)="tstart()"
      (touchend)="tend()"
    >

      <div style="display: flex; justify-content: space-between;">
        <span>Контакт {{ person.id }}
          <span class="billet-label">{{ person.name }}</span>
        </span>
        <span>{{ person.change_date | formatDate }} / {{ person.add_date | formatDate }}</span>
      </div>

      <table style="width: 100%;">
        <tbody style="vertical-align: top; font-size: 14; font-weight: 200;">
          <tr>
            <td width="33%">
              <span class="entry-header" style="width: 105px;">Организация:</span> {{ person.organisation.name }}
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
              <span class="entry-header" style="width: 105px;">Ответственный:</span> <a href="#">Какой Какойтович</a>
            </td>
            <td>
              <span class="entry-header">Результат:</span> <span [class.badge-gray]="task.result_id == 0" [class.badge-green]="task.result_id == 1" [class.badge-red]="task.result_id == 2">{{ result_text }}</span>
            </td>
            <td>

            </td>
          </tr>
          <tr>
            <td>
              <span class="entry-header" style="width: 105px;">Телефон:</span> {{ person.phone[0].s }}
            </td>
            <td></td>
            <td>

            </td>
          </tr>
        </tbody>
      </table>



    </div>
  `,
  styles: [`
    .billet {
      background-color: inherit;
      color: #696969;
      font-weight: 200;
      font-size: 14;
      position: relative;

      border-bottom: 1px solid #e5e5e5;
      overflow: hidden;

      padding: 10px 20px;
    }

    .billet-label {
      font-weight: 400;
      color:  #666;
      font-size: 17;
      white-space: nowrap;
      margin-left: 50px;
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
      width: 90px;
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
  `]
})

export class PersonDigestComponent {
  public person: Person;
  result_text: string;
  task: Task;
  to: any;

  constructor(private _hubService: HubService, private _taskService: TaskService) { };

  ngOnInit() {
    this.task = this._taskService.getRandomTasks();
    this.result_text = this.getResultText();
  }

  select() {
    this.person.selected = !this.person.selected;
  }

  open() {
    this.person.selected = true;
    var tab_sys = this._hubService.getProperty('tab_sys');
    tab_sys.addTab('person', { person: this.person });
  }

  tstart() {
    clearTimeout(this.to);
    this.to = setTimeout(() => {
      this.open();
    }, 1000);
  }

  tend() {
    clearTimeout(this.to);
  }

  getResultText() {
    return Task.getResultText(this.task);
  }
}
