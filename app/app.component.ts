import {Component} from 'angular2/core';

import {TabSystemComponent} from './component/tab-system.component';
import {NotebookComponent} from './component/notebook.component';

 
@Component({
    selector: 'rplus-app',
    template: `
       <tab-system
         [n_width]="n_width"
       ></tab-system>
       <notebook
         (widthChange)="notebookWidthChange($event)"
       ></notebook>
     `,
    styles:[``],
    directives: [TabSystemComponent, NotebookComponent],
})

export class AppComponent {
    n_width: number = 30;

    notebookWidthChange(e) {
        this.n_width = e.value;
    }

} 

