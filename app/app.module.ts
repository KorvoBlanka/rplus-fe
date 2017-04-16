/**
 * Created by Aleksandr on 11.11.16.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule} from "@angular/http";
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from "./app.component";

import {ContextMenuComponent} from "./component/context-menu.component";
import {NotebookComponent} from "./component/notebook.component";
import {NotebookTask} from "./component/notebook/notebook-task.component";
import {Almanac} from "./component/notebook/almanac.component";
import {TabSystemComponent} from "./component/tab-system.component";
import {TabRootComponent} from "./component/tab/tab-root.component";
import {TabMainComponent} from "./component/tab/tab-main.component";
import {TabListOfferComponent} from "./component/tab/tab-list-offer.component";
import {TabOfferComponent} from "./component/tab/tab-offer.component";
import {TabListPersonComponent} from "./component/tab/tab-list-person.component";
import {TabPersonComponent} from "./component/tab/tab-person.component";
import {TabListOrganisationComponent} from "./component/tab/tab-list-organisation.component";
import {TabOrganisationComponent} from "./component/tab/tab-organisation.component";
import {TabListRequestComponent} from "./component/tab/tab-list-request.component";
import {TabRequestComponent} from "./component/tab/tab-request.component";
import {TabListUserComponent} from "./component/tab/tab-list-user.component";
import {TabUserComponent} from "./component/tab/tab-user.component";
import {UISelect} from "./component/ui/ui-select.component";
import {UIMultiSelect} from "./component/ui/ui-multiselect.component";
import {UIInputLine} from "./component/ui/ui-input-line.component";
import {UISlidingMenu} from "./component/ui/ui-slidingMenu.component";
import {OfferTableComponent} from "./component/offer-table.component";
import {DigestOfferComponent} from "./component/digest/digest-offer.component";
import {GoogleMapComponent, GoogleMapMarkerComponent} from "./component/google-map.component";
import {UITabs} from "./component/ui/ui-tabs.component";
import {UITab} from "./component/ui/ui-tab.component";
import {DigestHistoryComponent} from "./component/digest/digest-history.component";
import {DigestUserComponent} from "./component/digest/digest-user.component";
import {DigestOrganisationComponent} from "./component/digest/digest-organisation.component";
import {DigestRequestComponent} from "./component/digest/digest-request.component";
import {UILineChart} from "./component/ui/ui-line-chart.component";
import {UIBarChart} from "./component/ui/ui-bar-chart.component";
import {UIPieChart} from "./component/ui/ui-pie-chart.component";
import {UICarousel} from "./component/ui/ui-carousel.component";
import {UITagBlock} from "./component/ui/ui-tag-block.component";
import {DigestPersonComponent} from "./component/digest/digest-person.component";
import {UITag} from "./component/ui/ui-tag.component";
import {UIViewValue} from "./component/ui/ui-view-value";
import {UIMultiView} from "./component/ui/ui-multi-view";
import {OffClickDirective} from "./component/ui/off-click";

import {LoginScreenComponent} from "./login-screen.component";
import {AdminPageComponent} from "./admin-page.component";
import {MainComponent} from "./main.component";

import {FormatDatePipe} from "./pipe/format-date.pipe";
import {StrNnPipe} from "./pipe/str-nn.pipe";

import {GoogleChartComponent} from "./component/ui/chart/google-chart.component";

const appRoutes: Routes = [
    { path: 'admin', component: AdminPageComponent },
    { path: '', component: MainComponent },
    //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        FormsModule,
        HttpModule
        //AppRoutingModule
    ],
    declarations: [
        FormatDatePipe,
        StrNnPipe,

        LoginScreenComponent,
        AdminPageComponent,

        AppComponent,
        MainComponent,
        ContextMenuComponent,
        NotebookComponent,
        NotebookTask,
        Almanac,
        TabSystemComponent,
        TabRootComponent,
        TabMainComponent,
        TabListOfferComponent,
        TabOfferComponent,
        TabListPersonComponent,
        TabPersonComponent,
        TabListOrganisationComponent,
        TabOrganisationComponent,
        TabListRequestComponent,
        TabRequestComponent,
        TabListUserComponent,
        TabUserComponent,
        OfferTableComponent,
        DigestOfferComponent,
        GoogleMapComponent,
        GoogleMapMarkerComponent,

        DigestHistoryComponent,
        DigestOfferComponent,
        DigestUserComponent,
        DigestOrganisationComponent,
        DigestRequestComponent,
        DigestPersonComponent,

        UISelect,
        UIMultiSelect,
        UISlidingMenu,
        UIInputLine,
        UIViewValue,
        UIMultiView,
        UITabs,
        UITab,
        UITag,
        UITagBlock,
        UILineChart,
        UIBarChart,
        UIPieChart,
        UICarousel,

        GoogleChartComponent,

        OffClickDirective
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}
