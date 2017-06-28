import {Component, AfterContentInit} from '@angular/core';

import {Tab} from '../class/tab';
import {HubService} from "../service/hub.service";



@Component({
    selector: 'tab-system',
    styleUrls: ['./tab-system.component.scss'],
    template: `
    <div class="tab-list">

      <div class="header">
        <div class="tab-button">
        </div>
      </div>

      <div class="tab" *ngFor="let tab of tabs"
        [class.selected]="tab === selectedTab"
        (click)="selectTab(tab)">
        <div class="tab-button close-button" (click)="closeTab(tab)"><span class="icon-cancel"></span></div>
        <div class="vertical-text-container" [style.height]="vtHeight">
          <div class="vertical-text">{{ tab.header }}</div>
        </div>
        <div class="tab-icon" style="display: block;"><span class="icon-start"></span></div>
      </div>
      <div class="tab-button" (click)="addTab('main', {})">
        <span class="icon-add"></span>
      </div>
    </div>
    <div class="tab-content">
      <tab-root *ngFor="let tab of tabs"
        [hidden]="tab !== selectedTab"
        [tab]="tab">
      </tab-root>
    </div>
    `
})

export class TabSystemComponent implements AfterContentInit{
    public selectedTab: Tab;
    public tabs: Tab[] = [];
    public tabHeight = 0;
    public vtHeight = 0;
    to: any;

    constructor(private _hubService: HubService) {
        _hubService.setProperty('tab_sys', this);
    };

    ngAfterContentInit() {
        this.addTab('main', {});
    }

    calcTabHeight() {
        var nominalHeight = 160;
        var minimalHeight = 60;
        var h = document.body.clientHeight - (31 * 2);  // - 2 buttons
        this.tabHeight = (h - this.tabs.length) / this.tabs.length;

        if (this.tabHeight > nominalHeight) this.tabHeight = nominalHeight;
        if (this.tabHeight < minimalHeight) this.tabHeight = minimalHeight;

        this.vtHeight = this.tabHeight - 60;
    }

    selectTab(tab: Tab) {
        this.selectedTab = tab;
        this.selectedTab.refresh("tabSys");
    }

    addTab(type, args) {
        if (this.tabs.length < 10) {
            var newTab = new Tab(this, type, args);
            this.tabs.push(newTab);

            this.calcTabHeight();
            this.selectedTab = newTab;
        }
    }

    closeTab(tab: Tab) {
        var idx = this.tabs.indexOf(tab);
        this.tabs.splice(idx, 1);

        if (this.tabs.length == 0) {
            this.addTab('main', {});
        } else {
            if(this.selectedTab == tab) {
                this.selectedTab = this.tabs[idx ? (idx - 1) : 0];
                this.selectedTab.refresh("tabSys");
            }
        }

        clearTimeout(this.to);
        this.to = setTimeout(() => {
            this.calcTabHeight();
        }, 500);

    }
}
