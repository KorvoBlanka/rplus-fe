System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Person;
    return {
        setters:[],
        execute: function() {
            Person = (function () {
                function Person() {
                    this.phone = [];
                    this.email = [];
                }
                return Person;
            }());
            exports_1("Person", Person);
        }
    }
});
//# sourceMappingURL=person.js.map