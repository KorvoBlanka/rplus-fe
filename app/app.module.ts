/**
 * Created by Aleksandr on 11.11.16.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";

import {ContextMenuComponent} from "./component/context-menu.component";
import {NotebookComponent} from "./component/notebook.component";
import {LoginScreenComponent} from "./component/login-screen.component";
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
import {FormatDatePipe} from "./pipe/format-date.pipe";
import {UITag} from "./component/ui/ui-tag.component";
import {UIViewValue} from "./component/ui/ui-view-value";
import {OffClickDirective} from "./component/ui/off-click";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        FormatDatePipe,

        AppComponent,
        ContextMenuComponent,
        NotebookComponent,
        LoginScreenComponent,
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
        UISelect,
        UIViewValue,
        UITabs,
        UITab,
        UITag,
        UITagBlock,
        DigestHistoryComponent,
        DigestOfferComponent,
        DigestUserComponent,
        DigestOrganisationComponent,
        DigestRequestComponent,
        DigestPersonComponent,
        UILineChart,
        UIBarChart,
        UIPieChart,
        UICarousel,

        OffClickDirective
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}