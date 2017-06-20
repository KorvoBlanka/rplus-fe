import {Component, OnInit} from '@angular/core';
import {Photo} from '../../class/photo';
import {Output,Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'ui-carousel',
  inputs: ['photos'],
  template: `
    <div class="ui-carousel">
      <a class="slide-left" style="color: white; display: block;" href="#" (click)="slideRight()"><span class="icon-arrow-up"></span></a>
      <div class="ribbon" [style.top]="slider_pos" [style.transition-duration]="tr_duration">
        <div *ngFor="let photo of photosConf" class="img-wrap pull-left" style="margin-left: 1px;">
          <div class="img-overlay" style="position: relative; display: inline-block;">
            <img class="carousel-img" [attr.src]="photo.url" style="height: 62px; width: 75px;" (click)="emitEvent($event, photo.pos)">
          </div>
          <hr style="margin: 0;">
        </div>
      </div>
       <a class="slide-right" style="color: white; display: block;" href="#" (click)="slideLeft()"><span class="icon-arrow-up"></span></a>

    </div>
  `,
  styles: [`
    .class {
      position: relative;
    }

    .ui-carousel {
      position: relative;
      height: 500px;
      overflow: hidden;
      margin: 0;
      width: 75px;

    }

    .ribbon {
      height: 500px;
      position: absolute;
      top: 0;
      left: 0;
    }

    .slide-left, .slide-right {
      display: block;
      position: absolute;
      outline: 0;
      cursor: pointer;
      text-decoration: none;
      width: 75px;
      height: 30px;
      line-height: 30px;
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
      top: 0px;
    }
    .slide-right {
      right: 0px;
      bottom: 0;
      transform: rotate(180deg);
    }

    .ui-carousel:hover > .slide-left, .ui-carousel:hover > .slide-right {
        opacity: 0.4;
    }

  `]
})

export class UICarousel implements OnInit{
  public photos: Array<Photo>;
  public position: number = 0;
  public editable: boolean = false;
  photosConf: Array<any> = [];
  slide_height: number = 60*3;
  slider_pos: number = 0;
  tr_duration: string = '1s';

  busy: boolean = false;

  @Output() getIndex: EventEmitter<any> = new EventEmitter();

  ngOnInit(){
      for(let i=0; i < this.photos.length; ++i){
          this.photosConf.push({url: this.photos[i], pos: i});
      }
  }

  slideLeft() {
    if (this.busy) return;
    this.busy = true;
    this.tr_duration = '1s';
    this.slider_pos = -this.slide_height;
    this.photosConf.push(this.photosConf[0]);
    this.photosConf.push(this.photosConf[1]);
    this.photosConf.push(this.photosConf[2]);

    setTimeout(() => {
      this.tr_duration = '0s';
      this.photosConf.shift();
      this.photosConf.shift();
      this.photosConf.shift();
      this.slider_pos = 0;
      this.busy = false;
    }, 1000);
  }

  slideRight() {
    if (this.busy) return;
    this.busy = true;
    this.tr_duration = '0s';
    this.slider_pos = -this.slide_height;
    this.photosConf.unshift(this.photosConf[this.photosConf.length - 1]);
    this.photosConf.unshift(this.photosConf[this.photosConf.length - 2]);
    this.photosConf.unshift(this.photosConf[this.photosConf.length - 3]);

    setTimeout(() => {
      this.tr_duration = '1s';
      this.slider_pos = 0;
    });

    setTimeout(() => {
      this.photosConf.pop();
      this.photosConf.pop();
      this.photosConf.pop();
      this.busy = false;
    }, 1000);
  }
  emitEvent(event, i){
      if((<HTMLElement>event.currentTarget).tagName == 'IMG')
        this.getIndex.emit(i);
  }
}
