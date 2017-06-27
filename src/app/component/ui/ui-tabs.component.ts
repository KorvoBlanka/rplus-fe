import {
  Component, ContentChildren, QueryList, AfterViewInit, AfterContentChecked,
  AfterContentInit
} from '@angular/core';

import {UITab} from './ui-tab.component';

@Component({
    selector: 'ui-tabs',
    inputs: ['headerMode', 'iconUrls', 'active_color', 'color'],
    template: `
        <div class="head" [style.border-bottom-color] = "color">
            <div class="tabs" [class.align-left]="headerMode">
                <div *ngFor="let tab of tabs; let i = index;" class="tab-header"
                    (click)="selectTab(tab)" [class.active]="tab.active"
                    [style.background-image]="'url(' + iconUrls[i] + ')'"
                 >
                    {{tab.title}}
                </div>
            </div>
        </div>
        <ng-content></ng-content>
    `,
    styles: [`
        .head{
            height: 110px;
            display: flex;
            border-bottom: 4px solid;
        }
        .tabs {
            display: flex;
            margin-top: 15px;
            height: 70px;
            width: 170px;
            justify-content: center;
            margin-left: 50px;
        }
        .tabs.align-left {
            justify-content: flex-start;
        }
        .tab-header {
            width: 70px;
            height: 50px;
            font-size: 11px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            color: #6b6c6d;
            line-height: 120px;
            text-align: center;
        }
        .tab-header:first-child {
            //width: 80px;
        }

        .tab-header:hover {
        }

        .tab-header > span {
            color: #aaa;
            margin-top: 40px;
            margin-left: -15px;
            display: block;
        }

        .tab-header.active {
            background-color: {{active_color}};
            color: #157ad3;
        }

        .tab-header.active > a {
            color: #157ad3;
        }
        .tab-header.active::after {
            /*content: '';
            position: absolute;
            left: 0;
            top: 26px;
            width: 80%;
            margin-left: 10%;
            height: 2px;
            background-color: #157ad3;/*
        }
  `]
})

export class UITabs implements  AfterContentInit  {
    @ContentChildren(UITab) tabs: QueryList<UITab>;
    headerMode: boolean;
    iconUrls: String[] = [];
    active_color: String = '#1061c4';
    currentUrl: String[] = [];
    color: String = '#3d9be9';

    constructor() {
        setTimeout(()=> {
            if(this.iconUrls){

                for(var i= 1; i< this.iconUrls.length;++i){
                    this.currentUrl.push(this.iconUrls[i]);
                }
            }
        },100);

    }

    ngAfterContentInit() {

        if (!_hasActiveTab(this.tabs)) {
            this.selectTab(this.tabs.first);
        }

        function _hasActiveTab(tabs: QueryList<UITab>) {
            let activeTabs = tabs.filter((tab) => tab.active);
            return Boolean(activeTabs.length);
        }

    }

    selectTab(tab: UITab) {

        this._deactivateAllTabs(this.tabs.toArray());
        tab.selectTab();
    }

    _deactivateAllTabs(tabs: UITab[]) {
        tabs.forEach((tab) => tab.active = false);
    }

}
