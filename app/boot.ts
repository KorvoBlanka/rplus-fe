import {bootstrap}    from 'angular2/platform/browser'

import {HubService} from './service/hub.service';
import {ConfigService} from './service/config.service';
import {RealtyService} from './service/realty.service';
import {RequestService} from './service/request.service';
import {TaskService} from './service/task.service';
import {AnalysisService} from './service/analysis.service';
import {HistoryService} from './service/history.service';
import {PersonService} from './service/person.service';
import {OrganisationService} from './service/organisation.service';
import {PhotoService} from './service/photo.service';
import {HTTP_PROVIDERS} from 'angular2/http';

import {AppComponent} from './app.component';

import 'rxjs/Rx';

bootstrap(AppComponent, [
    HubService,
    ConfigService,
    RealtyService,
    RequestService,
    TaskService,
    AnalysisService,
    HistoryService,
    PersonService,
    OrganisationService,
    PhotoService,
    HTTP_PROVIDERS
]);
