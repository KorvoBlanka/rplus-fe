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
var offer_service_1 = require("../../service/offer.service");
var config_service_1 = require("../../service/config.service");
var hub_service_1 = require("../../service/hub.service");
var user_service_1 = require("../../service/user.service");
var suggestion_service_1 = require("../../service/suggestion.service");
var offer_1 = require("../../class/offer");
var session_service_1 = require("../../service/session.service");
var TabListOfferComponent = (function () {
    function TabListOfferComponent(_elem, _hubService, _offerService, _userService, _configService, _suggestionService, _sessionService) {
        var _this = this;
        this._elem = _elem;
        this._hubService = _hubService;
        this._offerService = _offerService;
        this._userService = _userService;
        this._configService = _configService;
        this._suggestionService = _suggestionService;
        this._sessionService = _sessionService;
        this.tableMode = false;
        this.source = offer_service_1.OfferSource.LOCAL;
        this.searchQuery = "";
        this.searchArea = [];
        this.sgList = [];
        this.iconSource = ["url(res/base_plus.png)", "url(res/base_color.png)"];
        this.filter = {
            stageCode: 'all',
            agentId: 'all',
            tag: 'all',
            changeDate: 90,
            offerTypeCode: 'sale',
        };
        this.sort = {};
        this.agentOpts = [
            { value: 'all', label: 'Все объекты', bold: true },
            { value: 'realtor', label: 'Конкуренты', bold: true },
            { value: 'private', label: 'Собственники', bold: true },
            { value: 'company', label: 'Наша компания', bold: true },
            { value: 'my', label: 'Мои объекты', bold: true }
        ];
        this.stageCodeOptions = [
            { value: 'all', label: 'Все' },
            { value: 'raw', label: 'Не активен' },
            { value: 'active', label: 'Активен' },
            { value: 'price', label: 'Прайс' },
            { value: 'deal', label: 'Сделка' },
            { value: 'suspended', label: 'Приостановлен' },
            { value: 'archive', label: 'Архив' }
        ];
        this.stateCodeOptions = [
            { value: 'all', label: 'Все' },
            { value: 'raw', label: 'Не активен' },
            { value: 'active', label: 'Активен' },
            { value: 'work', label: 'Прайс' },
            { value: 'ок', label: 'Сделка' },
            { value: 'suspended', label: 'Приостановлен' },
            { value: 'archive', label: 'Архив' }
        ];
        this.paneHidden = false;
        this.mapDrawAllowed = false;
        this.hitsCount = 0;
        this.page = 0;
        this.perPage = 32;
        this.selectedOffers = [];
        this.lastClckIdx = 0;
        this.timestamp = (Date.now() / 1000) - 1000;
        setTimeout(function () {
            _this.tab.header = 'Предложения';
        });
    }
    TabListOfferComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.tab.args.query) {
            this.searchQuery = this.tab.args.query;
        }
        this.tab.refreshRq.subscribe(function (sender) {
            _this.listOffers();
        });
        this.list = this._elem.nativeElement.querySelector('.digest-list');
        this.page = 0;
        this.listOffers();
        this.agentOpts.push({ value: 'all', label: 'Все объекты', bold: true });
        this.agentOpts.push({ value: 'all_agents', label: 'Все агенты', bold: true });
        this.agentOpts.push({ value: 'realtor', label: 'Посредник', bold: true });
        this.agentOpts.push({ value: 'private', label: 'Собственник', bold: true });
        this.agentOpts.push({ value: 'my', label: 'Мои объекты', bold: true });
        this._userService.list(null, null, "").subscribe(function (agents) {
            for (var i = 0; i < agents.length; i++) {
                var a = agents[i];
                _this.agentOpts.push({
                    value: '' + a.id,
                    label: a.name,
                    bold: false
                });
            }
        });
        var c = this._configService.getConfig();
        var loc = this._sessionService.getAccount().location;
        if (c.map[loc]) {
            this.lat = c.map[loc].lat;
            this.lon = c.map[loc].lon;
            this.zoom = c.map[loc].zoom;
        }
        else {
            this.lat = c.map['default'].lat;
            this.lon = c.map['default'].lon;
            this.zoom = c.map['default'].zoom;
        }
        this.calcSize();
    };
    TabListOfferComponent.prototype.listOffers = function () {
        var _this = this;
        this._offerService.list(this.page, this.perPage, this.source, this.filter, this.sort, this.searchQuery, this.searchArea).subscribe(function (data) {
            _this.hitsCount = data.hitsCount || 0;
            if (_this.page == 0) {
                _this.offers = data.list;
            }
            else {
                data.list.forEach(function (i) {
                    _this.offers.push(i);
                });
            }
        }, function (err) { return console.log(err); });
    };
    TabListOfferComponent.prototype.onResize = function (e) {
        this.calcSize();
    };
    TabListOfferComponent.prototype.toggleMode = function () {
        this.tableMode = !this.tableMode;
    };
    TabListOfferComponent.prototype.toggleDraw = function () {
        this.mapDrawAllowed = !this.mapDrawAllowed;
        if (!this.mapDrawAllowed) {
            this.page = 0;
            this.offers = [];
            this.searchArea = [];
            this.listOffers();
        }
    };
    TabListOfferComponent.prototype.finishDraw = function (e) {
        this.page = 0;
        this.offers = [];
        this.searchArea = e;
        this.listOffers();
    };
    TabListOfferComponent.prototype.calcSize = function () {
        if (this.paneHidden) {
            this.paneWidth = 0;
        }
        else {
            this.paneWidth = 370;
        }
        this.mapWidth = document.body.clientWidth - (31) - this.paneWidth;
        this.paneHeight = document.body.clientHeight - 116;
    };
    TabListOfferComponent.prototype.toggleLeftPane = function () {
        this.paneHidden = !this.paneHidden;
        this.calcSize();
    };
    TabListOfferComponent.prototype.tableContextMenu = function (e) {
        var _this = this;
        e.preventDefault();
        e.stopPropagation();
        var c = this;
        var users = this._userService.listCached("", 0, "");
        var uOpt = [];
        uOpt.push({ class: "entry", disabled: false, label: "Не задано", callback: function () {
                c.selectedOffers.forEach(function (o) {
                    o.agentId = null;
                    o.agent = null;
                    c._offerService.save(o);
                });
            } });
        users.forEach(function (u) {
            uOpt.push({ class: "entry", disabled: false, label: u.name, callback: function () {
                    c.selectedOffers.forEach(function (o) {
                        o.agentId = u.id;
                        o.agent = u;
                        c._offerService.save(o);
                    });
                    setTimeout(function () {
                        c.listOffers();
                    }, 1200);
                } });
        });
        var stateOpt = [];
        var states = [
            { value: 'raw', label: 'Не активен' },
            { value: 'active', label: 'Активен' },
            { value: 'work', label: 'В работе' },
            { value: 'suspended', label: 'Приостановлен' },
            { value: 'archive', label: 'Архив' }
        ];
        var stageOpt = [];
        var stages = [
            { value: 'contact', label: 'Первичный контакт' },
            { value: 'pre_deal', label: 'Заключение договора' },
            { value: 'show', label: 'Показ' },
            { value: 'prep_deal', label: 'Подготовка договора' },
            { value: 'decision', label: 'Принятие решения' },
            { value: 'negs', label: 'Переговоры' },
            { value: 'deal', label: 'Сделка' }
        ];
        states.forEach(function (s) {
            stateOpt.push({ class: "entry", disabled: false, label: s.label, callback: function () {
                    c.selectedOffers.forEach(function (o) {
                        o.stateCode = s.value;
                        c._offerService.save(o);
                    });
                } });
        });
        stages.forEach(function (s) {
            stageOpt.push({ class: "entry", disabled: false, label: s.label, callback: function () {
                    c.selectedOffers.forEach(function (o) {
                        o.stageCode = s.value;
                        c._offerService.save(o);
                    });
                    setTimeout(function () {
                        c.listOffers();
                    }, 1200);
                } });
        });
        var menu = {
            pX: e.pageX,
            pY: e.pageY,
            scrollable: false,
            items: [
                { class: "entry", disabled: false, icon: "dcheck", label: 'Проверить', callback: function () {
                        var tab_sys = _this._hubService.getProperty('tab_sys');
                        var rq = [];
                        _this.selectedOffers.forEach(function (o) {
                            rq.push(o.person.phones.join(" "));
                        });
                        tab_sys.addTab('list_offer', { query: rq.join(" ") });
                    } },
                { class: "entry", disabled: false, icon: "document", label: 'Открыть', callback: function () {
                        var tab_sys = _this._hubService.getProperty('tab_sys');
                        _this.selectedOffers.forEach(function (o) {
                            tab_sys.addTab('offer', { offer: o });
                        });
                    } },
                { class: "entry", disabled: false, icon: "trash", label: 'Удалить', callback: function () {
                        _this.selectedOffers.forEach(function (o) {
                            o.stageCode = 'archive';
                            c._offerService.save(o);
                        });
                        setTimeout(function () {
                            c.listOffers();
                        }, 1200);
                    } },
                { class: "delimiter" },
                { class: "submenu", disabled: false, icon: "edit", label: "Стадия", items: stageOpt },
                { class: "submenu", disabled: false, icon: "person", label: "Назначить", items: uOpt },
                { class: "submenu", disabled: true, icon: "task", label: "Задача", items: [
                        { class: "entry", disabled: false, label: "пункт x1", callback: function () { alert('yay s1!'); } },
                        { class: "entry", disabled: false, label: "пункт x2", callback: function () { alert('yay s2!'); } },
                    ] },
                { class: "submenu", disabled: true, icon: "advert", label: "Реклама", items: [
                        { class: "entry", disabled: false, label: "пункт x1", callback: function () { alert('yay s1!'); } },
                        { class: "entry", disabled: false, label: "пункт x2", callback: function () { alert('yay s2!'); } },
                    ] },
                { class: "delimiter" },
                { class: "tag", icon: "tag", label: "Теги:", items: [
                        { disabled: false, icon: '', callback: function () { } },
                        { disabled: false, icon: 'circle tag-red', callback: function () { } },
                        { disabled: false, icon: 'circle tag-orange', callback: function () { } },
                        { disabled: false, icon: 'circle tag-yellow', callback: function () { } },
                        { disabled: false, icon: 'circle tag-green', callback: function () { } },
                        { disabled: false, icon: 'circle tag-blue', callback: function () { } },
                        { disabled: false, icon: 'circle tag-violet', callback: function () { } },
                        { disabled: false, icon: 'circle tag-gray', callback: function () { } },
                    ] }
            ]
        };
        this._hubService.shared_var['cm'] = menu;
        this._hubService.shared_var['cm_hidden'] = false;
    };
    TabListOfferComponent.prototype.click = function (event, offer) {
        var cIdx = this.offers.indexOf(offer);
        this.setLocation(offer);
        if (event.button == 2) {
            if (this.selectedOffers.indexOf(offer) == -1) {
                this.lastClckIdx = cIdx;
                this.selectedOffers = [offer];
            }
        }
        else {
            if (event.ctrlKey) {
                // add to selection
                this.lastClckIdx = cIdx;
                this.selectedOffers.push(offer);
            }
            else if (event.shiftKey) {
                this.selectedOffers = [];
                var idx = cIdx;
                var idx_e = this.lastClckIdx;
                if (cIdx > this.lastClckIdx) {
                    idx = this.lastClckIdx;
                    idx_e = cIdx;
                }
                while (idx <= idx_e) {
                    var oi = this.offers[idx++];
                    this.selectedOffers.push(oi);
                }
            }
            else {
                this.lastClckIdx = cIdx;
                this.selectedOffers = [offer];
            }
        }
    };
    TabListOfferComponent.prototype.dblClick = function (offer) {
        this.openOffer(offer);
    };
    TabListOfferComponent.prototype.tStart = function (offer) {
        var _this = this;
        clearTimeout(this.to);
        this.to = setTimeout(function () {
            _this.openOffer(offer);
        }, 1000);
    };
    TabListOfferComponent.prototype.tEnd = function (offer) {
        clearTimeout(this.to);
    };
    TabListOfferComponent.prototype.setLocation = function (o) {
        if (o.locationLat && o.locationLon) {
            this.lat = o.locationLat;
            this.lon = o.locationLon;
        }
    };
    TabListOfferComponent.prototype.openOffer = function (offer) {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', { offer: offer });
    };
    TabListOfferComponent.prototype.scroll = function (e) {
        if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
            this.page += 1;
            this.listOffers();
        }
    };
    TabListOfferComponent.prototype.docClick = function () {
        this.sgList = [];
    };
    TabListOfferComponent.prototype.select = function (itm) {
        this.searchQuery = itm;
        this.sgList = [];
    };
    TabListOfferComponent.prototype.searchStringChanged = function (e) {
        var c = this;
        clearTimeout(this.suggestionTo);
        this.suggestionTo = setTimeout(function () {
            c.searchParamChanged(e);
        }, 500);
    };
    TabListOfferComponent.prototype.searchParamChanged = function (e) {
        var _this = this;
        if (this.searchQuery.length > 0) {
            var sq = this.searchQuery.split(" ");
            var lp = sq.pop();
            var q = sq.join(" ");
            this.sgList = [];
            if (lp.length > 0) {
                // запросить варианты
                this._suggestionService.list(this.searchQuery).subscribe(function (sgs) {
                    sgs.forEach(function (e) {
                        _this.sgList.push(e);
                    });
                    console.log(_this.sgList);
                });
            }
        }
        this.page = 0;
        this.listOffers();
    };
    TabListOfferComponent.prototype.sortChanged = function (e) {
        if (e.order == 0) {
            delete this.sort[e.field];
        }
        else {
            if (e.order == 1) {
                this.sort[e.field] = "ASC";
            }
            else {
                this.sort[e.field] = "DESC";
            }
        }
        this.page = 0;
        this.listOffers();
    };
    TabListOfferComponent.prototype.markerClick = function (o) {
        //r.selected = !r.selected;
        // scroll to object !?
        // let get dirty!
        //if (r.selected) {
        var e = this.list.querySelector('#r' + o.id);
        this.list.scrollTop = e.offsetTop - e.clientHeight;
        //}
    };
    TabListOfferComponent.prototype.addOffer = function () {
        var tab_sys = this._hubService.getProperty('tab_sys');
        tab_sys.addTab('offer', { offer: new offer_1.Offer() });
    };
    TabListOfferComponent.prototype.toggleSource = function (s) {
        if (s == 'local') {
            this.source = offer_service_1.OfferSource.LOCAL;
            this.iconSource[0] = "url(res/base_plus.png)";
            this.iconSource[1] = "url(res/base_color.png)";
        }
        else {
            this.source = offer_service_1.OfferSource.IMPORT;
            this.iconSource[0] = "url(res/base_plus_color.png)";
            this.iconSource[1] = "url(res/base.png)";
        }
        this.page = 0;
        this.listOffers();
    };
    TabListOfferComponent.prototype.getInputWidth = function () {
        if (this.tableMode)
            return '100%';
        else
            return '90%';
    };
    TabListOfferComponent.prototype.getSearchPosition = function () {
        if (this.tableMode)
            return '10px';
        else
            return '85px';
    };
    return TabListOfferComponent;
}());
TabListOfferComponent = __decorate([
    core_1.Component({
        selector: 'tab-list-offer',
        inputs: ['tab'],
        styles: ["\n        .underline{\n            border: 2px solid;\n            color: rgb(61, 155, 233);\n            position: absolute;\n            top: 91px;\n            left: 30;\n            width: 100vw;\n        }\n        .search-form {\n            position: absolute;\n            width: 38%;\n            margin-left: 610;\n            margin-top: 15px;\n            z-index: 1;\n        }\n\n        .search-form.table-mode {\n            border: 1px solid #fff;\n        }\n\n        .round_menu{\n            width: 170px;\n            height: 50px;\n            position: absolute;\n            left: 450;\n            top: 15px;\n            text-align: center;\n            z-index: 10;\n            line-height: 50px;\n            display: flex;\n            justify-content: space-around;\n\n        }\n        .fake{\n            font-size: 12pt;\n            color: #fbfbfb;\n            background-color: #0b9700;\n            height: 28px;\n            line-height: 28px;\n            width: 80px;\n            cursor: pointer;\n            text-align: center;\n        }\n\n        .tool-box {\n            height: 30px;\n            margin: 0 12px;\n        }\n\n        .search-box {\n            display: flex;\n            position: relative;\n            height: 30px;\n            margin: 12px 12px 8px 12px;\n        }\n\n        .search-box > a {\n            font-size: 10pt;\n            color: #fbfbfb;\n            background-color: #0e60c5;\n            height: 28px;\n            line-height: 28px;\n            width: 80px;\n            cursor: pointer;\n            text-align: center;\n        }\n\n        .offer-list {\n            position: relative;\n        }\n\n        .digest-list {\n            overflow-x: scroll;\n            border-right: 1px solid #ccc;\n            border-top: 1px solid #ccc;\n            background-color: rgb(247,247,247);\n        }\n\n        .pane {\n            float: left;\n            width: 370px;\n            height: 100%;\n            //border-right: 1px solid #ccc;\n        }\n\n        .work-area {\n            float: left;\n            height: calc(100% - 115px);\n            margin-top: 115px;\n            border-top: 1px solid #ccc;\n        }\n\n        .fixed-button {\n            position: fixed;\n            top: 0;\n            left: 0;\n        }\n\n        .inline-select {\n            display: inline-block;\n            height: 20px;\n            padding: 0 15px 0 0;\n            font-size: 14px;\n            color: #666;\n        }\n\n        .button {\n            height: 50px;\n            width: 50px;\n            border-radius: 40px;\n            cursor: pointer;\n            font-size: 11px;\n            line-height: 120px;\n            background-size: cover;\n            color: #6b6c6d;\n        }\n\n        .button:active {\n          //border: 1px solid silver;\n        }\n\n        .head{\n            width: 100%;\n            height: 115px;\n            display: flex;\n        }\n\n        .head > span{\n            font-size: 16pt;\n            display: block;\n            margin: 30px 0 0 30px;\n            color: #595a5a;\n        }\n        .plus:hover{\n            background-image: url(res/plus_color.png);\n        }\n\n        .plus {\n            background-image: url(res/Plus.png);\n        }\n        .import:hover{\n            background-image: url(res/base_plus_color.png) !important;\n        }\n\n        .local:hover{\n            background-image: url(res/base_color.png) !important;\n        }\n        \n        .seen {\n            background-color: #dbe2f0 !important;\n        }\n\n        .modified {\n            background-color: #dff0d8 !important;\n        }\n\n        .selected {\n            color: #fff !important;\n            background-color: #3366cc !important;\n        }\n\n        .src-sel {\n            background-color: #3366cc !important;\n        }\n\n        .suggestions {\n            min-width: 160px;\n            margin-top: 27px;\n            padding: 5px 0;\n            background-color: #f7f7f7;\n            border: 1px solid #e3e3e3;\n            width: 88%;\n            position: absolute;\n            z-index: 2;\n            font-size: 11pt;\n        }\n\n        .suggestions > ul {\n            margin: 0 0;\n            list-style: none;\n            padding: 3px 20px;\n        }\n\n        .suggestions > ul:hover {\n            background: #bbbbbb;\n            cursor: default;\n        }\n    "],
        template: "\n        <div class = \"round_menu\">\n            <div class=\"button plus\"  (click) =\"addOffer()\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</div>\n            <div (click)=\"toggleSource('import')\" class=\"button import\" [style.background-image]=\"iconSource[0]\">\u041E\u0431\u0449\u0430\u044F</div>\n            <div (click)=\"toggleSource('local')\"  class=\"button local\"  [style.background-image]=\"iconSource[1]\">\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F</div>\n        </div>\n        <div class=\"search-form\" [class.table-mode]=\"tableMode\">\n\n            <div class=\"search-box\">\n                <input type=\"text\" class=\"\" placeholder=\"\" [style.width]=\"getInputWidth()\"\n                    style=\"height: 28px; background-color: rgb(247, 247, 247); border: 1px solid rgba(204, 204, 204, 0.47);\"\n                    [(ngModel)]=\"searchQuery\" (keyup)=\"searchStringChanged($e)\"\n                >\n                <span class=\"icon-search\" style=\"position: absolute; top: 7px;\" [style.right]=\"getSearchPosition()\"></span>\n                <a (click)=\"toggleDraw()\" [hidden]=\"tableMode\">\n                    <span>\u041E\u0431\u0432\u0435\u0441\u0442\u0438</span>\n                </a>\n                <div class=\"suggestions\" (document:click)=\"docClick()\" *ngIf=\"sgList.length > 0\">\n                    <ul *ngFor=\"let item of sgList\" >\n                        <li >\n                            <a (click)=\"select(item)\">{{item}}</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"tool-box\">\n\n                <div class=\"pull-left\">\n\n                    <div class=\"inline-select\">\n                        <ui-select class=\"view-value edit-value\"\n                            [options]=\"[\n                                {value: 'sale', label: '\u041F\u0440\u043E\u0434\u0430\u0436\u0430'},\n                                {value: 'rent', label: '\u0410\u0440\u0435\u043D\u0434\u0430'}\n                            ]\"\n                            [value]=\"sale\"\n                            [config]=\"{icon: 'icon-square', drawArrow: true}\"\n                            (onChange)=\"filter.offerTypeCode = $event.selected.value; searchParamChanged($event);\"\n                        >\n                        </ui-select>\n                </div>\n                    <div class=\"inline-select\" *ngIf=\"source == 1\">\n                        <ui-select class=\"view-value edit-value\"\n                            [options]=\"stageCodeOptions\"\n                            [value]=\"filter.stage\"\n                            [config]=\"{icon: 'icon-square', drawArrow: true}\"\n                            (onChange)=\"filter.stageCode = $event.selected.value; searchParamChanged($event);\"\n                        >\n                        </ui-select>\n                    </div>\n                    <div class=\"inline-select\" *ngIf=\"source == 1\">\n                        <ui-select class=\"view-value edit-value\"\n                            [options]=\"agentOpts\"\n                                [value]=\"filter.agent\"\n                            [config]=\"{icon: 'icon-person', drawArrow: true}\"\n                            (onChange)=\"filter.agentId = $event.selected.value; searchParamChanged($event);\"\n                        >\n                        </ui-select>\n                    </div>\n                    <div class=\"inline-select\" *ngIf=\"source == 1\">\n                        <ui-select class=\"view-value edit-value\"\n                            [options]=\"[\n                                {value: 'all', label: '\u0412\u0441\u0435'},\n                                {value: '1', label: '\u041A\u0440\u0430\u0441\u043D\u044B\u0439', icon: 'icon-circle tag-red'},\n                                {value: '2', label: '\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439', icon: 'icon-circle tag-orange'},\n                                {value: '3', label: '\u0416\u0435\u043B\u0442\u044B\u0439', icon: 'icon-circle tag-yellow'},\n                                {value: '4', label: '\u0417\u0435\u043B\u0435\u043D\u044B\u0439', icon: 'icon-circle tag-green'},\n                                {value: '5', label: '\u0413\u043E\u043B\u0443\u0431\u043E\u0439', icon: 'icon-circle tag-blue'},\n                                {value: '6', label: '\u041B\u0438\u043B\u043E\u0432\u044B\u0439', icon: 'icon-circle tag-violet'},\n                                {value: '7', label: '\u0421\u0435\u0440\u044B\u0439', icon: 'icon-circle tag-gray'}\n                            ]\"\n                            [value]=\"filter.tag\"\n                            [config]=\"{icon: 'icon-tag', drawArrow: true}\"\n                            (onChange)=\"filter.tag = $event.selected.value; searchParamChanged($event);\"\n                        >\n                        </ui-select>\n                    </div>\n                    <div class=\"inline-select\">\n                        <ui-select class=\"view-value edit-value\"\n                            [options]=\"[\n                                {value: '1', label: '1 \u0434\u0435\u043D\u044C'},\n                                {value: '3', label: '3 \u0434\u043D\u044F'},\n                                {value: '7', label: '\u041D\u0435\u0434\u0435\u043B\u044F'},\n                                {value: '14', label: '2 \u043D\u0435\u0434\u0435\u043B\u0438'},\n                                {value: '30', label: '\u041C\u0435\u0441\u044F\u0446'},\n                                {value: '90', label: '3 \u043C\u0435\u0441\u044F\u0446\u0430'},\n                                {value: 'all', label: '\u0412\u0441\u0435'}\n                            ]\"\n                            [value]=\"filter.changeDate\"\n                            [config]=\"{icon: 'icon-month', drawArrow: true}\"\n                            (onChange)=\"filter.changeDate = $event.selected.value; searchParamChanged($event);\"\n                        >\n                        </ui-select>\n                    </div>\n                </div>\n                <div class=\"pull-right\">\n\n                    <span>{{ hitsCount }}</span>/<span>{{ selectedOffers.length }}</span>\n\n\n                    <a (click)=\"toggleMode()\">\n                        <span\n                            [ngClass]=\"{'icon-globus': tableMode, 'icon-table': !tableMode}\"\n                        ></span>\n                    </a>\n                </div>\n            </div>\n        </div>\n\n        <hr class='underline'>\n\n        <offer-table\n            [hidden]=\"!tableMode\"\n            [offers]=\"offers\"\n            (onSort)=\"sortChanged($event)\"\n            (onListEnd)=\"page = page + 1; listOffers();\"\n            (onSelect)=\"selectedOffers = $event\"\n        >\n        </offer-table>\n\n        <div class=\"tab-button fixed-button\" (click)=\"toggleLeftPane()\">\n            <span [ngClass]=\"{'icon-arrow-right': paneHidden, 'icon-arrow-left': !paneHidden}\"></span>\n        </div>\n\n        <div class=\"offer-list\"\n             [hidden]=\"tableMode\"\n             (window:resize)=\"onResize($event)\"\n        >\n            <div class=\"pane\" [hidden]=\"paneHidden\" [style.width.px]=\"paneWidth\">\n                <div class=\"head\"><span>{{tab.header}}</span></div>\n\n                <div class=\"digest-list\"\n                     (scroll)=\"scroll($event)\"\n                     [style.height]=\"paneHeight\"\n                     (contextmenu)=\"tableContextMenu($event)\"\n                >\n\n                    <digest-offer *ngFor=\"let offer of offers\"\n                                  [offer]=\"offer\"\n                                style=\"background-color: #fff\"\n                                [class.seen]=\"offer.openDate > timestamp\"\n                                [class.modified]=\"offer.changeDate > timestamp\"\n                                [class.selected]=\"selectedOffers.indexOf(offer) > -1\"\n                                (click)=\"click($event, offer)\"\n                                (contextmenu)=\"click($event, offer)\"\n                                (dblclick)=\"dblClick(offer)\"\n                                (touchstart)=\"tStart(offer)\"\n                                (touchend)=\"tEnd(offer)\"\n                    >\n                    </digest-offer>\n                </div>\n            </div>\n            <div class=\"work-area\" [style.width.px]=\"mapWidth\">\n                <google-map\n                    [latitude]=\"lat\"\n                    [longitude]=\"lon\"\n                    [zoom]=\"zoom\"\n                    [objects]=\"offers\"\n                    [draw_allowed]=\"mapDrawAllowed\"\n                    (drawFinished)=\"finishDraw($event)\"\n                >\n                </google-map>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        hub_service_1.HubService,
        offer_service_1.OfferService,
        user_service_1.UserService,
        config_service_1.ConfigService,
        suggestion_service_1.SuggestionService,
        session_service_1.SessionService])
], TabListOfferComponent);
exports.TabListOfferComponent = TabListOfferComponent;
//# sourceMappingURL=tab-list-offer.component.js.map