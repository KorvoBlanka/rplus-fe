System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Task;
    return {
        setters:[],
        execute: function() {
            Task = (function () {
                function Task() {
                }
                Task.getResultText = function (task) {
                    switch (task.result_id) {
                        case (0): {
                            return 'Выполняется';
                        }
                        case (1): {
                            return 'Успешно';
                        }
                        case (2): {
                            return 'Не успешно';
                        }
                    }
                    return '???';
                };
                return Task;
            }());
            exports_1("Task", Task);
        }
    }
});
//# sourceMappingURL=task.js.map