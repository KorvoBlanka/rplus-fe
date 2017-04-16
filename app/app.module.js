"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Created by Aleksandr on 11.11.16.
 */
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var context_menu_component_1 = require("./component/context-menu.component");
var notebook_component_1 = require("./component/notebook.component");
var notebook_task_component_1 = require("./component/notebook/notebook-task.component");
var almanac_component_1 = require("./component/notebook/almanac.component");
var tab_system_component_1 = require("./component/tab-system.component");
var tab_root_component_1 = require("./component/tab/tab-root.component");
var tab_main_component_1 = require("./component/tab/tab-main.component");
var tab_list_offer_component_1 = require("./component/tab/tab-list-offer.component");
var tab_offer_component_1 = require("./component/tab/tab-offer.component");
var tab_list_person_component_1 = require("./component/tab/tab-list-person.component");
var tab_person_component_1 = require("./component/tab/tab-person.component");
var tab_list_organisation_component_1 = require("./component/tab/tab-list-organisation.component");
var tab_organisation_component_1 = require("./component/tab/tab-organisation.component");
var tab_list_request_component_1 = require("./component/tab/tab-list-request.component");
var tab_request_component_1 = require("./component/tab/tab-request.component");
var tab_list_user_component_1 = require("./component/tab/tab-list-user.component");
var tab_user_component_1 = require("./component/tab/tab-user.component");
var ui_select_component_1 = require("./component/ui/ui-select.component");
var ui_multiselect_component_1 = require("./component/ui/ui-multiselect.component");
var ui_input_line_component_1 = require("./component/ui/ui-input-line.component");
var ui_slidingMenu_component_1 = require("./component/ui/ui-slidingMenu.component");
var offer_table_component_1 = require("./component/offer-table.component");
var digest_offer_component_1 = require("./component/digest/digest-offer.component");
var google_map_component_1 = require("./component/google-map.component");
var ui_tabs_component_1 = require("./component/ui/ui-tabs.component");
var ui_tab_component_1 = require("./component/ui/ui-tab.component");
var digest_history_component_1 = require("./component/digest/digest-history.component");
var digest_user_component_1 = require("./component/digest/digest-user.component");
var digest_organisation_component_1 = require("./component/digest/digest-organisation.component");
var digest_request_component_1 = require("./component/digest/digest-request.component");
var ui_line_chart_component_1 = require("./component/ui/ui-line-chart.component");
var ui_bar_chart_component_1 = require("./component/ui/ui-bar-chart.component");
var ui_pie_chart_component_1 = require("./component/ui/ui-pie-chart.component");
var ui_carousel_component_1 = require("./component/ui/ui-carousel.component");
var ui_tag_block_component_1 = require("./component/ui/ui-tag-block.component");
var digest_person_component_1 = require("./component/digest/digest-person.component");
var ui_tag_component_1 = require("./component/ui/ui-tag.component");
var ui_view_value_1 = require("./component/ui/ui-view-value");
var ui_multi_view_1 = require("./component/ui/ui-multi-view");
var off_click_1 = require("./component/ui/off-click");
var login_screen_component_1 = require("./login-screen.component");
var admin_page_component_1 = require("./admin-page.component");
var main_component_1 = require("./main.component");
var format_date_pipe_1 = require("./pipe/format-date.pipe");
var str_nn_pipe_1 = require("./pipe/str-nn.pipe");
var google_chart_component_1 = require("./component/ui/chart/google-chart.component");
var appRoutes = [
    { path: 'admin', component: admin_page_component_1.AdminPageComponent },
    { path: '', component: main_component_1.MainComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(appRoutes),
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule
        ],
        declarations: [
            format_date_pipe_1.FormatDatePipe,
            str_nn_pipe_1.StrNnPipe,
            login_screen_component_1.LoginScreenComponent,
            admin_page_component_1.AdminPageComponent,
            app_component_1.AppComponent,
            main_component_1.MainComponent,
            context_menu_component_1.ContextMenuComponent,
            notebook_component_1.NotebookComponent,
            notebook_task_component_1.NotebookTask,
            almanac_component_1.Almanac,
            tab_system_component_1.TabSystemComponent,
            tab_root_component_1.TabRootComponent,
            tab_main_component_1.TabMainComponent,
            tab_list_offer_component_1.TabListOfferComponent,
            tab_offer_component_1.TabOfferComponent,
            tab_list_person_component_1.TabListPersonComponent,
            tab_person_component_1.TabPersonComponent,
            tab_list_organisation_component_1.TabListOrganisationComponent,
            tab_organisation_component_1.TabOrganisationComponent,
            tab_list_request_component_1.TabListRequestComponent,
            tab_request_component_1.TabRequestComponent,
            tab_list_user_component_1.TabListUserComponent,
            tab_user_component_1.TabUserComponent,
            offer_table_component_1.OfferTableComponent,
            digest_offer_component_1.DigestOfferComponent,
            google_map_component_1.GoogleMapComponent,
            google_map_component_1.GoogleMapMarkerComponent,
            digest_history_component_1.DigestHistoryComponent,
            digest_offer_component_1.DigestOfferComponent,
            digest_user_component_1.DigestUserComponent,
            digest_organisation_component_1.DigestOrganisationComponent,
            digest_request_component_1.DigestRequestComponent,
            digest_person_component_1.DigestPersonComponent,
            ui_select_component_1.UISelect,
            ui_multiselect_component_1.UIMultiSelect,
            ui_slidingMenu_component_1.UISlidingMenu,
            ui_input_line_component_1.UIInputLine,
            ui_view_value_1.UIViewValue,
            ui_multi_view_1.UIMultiView,
            ui_tabs_component_1.UITabs,
            ui_tab_component_1.UITab,
            ui_tag_component_1.UITag,
            ui_tag_block_component_1.UITagBlock,
            ui_line_chart_component_1.UILineChart,
            ui_bar_chart_component_1.UIBarChart,
            ui_pie_chart_component_1.UIPieChart,
            ui_carousel_component_1.UICarousel,
            google_chart_component_1.GoogleChartComponent,
            off_click_1.OffClickDirective
        ],
        bootstrap: [
            app_component_1.AppComponent
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map