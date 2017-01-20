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
var core_2 = require("@angular/core");
var concavehull_1 = require("../class/concavehull");
var offer_1 = require("../class/offer");
var GoogleMapComponent = (function () {
    function GoogleMapComponent(_elem) {
        this._elem = _elem;
        this.markers = [];
        this.infoWindows = [];
        this.latitude = 0;
        this.longitude = 0;
        this.zoom = 8;
        this.objects = [];
        this.id = Math.round(Math.random() * 1000);
        this.draw_allowed = false;
        this.is_drawing = false;
        this.drawFinished = new core_2.EventEmitter();
    }
    GoogleMapComponent.prototype.ngOnInit = function () {
        this.container = this._elem.nativeElement.querySelector('.map-wrapper');
        var opts = {
            center: new google.maps.LatLng(this.latitude, this.longitude),
            zoom: this.zoom,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(this.container, opts);
        if (this.polygone_points) {
            this.polygone = new google.maps.Polygon({
                paths: this.toGooglePoints(this.polygone_points),
                strokeColor: "#062141",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#062141",
                fillOpacity: 0.35,
                editable: false,
                geodesic: false,
                map: this.map,
            });
        }
        else {
            this.polygone = new google.maps.Polygon();
        }
        this.refreshMarkers();
        this.initDrawer();
    };
    GoogleMapComponent.prototype.ngOnChanges = function (changes) {
        if (!this.map)
            return;
        for (var p_name in changes) {
            var prop = changes[p_name];
            switch (p_name) {
                case 'objects':
                    this.refreshMarkers();
                    break;
                case 'latitude':
                case 'longitude':
                    this.map.panTo(new google.maps.LatLng(this.latitude, this.longitude));
                    break;
                case 'draw_allowed':
                    if (!this.draw_allowed) {
                        this.polygone.setMap(null);
                    }
                case 'polygone_points':
                    if (this.polygone_points) {
                        this.polygone = new google.maps.Polygon({
                            paths: this.toGooglePoints(this.polygone_points),
                            strokeColor: "#062141",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: "#062141",
                            fillOpacity: 0.35,
                            editable: false,
                            geodesic: false,
                            map: this.map,
                        });
                    }
                    else {
                        this.polygone = new google.maps.Polygon();
                    }
                    break;
            }
        }
    };
    GoogleMapComponent.prototype.ngAfterViewChecked = function () {
        if (this.container.clientWidth != this.p_w) {
            this.p_w = this.container.clientWidth;
            google.maps.event.trigger(this.map, 'resize');
        }
    };
    GoogleMapComponent.prototype.refreshMarkers = function () {
        var _this = this;
        if (this.objects == null)
            return;
        this.markers.forEach(function (m) {
            m.setMap(null);
        });
        this.markers = [];
        var c = this;
        this.objects.forEach(function (obj) {
            if (obj.locationLat) {
                var m = new google.maps.Marker({
                    map: _this.map,
                    position: new google.maps.LatLng(obj.locationLat, obj.locationLon),
                    title: '',
                    //icon: ico,
                    animation: google.maps.Animation.DROP
                });
                _this.markers.push(m);
                var iw = new google.maps.InfoWindow({
                    content: '<div>' + offer_1.Offer.getDigest(obj) + '</div>'
                });
                _this.infoWindows.push(iw);
                m.addListener('click', function () {
                    iw.open(this.map, m);
                    //c.click.emit(_this);
                });
            }
        });
    };
    GoogleMapComponent.prototype.initDrawer = function () {
        var _this = this;
        google.maps.event.addListener(this.map, 'mousemove', function (e) {
            if (_this.is_drawing == true) {
                _this.polyline.getPath().push(e.latLng);
            }
        });
        google.maps.event.addListener(this.map, 'mousedown', function () {
            if (_this.draw_allowed) {
                _this.map.setOptions({ draggable: false });
                _this.is_drawing = true;
                if (_this.polyline) {
                    _this.polyline.setMap(null);
                }
                _this.polyline = new google.maps.Polyline({
                    clickable: false,
                    strokeColor: "#062141",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    map: _this.map
                });
            }
        });
        google.maps.event.addListener(this.map, 'mouseup', function () {
            _this.is_drawing = false;
            _this.map.setOptions({ draggable: true });
            if (_this.draw_allowed) {
                _this.draw_allowed = false;
                var pa = [];
                _this.polyline.getPath().forEach(function forEach(ll) {
                    pa.push({ lat: ll.lat(), lng: ll.lng() });
                });
                var ch = new concavehull_1.ConcaveHull(pa, 2000).getLatLngs();
                console.log(ch);
                _this.polygone = new google.maps.Polygon({
                    paths: ch,
                    strokeColor: "#062141",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#062141",
                    fillOpacity: 0.35,
                    editable: true,
                    geodesic: false,
                    map: _this.map,
                });
                _this.drawFinished.emit(_this.toRplusPoints(ch));
                _this.polyline.setMap(null);
            }
        });
    };
    GoogleMapComponent.prototype.toGooglePoints = function (pList) {
        var result = [];
        pList.forEach(function (p) {
            result.push({ lat: p.lat, lng: p.lon });
        });
        return result;
    };
    GoogleMapComponent.prototype.toRplusPoints = function (pList) {
        var result = [];
        pList.forEach(function (p) {
            result.push({ lat: p.lat, lon: p.lng });
        });
        return result;
    };
    return GoogleMapComponent;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], GoogleMapComponent.prototype, "drawFinished", void 0);
GoogleMapComponent = __decorate([
    core_1.Component({
        selector: 'google-map',
        inputs: [
            'latitude',
            'longitude',
            'zoom',
            'objects',
            'draw_allowed',
            'polygone_points'
        ],
        styles: ["\n        .map-wrapper {\n            height: 100%;\n            width: 100%;\n        }\n    "],
        template: "\n        <div class=\"map-wrapper\">\n            <ng-content></ng-content>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], GoogleMapComponent);
exports.GoogleMapComponent = GoogleMapComponent;
var GoogleMapMarkerComponent = (function () {
    function GoogleMapMarkerComponent(parent) {
        this.latitude = 0;
        this.longitude = 0;
        this.info_str = '';
        this.icon_id = 0;
        this.is_selected = false;
        this.click = new core_2.EventEmitter();
        this.map = parent.map;
    }
    GoogleMapMarkerComponent.prototype.ngOnInit = function () {
        var ico = null;
        var icons = [
            { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', },
            { url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', },
            { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png', },
        ];
        if (this.icon_id > 0 && this.icon_id < icons.length) {
            ico = icons[this.icon_id - 1];
        }
        this.marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(this.latitude, this.longitude),
            title: '',
            icon: ico,
            animation: google.maps.Animation.DROP
        });
        this.infowindow = new google.maps.InfoWindow({
            content: '<div>' + this.info_str + '</div>'
        });
        var _this = this;
        this.marker.addListener('click', function () {
            _this.infowindow.open(this.map, this.marker);
            _this.click.emit(_this);
        });
    };
    GoogleMapMarkerComponent.prototype.ngOnChanges = function () {
        if (this.marker) {
            if (this.is_selected) {
                this.marker.setAnimation(google.maps.Animation.BOUNCE);
                this.infowindow.open(this.map, this.marker);
            }
            else {
                this.marker.setAnimation(null);
                this.infowindow.close();
            }
        }
    };
    return GoogleMapMarkerComponent;
}());
__decorate([
    core_2.Output(),
    __metadata("design:type", core_2.EventEmitter)
], GoogleMapMarkerComponent.prototype, "click", void 0);
GoogleMapMarkerComponent = __decorate([
    core_1.Component({
        selector: 'google-map-marker',
        inputs: ['latitude', 'longitude', 'info_str', 'icon_id', 'is_selected'],
        styles: [""],
        template: "",
    }),
    __metadata("design:paramtypes", [GoogleMapComponent])
], GoogleMapMarkerComponent);
exports.GoogleMapMarkerComponent = GoogleMapMarkerComponent;
//# sourceMappingURL=google-map.component.js.map