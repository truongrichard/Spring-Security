import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./component/login/login.component";
import {HomeComponent} from "./component/home/home.component";
import {BoardUserComponent} from "./component/board-user/board-user.component";
import {BoardAdminComponent} from "./component/board-admin/board-admin.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {authInterceptorProviders} from "./auth.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
