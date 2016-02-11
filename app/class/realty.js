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
                Realty.getDigest = function (r) {
                    var digest = [];
                    var src = r._source;
                    digest.push('<strong>' + src.type + '</strong>');
                    if (src.rooms_count)
                        digest.push(src.rooms_count + 'к');
                    if (src.floor && src.floors_count) {
                        digest.push(src.floor + '/' + src.floors_count + ' эт.');
                    }
                    else if (src.floor || src.floors_count) {
                        digest.push((src.floor || src.floors_count) + ' эт.');
                    }
                    {
                        var squares = [];
                        if (src.square_total)
                            squares.push(src.square_total);
                        if (src.square_living)
                            squares.push(src.square_living);
                        if (src.square_kitchen)
                            squares.push(src.square_kitchen);
                        if (squares.length)
                            digest.push(squares.join('/') + ' кв. м.');
                    }
                    digest.push('<br>');
                    if (src.ap_scheme_id)
                        digest.push(src.ap_scheme);
                    if (src.house_type_id)
                        digest.push(src.house_type);
                    if (src.room_scheme_id)
                        digest.push(src.room_scheme);
                    if (src.condition_id)
                        digest.push(src.condition);
                    if (src.balcony_id)
                        digest.push(src.balcony);
                    if (src.bathroom_id)
                        digest.push(src.bathroom);
                    if (src.square_land && src.square_land_type)
                        digest.push(src.square_land + ' ' + (src.square_land_type == 'ar' ? 'сот.' : 'га'));
                    if (src.description) {
                        digest.push(src.description);
                    }
                    digest.push('<br>');
                    if (src.price)
                        digest.push('<span class="text-primary">' + src.price + ' тыс. руб.' + '</span>');
                    return digest.join(' ');
                };
                return Realty;
            }());
            exports_1("Realty", Realty);
        }
    }
});
//# sourceMappingURL=realty.js.map