import {
  Component,
  ElementRef
} from 'angular2/core';

import {FormatDatePipe} from '../pipe/format-date.pipe';

import {HubService} from '../service/hub.service'
import {RealtyService} from '../service/realty.service';

import {Realty} from '../class/realty';


@Component({
  selector: 'realty-table',
  inputs: ['realty'],

  template: `
    <div class="table-wrapper" (window:resize)="onResize($event)">

        <table class="table table-striped fixed_headers">
          <thead>
            <tr>
              <th>
                #
              </th>
              <th>
                Тип
              </th>
              <th hidden>
                Город
              </th>
              <th>
                Адрес
              </th>
              <th>
                Комнаты
              </th>
              <th>
                Планировка
              </th>
              <th>
                Материал
              </th>
              <th>
                Этаж
              </th>
              <th>
                Площадь
              </th>
              <th hidden>
                Импорт
              </th>
              <th hidden>
                Предложение
              </th>
              <th>
                Контакт
              </th>
              <th>
                Цена
              </th>
              <th hidden>
                Цена 2м
              </th>
              <th hidden>
                MLS
              </th>
              <th>
                Агент
              </th>
              <th>
                Добавлено
              </th>
              <th>
                Назначено
              </th>
              <th>
                Изменено
              </th>
              <th>
                Актуально
              </th>
            </tr>
          </thead>
          <tbody
            [style.height]="content_height"
            (scroll)="scroll($event)"
            >
            <tr *ngFor="#r of realty"
              [class.selected]="r.selected"
              (click)="click(r)"
              (dblclick)="dblclick(r)"
              >
              <td>
                <span class="icon-square"></span>
              </td>
              <td>
                {{ r._source.type }}
              </td>
              <td hidden>
                {{ r._source.city }}
              </td>
              <td>
                {{ r._source.addr_str }}
              </td>
              <td>
                {{ r._source.rooms_count }}
              </td>
              <td>
                {{ r._source.ap_scheme }}
              </td>
              <td>
                {{ r._source.house_type }}
              </td>
              <td>
                {{ r._source.floor }}
              </td>
              <td>
                {{ r._source.sqare_total }}
              </td>
              <td hidden>
                -- import --
              </td>
              <td hidden>
                -- ??? --
              </td>
              <td>
                -- контакт --
              </td>
              <td>
                {{ r._source.price }}
              </td>
              <td hidden>
                -- цена за м2 --
              </td>
              <td hidden>
                -- MLS --
              </td>
              <td>
                -- агент --
              </td>
              <td>
                {{ r._source.add_date | formatDate }}
              </td>
              <td>
                {{ r._source.assign_date | formatDate }}
              </td>
              <td>
                {{ r._source.change_date | formatDate }}
              </td>
              <td>
                {{ r._source.last_seen_date | formatDate }}
              </td>
            </tr>
          </tbody>
        </table>

    </div>
  `,
  styles: [`
    .table-wrapper {
      padding-top: 115px;
      height: 100%;
      width: 100%;
    }

    .table {
      width: 100%;
    }

    .table > tbody {
      font-weight: 200;
    }

    .table > theader th {
      font-weight: 600;
    }

    .table-striped>tbody>tr:nth-child(odd)>td, .table-striped>tbody>tr:nth-child(odd)>th {
        background-color: #f9f9f9;
    }

    .table > tbody > tr.selected > td {
      color: #fff;
      background-color: #3366cc;
    }

    .fixed_headers {
      table-layout: fixed;
      border-collapse: collapse;
    }

    .fixed_headers thead {
      background-color: #333333;
      color: #fdfdfd;
    }
    .fixed_headers thead tr {
      display: block;
      position: relative;
    }
    .fixed_headers tbody {
      display: block;
      overflow: auto;
      width: 100%;
      height: 600px;
    }
    .fixed_headers th {

    }
    .fixed_headers th,
    .fixed_headers td {
      padding: 5px;
      text-align: left;
    }

    .fixed_headers td:nth-child(1),
    .fixed_headers th:nth-child(1) {
      width: 24px;
    }
    .fixed_headers td:nth-child(2),
    .fixed_headers th:nth-child(2) {
      /* тип */
      width: 110px;
    }
    .fixed_headers td:nth-child(3),
    .fixed_headers th:nth-child(3) {
      /* город */
      width: 100px;
    }
    .fixed_headers td:nth-child(4),
    .fixed_headers th:nth-child(4) {
      /* адрес */
      width: 200px;
    }
    .fixed_headers td:nth-child(5),
    .fixed_headers th:nth-child(5) {
      /* комнаты */
      width: 80px;
    }
    .fixed_headers td:nth-child(6),
    .fixed_headers th:nth-child(6) {
      /* планировка */
      width: 125px;
    }
    .fixed_headers td:nth-child(7),
    .fixed_headers th:nth-child(7) {
      /* планировка */
      width: 125px;
    }
    .fixed_headers td:nth-child(8),
    .fixed_headers th:nth-child(8) {
      /* этаж */
      width: 50px;
    }
    .fixed_headers td:nth-child(9),
    .fixed_headers th:nth-child(9) {
      /* площадь */
      width: 75px;
    }
    .fixed_headers td:nth-child(10),
    .fixed_headers th:nth-child(10) {
      /* импорт */
      width: 120px;
    }
    .fixed_headers td:nth-child(11),
    .fixed_headers th:nth-child(11) {
      /* импорт */
      width: 120px;
    }
    .fixed_headers td:nth-child(12),
    .fixed_headers th:nth-child(12) {
      /* контакт */
      width: 120px;
    }
    .fixed_headers td:nth-child(13),
    .fixed_headers th:nth-child(13) {
      /* цена */
      width: 80px;
    }
    .fixed_headers td:nth-child(14),
    .fixed_headers th:nth-child(14) {
      /* цена м2 */
      width: 80px;
    }
    .fixed_headers td:nth-child(15),
    .fixed_headers th:nth-child(15) {
      /* MLS */
      width: 80px;
    }
    .fixed_headers td:nth-child(16),
    .fixed_headers th:nth-child(16) {
      /* Агент */
      width: 120px;
    }
    .fixed_headers td:nth-child(16),
    .fixed_headers th:nth-child(16) {
      /* Агент */
      width: 120px;
    }
    .fixed_headers td:nth-child(17),
    .fixed_headers th:nth-child(17) {
      /* Добавлено */
      width: 100px;
    }
    .fixed_headers td:nth-child(18),
    .fixed_headers th:nth-child(18) {
      /* Назначено */
      width: 100px;
    }
    .fixed_headers td:nth-child(19),
    .fixed_headers th:nth-child(19) {
      /* Изменено */
      width: 100px;
    }
    .fixed_headers td:nth-child(20),
    .fixed_headers th:nth-child(20) {
      /* Актуально */
      width: 100px;
    }

  `],
  pipes: [FormatDatePipe]
})

export class RealtyTableComponent {
    public realty: Realty[];

    content_height: number = 600;
    page: number = 0;
    to: any;

    constructor(private _elem: ElementRef, private _hubService: HubService, private _realtyService: RealtyService) {};

    ngOnInit() {
      this.calcSize();
    }

    onResize(e) {
      this.calcSize();
    }

    scroll(e) {
      if (e.currentTarget.scrollTop + this.content_height >= e.currentTarget.scrollHeight) {
        this.page ++;
        var r = this._realtyService.getRealty(this.page, 10);
        for (var i = 0; i < r.length; i++) {
          this.realty.push(r[i])
        }
      }
    }

    click(r: Realty) {
      r.selected = !r.selected;
    }

    dblclick(r: Realty) {
      r.selected = true;
      var tab_sys = this._hubService.getProperty('tab_sys');
      tab_sys.addTab('realty', { realty: r });
    }

    calcSize() {
      this.content_height = document.body.clientHeight - 31 - 115;
    }
}
