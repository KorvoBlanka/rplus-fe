import {
    Component,
    SimpleChange, OnChanges, AfterViewInit, OnInit, ChangeDetectorRef, NgZone, ElementRef
} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

import {ConcaveHull} from '../class/concavehull';
import {GeoPoint} from "../class/geoPoint";
import {Offer} from "../entity/offer";
import {HubService} from "../service/hub.service";


@Component({
    selector: 'google-map',
    inputs: [
        'latitude',
        'longitude',
        'zoom',
        'objects',
        'place',
        'draw_allowed',
        'polygone_points'
    ],
    styles: [`
        .map-container-wrapper {
            height: 100%;
            width: 100%;
        }
    `],
    template: `
        <div class="map-container-wrapper">
        </div>
    `
})

export class GoogleMapComponent implements OnInit, OnChanges/*, AfterViewChecked*/ {
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

    p_w: number;
    p_h: number;

    draw_allowed: boolean = false;
    is_drawing: boolean = false;
    polyline: google.maps.Polyline;
    polygone_points: GeoPoint[];
    polygone: google.maps.Polygon;


    @Output() drawFinished: EventEmitter<any> = new EventEmitter();


    constructor(private _elem: ElementRef, private _hubService: HubService) {

    }

    ngOnInit() {

        console.log(this._elem);
        let mv = this._elem.nativeElement.lastElementChild;

        console.log(this._elem.nativeElement.lastElementChild.width);
        console.log(this._elem.nativeElement.lastElementChild.height);

        this._hubService.shared_var['map_container'] = {
            pX: mv.offsetLeft,
            pY: mv.offsetTop,
            width: 700,
            height: mv.clientHeight
        };
        this._hubService.shared_var['map_hidden'] = false;

        this._hubService.shared_var['map_longitude'] = this.longitude;
        this._hubService.shared_var['map_latitude'] = this.latitude;
        this._hubService.shared_var['map_zoom'] = this.zoom;

        this._hubService.shared_var['map_objects'] = [];
        this._hubService.shared_var['map_place'] = "";
        this._hubService.shared_var['map_da'] = false;
        this._hubService.shared_var['map_pp'] = [];
    }

    ngAfterViewInit() {
        let mv = this._elem.nativeElement.lastElementChild;

        console.log(this._elem.nativeElement.lastElementChild.width);
        console.log(this._elem.nativeElement.lastElementChild.height);

        /*
        this._hubService.shared_var['map_container'] = {
            pX: mv.offsetLeft + 30,
            pY: mv.offsetTop,
            width: mv.offsetWidth,
            height: mv.clientHeight
        };
        */
    }

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {


        if (!this.map) return;
        for (let p_name in changes) {
            let prop = changes[p_name];
            switch (p_name) {
                case 'objects':

                    break;
                case 'place':

                    break;
                case 'latitude':
                case 'longitude':

                    break;
                case 'draw_allowed':

                    break;
                case 'polygone_points':

                    break;
            }
        }
    }

    ngAfterViewChecked() {
        /*
        console.log(this.cnt++);
        if (this.container.clientWidth != this.p_w) {
            console.log("!");
            this.p_w = this.container.clientWidth;
            google.maps.event.trigger(this.map, 'resize');
        }
        */
    }

}


@Component({
    selector: 'google-map-marker',
    inputs: ['latitude', 'longitude', 'info_str', 'icon_id', 'is_selected'],
    styles: [``],
    template: `<div></div>`,
})

export class GoogleMapMarkerComponent implements OnChanges {
    map: google.maps.Map;
    marker: google.maps.Marker;
    infowindow: google.maps.InfoWindow;

    latitude: number = 0;
    longitude: number = 0;
    info_str: string = '';
    icon_id: number = 0;
    is_selected: boolean = false;

    @Output() click: EventEmitter<any> = new EventEmitter();

    constructor(parent: GoogleMapComponent) {
        this.map = parent.map;
    }

    ngOnInit() {
        var ico: google.maps.Icon = null;
        var icons: google.maps.Icon[] = [
            {url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',},
            {url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',},
            {url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',},
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
    }

    ngOnChanges() {
        if (this.marker) {
            if (this.is_selected) {
                this.marker.setAnimation(google.maps.Animation.BOUNCE);
                this.infowindow.open(this.map, this.marker);
            } else {
                this.marker.setAnimation(null);
                this.infowindow.close();
            }
        }
    }
}
