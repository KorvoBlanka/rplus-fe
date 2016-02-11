System.register(['angular2/core', '../../pipe/format-date.pipe', '../../service/hub.service', '../../service/task.service', '../../class/task'], function(exports_1, context_1) {
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
    var core_1, format_date_pipe_1, hub_service_1, task_service_1, task_1;
    var PersonDigestComponent;
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
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            },
            function (task_1_1) {
                task_1 = task_1_1;
            }],
        execute: function() {
            PersonDigestComponent = (function () {
                function PersonDigestComponent(_hubService, _taskService) {
                    this._hubService = _hubService;
                    this._taskService = _taskService;
                }
                ;
                PersonDigestComponent.prototype.ngOnInit = function () {
                    this.task = this._taskService.getRandomTasks();
                    this.result_text = this.getResultText();
                };
                PersonDigestComponent.prototype.select = function () {
                    this.person.selected = !this.person.selected;
                };
                PersonDigestComponent.prototype.open = function () {
                    this.person.selected = true;
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    tab_sys.addTab('person', { person: this.person });
                };
                PersonDigestComponent.prototype.tstart = function () {
                    var _this = this;
                    clearTimeout(this.to);
                    this.to = setTimeout(function () {
                        _this.open();
                    }, 1000);
                };
                PersonDigestComponent.prototype.tend = function () {
                    clearTimeout(this.to);
                };
                PersonDigestComponent.prototype.getResultText = function () {
                    return task_1.Task.getResultText(this.task);
                };
                PersonDigestComponent = __decorate([
                    core_1.Component({
                        selector: 'person-digest',
                        inputs: ['person'],
                        pipes: [format_date_pipe_1.FormatDatePipe],
                        template: "\n    <div class=\"billet\"\n      [class.selected]=\"person.selected\"\n      (click)=\"select()\"\n      (dblclick)=\"open()\"\n      (touchstart)=\"tstart()\"\n      (touchend)=\"tend()\"\n    >\n\n      <div style=\"display: flex; justify-content: space-between;\">\n        <span>\u041A\u043E\u043D\u0442\u0430\u043A\u0442 {{ person.id }}\n          <span class=\"billet-label\">{{ person.name }}</span>\n        </span>\n        <span>{{ person.change_date | formatDate }} / {{ person.add_date | formatDate }}</span>\n      </div>\n\n      <table style=\"width: 100%;\">\n        <tbody style=\"vertical-align: top; font-size: 14; font-weight: 200;\">\n          <tr>\n            <td width=\"33%\">\n              <span class=\"entry-header\" style=\"width: 105px;\">\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F:</span> {{ person.organisation.name }}\n            </td>\n            <td width=\"33%\">\n              <span class=\"entry-header\">\u0417\u0430\u0434\u0430\u0447\u0430:</span> {{ task.type }}\n            </td>\n            <td width=\"33%\">\n              <div style=\"float: left; display: block;\">\n                <span class=\"entry-header\" style=\"width: 90px;\">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439:</span>\n              </div>\n              <div style=\"oveflow: hidden;\">\n                <span class=\"line-clamp line-clamp-1\" style=\"font-style: italic; line-height: normal;\"> {{ task.comment }} </span>\n              </div>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <span class=\"entry-header\" style=\"width: 105px;\">\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439:</span> <a href=\"#\">\u041A\u0430\u043A\u043E\u0439 \u041A\u0430\u043A\u043E\u0439\u0442\u043E\u0432\u0438\u0447</a>\n            </td>\n            <td>\n              <span class=\"entry-header\">\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442:</span> <span [class.badge-gray]=\"task.result_id == 0\" [class.badge-green]=\"task.result_id == 1\" [class.badge-red]=\"task.result_id == 2\">{{ result_text }}</span>\n            </td>\n            <td>\n\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <span class=\"entry-header\" style=\"width: 105px;\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D:</span> {{ person.phone[0].s }}\n            </td>\n            <td></td>\n            <td>\n\n            </td>\n          </tr>\n        </tbody>\n      </table>\n\n\n\n    </div>\n  ",
                        styles: ["\n    .billet {\n      background-color: inherit;\n      color: #696969;\n      font-weight: 200;\n      font-size: 14;\n      position: relative;\n\n      border-bottom: 1px solid #e5e5e5;\n      overflow: hidden;\n\n      padding: 10px 20px;\n    }\n\n    .billet-label {\n      font-weight: 400;\n      color:  #666;\n      font-size: 17;\n      white-space: nowrap;\n      margin-left: 50px;\n    }\n\n    .billet.selected {\n      background-color: #157ad3;\n      color: #fff !important;\n    }\n\n    .billet-block {\n      display: inline-block;\n      width: 32%;\n    }\n\n    .entry-header {\n      display: inline-block;\n      width: 90px;\n      color: #aaa;\n    }\n\n    .badge-gray {\n      display: inline-block;\n      width: 85px;\n      text-align: center;\n      color: #666;\n      background-color: #eee;\n    }\n    .badge-red {\n      display: inline-block;\n      width: 85px;\n      text-align: center;\n      color: #fff;\n      background-color: #e05050;\n    }\n    .badge-green {\n      display: inline-block;\n      width: 85px;\n      text-align: center;\n      color: #fff;\n      background-color: #50e050;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [hub_service_1.HubService, task_service_1.TaskService])
                ], PersonDigestComponent);
                return PersonDigestComponent;
            }());
            exports_1("PersonDigestComponent", PersonDigestComponent);
        }
    }
});
//# sourceMappingURL=person-digest.component.js.map