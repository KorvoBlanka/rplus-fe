import {Component, OnInit, OnChanges} from '@angular/core';
import {Output, EventEmitter} from '@angular/core';
import {SuggestionService} from "../../service/suggestion.service";
import {Offer} from '../../class/offer';

@Component({
    selector: 'ui-input-line',
    inputs: ['placeholder', 'value', 'width' , 'isAddress'],
    template: `
        <div class="ui-input-line">
            <span class="label" [style.opacity]="getOpacity()">{{placeholder}}</span>
            <input type="text" value = "{{ value }}" style = "width: {{width}}" class = "input_line" [(ngModel)]="searchQuery"
                (keydown) = "setOpacity()" (keyup) = "editOpacity($event)" placeholder = "{{placeholder}}"
                (click) ="isClick($event)" [class.short_field]="isAddress"
            >

            <div class="suggestions" (document:click)="docClick()" *ngIf="sgList.length > 0 && isAddress">
                <ul *ngFor="let item of sgList" >
                    <li >
                        <a (click)="select(item, $event)">{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>
    `,
    styles: [`
        .short_field{
            width: 250px;
        }
        .input_line{
            border: 0;
            margin-top: -3px;
            height: 19px;
            color: dimgrey;
            text-overflow: ellipsis;
        }
        .label{
            font-size: 8pt;
        }

        .ui-input-line {
            display: flex;
            flex-direction: column;
            height: 35px;
            margin-top: -3px;
        }

        .option_field{
            height: 25px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid silver;
            margin-bottom: 10px;
            align-items: center;
        }
        .suggestions{
            position: absolute;
            z-index: 100;
            background-color: white;
            left: -57px;
            width: 370px;
            margin-top: 35px;
            border-bottom: 1px solid silver;
            font-size: 10pt;
        }

        .suggestions ul{
            list-style-type: none;
            padding: 0 15px;
            text-align: left;
            margin: 0 0 10px 0;
        }

        .suggestions ul li{
            cursor: default;
        }
        .suggestions  ul:hover {
            background: #f7f7f7;
            cursor: default;
        }
        .finder{
            height: 28px;
            position: relative;
            left: -45;
            width: 125%;
            background-color: rgb(247, 247, 247);
            border: 1px solid rgba(204, 204, 204, 0.47);
            font-size: 10pt;
        }
    `]
})


export class UIInputLine implements OnInit, OnChanges {
    public placeholder: string;
    public value: string;
    public width: string;
    public isAddress: boolean;

    searchQuery = '';
    sgList: string[] = [];

    opacity = 1;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    constructor(
        private _suggestionService: SuggestionService
    ) {
    }

    isClick(event){
        if(this.isAddress){
            let parent: HTMLElement = (<HTMLElement>event.currentTarget).parentElement.parentElement.parentElement;
            let height: number;
            if(parent.getElementsByTagName('input').length > 0)
                height = parent.getElementsByTagName('input').length * 35;
            else
                height = (parent.getElementsByTagName('input').length - 1) * 35;
            if(parent.offsetHeight == 30){
                parent.style.setProperty('height', ""+(height+15)+'px');
                parent.style.setProperty('overflow', "visible");
            }
        }
    }
    ngOnInit() {
        if(this.value)
            this.opacity = 1;
        else this.opacity = 0;
    }

    getOpacity() {
        return this.opacity;
    }

    setOpacity() {
        this.opacity = 1;
    }

    editOpacity(event) {
        if(this.isAddress)
            this.searchParamChanged(event);
        if(event.target.value == "")
            this.opacity = 0;
        else if(!this.isAddress)
            this.onChange.emit(event.target.value);
    }

    ngOnChanges() {

    }

    searchParamChanged(e) {
        if (this.searchQuery.length > 0) {
            let sq = this.searchQuery.split(" ");
            let lp = sq.pop()
            let q = sq.join(" ");
            this.sgList = [];
            if (lp.length > 0) {
                this._suggestionService.list(this.searchQuery).subscribe(sgs => {
                    sgs.forEach(e => {
                        this.sgList.push(e);
                    })
                })
            }
        }
    }

    select(itm: string, event) {
        this.searchQuery = itm;
        let fullAddress =  Offer.parseAddress(itm);
        this.onChange.emit(fullAddress.reverse());
        this.sgList = [];
        let parent: HTMLElement =  event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        let height: number = fullAddress.length*36;
        parent.style.setProperty('height', ""+(height+56)+'px');
    }

}
