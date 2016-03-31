import {
  Component,
  ElementRef
} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {HubService} from '../service/hub.service'



@Component({
  selector: 'login-screen',

  template: `
  <div class="login-screen bg-darkTeal" [hidden]="is_logged_in">
    <div class="login-form">
      <div class="form-header">
        Добро пожаловать
      </div>
      <hr>
      <div class="input-control">
        <label>Имя пользователя</label>
        <input [(ngModel)]="user_name">
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
  `,
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
      padding: 20px;
      padding-bottom: 40px;
    }

    .login-form > .form-header {
      font-size: 26;
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
})

export class LoginScreenComponent {
  public is_logged_in: boolean;
  public user_name: string;
  public password: string;
  private _logingUrl = 'http://localhost:4567/session/login';
  private _logoutUrl = 'http://localhost:4567/session/logout';

  constructor(private _http: Http) {
    this.is_logged_in = true;
  }

  login() {
    this._login();
  }

  _login () {
    var headers = new Headers();
    var auth_header = btoa(this.user_name + ":" + this.password);
    //headers.append('Authorization', 'Basic ' + auth_header);
    this._http.post(this._logingUrl, "auth: " + auth_header, {
        headers: headers
        })
        .map(res => res.json())
        .subscribe(
          data => {
            if(data.result == "OK") {
              this.is_logged_in = true;
            }
          },
          err => console.log(err)
        );
  }

  _logout () {
    console.log(this._http.get(this._logoutUrl)
                      .map(res => res.json().data)
                      .catch(this.handleError));
  }

  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
