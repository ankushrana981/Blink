import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router'
import { SharedModule } from './../reusable/shared/shared.module'
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinnerModule,
    NgCircleProgressModule.forRoot(),
    RouterModule.forChild(
      [
        {
          path : '',
          redirectTo : 'login',
          pathMatch : 'full'
        },
        {
          path : 'login',
          component : LoginComponent,
          pathMatch : 'full'
        }
      ]
    )
  ]
})
export class PublicModule { }
