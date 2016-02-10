import {Component} from 'angular2/core';
import {Tab} from '../../class/tab';
import {TabMainComponent} from './tab-main.component';
import {TabListRealtyComponent} from './tab-list-realty.component';
import {TabRealtyComponent} from './tab-realty.component';
import {TabListPersonComponent} from './tab-list-person.component';
import {TabPersonComponent} from './tab-person.component';
import {TabListOrganisationComponent} from './tab-list-organisation.component';
import {TabOrganisationComponent} from './tab-organisation.component';
import {TabListRequestComponent} from './tab-list-request.component';
import {TabRequestComponent} from './tab-request.component';

@Component({
  selector: 'tab-root',
  inputs: ['tab'],
  template: `
    <div [ngSwitch]="tab.type">
      <tab-main [tab]="tab" *ngSwitchWhen="'main'"></tab-main>
      <tab-list-realty [tab]="tab" *ngSwitchWhen="'list_realty'"></tab-list-realty>
      <tab-realty [tab]="tab" *ngSwitchWhen="'realty'"></tab-realty>
      <tab-list-person [tab]="tab" *ngSwitchWhen="'list_person'"></tab-list-person>
      <tab-person [tab]="tab" *ngSwitchWhen="'person'"></tab-person>
      <tab-list-organisation [tab]="tab" *ngSwitchWhen="'list_organisation'"></tab-list-organisation>
      <tab-organisation [tab]="tab" *ngSwitchWhen="'organisation'"></tab-organisation>
      <tab-list-request [tab]="tab" *ngSwitchWhen="'list_request'"></tab-list-request>
      <tab-request [tab]="tab" *ngSwitchWhen="'request'"></tab-request>
      <div *ngSwitchDefault>tab.type == {{ tab.type }}</div>
    </div>
  `,
  directives: [
    TabMainComponent,
    TabListRealtyComponent,
    TabRealtyComponent,
    TabListPersonComponent,
    TabPersonComponent,
    TabListOrganisationComponent,
    TabOrganisationComponent,
    TabListRequestComponent,
    TabRequestComponent,
  ],
})

export class TabRootComponent {
    public tab: Tab;

}
