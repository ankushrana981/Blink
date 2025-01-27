import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
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
