import {Component} from 'angular2/core';
import {Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'ui-select',
  inputs: ['values', 'value'],
  template: `
    <div class="ui-select">
      <div class="dropdown-toggle" (window:click)="hide()" (click)="toggleHidden($event)"> {{ value.text }} </div>
      <ul class="dropdown-menu pull-right" [hidden]="hidden">
        <li *ngFor="#v of values"
          [class.selected]="v === value"
          (click)="select(v)">
          <label> {{ v.text }} </label>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .ui-select {
      position: relative;
    }
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      float: left;
      min-width: 160px;
      padding: 5px 0;
      margin: 2px 0 0;
      font-size: 14px;
      list-style: none;
      background-color: #fff;
      border: 1px solid #ccc;
      border: 1px solid rgba(0,0,0,0.15);
      background-clip: padding-box;
    }
    .dropdown-menu.pull-right {
      right: 0;
      left: auto;
    }

    .dropdown-toggle {
      display: inline-block;
      width: 100%;
      height: 100%;

      text-align: right;

      background: #fff;
      cursor: pointer;
    }
    .dropdown-menu>li>label {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: 400;
        line-height: 1.42857143;
        color: #333;
        white-space: nowrap;
    }
    .dropdown-menu>li>label:hover {
      background-color: #efefef;
    }
    .dropdown-menu>li.selected>label {
      background-color: #004f8a;
      color: #fff;
    }
  `]
})

export class UISelect {
    public values: Array<any>;
    public value: any;

    trick: boolean = false;
    hidden: boolean = true;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    toggleHidden(e) {
        this.hidden = !this.hidden;
        this.trick = true;
    }

    hide() {
        if (!this.trick) {
            this.hidden = true;
        }
        this.trick = false;
    }

    select(v: any) {
        this.value = v;
        this.hide();

        this.valueChange.emit(v);    // из за этого эмита не срабатывает [class.selected]="v === value"
    }

}
