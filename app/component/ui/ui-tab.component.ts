import {Component, SimpleChange} from 'angular2/core';
import {Output, EventEmitter} from 'angular2/core';

import {UITabs} from './ui-tabs.component';

@Component({
  selector: 'ui-tab',
  inputs: [
    'title',
    'active'
  ],
  styles: [``],
  template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `
})

export class UITab {
  title: string;
  active: boolean = false;

  @Output() tabSelect: EventEmitter<any> = new EventEmitter();

  selectTab() {
    this.active = true;
    this.tabSelect.emit(this);
  }
}
