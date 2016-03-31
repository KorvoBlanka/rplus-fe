import {Component} from 'angular2/core';
import {Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'ui-select',
  inputs: ['values', 'label', 'config'],
  template: `
    <div class="ui-select">
      <div class="dropdown-toggle" (window:click)="hide()" (click)="toggleHidden($event)">
        <span *ngIf="config?.icon" class="{{ config?.icon }}"></span>
       {{ label }}
        <span *ngIf="config?.draw_arrow" class="icon-triangle-down"></span>
      </div>
      <ul class="dropdown-menu pull-right" [hidden]="hidden">
        <li *ngFor="#v of values"
          [class.selected]="v.label === label"
          (click)="select(v)"
        >
          <label><span *ngIf="v?.icon" class="{{ v?.icon }}"></span> {{ v.label }} </label>
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

      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;

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
    .dropdown-menu>li:hover {
      background-color: #efefef;
    }
    .dropdown-menu>li.selected>label {
      background-color: #3366CC;
      color: #fff;
    }

    .inline {
      width: 120px;
      display: inline-block;
    }

    .inline > .dropdown-toggle {
      font-weight: 200;
      font-size: 14;
    }
  `]
})

export class UISelect {
  public values: Array<any>;
  public label: any;
  public config: UISelectConfig;

  trick: boolean = false;
  hidden: boolean = true;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  toggleHidden(e: MouseEvent) {
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
    this.label = v.label;
    this.hide();

    this.valueChange.emit({value: v});
  }

}

export interface UISelectOption {
  label: string,
  value: any,
}

export interface UISelectConfig {
  icon_class: string,

  draw_arrow: boolean
}
