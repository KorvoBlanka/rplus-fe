import {Component} from 'angular2/core';

import {HubService} from './service/hub.service';

import {TabSystemComponent} from './component/tab-system.component';
import {NotebookComponent} from './component/notebook.component';
import {ContextMenuComponent} from './component/context-menu.component';
import {LoginScreenComponent} from './component/login-screen.component';

@Component({
  selector: 'rplus-app',
  template: `
    <div
     (contextmenu)="contextmenu($event)"
     (click)="click($event)"
    >
      <context-menu
        [pos_x]="_hubService.shared_var['cm_px']"
        [pos_y]="_hubService.shared_var['cm_py']"
        [hidden]="_hubService.shared_var['cm_hidden']"
        [items]="_hubService.shared_var['cm_items']"
      >
      </context-menu>
      <login-screen></login-screen>
      <tab-system></tab-system>
      <notebook></notebook>
    </div>
  `,
  styles:[``],
  directives: [TabSystemComponent, NotebookComponent, ContextMenuComponent, LoginScreenComponent],
})

export class AppComponent {
  constructor(private _hubService: HubService) {
    this._hubService.shared_var['cm_hidden'] = true;
  }

  contextmenu(e) {
    this._hubService.shared_var['cm_hidden'] = true;
  }

  click(e) {
    this._hubService.shared_var['cm_hidden'] = true;
  }
}
