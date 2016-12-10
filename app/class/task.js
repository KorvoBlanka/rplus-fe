"use strict";
var Task = (function () {
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
exports.Task = Task;
//# sourceMappingURL=task.js.map