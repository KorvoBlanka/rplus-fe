System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Tab;
    return {
        setters:[],
        execute: function() {
            Tab = (function () {
                function Tab(tab_sys, type, args) {
                    this.args = {};
                    this.header = 'Loading...';
                    this.type = type;
                    this.tab_sys = tab_sys;
                    this.args = args;
                }
                Tab.prototype.reborn = function (type, args) {
                    this.header = 'Loading...';
                    this.type = type;
                    this.args = args;
                };
                return Tab;
            }());
            exports_1("Tab", Tab);
        }
    }
});
//# sourceMappingURL=tab.js.map