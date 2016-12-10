import {Component, Output, EventEmitter} from '@angular/core';

import {HubService} from '../service/hub.service';

@Component({
    selector: 'notebook',
    styles: [`
        .notebook {
            position: absolute;
            top: 0px;
            right: 0px;
            height: 100%;
            background-color: #fff;
        }
        .header {
            width: 100%;
            height: 30px;
            border-bottom: 1px solid rgba(0,0,0,.2);
        }
        .notebook > .border-stripe {
            width: 30px;
            height: 100%;
            background-color: #ccc;
            float: right;
        }
        .notebook > .main-tab {
            width: 370px;
            height: 100%;
            float: right;
            border-left: 1px solid #ccc;
        }
        .notebook > .event-tab {
            width: 370px;
            height: 100%;
            float: right;
            border-left: 1px solid #ccc;
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
    `],
    template: `
        <div class="notebook">
            <div class="border-stripe">
                <div class="header">
                    <div class="tab-button" (click)="toggleNotebook()">
                        <span [ngClass]="{'icon-arrow-left': hidden, 'icon-arrow-right': !hidden}"></span>
                    </div>
                </div>
            </div>
            <div class="event-tab" [hidden]="hidden || eventHidden">
                <div class="header"></div>
            </div>
            <div class="main-tab" [hidden]="hidden" (click)="toggleEvent()">
                <div class="header"></div>
            </div>
        </div>
    `
})

export class NotebookComponent {
    hidden = true;
    eventHidden = true;

    @Output() widthChange: EventEmitter<any> = new EventEmitter();

    constructor(private _hubService: HubService) {
        this._hubService.shared_var['nb_width'] = 1;
    }

    toggleNotebook() {
        this.hidden = !this.hidden;
        this.emitWidth();
    }

    toggleEvent() {
        this.eventHidden = !this.eventHidden;
        this.emitWidth();
    }

    emitWidth() {
        var w = 1;
        if (!this.hidden) {
            // TODO: wtf 371?!
            w += 371;
            if (!this.eventHidden) {
                w += 371;
            }
        }
        this._hubService.shared_var['nb_width'] = w;
        this.widthChange.emit({value: w});
    }
}
