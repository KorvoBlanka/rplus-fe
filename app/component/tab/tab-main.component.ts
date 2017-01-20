import {Component} from '@angular/core';
import {Tab} from '../../class/tab';


@Component({
    selector: 'tab-main',
    inputs: ['tab'],
    styles: [`
        .tile-board {
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
    template: `
        <div class="tile-board" style="">
            <div class="tile-group">

                <div class="tile bg-darkBlue fg-white" (click)="turnTo('list_offer' , {offerTypeCode: 'sale'})">
                    <div class="tile-content iconic">
                        <span class="icon icon-home"></span>
                    </div>
                    <span class="tile-label">Недвижимость - Продажа</span>
                </div>

                <div class="tile bg-red fg-white" (click)="turnTo('list_offer', {offerTypeCode: 'rent'})">
                    <div class="tile-content iconic">
                        <span class="icon icon-home"></span>
                    </div>
                    <span class="tile-label">Недвижимость - Аренда</span>
                </div>

                <div class="tile bg-green fg-white" (click)="turnTo('list_request', {})">
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

                <div class="tile bg-indigo fg-white" (click)="turnTo('list_person', {})">
                    <div class="tile-content iconic">
                        <span class="icon icon-contact"></span>
                    </div>
                    <span class="tile-label">Контакты</span>
                </div>

                <div class="tile bg-teal fg-white" (click)="turnTo('list_organisation', {})">
                    <div class="tile-content iconic">
                        <span class="icon icon-organisation"></span>
                    </div>
                    <span class="tile-label">Контрагенты</span>
                </div>

                <div class="tile bg-teal fg-white">
                    <div class="tile-content iconic">
                        <span class="icon icon-settings"></span>
                    </div>
                    <span class="tile-label">Настройки</span>
                </div>

                <div class="tile bg-teal fg-white" (click)="turnTo('list_users', {})">
                    <div class="tile-content iconic">
                        <span class="icon icon-user"></span>
                    </div>
                    <span class="tile-label">Пользователи</span>
                </div>
                
            </div>
        </div>
    `
})

export class TabMainComponent {
    public tab: Tab;

    turnTo(tabType: string, arg: any) {
        this.tab.reborn(tabType, arg);
    }

    constructor() {
        setTimeout(() => { this.tab.header = 'new tab'; });
    }
}
