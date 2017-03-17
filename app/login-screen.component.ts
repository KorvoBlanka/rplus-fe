import {Component} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {ConfigService} from "./service/config.service";
import {SessionService} from "./service/session.service";
import {Observable} from "rxjs";


@Component({
    selector: 'login-screen',
    styles: [`
        .login-screen {
            position: absolute;
            top: 0px;
            left: 0px;
            z-index: 2;

            width: 100%;
            height: 100%;
        }

        .login-form {
            position: absolute;
            top: 100px;
            left: calc(50% - 200px);
            background-color: #fff;
            width: 400px;
            padding: 20px 20px 40px 20px;
        }

        .login-form > .form-header {
            font-size: 26px;
        }
    
        .input-control {
            margin-top: 5px;
        }
    
        .input-control > label {
    
        }
    
        .input-control > input {
            width: 100%;
            height: 28px;
        }
    
        .action-block {
            margin-top: 25px;
        }
    
        .button {
            text-align: center;
            padding: 5px 15px;
            background-color: #3366cc;
            color: #fff;
            cursor: pointer;
        }

    `],
    template: `
        <div class="login-screen bg-darkTeal" [hidden]="authorized | async">
            <div class="login-form" (keypress)="keypressHandler($event)">
                <div class="form-header">Добро пожаловать</div>
                <hr>
                
                <div class="input-control">
                    <label>Аккаунт</label>
                    <input [(ngModel)]="account">
                </div>
                
                <div class="input-control">
                    <label>Логин пользователя</label>
                    <input [(ngModel)]="login">
                </div>
                <div class="input-control">
                    <label>Пароль</label>
                    <input type="password" [(ngModel)]="password">
                </div>
                <div class="action-block" (click)="_login()">
                    <div class="button">Вход</div>
                </div>
            </div>
        </div>
    `
})

export class LoginScreenComponent {

    public authorized: Observable<boolean>;


    public account: string;
    public login: string;
    public password: string;

    constructor(private _sessionService: SessionService) {
        this.authorized = _sessionService.authorized;
    }


    ngOnInit() {
        let cuStr = localStorage.getItem('currentUser');
        if (cuStr) {
            let cu = JSON.parse(cuStr);
            this.account = cu.account;
            this.login = cu.login;
        }
        this.checkSession();
    }

    keypressHandler(e) {
        this._login();
    }

    _login() {
        localStorage.setItem('currentUser', JSON.stringify({ account: this.account, login: this.login }));
        this._sessionService.login(this.account, this.login, this.password);
    }

    _logout() {
        this._sessionService.logout();
    }

    checkSession() {
        this._sessionService.check();
    }
}
