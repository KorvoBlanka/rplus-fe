import {Component} from 'angular2/core';
import {Tab} from '../../class/tab';
import {TabMainComponent} from './tab-main.component';
import {TabListRealtyComponent} from './tab-list-realty.component'
import {TabRealtyComponent} from './tab-realty.component'


@Component({
  selector: 'tab-root',
  inputs: ['tab'],
  template: `
    <div [ngSwitch]="tab.type">
      <tab-main [tab]="tab" *ngSwitchWhen="'main'"></tab-main>
      <tab-list-realty [tab]="tab" *ngSwitchWhen="'list_realty'"></tab-list-realty>
      <tab-realty [tab]="tab" *ngSwitchWhen="'realty'"></tab-realty>
      <div *ngSwitchDefault>tab.type == {{ tab.type }}</div>
    </div>
  `,
  directives: [TabMainComponent, TabListRealtyComponent, TabRealtyComponent],
})

export class TabRootComponent {
    public tab: Tab;

}