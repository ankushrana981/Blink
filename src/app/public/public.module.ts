import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router'
import { SharedModule } from './../reusable/shared/shared.module'
import { MatInputModule } from '@angular/material/input';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { MatButtonModule, MatSelectModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
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
