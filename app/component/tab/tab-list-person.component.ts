import {
  Component,
} from 'angular2/core';

import {ConfigService} from '../../service/config.service';
import {PersonService} from '../../service/person.service';

import {Tab} from '../../class/tab';
import {Person} from '../../class/person';

import {PersonDigestComponent} from '../person-digest.component';

@Component({
  selector: 'tab-list-person',
  inputs: ['tab'],
  directives: [PersonDigestComponent],
  template: `

  <div class="tab-button fixed-button" (click)="toggleLeftPane()">
    <span [ngClass]="{'icon-arrow-right': pane_hidden, 'icon-arrow-left': !pane_hidden}"></span>
  </div>

  <div class="list-person"
    (window:resize)="onResize($event)"
    >
    <div class="pane" [hidden]="pane_hidden" [style.width.px]="pane_width">
      <div class="header"></div>
      <div class="category-list"
        (scroll)="scrollCategory($event)"
        [attr.scrollTop]="scroll_pos"
        [style.height]="pane_height"
        >
        категории<br>
        по агентам | по организациям
      </div>
    </div>
    <div class="work-area" [style.width.px]="work_area_width">
      <div _ngcontent-jtj-16="" class="" style="max-width: 910px; overflow-y: scroll; height: 615px;">
        <div class="list-person" (window:resize)="onResize($event)">
          <person-digest *ngFor="#p of persons"
            [person]="p"
          >
          </person-digest>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .pane {
      float: left;
      width: 370px;
      height: 100%;
      border-right: 1px solid #ccc;
    }

    .work-area {
      float: left;
      width: 77%;
      height: 100%;
    }

    .fixed-button {
      position: fixed;
      top: 0;
      left: 0;
    }
  `]
})

  export class TabListPersonComponent {
    public tab: Tab;

    persons: Person[] = [];
    page: number = 1;

    pane_height: number;
    pane_width: number;
    work_area_width: number;
    pane_hidden: boolean = false;

    constructor(private _configService: ConfigService, private _personService: PersonService) {
      this.persons = this._personService.getPersonList(1, 32);
      setTimeout(() => { this.tab.header = 'person list'; });
    }

    ngOnInit() {
      this.calcSize();
    }

    onResize(e) {
      this.calcSize();
    }


    calcSize() {
      if (this.pane_hidden) {
        this.pane_width = 0;
      } else {
        this.pane_width = 420;
      }
      this.work_area_width = document.body.clientWidth - (30 * 2) - this.pane_width;
      this.pane_height = document.body.clientHeight - 31;
    }

    select(p: Person) {

    }

    toggleLeftPane() {
      this.pane_hidden = !this.pane_hidden;
      this.calcSize();
    }

    scroll(e) {
      if (e.currentTarget.scrollTop + this.pane_height >= e.currentTarget.scrollHeight) {
        this.page ++;
        var r = this._personService.getPersonList(this.page, 10);
        for (var i = 0; i < r.length; i++) {
          this.persons.push(r[i])
        }
      }
    }

  }
