System.register(['angular2/core', '../../service/hub.service'], function(exports_1, context_1) {
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
    var core_1, hub_service_1;
    var HistoryDigestComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hub_service_1_1) {
                hub_service_1 = hub_service_1_1;
            }],
        execute: function() {
            HistoryDigestComponent = (function () {
                function HistoryDigestComponent(_hubService) {
                    this._hubService = _hubService;
                }
                ;
                HistoryDigestComponent.prototype.ngOnInit = function () { };
                HistoryDigestComponent = __decorate([
                    core_1.Component({
                        selector: 'history-digest',
                        inputs: ['history_record'],
                        template: "\n    <div class=\"billet\"\n    >\n\n      <div style=\"display: flex; justify-content: space-between;\">\n        <span>\u0417\u0430\u043F\u0438\u0441\u044C #{{ history_record.id }}</span>\n        <span>11.11.15 11:29</span>\n      </div>\n\n      <table style=\"width: 100%;\">\n        <tbody style=\"vertical-align: top; font-size: 14; font-weight: 200;\">\n          <tr>\n            <td width=\"24%\">\n              <span class=\"entry-header\">\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:</span><span style=\"font-weight: 400;\"> {{ history_record.type }} </span>\n            </td>\n            <td width=\"42%\">\n              <span [class.hidden]=\"history_record.type_id == 2\" class=\"entry-header\">\u041F\u043E\u043B\u0435:</span><span style=\"font-weight: 400;\"> {{ history_record.property_name }} </span>\n              <span [class.hidden]=\"history_record.type_id == 1\" class=\"entry-header\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:</span><span style=\"font-weight: 400;\"> {{ history_record.text }} </span>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <span class=\"entry-header\">\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C:</span> <a href=\"#\">  {{ history_record._user_name }} </a>\n            </td>\n            <td>\n              <span [class.hidden]=\"history_record.type_id == 2\" class=\"entry-header\">\u0421\u0442\u0430\u0440\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435:</span> {{ history_record.old_val }}\n            </td>\n          </tr>\n          <tr>\n            <td>\n            </td>\n            <td>\n              <span [class.hidden]=\"history_record.type_id == 2\" class=\"entry-header\">\u041D\u043E\u0432\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435:</span> {{ history_record.new_val }}\n            </td>\n          </tr>\n        </tbody>\n      </table>\n\n    </div>\n  ",
                        styles: ["\n    .billet {\n      background-color: inherit;\n      color: #696969;\n      font-weight: 200;\n      font-size: 14;\n      position: relative;\n\n      border-bottom: 1px solid #e5e5e5;\n      overflow: hidden;\n\n      padding: 10px 20px;\n    }\n    .billet.selected {\n      background-color: #157ad3;\n      color: #fff !important;\n    }\n\n    .billet-block {\n      display: inline-block;\n      width: 42%;\n    }\n\n    .entry-header {\n      display: inline-block;\n      width: 120px;\n      color: #aaa;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [hub_service_1.HubService])
                ], HistoryDigestComponent);
                return HistoryDigestComponent;
            }());
            exports_1("HistoryDigestComponent", HistoryDigestComponent);
        }
    }
});
//# sourceMappingURL=history-digest.component.js.map