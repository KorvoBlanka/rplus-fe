System.register(['angular2/core', '../../service/realty.service', '../../service/config.service', '../../class/realty', '../ui/ui-select.component', '../realty-digest.component', '../realty-table.component', '../google-map.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, realty_service_1, config_service_1, realty_1, ui_select_component_1, realty_digest_component_1, realty_table_component_1, google_map_component_1;
    var TabListRealtyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (realty_service_1_1) {
                realty_service_1 = realty_service_1_1;
            },
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            },
            function (realty_1_1) {
                realty_1 = realty_1_1;
            },
            function (ui_select_component_1_1) {
                ui_select_component_1 = ui_select_component_1_1;
            },
            function (realty_digest_component_1_1) {
                realty_digest_component_1 = realty_digest_component_1_1;
            },
            function (realty_table_component_1_1) {
                realty_table_component_1 = realty_table_component_1_1;
            },
            function (google_map_component_1_1) {
                google_map_component_1 = google_map_component_1_1;
            }],
        execute: function() {
            TabListRealtyComponent = (function () {
                function TabListRealtyComponent(_elem, _realtyService, _configService) {
                    var _this = this;
                    this._elem = _elem;
                    this._realtyService = _realtyService;
                    this._configService = _configService;
                    this.table_mode = false;
                    this.map_draw_allowed = false;
                    this.pane_hidden = false;
                    this.realtys = [];
                    this.page = 1;
                    this.realtys = this._realtyService.getRealty(1, 32);
                    setTimeout(function () { _this.tab.header = 'realty list'; });
                }
                TabListRealtyComponent.prototype.parseFloat = function (v) {
                    return parseFloat(v);
                };
                TabListRealtyComponent.prototype.ngOnInit = function () {
                    this.list = this._elem.nativeElement.querySelector('.digest-list');
                    var c = this._configService.getConfig();
                    this.lat = c.map.lat;
                    this.lon = c.map.lon;
                    this.zoom = c.map.zoom;
                    this.calcSize();
                };
                TabListRealtyComponent.prototype.onResize = function (e) {
                    this.calcSize();
                };
                TabListRealtyComponent.prototype.toggleMode = function () {
                    this.table_mode = !this.table_mode;
                };
                TabListRealtyComponent.prototype.toggleDraw = function () {
                    this.map_draw_allowed = !this.map_draw_allowed;
                };
                TabListRealtyComponent.prototype.finishDraw = function (e) {
                    console.log('yay! finish');
                    //this.map_draw_allowed = false;
                    console.log(e);
                };
                TabListRealtyComponent.prototype.calcSize = function () {
                    if (this.pane_hidden) {
                        this.pane_width = 0;
                    }
                    else {
                        this.pane_width = 420;
                    }
                    this.map_width = document.body.clientWidth - (30 * 2) - this.pane_width;
                    this.pane_height = document.body.clientHeight - 31;
                };
                TabListRealtyComponent.prototype.toggleLeftPane = function () {
                    this.pane_hidden = !this.pane_hidden;
                    this.calcSize();
                };
                TabListRealtyComponent.prototype.select = function (r) {
                    if (r._source.location) {
                        this.lat = r._source.location.lat;
                        this.lon = r._source.location.lon;
                    }
                };
                TabListRealtyComponent.prototype.scroll = function (e) {
                    if (e.currentTarget.scrollTop + this.pane_height >= e.currentTarget.scrollHeight) {
                        this.page++;
                        var r = this._realtyService.getRealty(this.page, 10);
                        for (var i = 0; i < r.length; i++) {
                            this.realtys.push(r[i]);
                        }
                    }
                };
                TabListRealtyComponent.prototype.markerClick = function (r) {
                    console.log('markerClick');
                    console.log(r);
                    r.selected = !r.selected;
                    // scroll to object !?
                    // let get dirty!
                    if (r.selected) {
                        var e = this.list.querySelector('#r' + r._id);
                        this.list.scrollTop = e.offsetTop - e.clientHeight;
                    }
                };
                TabListRealtyComponent.prototype.getRealtyDigest = function (r) {
                    return realty_1.Realty.getDigest(r);
                };
                TabListRealtyComponent = __decorate([
                    core_1.Component({
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        selector: 'tab-list-realty',
                        inputs: ['tab'],
                        directives: [google_map_component_1.GoogleMapComponent, google_map_component_1.GoogleMapMarkerComponent, realty_digest_component_1.RealtyDigestComponent, realty_table_component_1.RealtyTableComponent, ui_select_component_1.UISelect],
                        template: "\n\n  <div class=\"search-form\" [class.table-mode]=\"table_mode\">\n    <div class=\"search-box\">\n      <input type=\"text\" class=\"\" placeholder=\"\" style=\"height: 28px; width: 100%;\">\n      <span class=\"icon-search\" style=\"position: absolute; right: 12px; top: 7px;\"></span>\n    </div>\n    <div class=\"tool-box\">\n\n      <div class=\"inline-select\">\n        <ui-select class=\"view-value edit-value\"\n          [values] = \"[\n            {id: 0, text: '\u0412\u0441\u0435'},\n            {id: 1, text: '\u041D\u0435 \u0430\u043A\u0442\u0438\u0432\u0435\u043D'},\n            {id: 2, text: '\u0410\u043A\u0442\u0438\u0432\u0435\u043D'},\n            {id: 3, text: '\u0412 \u0440\u0430\u0431\u043E\u0442\u0435'},\n            {id: 4, text: '\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D'},\n            {id: 5, text: '\u0410\u0440\u0445\u0438\u0432'}\n          ]\"\n          [value]=\"{id: 0, text: '\u0412\u0441\u0435'}\"\n          [config]=\"{icon: 'icon-square', draw_arrow: true}\"\n        >\n        </ui-select>\n      </div>\n      <div class=\"inline-select\">\n        <ui-select class=\"view-value edit-value\"\n          [values] = \"[\n            {id: 1, text: '\u0410\u0433\u0435\u043D\u0442 1_1'},\n            {id: 2, text: '\u0410\u0433\u0435\u043D\u0442 1_2'},\n            {id: 3, text: '\u0410\u0433\u0435\u043D\u0442 1_3'},\n            {id: 4, text: '\u0410\u0433\u0435\u043D\u0442 1_4'},\n            {id: 5, text: '\u0410\u0433\u0435\u043D\u0442 1_5'}\n          ]\"\n          [value]=\"{id: 0, text: '\u0410\u0433\u0435\u043D\u0442 1_1'}\"\n          [config]=\"{icon: 'icon-person', draw_arrow: true}\"\n        >\n        </ui-select>\n      </div>\n\n      <div class=\"inline-select\">\n        <ui-select class=\"view-value edit-value\"\n          [values] = \"[\n            {id: 0, text: '\u0412\u0441\u0435'},\n            {id: 1, icon: 'icon-circle tag-red', text: '\u041A\u0440\u0430\u0441\u043D\u044B\u0439'},\n            {id: 2, icon: 'icon-circle tag-orange', text: '\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439'},\n            {id: 3, icon: 'icon-circle tag-yellow', text: '\u0416\u0435\u043B\u0442\u044B\u0439'},\n            {id: 4, icon: 'icon-circle tag-green', text: '\u0417\u0435\u043B\u0435\u043D\u044B\u0439'},\n            {id: 5, icon: 'icon-circle tag-blue', text: '\u0413\u043E\u043B\u0443\u0431\u043E\u0439'},\n            {id: 6, icon: 'icon-circle tag-violet', text: '\u041B\u0438\u043B\u043E\u0432\u044B\u0439'},\n            {id: 7, icon: 'icon-circle tag-gray', text: '\u0421\u0435\u0440\u044B\u0439'}\n          ]\"\n          [value]=\"{id: 0, text: '\u0412\u0441\u0435'}\"\n          [config]=\"{icon: 'icon-tag', draw_arrow: true}\"\n        >\n        </ui-select>\n      </div>\n\n      <div class=\"inline-select\">\n        <ui-select class=\"view-value edit-value\"\n          [values] = \"[\n            {id: 1, text: '1 \u0434\u0435\u043D\u044C'},\n            {id: 2, text: '3 \u0434\u043D\u044F'},\n            {id: 3, text: '\u041D\u0435\u0434\u0435\u043B\u044F'},\n            {id: 4, text: '2 \u043D\u0435\u0434\u0435\u043B\u0438'},\n            {id: 5, text: '\u041C\u0435\u0441\u044F\u0446'},\n            {id: 6, text: '3 \u043C\u0435\u0441\u044F\u0446\u0430'},\n            {id: 7, text: '\u0412\u0441\u0435'}\n          ]\"\n          [value]=\"{id: 0, text: '3 \u043C\u0435\u0441\u044F\u0446\u0430'}\"\n          [config]=\"{icon: 'icon-month', draw_arrow: true}\"\n        >\n        </ui-select>\n      </div>\n\n      <div class=\"pull-right\">\n        <a (click)=\"toggleDraw()\" [hidden]=\"table_mode\">\n          <span\n            [ngClass]=\"{'icon-cancel': map_draw_allowed, 'icon-edit': !map_draw_allowed}\"\n            ></span>\n        </a>\n        <a (click)=\"toggleMode()\">\n          <span\n            [ngClass]=\"{'icon-globus': table_mode, 'icon-table': !table_mode}\"\n            ></span>\n        </a>\n      </div>\n    </div>\n  </div>\n\n  <realty-table\n    [hidden]=\"!table_mode\"\n    [realty]=\"realtys\"\n  >\n  </realty-table>\n\n  <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n    <span [ngClass]=\"{'icon-arrow-right': pane_hidden, 'icon-arrow-left': !pane_hidden}\"></span>\n  </div>\n\n  <div class=\"list-realty\"\n    [hidden]=\"table_mode\"\n    (window:resize)=\"onResize($event)\"\n    >\n    <div class=\"pane\" [hidden]=\"pane_hidden\" [style.width.px]=\"pane_width\">\n      <div class=\"header\"></div>\n      <div class=\"digest-list\"\n        (scroll)=\"scroll($event)\"\n        [attr.scrollTop]=\"scroll_pos\"\n        [style.height]=\"pane_height\"\n        >\n        <reaty-digest *ngFor=\"#realty of realtys\"\n          [realty]=\"realty\"\n          (click)=\"select(realty)\"\n          >\n        </reaty-digest>\n      </div>\n    </div>\n    <div class=\"work-area\" [style.width.px]=\"map_width\">\n      <google-map\n        [latitude]=\"lat\"\n        [longitude]=\"lon\"\n        [zoom]=\"zoom\"\n        [draw_allowed]=\"map_draw_allowed\"\n        (drawFinished)=\"finishDraw($event)\"\n        >\n        <t *ngFor=\"#r of realtys\">\n          <google-map-marker\n            *ngIf=\"r._source.location\"\n            (click)=\"markerClick(r)\"\n            [is_selected]=\"r.selected\"\n            [latitude]=\"parseFloat(r._source.location.lat)\"\n            [longitude]=\"parseFloat(r._source.location.lon)\"\n            [info_str]=\"getRealtyDigest(r)\"\n            >\n          </google-map-marker>\n        </t>\n      </google-map>\n    </div>\n  </div>\n  ",
                        styles: ["\n    .search-form {\n      position: absolute;\n      width: 45%;\n      margin-left: 27.5%;\n      margin-top: 10px;\n      background: #fff;\n      z-index: 1;\n      border: 1px solid #eee;\n    }\n\n    .search-form.table-mode {\n      border: 1px solid #fff;\n    }\n\n    .tool-box {\n      height: 30px;\n      margin: 0 12px;\n    }\n\n    .search-box {\n      position: relative;\n      margin: 12px;\n      margin-bottom: 8px;\n    }\n\n    .list-realty {\n      position: relative;\n    }\n\n    .digest-list {\n      overflow-x: scroll;\n    }\n\n    .pane {\n      float: left;\n      width: 370px;\n      height: 100%;\n      border-right: 1px solid #ccc;\n    }\n\n    .work-area {\n      float: left;\n      width: 77%;\n      height: 100%;\n    }\n\n    .fixed-button {\n      position: fixed;\n      top: 0;\n      left: 0;\n    }\n\n    .inline-select {\n      display: inline-block;\n      height: 20px;\n      padding: 0 15px;\n      font-size: 14;\n      color: #666;\n    }\n    "]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, realty_service_1.RealtyService, config_service_1.ConfigService])
                ], TabListRealtyComponent);
                return TabListRealtyComponent;
            })();
            exports_1("TabListRealtyComponent", TabListRealtyComponent);
        }
    }
});
//# sourceMappingURL=tab-list-realty.component.js.map