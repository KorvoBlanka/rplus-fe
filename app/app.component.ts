import {Component} from '@angular/core';

import {HubService} from './service/hub.service';
import {RequestService} from "./service/request.service";
import {ConfigService} from "./service/config.service";
import {PersonService} from "./service/person.service";
import {UserService} from "./service/user.service";
import {OfferService} from "./service/offer.service";
import {OrganisationService} from "./service/organisation.service";
import {TaskService} from "./service/task.service";
import {AnalysisService} from "./service/analysis.service";
import {HistoryService} from "./service/history.service";
import {PhotoService} from "./service/photo.service";
import {AccountService} from "./service/account.service";
import {SessionService} from "./service/session.service";


@Component({
    selector: 'rplus-app',
    styles: [``],
    template: `
        <login-screen></login-screen>
        <router-outlet></router-outlet>
    `,
    providers: [HubService, ConfigService, UserService, OrganisationService, PersonService, RequestService, OfferService, TaskService, AnalysisService, HistoryService, PhotoService, AccountService, SessionService]
})

export class AppComponent {
    constructor() {
    }
}
