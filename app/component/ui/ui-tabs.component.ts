import {Component, ContentChildren, QueryList, } from 'angular2/core';

import {UITab} from './ui-tab.component';

@Component({
  selector: 'ui-tabs',
  inputs: ['header_mode'],
  template: `
    <div class="header">
      <div class="tabs" [class.align-left]="header_mode">
        <div *ngFor="#tab of tabs" class="tab-header" (click)="selectTab(tab)" [class.active]="tab.active">
          <a href="#">{{tab.title}}</a>
        </div>
      </div>
    </div>
    <ng-content></ng-content>
  `,
  styles: [`
    .tabs {
      display: flex;
      justify-content: center;
    }
    .tabs.align-left {
      justify-content: flex-start; 
    }
    .tab-header {
      display: inline-block;
      position: relative;
      width: 180px;
      border-right: 1px solid #eee;
      text-align: center;
    }
    .tab-header:first-child {
      border-left: 1px solid #eee;
    }
    .tab-header > a {
      color: #aaa;
    }
    .tab-header.active > a {
      color: #157ad3;
    }
    .tab-header.active::after {
      content: '';
      position: absolute;
      left: 0;
      top: 26px;
      width: 80%;
      margin-left: 10%;
      height: 2px;
      background-color: #157ad3;
    }
  `]
})

export class UITabs {
  @ContentChildren(UITab) tabs: QueryList<UITab>;
  header_mode: boolean;

  constructor() {}

  ngAfterContentInit() {

    if (!_hasActiveTab(this.tabs)) {
      this.selectTab(this.tabs.first);
    }

    function _hasActiveTab(tabs: QueryList<UITab>) {
      let activeTabs = tabs.filter((tab) => tab.active);
      return Boolean(activeTabs.length);
    }

  }

  selectTab(tab: UITab) {

    _deactivateAllTabs(this.tabs.toArray());
    tab.selectTab()

    function _deactivateAllTabs(tabs: UITab[]) {
      tabs.forEach((tab) => tab.active = false);
    }

  }

}
