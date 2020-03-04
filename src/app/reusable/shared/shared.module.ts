import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { RouterModule } from '@angular/router' 
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatSlideToggleModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { PaginationModule } from 'ngx-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatTooltipModule } from '@angular/material';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule, BsDropdownModule, BsDropdownDirective } from 'ngx-bootstrap';
import { BnDatatableModule } from '../../common/bn-datatable/bn-datatable.module'
import { BaseComponent } from '../../common/commonComponent';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TabsModule } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import {MatButtonModule, MatSelectModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxCurrencyModule } from "ngx-currency";
import {NgxPrintModule} from 'ngx-print';
@NgModule({
  imports: [
    MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, 
    BsDropdownModule, InfiniteScrollModule, MatMenuModule, 
    RouterModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    }),
    FormsModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    NgSelectModule,
    SweetAlert2Module.forRoot(),
    TabsModule.forRoot(),
    MalihuScrollbarModule.forRoot(),
    BnDatatableModule,
    LoadingBarHttpClientModule,
    PaginationModule.forRoot(),
    ImageCropperModule,
    // ChartModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    NgxPrintModule
    // ImageUploadModule.forRoot(),
    // UiSwitchModule
  ],
  declarations: [
    BaseComponent
  ],
  providers: [DatePipe],
  exports: [
    MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, 
    BsDropdownModule, InfiniteScrollModule, MatMenuModule, 
    BsDatepickerModule,
    TabsModule,
    HttpClientXsrfModule,
    NgxSpinnerModule,
  ModalModule,
    FormsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatRadioModule,
    NgSelectModule,
    SweetAlert2Module,
    MalihuScrollbarModule,
    BnDatatableModule,
    LoadingBarHttpClientModule,
    PaginationModule,
    ImageCropperModule,
    // ChartModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    NgxPrintModule
  ]
})
export class SharedModule { }
