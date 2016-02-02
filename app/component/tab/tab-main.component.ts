import {Component} from 'angular2/core';
import {Tab} from '../../class/tab';

@Component({
    selector: 'tab-main',
    inputs: ['tab'],
    template: `
      <div class="tile-board" style="wi">
        <div class="tile-group">

          <div class="tile bg-darkBlue fg-white" (click)="clickTile()">
            <div class="tile-content iconic">
                <span class="icon icon-home"></span>
            </div>
            <span class="tile-label">Недвижимость - Аренда</span>
          </div>

          <div class="tile bg-red fg-white">
            <div class="tile-content iconic">
                <span class="icon icon-home"></span>
            </div>
            <span class="tile-label">Недвижимость - Продажа</span>
          </div>

          <div class="tile bg-indigo fg-white">
            <div class="tile-content iconic">
                <span class="icon icon-person"></span>
            </div>
            <span class="tile-label">Список контактов</span>
          </div>

          <div class="tile bg-green fg-white">
            <div class="tile-content iconic">
                <span class="icon icon-req-list"></span>
            </div>
            <span class="tile-label">Заявки</span>
          </div>

          <div class="tile bg-amber fg-white">
            <div class="tile-content iconic">
                <span class="icon icon-month"></span>
            </div>
            <span class="tile-label">Ежедневник</span>
          </div>

          <div class="tile bg-ggreen fg-white">
            <div class="tile-content iconic">
                <span class="icon icon-deal"></span>
            </div>
            <span class="tile-label">Договоры</span>
          </div>

          <div class="tile bg-teal fg-white">
            <div class="tile-content iconic">
                <span class="icon icon-settings"></span>
            </div>
            <span class="tile-label">Настройки</span>
          </div>

        </div>
      </div>
    `,
    styles: [`
      .tile-board {
        /* min-width: 100%; */
        height: 100%;
        position: relative;
        overflow: hidden;
        background-color: #062141;
      }
      .tile-group {
        margin-left: 80px;
        min-width: 80px;
        width: auto;
        float: left;
        display: block;
        padding-top: 40px;
        position: relative;
      }

    `],
})

export class TabMainComponent {
    public tab: Tab;

    clickTile() {
        this.tab.reborn('list_realty', {});
    }

    ngAfterContentInit() {
        setTimeout(() => { this.tab.header = 'new tab'; });
    }
}