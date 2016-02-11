System.register(['angular2/core', '../../pipe/format-date.pipe', '../../service/hub.service'], function(exports_1, context_1) {
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
    var core_1, format_date_pipe_1, hub_service_1;
    var OrganisationDigestComponent;
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
            }],
        execute: function() {
            OrganisationDigestComponent = (function () {
                function OrganisationDigestComponent(_hubService) {
                    this._hubService = _hubService;
                }
                ;
                OrganisationDigestComponent.prototype.ngOnInit = function () { };
                OrganisationDigestComponent.prototype.select = function () {
                    this.organisation.selected = !this.organisation.selected;
                };
                OrganisationDigestComponent.prototype.open = function () {
                    this.organisation.selected = true;
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    tab_sys.addTab('organisation', { organisation: this.organisation });
                };
                OrganisationDigestComponent.prototype.tstart = function () {
                    var _this = this;
                    clearTimeout(this.to);
                    this.to = setTimeout(function () {
                        _this.open();
                    }, 1000);
                };
                OrganisationDigestComponent.prototype.tend = function () {
                    clearTimeout(this.to);
                };
                OrganisationDigestComponent = __decorate([
                    core_1.Component({
                        selector: 'organisation-digest',
                        inputs: ['organisation'],
                        pipes: [format_date_pipe_1.FormatDatePipe],
                        template: "\n    <div class=\"billet\"\n      [class.selected]=\"organisation.selected\"\n      (click)=\"select()\"\n      (dblclick)=\"open()\"\n      (touchstart)=\"tstart()\"\n      (touchend)=\"tend()\"\n    >\n\n      <div style=\"display: flex; justify-content: space-between;\">\n        <span>\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F {{ organisation.id }}\n          <span class=\"billet-label\">{{ organisation.name }}</span>\n        </span>\n        <span>{{ organisation.change_date | formatDate }} / {{ organisation.add_date | formatDate }}</span>\n      </div>\n\n      <table style=\"width: 100%;\">\n        <tbody style=\"vertical-align: top; font-size: 14; font-weight: 200;\">\n          <tr>\n            <td width=\"33%\">\n              <span class=\"entry-header\">\u0410\u0434\u0440\u0435\u0441:</span><span style=\"font-weight: 400;\"> {{ organisation.address }} </span>\n            </td>\n            <td width=\"33%\">\n              <span class=\"entry-header\" style=\"width: 105px;\"></span>\n            </td>\n            <td width=\"33%\">\n              <span class=\"entry-header\"></span>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <span class=\"entry-header\"></span>\n            </td>\n            <td></td>\n            <td>\n              <span class=\"entry-header\"></span>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <span class=\"entry-header\"></span>\n            </td>\n            <td></td>\n            <td>\n              <span class=\"entry-header\" style=\"width: 90px;\"></span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n\n\n\n    </div>\n  ",
                        styles: ["\n    .billet {\n      background-color: inherit;\n      color: #696969;\n      font-weight: 200;\n      font-size: 14;\n      position: relative;\n\n      border-bottom: 1px solid #e5e5e5;\n      overflow: hidden;\n\n      padding: 10px 20px;\n    }\n\n    .billet-label {\n      font-weight: 400;\n      color:  #666;\n      font-size: 17;\n      white-space: nowrap;\n      margin-left: 25px;\n    }\n\n    .billet.selected {\n      background-color: #157ad3;\n      color: #fff !important;\n    }\n\n    .billet-block {\n      display: inline-block;\n      width: 32%;\n    }\n\n    .entry-header {\n      display: inline-block;\n      width: 115px;\n      color: #aaa;\n    }\n\n    .badge-gray {\n      display: inline-block;\n      width: 85px;\n      text-align: center;\n      color: #666;\n      background-color: #eee;\n    }\n    .badge-red {\n      display: inline-block;\n      width: 85px;\n      text-align: center;\n      color: #fff;\n      background-color: #e05050;\n    }\n    .badge-green {\n      display: inline-block;\n      width: 85px;\n      text-align: center;\n      color: #fff;\n      background-color: #50e050;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [hub_service_1.HubService])
                ], OrganisationDigestComponent);
                return OrganisationDigestComponent;
            }());
            exports_1("OrganisationDigestComponent", OrganisationDigestComponent);
        }
    }
});
//# sourceMappingURL=organisation-digest.component.js.map