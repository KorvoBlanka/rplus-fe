System.register(['angular2/core', '../service/hub.service'], function(exports_1) {
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
    var NotebookComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hub_service_1_1) {
                hub_service_1 = hub_service_1_1;
            }],
        execute: function() {
            NotebookComponent = (function () {
                function NotebookComponent(_hubService) {
                    this._hubService = _hubService;
                    this.hidden = true;
                    this.event_hidden = true;
                    this.widthChange = new core_1.EventEmitter();
                    this._hubService.shared_var['nb_width'] = 1;
                }
                NotebookComponent.prototype.toggleNotebook = function () {
                    this.hidden = !this.hidden;
                    this.emitWidth();
                };
                NotebookComponent.prototype.toggleEvent = function () {
                    this.event_hidden = !this.event_hidden;
                    this.emitWidth();
                };
                NotebookComponent.prototype.emitWidth = function () {
                    var w = 1;
                    if (!this.hidden) {
                        w += 371;
                        if (!this.event_hidden) {
                            w += 371;
                        }
                    }
                    this._hubService.shared_var['nb_width'] = w;
                    this.widthChange.emit({ value: w });
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NotebookComponent.prototype, "widthChange", void 0);
                NotebookComponent = __decorate([
                    core_1.Component({
                        selector: 'notebook',
                        template: "\n    <div class=\"notebook\">\n      <div class=\"border-stripe\">\n        <div class=\"header\">\n          <div class=\"tab-button\" (click)=\"toggleNotebook()\">\n            <span [ngClass]=\"{'icon-arrow-left': hidden, 'icon-arrow-right': !hidden}\"></span>\n          </div>\n        </div>\n      </div>\n      <div class=\"event-tab\" [hidden]=\"hidden || event_hidden\">\n        <div class=\"header\">\n        </div>\n      </div>\n      <div class=\"main-tab\" [hidden]=\"hidden\" (click)=\"toggleEvent()\">\n        <div class=\"header\">\n        </div>\n      </div>\n    </div>\n  ",
                        styles: ["\n    .notebook {\n      position: absolute;\n      top: 0px;\n      right: 0px;\n      height: 100%;\n      background-color: #fff;\n    }\n    .header {\n      width: 100%;\n      height: 30px;\n      border-bottom: 1px solid rgba(0,0,0,.2);\n    }\n    .notebook > .border-stripe {\n      width: 30px;\n      height: 100%;\n      background-color: #ccc;\n      float: right;\n    }\n    .notebook > .main-tab {\n      width: 370px;\n      height: 100%;\n      float: right;\n      border-left: 1px solid #ccc;\n    }\n    .notebook > .event-tab {\n      width: 370px;\n      height: 100%;\n      float: right;\n      border-left: 1px solid #ccc;\n    }\n    .tab-button {\n      width: 30px;\n      height: 30px;\n      text-align: center;\n      line-height: 30px;\n      font-size: 12px !important;\n      cursor: pointer;\n      color: #666;\n    }\n  "],
                        directives: [],
                    }), 
                    __metadata('design:paramtypes', [hub_service_1.HubService])
                ], NotebookComponent);
                return NotebookComponent;
            })();
            exports_1("NotebookComponent", NotebookComponent);
        }
    }
});
//# sourceMappingURL=notebook.component.js.map