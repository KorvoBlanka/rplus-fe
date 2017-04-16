/**
 * Created by Aleksandr on 20.01.17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var config_service_1 = require("./service/config.service");
var account_service_1 = require("./service/account.service");
var user_service_1 = require("./service/user.service");
var account_1 = require("./class/account");
var user_1 = require("./class/user");
var AdminPageComponent = (function () {
    function AdminPageComponent(_http, _configService, _accountService, _userService) {
        this._http = _http;
        this._configService = _configService;
        this._accountService = _accountService;
        this._userService = _userService;
        this.selectedAcc = new account_1.Account();
        this.selectedUser = new user_1.User();
    }
    AdminPageComponent.prototype.ngOnInit = function () {
        this.listAccounts();
    };
    AdminPageComponent.prototype.selectAccount = function (acc) {
        this.selectedAcc = acc;
        this.listUsers();
    };
    AdminPageComponent.prototype.selectUser = function (user) {
        this.selectedUser = user;
    };
    AdminPageComponent.prototype.listAccounts = function () {
        var _this = this;
        this._accountService.list().subscribe(function (accs) {
            _this.accounts = accs;
        });
    };
    AdminPageComponent.prototype.listUsers = function () {
        var _this = this;
        this._userService.listX(this.selectedAcc.id, null, null, null).subscribe(function (users) {
            _this.users = users;
        });
    };
    AdminPageComponent.prototype.addAccount = function () {
        var acc = new account_1.Account();
        acc.name = "account_" + this.makeId();
        acc.location = "msk";
        this._accountService.save(acc);
        this.listAccounts();
    };
    AdminPageComponent.prototype.addUser = function () {
        var usr = new user_1.User();
        usr.name = "НОВЫЙ ПОЛЬЗОВАТЕЛЬ";
        usr.role = "AGENT";
        usr.login = "user_" + this.makeId();
        usr.password = "12345";
        usr.accountId = this.selectedAcc.id;
        this._userService.saveX(usr);
        this.listUsers();
    };
    AdminPageComponent.prototype.saveAccount = function () {
        this._accountService.save(this.selectedAcc);
    };
    AdminPageComponent.prototype.saveUser = function () {
        this._userService.saveX(this.selectedUser);
    };
    AdminPageComponent.prototype.makeId = function () {
        var id = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        return id;
    };
    return AdminPageComponent;
}());
AdminPageComponent = __decorate([
    core_1.Component({
        selector: 'admin-page',
        styles: ["\n        .admin-page {\n            position: absolute;\n            top: 0px;\n            left: 0px;\n\n            width: 100%;\n            height: 100%;\n            \n            background-color: #fff;\n            \n            padding: 15px;\n        }\n        \n        .account-list {\n            height: 50%;\n            width: 50%;\n            overflow-y: scroll;\n            display: inline-block;\n        }\n\n        .account {\n            cursor: pointer;\n        }\n\n        .account.selected {\n            background-color: #bbbbbb;\n        }\n\n        .user {\n            cursor: pointer;\n        }\n\n        .user.selected {\n            background-color: #bbbbbb;\n        }\n\n        .user-list {\n            height: 50%;\n            width: 49.5%;\n            overflow-y: scroll;\n            display: inline-block;            \n        }\n        \n        .properties {\n            height: 50%;\n        }\n        \n        .account-properties {\n            width: 49.5%;\n            display: inline-block;\n        }\n        \n        .user-properties {\n            width: 49.5%;\n            display: inline-block;        \n        }\n        \n        .header-1 {\n            font-size: 19px;\n            font-weight: 400;\n        }\n        \n        .butt {\n            border: 1px solid;\n            display: table;\n            margin: 15px;\n            text-align: center;\n            min-width: 20px;\n            cursor: hand;\n        }\n    "],
        template: "\n        <div class=\"admin-page\">\n            <div class=\"\">\n                <div class=\"account-list\">\n                    <div *ngFor=\"let acc of accounts\" (click)=\"selectAccount(acc)\">\n                        <div class=\"account\" [ngClass]=\"{selected: acc == selectedAcc}\">\n                            <span class=\"header-1\"> Account {{acc.id}} </span> (<span> {{acc.name}}</span>, <span> {{acc.location}}</span>)<br>\n                        </div>\n                    </div>\n                    <div class=\"butt\" (click)=\"addAccount()\">\n                        +\n                    </div>\n                </div>\n                <div class=\"user-list\">\n                    <div *ngFor=\"let user of users\" (click)=\"selectUser(user)\">\n                        <div class=\"user\" [ngClass]=\"{selected: user == selectedUser}\">\n                            <span class=\"header-1\"> User {{user.id}} </span> (<span> {{user.login}}</span>, <span> {{user.role}}</span>)<br>\n                        </div>\n                    </div>\n                    <div class=\"butt\" (click)=\"addUser()\">\n                        +\n                    </div>\n                </div>\n            </div>\n            <div class=\"properties\">\n                <div class=\"account-properties\">\n                    <div>\u0418\u043C\u044F: </div><input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"selectedAcc.name\"><br>\n                    <div>\u0413\u043E\u0440\u043E\u0434: </div><input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"selectedAcc.location\">       \n                    <div class=\"butt\" (click)=\"saveAccount()\">\u0421\u041E\u0425\u0420\u0410\u041D\u0418\u0422\u042C</div>\n                </div>\n                <div class=\"user-properties\">\n                    <div>\u0418\u043C\u044F: </div><input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"selectedUser.name\">\n                    <div>\u0420\u043E\u043B\u044C: </div><input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"selectedUser.role\">\n                    <div>\u041B\u043E\u0433\u0438\u043D: </div><input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"selectedUser.login\">\n                    <div>\u041F\u0430\u0440\u043E\u043B\u044C: </div><input type=\"text\" class=\"view-value edit-value\" [(ngModel)]=\"selectedUser.password\">\n                    <div class=\"butt\" (click)=\"saveUser()\">\u0421\u041E\u0425\u0420\u0410\u041D\u0418\u0422\u042C</div>\n                </div>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [http_1.Http, config_service_1.ConfigService, account_service_1.AccountService, user_service_1.UserService])
], AdminPageComponent);
exports.AdminPageComponent = AdminPageComponent;
//# sourceMappingURL=admin-page.component.js.map