import {Component} from '@angular/core';
import {Tab} from '../../class/tab';
import {OfferService} from "../../service/offer.service";


@Component({
    selector: 'tab-root',
    inputs: ['tab'],
    template: `
    <div [ngSwitch]="tab.type">
      <tab-main [tab]="tab" *ngSwitchCase="'main'"></tab-main>
      <tab-list-offer [tab]="tab" *ngSwitchCase="'list_offer'"></tab-list-offer>
      <tab-offer [tab]="tab" *ngSwitchCase="'offer'"></tab-offer>
      <tab-list-person [tab]="tab" *ngSwitchCase="'list_person'"></tab-list-person>
      <tab-person [tab]="tab" *ngSwitchCase="'person'"></tab-person>
      <tab-list-organisation [tab]="tab" *ngSwitchCase="'list_organisation'"></tab-list-organisation>
      <tab-organisation [tab]="tab" *ngSwitchCase="'organisation'"></tab-organisation>
      <tab-list-request [tab]="tab" *ngSwitchCase="'list_request'"></tab-list-request>
      <tab-request [tab]="tab" *ngSwitchCase="'request'"></tab-request>
    
      <tab-list-user [tab]="tab" *ngSwitchCase="'list_users'"></tab-list-user>
      <tab-user [tab]="tab" *ngSwitchCase="'user'"></tab-user>
    
      <div *ngSwitchDefault>tab.type == {{ tab.type }}</div>
    </div>
    `,
    providers: [OfferService]
})

export class TabRootComponent {
    public tab: Tab;

}
