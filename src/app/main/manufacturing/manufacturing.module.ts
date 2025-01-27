import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompositionEntryComponent } from './composition-entry/composition-entry.component';
import { CompositionViewComponent } from './composition-view/composition-view.component';
import { ProductionViewComponent } from './production-view/production-view.component';
import { ProductionEntryComponent } from './production-entry/production-entry.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../reusable/shared/shared.module'
import { CompositionComponent } from './composition/composition.component';
import { OutsideClickDirective } from './outside-click.directive';
import {ProductModifierComponent} from './product-modifier/product-modifier.component';


// import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
// import { ModalModule as NgModalDragg } from 'ng-modal-lib';
import { ManageCompositionsComponent } from './manage-compositions/manage-compositions.component';
// import { AlphabetFilterModule } from 'alphabet-filter';

@NgModule({
  declarations: [CompositionEntryComponent,
    CompositionViewComponent, 
    CompositionComponent,
    ManageCompositionsComponent,ProductModifierComponent,
    ProductionViewComponent, ProductionEntryComponent, OutsideClickDirective],
  imports: [
    // MalihuScrollbarModule.forRoot(),
    SharedModule,
    CommonModule,
    ModalModule.forRoot(),
    NgSelectModule,
    // NgModalDragg,
    // AlphabetFilterModule,
    RouterModule.forChild(
      [
        {
          path: 'composition-entry',
          component: CompositionEntryComponent,
          pathMatch: 'full'
        },
        // {
        //   path : 'composition-view',
        //   component : CompositionViewComponent,
        //   pathMatch : 'full'
        // },
        {
          path: 'production-entry',
          component: ProductionEntryComponent,
          pathMatch: 'full'
        },
        {
          path: 'production-view',
          component: ProductionViewComponent,
          pathMatch: 'full'
        },
        {
          path: 'composition-view',
          component: CompositionComponent,
          pathMatch: 'full'
        },
        {
          path: 'manage-compositions',
          component: ManageCompositionsComponent,
          pathMatch: 'full'
        },
        {
          path: 'product-modifier',
          component: ProductModifierComponent,
          pathMatch: 'full'
        },
      ])
  ]
})
export class ManufacturingModule { }
