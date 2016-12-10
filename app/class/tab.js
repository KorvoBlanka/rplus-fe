"use strict";
var Tab = (function () {
    function Tab(tabSys, type, args) {
        this.header = 'Loading...';
        this.type = type;
        this.tabSys = tabSys;
        this.args = args;
    }
    Tab.prototype.reborn = function (type, args) {
        this.header = 'Loading...';
        this.type = type;
        this.args = args;
    };
    return Tab;
}());
exports.Tab = Tab;
//# sourceMappingURL=tab.js.map