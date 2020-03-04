import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
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
// import { ChartModule } from  'angular-highcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from './../reusable/shared/shared.module'
import { AddCustomerSetupComponent } from './crm/customer-setup/add-customer-setup/add-customer-setup.component';
import { CustomerSetupModalComponent } from '../reusable/customer-setup-modal/customer-setup-modal.component';
import { GhostListComponent } from '../reusable/ghost/ghost-list.component';
import { ModalModule } from 'ngx-bootstrap';
import { SettingsComponent } from './settings/settings.component';
import { CompanySettingsComponent } from './settings/company-settings/company-settings.component';
import { ChartofaccountComponent } from './settings/chartofaccount/chartofaccount.component';
@NgModule({
  declarations: [DashboardComponent, AccountingComponent, InvoiceApprovalsComponent, WarehouseComponent, CrmDashboardComponent, GeneralAdminComponent, FinanceExpensesComponent, FinanceCurrentComponent, MainComponent, HeaderComponent, SidebarComponent,
    HighchartsComponent,

    //  GhostListComponent,  
    CustomerSetupModalComponent,

    SettingsComponent,

    CompanySettingsComponent,

    ChartofaccountComponent
  ],
  imports: [
    ModalModule.forRoot(),
    // BsDatepickerModule.forRoot(),
    SharedModule,
    CommonModule,
    // ChartModule,
    NgApexchartsModule,
    RouterModule.forChild(
      [
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
                  pathMatch: 'full'
                },
                {
                  path: 'accounting',
                  component: AccountingComponent,
                  pathMatch: 'full'
                },
                {
                  path: 'invoice-approvals',
                  component: InvoiceApprovalsComponent,
                  pathMatch: 'full'
                },
                {
                  path: 'crm-dashboard',
                  component: CrmDashboardComponent,
                  pathMatch: 'full'
                },
                {
                  path: 'finance-current',
                  component: FinanceCurrentComponent,
                  pathMatch: 'full'
                },
                {
                  path: 'general-admin',
                  component: GeneralAdminComponent,
                  pathMatch: 'full'
                },
                {
                  path: 'warehouse',
                  component: WarehouseComponent,
                  pathMatch: 'full'
                },
                {
                  path: 'finance-expenses',
                  component: FinanceExpensesComponent,
                  pathMatch: 'full'
                }


              ]
            },
            {
              path: 'invoicing',
              loadChildren: './invoicing/invoicing.module#InvoicingModule',
            },
            {
              path: 'crm',
              loadChildren: './crm/crm.module#CrmModule',
            },
            {
              path: 'manufacturing',
              loadChildren: './manufacturing/manufacturing.module#ManufacturingModule',
            },
            {
              path: 'inventory',
              loadChildren: './inventory/inventory.module#InventoryModule',
            },
            {
              path: 'accounting',
              loadChildren: './accounting/accounting.module#AccountingModule',
            },
            {
              path: 'finance',
              loadChildren: './finance/finance.module#FinanceModule',
            },
            {
              path: 'finance',
              loadChildren: './finance/finance.module#FinanceModule',
            },
            {
              path: 'settings',
              children: [
                {
                  path: 'companysettings',
                  component: CompanySettingsComponent,
                  pathMatch: 'full'
                },
                {
                  path: 'chartofaccount',
                  component: ChartofaccountComponent,
                  pathMatch: 'full'
                }
              ]
            }
          ]
        }
      ]
    )
  ],
  providers: [
  ],
  entryComponents: [CustomerSetupModalComponent]

})
export class MainModule { }
