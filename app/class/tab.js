"use strict";
var Subject_1 = require("rxjs/Subject");
var Tab = (function () {
    function Tab(tabSys, type, args) {
        this.header = 'Loading...';
        this.type = type;
        this.tabSys = tabSys;
        this.args = args;
        this.refreshRq = new Subject_1.Subject();
    }
    Tab.prototype.reborn = function (type, args) {
        this.header = 'Loading...';
        this.type = type;
        this.args = args;
    };
    Tab.prototype.refresh = function (sender) {
        this.refreshRq.next(sender);
    };
    return Tab;
}());
exports.Tab = Tab;
//# sourceMappingURL=tab.js.map