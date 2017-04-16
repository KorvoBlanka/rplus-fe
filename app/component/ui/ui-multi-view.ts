import {Component, OnInit, OnChanges} from '@angular/core';

@Component({
    selector: 'ui-multi-view',
    inputs: ['values'],
    template: `
            <div><div class="total" *ngFor="let val of values">
                <span *ngIf='val.value'>{{ val.type }}</span>
                <span>{{ val.value }}</span>
            </div></div>
    `,
    styles: [`

        .total{
            display: inline-block;
            flex-direction: column;
            height: 32px;
            margin-right: 15px;
            margin-top: -3px;
            color: dimgrey;
        }

        div>div:last-child{
            margin-right: 0;
        }

        .total span:first-child{
            font-size: 8pt;
            color: #c0c0c0;
            display: block;
        }

        .total span:last-child{
            margin-top: -3px;
        }
    `]
})


export class UIMultiView implements OnInit {
    public values: Array<Value>;


    ngOnInit() {
        console.log(this.values);
    }
}

export interface Value {
    type: string,
    value: string
}
