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

  id: number = Math.round(Math.random() * 1000);
  counter: number = 0;

  constructor(elem: ElementRef, renderer: Renderer) {
    this.container = elem.nativeElement.querySelector('.map-wrapper');
  }

  ngOnInit() {
    var opts: google.maps.MapOptions = {
        center: new google.maps.LatLng(this.latitude, this.longitude),
        zoom: this.zoom
    };
    this.map = new google.maps.Map(this.container, opts);

    var _this = this;
    this.map.addListener('mouseover', function() {
      var t = this.getBounds();
      if (t.getSouthWest().equals(t.getNorthEast())) {
        console.log(_this.id + ' resize !');
        google.maps.event.trigger(this, 'resize');
      }
    });
  }

  ngOnChanges() {
    if (this.map) {
      this.map.panTo(new google.maps.LatLng(this.latitude, this.longitude));
    }
  }
}


@Component({
  selector: 'google-map-marker',
  inputs: ['latitude', 'longitude', 'info_str', 'icon_id', 'is_selected'],
  template: ``,
  styles: [``],
  directives: [],
})

export class GoogleMapMarkerComponent {
  map: google.maps.Map;
  marker: google.maps.Marker;
  infowindow: google.maps.InfoWindow;

  latitude: number = 0;
  longitude: number = 0;
  info_str: string = '';
  icon_id: number = 0;
  is_selected: boolean = false;

  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor(parent: GoogleMapComponent) { this.map = parent.map; }

  ngOnInit() {
    var ico: google.maps.Icon = null;
    var icons: google.maps.Icon[] = [
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
    this.marker.addListener('click', function() {
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
