import {bootstrap}    from 'angular2/platform/browser'

import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {HubService} from './service/hub.service';
import {ConfigService} from './service/config.service';
import {RealtyService} from './service/realty.service';
import {RequestService} from './service/request.service';
import {TaskService} from './service/task.service';
import {AnalysisService} from './service/analysis.service';
import {HistoryService} from './service/history.service';

import {AppComponent} from './app.component'


bootstrap(AppComponent, [ANGULAR2_GOOGLE_MAPS_PROVIDERS, HubService, ConfigService, RealtyService, RequestService, TaskService, AnalysisService, HistoryService]);
