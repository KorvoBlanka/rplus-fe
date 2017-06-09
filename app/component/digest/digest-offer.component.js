"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var hub_service_1 = require("../../service/hub.service");
var DigestOfferComponent = (function () {
    function DigestOfferComponent(_hubService) {
        this._hubService = _hubService;
        this.compact = false;
        this.typeCodeOptions = {
            room: 'Комната',
            apartment: 'Квартира',
            apartment_small: 'Малосемейка',
            apartment_new: 'Новостройка',
            house: 'Дом',
            dacha: 'Дача',
            cottage: 'Коттедж',
            townhouse: 'Таунхаус',
            other: 'Другое',
            land: 'Земля',
            building: 'здание',
            office_place: 'офис',
            office: 'офис',
            market_place: 'торговая площадь',
            production_place: 'производственное помещение',
            gpurpose_place: 'помещение общего назначения',
            autoservice_place: 'автосервис',
            service_place: 'помещение под сферу услуг',
            warehouse_place: 'склад база',
            garage: 'гараж'
        };
    }
    ;
    DigestOfferComponent.prototype.open = function () {
        var tabSys = this._hubService.getProperty('tab_sys');
        tabSys.addTab('offer', { offer: this.offer });
    };
    DigestOfferComponent.prototype.compactHeight = function () {
        if (this.compact)
            return '68px';
        else
            return '85px';
    };
    return DigestOfferComponent;
}());
DigestOfferComponent = __decorate([
    core_1.Component({
        selector: 'digest-offer',
        inputs: ['offer', 'compact'],
        styles: ["\n        .billet {\n            background-color: rgb(247, 247, 247);\n            color: #696969;\n            font-weight: 200;\n            font-size: 14px;\n            height: 85px;\n            position: relative;\n            margin: 3px 0;\n            padding: 5px 0;\n        }\n\n        .billet.selected {\n            background-color: #157ad3;\n            color: #fff !important;\n        }\n\n        .billet > div {\n            width: 100%;\n        }\n\n        .describe{\n            color: black;\n            font-size: 13px;\n        }\n\n        .healthbar {\n            height: 1px;\n            width: 95%;\n            margin: 5px 0 0 5px;\n            background: #ccc;\n            position: relative;\n        }\n\n        .healthbar > .health {\n            position: absolute;\n            top: 0;\n            left: 0;\n            height: 100%;\n            width: 0%;\n            background-color: red;\n        }\n\n        .timestamp {\n            position: absolute;\n            top: 6px; right: 9px;\n            font-size: 11px;\n            color: #bbb;\n        }\n\n        .compact_owner {\n            color: #bfbcbb !important;\n        }\n\n        .tag-mark {\n            position: absolute;\n            right: 10px;\n            top: 40%;\n        }\n\n        .compact{\n            height: 68px;\n            background-color: inherit;\n        }\n    "],
        template: "\n        <div class=\"billet\" data-id=\"r{{offer._id}}\" id=\"r{{offer.id}}\" [class.compact] = \"compact\">\n            <div>\n                <div class=\"timestamp\" *ngIf=\"offer.changeDate\"> {{ (offer.changeDate | formatDate).toString().split(\" \")[0] }} </div>\n                <div class=\"tag-mark\">\n                    <ui-tag\n                        [value]=\"offer.tag\"\n                    >\n                    </ui-tag>\n                </div>\n                <img *ngIf=\"!compact\" src=\"{{ offer.photoUrl?offer.photoUrl[0]:'res/no_photo.png' }}\" style=\"height: 60px;width: 74px;float: left;margin: 0 10px;\">\n                <div class=\"describe\" style=\"min-height: 70px; margin-left: 10px;\">\n                    <span style=\"font-style: italic;  font-size: 9pt; color: #002E5D;\"\n                        *ngIf =\"offer.typeCode\"\n                    >{{ typeCodeOptions[offer.typeCode].split(\" \")[0] }}\n                    </span>\n                    {{ (offer.locality?.split(\",\")[0] || offer.city_n ) === undefined ? \" \" : \", \"+(offer.locality?.split(\",\")[0] || offer.city_n) }}<br>\n                    <span *ngIf=\"(offer.locality || ' ').split(',')[1]\">{{ (offer.locality || \" \").split(\",\")[1] }}</span >\n                    <div style=\"width: 220px; height: 17px; text-overflow: ellipsis;white-space: nowrap;overflow: hidden;\n                            float: left;margin-right: 30px;\">\n                            {{ (offer.street_n || offer.address) === undefined ? \"\" : (offer.street_n || offer.address) }}\n                            {{ offer.house_n === undefined ? \"\" : (\", \"+offer.house_n) }}\n                            {{ offer.roomsCount  === undefined ? \"\" : \", \"+ offer.roomsCount+\"\u043A\u043E\u043C.\"}}\n                            {{ offer.squareTotal  === undefined ? \"\" : \", \"+ offer.squareTotal+\"\u043C.\" }}\n                            {{ offer.floor  === undefined ? \"\" : \", \"+ offer.floor+\"/\"}}\n                            {{ offer.floorsCount  === undefined ? \"\" : \"\"+ offer.floorsCount}}</div><br>\n\n                    <div class=\"text-primary\" style = \"color: #8B0000;\">\u0426\u0435\u043D\u0430: {{ offer.ownerPrice }} \u0442\u044B\u0441. \u0440\u0443\u0431.</div>\n                    <span *ngIf=\"!(offer.locality || ' ').split(',')[1] && !compact\" style=\"height: 10px;display: block;\"></span>\n                    <span style=\"font-size: 9pt; color: #a9a8a8;\" [class.compact_owner]=\"compact\">\n                        \u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439:\n                    </span>\n                    <span  [class.compact_owner]=\"compact\"> {{offer.agent?.name}} </span>\n                </div>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [hub_service_1.HubService])
], DigestOfferComponent);
exports.DigestOfferComponent = DigestOfferComponent;
//# sourceMappingURL=digest-offer.component.js.map