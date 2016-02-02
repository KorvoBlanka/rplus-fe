System.register(['angular2/core', '../../service/realty.service', '../../service/config.service', '../realty-digest.component', 'angular2-google-maps/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, realty_service_1, config_service_1, realty_digest_component_1, core_2;
    var TabListRealtyComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (realty_service_1_1) {
                realty_service_1 = realty_service_1_1;
            },
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            },
            function (realty_digest_component_1_1) {
                realty_digest_component_1 = realty_digest_component_1_1;
            },
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            TabListRealtyComponent = (function () {
                function TabListRealtyComponent(_realtyService, _configService) {
                    this._realtyService = _realtyService;
                    this._configService = _configService;
                    this.pane_hidden = false;
                    this.realtys = [];
                    this.page = 1;
                }
                TabListRealtyComponent.prototype.parseFloat = function (v) {
                    return parseFloat(v);
                };
                TabListRealtyComponent.prototype.ngOnInit = function () {
                    var c = this._configService.getConfig();
                    this.lat = c.map.lat;
                    this.lon = c.map.lon;
                    this.zoom = c.map.zoom;
                    this.realtys = this._realtyService.getRealty(1, 16);
                    this.calcSize();
                };
                TabListRealtyComponent.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    setTimeout(function () { _this.tab.header = 'realty list'; });
                };
                TabListRealtyComponent.prototype.onResize = function (e) {
                    this.calcSize();
                };
                TabListRealtyComponent.prototype.calcSize = function () {
                    if (this.pane_hidden) {
                        this.pane_width = 0;
                    }
                    else {
                        this.pane_width = 420;
                    }
                    this.map_width = document.body.clientWidth - (30 * 2) - this.pane_width;
                    this.pane_height = document.body.clientHeight - 31;
                };
                TabListRealtyComponent.prototype.toggleLeftPane = function () {
                    this.pane_hidden = !this.pane_hidden;
                    this.calcSize();
                };
                TabListRealtyComponent.prototype.markerClick = function (v) {
                    console.log('marker click');
                };
                TabListRealtyComponent.prototype.select = function (r) {
                    if (r._source.location) {
                        this.lat = r._source.location.lat;
                        this.lon = r._source.location.lon;
                    }
                };
                TabListRealtyComponent.prototype.scroll = function (e) {
                    if (e.currentTarget.scrollTop + this.pane_height >= e.currentTarget.scrollHeight) {
                        this.page++;
                        var r = this._realtyService.getRealty(this.page, 10);
                        for (var i = 0; i < r.length; i++) {
                            this.realtys.push(r[i]);
                        }
                    }
                };
                TabListRealtyComponent = __decorate([
                    core_1.Component({
                        selector: 'tab-list-realty',
                        inputs: ['tab'],
                        directives: [core_2.ANGULAR2_GOOGLE_MAPS_DIRECTIVES, realty_digest_component_1.RealtyDigestComponent],
                        template: "\n      <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n        <span [ngClass]=\"{'icon-chevron-right': pane_hidden, 'icon-chevron-left': !pane_hidden}\"></span>\n      </div>\n      <div class=\"list-realty\" (window:resize)=\"onResize($event)\">\n        <div class=\"pane\" [hidden]=\"pane_hidden\" [style.width.px]=\"pane_width\">\n          <div class=\"header\">\n          </div>\n          <div class=\"digest-list\" [style.height]=\"pane_height\" (scroll)=\"scroll($event)\">\n            <reaty-digest *ngFor=\"#realty of realtys\" [realty]=\"realty\" (click)=\"select(realty)\">\n            </reaty-digest>\n          </div>\n        </div>\n        <div class=\"work-area\" [style.width.px]=\"map_width\">\n          <sebm-google-map [latitude]=\"lat\" [longitude]=\"lon\" [zoom]=\"zoom\">\n            <t *ngFor=\"#r of realtys\">\n            <sebm-google-map-marker \n \t            *ngIf=\"r._source.location\"\n              (markerClick)=\"markerClick(r)\"\n              [latitude]=\"parseFloat(r._source.location.lat)\"\n              [longitude]=\"parseFloat(r._source.location.lon)\"\n              [label]=\"r._source.type\"></sebm-google-map-marker>\n            </t>\n          </sebm-google-map>\n        </div>\n      </div>\n    ",
                        styles: [" \n\n      reaty-digest:nth-child(odd) {\n        /*background: #f0f0f0;*/\n      }\n\n      .digest-list {\n        overflow-x: scroll;\n      }\n\n      .list-realty {\n        position: relative;\n      }\n      .header {\n        width: 100%;\n        height: 30px;\n        border-bottom: 1px solid rgba(0,0,0,.2);\n      }\n      .pane {\n        float: left;\n        width: 370px;\n        height: 100%;\n        border-right: 1px solid #ccc;\n      }\n      .work-area {\n        float: left;\n        width: 77%;\n        height: 100%;\n      }\n      .tab-button {\n        width: 30px;\n        height: 30px;\n        text-align: center;\n        line-height: 30px;\n        font-size: 12px !important;\n        cursor: pointer;\n        color: #666;\n      }\n      .fixed-button {\n        position: fixed;\n        top: 0;\n        left: 0;\n      }\n      .sebm-google-map-container {\n         height: 100%;\n      }\n    "]
                    }), 
                    __metadata('design:paramtypes', [realty_service_1.RealtyService, config_service_1.ConfigService])
                ], TabListRealtyComponent);
                return TabListRealtyComponent;
            })();
            exports_1("TabListRealtyComponent", TabListRealtyComponent);
        }
    }
});
//# sourceMappingURL=tab-list-realty.component.js.map