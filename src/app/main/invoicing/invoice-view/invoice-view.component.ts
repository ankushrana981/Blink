import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { Subject, Observable, of, concat } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  switchMap,
  tap,
  catchError,
  delay,
  map,
  startWith,
  mergeMap,
} from 'rxjs/operators';
import { state, style, animate, transition } from '@angular/animations';
import moment from 'moment';

@Component({
  selector: 'app-invoice-view',
  standalone: false,
  templateUrl: './invoice-view.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')),
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-5%)' }),
        animate('300ms ease-in'),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-out',
          style({ transform: 'translateX(-5%)', opacity: 0 })
        ),
      ]),
    ]),
  ],

  styles: [],
})
export class InvoiceViewComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;

  // public ts: any = "1559903309667";
  public ts = this.getTimeStap();
  public offset: any = 0;
  public limit: any = 20;
  public status: any = 'all';
  public type: any = 'invoice';
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  // direction = '';
  public listrecords: any = [];
  public listrecords1: any = [];
  statusText: string = 'not reached';
  total: any;
  public filterstart = [
    {
      id: 1,
      title: 'Date',
      option: [],
      async: false,
      labelName: 'Date type',
      bindedValue: '',
    },
    {
      id: 2,
      title: 'Invoice #',
      option: [],
      async: false,
      labelName: 'Invoice number',
      bindedValue: '',
    },
    {
      id: 3,
      title: 'Company',
      option: [],
      async: true,
      labelName: 'Company Name',
      bindedValue: '',
    },
    {
      id: 4,
      title: 'Category',
      option: [],
      async: false,
      labelName: 'Product Category ',
      bindedValue: '',
    },
    {
      id: 5,
      title: 'Brand',
      option: [],
      async: false,
      labelName: 'Brand',
      bindedValue: '',
    },
    {
      id: 6,
      title: 'Product',
      option: [],
      async: false,
      labelName: 'Product',
      bindedValue: '',
    },
    {
      id: 7,
      title: 'Amount',
      option: [],
      async: false,
      labelName: 'Amount',
      bindedValue: '',
    },
    {
      id: 8,
      title: 'Invoice Status',
      option: [],
      async: false,
      labelName: 'Invoice Status',
      bindedValue: '',
    },
    {
      id: 9,
      title: 'Product Status',
      option: [],
      async: false,
      labelName: 'Payment Status',
      bindedValue: '',
    },
  ];

  public refFilter = [...this.filterstart];
  public fliterflag: boolean = false;
  public activateSecondFilter: boolean = false;
  public activateSecondInvoiceFilter: boolean = false;
  public activateSecondComapanyFilter: boolean = false;
  datefilter1: any = [];
  invoicefilter1: any = [];
  companyfilter1: any = [];
  selected: any = {};
  categoriesrecords: any = {};
  brandsrecords: any = {};
  productrecords: any = {};
  datefilter: any = {};
  filterData: any = {};
  public clientNameItem: Observable<any>;
  public MainSearchdataSource = new Subject<string>();
  public supplierLoading: boolean = false;
  public maxDate = new Date();
  docNumberFrom: any;
  docNumberTo: any;
  amountFrom: any;
  amountTo: any;
  isindex: any;
  pendingStatus: any;
  tempArr = [];
  startDateFrom: any;
  monthFrom: any;
  monthTo: any;
  yearFrom: any;
  yearTo: any;
  startDateTo: any;
  public data = {
    ts: this.ts,
    offset: this.offset,
    type: this.type,
  };

  constructor(inj: Injector) {
    super(inj);
  }

  ngOnInit() {
    this.getUser();
    this.loadTypehead();
    this.getCategories();
    this.getProducts();
    this.getBrands();
  }
  getUser() {
    var queryParams =
      'ts=' +
      this.ts +
      '&offset=' +
      this.offset +
      '&limit=' +
      this.limit +
      '&status=' +
      this.status +
      '&type=' +
      this.type;
    this.commonService
      .callApi('api/documents?' + queryParams, '', 'get')
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.total = success.total;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  Editing(element) {
    this.router.navigate(['/main/invoicing/entry'], {
      queryParams: { status: element.status.id, docNumber: element.docNumber },
    });
  }

  public icon1: boolean = false;

  // For active and inactive the right side bar

  changeIc(type) {
    if (type == 'dots') {
      this.icon1 = true;
    } else {
      this.icon1 = false;
    }
  }

  // calling the api for every scroll down

  onScrollDown(ev) {
    this.offset = this.offset + 20;
    var queryParams =
      'ts=' +
      this.ts +
      '&offset=' +
      this.offset +
      '&limit=' +
      this.limit +
      '&status=' +
      this.status +
      '&type=' +
      this.type;
    if (this.total > this.offset) {
      this.commonService
        .callApi('api/documents?' + queryParams, '', 'get')
        .then((success) => {
          if (success) {
            this.listrecords1 = success.records;
            for (var i = 0; i < this.listrecords1.length; i++) {
              this.listrecords.push(this.listrecords1[i]);
            }
          } else {
            this.popToast('error', success.message);
          }
        })
        .catch((e) => {
          console.log('there is an error:', e);
        });
      this.infiniteScroll.ngOnDestroy();
      // this.infiniteScroll.setup();
      // this.direction = 'down'
    }
  }
  onUp(ev) {}
  deleteItem(i) {
    this.swal({
      imageUrl: 'assets/images/trash-bin1.png',
      imageWidth: 155,
      // imageHeight: 171,
      // title: 'Are you sure you want ',
      text: 'Are you sure you want to delete it?',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.commonService
          .callApi('api/documents/' + i.id, '', 'delete')
          .then((success) => {
            this.listrecords = [];
            this.offset = 0;
            this.getUser();
            if (success) {
            } else {
              this.popToast('error', success.message);
            }
          })
          .catch((e) => {
            console.log('there is an error:', e);
          });
      }
    });
  }
  /*****************************************************
  @purpose : toggleing the filter button
  @parameters : 
  @return :
  *****************************************************/

  startingFilter() {
    if (this.fliterflag == true) {
      this.fliterflag = false;
      this.activateSecondComapanyFilter = false;
      this.activateSecondFilter = false;
      this.filterData = {};
    } else {
      this.fliterflag = true;
      // if(this.tempArr.length == 0){
      //   this.filterstart = [...this.refFilter]
      //  }
    }
  }
  /*****************************************************
@purpose : for Parent Filter drop down
@parameters : 
@return :
*****************************************************/
  changedParentFilter(event) {
    $('#filterName :input').blur();

    let options;
    if (event.id == 1) {
      this.filterData.bindedValue = '';
      options = [
        { id: 1, title: 'Specific' },
        { id: 2, title: 'Range' },
      ];
      this.filterData.suboptions = [];
      if (this.filterData.date || this.filterData.enddate) {
        this.filterData.date = false;
        this.filterData.enddate = false;
      }
    } else if (event.id == 2) {
      this.filterData.bindedValue = '';
      options = [
        { title: 'Specific Invoice', id: 1 },
        { title: 'Invoice Range', id: 2 },
      ];
      if (this.filterData.invoice || this.filterData.invoicerange) {
        this.filterData.invoice = false;
        this.filterData.invoicerange = false;
      }
    } else if (event.id == 3) {
      this.filterData.bindedValue = '';
      options = [this.clientNameItem];
    } else if (event.id == 4) {
      this.filterData.bindedValue = '';
      options = [...this.categoriesrecords];
    } else if (event.id == 5) {
      this.filterData.bindedValue = '';
      options = [...this.brandsrecords];
    } else if (event.id == 6) {
      this.filterData.bindedValue = '';
      options = [...this.productrecords];
    } else if (event.id == 7) {
      this.filterData.bindedValue = '';
      options = [
        { title: 'Specific Amount', id: 1 },
        { title: 'Amount Range', id: 2 },
      ];
      if (this.filterData.amount || this.filterData.amountrange) {
        this.filterData.amount = false;
        this.filterData.amountrange = false;
      }
    } else if (event.id == 8) {
      this.filterData.bindedValue = '';
      options = [
        { title: 'All', id: 1 },
        { title: 'Draft', id: 2 },
        { title: 'Pending Approval', id: 3 },
        { title: 'Approved', id: 4 },
        { title: 'Submitted', id: 5 },
        { title: 'Rejected', id: 6 },
        { title: 'Cancelled', id: 7 },
        { title: 'Receivables', id: 8 },
      ];
    } else if (event.id == 9) {
      this.filterData.bindedValue = '';
      options = [
        { title: 'All', id: 1 },
        { title: 'Paid', id: 2 },
        { title: 'Unpaid', id: 3 },
        { title: 'Unpaid with modifictions', id: 4 },
      ];
    }
    this.filterstart.forEach((obj) => {
      if (obj.id == event.id) {
        obj.option = options;
        // obj.option = [...obj.option];
      } else {
        obj.option = [];
        // obj.option = [...obj.option];
      }
    });
  }

  /*****************************************************
@purpose :For first child filter
@parameters : 
@return :
*****************************************************/
  changedChildFilter(event) {
    $('#secondFilter :input').blur();
    $('#supplierName :input').blur();
    if (this.filterData.id === 1) {
      if (this.filterData.bindedValue.id == 1) {
        this.filterData.suboptions = [];
        this.filterData.suboptions.push({
          options: [
            { id: 1, title: 'Year' },
            { id: 2, title: 'Month' },
            { id: 3, title: 'Date' },
          ],
          bindvalue: '',
          type: 'select',
          labelName: 'Filter By',
        });
        this.filterData.suboptions = [...this.filterData.suboptions];
      } else {
        this.filterData.suboptions = [];
        this.filterData.suboptions.push({
          options: [
            { id: 1, title: 'Year' },
            { id: 2, title: 'Month' },
            { id: 3, title: 'Date' },
          ],
          bindvalue: '',
          type: 'select',
          labelName: 'Filter By',
        });
      }
      if (this.filterData.date || this.filterData.enddate) {
        this.filterData.date = false;
        this.filterData.enddate = false;
      } else if (this.filterData.month || this.filterData.endmonth) {
        this.filterData.month = false;
        this.filterData.endmonth = false;
      } else {
        this.filterData.year = false;
        this.filterData.endyear = false;
      }
    } else if (this.filterData.id === 2) {
      if (this.filterData.bindedValue.id == 1) {
        this.docNumberFrom = '';
        this.filterData.invoice = true;
        this.filterData.invoiceValue = '';
        this.filterData.invoicerange = false;
      } else {
        this.docNumberFrom = '';
        this.docNumberTo = '';
        this.filterData.invoice = true;
        this.filterData.invoicerange = true;
        this.filterData.invoicerangeValue = '';
      }
    } else if (this.filterData.id === 3) {
      this.data['businessPartnerId'] = event.id;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 4) {
      this.data['businessPartnerId'] = event.id;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 5) {
      this.data['brandId'] = event.id;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 6) {
      this.data['productId'] = event.id;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 7) {
      if (this.filterData.bindedValue.id == 1) {
        this.amountFrom = '';
        this.filterData.amount = true;
        this.filterData.amountvalue = '';
        this.filterData.amountrange = false;
      } else {
        this.amountFrom = '';
        this.amountTo = '';
        this.filterData.amount = true;
        this.filterData.amountrange = true;
        this.filterData.amountrangevalue = '';
      }
    } else if (this.filterData.id === 8) {
      let id = event.id;
      id--;
      this.data['status'] = id;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 9) {
      if (event.id == 1) {
        this.pendingStatus = 0;
      } else if (event.id == 2) {
        this.pendingStatus = 7;
      } else if (event.id == 3) {
        this.pendingStatus = 5;
      } else {
        this.pendingStatus = 14;
      }
      this.data['status'] = this.pendingStatus;
      this.applyFilter(this.data, 'end');
    }
  }
  /*****************************************************
@purpose : For secondchild filter
@parameters : 
@return :
*****************************************************/

  changedsubChildFilter(event) {
    console.log('event ====', event);
    console.log('firstDropdownFirst', this.filterData);
    if (this.filterData.id === 1) {
      if (this.filterData.bindedValue.id == 1) {
        if (event.id == 3) {
          this.startDateFrom = '';
          this.startDateTo = '';

          this.filterData.date = true;
          this.filterData.enddate = false;
          this.filterData.month = false;
          this.filterData.endmonth = false;
          this.filterData.year = false;
          this.filterData.endyear = false;
          this.filterData.dateValue = '';
        } else if (event.id == 2) {
          this.monthFrom = '';
          this.monthTo = '';
          this.filterData.date = false;
          this.filterData.enddate = false;

          this.filterData.month = true;
          this.filterData.endmonth = false;
          this.filterData.year = false;
          this.filterData.endyear = false;

          this.filterData.monthValue = '';
        } else {
          this.yearFrom = '';
          this.yearTo = '';
          this.filterData.year = true;
          this.filterData.endyear = false;
          this.filterData.date = false;
          this.filterData.enddate = false;
          this.filterData.month = false;
          this.filterData.endmonth = false;

          this.filterData.yearValue = '';
        }
      } else if (this.filterData.bindedValue.id == 2) {
        if (event.id == 3) {
          this.startDateFrom = '';
          this.startDateTo = '';

          this.filterData.date = true;
          this.filterData.enddate = true;
          this.filterData.month = false;
          this.filterData.endmonth = false;
          this.filterData.enddateValue = '';
          this.filterData.year = false;
          this.filterData.endyear = false;
        } else if (event.id == 2) {
          this.monthFrom = '';
          this.monthTo = '';

          this.filterData.month = true;
          this.filterData.endmonth = true;
          this.filterData.date = false;
          this.filterData.enddate = false;
          this.filterData.year = false;
          this.filterData.endyear = false;
          // this.filterData.enddateValue = "";
        } else {
          this.yearFrom = '';
          this.yearTo = '';

          this.filterData.year = true;
          this.filterData.endyear = true;
          this.filterData.month = false;
          this.filterData.endmonth = false;
          this.filterData.date = false;
          this.filterData.enddate = false;
        }
      }
    }
  }

  /*****************************************************
@purpose : After selecing the dates 
@parameters : 
@return :
*****************************************************/
  modelDatepicker(event, type) {
    $('#minDatepicker :input').blur();
    $('#maxDatepicker :input').blur();
    if (this.filterData.date && !this.filterData.enddate) {
      this.startDateFrom = moment.utc(event).format();
      this.data['dateFrom'] = this.startDateFrom;

      this.applyFilter(this.data, 'end');
    } else {
      if (type == 'specific') {
        this.startDateFrom = moment.utc(event).format();
        this.data['dateFrom'] = this.startDateFrom;
      } else {
        this.startDateTo = moment.utc(event).format();
        this.data['dateTo'] = this.startDateTo;
      }

      if (this.startDateFrom && this.startDateTo) {
        this.applyFilter(this.data, 'end');
      }
    }
  }

  /*****************************************************
@purpose : After selecing the MOnhts 
@parameters : 
@return :
*****************************************************/
  modelDatepickerMonth(event, type) {
    $('#minMonthDatepicker :input').blur();
    $('#maxMonthDatepicker :input').blur();
    if (this.filterData.month && !this.filterData.endmonth) {
      this.monthFrom = moment.utc(event).format();
      this.data['monthFrom'] = this.monthFrom;

      this.applyFilter(this.data, 'end');
    } else {
      if (type == 'specific') {
        this.monthFrom = moment.utc(event).format();
        this.data['monthFrom'] = this.monthFrom;
      } else {
        // this.monthTo = moment.utc(event).format();
        var date = event,
          y = date.getFullYear(),
          m = date.getMonth();
        var lastDay = new Date(y, m + 1, 0);
        this.monthTo = moment(lastDay).format();
        this.data['monthTo'] = this.monthTo;
      }

      if (this.monthFrom && this.monthTo) {
        this.applyFilter(this.data, 'end');
      }
    }
  }

  /*****************************************************
@purpose : After selecing the Years 
@parameters : 
@return :
*****************************************************/
  modelDatepickerYear(event, type) {
    $('#minyearDatepicker :input').blur();
    $('#maxyearDatepicker :input').blur();
    if (this.filterData.year && !this.filterData.endyear) {
      var date = event,
        y = date.getFullYear(),
        m = date.getMonth();
      var lastDay = new Date(y, 0, 1);
      this.yearFrom = moment(lastDay).format();
      this.data['yearFrom'] = this.yearFrom;

      this.applyFilter(this.data, 'end');
    } else {
      if (type == 'specific') {
        var date = event,
          y = date.getFullYear(),
          m = date.getMonth();
        var lastDay = new Date(y, 0, 1);
        this.yearFrom = moment(lastDay).format();
        // this.yearFrom = moment.utc(event).format();
        this.data['yearFrom'] = this.yearFrom;
      } else {
        // this.yearTo = moment.utc(event).format();
        var date = event,
          y = date.getFullYear(),
          m = date.getMonth();
        var lastDay = new Date(y, 11, 31);
        this.yearTo = moment(lastDay).format();

        this.data['yearTo'] = this.yearTo;
      }

      if (this.yearFrom && this.yearTo) {
        this.applyFilter(this.data, 'end');
      }
    }
  }
  /*****************************************************
@purpose : After selecing the Invoice details
@parameters : 
@return :
*****************************************************/
  invoiceSpecific() {
    $('#invoice :input').blur();
    $('#invoicerange :input').blur();

    if (this.filterData.invoice && !this.filterData.invoicerange) {
      this.data['docNumberFrom'] = this.docNumberFrom;

      this.applyFilter(this.data, 'end');
    } else {
      this.data['docNumberFrom'] = this.docNumberFrom;
      this.data['docNumberTo'] = this.docNumberTo;

      this.applyFilter(this.data, 'end');
    }
  }

  /*****************************************************
 @purpose : After selecing the amount details
 @parameters : 
 @return :
 *****************************************************/
  amountSelected() {
    $('#amount :input').blur();
    $('#amountrange :input').blur();
    if (this.filterData.amount && !this.filterData.amountrange) {
      this.data['amountFrom'] = this.amountFrom;

      this.applyFilter(this.data, 'end');
    } else {
      this.data['amountFrom'] = this.amountFrom;
      this.data['amountTo'] = this.amountTo;

      this.applyFilter(this.data, 'end');
    }
  }

  /*****************************************************
@purpose : Main Filter Calling
@parameters : 
@return :
*****************************************************/

  applyFilter(queryParams, terminate?) {
    this.commonService
      .callApi('api/documents', queryParams, 'get')
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.total = success.total;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
    if (terminate) {
      let tempconfig: any = {};
      if (this.filterData.id == 1) {
        console.log('skjdfja', this.filterData);
        console.log('sjdlfjasdfioajsfioioafjas===', this.startDateFrom);
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['secondFilter'] = this.filterData.bindedValue.title;
        tempconfig['childFilter'] = this.startDateFrom;
        tempconfig['subchildrange'] = this.startDateTo;
        tempconfig['selectedObj'] = this.filterData;
        if (this.monthFrom || this.monthTo) {
          tempconfig['childFilter'] = this.monthFrom;
          tempconfig['subchildrange'] = this.monthTo;
          tempconfig['parentFilter'] = 'Month';
        }
        if (this.yearFrom || this.yearTo) {
          tempconfig['childFilter'] = this.yearFrom;
          tempconfig['subchildrange'] = this.yearTo;
          tempconfig['parentFilter'] = 'Year';
        }
        // tempconfig['childFilter'] = this.monthFrom;
        // tempconfig['subchildrange'] = this.monthTo;

        this.fliterflag = false;
        this.tempArr.push(tempconfig);
        console.log('asdjufgks', this.tempArr);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
      } else if (this.filterData.id == 2) {
        tempconfig['parentFilter'] = this.filterData.bindedValue.title;
        tempconfig['childFilter'] = this.docNumberFrom;
        tempconfig['subchildrange'] = this.docNumberTo;
        tempconfig['selectedObj'] = this.filterData;

        this.fliterflag = false;
        this.tempArr.push(tempconfig);
        console.log('asdjufgks', this.tempArr);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.docNumberFrom = '';
        this.docNumberTo = '';
        this.filterstart.splice(0, index + 1);
      } else if (
        this.filterData.id == 3 ||
        this.filterData.id == 4 ||
        this.filterData.id == 5 ||
        this.filterData.id == 6 ||
        this.filterData.id == 8 ||
        this.filterData.id == 9
      ) {
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['childFilter'] = this.filterData.bindedValue.title;
        tempconfig['selectedObj'] = this.filterData;
        this.fliterflag = false;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
      } else if (this.filterData.id == 7) {
        tempconfig['parentFilter'] = this.filterData.bindedValue.title;
        tempconfig['childFilter'] = this.amountFrom;
        tempconfig['subchildrange'] = this.amountTo;
        tempconfig['selectedObj'] = this.filterData;

        this.fliterflag = false;
        this.tempArr.push(tempconfig);
        console.log('asdjufgks', this.tempArr);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.amountFrom = '';
        this.amountTo = '';
        this.filterstart.splice(0, index + 1);
      }
    }
  }
  private loadTypehead() {
    this.clientNameItem = concat(
      of([]),
      this.MainSearchdataSource.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term) => this.getSearchList(term, false)),
        map((response) => {
          return response;
        })
      )
    );
  }
  getSearchList(value: string = null, allow): Observable<any[]> {
    this.supplierLoading = true;
    let data = {};
    if (value) {
      data['entityType'] = 'client';
      data['q'] = value;
    }
    let items;
    return this.commonService
      .callApiObservable('api/clients/lookup', data)
      .pipe(
        catchError(() => of({ items: [] })),
        map((success) => {
          // console.log("asdhfa",success)
          items = success;
          if (allow) {
            this.clientNameItem = success['records'];
          }
          this.supplierLoading = false;
          return items ? items : [];
        })
      );
  }
  /*****************************************************
@purpose : To get categories for filter drop down
@parameters : 
@return :
*****************************************************/
  getCategories() {
    this.commonService
      .callApi('api/inventory/productcategories/lookup?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.categoriesrecords = success;
          // this.user['branch'] = success[0];
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  /*****************************************************
@purpose : To get brands for filter drop down
@parameters : 
@return :
*****************************************************/
  getBrands() {
    this.commonService
      .callApi('api/inventory/brands/lookup?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.brandsrecords = success;
          // this.user['branch'] = success[0];
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  /*****************************************************
@purpose : To get products for filter drop down
@parameters : 
@return :
*****************************************************/
  getProducts() {
    this.commonService
      .callApi('api/inventory/products/lookup?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.productrecords = success;
          // this.user['branch'] = success[0];
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  /*****************************************************
@purpose : Reset the filter drop 
@parameters : 
@return :
*****************************************************/
  resetFilter(i) {
    if (i.selectedObj.id == 4) {
      this.data['businessPartnerId'] = '';
    } else if (i.selectedObj.id == 1) {
      this.data['dateFrom'] = '';
      this.data['dateTo'] = '';
    } else if (i.selectedObj.id == 2) {
      this.data['docNumberFrom'] = '';
      this.data['docNumberTo'] = '';
    } else if (i.selectedObj.id == 3) {
      this.data['businessPartnerId'] = '';
    } else if (i.selectedObj.id == 5) {
      this.data['brandId'] = '';
    } else if (i.selectedObj.id == 6) {
      this.data['productId'] = '';
    } else if (i.selectedObj.id == 7) {
      this.data['amountFrom'] = '';
      this.data['amountTo'] = '';
    } else if (i.selectedObj.id == 8 || i.selectedObj.id == 9) {
      this.data['status'] = '';
    }
    const index1 = this.tempArr
      .map((e) => {
        return e.selectedObj.id;
      })
      .indexOf(i.selectedObj.id);
    this.tempArr.splice(index1, 1);
    setTimeout(() => {
      const newArray = this.refFilter.filter(
        ({ id }) => !this.tempArr.some((x) => x.selectedObj.id == id)
      );
      this.filterstart = [...newArray];
    }, 100);

    // this.tempArr =[];
    // this.filterstart = [...this.refFilter]
    // this.getUser();

    this.applyFilter(this.data);
  }
  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }
  onOpenyearCalendar(container) {
    container.setViewMode('year');
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
  }
}
