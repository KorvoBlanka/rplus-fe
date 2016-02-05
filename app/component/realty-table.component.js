System.register(['angular2/core', '../pipe/format-date.pipe', '../service/hub.service', '../service/realty.service'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, format_date_pipe_1, hub_service_1, realty_service_1;
    var RealtyTableComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (format_date_pipe_1_1) {
                format_date_pipe_1 = format_date_pipe_1_1;
            },
            function (hub_service_1_1) {
                hub_service_1 = hub_service_1_1;
            },
            function (realty_service_1_1) {
                realty_service_1 = realty_service_1_1;
            }],
        execute: function() {
            RealtyTableComponent = (function () {
                function RealtyTableComponent(_elem, _hubService, _realtyService) {
                    this._elem = _elem;
                    this._hubService = _hubService;
                    this._realtyService = _realtyService;
                    this.content_height = 600;
                    this.page = 0;
                    this.fields = [
                        { id: 'status', label: '#', visible: true, sort: 0, val: function (r) { return r._source.state_code; } },
                        { id: 'photo', label: 'Фото', visible: true, sort: 0, val: function (r) { return r._source.main_photo_thumbnail; } },
                        { id: 'type', label: 'Тип', visible: true, sort: 0, val: function (r) { return r._source.type; } },
                        { id: 'city', label: 'Город', visible: false, sort: 0, val: function (r) { return r._source.city; } },
                        { id: 'address', label: 'Адрес', visible: true, sort: 0, val: function (r) { return r._source.addr_str; } },
                        { id: 'rooms', label: 'Комнаты', visible: true, sort: 0, val: function (r) {
                                var res = '';
                                if (r._source.rooms_offer_count) {
                                    res = r._source.rooms_offer_count;
                                }
                                if (r._source.rooms_count) {
                                    if (res)
                                        res += '/';
                                    res += r._source.rooms_count;
                                }
                                return res;
                            } },
                        { id: 'ap_scheme', label: 'Планировка', visible: true, sort: 0, val: function (r) { return r._source.ap_scheme; } },
                        { id: 'wall_type', label: 'Материал', visible: true, sort: 0, val: function (r) { return r._source.house_type; } },
                        { id: 'floors', label: 'Этаж', visible: true, sort: 0, val: function (r) {
                                var res = '';
                                if (r._source.floor) {
                                    res = r._source.floor;
                                }
                                if (r._source.floors_count) {
                                    if (res)
                                        res += '/';
                                    res += r._source.floors_count;
                                }
                                return res;
                            } },
                        { id: 'squares', label: 'Площадь', visible: true, sort: 0, val: function (r) {
                                return r._source.square_total;
                            } },
                        { id: 'import_source', label: 'Источник', visible: true, sort: 0, val: function (r) { return r._source.media; } },
                        { id: 'mediator', label: 'Предложение', visible: false, sort: 0, val: function (r) { return '~'; } },
                        { id: 'contact', label: 'Контакт', visible: true, sort: 0, val: function (r) { return '~'; } },
                        { id: 'price', label: 'Цена', visible: true, sort: 0, val: function (r) { return r._source.price; } },
                        { id: 'price_sq', label: 'Цена м2', visible: false, sort: 0, val: function (r) {
                                if (r._source.price && r._source.sqare_total) {
                                    return (r._source.price / r._source.sqare_total) + '';
                                }
                                return '';
                            } },
                        { id: 'mls', label: 'MLS', visible: false, sort: 0, val: function (r) { return ''; } },
                        { id: 'agent', label: 'Агент', visible: true, sort: 0, val: function (r) { return '~'; } },
                        { id: 'manager', label: 'Менеджер', visible: false, sort: 0, val: function (r) { return '~'; } },
                        { id: 'add_date', label: 'Добавлено', visible: true, sort: 0, val: function (r) { return moment(r._source.last_seen_date * 1000).format('DD.MM.YY hh:mm'); } },
                        { id: 'assign_date', label: 'Назначено', visible: false, sort: 0, val: function (r) { return moment(r._source.assign_date * 1000).format('DD.MM.YY hh:mm'); } },
                        { id: 'change_date', label: 'Изменено', visible: false, sort: 0, val: function (r) { return moment(r._source.change_date * 1000).format('DD.MM.YY hh:mm'); } },
                        { id: 'last_seen_date', label: 'Актуально', visible: true, sort: 0, val: function (r) { return moment(r._source.last_seen_date * 1000).format('DD.MM.YY hh:mm'); } }
                    ];
                }
                ;
                RealtyTableComponent.prototype.ngOnInit = function () {
                    this.calcSize();
                };
                RealtyTableComponent.prototype.onResize = function (e) {
                    this.calcSize();
                };
                RealtyTableComponent.prototype.scroll = function (e) {
                    if (e.currentTarget.scrollTop + this.content_height >= e.currentTarget.scrollHeight) {
                        this.page++;
                        var r = this._realtyService.getRealty(this.page, 10);
                        for (var i = 0; i < r.length; i++) {
                            this.realty.push(r[i]);
                        }
                    }
                };
                RealtyTableComponent.prototype.click = function (r) {
                    r.selected = !r.selected;
                };
                RealtyTableComponent.prototype.theader_contextmenu = function (e) {
                    var _this = this;
                    e.preventDefault();
                    e.stopPropagation();
                    this._hubService.shared_var['cm_px'] = e.pageX;
                    this._hubService.shared_var['cm_py'] = e.pageY;
                    this._hubService.shared_var['cm_hidden'] = false;
                    var items = [];
                    this.fields.forEach(function (f) {
                        items.push({ class: "entry_cb", disabled: false, value: f.visible, label: f.label, callback: function () { _this.toggle_visibility(f.id); } });
                    });
                    this._hubService.shared_var['cm_items'] = items;
                };
                RealtyTableComponent.prototype.toggle_visibility = function (field_id) {
                    this.fields.forEach(function (f) {
                        if (f.id == field_id) {
                            f.visible = !f.visible;
                        }
                    });
                };
                RealtyTableComponent.prototype.dblclick = function (r) {
                    r.selected = true;
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    tab_sys.addTab('realty', { realty: r });
                };
                RealtyTableComponent.prototype.calcSize = function () {
                    this.content_height = document.body.clientHeight - 115;
                };
                RealtyTableComponent.prototype.toggleSort = function (f) {
                    f.sort++;
                    if (f.sort > 2)
                        f.sort = 0;
                };
                RealtyTableComponent = __decorate([
                    core_1.Component({
                        selector: 'realty-table',
                        inputs: ['realty'],
                        template: "\n    <div class=\"realty-table-wrapper\" (window:resize)=\"onResize($event)\">\n      <div class=\"scroll-wrapper\" [style.height]=\"content_height\">\n        <table class=\"table table-striped\">\n          <thead\n            (contextmenu)=\"theader_contextmenu($event)\"\n            >\n            <tr>\n              <th *ngFor=\"#f of fields\"\n                [hidden]=\"!f.visible\"\n                [style.width.xx]=\"f.width\"\n                (click)=\"toggleSort(f)\"\n                >\n                {{ f.label }}\n                <span *ngIf=\"f.sort==0\" class=\"icon-none\">\n                </span>\n                <span *ngIf=\"f.sort==1\" class=\"icon-chevron-up\">\n                </span>\n                <span *ngIf=\"f.sort==2\" class=\"icon-chevron-down\">\n                </span>\n              </th>\n            </tr>\n          </thead>\n          <tbody\n            (scroll)=\"scroll($event)\"\n            >\n            <tr *ngFor=\"#r of realty\"\n              [class.selected]=\"r.selected\"\n              (click)=\"click(r)\"\n              (dblclick)=\"dblclick(r)\"\n              >\n              <td *ngFor=\"#f of fields\"\n                [hidden]=\"!f.visible\"\n                [style.width.xx]=\"f.width\"\n              >\n                <span *ngIf=\"f.id=='status'\" class=\"icon-{{ f.val(r) }}\">\n                </span>\n                <span *ngIf=\"f.id=='photo' && r._source.main_photo_thumbnail\" class=\"icon-photo\">\n                </span>\n                <span *ngIf=\"f.id!='status' && f.id!='photo'\">\n                {{ f.val(r) }}\n                </span>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  ",
                        styles: ["\n    .realty-table-wrapper {\n      padding-top: 115px;\n      height: 100%;\n      width: 100%;\n    }\n\n    .scroll-wrapper {\n      overflow: auto;\n    }\n\n    .table {\n      width: 100%;\n      font-size: 14;\n      border-collapse: collapse;\n    }\n\n    .table>thead>tr>th, .table>tbody>tr>th, .table>tfoot>tr>th, .table>thead>tr>td, .table>tbody>tr>td, .table>tfoot>tr>td {\n      padding: 5px;\n      font-weight: 200;\n      text-align: left;\n      vertical-align: top;\n      border-top: 1px solid #ddd;\n    }\n\n    .table>thead>tr>th, .table>thead>tr>td {\n      font-weight: 400;\n      border-bottom: 1px solid #ddd;\n      white-space: nowrap;\n\n      -webkit-touch-callout: none;\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n\n      cursor: pointer;\n    }\n\n    .table-striped>tbody>tr:nth-child(odd)>td, .table-striped>tbody>tr:nth-child(odd)>th {\n        background-color: #f9f9f9;\n    }\n\n    .table > tbody > tr.selected > td {\n      color: #fff;\n      background-color: #3366cc;\n    }\n\n  "],
                        pipes: [format_date_pipe_1.FormatDatePipe]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, hub_service_1.HubService, realty_service_1.RealtyService])
                ], RealtyTableComponent);
                return RealtyTableComponent;
            }());
            exports_1("RealtyTableComponent", RealtyTableComponent);
        }
    }
});
//# sourceMappingURL=realty-table.component.js.map