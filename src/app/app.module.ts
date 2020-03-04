import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
// Common
import { CommonService } from './common/common.service';
import {
  CanLoginActivate, CanAuthActivate
} from './common/auth.gaurd';
import { ErrorMessages } from './common/errorMessages';
import { SharedModule } from './reusable/shared/shared.module'
import { BsDropdownModule, BsDropdownToggleDirective, BsDropdownDirective } from 'ngx-bootstrap';
import { Broadcaster } from './common/broadCaster';
import {ToasterModule, ToasterService} from 'angular2-toaster';
@NgModule({
  declarations: [
    AppComponent,
    CanLoginActivate,
    CanAuthActivate
  ],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    NgtUniversalModule,
    AppRoutingModule,
    ToasterModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CanLoginActivate,
    CanAuthActivate,
    CommonService,
    BsDropdownDirective,
    ErrorMessages,
    Broadcaster
  ]
})
export class AppModule { }
