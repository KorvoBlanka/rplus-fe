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
    <div class="realty-table-wrapper" (window:resize)="onResize($event)">
      <div class="scroll-wrapper" [style.height]="content_height">
        <table class="table table-striped">
          <thead
            (contextmenu)="theader_contextmenu($event)"
            >
            <tr>
              <th *ngFor="#f of fields"
                [hidden]="!f.visible"
                [style.width.xx]="f.width"
                (click)="toggleSort(f)"
                >
                {{ f.label }}
                <span *ngIf="f.sort==0" class="icon-none">
                </span>
                <span *ngIf="f.sort==1" class="icon-chevron-up">
                </span>
                <span *ngIf="f.sort==2" class="icon-chevron-down">
                </span>
              </th>
            </tr>
          </thead>
          <tbody
            (scroll)="scroll($event)"
            >
            <tr *ngFor="#r of realty"
              [class.selected]="r.selected"
              (click)="click(r)"
              (dblclick)="dblclick(r)"
              >
              <td *ngFor="#f of fields"
                [hidden]="!f.visible"
                [style.width.xx]="f.width"
              >
                <span *ngIf="f.id=='status'" class="icon-{{ f.val(r) }}">
                </span>
                <span *ngIf="f.id=='photo' && r._source.main_photo_thumbnail" class="icon-photo">
                </span>
                <span *ngIf="f.id!='status' && f.id!='photo'">
                {{ f.val(r) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .realty-table-wrapper {
      padding-top: 115px;
      height: 100%;
      width: 100%;
    }

    .scroll-wrapper {
      overflow: auto;
    }

    .table {
      width: 100%;
      font-size: 14;
      border-collapse: collapse;
    }

    .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {
      padding: 5px;
      font-weight: 200;
      text-align: left;
      vertical-align: top;
      border-top: 1px solid #ddd;
    }

    .table>thead>tr>th, .table>thead>tr>td {
      font-weight: 400;
      border-bottom: 1px solid #ddd;
      white-space: nowrap;

      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      cursor: pointer;
    }

    .table-striped>tbody>tr:nth-child(odd)>td, .table-striped>tbody>tr:nth-child(odd)>th {
        background-color: #f9f9f9;
    }

    .table > tbody > tr.selected > td {
      color: #fff;
      background-color: #3366cc;
    }

  `],
  pipes: [FormatDatePipe]
})

export class RealtyTableComponent {
    public realty: Realty[];

    content_height: number = 600;
    page: number = 0;
    to: any;

    private fields = [
      { id: 'status', label: '#', visible: true, sort: 0, val: (r: Realty) => { return r._source.state_code; } },
      { id: 'photo', label: 'Фото', visible: true, sort: 0, val: (r: Realty) => { return r._source.main_photo_thumbnail; } },
      { id: 'type', label: 'Тип', visible: true, sort: 0, val: (r: Realty) => { return r._source.type; } },
      { id: 'city', label: 'Город', visible: false, sort: 0, val: (r: Realty) => { return r._source.city; } },
      { id: 'address', label: 'Адрес', visible: true, sort: 0, val: (r: Realty) => { return r._source.addr_str; } },
      { id: 'rooms', label: 'Комнаты', visible: true, sort: 0, val: (r: Realty) => {
        var res = '';
        if (r._source.rooms_offer_count) {
          res = r._source.rooms_offer_count;
        }
        if (r._source.rooms_count) {
          if (res) res += '/'
          res += r._source.rooms_count;
        }
        return res;
      } },
      { id: 'ap_scheme', label: 'Планировка', visible: true, sort: 0, val: (r: Realty) => { return r._source.ap_scheme; } },
      { id: 'wall_type', label: 'Материал', visible: true, sort: 0, val: (r: Realty) => { return r._source.house_type; } },
      { id: 'floors', label: 'Этаж', visible: true, sort: 0, val: (r: Realty) => {
        var res = '';
        if (r._source.floor) {
          res = r._source.floor;
        }
        if (r._source.floors_count) {
          if (res) res += '/'
          res += r._source.floors_count;
        }
        return res;
      } },
      { id: 'squares', label: 'Площадь', visible: true, sort: 0, val: (r: Realty) => {

        return r._source.square_total;
      } },
      { id: 'import_source', label: 'Источник', visible: true, sort: 0, val: (r: Realty) => { return r._source.media; } },
      { id: 'mediator', label: 'Предложение', visible: false, sort: 0, val: (r: Realty) => { return '~' } },
      { id: 'contact', label: 'Контакт', visible: true, sort: 0, val: (r: Realty) => { return '~' } },
      { id: 'price', label: 'Цена', visible: true, sort: 0, val: (r: Realty) => { return r._source.price; } },
      { id: 'price_sq', label: 'Цена м2', visible: false, sort: 0, val: (r: Realty) => {
        if (r._source.price && r._source.sqare_total) {
          return (r._source.price / r._source.sqare_total) + '';
        }
        return '';
      } },
      { id: 'mls', label: 'MLS', visible: false, sort: 0, val: (r: Realty) => { return '' } },
      { id: 'agent', label: 'Агент', visible: true, sort: 0, val: (r: Realty) => { return '~' } },
      { id: 'manager', label: 'Менеджер', visible: false, sort: 0, val: (r: Realty) => { return '~' } },

      { id: 'reqests', label: 'Заявки', visible: false, sort: 0, val: (r: Realty) => { return '10' } },
      { id: 'click_count', label: 'Кол-во кликов', visible: false, sort: 0, val: (r: Realty) => { return '100' } },
      { id: 'progress', label: 'Прогресс', visible: false, sort: 0, val: (r: Realty) => { return '50%' } },

      { id: 'add_date', label: 'Добавлено', visible: true, sort: 0, val: (r: Realty) => { return moment(r._source.last_seen_date * 1000).format('DD.MM.YY hh:mm') } },
      { id: 'assign_date', label: 'Назначено', visible: false, sort: 0, val: (r: Realty) => { return moment(r._source.assign_date * 1000).format('DD.MM.YY hh:mm') } },
      { id: 'change_date', label: 'Изменено', visible: false, sort: 0, val: (r: Realty) => { return moment(r._source.change_date * 1000).format('DD.MM.YY hh:mm') } },
      { id: 'last_seen_date', label: 'Актуально', visible: true, sort: 0, val: (r: Realty) => { return moment(r._source.last_seen_date * 1000).format('DD.MM.YY hh:mm') } }
    ];

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

    theader_contextmenu(e) {
      e.preventDefault();
      e.stopPropagation();
      this._hubService.shared_var['cm_px'] = e.pageX;
      this._hubService.shared_var['cm_py'] = e.pageY;

      let items = [];

      this.fields.forEach(f => {
        items.push(
          {class: "entry_cb", disabled: false, value: f.visible, label: f.label, callback: () => {this.toggle_visibility(f.id)}}
        );
      })

      this._hubService.shared_var['cm_items'] = items;
      this._hubService.shared_var['cm_hidden'] = false;
    }

    toggle_visibility(field_id: string) {
      this.fields.forEach(f => {
        if (f.id == field_id) {
          f.visible = !f.visible;
        }
      });
    }

    dblclick(r: Realty) {
      r.selected = true;
      var tab_sys = this._hubService.getProperty('tab_sys');
      tab_sys.addTab('realty', { realty: r });
    }

    calcSize() {
      this.content_height = document.body.clientHeight - 115;
    }

    toggleSort(f) {
      f.sort ++;
      if (f.sort > 2) f.sort = 0;
    }
}
