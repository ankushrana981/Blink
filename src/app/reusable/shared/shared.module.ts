import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectModule } from '@ng-select/ng-select';
// import { SweetAlert2Module } from 'ngx-sweetalert2';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { ImageCropperModule } from 'ngx-image-cropper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownDirective } from 'ngx-bootstrap/dropdown';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BnDatatableModule } from '../../common/bn-datatable/bn-datatable.module';
import { BaseComponent } from '../../common/commonComponent';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxCurrencyDirective } from 'ngx-currency';
import { NgxPrintModule } from 'ngx-print';
import { IconDownloadComponent } from '../../common/svg/icon-download.component';
import { IconFilterComponent } from '../../common/svg/icon-filter.component';
import { IconMoreComponent } from '../../common/svg/icon-more.component';
import { IconPluseComponent } from '../../common/svg/icon-pluse.component';
import { IconUploadComponent } from '../../common/svg/icon-upload.component';
import { IconCrossComponent } from '../../common/svg/icon-cross.component';
import { IconPencilComponent } from '../../common/svg/icon-pencil.component';
import { IconAttechedComponent } from '../../common/svg/icon-atteched.component';
import { IconSendComponent } from '../../common/svg/icon-send.component';
import { IconPluseRoundComponent } from '../../common/svg/icon-pluse-round.component';
import { IconSearchComponent } from '../../common/svg/icon-search.component';
import { IconLocationLineComponent } from '../../common/svg/icon-location-line.component';
// import { IconFileComponent } from '@common/svg/icon-product-file.component';
import { IconFileLineComponent } from '../../common/svg/icon-file-line.component';
import { IconDocumentLineComponent } from '../../common/svg/icon-document-line.component';
import { IconContactLineComponent } from '../../common/svg/icon-contact-line.component';
import { IconCameraLineComponent } from '../../common/svg/icon-camera-line.component';
import { ClickOutsideDirective } from '../../reusable/outclick-directive';
import { IconDownComponent } from '../../common/svg/icon-down.component';
import { IconBarComponent } from '../../common/svg/icon-bar.component';
import { IconInfoCheckComponent } from '../../common/svg/icon-check.component';
import { IconCloseComponent } from '../../common/svg/icon-close.component';
import { IconBarLineComponent } from '../../common/svg/icon-bar-line.component';
import { ChatsComponent } from '../../reusable/chats/chats.component';
import { CreateTaskComponent } from '../../reusable/create-task/create-task.component';
import { UpdateDueDateComponent } from '../../reusable/updatedue-date/updatedue-date.component';
import { IconCheckedComponent } from '../../common/svg/icon-checked.component';
import { IconCalenderComponent } from '../../common/svg/icon-calender.component';
import { TaskListComponent } from '../../reusable/task-list/task-list.component';
import { IconMenuComponent } from '../../common/svg/icon-menu.component';
import { TaskProgressComponent } from '../../reusable/task-progress/task-progress.component';
import { IconChatComponent } from '../../common/svg/icon-chat.component';
import { ModalModule as NgModalDragg } from 'ng-modal-lib';
import { IconMinimizeComponent } from '../../common/svg/icon-minimize.component';
import { ModalDemoComponent } from '../../reusable/draggable-popup/draggable-popup.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { AngularResizeEventModule } from 'angular-resize-event';
import { AddProductComponent } from '../../reusable/add-product/add-product.component';
import { IconCameraComponent } from '../../common/svg/icon-camera.component';
import { IconProductFileComponent } from '../../common/svg/icon-product-file.component';
import { IconCloseLight } from '../../common/svg/icon-closelight.component';
import { IconQuestionComponent } from '../../common/svg/icon-question';
import { TranscationsPopupComponent } from '../../reusable/transcations-popup/transcations-popup.component';
import { ApplyCreditComponent } from '../../reusable/apply-credit/apply-credit.component';
import { AdjustAmountComponent } from '../../reusable/adjust-amount/adjust-amount.component';
import { ReturnBalanceComponent } from '../../reusable/return-balance/return-balance.component';
// import { NgxMaskModule, IConfig } from 'ngx-mask'
import { DiscountSettingComponent } from '../../reusable/discount-setting/discount-setting.component';
import { IconFolderComponent } from '../../common/svg/icon-folder';
import { QuickCustomerComponent } from '../../reusable/quick-customer/quick-customer.component';
import { AlphabetFilterModule } from 'alphabet-filter';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IconSquareQuestionComponent } from '../../common/svg/icon-square-question';
import { IconSquareRightComponent } from '../../common/svg/icon-square-right';
import { NgScrollbarModule } from 'ngx-scrollbar';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';

// const maskConfig: Partial<IConfig> = {validation: false,};

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BsDropdownModule,
    InfiniteScrollDirective,
    RouterModule,
    AngularResizeEventModule,
    DragDropModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN',
    }),
    FormsModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    NgSelectModule,
    //         SweetAlert2Module.forRoot(),
    TabsModule.forRoot(),
//     MalihuScrollbarModule.forRoot(),
    BnDatatableModule,
    LoadingBarHttpClientModule,
    PaginationModule.forRoot(),
    //         ImageCropperModule,
    //         // ChartModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxCurrencyDirective,
    NgxPrintModule,
    //         // ImageUploadModule.forRoot(),
    //         // UiSwitchModule
    NgModalDragg,
    //         NgxMaskModule.forRoot(maskConfig),
    NgApexchartsModule,
    CarouselModule,
    //         NgxSliderModule,
  ],
  declarations: [
    BaseComponent,
    ModalDemoComponent,
    IconDownloadComponent,
    IconFilterComponent,
    IconMoreComponent,
    IconPluseComponent,
    IconUploadComponent,
    IconCrossComponent,
    IconPencilComponent,
    IconAttechedComponent,
    IconSendComponent,
    IconSearchComponent,
    IconPluseRoundComponent,
    IconLocationLineComponent,
    // IconFileComponent,
    IconFileLineComponent,
    IconDocumentLineComponent,
    IconContactLineComponent,
    IconCameraLineComponent,
    ClickOutsideDirective,
    IconDownComponent,
    IconBarComponent,
    IconInfoCheckComponent,
    IconCloseComponent,
    IconBarLineComponent,
    ChatsComponent,
    CreateTaskComponent,
    UpdateDueDateComponent,
    IconCheckedComponent,
    IconCalenderComponent,
    TaskListComponent,
    IconMenuComponent,
    IconChatComponent,
    TaskProgressComponent,
    IconMinimizeComponent,
    AddProductComponent,
    IconCameraComponent,
    IconProductFileComponent,
    IconCloseLight,
    IconQuestionComponent,
    TranscationsPopupComponent,
    ApplyCreditComponent,
    AdjustAmountComponent,
    ReturnBalanceComponent,
    DiscountSettingComponent,
    IconFolderComponent,
    QuickCustomerComponent,
    IconSquareRightComponent,
    IconSquareQuestionComponent,
  ],
  providers: [DatePipe, ModalDemoComponent],
  exports: [
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    BsDropdownModule,
    InfiniteScrollDirective,
    AngularResizeEventModule,
    BsDatepickerModule,
    DragDropModule,
    TabsModule,
    //         NgxSpinnerModule,
    ModalModule,
    NgScrollbarModule ,
    FormsModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatRadioModule,
    NgSelectModule,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    //         SweetAlert2Module,
    //     MalihuScrollbarModule,
    BnDatatableModule,
    LoadingBarHttpClientModule,
    PaginationModule,
    //         ImageCropperModule,
    //         // ChartModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxCurrencyDirective,
    NgxPrintModule,
    ModalDemoComponent,
    IconDownloadComponent,
    IconFilterComponent,
    IconMoreComponent,
    IconPluseComponent,
    IconUploadComponent,
    IconCrossComponent,
    IconPencilComponent,
    IconAttechedComponent,
    IconSendComponent,
    IconSearchComponent,
    IconPluseRoundComponent,
    IconLocationLineComponent,
    // IconFileComponent,
    IconFileLineComponent,
    IconDocumentLineComponent,
    IconContactLineComponent,
    IconCameraLineComponent,
    IconDownComponent,
    ClickOutsideDirective,
    IconBarComponent,
    IconInfoCheckComponent,
    IconCloseComponent,
    IconBarLineComponent,
    ChatsComponent,
    CreateTaskComponent,
    UpdateDueDateComponent,
    IconCheckedComponent,
    IconCalenderComponent,
    TaskListComponent,
    IconMenuComponent,
    TaskProgressComponent,
    IconChatComponent,
    IconMinimizeComponent,
    AddProductComponent,
    IconCameraComponent,
    IconProductFileComponent,
    IconCloseLight,
    IconQuestionComponent,
    TranscationsPopupComponent,
    ApplyCreditComponent,
    AdjustAmountComponent,
    ReturnBalanceComponent,
    DiscountSettingComponent,
    IconFolderComponent,
    QuickCustomerComponent,
    IconSquareQuestionComponent,
    IconSquareRightComponent,
  ],
})
export class SharedModule { }
