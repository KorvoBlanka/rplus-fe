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
                RealtyTableComponent.prototype.dblclick = function (r) {
                    r.selected = true;
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    tab_sys.addTab('realty', { realty: r });
                };
                RealtyTableComponent.prototype.calcSize = function () {
                    this.content_height = document.body.clientHeight - 31 - 115;
                };
                RealtyTableComponent = __decorate([
                    core_1.Component({
                        selector: 'realty-table',
                        inputs: ['realty'],
                        template: "\n    <div class=\"table-wrapper\" (window:resize)=\"onResize($event)\">\n\n        <table class=\"table table-striped fixed_headers\">\n          <thead>\n            <tr>\n              <th>\n                #\n              </th>\n              <th>\n                \u0422\u0438\u043F\n              </th>\n              <th hidden>\n                \u0413\u043E\u0440\u043E\u0434\n              </th>\n              <th>\n                \u0410\u0434\u0440\u0435\u0441\n              </th>\n              <th>\n                \u041A\u043E\u043C\u043D\u0430\u0442\u044B\n              </th>\n              <th>\n                \u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u043A\u0430\n              </th>\n              <th>\n                \u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\n              </th>\n              <th>\n                \u042D\u0442\u0430\u0436\n              </th>\n              <th>\n                \u041F\u043B\u043E\u0449\u0430\u0434\u044C\n              </th>\n              <th hidden>\n                \u0418\u043C\u043F\u043E\u0440\u0442\n              </th>\n              <th hidden>\n                \u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435\n              </th>\n              <th>\n                \u041A\u043E\u043D\u0442\u0430\u043A\u0442\n              </th>\n              <th>\n                \u0426\u0435\u043D\u0430\n              </th>\n              <th hidden>\n                \u0426\u0435\u043D\u0430 2\u043C\n              </th>\n              <th hidden>\n                MLS\n              </th>\n              <th>\n                \u0410\u0433\u0435\u043D\u0442\n              </th>\n              <th>\n                \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E\n              </th>\n              <th>\n                \u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043E\n              </th>\n              <th>\n                \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u043E\n              </th>\n              <th>\n                \u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\n              </th>\n            </tr>\n          </thead>\n          <tbody\n            [style.height]=\"content_height\"\n            (scroll)=\"scroll($event)\"\n            >\n            <tr *ngFor=\"#r of realty\"\n              [class.selected]=\"r.selected\"\n              (click)=\"click(r)\"\n              (dblclick)=\"dblclick(r)\"\n              >\n              <td>\n                <span class=\"icon-square\"></span>\n              </td>\n              <td>\n                {{ r._source.type }}\n              </td>\n              <td hidden>\n                {{ r._source.city }}\n              </td>\n              <td>\n                {{ r._source.addr_str }}\n              </td>\n              <td>\n                {{ r._source.rooms_count }}\n              </td>\n              <td>\n                {{ r._source.ap_scheme }}\n              </td>\n              <td>\n                {{ r._source.house_type }}\n              </td>\n              <td>\n                {{ r._source.floor }}\n              </td>\n              <td>\n                {{ r._source.sqare_total }}\n              </td>\n              <td hidden>\n                -- import --\n              </td>\n              <td hidden>\n                -- ??? --\n              </td>\n              <td>\n                -- \u043A\u043E\u043D\u0442\u0430\u043A\u0442 --\n              </td>\n              <td>\n                {{ r._source.price }}\n              </td>\n              <td hidden>\n                -- \u0446\u0435\u043D\u0430 \u0437\u0430 \u043C2 --\n              </td>\n              <td hidden>\n                -- MLS --\n              </td>\n              <td>\n                -- \u0430\u0433\u0435\u043D\u0442 --\n              </td>\n              <td>\n                {{ r._source.add_date | formatDate }}\n              </td>\n              <td>\n                {{ r._source.assign_date | formatDate }}\n              </td>\n              <td>\n                {{ r._source.change_date | formatDate }}\n              </td>\n              <td>\n                {{ r._source.last_seen_date | formatDate }}\n              </td>\n            </tr>\n          </tbody>\n        </table>\n\n    </div>\n  ",
                        styles: ["\n    .table-wrapper {\n      padding-top: 115px;\n      height: 100%;\n      width: 100%;\n    }\n\n    .table {\n      width: 100%;\n    }\n\n    .table > tbody {\n      font-weight: 200;\n    }\n\n    .table > theader th {\n      font-weight: 600;\n    }\n\n    .table-striped>tbody>tr:nth-child(odd)>td, .table-striped>tbody>tr:nth-child(odd)>th {\n        background-color: #f9f9f9;\n    }\n\n    .table > tbody > tr.selected > td {\n      color: #fff;\n      background-color: #3366cc;\n    }\n\n    .fixed_headers {\n      table-layout: fixed;\n      border-collapse: collapse;\n    }\n\n    .fixed_headers thead {\n      background-color: #333333;\n      color: #fdfdfd;\n    }\n    .fixed_headers thead tr {\n      display: block;\n      position: relative;\n    }\n    .fixed_headers tbody {\n      display: block;\n      overflow: auto;\n      width: 100%;\n      height: 600px;\n    }\n    .fixed_headers th {\n\n    }\n    .fixed_headers th,\n    .fixed_headers td {\n      padding: 5px;\n      text-align: left;\n    }\n\n    .fixed_headers td:nth-child(1),\n    .fixed_headers th:nth-child(1) {\n      width: 24px;\n    }\n    .fixed_headers td:nth-child(2),\n    .fixed_headers th:nth-child(2) {\n      /* \u0442\u0438\u043F */\n      width: 110px;\n    }\n    .fixed_headers td:nth-child(3),\n    .fixed_headers th:nth-child(3) {\n      /* \u0433\u043E\u0440\u043E\u0434 */\n      width: 100px;\n    }\n    .fixed_headers td:nth-child(4),\n    .fixed_headers th:nth-child(4) {\n      /* \u0430\u0434\u0440\u0435\u0441 */\n      width: 200px;\n    }\n    .fixed_headers td:nth-child(5),\n    .fixed_headers th:nth-child(5) {\n      /* \u043A\u043E\u043C\u043D\u0430\u0442\u044B */\n      width: 80px;\n    }\n    .fixed_headers td:nth-child(6),\n    .fixed_headers th:nth-child(6) {\n      /* \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u043A\u0430 */\n      width: 125px;\n    }\n    .fixed_headers td:nth-child(7),\n    .fixed_headers th:nth-child(7) {\n      /* \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u043A\u0430 */\n      width: 125px;\n    }\n    .fixed_headers td:nth-child(8),\n    .fixed_headers th:nth-child(8) {\n      /* \u044D\u0442\u0430\u0436 */\n      width: 50px;\n    }\n    .fixed_headers td:nth-child(9),\n    .fixed_headers th:nth-child(9) {\n      /* \u043F\u043B\u043E\u0449\u0430\u0434\u044C */\n      width: 75px;\n    }\n    .fixed_headers td:nth-child(10),\n    .fixed_headers th:nth-child(10) {\n      /* \u0438\u043C\u043F\u043E\u0440\u0442 */\n      width: 120px;\n    }\n    .fixed_headers td:nth-child(11),\n    .fixed_headers th:nth-child(11) {\n      /* \u0438\u043C\u043F\u043E\u0440\u0442 */\n      width: 120px;\n    }\n    .fixed_headers td:nth-child(12),\n    .fixed_headers th:nth-child(12) {\n      /* \u043A\u043E\u043D\u0442\u0430\u043A\u0442 */\n      width: 120px;\n    }\n    .fixed_headers td:nth-child(13),\n    .fixed_headers th:nth-child(13) {\n      /* \u0446\u0435\u043D\u0430 */\n      width: 80px;\n    }\n    .fixed_headers td:nth-child(14),\n    .fixed_headers th:nth-child(14) {\n      /* \u0446\u0435\u043D\u0430 \u043C2 */\n      width: 80px;\n    }\n    .fixed_headers td:nth-child(15),\n    .fixed_headers th:nth-child(15) {\n      /* MLS */\n      width: 80px;\n    }\n    .fixed_headers td:nth-child(16),\n    .fixed_headers th:nth-child(16) {\n      /* \u0410\u0433\u0435\u043D\u0442 */\n      width: 120px;\n    }\n    .fixed_headers td:nth-child(16),\n    .fixed_headers th:nth-child(16) {\n      /* \u0410\u0433\u0435\u043D\u0442 */\n      width: 120px;\n    }\n    .fixed_headers td:nth-child(17),\n    .fixed_headers th:nth-child(17) {\n      /* \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E */\n      width: 100px;\n    }\n    .fixed_headers td:nth-child(18),\n    .fixed_headers th:nth-child(18) {\n      /* \u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043E */\n      width: 100px;\n    }\n    .fixed_headers td:nth-child(19),\n    .fixed_headers th:nth-child(19) {\n      /* \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u043E */\n      width: 100px;\n    }\n    .fixed_headers td:nth-child(20),\n    .fixed_headers th:nth-child(20) {\n      /* \u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E */\n      width: 100px;\n    }\n\n  "],
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