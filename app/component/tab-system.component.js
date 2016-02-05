System.register(['angular2/core', '../service/hub.service', '../class/tab', './tab/tab-root.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, hub_service_1, tab_1, tab_root_component_1;
    var TabSystemComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hub_service_1_1) {
                hub_service_1 = hub_service_1_1;
            },
            function (tab_1_1) {
                tab_1 = tab_1_1;
            },
            function (tab_root_component_1_1) {
                tab_root_component_1 = tab_root_component_1_1;
            }],
        execute: function() {
            TabSystemComponent = (function () {
                function TabSystemComponent(_hubService) {
                    this._hubService = _hubService;
                    this.tabs = [];
                    this.tab_height = 0;
                    this.vt_height = 0;
                    _hubService.setProperty('tab_sys', this);
                }
                ;
                TabSystemComponent.prototype.ngAfterContentInit = function () {
                    this.addTab('main', {});
                };
                TabSystemComponent.prototype.calcTabHeight = function () {
                    var nominal_height = 160;
                    var minimal_height = 60;
                    var h = document.body.clientHeight - (31 * 2); // - 2 buttons
                    this.tab_height = (h - this.tabs.length) / this.tabs.length;
                    if (this.tab_height > nominal_height)
                        this.tab_height = nominal_height;
                    if (this.tab_height < minimal_height)
                        this.tab_height = minimal_height;
                    this.vt_height = this.tab_height - 60;
                };
                TabSystemComponent.prototype.selectTab = function (tab) {
                    this.selected_tab = tab;
                };
                TabSystemComponent.prototype.addTab = function (type, args) {
                    if (this.tabs.length < 10) {
                        var new_tab = new tab_1.Tab(this, type, args);
                        this.tabs.push(new_tab);
                        this.calcTabHeight();
                        this.selected_tab = new_tab;
                    }
                };
                TabSystemComponent.prototype.closeTab = function (tab) {
                    var _this = this;
                    var idx = this.tabs.indexOf(tab);
                    this.tabs.splice(idx, 1);
                    if (this.tabs.length == 0) {
                        this.addTab('main', {});
                    }
                    else {
                        if (this.selected_tab == tab) {
                            this.selected_tab = this.tabs[idx ? (idx - 1) : 0];
                        }
                    }
                    clearTimeout(this.to);
                    this.to = setTimeout(function () {
                        _this.calcTabHeight();
                    }, 500);
                };
                TabSystemComponent = __decorate([
                    core_1.Component({
                        selector: 'tab-system',
                        inputs: ['n_width'],
                        template: "\n    <div class=\"tab-list\">\n\n      <div class=\"header\">\n        <div class=\"tab-button\">\n        </div>\n      </div>\n\n      <div class=\"tab\" *ngFor=\"#tab of tabs\"\n        [class.selected]=\"tab === selected_tab\"\n        (click)=\"selectTab(tab)\">\n        <div class=\"tab-button close-button\" (click)=\"closeTab(tab)\"><span class=\"icon-cancel\"></span></div>\n        <div class=\"vertical-text-container\" [style.height]=\"vt_height\">\n          <div class=\"vertical-text\">{{ tab.header }}</div>\n        </div>\n        <div class=\"tab-icon\" style=\"display: block;\"><span class=\"icon-start\"></span></div>\n      </div>\n      <div class=\"tab-button\" (click)=\"addTab('main', {})\">\n        <span class=\"icon-add\"></span>\n      </div>\n    </div>\n    <div class=\"tab-content\">\n      <tab-root *ngFor=\"#tab of tabs\"\n        [hidden]=\"tab !== selected_tab\"\n        [tab]=\"tab\">\n      </tab-root>\n    </div>\n  ",
                        styles: ["\n    .tab-content {\n      margin-left: 30px;\n    }\n    .tab-list {\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      overflow: hidden;\n      background-color: #ccc;\n    }\n    .tab {\n      width: 30px;\n      border-bottom: 1px solid #aaa;\n      cursor: pointer;\n    }\n\n    .tab:hover {\n      background-color: #efefef;\n    }\n\n    .tab.selected {\n      background-color: #fff;\n      border-bottom: 1px solid #fff;\n    }\n    .tab-button {\n      width: 30px;\n      height: 30px;\n      text-align: center;\n      line-height: 30px;\n      font-size: 12px !important;\n      cursor: pointer;\n      color: #666;\n    }\n    .tab-icon {\n      width: 30px;\n      height: 30px;\n      text-align: center;\n      line-height: 30px;\n      font-size: 16px !important;\n      color: #666;\n    }\n    .vertical-text-container {\n      position: relative;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden;\n    }\n    .vertical-text {\n      transform: rotate(-90deg);\n      transform-origin: 0 0;\n      position: absolute;\n      bottom: -25px;\n      line-height: 30px;\n    }\n    .header {\n      width: 100%;\n      height: 30px;\n      border-bottom: 1px solid rgba(0,0,0,.2);\n    }\n  "],
                        directives: [tab_root_component_1.TabRootComponent],
                    }), 
                    __metadata('design:paramtypes', [hub_service_1.HubService])
                ], TabSystemComponent);
                return TabSystemComponent;
            })();
            exports_1("TabSystemComponent", TabSystemComponent);
        }
    }
});
//# sourceMappingURL=tab-system.component.js.map