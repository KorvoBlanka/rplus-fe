import {
  Component,
  SimpleChange,
  Output,
  EventEmitter
} from 'angular2/core';

import {HubService} from '../service/hub.service';


@Component({
  selector: 'context-menu',
  inputs: ['pos_x', 'pos_y', 'items', 'hidden'],
  template: `
    <div class="context-menu-wrapper"
      [style.left]="pos_x"
      [style.top]="pos_y"
      [hidden]="hidden"
      >
      <div
        *ngFor="#i of items"
        [ngSwitch]="i.class"
        (click)="click($event, i)"
      >
        <div *ngSwitchWhen="'entry'" class="entry" [class.disabled]="i.disabled">
          <span *ngIf="i.icon" class="icon-{{ i.icon }}"></span>
          {{ i.label }}
        </div>
        <div *ngSwitchWhen="'entry_cb'" class="entry" [class.disabled]="i.disabled">
          <span *ngIf="i.value" class="icon-check"></span>
          <span *ngIf="!i.value" class="icon-none"></span>
          {{ i.label }}
        </div>
        <hr *ngSwitchWhen="'delimiter'">
      </div>
    </div>
    `,
    styles: [`
      .context-menu-wrapper {

        height: 450px;
        overflow-y: scroll;

        position: fixed;
        background-color: #fff;
        border: 1px solid #eee;
        z-index: 10;
      }

      .entry {
        padding: 3px 20px;
        font-weight: normal;
        line-height: 30px;
        height: 30px;
        color: #333;
        white-space: nowrap;
        min-width: 120px;
        cursor: pointer;

        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .entry:hover {
        background-color: #eee;
      }

      .entry.disabled {
        background-color: #fff;
        color: #aaa;
        cursor: not-allowed;
      }

      hr {
        margin: 5px;
      }
    `],
    directives: [],
  })

  export class ContextMenuComponent {
    pos_x: number;
    pos_y: number;
    hidden: boolean = true;
    items: any[];

    @Output() dummy: EventEmitter<any> = new EventEmitter();

    click(e: MouseEvent, item) {

      if (item.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (item.callback) {
        item.callback();
      }

    }

    constructor() {}

    ngOnInit() {}

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {}
  }

/* example
contextmenu(e) {
  e.preventDefault();
  e.stopPropagation();
  this._hubService.shared_var['cm_px'] = e.pageX;
  this._hubService.shared_var['cm_py'] = e.pageY;
  this._hubService.shared_var['cm_hidden'] = false;
  this._hubService.shared_var['cm_items'] = [
    {class: "entry_cb", disabled: true, value: true, label: "пункт 1", callback: function() {alert('yay 1!')}},
    {class: "entry_cb", disabled: false, value: false, label: "пункт 2", callback: function() {alert('yay 2!')}},
    {class: "entry_cb", disabled: true, value: true, label: "пункт 3", callback: function() {alert('yay 3!')}},
    {class: "entry", disabled: false, icon: "cancel", label: "пункт 4", callback: function() {alert('yay 4!')}},
    {class: "delimiter"},
    {class: "entry", icon: "add", label: "пункт 5", callback: function() {alert('yay 5!')}},
  ];
}*/
