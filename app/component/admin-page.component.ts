/**
 * Created by Aleksandr on 20.01.17.
 */

import {Component} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';


@Component({
    selector: 'admin-page',
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
        <div class="login-screen bg-darkTeal" [hidden]="isLoggedIn">
            <div class="login-form">
                <div class="form-header">Добро пожаловать</div>
                <hr>
                <div class="input-control">
                    <label>Имя пользователя</label>
                    <input [(ngModel)]="userName">
                </div>
                <div class="input-control">
                    <label>Пароль</label>
                    <input type="password" [(ngModel)]="password">
                </div>
                <div class="action-block" (click)="login()">
                    <div class="button">Вход</div>
                </div>
            </div>
        </div>
    `
})

export class AdminPageComponent {
    public isLoggedIn: boolean;
    public userName: string;
    public password: string;
    private _logingUrl = 'http://localhost:4567/session/login';
    private _logoutUrl = 'http://localhost:4567/session/logout';

    constructor(private _http: Http) {
        this.isLoggedIn = true;
    }

    login() {
        this._login();
    }

    _login() {
        var headers = new Headers();
        var auth_header = btoa(this.userName + ":" + this.password);
        //headers.append('Authorization', 'Basic ' + auth_header);
        this._http.post(this._logingUrl, "auth: " + auth_header, {
            headers: headers
        })
            .map(res => res.json())
            .subscribe(
                data => {
                    if (data.result == "OK") {
                        this.isLoggedIn = true;
                    }
                },
                err => console.log(err)
            );
    }

    _logout() {
        console.log(this._http.get(this._logoutUrl).map(res => res.json().data));
    }
}
