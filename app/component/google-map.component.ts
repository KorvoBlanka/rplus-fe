import {
  Component,
  Renderer,
  ElementRef,
  ContentChildren,
  QueryList,
} from 'angular2/core';
import {Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'google-map',
  inputs: ['latitude', 'longitude', 'zoom'],
  template: `
    <div class="map-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .map-wrapper {
      height: 100%;
      width: 100%;
    }
  `],
  directives: [],
})

export class GoogleMapComponent {
  container: any;
  map: any;

  latitude: number = 0;
  longitude: number = 0;
  zoom: number = 8;

  map_height: number;

  constructor(elem: ElementRef, renderer: Renderer) {
    this.container = elem.nativeElement.querySelector('.map-wrapper');
  }

  ngOnInit() {
    this.map = new google.maps.Map(this.container, {
        center: {lat: this.latitude, lng: this.longitude},
        zoom: this.zoom
    });

    setTimeout(() => { google.maps.event.trigger(this.map, 'resize'), 10 });
  }

  ngOnChanges() {
    if (this.map) {
      this.map.panTo(new google.maps.LatLng(this.latitude, this.longitude));
    }
  }

}


@Component({
  selector: 'google-map-marker',
  inputs: ['latitude', 'longitude', 'info_str', 'icon_id'],
  template: ``,
  styles: [``],
  directives: [],
})

export class GoogleMapMarkerComponent {
  map: any;
  marker: any;
  infowindow: any;

  latitude: number = 0;
  longitude: number = 0;
  info_str: string = '';
  icon_id: number = 0;

  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor(parent: GoogleMapComponent) { this.map = parent.map; }

  ngOnInit() {
    var ico = null;
    var icons: any[] = [
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
    this.marker.addListener('click', function() {
      _this.infowindow.open(_this.map, _this.marker);
      _this.click.emit(_this);
    });
  }

}
