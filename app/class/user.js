"use strict";
var User = (function () {
    function User() {
        this.role = 'AGENT';
        this.phones = [];
        this.emails = [];
    }
    User.getData = function (arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            if (item.value !== null)
                return item;
        }
        return { type: "", value: "Не указан" };
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map