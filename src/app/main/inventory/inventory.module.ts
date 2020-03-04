import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { VendorSetupComponent } from './vendor-setup/vendor-setup.component';
import { ProductSetupComponent } from './product-setup/product-setup.component';
import { RequestsComponent } from './requests/requests.component';
import { PurchaseOrdersComponent } from './purchase-orders/purchase-orders.component';
import { AdjustmentsComponent } from './adjustments/adjustments.component';
import { ApproveAdjustmentsComponent } from './approve-adjustments/approve-adjustments.component';
import { ReportComponent } from './report/report.component';
import { CountComponent } from './count/count.component';
import { SharedModule } from './../../reusable/shared/shared.module'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NewInventoryComponent } from './new-inventory/new-inventory.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [VendorSetupComponent, ProductSetupComponent, RequestsComponent, PurchaseOrdersComponent, AdjustmentsComponent, ApproveAdjustmentsComponent, ReportComponent, CountComponent, NewInventoryComponent,],
  imports: [
    CommonModule, SharedModule, MatAutocompleteModule, NgApexchartsModule,
    RouterModule.forChild(
      [
        {
          path: 'vendors',
          component: VendorSetupComponent,
          pathMatch: 'full'
        },
        {
          path: 'products',
          component: ProductSetupComponent,
          pathMatch: 'full'
        },
        {
          path: 'requests',
          component: RequestsComponent,
          pathMatch: 'full'
        },
        {
          path: 'purchase-orders',
          component: PurchaseOrdersComponent,
          pathMatch: 'full'
        },
        {
          path: 'adjustments',
          component: AdjustmentsComponent,
          pathMatch: 'full'
        },
        {
          path: 'approve-adjustments',
          component: ApproveAdjustmentsComponent,
          pathMatch: 'full'
        },
        {
          path: 'report',
          component: ReportComponent,
          pathMatch: 'full'
        },
        {
          path: 'count',
          component: CountComponent,
          pathMatch: 'full'
        },
        {
          path: 'new-inventory',
          component: NewInventoryComponent,
          pathMatch: 'full'
        }
      ]
    )
  ]
})
export class InventoryModule { }
