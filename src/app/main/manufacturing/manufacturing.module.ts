import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompositionEntryComponent } from './composition-entry/composition-entry.component';
import { CompositionViewComponent } from './composition-view/composition-view.component';
import { ProductionViewComponent } from './production-view/production-view.component';
import { ProductionEntryComponent } from './production-entry/production-entry.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../reusable/shared/shared.module'

@NgModule({
  declarations: [CompositionEntryComponent, CompositionViewComponent, ProductionViewComponent, ProductionEntryComponent],
  imports: [
    CommonModule,SharedModule,
    RouterModule.forChild(
      [
        {
          path : 'composition-entry',
          component : CompositionEntryComponent,
          pathMatch : 'full'
        },
        {
          path : 'composition-view',
          component : CompositionViewComponent,
          pathMatch : 'full'
        },
        {
          path : 'production-entry',
          component : ProductionEntryComponent,
          pathMatch : 'full'
        },
        {
          path : 'production-view',
          component : ProductionViewComponent,
          pathMatch : 'full'
        }
      ])
  ]
})
export class ManufacturingModule { }
