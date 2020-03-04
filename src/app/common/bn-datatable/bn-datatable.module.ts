import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule,ModalModule,SortableModule, BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SortService } from './sortService';
import  { SortPipe, SearchFilter, SortableTableDirective, SortableColumnComponent } from './bn-datatable.component'

@NgModule({
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    SortableModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    NgSelectModule
  ],
  declarations: [
  	SortableColumnComponent,
  	SortableTableDirective,
  	SortPipe, 
    SearchFilter
  ],
  providers:[
  	SortService
  ],
  exports : [
    SortableColumnComponent,
    SortableTableDirective,
    SortPipe,
    SearchFilter,
    CommonModule,
    PaginationModule,
    BsDropdownModule,
    CollapseModule,
    ModalModule,
    SortableModule,
    NgSelectModule
  ]
})
export class BnDatatableModule { }
