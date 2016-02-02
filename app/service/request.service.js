System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var RequestService, REQUESTS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            RequestService = (function () {
                function RequestService() {
                }
                RequestService.prototype.getRequest = function (page, per_page) {
                    var f_idx = (page - 1) * per_page;
                    if (f_idx >= REQUESTS.length)
                        return [];
                    var l_idx = page * per_page;
                    var itm_num = per_page;
                    if (l_idx >= REQUESTS.length) {
                        itm_num = REQUESTS.length % per_page;
                    }
                    return REQUESTS.slice(f_idx, itm_num);
                };
                RequestService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], RequestService);
                return RequestService;
            })();
            exports_1("RequestService", RequestService);
            REQUESTS = [{ "_score": 0, "_type": "request", "_source": { "contact_id": "087110", "agent_id": null, "id": "245511", "req_text": "бульвар", "state": null, "req_bounds": "{\"geo_polygon\":{\"location\":{\"points\":[{\"lat\":48.477558696590584,\"lon\":135.0626564025879},{\"lat\":48.47767249308042,\"lon\":135.0651454925537},{\"lat\":48.47798543211136,\"lon\":135.067720413208},{\"lat\":48.478412164042545,\"lon\":135.0701665878296},{\"lat\":48.47886734081258,\"lon\":135.07239818572998},{\"lat\":48.479464754125246,\"lon\":135.07415771484375},{\"lat\":48.48139918705239,\"lon\":135.07518768310547},{\"lat\":48.48228103640603,\"lon\":135.07437229156494},{\"lat\":48.48321976241946,\"lon\":135.0732135772705},{\"lat\":48.48410158012139,\"lon\":135.0719690322876},{\"lat\":48.48498338249215,\"lon\":135.07059574127197},{\"lat\":48.4858936140197,\"lon\":135.06879329681396},{\"lat\":48.486690053205564,\"lon\":135.06673336029053},{\"lat\":48.48714515569626,\"lon\":135.0648021697998},{\"lat\":48.48626339091143,\"lon\":135.0595235824585},{\"lat\":48.486007391812024,\"lon\":135.05853652954102},{\"lat\":48.48555227911126,\"lon\":135.0572919845581},{\"lat\":48.48441447949168,\"lon\":135.05480289459229},{\"lat\":48.48378867882075,\"lon\":135.0536870956421},{\"lat\":48.48316287042832,\"lon\":135.0529146194458},{\"lat\":48.48262239333014,\"lon\":135.05239963531494},{\"lat\":48.482167250254136,\"lon\":135.052227973938},{\"lat\":48.48165520941188,\"lon\":135.05218505859375},{\"lat\":48.48102937469619,\"lon\":135.05239963531494},{\"lat\":48.4803466371091,\"lon\":135.0529146194458},{\"lat\":48.479749234182265,\"lon\":135.0534725189209},{\"lat\":48.479265617136086,\"lon\":135.054030418396},{\"lat\":48.47886734081258,\"lon\":135.05463123321533},{\"lat\":48.47858285580992,\"lon\":135.05518913269043},{\"lat\":48.47821302292136,\"lon\":135.05613327026367},{\"lat\":48.47781473833378,\"lon\":135.0575065612793},{\"lat\":48.47767249308042,\"lon\":135.05887985229492},{\"lat\":48.477558696590584,\"lon\":135.06055355072021},{\"lat\":48.477558696590584,\"lon\":135.0626564025879}]}}}" }, "_id": "245511", "_index": "rplus" }, { "_source": { "contact_id": "087110", "agent_id": null, "id": "506987", "req_text": "лермонтова", "state": null, "req_bounds": "{\"geo_polygon\":{\"location\":{\"points\":[{\"lat\":48.47539651478346,\"lon\":135.0965166091919},{\"lat\":48.47542496514235,\"lon\":135.09874820709229},{\"lat\":48.47568101765445,\"lon\":135.1008939743042},{\"lat\":48.476221568714024,\"lon\":135.10282516479492},{\"lat\":48.476819013184496,\"lon\":135.10424137115479},{\"lat\":48.47738800137717,\"lon\":135.10501384735107},{\"lat\":48.477900085294365,\"lon\":135.10531425476074},{\"lat\":48.47846906136213,\"lon\":135.10535717010498},{\"lat\":48.47923716893096,\"lon\":135.10488510131836},{\"lat\":48.48009060814481,\"lon\":135.10385513305664},{\"lat\":48.481000927480196,\"lon\":135.10239601135254},{\"lat\":48.48182589026695,\"lon\":135.1005506515503},{\"lat\":48.482451715155236,\"lon\":135.09849071502686},{\"lat\":48.48290685567867,\"lon\":135.09647369384766},{\"lat\":48.483020640171404,\"lon\":135.09334087371826},{\"lat\":48.482963747956944,\"lon\":135.09239673614502},{\"lat\":48.48273617846099,\"lon\":135.09145259857178},{\"lat\":48.482451715155236,\"lon\":135.09063720703125},{\"lat\":48.48211035708248,\"lon\":135.09007930755615},{\"lat\":48.48165520941188,\"lon\":135.08952140808105},{\"lat\":48.48117161053687,\"lon\":135.08909225463867},{\"lat\":48.480545769854565,\"lon\":135.088791847229},{\"lat\":48.47980613000223,\"lon\":135.0886631011963},{\"lat\":48.47909492766604,\"lon\":135.08870601654053},{\"lat\":48.4783552666591,\"lon\":135.08904933929443},{\"lat\":48.47764404398189,\"lon\":135.08977890014648},{\"lat\":48.47693281133354,\"lon\":135.09093761444092},{\"lat\":48.47625001861026,\"lon\":135.0924825668335},{\"lat\":48.47568101765445,\"lon\":135.09432792663574},{\"lat\":48.47539651478346,\"lon\":135.0965166091919}]}}}" }, "_id": "506987", "_index": "rplus", "_score": 0, "_type": "request" }, { "_id": "044884", "_index": "rplus", "_source": { "req_bounds": "{\"geo_polygon\":{\"location\":{\"points\":[{\"lat\":48.47166937982983,\"lon\":135.07201194763184},{\"lat\":48.4716978322787,\"lon\":135.07295608520508},{\"lat\":48.471925451295384,\"lon\":135.0737714767456},{\"lat\":48.472238425776105,\"lon\":135.0746726989746},{\"lat\":48.47266520604782,\"lon\":135.07553100585938},{\"lat\":48.47323424082621,\"lon\":135.07630348205566},{\"lat\":48.4738032692229,\"lon\":135.076904296875},{\"lat\":48.47420158530352,\"lon\":135.07720470428467},{\"lat\":48.47445764398984,\"lon\":135.07733345031738},{\"lat\":48.47462834906276,\"lon\":135.07733345031738},{\"lat\":48.47488440559528,\"lon\":135.0772476196289},{\"lat\":48.47516891133799,\"lon\":135.07694721221924},{\"lat\":48.475595666960686,\"lon\":135.07630348205566},{\"lat\":48.475993968969874,\"lon\":135.07540225982666},{\"lat\":48.47627846849051,\"lon\":135.07428646087646},{\"lat\":48.47642071765257,\"lon\":135.07334232330322},{\"lat\":48.47644916743714,\"lon\":135.07256984710693},{\"lat\":48.47488440559528,\"lon\":135.06965160369873},{\"lat\":48.47434384028879,\"lon\":135.06896495819092},{\"lat\":48.47386017171159,\"lon\":135.06857872009277},{\"lat\":48.473376498523656,\"lon\":135.06853580474854},{\"lat\":48.47289282072496,\"lon\":135.068621635437},{\"lat\":48.4724944943699,\"lon\":135.06913661956787},{\"lat\":48.472124617097364,\"lon\":135.06978034973145},{\"lat\":48.47184009428376,\"lon\":135.0705099105835},{\"lat\":48.4716978322787,\"lon\":135.0711965560913},{\"lat\":48.47166937982983,\"lon\":135.07201194763184}]}}}", "state": null, "req_text": "волочаевская", "agent_id": null, "id": "044884", "contact_id": "087110" }, "_type": "request", "_score": 0 }, { "_source": { "contact_id": "087110", "id": "259241", "agent_id": null, "req_text": "калинина", "state": null, "req_bounds": "{\"geo_polygon\":{\"location\":{\"points\":[{\"lat\":48.477188856235614,\"lon\":135.05557537078857},{\"lat\":48.477188856235614,\"lon\":135.05686283111572},{\"lat\":48.47724575492726,\"lon\":135.05802154541016},{\"lat\":48.47758714573697,\"lon\":135.05922317504883},{\"lat\":48.47798543211136,\"lon\":135.0602102279663},{\"lat\":48.4783552666591,\"lon\":135.06081104278564},{\"lat\":48.47878199547929,\"lon\":135.06124019622803},{\"lat\":48.479208720709885,\"lon\":135.06141185760498},{\"lat\":48.479578546339496,\"lon\":135.06141185760498},{\"lat\":48.48003371264392,\"lon\":135.0611972808838},{\"lat\":48.48043197981001,\"lon\":135.06068229675293},{\"lat\":48.48085869116091,\"lon\":135.06003856658936},{\"lat\":48.48120005765717,\"lon\":135.05913734436035},{\"lat\":48.481456081021726,\"lon\":135.05789279937744},{\"lat\":48.48148452798246,\"lon\":135.0562620162964},{\"lat\":48.48148452798246,\"lon\":135.0556182861328},{\"lat\":48.48071645444281,\"lon\":135.05428791046143},{\"lat\":48.480289741895355,\"lon\":135.05373001098633},{\"lat\":48.479834577888276,\"lon\":135.05321502685547},{\"lat\":48.479407857922396,\"lon\":135.05282878875732},{\"lat\":48.47900958271564,\"lon\":135.05261421203613},{\"lat\":48.47866820147823,\"lon\":135.0525712966919},{\"lat\":48.47824147170081,\"lon\":135.05265712738037},{\"lat\":48.47784318733659,\"lon\":135.05304336547852},{\"lat\":48.477473349055664,\"lon\":135.0536870956421},{\"lat\":48.47727420424916,\"lon\":135.05454540252686},{\"lat\":48.477188856235614,\"lon\":135.05557537078857}]}}}" }, "_index": "rplus", "_id": "259241", "_score": 0, "_type": "request" }, { "_score": 0, "_type": "request", "_source": { "req_bounds": "{\"geo_polygon\":{\"location\":{\"points\":[{\"lat\":48.481456081021726,\"lon\":135.07132530212402},{\"lat\":48.481456081021726,\"lon\":135.07149696350098},{\"lat\":48.481456081021726,\"lon\":135.0716257095337},{\"lat\":48.481456081021726,\"lon\":135.0717544555664},{\"lat\":48.48148452798246,\"lon\":135.07192611694336},{\"lat\":48.48151297492724,\"lon\":135.07205486297607},{\"lat\":48.48159831566587,\"lon\":135.07222652435303},{\"lat\":48.481882783757676,\"lon\":135.07244110107422},{\"lat\":48.48208191047273,\"lon\":135.07248401641846},{\"lat\":48.48267928592746,\"lon\":135.07248401641846},{\"lat\":48.48299219407214,\"lon\":135.07235527038574},{\"lat\":48.48336199211802,\"lon\":135.0721836090088},{\"lat\":48.48378867882075,\"lon\":135.07184028625488},{\"lat\":48.484243807347184,\"lon\":135.07136821746826},{\"lat\":48.485239386760426,\"lon\":135.0702953338623},{\"lat\":48.48543850029793,\"lon\":135.06999492645264},{\"lat\":48.48575139142036,\"lon\":135.06947994232178},{\"lat\":48.4858936140197,\"lon\":135.06922245025635},{\"lat\":48.486007391812024,\"lon\":135.06900787353516},{\"lat\":48.48623494663086,\"lon\":135.0684928894043},{\"lat\":48.486434056259824,\"lon\":135.06802082061768},{\"lat\":48.486434056259824,\"lon\":135.0666046142578},{\"lat\":48.486434056259824,\"lon\":135.06634712219238},{\"lat\":48.48632027942472,\"lon\":135.06596088409424},{\"lat\":48.48546694502521,\"lon\":135.0645875930786},{\"lat\":48.48521094190555,\"lon\":135.0644588470459},{\"lat\":48.48481271226205,\"lon\":135.06433010101318},{\"lat\":48.484556705840056,\"lon\":135.06433010101318},{\"lat\":48.48421536193393,\"lon\":135.06441593170166},{\"lat\":48.48393090692397,\"lon\":135.06463050842285},{\"lat\":48.48376023315223,\"lon\":135.0648021697998},{\"lat\":48.48316287042832,\"lon\":135.06544589996338},{\"lat\":48.48287840951562,\"lon\":135.06578922271729},{\"lat\":48.482593947007544,\"lon\":135.06617546081543},{\"lat\":48.482366375852436,\"lon\":135.0666046142578},{\"lat\":48.482167250254136,\"lon\":135.06699085235596},{\"lat\":48.48196812387414,\"lon\":135.06742000579834},{\"lat\":48.481797443497655,\"lon\":135.06780624389648},{\"lat\":48.48168365626095,\"lon\":135.06832122802734},{\"lat\":48.48159831566587,\"lon\":135.06875038146973},{\"lat\":48.48154142185607,\"lon\":135.0691795349121},{\"lat\":48.48151297492724,\"lon\":135.06956577301025},{\"lat\":48.481456081021726,\"lon\":135.0706386566162},{\"lat\":48.481456081021726,\"lon\":135.07089614868164},{\"lat\":48.481456081021726,\"lon\":135.07115364074707},{\"lat\":48.481456081021726,\"lon\":135.07132530212402}]}}}", "state": null, "req_text": "пушкина", "contact_id": "087110", "id": "367240", "agent_id": null }, "_id": "367240", "_index": "rplus" }];
        }
    }
});
//# sourceMappingURL=request.service.js.map