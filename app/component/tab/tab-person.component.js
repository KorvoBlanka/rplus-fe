System.register(['angular2/core', '../../pipe/format-date.pipe', '../../service/analysis.service', '../../class/realty', '../../service/hub.service', '../../service/config.service', '../../service/realty.service', '../../service/request.service', '../../service/task.service', '../../service/history.service', '../../service/organisation.service', '../ui/ui-select.component', '../ui/ui-carousel.component', '../ui/ui-tag-block.component', '../ui/ui-tabs.component', '../ui/ui-tab.component', '../ui/ui-pie-chart.component', '../ui/ui-line-chart.component', '../ui/ui-bar-chart.component', '../digest/realty-digest.component', '../digest/request-digest.component', '../digest/history-digest.component', '../google-map.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, format_date_pipe_1, analysis_service_1, realty_1, hub_service_1, config_service_1, realty_service_1, request_service_1, task_service_1, history_service_1, organisation_service_1, ui_select_component_1, ui_carousel_component_1, ui_tag_block_component_1, ui_tabs_component_1, ui_tab_component_1, ui_pie_chart_component_1, ui_line_chart_component_1, ui_bar_chart_component_1, realty_digest_component_1, request_digest_component_1, history_digest_component_1, google_map_component_1;
    var TabPersonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (format_date_pipe_1_1) {
                format_date_pipe_1 = format_date_pipe_1_1;
            },
            function (analysis_service_1_1) {
                analysis_service_1 = analysis_service_1_1;
            },
            function (realty_1_1) {
                realty_1 = realty_1_1;
            },
            function (hub_service_1_1) {
                hub_service_1 = hub_service_1_1;
            },
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            },
            function (realty_service_1_1) {
                realty_service_1 = realty_service_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            },
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            },
            function (history_service_1_1) {
                history_service_1 = history_service_1_1;
            },
            function (organisation_service_1_1) {
                organisation_service_1 = organisation_service_1_1;
            },
            function (ui_select_component_1_1) {
                ui_select_component_1 = ui_select_component_1_1;
            },
            function (ui_carousel_component_1_1) {
                ui_carousel_component_1 = ui_carousel_component_1_1;
            },
            function (ui_tag_block_component_1_1) {
                ui_tag_block_component_1 = ui_tag_block_component_1_1;
            },
            function (ui_tabs_component_1_1) {
                ui_tabs_component_1 = ui_tabs_component_1_1;
            },
            function (ui_tab_component_1_1) {
                ui_tab_component_1 = ui_tab_component_1_1;
            },
            function (ui_pie_chart_component_1_1) {
                ui_pie_chart_component_1 = ui_pie_chart_component_1_1;
            },
            function (ui_line_chart_component_1_1) {
                ui_line_chart_component_1 = ui_line_chart_component_1_1;
            },
            function (ui_bar_chart_component_1_1) {
                ui_bar_chart_component_1 = ui_bar_chart_component_1_1;
            },
            function (realty_digest_component_1_1) {
                realty_digest_component_1 = realty_digest_component_1_1;
            },
            function (request_digest_component_1_1) {
                request_digest_component_1 = request_digest_component_1_1;
            },
            function (history_digest_component_1_1) {
                history_digest_component_1 = history_digest_component_1_1;
            },
            function (google_map_component_1_1) {
                google_map_component_1 = google_map_component_1_1;
            }],
        execute: function() {
            TabPersonComponent = (function () {
                function TabPersonComponent(_hubService, _configService, _realtyService, _requestService, _taskService, _analysisService, _historyService, _organisationService) {
                    var _this = this;
                    this._hubService = _hubService;
                    this._configService = _configService;
                    this._realtyService = _realtyService;
                    this._requestService = _requestService;
                    this._taskService = _taskService;
                    this._analysisService = _analysisService;
                    this._historyService = _historyService;
                    this._organisationService = _organisationService;
                    this.pane_hidden = false;
                    this.edit_enabled = false;
                    this.request_offer_type = 'sale';
                    this.lat = 48.480007;
                    this.lon = 135.054954;
                    this.zoom = 16;
                    this.ch1_data = [];
                    this.ch2_data = [];
                    this.ch3_data = [];
                    this.ch4_data = [];
                    this.organisations_opts = [
                        {
                            label: 'Частное лицо',
                            val: {
                                id: 0,
                                name: 'Частное лицо',
                                add_date: 0,
                                change_date: 0,
                            }
                        },
                        {
                            label: 'Агенство 1',
                            val: {
                                id: 1,
                                name: 'Агенство 1',
                                add_date: 1000000000,
                                change_date: 1300000000,
                            }
                        },
                    ];
                    this.orgs = _organisationService.getOrganisationList(1, 16);
                    setTimeout(function () { _this.tab.header = 'Контакт'; });
                }
                TabPersonComponent.prototype.log = function (e) {
                    console.log(e);
                };
                TabPersonComponent.prototype.parseFloat = function (v) {
                    return parseFloat(v);
                };
                TabPersonComponent.prototype.ngOnInit = function () {
                    this.person = this.tab.args.person;
                    this.calcSize();
                };
                TabPersonComponent.prototype.onResize = function (e) {
                    this.calcSize();
                };
                TabPersonComponent.prototype.calcSize = function () {
                    if (this.pane_hidden) {
                        this.pane_width = 0;
                    }
                    else {
                        this.pane_width = 420;
                    }
                    this.map_width = document.body.clientWidth - (30 * 2) - this.pane_width;
                    this.pane_height = document.body.clientHeight - 31;
                };
                TabPersonComponent.prototype.toggleLeftPane = function () {
                    this.pane_hidden = !this.pane_hidden;
                    this.calcSize();
                };
                TabPersonComponent.prototype.toggleEdit = function () {
                    this.edit_enabled = !this.edit_enabled;
                };
                TabPersonComponent.prototype.save = function () {
                    this.toggleEdit();
                };
                TabPersonComponent.prototype.offersSelected = function () {
                    this.getOffers(1, 16);
                };
                TabPersonComponent.prototype.requestsSelected = function () {
                    this.requests = this._requestService.getRequest(1, 16);
                };
                TabPersonComponent.prototype.analysisSelected = function () {
                    var a_data = this._analysisService.getObjAnalysis();
                    this.ch1_data = a_data.ch1_data;
                    this.ch1_data_v1 = a_data.ch1_data_v1;
                    this.ch2_data = a_data.ch2_data;
                    this.ch2_data_v1 = a_data.ch2_data_v1;
                    this.ch3_data = a_data.ch3_data;
                    this.ch3_data_v1 = a_data.ch3_data_v1;
                    this.ch3_data_v2 = a_data.ch3_data_v2;
                    this.ch4_data = [
                        ['media', 'подано'],
                        ['avito', 7],
                        ['из рук в руки', 4],
                        ['презент', 6],
                        ['фарпост', 8],
                        ['ВНХ', 6],
                    ];
                    this.ch4_data_v1 = 31;
                    this.ch4_data_v2 = 5000;
                };
                TabPersonComponent.prototype.historySelected = function () {
                    this.history_recs = this._historyService.getObjHistory();
                };
                TabPersonComponent.prototype.getOffers = function (page, per_page) {
                    this.offers = this._realtyService.getSimilarRealty(page, per_page);
                };
                TabPersonComponent.prototype.offer_search = function () {
                    this.getOffers(Math.floor(Math.random() * 4), 16);
                };
                TabPersonComponent.prototype.offer_search_keydown = function (e) {
                    if (e.keyCode == 13) {
                        this.offer_search();
                    }
                };
                TabPersonComponent.prototype.markerClick = function (r) {
                    console.log('markerClick');
                    console.log(r);
                    r.selected = !r.selected;
                    // scroll to object ???
                };
                TabPersonComponent.prototype.addPhone = function () {
                    this.person.phone.push({ s: '' });
                };
                TabPersonComponent.prototype.addEmail = function () {
                    this.person.email.push({ s: '' });
                };
                TabPersonComponent.prototype.createRequest = function () {
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    tab_sys.addTab('request', { request: null, person: this.person });
                };
                TabPersonComponent.prototype.toggleOffer = function (offer_type) {
                    this.request_offer_type = offer_type;
                    this.requests = this._requestService.getRequest(1, 16);
                };
                TabPersonComponent.prototype.createOffer = function () {
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    tab_sys.addTab('realty', { realty: null, person: this.person });
                };
                TabPersonComponent.prototype.getRealtyDigest = function (r) {
                    return realty_1.Realty.getDigest(r);
                };
                TabPersonComponent = __decorate([
                    core_1.Component({
                        selector: 'tab-person',
                        inputs: ['tab'],
                        pipes: [format_date_pipe_1.FormatDatePipe],
                        directives: [
                            realty_digest_component_1.RealtyDigestComponent,
                            request_digest_component_1.RequestDigestComponent,
                            history_digest_component_1.HistoryDigestComponent,
                            google_map_component_1.GoogleMapComponent,
                            google_map_component_1.GoogleMapMarkerComponent,
                            ui_select_component_1.UISelect,
                            ui_carousel_component_1.UICarousel,
                            ui_tag_block_component_1.UITagBlock,
                            ui_tabs_component_1.UITabs,
                            ui_tab_component_1.UITab,
                            ui_pie_chart_component_1.UIPieChart,
                            ui_line_chart_component_1.UILineChart,
                            ui_bar_chart_component_1.UIBarChart
                        ],
                        template: "\n\n      <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n        <span [ngClass]=\"{'icon-arrow-right': pane_hidden, 'icon-arrow-left': !pane_hidden}\"></span>\n      </div>\n\n      <div class=\"person\" (window:resize)=\"onResize($event)\">\n\n    <!-- \u041B\u0415\u0412\u0410\u042F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n        <div class=\"pane\" [hidden]=\"pane_hidden\" [style.width.px]=\"pane_width\">\n          <div class=\"header\">\n            <div class=\"header-label\">\n              {{ tab.header }}\n            </div>\n          </div>\n          <div class=\"person-prop\" [style.height]=\"pane_height\">\n\n            <div style=\"margin: 5px;\">\n\n              <div class=\"pull-container\">\n                <div class=\"font-sz-2 pull-left\">\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: \u0437\u0432\u043E\u043D\u043E\u043A<span class=\"color-g1\"><a href=\"\" target=\"_blank\"></a></span></div>\n                <div class=\"font-sz-1 color-g2 pull-right\"> {{ person.add_date | formatDate }} </div>\n              </div>\n\n              <hr>\n\n              <div class=\"pull-container\" style=\"margin: 0 10px;\">\n                <div class=\"pull-right\" [hidden]=\"edit_enabled\" (click)=\"toggleEdit()\"><a href=\"#\" >\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</a></div>\n                <div class=\"pull-right\" [hidden]=\"!edit_enabled\" (click)=\"save()\"><a href=\"#\" >\u0413\u043E\u0442\u043E\u0432\u043E</a></div>\n              </div>\n\n          <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n              <div class=\"edit-block\" [hidden]=\"!edit_enabled\" style=\"margin: 20px 10px;\">\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {id: 1, text: '\u0410\u0433\u0435\u043D\u0442 1_1'},\n                      {id: 2, text: '\u0410\u0433\u0435\u043D\u0442 1_2'},\n                      {id: 3, text: '\u0410\u0433\u0435\u043D\u0442 1_3'},\n                      {id: 4, text: '\u0410\u0433\u0435\u043D\u0442 1_4'},\n                      {id: 5, text: '\u0410\u0433\u0435\u043D\u0442 1_5'}\n                    ]\"\n                    [value]=\"{id: 0, text: '\u0410\u0433\u0435\u043D\u0442 1_1'}\"\n                    (valueChange)=\"log($event)\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0418\u043C\u044F</span>\n                  <input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"person.name\">\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D <a href=\"#\" (click)=\"addPhone()\"><span class=\"icon-add\"></span></a></span>\n                  <div class=\"array-container\">\n                    <input *ngFor=\"#phone of person.phone; #i = index\" type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"person.phone[i].s\">\n                  </div>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">e-mail <a href=\"#\" (click)=\"addEmail()\" ><span class=\"icon-add\"></span></a></span>\n                  <div class=\"array-container\">\n                    <input *ngFor=\"#email of person.email; #i = index\" type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"person.email[i].s\">\n                  </div>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"organisations_opts\"\n                    [label]=\"'\u0427\u0430\u0441\u0442\u043D\u043E\u0435 \u043B\u0438\u0446\u043E'\"\n                    (valueChange)=\"person.organisation=$event.val\"\n                  >\n                  </ui-select>\n\n                </div>\n\n                <br>\n\n                <div class=\"view-group\" style=\"flex-wrap: wrap;\">\n                  <span class=\"view-label\">\u0418\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</span>\n                  <textarea class=\"view-value text-value\" placeholder=\"\" [(ngModel)]=\"person.info\" style=\"text-align: left;\"></textarea>\n                </div>\n\n              </div>\n\n          <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n          <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n              <div class=\"view-block\" [hidden]=\"edit_enabled\" style=\"margin: 20px 10px;\">\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                  <span class=\"view-value\"> \u0410\u0433\u0435\u043D\u0442 1_1</span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0418\u043C\u044F</span>\n                  <span class=\"view-value\"> {{ person.name }}</span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D </span>\n                  <div class=\"array-container\">\n                    <span *ngFor=\"#phone of person.phone\" class=\"view-value\"> {{ phone.s }} </span>\n                  </div>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">e-mail</span>\n                  <div class=\"array-container\">\n                    <span *ngFor=\"#email of person.email\" class=\"view-value\"> {{ email.s }} </span>\n                  </div>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F</span>\n                  <span class=\"view-value\"> {{ person.organisation.name }}</span>\n                </div>\n\n                <br>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</span>\n                  <span class=\"view-value\" style=\"height: initial;\"> {{ person.info }} </span>\n                </div>\n\n              </div>\n\n          <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n\n              <div style=\"margin-bottom: 20px;\">\n                <div class=\"view-group\">\n                  <span class=\"icon-tag\"> \u0422\u044D\u0433\u0438</span>\n                </div>\n                <ui-tag-block\n                  [value] = \"person.tag\"\n                  (valueChange) = \"person.tag = $event.value\"\n                ></ui-tag-block>\n              </div>\n\n            </div>\n          </div>\n        </div>\n\n    <!-- \u041B\u0435\u0432\u0430\u044F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041A\u041E\u041D\u0415\u0426 -->\n    <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n        <div class=\"work-area\" [style.width.px]=\"map_width\">\n          <ui-tabs\n            [header_mode]=\"!pane_hidden\"\n          >\n            <ui-tab\n              [title]=\"'\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F'\"\n              (tabSelect)=\"offersSelected()\"\n            >\n\n              <div class=\"\" style=\"position: absolute; top: 15px; left: 15px; z-index: 1;\">\n                <div class=\"two-way-switch\">\n                  <div [class.active]=\"request_offer_type == 'sale'\" (click)=\"toggleOffer('sale')\">\u041F\u0440\u043E\u0434\u0430\u0436\u0430</div>\n                  <div [class.active]=\"request_offer_type == 'rent'\" (click)=\"toggleOffer('rent')\">\u0410\u0440\u0435\u043D\u0434\u0430</div>\n                </div>\n              </div>\n\n              <!-- \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0434\u0443\u043D\u0441\u0442\u0432\u043E, \u0441\u0432-\u0432\u043E right \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0438\u0437 HubService -->\n              <!-- TODO: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C -->\n              <div  style=\"position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;\" [style.right]=\"_hubService.shared_var['nb_width']\">\n                <div style=\"width: 330px; background-color: #fff;\">\n                  <div class=\"header\">\n                    <input type=\"text\" style=\"width: 280px; margin-left: 10px; border: none;\"\n                      (keydown)=\"offer_search_keydown($event)\"\n                     >\n                     <span class=\"icon-search\" style=\"margin-left: 10px; cursor: pointer;\"\n                       (click)=\"offer_search()\"\n                     ></span>\n                  </div>\n                  <div class=\"\" style=\"width: 100%; overflow-y: scroll;\" [style.height]=\"pane_height\">\n\n                    <div class=\"button\" (click)=\"createOffer()\">\n                      \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435\n                    </div>\n\n                    <reaty-digest *ngFor=\"#realty of offers\"\n                      [realty]=\"realty\"\n                      [compact]=\"true\"\n                     >\n                    </reaty-digest>\n                  </div>\n                </div>\n              </div>\n              <google-map [latitude]=\"lat\" [longitude]=\"lon\" [zoom]=\"zoom\">\n\n                <t *ngFor=\"#r of offers\">\n                <google-map-marker\n                  *ngIf=\"r._source.location\"\n                  (click)=\"markerClick(r)\"\n                  [is_selected]=\"r.selected\"\n                  [latitude]=\"parseFloat(r._source.location.lat)\"\n                  [longitude]=\"parseFloat(r._source.location.lon)\"\n                  [info_str]=\"getRealtyDigest(r)\">\n                  [icon_id]=\"1\"\n                </google-map-marker>\n                </t>\n\n              </google-map>\n            </ui-tab>\n\n            <ui-tab\n              [title]=\"'\u0417\u0430\u044F\u0432\u043A\u0438'\"\n              (tabSelect)=\"requestsSelected()\"\n            >\n              <div class=\"\" style=\"margin: 15px;\">\n                <div class=\"two-way-switch\">\n                  <div [class.active]=\"request_offer_type == 'sale'\" (click)=\"toggleOffer('sale')\">\u041F\u0440\u043E\u0434\u0430\u0436\u0430</div>\n                  <div [class.active]=\"request_offer_type == 'rent'\" (click)=\"toggleOffer('rent')\">\u0410\u0440\u0435\u043D\u0434\u0430</div>\n                </div>\n              </div>\n              <div class=\"\" style=\"max-width: 910px; overflow-y: scroll; \" [style.height]=\"pane_height\">\n\n                <div class=\"button\" (click)=\"createRequest()\">\n                  \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443\n                </div>\n\n                <request-digest *ngFor=\"#request of requests\"\n                  [request]=\"request\"\n                >\n                </request-digest>\n              </div>\n            </ui-tab>\n            <ui-tab [title]=\"'\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430'\"\n              (tabSelect)=\"analysisSelected()\"\n            >\n              <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"pane_height\">\n                <div style=\"padding: 15px;\">\n                  <div class=\"tile bg-gred fg-white\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon\">{{ ch1_data_v1 }}</span>\n                    </div>\n                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u0434\u0430\u0447</span>\n                  </div>\n                  <div class=\"chart-block\">\n                    <div class=\"chart-header bg-gred\">\n                      <span style=\"margin-left: 25px;\">\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C</span>\n                    </div>\n                    <div>\n                      <ui-pie-chart\n                        [title]=\"''\"\n                        [data]=\"ch1_data\"\n                      >\n                      </ui-pie-chart>\n                    </div>\n                  </div>\n                </div>\n\n                <div style=\"padding: 15px;\">\n\n                  <div style=\"float: left; display: flex; flex-direction: column;\">\n                    <div class=\"tile bg-gorange fg-white\" style=\"margin-bottom: 5px;\">\n                      <div class=\"tile-content iconic\">\n                          <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v1 }}</span>\n                      </div>\n                      <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439</span>\n                    </div>\n                    <div class=\"tile bg-gorange fg-white\" >\n                      <div class=\"tile-content iconic\">\n                          <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v2 }}</span>\n                      </div>\n                      <span class=\"tile-label\">\u041F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u0440\u0443\u0431.</span>\n                    </div>\n                  </div>\n\n                  <div class=\"chart-block\">\n                    <div class=\"chart-header bg-gorange\">\n                      <span style=\"margin-left: 25px;\">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</span>\n                    </div>\n                    <div>\n                      <ui-bar-chart\n                        [title]=\"''\"\n                        [data]=\"ch4_data\"\n                      >\n                      </ui-bar-chart>\n                    </div>\n                  </div>\n                </div>\n\n                <div style=\"padding: 15px;\">\n                  <div class=\"tile bg-gblue fg-white\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon\">{{ ch2_data_v1 }}</span>\n                    </div>\n                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u044F\u0432\u043E\u043A</span>\n                  </div>\n                  <div class=\"chart-block\">\n                    <div class=\"chart-header bg-gblue\">\n                      <span style=\"margin-left: 25px;\">\u0417\u0430\u044F\u0432\u043A\u0438</span>\n                    </div>\n                    <div>\n                      <ui-line-chart\n                        [title]=\"''\"\n                        [data]=\"ch2_data\"\n                      >\n                      </ui-line-chart>\n                    </div>\n                  </div>\n                </div>\n\n\n                <div style=\"padding: 15px;\">\n                  <div style=\"float: left; display: flex; flex-direction: column;\">\n                    <div class=\"tile bg-ggreen fg-white\" style=\"margin-bottom: 5px;\">\n                      <div class=\"tile-content iconic\">\n                        <span class=\"icon\">{{ ch3_data_v1 }}</span>\n                      </div>\n                      <span class=\"tile-label\">\u0423\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                    </div>\n                    <div class=\"tile bg-ggreen fg-white\">\n                      <div class=\"tile-content iconic\">\n                        <span class=\"icon\">{{ ch3_data_v2 }}</span>\n                      </div>\n                      <span class=\"tile-label\">\u041D\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                    </div>\n                  </div>\n                  <div class=\"chart-block\">\n                    <div class=\"chart-header bg-ggreen\">\n                      <span style=\"margin-left: 25px;\">\u041F\u043E\u043A\u0430\u0437\u044B</span>\n                    </div>\n                    <div>\n                      <ui-line-chart\n                        [title]=\"''\"\n                        [data]=\"ch3_data\"\n                      >\n                      </ui-line-chart>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n            </ui-tab>\n            <ui-tab\n              [title]=\"'\u0418\u0441\u0442\u043E\u0440\u0438\u044F'\"\n              (tabSelect)=\"historySelected()\"\n            >\n\n              <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"pane_height\">\n                <history-digest *ngFor=\"#record of history_recs\"\n                  [history_record]=\"record\"\n                >\n                </history-digest>\n              </div>\n\n            </ui-tab>\n          </ui-tabs>\n\n        </div>\n\n    <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041A\u041E\u041D\u0415\u0426 -->\n\n      </div>\n    ",
                        styles: ["\n\n      .pane {\n        float: left;\n        width: 370px;\n        height: 100%;\n        border-right: 1px solid #ccc;\n      }\n      .work-area {\n        float: left;\n        width: 100%;\n        height: 100%;\n      }\n      .tab-button {\n        width: 30px;\n        height: 30px;\n        text-align: center;\n        line-height: 30px;\n        font-size: 12px !important;\n        cursor: pointer;\n        color: #666;\n      }\n      .fixed-button {\n        position: fixed;\n        top: 0;\n        left: 0;\n      }\n      .sebm-google-map-container {\n        height: 100%;\n      }\n      .realty-prop {\n        overflow-y: scroll;\n      }\n\n      .view-group {\n        margin-bottom: 5px;\n\n        display: flex;\n        justify-content: space-between;\n\n      }\n      .view-label {\n        white-space: nowrap;\n        color: #bbb;\n\n        font-size: 15;\n      }\n      .view-value {\n        width: 100%;;\n        text-align: right;\n        color: #696969;\n        font-size: 15;\n\n        height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n      }\n      .edit-value {\n        width: 100%;;\n        text-align: right;\n        color: #696969;\n        font-size: 15;\n\n        height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n\n        border: none !important;\n        border-bottom: 1px solid #E5E5E5 !important;\n      }\n\n      .text-value {\n        height: 3rem;\n        border: 1px solid #E5E5E5 !important;\n      }\n\n      .edit-block > .view-group {\n        margin-bottom: 26px;\n      }\n\n      .tile-x {\n        margin-right: 10px;\n        width: 150px;\n        height: 150px;\n        color: #fff;\n        position: relative;\n      }\n\n\n      .tile {\n        margin: 0;\n        margin-right: 10px;\n      }\n      .icon {\n        line-height: 64px;\n      }\n      .tile-content.iconic .icon {\n        width: 128px;\n        margin-left: -64px;\n      }\n      .chart-block {\n        overflow:hidden;\n        border: 1px solid #e5e5e5;\n      }\n      .chart-header {\n        width: 100%;\n        height: 30px;\n        border-bottom: 1px solid #e5e5e5;\n        line-height: 30px;\n        color: #fff;\n      }\n\n      .array-container > span {\n        display: block;\n        margin-bottom: 5px;\n      }\n\n      .array-container > input {\n        margin-bottom: 5px;\n      }\n\n      .two-way-switch {\n        display: table;\n        border: 1px solid #3366cc;\n        cursor: pointer;\n      }\n\n      .two-way-switch > div {\n        display: table-cell;\n        width: 90px;\n        text-align: center;\n        padding: 5px 15px;\n        background-color: #fff;\n        color: #333;\n      }\n\n      .two-way-switch > div.active {\n        background-color: #3366cc;\n        color: #fff;\n      }\n\n      .button {\n        text-align: center;\n        padding: 5px 15px;\n        background-color: #3366cc;\n        color: #fff;\n        cursor: pointer;\n      }\n\n    "]
                    }), 
                    __metadata('design:paramtypes', [hub_service_1.HubService, config_service_1.ConfigService, realty_service_1.RealtyService, request_service_1.RequestService, task_service_1.TaskService, analysis_service_1.AnalysisService, history_service_1.HistoryService, organisation_service_1.OrganisationService])
                ], TabPersonComponent);
                return TabPersonComponent;
            })();
            exports_1("TabPersonComponent", TabPersonComponent);
        }
    }
});
//# sourceMappingURL=tab-person.component.js.map