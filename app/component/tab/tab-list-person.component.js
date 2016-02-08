System.register(['angular2/core', '../../service/config.service', '../../service/person.service', '../person-digest.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, config_service_1, person_service_1, person_digest_component_1;
    var TabListPersonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            },
            function (person_service_1_1) {
                person_service_1 = person_service_1_1;
            },
            function (person_digest_component_1_1) {
                person_digest_component_1 = person_digest_component_1_1;
            }],
        execute: function() {
            TabListPersonComponent = (function () {
                function TabListPersonComponent(_configService, _personService) {
                    var _this = this;
                    this._configService = _configService;
                    this._personService = _personService;
                    this.persons = [];
                    this.page = 1;
                    this.pane_hidden = false;
                    this.persons = this._personService.getPersonList(1, 32);
                    setTimeout(function () { _this.tab.header = 'person list'; });
                }
                TabListPersonComponent.prototype.ngOnInit = function () {
                    this.calcSize();
                };
                TabListPersonComponent.prototype.onResize = function (e) {
                    this.calcSize();
                };
                TabListPersonComponent.prototype.calcSize = function () {
                    if (this.pane_hidden) {
                        this.pane_width = 0;
                    }
                    else {
                        this.pane_width = 420;
                    }
                    this.work_area_width = document.body.clientWidth - (30 * 2) - this.pane_width;
                    this.pane_height = document.body.clientHeight - 31;
                };
                TabListPersonComponent.prototype.select = function (p) {
                };
                TabListPersonComponent.prototype.toggleLeftPane = function () {
                    this.pane_hidden = !this.pane_hidden;
                    this.calcSize();
                };
                TabListPersonComponent.prototype.scroll = function (e) {
                    if (e.currentTarget.scrollTop + this.pane_height >= e.currentTarget.scrollHeight) {
                        this.page++;
                        var r = this._personService.getPersonList(this.page, 10);
                        for (var i = 0; i < r.length; i++) {
                            this.persons.push(r[i]);
                        }
                    }
                };
                TabListPersonComponent = __decorate([
                    core_1.Component({
                        selector: 'tab-list-person',
                        inputs: ['tab'],
                        directives: [person_digest_component_1.PersonDigestComponent],
                        template: "\n\n  <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n    <span [ngClass]=\"{'icon-arrow-right': pane_hidden, 'icon-arrow-left': !pane_hidden}\"></span>\n  </div>\n\n  <div class=\"list-person\"\n    (window:resize)=\"onResize($event)\"\n    >\n    <div class=\"pane\" [hidden]=\"pane_hidden\" [style.width.px]=\"pane_width\">\n      <div class=\"header\"></div>\n      <div class=\"category-list\"\n        (scroll)=\"scrollCategory($event)\"\n        [attr.scrollTop]=\"scroll_pos\"\n        [style.height]=\"pane_height\"\n        >\n        \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438<br>\n        \u043F\u043E \u0430\u0433\u0435\u043D\u0442\u0430\u043C | \u043F\u043E \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F\u043C\n      </div>\n    </div>\n    <div class=\"work-area\" [style.width.px]=\"work_area_width\">\n      <div _ngcontent-jtj-16=\"\" class=\"\" style=\"max-width: 910px; overflow-y: scroll; height: 615px;\">\n        <div class=\"list-person\" (window:resize)=\"onResize($event)\">\n          <person-digest *ngFor=\"#p of persons\"\n            [person]=\"p\"\n          >\n          </person-digest>\n        </div>\n      </div>\n    </div>\n  </div>\n  ",
                        styles: ["\n    .pane {\n      float: left;\n      width: 370px;\n      height: 100%;\n      border-right: 1px solid #ccc;\n    }\n\n    .work-area {\n      float: left;\n      width: 77%;\n      height: 100%;\n    }\n\n    .fixed-button {\n      position: fixed;\n      top: 0;\n      left: 0;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [config_service_1.ConfigService, person_service_1.PersonService])
                ], TabListPersonComponent);
                return TabListPersonComponent;
            })();
            exports_1("TabListPersonComponent", TabListPersonComponent);
        }
    }
});
//# sourceMappingURL=tab-list-person.component.js.map