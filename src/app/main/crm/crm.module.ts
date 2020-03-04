import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerSetupComponent } from './customer-setup/customer-setup.component';
import { CompanySetupComponent } from './company-setup/company-setup.component';
import { ContactSetupComponent } from './contact-setup/contact-setup.component';
import { DiscountRulesComponent } from './discount-rules/discount-rules.component';
import { TaxRulesComponent } from './tax-rules/tax-rules.component';
import { TasksComponent } from './tasks/tasks.component';
import { NotesComponent } from './notes/notes.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { RouterModule } from '@angular/router';
import { AddCustomerSetupComponent } from './customer-setup/add-customer-setup/add-customer-setup.component';
import { CustomerSetupListingComponent } from './customer-setup/customer-setup-listing/customer-setup-listing.component';
import { SharedModule } from './../../reusable/shared/shared.module'


@NgModule({
  declarations: [AddCustomerSetupComponent, CustomerSetupComponent, CompanySetupComponent, ContactSetupComponent, DiscountRulesComponent, TaxRulesComponent, TasksComponent, NotesComponent, CompanySettingsComponent, CustomerSetupListingComponent],
  imports: [
    CommonModule,SharedModule,
    RouterModule.forChild(
      [
        {
          path : '',
          redirectTo : 'customersetup',
          pathMatch : 'full'
        },
        {
          path : 'customersetup',
          component : CustomerSetupComponent,
          children : [
            {
              path: '',
              redirectTo : 'customer-setup-list',
              pathMatch : 'full'
            },
            {
              path : 'customer-setup-list',
              component : CustomerSetupListingComponent,
              pathMatch : 'full'
            },
            {
              path: 'new-customer-setup',
              component: AddCustomerSetupComponent,
              pathMatch: 'full'
            }
          ]
        },
        {
          path : 'discount',
          component : DiscountRulesComponent,
          pathMatch : 'full'
        },
        {
          path : 'tax',
          component : TaxRulesComponent,
          pathMatch : 'full'
        },
        {
          path : 'notes',
          component : NotesComponent,
          pathMatch : 'full'
        },
        {
          path : 'task',
          component : TasksComponent,
          pathMatch : 'full'
        }
      ]
    )
  ]
})
export class CrmModule { }
