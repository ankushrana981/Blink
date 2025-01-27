import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerSetupComponent } from "./customer-setup/customer-setup.component";
import { CompanySetupComponent } from "./company-setup/company-setup.component";
import { ContactSetupComponent } from "./contact-setup/contact-setup.component";
import { DiscountRulesComponent } from "./discount-rules/discount-rules.component";
import { TaxRulesComponent } from "./tax-rules/tax-rules.component";
import { NotesComponent } from "./notes/notes.component";
import { CompanySettingsComponent } from "./company-settings/company-settings.component";
import { RouterModule } from "@angular/router";
import { AddCustomerSetupComponent } from "./customer-setup/add-customer-setup/add-customer-setup.component";
import { CustomerSetupListingComponent } from "./customer-setup/customer-setup-listing/customer-setup-listing.component";
import { SharedModule } from "./../../reusable/shared/shared.module";
// import { MalihuScrollbarModule } from "ngx-malihu-scrollbar";
import { ModalModule } from "ngx-bootstrap/modal";
// import { ChatsComponent } from './chats/chats.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { NotesViewComponent } from "./notes-view/notes-view.component";
// import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
// import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
// import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { TasksComponent } from "./tasks/tasks.component";
import { ReladexComponent } from './reladex/reladex.component';
// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true,
// };
@NgModule({
  declarations: [
    AddCustomerSetupComponent,
    CustomerSetupComponent,
    CompanySetupComponent,
    ContactSetupComponent,
    DiscountRulesComponent,
    TaxRulesComponent,
    NotesComponent,
    CompanySettingsComponent,
    CustomerSetupListingComponent,
    NotesViewComponent,
    TasksComponent,
    ReladexComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    // MalihuScrollbarModule.forRoot(),
    ModalModule.forRoot(),
    NgSelectModule,
    // PerfectScrollbarModule,
    CarouselModule,
    RouterModule.forChild([
      {
        path: "",
        redirectTo: "customersetup",
        pathMatch: "full",
      },
      {
        path: "customersetup",
        component: CustomerSetupComponent,
        children: [
          {
            path: "",
            redirectTo: "customer-setup-list",
            pathMatch: "full",
          },
          {
            path: "customer-setup-list",
            component: CustomerSetupListingComponent,
            pathMatch: "full",
          },
          {
            path: "new-customer-setup",
            component: AddCustomerSetupComponent,
            pathMatch: "full",
          },
        ],
      },
      {
        path: "discount",
        component: DiscountRulesComponent,
        pathMatch: "full",
      },
      {
        path: "tax",
        component: TaxRulesComponent,
        pathMatch: "full",
      },
      {
        path: "notes",
        component: NotesComponent,
        pathMatch: "full",
      },
      {
        path: "notes/:businessPartnerId/:type",
        component: NotesComponent,
        pathMatch: "full",
      },
      {
        path: "task",
        component: TasksComponent,
        pathMatch: "full",
      },
      {
        path: "task/:businessPartnerId/:type",
        component: TasksComponent,
        pathMatch: "full",
      },
      // {
      //     path: 'chats',
      //     component: ChatsComponent,
      //     pathMatch: 'full'
      // },
      {
        path: "notes-view",
        component: NotesViewComponent,
        pathMatch: "full",
      },
      {
        path: "reladex",
        component: ReladexComponent,
        pathMatch: "full",
      },
    ]),
  ],
  providers: [
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    // },
  ],
})
export class CrmModule {}
