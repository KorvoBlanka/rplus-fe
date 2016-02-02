import {Component} from 'angular2/core';

import {HubService} from '../service/hub.service'
import {TaskService} from '../service/task.service'

import {Request} from '../class/request';
import {Task} from '../class/task';

@Component({
  selector: 'request-digest',
  inputs: ['request'],
  template: `
    <div class="billet"
      [class.selected]="request.selected"
      (click)="select()"
      (dblclick)="open()"
      (touchstart)="tstart()"
      (touchend)="tend()"
    >

      <div style="display: flex; justify-content: space-between;">
        <span>Заявка {{ request._id }}</span>
        <span>11.11.15 11:29</span>
      </div>

      <table style="width: 100%;">
        <tbody style="vertical-align: top; font-size: 14; font-weight: 200;">
          <tr>
            <td width="33%">
              <span class="entry-header">Запрос:</span><span style="font-weight: 400;"> {{ request._source.req_text }} </span>
            </td>
            <td width="33%">
              <span class="entry-header" style="width: 105px;">Ответственный:</span> <a href="#">Какой Какойтович</a>
            </td>
            <td width="33%">
              <span class="entry-header">Задача:</span> {{ task.type }}
            </td>
          </tr>
          <tr>
            <td>
              <span class="entry-header">Контакт:</span> <a href="#">Петр 4212749444</a>
            </td>
            <td></td>
            <td>
              <span class="entry-header">Результат:</span> <span [class.badge-gray]="task.result_id == 0" [class.badge-green]="task.result_id == 1" [class.badge-red]="task.result_id == 2">{{ result_text }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="entry-header">Стадия:</span> Первичный контакт
            </td>
            <td></td>
            <td>
              <span class="entry-header" style="width: 90px;">Комментарий:</span><span class="line-clamp line-clamp-2" style="font-style: italic;"> {{ task.comment }} </span>
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
  `]
})

export class RequestDigestComponent {
  public request: Request;
  result_text: string;
  task: Task;
  to: any;

  constructor(private _hubService: HubService, private _taskService: TaskService) { };

  ngOnInit() {
    this.task = this._taskService.getRandomTasks();
    this.result_text = this.getResultText();
  }

  select() {
    this.request.selected = !this.request.selected;
  }

  open() {
    this.request.selected = true;
    var tab_sys = this._hubService.getProperty('tab_sys');
    tab_sys.addTab('request', { request: this.request });
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
    switch (this.task.result_id) {
      case (0): {
        return 'Выполняется';
      }
      case (1): {
        return 'Успешно';
      }
      case (2): {
        return 'Не успешно';
      }
    }
    return '???';
  }
}
