System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var ContextMenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ContextMenuComponent = (function () {
                function ContextMenuComponent() {
                    this.hidden = true;
                    this.dummy = new core_1.EventEmitter();
                }
                ContextMenuComponent.prototype.click = function (e, item) {
                    if (item.disabled) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    if (item.callback) {
                        item.callback();
                    }
                };
                ContextMenuComponent.prototype.docClick = function () {
                };
                ContextMenuComponent.prototype.ngOnInit = function () { };
                ContextMenuComponent.prototype.ngOnChanges = function (changes) { };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], ContextMenuComponent.prototype, "dummy", void 0);
                ContextMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'context-menu',
                        inputs: ['pos_x', 'pos_y', 'items', 'hidden'],
                        template: "\n    <div class=\"context-menu-wrapper\"\n      [style.left]=\"pos_x\"\n      [style.top]=\"pos_y\"\n      [hidden]=\"hidden\"\n      (document:click)=\"docClick()\"\n      >\n      <div\n        *ngFor=\"#i of items\"\n        [ngSwitch]=\"i.class\"\n        (click)=\"click($event, i)\"\n      >\n        <div *ngSwitchWhen=\"'entry'\" class=\"entry\" [class.disabled]=\"i.disabled\">\n          <span *ngIf=\"i.icon\" class=\"icon-{{ i.icon }}\"></span>\n          {{ i.label }}\n        </div>\n        <div *ngSwitchWhen=\"'entry_cb'\" class=\"entry\" [class.disabled]=\"i.disabled\">\n          <span *ngIf=\"i.value\" class=\"icon-check\"></span>\n          <span *ngIf=\"!i.value\" class=\"icon-none\"></span>\n          {{ i.label }}\n        </div>\n        <hr *ngSwitchWhen=\"'delimiter'\">\n      </div>\n    </div>\n    ",
                        styles: ["\n      .context-menu-wrapper {\n\n        height: 450px;\n        overflow-y: scroll;\n\n        position: fixed;\n        background-color: #fff;\n        border: 1px solid #eee;\n        z-index: 10;\n      }\n\n      .entry {\n        padding: 3px 20px;\n        font-weight: normal;\n        line-height: 30px;\n        height: 30px;\n        color: #333;\n        white-space: nowrap;\n        min-width: 120px;\n        cursor: pointer;\n\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n      }\n\n      .entry:hover {\n        background-color: #eee;\n      }\n\n      .entry.disabled {\n        background-color: #fff;\n        color: #aaa;\n        cursor: not-allowed;\n      }\n\n      hr {\n        margin: 5px;\n      }\n    "],
                        directives: [],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ContextMenuComponent);
                return ContextMenuComponent;
            }());
            exports_1("ContextMenuComponent", ContextMenuComponent);
        }
    }
});
/* example
contextmenu(e) {
  e.preventDefault();
  e.stopPropagation();
  this._hubService.shared_var['cm_px'] = e.pageX;
  this._hubService.shared_var['cm_py'] = e.pageY;
  this._hubService.shared_var['cm_hidden'] = false;
  this._hubService.shared_var['cm_items'] = [
    {class: "entry_cb", disabled: true, value: true, label: "пункт 1", callback: function() {alert('yay 1!')}},
    {class: "entry_cb", disabled: false, value: false, label: "пункт 2", callback: function() {alert('yay 2!')}},
    {class: "entry_cb", disabled: true, value: true, label: "пункт 3", callback: function() {alert('yay 3!')}},
    {class: "entry", disabled: false, icon: "cancel", label: "пункт 4", callback: function() {alert('yay 4!')}},
    {class: "delimiter"},
    {class: "entry", icon: "add", label: "пункт 5", callback: function() {alert('yay 5!')}},
  ];
}*/
//# sourceMappingURL=context-menu.component.js.map