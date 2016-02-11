System.register(['angular2/platform/browser', './service/hub.service', './service/config.service', './service/realty.service', './service/request.service', './service/task.service', './service/analysis.service', './service/history.service', './service/person.service', './service/organisation.service', './app.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, hub_service_1, config_service_1, realty_service_1, request_service_1, task_service_1, analysis_service_1, history_service_1, person_service_1, organisation_service_1, app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (hub_service_1_1) {
                hub_service_1 = hub_service_1_1;
            },
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            },
            function (realty_service_1_1) {
                realty_service_1 = realty_service_1_1;
            },
            function (request_service_1_1) {
                request_service_1 = request_service_1_1;
            },
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            },
            function (analysis_service_1_1) {
                analysis_service_1 = analysis_service_1_1;
            },
            function (history_service_1_1) {
                history_service_1 = history_service_1_1;
            },
            function (person_service_1_1) {
                person_service_1 = person_service_1_1;
            },
            function (organisation_service_1_1) {
                organisation_service_1 = organisation_service_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [
                hub_service_1.HubService,
                config_service_1.ConfigService,
                realty_service_1.RealtyService,
                request_service_1.RequestService,
                task_service_1.TaskService,
                analysis_service_1.AnalysisService,
                history_service_1.HistoryService,
                person_service_1.PersonService,
                organisation_service_1.OrganisationService
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map