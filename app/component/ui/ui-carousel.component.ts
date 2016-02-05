import {Component} from 'angular2/core';

@Component({
  selector: 'ui-carousel',
  inputs: ['photos'],
  template: `
    <div class="ui-carousel">

      <a class="slide-left" style="color: white; display: block;" href="#" (click)="slideLeft()"><span class="icon-arrow-left"></span></a>
      <a class="slide-right" style="color: white; display: block;" href="#" (click)="slideRight()"><span class="icon-arrow-right"></span></a>

      <div class="ribbon" [style.left]="slider_pos" [style.transition-duration]="tr_duration">

        <div *ngFor="#photo of photos" class="img-wrap pull-left" style="margin-left: 1px;">
          <div class="img-overlay" style="position: relative; display: inline-block;">
            <img class="carousel-img" [attr.src]="photo.thumbnail_url" style="height: 100px;">
          </div>
        </div>

      </div>

    </div>
  `,
  styles: [`
    .class {
      position: relative;
    }

    .ui-carousel {
      position: relative;
      height: 100px;
      overflow: hidden;
      margin: 0 -5px;

    }

    .ribbon {
      height: 120px;
      width: 1920px;
      position: absolute;
      top: 0;
      left: 0;
    }

    .slide-left, .slide-right {
      display: block;
      position: absolute;
      top: 0px;
      outline: 0;
      cursor: pointer;
      text-decoration: none;
      width: 50px;
      height: 100px;
      line-height: 100px;
      background: #000;
      opacity: 0.0;
      text-align: center;
      -webkit-transition: opacity 500ms linear;
      -moz-transition: opacity 500ms linear;
      -o-transition: opacity 500ms linear;
      transition: opacity 500ms linear;

      z-index: 1;
    }
    .slide-left {
      left: 0px;
    }
    .slide-right {
      right: 0px;
    }

    .ui-carousel:hover > .slide-left, .ui-carousel:hover > .slide-right {
        opacity: 0.4;
    }

  `]
})

export class UICarousel {
  public photos: Array<any>;
  public position: number = 0;
  public editable: boolean = false;

  slide_width: number = 134;
  slider_pos: number = 0;
  tr_duration: string = '1s';

  busy: boolean = false;

  slideLeft() {
    if (this.busy) return;
    this.busy = true;
    this.tr_duration = '1s';
    this.slider_pos = -this.slide_width;
    this.photos.push(this.photos[0]);
    setTimeout(() => {
      this.tr_duration = '0s';
      this.photos.shift();
      this.slider_pos = 0;
      this.busy = false;
    }, 1000);
  }

  slideRight() {
    if (this.busy) return;
    this.busy = true;
    this.tr_duration = '0s';
    this.slider_pos = -this.slide_width;
    this.photos.unshift(this.photos[this.photos.length - 1]);

    setTimeout(() => {
      this.tr_duration = '1s';
      this.slider_pos = 0;
    });

    setTimeout(() => {
      this.photos.pop();
      this.busy = false;
    }, 1000);
  }
}
