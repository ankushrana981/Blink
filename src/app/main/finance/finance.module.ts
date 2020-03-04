import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseViewComponent } from './expense-view/expense-view.component';
import { ExpenseApprovalComponent } from './expense-approval/expense-approval.component';
import { ExpenseReconcillationComponent } from './expense-reconcillation/expense-reconcillation.component';
import { SharedModule } from '@reusable/shared/shared.module'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ExpenseViewComponent, ExpenseApprovalComponent, ExpenseReconcillationComponent],
  imports: [
    CommonModule, SharedModule,
    RouterModule.forChild(
      [
        {
          path : 'expense-view',
          component : ExpenseViewComponent,
          pathMatch : 'full'
        },
        {
          path : 'expense-approval',
          component : ExpenseApprovalComponent,
          pathMatch : 'full'
        },
        {
          path : 'expense-reconcillation',
          component : ExpenseReconcillationComponent,
          pathMatch : 'full'
        }
      ])
  ]
})
export class FinanceModule { }
