import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceEntryComponent } from './invoice-entry/invoice-entry.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { InvoiceApprovalComponent } from './invoice-approval/invoice-approval.component';
import { SharedModule } from '../../reusable/shared/shared.module';
import { RouterModule } from '@angular/router';
import { GhostListComponent } from '../../reusable/ghost/ghost-list.component';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';

@NgModule({
  declarations: [
    InvoiceEntryComponent,
    InvoiceViewComponent,
    InvoiceApprovalComponent,
    GhostListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalendarModule,
    DatePickerModule,
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'view',
        component: InvoiceViewComponent,
        pathMatch: 'full',
      },
      {
        path: 'entry',
        component: InvoiceEntryComponent,
        pathMatch: 'full',
      },
      {
        path: 'approval',
        component: InvoiceApprovalComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export class InvoicingModule {}
