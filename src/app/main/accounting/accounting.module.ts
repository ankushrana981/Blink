import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceivableViewComponent } from './receivable-view/receivable-view.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { SharedModule } from '@reusable/shared/shared.module'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReceivableViewComponent, PaymentViewComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(
      [
        {
          path : 'receivable-view',
          component : ReceivableViewComponent,
          pathMatch : 'full'
        },
        {
          path : 'payment-view',
          component : PaymentViewComponent,
          pathMatch : 'full'
        }
      ])
  ]
})
export class AccountingModule { }
