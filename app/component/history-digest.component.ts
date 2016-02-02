import {Component} from 'angular2/core';

import {HubService} from '../service/hub.service'

import {HistoryRecord} from '../class/historyRecord';

@Component({
  selector: 'history-digest',
  inputs: ['history_record'],
  template: `
    <div class="billet"
    >

      <div style="display: flex; justify-content: space-between;">
        <span>Запись #{{ history_record.id }}</span>
        <span>11.11.15 11:29</span>
      </div>

      <table style="width: 100%;">
        <tbody style="vertical-align: top; font-size: 14; font-weight: 200;">
          <tr>
            <td width="24%">
              <span class="entry-header">Категория:</span><span style="font-weight: 400;"> {{ history_record.type }} </span>
            </td>
            <td width="42%">
              <span [class.hidden]="history_record.type_id == 2" class="entry-header">Поле:</span><span style="font-weight: 400;"> {{ history_record.property_name }} </span>
              <span [class.hidden]="history_record.type_id == 1" class="entry-header">Описание:</span><span style="font-weight: 400;"> {{ history_record.text }} </span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="entry-header">Пользователь:</span> <a href="#">  {{ history_record._user_name }} </a>
            </td>
            <td>
              <span [class.hidden]="history_record.type_id == 2" class="entry-header">Старое значение:</span> {{ history_record.old_val }}
            </td>
          </tr>
          <tr>
            <td>
            </td>
            <td>
              <span [class.hidden]="history_record.type_id == 2" class="entry-header">Новое значение:</span> {{ history_record.new_val }}
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
      width: 42%;
    }

    .entry-header {
      display: inline-block;
      width: 120px;
      color: #aaa;
    }
  `]
})

export class HistoryDigestComponent {
  public history_record: HistoryRecord;

  constructor(private _hubService: HubService) { };

  ngOnInit() {}

}
