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
    var core_1, core_2;
    var GoogleMapComponent, GoogleMapMarkerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }],
        execute: function() {
            GoogleMapComponent = (function () {
                function GoogleMapComponent(elem, renderer) {
                    this.latitude = 0;
                    this.longitude = 0;
                    this.zoom = 8;
                    this.container = elem.nativeElement.querySelector('.map-wrapper');
                }
                GoogleMapComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.map = new google.maps.Map(this.container, {
                        center: { lat: this.latitude, lng: this.longitude },
                        zoom: this.zoom
                    });
                    setTimeout(function () { google.maps.event.trigger(_this.map, 'resize'), 10; });
                };
                GoogleMapComponent.prototype.ngOnChanges = function () {
                    if (this.map) {
                        this.map.panTo(new google.maps.LatLng(this.latitude, this.longitude));
                    }
                };
                GoogleMapComponent = __decorate([
                    core_1.Component({
                        selector: 'google-map',
                        inputs: ['latitude', 'longitude', 'zoom'],
                        template: "\n    <div class=\"map-wrapper\">\n      <ng-content></ng-content>\n    </div>\n  ",
                        styles: ["\n    .map-wrapper {\n      height: 100%;\n      width: 100%;\n    }\n  "],
                        directives: [],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
                ], GoogleMapComponent);
                return GoogleMapComponent;
            })();
            exports_1("GoogleMapComponent", GoogleMapComponent);
            GoogleMapMarkerComponent = (function () {
                function GoogleMapMarkerComponent(parent) {
                    this.latitude = 0;
                    this.longitude = 0;
                    this.info_str = '';
                    this.icon_id = 0;
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
                        icon: ico,
                        position: new google.maps.LatLng(this.latitude, this.longitude),
                        map: this.map,
                        title: ''
                    });
                    this.infowindow = new google.maps.InfoWindow({
                        content: '<div>' + this.info_str + '</div>'
                    });
                    var _this = this;
                    this.marker.addListener('click', function () {
                        _this.infowindow.open(_this.map, _this.marker);
                        _this.click.emit(_this);
                    });
                };
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_2.EventEmitter)
                ], GoogleMapMarkerComponent.prototype, "click", void 0);
                GoogleMapMarkerComponent = __decorate([
                    core_1.Component({
                        selector: 'google-map-marker',
                        inputs: ['latitude', 'longitude', 'info_str', 'icon_id'],
                        template: "",
                        styles: [""],
                        directives: [],
                    }), 
                    __metadata('design:paramtypes', [GoogleMapComponent])
                ], GoogleMapMarkerComponent);
                return GoogleMapMarkerComponent;
            })();
            exports_1("GoogleMapMarkerComponent", GoogleMapMarkerComponent);
        }
    }
});
//# sourceMappingURL=google-map.component.js.map