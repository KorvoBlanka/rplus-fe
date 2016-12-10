/**
 * Created by Aleksandr on 23.11.16.
 */

import {Component, OnInit, OnChanges} from '@angular/core';
import {UISelectOption} from "./ui-select.component";

@Component({
    selector: 'ui-view-value',
    inputs: ['options', 'value'],
    template: `
        <div class="ui-view-value">
                {{ selected?.label }}
        </div>
    `,
    styles: [`
    `]
})


export class UIViewValue implements OnInit {
    public options: Array<UISelectOption>;
    public value: any;

    selected: UISelectOption;

    ngOnInit() {
        for (let o of this.options) {
            if (this.value === o.value) {
                this.selected = o;
            }
        }
        if (this.selected == null && this.options.length > 0) {
            this.selected = this.options[0];
        }
    }
}

