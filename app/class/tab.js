System.register([], function(exports_1) {
    var Tab;
    return {
        setters:[],
        execute: function() {
            Tab = (function () {
                function Tab(tab_sys, type, args) {
                    this.args = {};
                    this.header = '^_^';
                    this.type = type;
                    this.tab_sys = tab_sys;
                    this.args = args;
                }
                Tab.prototype.reborn = function (type, args) {
                    this.header = '^_^';
                    this.type = type;
                    this.args = args;
                };
                return Tab;
            })();
            exports_1("Tab", Tab);
        }
    }
});
//# sourceMappingURL=tab.js.map