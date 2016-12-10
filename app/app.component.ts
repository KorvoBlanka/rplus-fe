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


@Component({
    selector: 'rplus-app',
    styles: [``],
    template: `
        <div
            (contextmenu)="contextMenu($event)"
            (click)="click($event)"
        >
            <context-menu
                [posX]="_hubService.shared_var['cm_px']"
                [posY]="_hubService.shared_var['cm_py']"
                [hidden]="_hubService.shared_var['cm_hidden']"
                [items]="_hubService.shared_var['cm_items']"
            >
            </context-menu>
            <login-screen></login-screen>
            <tab-system></tab-system>
            <notebook></notebook>
        </div>
    `,
    providers: [HubService, ConfigService, UserService, OrganisationService, PersonService, RequestService, OfferService, TaskService, AnalysisService, HistoryService, PhotoService]
})

export class AppComponent {
    constructor(private _hubService: HubService) {
        this._hubService.shared_var['cm_hidden'] = true;
    }

    contextMenu(e) {
        this._hubService.shared_var['cm_hidden'] = true;
    }

    click(e) {
        this._hubService.shared_var['cm_hidden'] = true;
    }
}
