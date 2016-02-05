import {Component} from 'angular2/core';

import {HubService} from '../service/hub.service';

import {Tab} from '../class/tab';
import {TabRootComponent} from './tab/tab-root.component';

@Component({
  selector: 'tab-system',
  inputs: ['n_width'],
  template: `
    <div class="tab-list">

      <div class="header">
        <div class="tab-button">
        </div>
      </div>

      <div class="tab" *ngFor="#tab of tabs"
        [class.selected]="tab === selected_tab"
        (click)="selectTab(tab)">
        <div class="tab-button close-button" (click)="closeTab(tab)"><span class="icon-cancel"></span></div>
        <div class="vertical-text-container" [style.height]="vt_height">
          <div class="vertical-text">{{ tab.header }}</div>
        </div>
        <div class="tab-icon" style="display: block;"><span class="icon-start"></span></div>
      </div>
      <div class="tab-button" (click)="addTab('main', {})">
        <span class="icon-add"></span>
      </div>
    </div>
    <div class="tab-content">
      <tab-root *ngFor="#tab of tabs"
        [hidden]="tab !== selected_tab"
        [tab]="tab">
      </tab-root>
    </div>
  `,
  styles: [`
    .tab-content {
      margin-left: 30px;
    }
    .tab-list {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      overflow: hidden;
      background-color: #ccc;
    }
    .tab {
      width: 30px;
      border-bottom: 1px solid #aaa;
      cursor: pointer;
    }

    .tab:hover {
      background-color: #efefef;
    }

    .tab.selected {
      background-color: #fff;
      border-bottom: 1px solid #fff;
    }
    .tab-button {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 12px !important;
      cursor: pointer;
      color: #666;
    }
    .tab-icon {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 16px !important;
      color: #666;
    }
    .vertical-text-container {
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .vertical-text {
      transform: rotate(-90deg);
      transform-origin: 0 0;
      position: absolute;
      bottom: -25px;
      line-height: 30px;
    }
    .header {
      width: 100%;
      height: 30px;
      border-bottom: 1px solid rgba(0,0,0,.2);
    }
  `],
  directives: [TabRootComponent],
})

export class TabSystemComponent {
  public n_width: number;
  public selected_tab: Tab;
  public tabs: Tab[] = [];
  public tab_height = 0;
  public vt_height = 0;
  to: any;

  constructor(private _hubService: HubService) {
    _hubService.setProperty('tab_sys', this);
  };

  ngAfterContentInit() {
    this.addTab('main', {});
  }

  calcTabHeight() {
    var nominal_height = 160;
    var minimal_height = 60;
    var h = document.body.clientHeight - (31 * 2);  // - 2 buttons
    this.tab_height = (h - this.tabs.length) / this.tabs.length;

    if (this.tab_height > nominal_height) this.tab_height = nominal_height;
    if (this.tab_height < minimal_height) this.tab_height = minimal_height;

    this.vt_height = this.tab_height - 60;
  }

  selectTab(tab: Tab) {
    this.selected_tab = tab;
  }

  addTab(type, args) {
    if (this.tabs.length < 10) {
      var new_tab = new Tab(this, type, args);
      this.tabs.push(new_tab);

      this.calcTabHeight();
      this.selected_tab = new_tab;
    }
  }

  closeTab(tab: Tab) {
    var idx = this.tabs.indexOf(tab);
    this.tabs.splice(idx, 1);

    if (this.tabs.length == 0) {
      this.addTab('main', {});
    } else {
      if(this.selected_tab == tab) {
        this.selected_tab = this.tabs[idx ? (idx - 1) : 0];
      }
    }

    clearTimeout(this.to);
    this.to = setTimeout(() => {
      this.calcTabHeight();
    }, 500);

  }
}
