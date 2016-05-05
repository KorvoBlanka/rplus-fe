System.register(['angular2/core', '../../pipe/format-date.pipe', '../../service/hub.service', '../../service/settings/user.service'], function(exports_1, context_1) {
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
    var core_1, format_date_pipe_1, hub_service_1, user_service_1;
    var UserDigestComponent;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            UserDigestComponent = (function () {
                function UserDigestComponent(_hubService, _userService) {
                    this._hubService = _hubService;
                    this._userService = _userService;
                }
                ;
                UserDigestComponent.prototype.ngOnInit = function () {
                };
                UserDigestComponent.prototype.select = function () {
                    this.user.selected = !this.user.selected;
                };
                UserDigestComponent.prototype.open = function () {
                    this.user.selected = true;
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    tab_sys.addTab('user', { user: this.user });
                };
                UserDigestComponent.prototype.tstart = function () {
                    var _this = this;
                    clearTimeout(this.to);
                    this.to = setTimeout(function () {
                        _this.open();
                    }, 1000);
                };
                UserDigestComponent.prototype.tend = function () {
                    clearTimeout(this.to);
                };
                UserDigestComponent = __decorate([
                    core_1.Component({
                        selector: 'user-digest',
                        inputs: ['user'],
                        pipes: [format_date_pipe_1.FormatDatePipe],
                        template: "\n    <div class=\"billet\"\n      [class.selected]=\"user.selected\"\n      (click)=\"select()\"\n      (dblclick)=\"open()\"\n      (touchstart)=\"tstart()\"\n      (touchend)=\"tend()\"\n    >\n\n      <div style=\"display: flex; justify-content: space-between;\">\n        <span>\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C {{ user.id }}\n          <span class=\"billet-label\">{{ user.name }}</span>\n        </span>\n        <span>{{ user.change_date | formatDate }} / {{ user.add_date | formatDate }}</span>\n      </div>\n\n      <table style=\"width: 100%;\">\n        <tbody style=\"vertical-align: top; font-size: 14; font-weight: 200;\">\n\n        </tbody>\n      </table>\n\n    </div>\n  ",
                        styles: ["\n    .billet {\n      background-color: inherit;\n      color: #696969;\n      font-weight: 200;\n      font-size: 14;\n      position: relative;\n\n      border-bottom: 1px solid #e5e5e5;\n      overflow: hidden;\n\n      padding: 10px 20px;\n    }\n\n    .billet-label {\n      font-weight: 400;\n      color:  #666;\n      font-size: 17;\n      white-space: nowrap;\n      margin-left: 50px;\n    }\n\n    .billet.selected {\n      background-color: #157ad3;\n      color: #fff !important;\n    }\n\n    .billet-block {\n      display: inline-block;\n      width: 32%;\n    }\n\n    .entry-header {\n      display: inline-block;\n      width: 90px;\n      color: #aaa;\n    }\n\n    .badge-gray {\n      display: inline-block;\n      width: 85px;\n      text-align: center;\n      color: #666;\n      background-color: #eee;\n    }\n    .badge-red {\n      display: inline-block;\n      width: 85px;\n      text-align: center;\n      color: #fff;\n      background-color: #e05050;\n    }\n    .badge-green {\n      display: inline-block;\n      width: 85px;\n      text-align: center;\n      color: #fff;\n      background-color: #50e050;\n    }\n  "]
                    }), 
                    __metadata('design:paramtypes', [hub_service_1.HubService, user_service_1.UserService])
                ], UserDigestComponent);
                return UserDigestComponent;
            }());
            exports_1("UserDigestComponent", UserDigestComponent);
        }
    }
});
//# sourceMappingURL=user-digest.component.js.map