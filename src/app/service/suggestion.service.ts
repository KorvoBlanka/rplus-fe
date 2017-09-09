/**
 * Created by owl on 3/14/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {ConfigService} from './config.service';

import {AsyncSubject} from "rxjs/AsyncSubject";

import 'rxjs/add/operator/map';
import {Pattern} from "@angular/cli/plugins/glob-copy-webpack-plugin";


@Injectable()
export class SuggestionService {

    RS: String = "";


    constructor(private _configService: ConfigService, private _http: Http) {
        this.RS = this._configService.getConfig().RESTServer + '/api/v1/offer/';
    };


    _escape(s: string) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    listKeywords(prefix: string) {
        console.log('kw suggestion list');


        let res = prefix.match(/((\d+)([^\d]*))$/);

        var sgs: string[] = [];

        if (res && res.length > 0) {

            let term = res[1];
            let value = parseFloat(res[2]);
            let word = res[3];
            let px = prefix.replace(term, '');


            let rx = new RegExp('^' + this._escape(word), 'i');

            if (value > 0 && value < 10 && ' комнатная'.match(rx)) {
                sgs.push(px + value.toLocaleString() + ' комнатная');
            }
            if (value > 0 && value < 100000 && ' тыс. руб.'.match(rx)) {
                sgs.push(px + value.toLocaleString() + ' тыс. руб.');
            }
            if (value > 0 && value < 100 && ' этаж'.match(rx)) {
                sgs.push(px + value.toLocaleString() + ' этаж');
            }
            if (value > 0 && value < 1000 && ' кв. м.'.match(rx)) {
                sgs.push(px + value.toLocaleString() + ' кв. м.');
            }
        } else {
            for (let e of ["одно", "двух", "трех", "четырех", "пяти", "шести", "семи", "восьми", "девяти"]) {
                let x = e + 'комнатная';

                let term = prefix.match(/(\S+)$/)[0];
                let trx = new RegExp('^' + this._escape(term), 'i');

                if (x.match(trx)) {
                    let px = prefix.replace(term, '');
                    sgs.push(px + x);
                }
            }

            for (let e of ["сталинка",
                "хрущевка",
                "улучшенная план.",
                "улучшенная планировка",
                "новая план.",
                "новая планировка",
                "индивидуальная план.",
                "индивидуальная планировка",
                "общежитие",
                "балкон",
                "лоджия",
                "балкон",
                "лоджия",
                "балкон застеклен",
                "застеклен балкон",
                "застеклена лоджия",
                "лоджия застеклена",
                "балкон",
                "лоджия",
                "раздельный санузел",
                "санузел раздельный",
                "санузел смежный",
                "смежный санузел",
                "раздельный санузел",
                "санузел раздельный",
                "душ",
                "туалет",
                "туалет",
                "санузел совмещенный",
                "совмещенный санузел",
                "после строителей",
                "социальный ремонт",
                "ремонт",
                "евроремонт",
                "евро ремонт",
                "дизайнерский ремонт",
                "удовлетворительное сост.",
                "удовлетворительное состояние",
                "нормальное сост.",
                "нормальное состояние",
                "хорошее сост.",
                "хорошее состояние",
                "отличное сост.",
                "отличное состояние",
                "кирпичный",
                "кирпичный дом",
                "монолитный",
                "монолитный дом",
                "панельный",
                "панельный дом",
                "деревянный",
                "деревянный дом",
                "брус",
                "каркасно засыпной",
                "каркасно засыпной дом",
                "монолитно кирпичный",
                "монолитно кирпичный дом",
                "комната",
                "квартира",
                "коттедж",
                "таунхаус",
                "дом",
                "земельный участок",
                "дача",
                "офис",
                "новостройка",
                "малосемейка",
                "другое",
                "торговая площадь",
                "офисное помещение",
                "здание",
                "помещение под сферу услуг",
                "база",
                "склад",
                "помещение под автобизнес",
                "помещение свободного назначения",
                "производственное помещение",
                "гараж",
                "стояночное место",
                "студия",
                "комнаты раздельные",
                "раздельные комнаты",
                "комнаты смежные",
                "смежные комнаты",
                "икарус",
                "комнаты смежно раздельные",
                "смежно раздельные комнаты"]) {

                let term = prefix.match(/(\S+)$/)[0];
                let trx = new RegExp('^' + this._escape(term), 'i');

                console.log(term);

                if (e.match(trx)) {
                    let px = prefix.replace(term, '');
                    sgs.push(px + e);
                }

            }
        }

        var ret_subj = <AsyncSubject<string[]>>new AsyncSubject();

        ret_subj.next(sgs);
        ret_subj.complete();

        return ret_subj;
    }

    list(prefix: string) {
        console.log('suggestion list');

        var ret_subj = <AsyncSubject<string[]>>new AsyncSubject();


        var sgs: string[] = [];

        /*
        var _resourceUrl = this.RS + 'suggestion?'
            + '&prefix=' + prefix;
        */

        var _resourceUrl = 'http://maps.googleapis.com/maps/api/geocode/json?'
            + "address=" + prefix
            + "&sensor=" + false
            + "&language=" + 'ru'
            + "&components=" + 'country:ru';

        var ret_subj = <AsyncSubject<string[]>>new AsyncSubject();

        this._http.get(_resourceUrl, { })
            .map(res => res.json()).subscribe(
            data => {

                var sgs: string[] = [];

                data.results.forEach(e => {

                    let short_addr = [];

                    e.address_components.forEach(ac => {
                        if (ac.types[0] == "street_number") {
                            short_addr[0] = "";
                            short_addr[1] = ac.short_name;
                        } else if (ac.types[0] == "route") {
                            short_addr[0] = ac.short_name;
                        } else if (ac.types[0] != "postal_code" && ac.types[0] != "country") {
                            short_addr.push(ac.short_name);
                        }
                    })

                    let ts = short_addr.join(", ");
                    if (ts) {
                        sgs.push(ts);
                    }
                });

                var arr = [];
                for(var i = 0; i < sgs.length; i++) {
                    if(arr.indexOf(sgs[i]) == -1) {
                        arr.push(sgs[i]);
                    }
                }

                ret_subj.next(arr);
                ret_subj.complete();

            },
            err => console.log(err)
        );


        return ret_subj;
    }

}
