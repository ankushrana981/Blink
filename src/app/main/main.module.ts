import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountingComponent } from './dashboard/accounting/accounting.component';
import { InvoiceApprovalsComponent } from './dashboard/invoice-approvals/invoice-approvals.component';
import { WarehouseComponent } from './dashboard/warehouse/warehouse.component';
import { CrmDashboardComponent } from './dashboard/crm-dashboard/crm-dashboard.component';
import { GeneralAdminComponent } from './dashboard/general-admin/general-admin.component';
import { FinanceExpensesComponent } from './dashboard/finance-expenses/finance-expenses.component';
import { FinanceCurrentComponent } from './dashboard/finance-current/finance-current.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './../reusable/header/header.component';
import { SidebarComponent } from './../reusable/sidebar/sidebar.component';
import { HighchartsComponent } from '../reusable/highcharts/highcharts.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from './../reusable/shared/shared.module';
import { CustomerSetupModalComponent } from '../reusable/customer-setup-modal/customer-setup-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SettingsComponent } from './settings/settings.component';
import { CompanySettingsComponent } from './settings/company-settings/company-settings.component';
import { ChartofaccountComponent } from './settings/chartofaccount/chartofaccount.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule as NgModalDragg } from 'ng-modal-lib';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ErrorMessages } from '../common/errorMessages';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountingComponent,
    InvoiceApprovalsComponent,
    WarehouseComponent,
    CrmDashboardComponent,
    GeneralAdminComponent,
    FinanceExpensesComponent,
    FinanceCurrentComponent,
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    HighchartsComponent,
    CustomerSetupModalComponent,
    SettingsComponent,
    CompanySettingsComponent,
    ChartofaccountComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    SharedModule,
    CommonModule,
    NgApexchartsModule,
    NgModalDragg,
    DragDropModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            component: DashboardComponent,
            children: [
              {
                path: '',
                redirectTo: 'accounting',
                pathMatch: 'full',
              },
              {
                path: 'accounting',
                component: AccountingComponent,
                pathMatch: 'full',
              },
              {
                path: 'invoice-approvals',
                component: InvoiceApprovalsComponent,
                pathMatch: 'full',
              },
              {
                path: 'crm-dashboard',
                component: CrmDashboardComponent,
                pathMatch: 'full',
              },
              {
                path: 'finance-current',
                component: FinanceCurrentComponent,
                pathMatch: 'full',
              },
              {
                path: 'general-admin',
                component: GeneralAdminComponent,
                pathMatch: 'full',
              },
              {
                path: 'warehouse',
                component: WarehouseComponent,
                pathMatch: 'full',
              },
              {
                path: 'finance-expenses',
                component: FinanceExpensesComponent,
                pathMatch: 'full',
              },
            ],
          },
          {
            path: 'invoicing',
            loadChildren : () => import('./invoicing/invoicing.module').then(m=> m.InvoicingModule)
          },
          {
            path: 'crm',
            loadChildren: () => import('./crm/crm.module').then(m => m.CrmModule)
          },
          {
            path: 'manufacturing',
            loadChildren: () => import('./manufacturing/manufacturing.module').then(m => m.ManufacturingModule)
          },
          {
            path: 'inventory',
            loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule)
          },
          {
            path: 'accounting',
            loadChildren: () => import('./accounting/accounting.module').then(m => m.AccountingModule)
          },
          {
            path: 'finance',
            loadChildren: () => import('./finance/finance.module').then(m=>  m.FinanceModule)
          },
          {
            path: 'finance',
            loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule)
          },
          {
            path: 'settings',
            children: [
              {
                path: 'companysettings',
                component: CompanySettingsComponent,
                pathMatch: 'full',
              },
              {
                path: 'chartofaccount',
                component: ChartofaccountComponent,
                pathMatch: 'full',
              },
            ],
          },
          {
            path: 'task',
            loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
          },
          {
            path: 'transcations',
            loadChildren:() => import('./transcations/transcations.module').then(m => m.TranscationsModule)
          },
        ],
      },
    ]),
  ],
  providers: [ErrorMessages],
})
export class MainModule {}
