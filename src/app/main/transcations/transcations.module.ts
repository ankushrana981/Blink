import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankComponent } from './bank/bank.component';
import { DiscountComponent } from './discount/discount.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../reusable/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,SharedModule,
    RouterModule.forChild(
          [
              {
                  path: '',
                  redirectTo: 'transcations',
                  pathMatch: 'full'
              },
              {
                  path: 'bank',
                  component: BankComponent,
                  pathMatch: 'full'
              },
              {
                  path: 'discount',
                  component: DiscountComponent,
                  pathMatch: 'full'
              }
          ]
      )
    ],
  providers:[]
})
export class TranscationsModule { }
