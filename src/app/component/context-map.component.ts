import {
    Component,
    ChangeDetectionStrategy,
    ElementRef,
    SimpleChange, OnChanges, /*AfterViewChecked,*/ OnInit
} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

import {ConcaveHull} from '../class/concavehull';
import {GeoPoint} from "../class/geoPoint";
import {Offer} from "../entity/offer";


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'context-map',
    inputs: [
        'mapContainer',
        'hidden',

        'latitude',
        'longitude',
        'zoom',

        'objects',
        'place',
        'draw_allowed',
        'polygone_points'
    ],
    styles: [`
        .map-wrapper {
            position: absolute;
            background-color: #fff;
            z-index: 999;
        }
    `],
    template: `
        <div class="map-wrapper"
             [style.left]="mapContainer?.pX"
             [style.top]="mapContainer?.pY"
             [style.width]="mapContainer?.width"
             [style.height]="mapContainer?.height"
             [hidden]="hidden">
            <ng-content></ng-content>
        </div>
    `
})

export class ContextMapComponent implements OnInit, OnChanges/*, AfterViewChecked*/ {

    hidden: boolean = true;
    mapContainer: any = {
        pX: 0,
        pY: 0,
        width: 100,
        height: 100
    };

    container: HTMLElement;
    map: google.maps.Map;

    markers: google.maps.Marker[] = [];
    placesMarkers: google.maps.Marker[] = [];
    infoWindows: google.maps.InfoWindow[] = [];
    placesWindows: google.maps.InfoWindow = new google.maps.InfoWindow();
    service: google.maps.places.PlacesService;

    latitude: number = 0;
    longitude: number = 0;
    zoom: number = 8;

    objects: Offer[] = [];
    place: string;

    id: number = Math.round(Math.random() * 1000);
    p_w: number;
    p_h: number;

    draw_allowed: boolean = false;
    is_drawing: boolean = false;
    polyline: google.maps.Polyline;
    polygone_points: GeoPoint[];
    polygone: google.maps.Polygon;


    @Output() drawFinished: EventEmitter<any> = new EventEmitter();


    constructor(private _elem: ElementRef) {
    }

    ngOnInit() {
        this.container = this._elem.nativeElement.querySelector('.map-wrapper');

        var opts: google.maps.MapOptions = {
            center: new google.maps.LatLng(this.latitude, this.longitude),
            zoom: 8,
            disableDefaultUI: true
        };

        this.map = new google.maps.Map(this.container, opts);

        this.service =  new google.maps.places.PlacesService(this.map);
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
        } else {
            this.polygone = new google.maps.Polygon();
        }

        this.refreshMarkers();
        this.refreshPlacesMarkers();
        this.initDrawer();
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {


        if (!this.map) return;
        for (let p_name in changes) {
            let prop = changes[p_name];
            switch (p_name) {
                case 'objects':
                    this.refreshMarkers();
                    break;
                case 'place':
                    this.refreshPlacesMarkers();
                    break;
                case 'latitude':
                case 'longitude':
                    console.log(this.latitude, this.longitude);
                    this.map.panTo(new google.maps.LatLng(this.latitude, this.longitude));
                    break;
                case 'zoom':
                    console.log(this.zoom);
                    this.map.setZoom(this.zoom);
                    break;
                case 'draw_allowed':
                    if (!this.draw_allowed) {
                        this.polygone.setMap(null);
                        this.map.setOptions({draggable: true});
                    } else {
                        this.map.setOptions({draggable: false});
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
                    } else {
                        this.polygone = new google.maps.Polygon();
                    }
                    break;
            }
        }
    }



    ngAfterViewChecked() {
        if (this.container.clientWidth != this.p_w) {
            this.p_w = this.container.clientWidth;
            google.maps.event.trigger(this.map, 'resize');
        }
    }

    refreshMarkers() {
        if (this.objects == null) return;
        this.markers.forEach(m => {
            m.setMap(null);
        });
        this.markers = [];

        var c = this;

        let minLat = 100000;
        let minLon = 100000;
        let maxLat = 0;
        let maxLon = 0;
        let mark = 0;

        this.objects.forEach(obj => {
            if(obj.locationLat) {

                if (obj.locationLat > maxLat) {
                    maxLat = obj.locationLat;
                    mark ++;
                }
                if (obj.locationLon > maxLon) {
                    maxLon = obj.locationLon;
                    mark ++;
                }
                if (obj.locationLat < minLat) {
                    minLat = obj.locationLat;
                    mark ++;
                }
                if (obj.locationLon < minLon) {
                    minLon = obj.locationLon;
                    mark ++;
                }

                var m = new google.maps.Marker({
                    map: this.map,
                    position: new google.maps.LatLng(obj.locationLat, obj.locationLon),
                    title: '',
                    //icon: ico,
                    animation: google.maps.Animation.DROP
                });

                this.markers.push(m);

                var iw = new google.maps.InfoWindow({
                    content: '<div>' + Offer.getDigest(obj) + '</div>'
                });

                this.infoWindows.push(iw);

                m.addListener('click', function () {
                    iw.open(this.map, m);
                    //c.click.emit(_this);
                });

            }
        });


        if (mark > 3) {
            var bounds = new google.maps.LatLngBounds();
            //sw
            bounds.extend(new google.maps.LatLng(minLat, minLon));
            //ne
            bounds.extend(new google.maps.LatLng(maxLat, maxLon));

            this.map.fitBounds(bounds);
        }
    }

    refreshPlacesMarkers() {
        this.placesMarkers = [];

        if (this.place == null) return;
        this.placesMarkers.forEach(m => {
            m.setMap(null);
        });

        var request = {
            bounds: this.map.getBounds(),
            keyword: this.place
        };

        /*
        this.service.radarSearch(request,  (results, status) => {
            for (var i = 0; i < results.length; i++) {
                this.addMark(new google.maps.Marker({
                    map: this.map,
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP
                    //icon: 'src/icons/googleTarget.png'
                }), results[i], this.service);
            }
        });
        */
    }

    addMark(elem: any, rez: any,  serv: any) {
        this.placesMarkers.push(elem);
        google.maps.event.addListener(elem, 'mouseover', () => {
            serv.getDetails(rez, (result, status) => {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                }
                this.placesWindows.setContent(result.name);
                this.placesWindows.open(this.map, elem);
            });
        });

    }

    initDrawer() {
        var _this = this;

        google.maps.event.addListener(this.map, 'mousemove', function (e) {
            if (_this.is_drawing == true) {
                _this.polyline.getPath().push(e.latLng);
            }
        });

        google.maps.event.addListener(this.map, 'mousedown', function () {
            if (_this.draw_allowed) {
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

            if (_this.draw_allowed) {
                _this.draw_allowed = false;
                _this.map.setOptions({draggable: true});

                var pa = [];
                _this.polyline.getPath().forEach(function forEach(ll) {
                    pa.push({lat: ll.lat(), lng: ll.lng()});
                });

                var ch = new ConcaveHull(pa, 2000).getLatLngs();

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
    }

    toGooglePoints(pList: GeoPoint[]) {
        var result: any[] = [];
        pList.forEach(p => {
            result.push({lat: p.lat, lng: p.lon});
        });
        return result;
    }

    toRplusPoints(pList: any[]) {
        var result: GeoPoint[] = [];
        pList.forEach(p => {
            result.push({lat: p.lat, lon: p.lng});
        });
        return result;
    }
}
