System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Realty;
    return {
        setters:[],
        execute: function() {
            Realty = (function () {
                function Realty() {
                    this.selected = false;
                }
                Realty.normalize_ = function (realty) {
                    console.log('normalize');
                    for (var f in realty) {
                        if (realty[f] == "") {
                            realty[f] = null;
                        }
                    }
                };
                Realty.getDigest = function (r) {
                    var digest = [];
                    digest.push('<strong>' + r.type_code + '</strong>');
                    if (r.rooms_count)
                        digest.push(r.rooms_count + 'к');
                    if (r.floor && r.floors_count) {
                        digest.push(r.floor + '/' + r.floors_count + ' эт.');
                    }
                    else if (r.floor || r.floors_count) {
                        digest.push((r.floor || r.floors_count) + ' эт.');
                    }
                    {
                        var squares = [];
                        if (r.square_total)
                            squares.push(r.square_total);
                        if (r.square_living)
                            squares.push(r.square_living);
                        if (r.square_kitchen)
                            squares.push(r.square_kitchen);
                        if (squares.length)
                            digest.push(squares.join('/') + ' кв. м.');
                    }
                    digest.push('<br>');
                    if (r.ap_scheme)
                        digest.push(r.ap_scheme);
                    if (r.house_type)
                        digest.push(r.house_type);
                    if (r.room_scheme)
                        digest.push(r.room_scheme);
                    if (r.condition)
                        digest.push(r.condition);
                    if (r.balcony)
                        digest.push(r.balcony);
                    if (r.bathroom)
                        digest.push(r.bathroom);
                    if (r.square_land)
                        digest.push(r.square_land + ' га');
                    if (r.description) {
                        digest.push(r.description);
                    }
                    digest.push('<br>');
                    if (r.owner_price)
                        digest.push('<span class="text-primary">' + r.owner_price + ' тыс. руб.' + '</span>');
                    return digest.join(' ');
                };
                return Realty;
            }());
            exports_1("Realty", Realty);
        }
    }
});
//# sourceMappingURL=realty.js.map