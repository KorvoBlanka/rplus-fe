import {Component, SimpleChange} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';


@Component({
    selector: 'ui-tab',
    inputs: [
        'title',
        'active'
    ],
    styles: [``],
    template: `
        <div [hidden]="!active" style="position: relative;">
            <ng-content></ng-content>
        </div>
    `
})

export class UITab {
    title: string;
    active: boolean = false;

    selectTab() {
        this.active = true;
    }
}
