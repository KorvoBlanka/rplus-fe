/**
 * Created by Aleksandr on 20.01.17.
 */

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginScreenComponent} from "./component/login-screen.component";
import {AdminPageComponent} from "./component/admin-page.component";
import {SelectivePreloadingStrategy} from "./selective-preloading-strategy";


const appRoutes: Routes = [
    { path: 'admin', component: AdminPageComponent },
    { path: 'login', component: LoginScreenComponent },
];


@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { preloadingStrategy: SelectivePreloadingStrategy }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        SelectivePreloadingStrategy
    ]
})
export class AppRoutingModule {}