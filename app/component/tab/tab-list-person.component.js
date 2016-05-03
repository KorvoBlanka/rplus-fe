System.register(['angular2/core', '../../service/hub.service', '../../service/config.service', '../../service/person.service', '../../class/person', '../ui/ui-select.component', '../digest/person-digest.component'], function(exports_1, context_1) {
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
    var core_1, hub_service_1, config_service_1, person_service_1, person_1, ui_select_component_1, person_digest_component_1;
    var TabListPersonComponent;
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
            function (person_service_1_1) {
                person_service_1 = person_service_1_1;
            },
            function (person_1_1) {
                person_1 = person_1_1;
            },
            function (ui_select_component_1_1) {
                ui_select_component_1 = ui_select_component_1_1;
            },
            function (person_digest_component_1_1) {
                person_digest_component_1 = person_digest_component_1_1;
            }],
        execute: function() {
            TabListPersonComponent = (function () {
                function TabListPersonComponent(_configService, _hubService, _personService) {
                    var _this = this;
                    this._configService = _configService;
                    this._hubService = _hubService;
                    this._personService = _personService;
                    this.persons = [];
                    this.page = 0;
                    this.perPage = 32;
                    this.searchQuery = "";
                    this._personService.list(this.page, this.perPage, "", "").then(function (persons) {
                        _this.persons = persons;
                        _this.page++;
                    });
                    setTimeout(function () { _this.tab.header = 'Контакты'; });
                }
                TabListPersonComponent.prototype.scroll = function (e) {
                    var _this = this;
                    if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
                        this._personService.list(this.page, this.perPage, "", "").then(function (persons) {
                            for (var i = 0; i < persons.length; i++) {
                                _this.persons.push(persons[i]);
                            }
                            _this.page++;
                        });
                    }
                };
                TabListPersonComponent.prototype.addPerson = function () {
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    tab_sys.addTab('person', { person: new person_1.Person() });
                };
                TabListPersonComponent = __decorate([
                    core_1.Component({
                        selector: 'tab-list-person',
                        inputs: ['tab'],
                        directives: [person_digest_component_1.PersonDigestComponent, ui_select_component_1.UISelect],
                        template: "\n\n  <div class=\"header-label-abs\">\n    {{ tab.header }}\n  </div>\n\n  <div class=\"search-form\" [class.table-mode]=\"table_mode\">\n    <div class=\"search-box\">\n      <input type=\"text\" class=\"\" placeholder=\"\" style=\"height: 28px; width: 100%;\">\n      <span class=\"icon-search\" style=\"position: absolute; right: 12px; top: 7px;\"></span>\n    </div>\n    <div class=\"tool-box\">\n\n      <div class=\"inline-select\">\n        <ui-select class=\"view-value edit-value\"\n          [values] = \"[\n            {val: 1, label: '\u0410\u0433\u0435\u043D\u0442 1_1'},\n            {val: 2, label: '\u0410\u0433\u0435\u043D\u0442 1_2'},\n            {val: 3, label: '\u0410\u0433\u0435\u043D\u0442 1_3'},\n            {val: 4, label: '\u0410\u0433\u0435\u043D\u0442 1_4'},\n            {val: 5, label: '\u0410\u0433\u0435\u043D\u0442 1_5'}\n          ]\"\n          [label]=\"'\u0410\u0433\u0435\u043D\u0442 1_1'\"\n          [config]=\"{icon: 'icon-person', draw_arrow: true}\"\n        >\n        </ui-select>\n      </div>\n\n      <div class=\"inline-select\">\n        <ui-select class=\"view-value edit-value\"\n          [values] = \"[\n            {val: 0, label: '\u0412\u0441\u0435'},\n            {val: 1, label: '\u041A\u0440\u0430\u0441\u043D\u044B\u0439', icon: 'icon-circle tag-red'},\n            {val: 2, label: '\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439', icon: 'icon-circle tag-orange'},\n            {val: 3, label: '\u0416\u0435\u043B\u0442\u044B\u0439', icon: 'icon-circle tag-yellow'},\n            {val: 4, label: '\u0417\u0435\u043B\u0435\u043D\u044B\u0439', icon: 'icon-circle tag-green'},\n            {val: 5, label: '\u0413\u043E\u043B\u0443\u0431\u043E\u0439', icon: 'icon-circle tag-blue'},\n            {val: 6, label: '\u041B\u0438\u043B\u043E\u0432\u044B\u0439', icon: 'icon-circle tag-violet'},\n            {val: 7, label: '\u0421\u0435\u0440\u044B\u0439', icon: 'icon-circle tag-gray'}\n          ]\"\n          [label]=\"'\u0412\u0441\u0435'\"\n          [config]=\"{icon: 'icon-tag', draw_arrow: true}\"\n        >\n        </ui-select>\n      </div>\n\n      <div class=\"inline-select\">\n        <ui-select class=\"view-value edit-value\"\n          [values] = \"[\n            {val: 1, label: '1 \u0434\u0435\u043D\u044C'},\n            {val: 2, label: '3 \u0434\u043D\u044F'},\n            {val: 3, label: '\u041D\u0435\u0434\u0435\u043B\u044F'},\n            {val: 4, label: '2 \u043D\u0435\u0434\u0435\u043B\u0438'},\n            {val: 5, label: '\u041C\u0435\u0441\u044F\u0446'},\n            {val: 6, label: '3 \u043C\u0435\u0441\u044F\u0446\u0430'},\n            {val: 7, label: '\u0412\u0441\u0435'}\n          ]\"\n          [label]=\"'3 \u043C\u0435\u0441\u044F\u0446\u0430'\"\n          [config]=\"{icon: 'icon-month', draw_arrow: true}\"\n        >\n        </ui-select>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"person-list-wrapper\">\n    <div class=\"scroll-wrapper\">\n\n      <div class=\"button\"\n        (click)=\"addPerson()\"\n      >\n        \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\n      </div>\n\n      <person-digest *ngFor=\"#p of persons\"\n        [person]=\"p\"\n      >\n      </person-digest>\n\n    </div>\n  </div>\n  ",
                        styles: ["\n\n    .search-form {\n      width: 50%;\n      min-width: 800px;\n      margin: 0 auto;\n      margin-top: 10px;\n      background: #fff;\n      z-index: 1;\n    }\n\n    .tool-box {\n      height: 30px;\n      margin: 0 12px;\n    }\n\n    .search-box {\n      position: relative;\n      margin: 12px;\n      margin-bottom: 8px;\n    }\n\n    .person-list-wrapper {\n      padding-top: 25px;\n      max-width: 1200px;\n      margin: 0 auto;\n      height: 100%;\n      width: 100%;\n    }\n\n    .scroll-wrapper {\n      height: calc(100% - 115px);\n      overflow-y: auto;\n    }\n\n    .inline-select {\n      display: inline-block;\n      height: 20px;\n      padding: 0 15px;\n      font-size: 14;\n      color: #666;\n    }\n\n    .button {\n      text-align: center;\n      padding: 5px 15px;\n      background-color: #3366cc;\n      color: #fff;\n      cursor: pointer;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [config_service_1.ConfigService, hub_service_1.HubService, person_service_1.PersonService])
                ], TabListPersonComponent);
                return TabListPersonComponent;
            }());
            exports_1("TabListPersonComponent", TabListPersonComponent);
        }
    }
});
//# sourceMappingURL=tab-list-person.component.js.map