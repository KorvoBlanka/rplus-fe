System.register(['angular2/core', '../../service/hub.service', '../../service/config.service', '../../service/realty.service', '../../service/request.service', '../../service/task.service', '../../service/history.service', '../../service/photo.service', '../../service/settings/user.service', '../../service/analysis.service', '../../class/realty', '../../class/user', '../ui/ui-select.component', '../ui/ui-carousel.component', '../ui/ui-tag-block.component', '../ui/ui-tabs.component', '../ui/ui-tab.component', '../ui/ui-pie-chart.component', '../ui/ui-line-chart.component', '../ui/ui-bar-chart.component', '../digest/realty-digest.component', '../digest/request-digest.component', '../digest/history-digest.component', '../google-map.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, hub_service_1, config_service_1, realty_service_1, request_service_1, task_service_1, history_service_1, photo_service_1, user_service_1, analysis_service_1, realty_1, user_1, ui_select_component_1, ui_carousel_component_1, ui_tag_block_component_1, ui_tabs_component_1, ui_tab_component_1, ui_pie_chart_component_1, ui_line_chart_component_1, ui_bar_chart_component_1, realty_digest_component_1, request_digest_component_1, history_digest_component_1, google_map_component_1;
    var TabRealtyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            function (photo_service_1_1) {
                photo_service_1 = photo_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (analysis_service_1_1) {
                analysis_service_1 = analysis_service_1_1;
            },
            function (realty_1_1) {
                realty_1 = realty_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
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
            TabRealtyComponent = (function () {
                function TabRealtyComponent(_hubService, _configService, _realtyService, _requestService, _taskService, _analysisService, _historyService, _photoService, _userService) {
                    var _this = this;
                    this._hubService = _hubService;
                    this._configService = _configService;
                    this._realtyService = _realtyService;
                    this._requestService = _requestService;
                    this._taskService = _taskService;
                    this._analysisService = _analysisService;
                    this._historyService = _historyService;
                    this._photoService = _photoService;
                    this._userService = _userService;
                    this.agent = new user_1.User();
                    this.agent_opts = [];
                    this.pane_hidden = false;
                    this.edit_enabled = false;
                    this.lat = 48.480007;
                    this.lon = 135.054954;
                    this.zoom = 16;
                    this.ch1_data = [];
                    this.ch2_data = [];
                    this.ch3_data = [];
                    this.ch4_data = [];
                    this._userService.list("agent", "").then(function (agents) {
                        for (var i = 0; i < agents.length; i++) {
                            var a = agents[i];
                            _this.agent_opts.push({
                                val: a.id,
                                label: a.name
                            });
                        }
                    });
                    setTimeout(function () { _this.tab.header = 'Объект'; });
                }
                TabRealtyComponent.prototype.log = function (e) {
                    console.log(e);
                };
                TabRealtyComponent.prototype.parseFloat = function (v) {
                    return parseFloat(v);
                };
                TabRealtyComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.realty = this.tab.args.realty;
                    this._photoService.getPhotos(this.realty.id).then(function (photos) {
                        _this.photos = photos;
                    });
                    if (this.realty.location) {
                        this.lat = parseFloat(this.realty.location.lat);
                        this.lon = parseFloat(this.realty.location.lon);
                    }
                    if (this.realty.agent_id != null) {
                        this._userService.get(this.realty.agent_id).then(function (agent) {
                            _this.agent = agent;
                        });
                    }
                    this.calcSize();
                };
                TabRealtyComponent.prototype.onResize = function (e) {
                    this.calcSize();
                };
                TabRealtyComponent.prototype.calcSize = function () {
                    if (this.pane_hidden) {
                        this.pane_width = 0;
                    }
                    else {
                        this.pane_width = 420;
                    }
                    this.map_width = document.body.clientWidth - (30 * 2) - this.pane_width;
                    this.pane_height = document.body.clientHeight - 31;
                };
                TabRealtyComponent.prototype.toggleLeftPane = function () {
                    this.pane_hidden = !this.pane_hidden;
                    this.calcSize();
                };
                TabRealtyComponent.prototype.toggleEdit = function () {
                    this.edit_enabled = !this.edit_enabled;
                };
                TabRealtyComponent.prototype.agentChanged = function (e) {
                    var _this = this;
                    this.realty.agent_id = e.value.val;
                    if (this.realty.agent_id != null) {
                        this._userService.get(this.realty.agent_id).then(function (agent) {
                            _this.agent = agent;
                        });
                    }
                };
                TabRealtyComponent.prototype.save = function () {
                    var _this = this;
                    this._realtyService.updateRealty(this.realty).then(function (realty) {
                        console.log(realty);
                        _this.toggleEdit();
                    });
                };
                TabRealtyComponent.prototype.similarObjSelected = function () {
                    this.getSimilarRealty(1, 16);
                };
                TabRealtyComponent.prototype.requestsSelected = function () {
                    this.requests = this._requestService.getRequest(1, 16);
                };
                TabRealtyComponent.prototype.analysisSelected = function () {
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
                TabRealtyComponent.prototype.historySelected = function () {
                    this.history_recs = this._historyService.getObjHistory();
                };
                TabRealtyComponent.prototype.getSimilarRealty = function (page, per_page) {
                    this.similar_realty = this._realtyService.getSimilarRealty(page, per_page);
                };
                TabRealtyComponent.prototype.sim_search = function () {
                    this.getSimilarRealty(Math.floor(Math.random() * 4), 16);
                };
                TabRealtyComponent.prototype.sim_search_keydown = function (e) {
                    if (e.keyCode == 13) {
                        this.sim_search();
                    }
                };
                TabRealtyComponent.prototype.markerClick = function (r) {
                    console.log('markerClick');
                    console.log(r);
                    r.selected = !r.selected;
                    // scroll to object ???
                };
                TabRealtyComponent.prototype.getRealtyDigest = function (r) {
                    return realty_1.Realty.getDigest(r);
                };
                TabRealtyComponent = __decorate([
                    core_1.Component({
                        selector: 'tab-realty',
                        inputs: ['tab'],
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
                        template: "\n\n      <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n        <span [ngClass]=\"{'icon-arrow-right': pane_hidden, 'icon-arrow-left': !pane_hidden}\"></span>\n      </div>\n\n      <div class=\"realty\" (window:resize)=\"onResize($event)\">\n\n    <!-- \u041F\u0420\u0410\u0412\u0410\u042F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n        <div class=\"pane\" [hidden]=\"pane_hidden\" [style.width.px]=\"pane_width\">\n          <div class=\"header\">\n            <div class=\"header-label\">\n              {{ tab.header }}\n            </div>\n          </div>\n          <div class=\"realty-prop\" [style.height]=\"pane_height\">\n\n            <div style=\"margin: 5px;\">\n\n              <div class=\"pull-container\">\n                <div class=\"font-sz-2 pull-left\">\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: <span class=\"color-g1\"><a href=\"\" target=\"_blank\">{{ realty.source_media }}</a></span></div>\n                <div class=\"font-sz-1 color-g2 pull-right\"> {{realty.last_seen_date }} </div>\n              </div>\n              <div class=\"font-sz-2 color-g2 line-clamp line-clamp-2\" style=\"margin: 5px 5px 0 5px;\">{{ realty.source_media_text }}</div>\n\n              <hr>\n\n              <div class=\"pull-container\" style=\"margin: 0 10px;\">\n                <div class=\"pull-right\" [hidden]=\"edit_enabled\" (click)=\"toggleEdit()\"><a href=\"#\" >\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C</a></div>\n                <div class=\"pull-right\" [hidden]=\"!edit_enabled\" (click)=\"save()\"><a href=\"#\" >\u0413\u043E\u0442\u043E\u0432\u043E</a></div>\n              </div>\n\n          <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n              <div class=\"edit-block\" [hidden]=\"!edit_enabled\" style=\"margin: 20px 10px;\">\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"agent_opts\"\n                    [label]=\"agent.name\"\n                    (valueChange)=\"agentChanged($event)\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0421\u0442\u0430\u0442\u0443\u0441</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {val: 1, label: '\u041D\u0435 \u0430\u043A\u0442\u0438\u0432\u0435\u043D'},\n                      {val: 2, label: '\u0410\u043A\u0442\u0438\u0432\u0435\u043D'},\n                      {val: 3, label: '\u0412 \u0440\u0430\u0431\u043E\u0442\u0435'},\n                      {val: 4, label: '\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D'},\n                      {val: 5, label: '\u0410\u0440\u0445\u0438\u0432'}\n                    ]\"\n                    [label]=\"realty.state_code\"\n                    (valueChange)=\"realty.state_code = $event.value.label\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0421\u0442\u0430\u0434\u0438\u044F</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {val: 1, label: '\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442'},\n                      {val: 2, label: '\u0417\u0430\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430'},\n                      {val: 3, label: '\u041F\u043E\u043A\u0430\u0437'},\n                      {val: 4, label: '\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430'},\n                      {val: 5, label: '\u041F\u0440\u0438\u043D\u044F\u0442\u0438\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F'},\n                      {val: 6, label: '\u041F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u044B'},\n                      {val: 7, label: '\u0421\u0434\u0435\u043B\u043A\u0430'}\n                    ]\"\n                    [label]=\"'\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442'\"\n                    (valueChange)=\"realty.stage = $event.value.label\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0421\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A</span>\n                  <span class=\"view-value\"> \u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432\u0438\u0447</span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\"></span>\n                  <span class=\"view-value\"> (929)9292929, 929292</span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0414\u043E\u0433\u043E\u0432\u043E\u0440</span>\n                  <span class=\"view-value\"> #4242421365 \u043E\u0442 08.02.22</span>\n                </div>\n\n                <br>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {val: 1, label: '\u041F\u0440\u043E\u0434\u0430\u0436\u0430'},\n                      {val: 2, label: '\u0410\u0440\u0435\u043D\u0434\u0430'}\n                    ]\"\n                    [label]=\"realty.offer_type_code\"\n                    (valueChange)=\"realty.offer_type_code = $event.value.label\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0422\u0438\u043F \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {val: 1, label: '\u041A\u043E\u043C\u043D\u0430\u0442\u0430'},\n                      {val: 2, label: '\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430'},\n                      {val: 3, label: '\u0414\u043E\u043C'},\n                      {val: 4, label: '\u0422\u0430\u0443\u043D\u0445\u0430\u0443\u0441'}\n                    ]\"\n                    [label]=\"realty.type_code\"\n                    (valueChange)=\"realty.type_code = $event.value.label\"\n                  >\n                  </ui-select>\n                </div>\n\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0410\u0434\u0440\u0435\u0441</span>\n                  <input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"realty.address\">\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u041D\u043E\u043C\u0435\u0440</span>\n                  <input class=\"view-value edit-value vv-2\">/\n                  <input class=\"view-value edit-value vv-2\">\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u043A\u0430</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {val: 1, label: '\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u0430\u044F'},\n                      {val: 2, label: '\u041D\u043E\u0432\u0430\u044F'},\n                      {val: 3, label: '\u041E\u0431\u0449\u0435\u0436\u0438\u0442\u0438\u0435'},\n                      {val: 4, label: '\u0421\u0442\u0430\u043B\u0438\u043D\u043A\u0430'},\n                      {val: 5, label: '\u0423\u043B\u0443\u0447\u0448\u0435\u043D\u043D\u0430\u044F'},\n                      {val: 6, label: '\u0425\u0440\u0443\u0449\u0435\u0432\u043A\u0430'}\n                    ]\"\n                    [label]=\"realty.ap_scheme\"\n                    (valueChange)=\"realty.ap_scheme = $event.value.label\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0441\u0442\u0435\u043D</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {val: 1, label: '\u0411\u0440\u0443\u0441'},\n                      {val: 2, label: '\u0414\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439'},\n                      {val: 3, label: '\u041A\u0430\u0440\u043A\u0430\u0441\u043D\u043E-\u0437\u0430\u0441\u044B\u043F\u043D\u043E\u0439'},\n                      {val: 4, label: '\u041A\u0438\u0440\u043F\u0438\u0447\u043D\u044B\u0439'}\n                    ]\"\n                    [label]=\"realty.house_type\"\n                    (valueChange)=\"realty.house_type = $event.value.label\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u043E\u043C\u043D\u0430\u0442</span>\n                  <input type=\"number\" class=\"view-value edit-value vv-2\" [(ngModel)]=\"realty.rooms_offer_count\">/\n                  <input type=\"number\" class=\"view-value edit-value vv-2\" [(ngModel)]=\"realty.rooms_count\">\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0422\u0438\u043F \u043A\u043E\u043C\u043D\u0430\u0442\u044B</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {val: 1, label: '\u0418\u043A\u0430\u0440\u0443\u0441'},\n                      {val: 2, label: '\u041A\u0443\u0445\u043D\u044F-\u0433\u043E\u0441\u0442\u0438\u043D\u043D\u0430\u044F'},\n                      {val: 3, label: '\u0420\u0430\u0437\u0434\u0435\u043B\u044C\u043D\u044B\u0435'},\n                      {val: 4, label: '\u0421\u043C\u0435\u0436\u043D\u043E-\u0440\u0430\u0437\u0434\u0435\u043B\u044C\u043D\u044B\u0435'},\n                      {val: 5, label: '\u0421\u043C\u0435\u0436\u043D\u044B\u0435'},\n                      {val: 6, label: '\u0421\u0442\u0443\u0434\u0438\u044F'}\n                    ]\"\n                    [label]=\"realty.room_scheme\"\n                    (valueChange)=\"realty.room_scheme = $event.value.label\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u042D\u0442\u0430\u0436</span>\n                  <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"realty.floor\">/\n                  <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"realty.floors_count\">/\n                  <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"realty.levels_count\">\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u041F\u043B\u043E\u0449\u0430\u0434\u044C</span>\n                  <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"realty.square_total\">/\n                  <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"realty.square_living\">/\n                  <input class=\"view-value edit-value vv-3\" [(ngModel)]=\"realty.square_kitchen\">\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0411\u0430\u043B\u043A\u043E\u043D</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {val: 1, label: '\u0431\u0435\u0437 \u0431\u0430\u043B\u043A\u043E\u043D\u0430'},\n                      {val: 2, label: '\u0431\u0430\u043B\u043A\u043E\u043D'},\n                      {val: 3, label: '\u043B\u043E\u0434\u0436\u0438\u044F'},\n                      {val: 4, label: '2 \u0431\u0430\u043B\u043A\u043E\u043D\u0430'},\n                      {val: 5, label: '2 \u043B\u043E\u0434\u0436\u0438\u0438'},\n                      {val: 6, label: '\u0431\u0430\u043B\u043A\u043E\u043D \u0438 \u043B\u043E\u0434\u0436\u0438\u044F'},\n                      {val: 7, label: '\u0431\u0430\u043B\u043A\u043E\u043D \u0437\u0430\u0441\u0442\u0435\u043A\u043B\u0435\u043D'},\n                      {val: 8, label: '\u043B\u043E\u0434\u0436\u0438\u044F \u0437\u0430\u0441\u0442\u0435\u043A\u043B\u0435\u043D\u0430'}\n                    ]\"\n                    [label]=\"realty.balcony\"\n                    (valueChange)=\"realty.balcony = $event.value.label\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0421\u0430\u043D\u0443\u0437\u0435\u043B</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {val: 1, label: '\u0431\u0435\u0437 \u0443\u0434\u043E\u0431\u0441\u0442\u0432'},\n                      {val: 2, label: '\u0442\u0443\u0430\u043B\u0435\u0442'},\n                      {val: 3, label: '\u0441 \u0443\u0434\u043E\u0431\u0441\u0442\u0432\u0430\u043C\u0438'},\n                      {val: 4, label: '\u0434\u0443\u0448 \u0438 \u0442\u0443\u0430\u043B\u0435\u0442'},\n                      {val: 5, label: '2 \u0441\u043C\u0435\u0436\u043D\u044B\u0445 \u0441\u0430\u043D\u0443\u0437\u043B\u0430'},\n                      {val: 6, label: '2 \u0440\u0430\u0437\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u0441\u0430\u043D\u0443\u0437\u043B\u0430'},\n                      {val: 7, label: '\u0441\u0430\u043D\u0443\u0437\u0435\u043B \u0441\u043E\u0432\u043C\u0435\u0449\u0435\u043D\u043D\u044B\u0439'},\n                      {val: 8, label: '\u0441\u0430\u043D\u0443\u0437\u0435\u043B \u0440\u0430\u0437\u0434\u0435\u043B\u044C\u043D\u044B\u0439'}\n                    ]\"\n                    [value]=\"realty.bathroom\"\n                    (valueChange)=\"realty.bathroom = $event.value.label\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435</span>\n                  <ui-select class=\"view-value edit-value\"\n                    [values] = \"[\n                      {val: 1, label: '\u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0435\u043C\u043E\u043D\u0442'},\n                      {val: 2, label: '\u0441\u0434\u0435\u043B\u0430\u043D \u0440\u0435\u043C\u043E\u043D\u0442'},\n                      {val: 3, label: '\u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0441\u043A\u0438\u0439 \u0440\u0435\u043C\u043E\u043D\u0442'},\n                      {val: 4, label: '\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0440\u0435\u043C\u043E\u043D\u0442'},\n                      {val: 5, label: '\u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u043A\u043E\u0441\u043C. \u0440\u0435\u043C\u043E\u043D\u0442'},\n                      {val: 6, label: '\u043F\u043E\u0441\u043B\u0435 \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u0435\u0439'},\n                      {val: 7, label: '\u0435\u0432\u0440\u043E\u0440\u0435\u043C\u043E\u043D\u0442'},\n                      {val: 8, label: '\u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435'},\n                      {val: 9, label: '\u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E\u0435'}\n                    ]\"\n                    [label]=\"realty.condition\"\n                    (valueChange)=\"realty.condition = $event.value.label\"\n                  >\n                  </ui-select>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0426\u0435\u043D\u0430</span>\n                  <input class=\"view-value edit-value vv-2\" [(ngModel)]=\"realty.owner_price\">/\n                  <input class=\"view-value edit-value vv-2\" [(ngModel)]=\"realty.agency_price\">\n                </div>\n\n                <div class=\"view-group\" style=\"flex-wrap: wrap;\">\n                  <span class=\"view-label\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</span>\n                  <textarea class=\"view-value text-value\" placeholder=\"\" [(ngModel)]=\"realty.description\" style=\"text-align: left;\"></textarea>\n                </div>\n\n              </div>\n\n          <!-- \u0420\u0415\u0416\u0418\u041C \u0420\u0415\u0414\u0410\u041A\u0422\u0418\u0420\u041E\u0412\u0410\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n          <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n              <div class=\"view-block\" [hidden]=\"edit_enabled\" style=\"margin: 20px 10px;\">\n\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439</span>\n                  <span class=\"view-value\"> {{ agent.name }} </span>\n                </div>\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0421\u0442\u0430\u0442\u0443\u0441</span>\n                  <span class=\"view-value\"> {{ realty.state_code }} </span>\n                </div>\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0421\u0442\u0430\u0434\u0438\u044F</span>\n                  <span class=\"view-value\"> {{ realty.stage }} </span>\n                </div>\n                <div class=\"view-group\">\n                  <span class=\"view-label\">\u0421\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A</span>\n                  <span class=\"view-value\"> \u0418\u0432\u0430\u043D \u0418\u0432\u0430\u043D\u043E\u0432\u0438\u0447</span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\"></span>\n                  <span class=\"view-value\"> (929)9292929, 929292</span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0414\u043E\u0433\u043E\u0432\u043E\u0440</span>\n                  <span class=\"view-value\"> #4242421365 \u043E\u0442 08.02.22</span>\n                </div>\n\n                <br>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</span>\n                  <span class=\"view-value\"> {{ realty.offer_type_code }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0422\u0438\u043F \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u0438</span>\n                  <span class=\"view-value\"> {{ realty.type_code }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0410\u0434\u0440\u0435\u0441</span>\n                  <span class=\"view-value\"> {{ realty.address }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u043A\u0430</span>\n                  <span class=\"view-value\"> {{ realty.ap_scheme }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0441\u0442\u0435\u043D</span>\n                  <span class=\"view-value\"> {{ realty.house_type }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u043E\u043C\u043D\u0430\u0442</span>\n                  <span class=\"view-value\"> {{ realty.rooms_count }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0422\u0438\u043F \u043A\u043E\u043C\u043D\u0430\u0442</span>\n                  <span class=\"view-value\"> {{ realty.room_scheme }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u042D\u0442\u0430\u0436</span>\n                  <span class=\"view-value\"> {{ realty.floor }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u041F\u043B\u043E\u0449\u0430\u0434\u044C</span>\n                  <span class=\"view-value\"> {{ realty.sqare_total }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0411\u0430\u043B\u043A\u043E\u043D</span>\n                  <span class=\"view-value\"> {{ realty.balcony }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0421\u0430\u043D\u0443\u0437\u0435\u043B</span>\n                  <span class=\"view-value\"> {{ realty.bathroom }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435</span>\n                  <span class=\"view-value\"> {{ realty.condition }} </span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u0426\u0435\u043D\u0430</span>\n                  <span class=\"color-attention view-value\"> {{ realty.owner_price }} \u0442\u044B\u0441. \u0440\u0443\u0431.</span>\n                </div>\n\n                <div class=\"view-group\">\n                  <span class=\"view-label pull-left\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435</span>\n                  <span class=\"view-value\" style=\"height: initial;\"> {{ realty.description }} </span>\n                </div>\n\n              </div>\n\n          <!-- \u0420\u0415\u0416\u0418\u041C \u041E\u0422\u041E\u0411\u0420\u0410\u0416\u0415\u041D\u0418\u042F: \u041A\u041E\u041D\u0415\u0426 -->\n\n              <div style=\"margin-bottom: 20px;\">\n                <div class=\"view-group\">\n                  <span class=\"icon-tag\"> \u0422\u044D\u0433\u0438</span>\n                </div>\n                <ui-tag-block\n                  [value] = \"realty.tag\"\n                  (valueChange) = \"realty.tag = $event.value\"\n                ></ui-tag-block>\n              </div>\n\n              <div style=\"margin-bottom: 20px;\">\n                <div class=\"view-group\">\n                  <span class=\"icon-photo\"> \u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438</span>\n                </div>\n                <ui-carousel\n                  [photos] = \"photos\"\n                >\n                </ui-carousel>\n              </div>\n\n            </div>\n          </div>\n        </div>\n\n    <!-- \u041F\u0420\u0410\u0412\u0410\u042F \u0421\u0422\u0412\u041E\u0420\u041A\u0410: \u041A\u041E\u041D\u0415\u0426 -->\n    <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041D\u0410\u0427\u0410\u041B\u041E -->\n\n        <div class=\"work-area\" [style.width.px]=\"map_width\">\n          <ui-tabs\n            [header_mode]=\"!pane_hidden\"\n          >\n            <ui-tab\n              [title]=\"'\u041A\u0430\u0440\u0442\u0430'\"\n            >\n              <google-map [latitude]=\"lat\" [longitude]=\"lon\" [zoom]=\"zoom\">\n                <google-map-marker\n                  *ngIf=\"realty.location\"\n                  (click)=\"log($event)\"\n                  [latitude]=\"parseFloat(realty.location.lat)\"\n                  [longitude]=\"parseFloat(realty.location.lon)\"\n                  [info_str]=\"\">\n                </google-map-marker>\n              </google-map>\n            </ui-tab>\n\n            <ui-tab\n              [title]=\"'\u041F\u043E\u0445\u043E\u0436\u0438\u0435 \u043E\u0431\u044A\u0435\u043A\u0442\u044B'\"\n              (tabSelect)=\"similarObjSelected()\"\n            >\n              <!-- \u0441\u0438\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0434\u0443\u043D\u0441\u0442\u0432\u043E, \u0441\u0432-\u0432\u043E right \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u0438\u0437 HubService -->\n              <!-- TODO: \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u044D\u0442\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u043C -->\n              <div  style=\"position: absolute; top: -31px; z-index: 1; border-left: 1px solid #ccc;\" [style.right]=\"_hubService.shared_var['nb_width']\">\n                <div style=\"width: 330px; background-color: #fff;\">\n                  <div class=\"header\">\n                    <input type=\"text\" style=\"width: 280px; margin-left: 10px; border: none;\"\n                      (keydown)=\"sim_search_keydown($event)\"\n                     >\n                     <span class=\"icon-search\" style=\"margin-left: 10px; cursor: pointer;\"\n                       (click)=\"sim_search()\"\n                     ></span>\n                  </div>\n                  <div class=\"\" style=\"width: 100%; overflow-y: scroll;\" [style.height]=\"pane_height\">\n                    <reaty-digest *ngFor=\"#realty of similar_realty\"\n                      [realty]=\"realty\"\n                      [compact]=\"true\"\n                     >\n                    </reaty-digest>\n                  </div>\n                </div>\n              </div>\n              <google-map [latitude]=\"lat\" [longitude]=\"lon\" [zoom]=\"zoom\">\n\n                <t *ngFor=\"#r of similar_realty\">\n                <google-map-marker\n     \t            *ngIf=\"r.location\"\n                  (click)=\"markerClick(r)\"\n                  [is_selected]=\"r.selected\"\n                  [latitude]=\"parseFloat(r.location.lat)\"\n                  [longitude]=\"parseFloat(r.location.lon)\"\n                  [info_str]=\"getRealtyDigest(r)\">\n                  [icon_id]=\"1\"\n                </google-map-marker>\n                </t>\n\n                <google-map-marker\n                  *ngIf=\"realty.location\"\n                  (markerClick)=\"markerClick(realty)\"\n                  [latitude]=\"parseFloat(realty.location.lat)\"\n                  [longitude]=\"parseFloat(realty.location.lon)\"\n                  [info_str]=\"\"\n                >\n                </google-map-marker>\n              </google-map>\n            </ui-tab>\n            <ui-tab\n              [title]=\"'\u0417\u0430\u044F\u0432\u043A\u0438'\"\n              (tabSelect)=\"requestsSelected()\"\n            >\n              <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"pane_height\">\n                <request-digest *ngFor=\"#request of requests\"\n                  [request]=\"request\"\n                >\n                </request-digest>\n              </div>\n            </ui-tab>\n            <ui-tab [title]=\"'\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430'\"\n              (tabSelect)=\"analysisSelected()\"\n            >\n              <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"pane_height\">\n                <div style=\"padding: 15px;\">\n                  <div class=\"tile bg-gred fg-white\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon\">{{ ch1_data_v1 }}</span>\n                    </div>\n                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u0434\u0430\u0447</span>\n                  </div>\n                  <div class=\"chart-block\">\n                    <div class=\"chart-header bg-gred\">\n                      <span style=\"margin-left: 25px;\">\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C</span>\n                    </div>\n                    <div>\n                      <ui-pie-chart\n                        [title]=\"''\"\n                        [data]=\"ch1_data\"\n                      >\n                      </ui-pie-chart>\n                    </div>\n                  </div>\n                </div>\n\n                <div style=\"padding: 15px;\">\n\n                  <div style=\"float: left; display: flex; flex-direction: column;\">\n                    <div class=\"tile bg-gorange fg-white\" style=\"margin-bottom: 5px;\">\n                      <div class=\"tile-content iconic\">\n                          <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v1 }}</span>\n                      </div>\n                      <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439</span>\n                    </div>\n                    <div class=\"tile bg-gorange fg-white\" >\n                      <div class=\"tile-content iconic\">\n                          <span class=\"icon\" style=\"font-size: 48px;\">{{ ch4_data_v2 }}</span>\n                      </div>\n                      <span class=\"tile-label\">\u041F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u0440\u0443\u0431.</span>\n                    </div>\n                  </div>\n\n                  <div class=\"chart-block\">\n                    <div class=\"chart-header bg-gorange\">\n                      <span style=\"margin-left: 25px;\">\u0420\u0435\u043A\u043B\u0430\u043C\u0430</span>\n                    </div>\n                    <div>\n                      <ui-bar-chart\n                        [title]=\"''\"\n                        [data]=\"ch4_data\"\n                      >\n                      </ui-bar-chart>\n                    </div>\n                  </div>\n                </div>\n\n                <div style=\"padding: 15px;\">\n                  <div class=\"tile bg-gblue fg-white\">\n                    <div class=\"tile-content iconic\">\n                        <span class=\"icon\">{{ ch2_data_v1 }}</span>\n                    </div>\n                    <span class=\"tile-label\">\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u044F\u0432\u043E\u043A</span>\n                  </div>\n                  <div class=\"chart-block\">\n                    <div class=\"chart-header bg-gblue\">\n                      <span style=\"margin-left: 25px;\">\u0417\u0430\u044F\u0432\u043A\u0438</span>\n                    </div>\n                    <div>\n                      <ui-line-chart\n                        [title]=\"''\"\n                        [data]=\"ch2_data\"\n                      >\n                      </ui-line-chart>\n                    </div>\n                  </div>\n                </div>\n\n\n                <div style=\"padding: 15px;\">\n                  <div style=\"float: left; display: flex; flex-direction: column;\">\n                    <div class=\"tile bg-ggreen fg-white\" style=\"margin-bottom: 5px;\">\n                      <div class=\"tile-content iconic\">\n                        <span class=\"icon\">{{ ch3_data_v1 }}</span>\n                      </div>\n                      <span class=\"tile-label\">\u0423\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                    </div>\n                    <div class=\"tile bg-ggreen fg-white\">\n                      <div class=\"tile-content iconic\">\n                        <span class=\"icon\">{{ ch3_data_v2 }}</span>\n                      </div>\n                      <span class=\"tile-label\">\u041D\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E</span>\n                    </div>\n                  </div>\n                  <div class=\"chart-block\">\n                    <div class=\"chart-header bg-ggreen\">\n                      <span style=\"margin-left: 25px;\">\u041F\u043E\u043A\u0430\u0437\u044B</span>\n                    </div>\n                    <div>\n                      <ui-line-chart\n                        [title]=\"''\"\n                        [data]=\"ch3_data\"\n                      >\n                      </ui-line-chart>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n            </ui-tab>\n            <ui-tab\n              [title]=\"'\u0418\u0441\u0442\u043E\u0440\u0438\u044F'\"\n              (tabSelect)=\"historySelected()\"\n            >\n\n              <div class=\"\" style=\"max-width: 910px; overflow-y: scroll;\" [style.height]=\"pane_height\">\n                <history-digest *ngFor=\"#record of history_recs\"\n                  [history_record]=\"record\"\n                >\n                </history-digest>\n              </div>\n\n            </ui-tab>\n          </ui-tabs>\n\n        </div>\n\n    <!-- \u0420\u0410\u0411\u041E\u0427\u0410\u042F \u041E\u0411\u041B\u0410\u0421\u0422\u042C: \u041A\u041E\u041D\u0415\u0426 -->\n\n      </div>\n    ",
                        styles: ["\n\n      .pane {\n        float: left;\n        width: 370px;\n        height: 100%;\n        border-right: 1px solid #ccc;\n      }\n      .work-area {\n        float: left;\n        width: 100%;\n        height: 100%;\n      }\n      .tab-button {\n        width: 30px;\n        height: 30px;\n        text-align: center;\n        line-height: 30px;\n        font-size: 12px !important;\n        cursor: pointer;\n        color: #666;\n      }\n      .fixed-button {\n        position: fixed;\n        top: 0;\n        left: 0;\n      }\n      .sebm-google-map-container {\n        height: 100%;\n      }\n      .realty-prop {\n        overflow-y: scroll;\n      }\n\n      .view-group {\n        margin-bottom: 5px;\n\n        display: flex;\n        justify-content: space-between;\n\n      }\n      .view-label {\n        white-space: nowrap;\n        color: #bbb;\n\n        font-size: 15;\n      }\n      .view-value {\n        width: 100%;;\n        text-align: right;\n        color: #696969;\n        font-size: 15;\n\n        height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n      }\n      .edit-value {\n        width: 100%;;\n        text-align: right;\n        color: #696969;\n        font-size: 15;\n\n        height: 19px; /* \u043A\u043E\u0441\u0442\u044B\u043B\u044C */\n\n        border: none !important;\n        border-bottom: 1px solid #E5E5E5 !important;\n      }\n\n      .text-value {\n        height: 3rem;\n        border: 1px solid #E5E5E5 !important;\n      }\n\n      .edit-block > .view-group {\n        margin-bottom: 26px;\n      }\n\n      .tile-x {\n        margin-right: 10px;\n        width: 150px;\n        height: 150px;\n        color: #fff;\n        position: relative;\n      }\n\n\n      .tile {\n        margin: 0;\n        margin-right: 10px;\n      }\n      .icon {\n        line-height: 64px;\n      }\n      .tile-content.iconic .icon {\n        width: 128px;\n        margin-left: -64px;\n      }\n      .chart-block {\n        overflow:hidden;\n        border: 1px solid #e5e5e5;\n      }\n      .chart-header {\n        width: 100%;\n        height: 30px;\n        border-bottom: 1px solid #e5e5e5;\n        line-height: 30px;\n        color: #fff;\n      }\n    "]
                    }), 
                    __metadata('design:paramtypes', [hub_service_1.HubService, config_service_1.ConfigService, realty_service_1.RealtyService, request_service_1.RequestService, task_service_1.TaskService, analysis_service_1.AnalysisService, history_service_1.HistoryService, photo_service_1.PhotoService, user_service_1.UserService])
                ], TabRealtyComponent);
                return TabRealtyComponent;
            }());
            exports_1("TabRealtyComponent", TabRealtyComponent);
        }
    }
});
//# sourceMappingURL=tab-realty.component.js.map