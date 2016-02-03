System.register(['angular2/core', '../service/hub.service', './ui/ui-tag.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, hub_service_1, ui_tag_component_1;
    var RealtyDigestComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hub_service_1_1) {
                hub_service_1 = hub_service_1_1;
            },
            function (ui_tag_component_1_1) {
                ui_tag_component_1 = ui_tag_component_1_1;
            }],
        execute: function() {
            RealtyDigestComponent = (function () {
                function RealtyDigestComponent(_hubService) {
                    this._hubService = _hubService;
                    this.compact = false;
                }
                ;
                RealtyDigestComponent.prototype.select = function () {
                    this.realty.selected = !this.realty.selected;
                };
                RealtyDigestComponent.prototype.open = function () {
                    this.realty.selected = true;
                    var tab_sys = this._hubService.getProperty('tab_sys');
                    tab_sys.addTab('realty', { realty: this.realty });
                };
                RealtyDigestComponent.prototype.tstart = function () {
                    var _this = this;
                    clearTimeout(this.to);
                    this.to = setTimeout(function () {
                        _this.open();
                    }, 1000);
                };
                RealtyDigestComponent.prototype.tend = function () {
                    clearTimeout(this.to);
                };
                RealtyDigestComponent = __decorate([
                    core_1.Component({
                        selector: 'reaty-digest',
                        inputs: ['realty', 'compact'],
                        template: "\n    <div class=\"billet\" data-id=\"r{{realty._id}}\"\n      [class.selected]=\"realty.selected\"\n      (click)=\"select()\"\n      (dblclick)=\"open()\"\n      (touchstart)=\"tstart()\"\n      (touchend)=\"tsend()\">\n\n      <div style=\"width: 100%;\">\n        <div class=\"timestamp\">07.01.16 11:09</div>\n        <div class=\"tag-mark\">\n          <ui-tag\n            [value]=\"realty._source.tag\"\n          >\n          </ui-tag>\n        </div>\n        <img *ngIf=\"!compact\" src=\"{{ realty._source.main_photo_thumbnail }}\" style=\"height: 60px; min-width: 80px; float: left; margin: 10px;\">\n        <div class=\"\" style=\"min-height: 70px; margin-left: 10px;\">\n          <span style=\"font-weight: 400;\">{{ realty._source.type }}</span>, {{ realty._source.rooms_count }} \u043A\u043E\u043C\u043D., {{ realty._source.floor }} \u044D\u0442., {{ realty._source.sqare_total }} \u043A\u0432. \u043C.<br> {{ realty._source.addr_str }} <br>\n          <span class=\"text-primary\">{{ realty._source.owner_price }} \u0442\u044B\u0441. \u0440\u0443\u0431.</span>, <br>\n          <span class=\"owner\">\u0421\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u0438\u043A (914)1593476</span>\n        </div>\n        <div class=\"healthbar\">\n          <div class=\"health\"></div>\n        </div>\n      </div>\n    </div>\n  ",
                        styles: ["\n    .billet {\n      background-color: inherit;\n      color: #696969;\n      font-weight: 200;\n      font-size: 14;\n      position: relative;\n      padding-top: 5px;\n    }\n    .billet.selected {\n      background-color: #157ad3;\n      color: #fff !important;\n    }\n    .healthbar {\n      height: 1px;\n      width: 95%;\n      margin: 5px 0 0 5px;\n      background: #ccc;\n      position: relative;\n    }\n    .healthbar > .health {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      width: 0%;\n      background-color: red;\n    }\n    .timestamp {\n      position: absolute;\n      top: 6px; right: 6px;\n      font-size: 11;\n      color: #bbb;\n    }\n    .owner {\n      color: #bbb;\n    }\n    .tag-mark {\n      position: absolute;\n      right: 10px;\n      top: 40%;\n    }\n  "],
                        directives: [ui_tag_component_1.UITag],
                    }), 
                    __metadata('design:paramtypes', [hub_service_1.HubService])
                ], RealtyDigestComponent);
                return RealtyDigestComponent;
            })();
            exports_1("RealtyDigestComponent", RealtyDigestComponent);
        }
    }
});
//# sourceMappingURL=realty-digest.component.js.map