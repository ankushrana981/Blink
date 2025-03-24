import {
  Component,
  OnInit,
  Injector,
  TemplateRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { BaseComponent } from '../../../common/commonComponent';
// import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import moment from 'moment';
import { Subject, Observable, of, concat } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')),
  ],
  styles: [],
})
export class TasksComponent extends BaseComponent implements OnInit {
  public icon1: boolean = false;
  listrecords: any = [];
  public ts = this.getTimeStap();
  public offset: any = 0;
  public limit: any = 25;
  total: any;
  public type: string = 'component';
  // public config: PerfectScrollbarConfigInterface = {};
  public page: number = 0;
  public showingPage: number = 0;
  public maxPage: number = 0;
  showAddNewTaskButton: boolean = false;
  typeArray = [
    '',
    'General',
    'Customer',
    'Company',
    'Contact',
    'Task',
    'Undefined',
  ];
  showTaskDetailsDiv: boolean = false;
  taskDetailsData: any;
  clientTasks: any = [];
  clientNotes: any = [];
  tempClientTaskArray: any = [];
  tempClientNotesArray: any = [];
  showTaskShowMore: boolean = true;
  showNotesShowMore: boolean = true;
  task: any = {};
  maxDate = new Date();
  titleArr: any = [];
  tasks = [
    // { type: 1, name: "General", id: 1 },
    { type: 2, name: 'Customer', id: 2 },
    { type: 3, name: 'Company', id: 3 },
    { type: 4, name: 'Contact', id: 4 },
    { type: 5, name: 'Task', id: 5 },
  ];
  clientNameItem: Observable<any>;
  MainSearchdataSource = new Subject<string>();
  supplierLoading: boolean = false;
  addCustomerBasicInfo: FormGroup;
  modalRef: BsModalRef;
  displayStepOne: boolean = false;
  displayStepTwo: boolean = false;
  displayStepThree: boolean = false;
  displayStepFour: boolean = false;
  paymentList: any = [];
  tenantUsers: any = [];
  regionList: any = [];
  establishmentTypes: any = [];
  areaLookup: any = [];
  contactList: any = [];
  companyList: any = [];
  statusArray: any = [
    { id: 1, title: 'Active' },
    { id: 2, title: 'Completed' },
    { id: 3, title: 'Indefinite Hold' },
  ];
  showBlankSideBar: boolean = false;
  fliterflag: boolean = false;
  activateSecondComapanyFilter: boolean = false;
  activateSecondFilter: boolean = false;
  filterData: any = {};
  @ViewChild('filterName') filterName: NgSelectComponent;
  isOpenFilter = false;
  tempArr = [];
  filterstart = [
    {
      id: 1,
      title: 'Date of Entry',
      option: [],
      async: false,
      labelName: 'Date of Entry',
      bindedValue: '',
    },
    {
      id: 2,
      title: 'Due Date',
      option: [],
      async: false,
      labelName: 'Due Date',
      bindedValue: '',
    },
    {
      id: 3,
      title: 'Past Due',
      option: [],
      async: false,
      labelName: 'Past Due',
      bindedValue: '',
    },
    {
      id: 4,
      title: 'Completed',
      option: [],
      async: false,
      labelName: 'Completed',
      bindedValue: '',
    },
    {
      id: 5,
      title: 'Type of task',
      option: [],
      async: false,
      labelName: 'Type of task',
      bindedValue: '',
    },
    {
      id: 6,
      title: 'Note',
      option: [],
      async: false,
      labelName: 'Note',
      bindedValue: '',
    },
    {
      id: 7,
      title: 'Assigned To',
      option: [],
      async: false,
      labelName: 'Assigned To',
      bindedValue: '',
    },
    {
      id: 8,
      title: 'Branch',
      option: [],
      async: false,
      labelName: 'Branch',
      bindedValue: '',
    },
    {
      id: 9,
      title: 'Overdue',
      option: [],
      async: false,
      labelName: 'Overdue',
      bindedValue: '',
    },
  ];
  data: any = {};
  refFilter = [...this.filterstart];
  @ViewChild('secondFilter1') secondFilter: NgSelectComponent;
  @ViewChild('secondFilter1') secondFilter1: ElementRef;
  isOpen = false;
  presetActivities: [];
  customers: Observable<any>;
  companies: Observable<any>;
  contacts: Observable<any>;
  taskrecords: any = [];
  presetActivites: any = [];
  subShowId: number = 0;
  showId: number = 0;
  subClientShowId = 0;
  clientTaskShowId = 0;
  deleteTaskId: number = 0;
  clientShowId: number = 0;
  assignedUsers: any = [];
  branchrecords: any = [];
  isDueDateFilter: boolean = false;
  startDateFrom: any;
  startDateTo: any;
  startDateInput: any;
  endDateInput: any;
  showDummySidebar: boolean = true;
  disableStatusArray: boolean = true;
  isScrollUp: boolean = false;
  businessPartnerId: any = '';
  listApiFilterType: any = '';
  crmNotePopupData: any = {};
  noteDetailBusinessPartnerID: any;
  taskDetailBusinessPartnerID: any;
  crmTaskPopupData: any = {};
  users: any = [];
  addForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  bsConfigCreated_Date: Partial<BsDatepickerConfig>;
  customerNameCreateTask: any = '';
  businessPartnerCreateTask: any;
  isSaveButtonDisabled: boolean = false;
  presetActivity = {};
  assignToData = null;
  createedDate: boolean = false;
  dueDate: boolean = false;
  created_Date: any = new Date();
  due_date: any = new Date();
  public scrollbarOptionsFilterMenu = {
    axis: 'x',
    theme: 'light',
    scrollbarPosition: 'inside',
    advanced: { autoExpandHorizontalScroll: true },
    autoHideScrollbar: false,
    callbacks: {
      onTotalScrollOffset: 1000,
    },
  };
  isSingledOut: boolean = false;
  singledOutUserID: number = 0;
  clientList: any = [];
  accessLevel: any;
  taskDataObj: any;
  addQuickModal(quickcustomer: TemplateRef<any>) {
    this.modalRef = this.modalService.show(quickcustomer, {
      class: 'modal-xl task-modal modal-dialog-centered quick-popup',
    });
  }
  constructor(
    inj: Injector,
    public override modalService: BsModalService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {
    super(inj);
    this.route.params.subscribe((params) => {
      if (params['businessPartnerId']) {
        this.businessPartnerId = params['businessPartnerId'];
        this.listApiFilterType = params['type'];
      }
    });
  }

  ngOnInit() {
    this.loadTypehead();
    this.listApi();
    this.presetTitle();
    this.setAddCustomerBasicForm();
    this.getContactList();
    this.getCompanytList();
    this.getPaymentTerms();
    this.getTenantLookup();
    this.getArearLookup();
    this.getRegionList();
    this.getEstablishmentType();
    this.loadTypeheadCustomers();
    this.loadTypeheadCompanies();
    this.loadTypeheadContacts();
    this.getPresetActivities();
    this.taskdropdown();
    this.getAssignedUserList();
    this.getBranches();
    this.refreshUsers();
    this.getClientNames();
    let vm = this;
    // $(".scrollbar").mCustomScrollbar({
    //   callbacks: {
    //     onScrollStart: function() {},
    //     onTotalScroll: () => {
    //       this.isScrollUp = false;
    //       this.onScrollDown(this);
    //     },
    //     onTotalScrollBack: () => {
    //       this.isScrollUp = true;
    //       this.onScrollUp(this);
    //     },
    //     onTotalScrollBackOffset: 300,
    //     onTotalScrollOffset: 300,
    //     alwaysTriggerOffsets: false,
    //   },
    // });
  }
  listApi(alreadyCalled?) {
    if (!alreadyCalled) {
      this.tempArr.push({
        parentFilter: 'Overdue',
        secondFilter: '',
        selectedObj: this.filterstart.filter((X) => X.id === 9)[0],
      });
      this.filterstart = this.filterstart.filter((X) => X.id != 9);
    }
    var queryParams =
      'ts=' +
      this.ts +
      '&offset=' +
      this.offset +
      '&limit=' +
      this.limit +
      '&isShowCreatedDate=true&excludeGeneralTasks=true';
    if (this.businessPartnerId && this.businessPartnerId !== '') {
      queryParams =
        queryParams +
        '&businessPartnerId=' +
        this.businessPartnerId +
        '&type=' +
        this.listApiFilterType;
    }
    this.data['isShowCreatedDate'] = true;
    this.data['excludeGeneralTasks'] = true;
    this.commonService
      .callApi('api/clients/tasks?' + queryParams, '', 'get')
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.listrecords.forEach((obj) => {
            this.calculateProgressInPercentage(obj);
          });
          this.total = success.total;
          this.maxPage = Math.floor(success.total / this.limit);
          setTimeout(() => {
            this.showAddNewTaskButton = true;
          }, 1000);
          setTimeout(() => {
            if (this.listrecords.length > 0) {
              this.showAddNewTaskButton = true;
              var ele = document.getElementById(
                `th-table-descp`
              ) as HTMLElement;
              var mainWidth = ele.offsetWidth;
              this.setProperWidth(mainWidth);
            }
          }, 100);
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  onOpenCalendar(event: any) {}
  onOpenyearCalendar(event: any) {}
  setProperWidth(width) {
    setTimeout(() => {
      if (this.listrecords.length > 0) {
        this.listrecords.map((record: any) => {
          var ele = document.getElementById(
            `table-text-${record.id}`
          ) as HTMLElement;
          var ele1 = document.getElementById(
            `table-text1-${record.id}`
          ) as HTMLElement;
          var ele2 = document.getElementById(
            `taskcrm-description-h`
          ) as HTMLElement;
          ele.style.width = String(width - 40) + 'px !important';
          ele1.style.width = String(width) + 'px !important';
          ele1.style.minWidth = String(width) + 'px !important';
          ele2.style.width = String(width) + 'px !important';
        });
      }
    }, 100);
  }
  onScrollEvent(event: any): void {}
  onScrollUp(ev) {
    if (
      this.showingPage != undefined &&
      this.showingPage != null &&
      this.showingPage != 0
    ) {
      if (this.showingPage < this.maxPage) {
        this.showingPage--;
        this.offset = this.showingPage * this.limit;
        this.listApi();
      }
    }
  }
  calculateProgressInPercentage(value) {
    if (
      value.subTaskList != undefined &&
      value.subTaskList != null &&
      value.subTaskList.length > 0
    ) {
      var totalsubTaskLength = value.subTaskList.length;
      var totalsubTaskLengthWithoutAddedStatus = value.subTaskList.filter(
        (i) => i.status != 1
      ).length;
      var getAddedTask = value.subTaskList.filter((i) => i.status == 1);
      var getInprogressTask = value.subTaskList.filter((i) => i.status == 2);
      var getInprogressValue = 0;
      if (
        getInprogressTask != undefined &&
        getInprogressTask != null &&
        getInprogressTask.length > 0
      ) {
        getInprogressValue = getInprogressTask.length * Math.round(33.33);
      }
      var getQueryTask = value.subTaskList.filter((i) => i.status == 3);
      var getQueryValue = 0;
      if (
        getQueryTask != undefined &&
        getQueryTask != null &&
        getQueryTask.length > 0
      ) {
        getQueryValue = getQueryTask.length * Math.round(66.66);
      }
      var getCompletedTask = value.subTaskList.filter((i) => i.status == 4);
      var getCompletedValue = 0;
      if (
        getCompletedTask != undefined &&
        getCompletedTask != null &&
        getCompletedTask.length > 0
      ) {
        getCompletedValue = getCompletedTask.length * 100;
      }

      if (getInprogressValue + getQueryValue + getCompletedValue > 0) {
        var GetSumValues =
          (getInprogressValue + getQueryValue + getCompletedValue) /
          totalsubTaskLength;
        value.InProgressPercentage = Math.round(GetSumValues);
      } else {
        value.InProgressPercentage = 0;
      }

      value.progressStatusText = 'Not Started';
      if (value.InProgressPercentage > 0 && value.InProgressPercentage < 100) {
        value.progressStatusText = 'In Progress';
      } else {
        if (value.InProgressPercentage == 0) {
          value.progressStatusText = 'Not Started';
        } else if (value.InProgressPercentage == 100) {
          value.progressStatusText = 'Completed';
        }
      }
    } else {
      if (value.type === 1) {
        value.InProgressPercentage = 0;
      } else {
        value.InProgressPercentage = '-';
      }
      value.progressStatusText = 'Not Started';
    }
  }

  onScroll(event: any) {
    const target = event.target;
    const atBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight;
    console.log('bottom');
    if (atBottom) {
      this.onScrollDown(event);
      // console.log(
      //   'scrollTop',
      //   target.scrollTop,
      //   'clientHeight',
      //   target.clientHeight,
      //   'scrollHeight ',
      //   target.scrollHeight
      // );
    }
  }

  onScrollDown(ev) {
    if (this.page < this.maxPage) {
      this.page++;
      this.offset = this.page * this.limit;
      var queryParams =
        'ts=' +
        this.ts +
        '&offset=' +
        this.offset +
        '&limit=' +
        this.limit +
        '&isShowCreatedDate=true&excludeGeneralTasks=true';
      this.commonService
        .callApi('api/clients/tasks?' + queryParams, '', 'get')
        .then((success) => {
          if (success) {
            if (success.records.length > 0) {
              success.records.map((record: any) => {
                this.calculateProgressInPercentage(record);
                this.listrecords.push(record);
              });
            }
            this.total = success.total;
            this.maxPage = Math.floor(success.total / this.limit);
            setTimeout(() => {
              if (this.listrecords.length > 0) {
                this.showAddNewTaskButton = true;
                var ele = document.getElementById(
                  `th-table-descp`
                ) as HTMLElement;
                var mainWidth = ele.offsetWidth;
                this.setProperWidth(mainWidth);
              }
            }, 1000);
          } else {
            this.popToast('error', success.message);
          }
        })
        .catch((e) => {
          console.log('there is an error:', e);
        });
    }
  }
  showTaskDetails(data) {
    if (this.showTaskDetailsDiv === true) {
      this.changeIc('');
    } else if (this.showTaskDetailsDiv === false) {
      this.taskDetailsData = {};
      this.clientTasks = [];
      this.tempClientTaskArray = [];
      this.clientNotes = [];
      this.tempClientNotesArray = [];
      if (data.businessPartner !== null) {
        this.noteDetailBusinessPartnerID = data.businessPartner.id;
        this.taskDetailBusinessPartnerID = data.businessPartner.id;
        this.getClientTasksDetails(data.businessPartner.id);
        this.getClientNotesDetails(data.businessPartner.id);
      }
      this.taskDetailsData = data;
      setTimeout(() => {
        this.changeIc('details');
      }, 100);
    }
  }
  getClientTasksDetails(clientID) {
    this.commonService
      .callApi(
        'api/clients/tasks?BusinessPartnerId=' + clientID + '&type=2',
        '',
        'get'
      )
      .then((success) => {
        if (success) {
          success.records.map((record: any, index: number) => {
            if (index <= 2) {
              this.clientTasks.push(record);
            }
          });
          this.tempClientTaskArray = success.records;
          if (this.tempClientTaskArray.length > 3) {
            this.showTaskShowMore = true;
          }
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  showMoreTasks() {
    this.clientTasks = [];
    this.clientTasks = this.tempClientTaskArray;
    this.showTaskShowMore = false;
  }
  showLessTasks() {
    this.clientTasks = [];
    this.clientTasks = [this.tempClientTaskArray[0]];
    this.showTaskShowMore = true;
  }
  getClientNotesDetails(clientID) {
    this.commonService
      .callApi(
        'api/clients/notes?BusinessPartnerId=' + clientID + '&type=2',
        '',
        'get'
      )
      .then((success) => {
        if (success) {
          success.records.map((record: any, index: number) => {
            if (index <= 2) {
              this.clientNotes.push(record);
            }
          });
          this.tempClientNotesArray = success.records;
          if (this.tempClientNotesArray.length > 3) {
            this.showNotesShowMore = true;
          }
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  showMoreNotes() {
    this.clientNotes = [];
    this.clientNotes = this.tempClientNotesArray;
    this.showNotesShowMore = false;
  }
  showLessNotes() {
    this.clientNotes = [];
    this.clientNotes = [this.tempClientNotesArray[0]];
    this.showNotesShowMore = true;
  }
  changeIc(type) {
    if (type == 'dots') {
      this.icon1 = true;
      this.task = {};
      this.task['dateOfEntry'] = this.maxDate;
      this.task['status'] = 1;
      this.showTaskDetailsDiv = false;
      this.showBlankSideBar = false;
      this.showDummySidebar = false;
      this.disableStatusArray = true;
    } else if (type == 'edit') {
      this.icon1 = true;
      this.showTaskDetailsDiv = false;
      this.showBlankSideBar = false;
      this.showDummySidebar = false;
      this.disableStatusArray = false;
    } else if (type == 'details') {
      this.icon1 = true;
      this.showTaskDetailsDiv = true;
      this.showBlankSideBar = false;
      this.showDummySidebar = false;
    } else if (type == 'default') {
      this.icon1 = true;
      this.showTaskDetailsDiv = false;
      this.showBlankSideBar = true;
      this.showDummySidebar = false;
    } else {
      this.showBlankSideBar = false;
      this.showTaskDetailsDiv = false;
      this.icon1 = false;
      this.task = {};
      this.showDummySidebar = true;
    }
    setTimeout(() => {
      this.setWidths();
    }, 1000);
  }
  setWidths() {
    setTimeout(() => {
      if (this.listrecords.length > 0) {
        this.showAddNewTaskButton = true;
        var ele = document.getElementById(`th-table-descp`) as HTMLElement;
        var mainWidth = ele.offsetWidth;
        this.setProperWidth(mainWidth);
      }
    }, 100);
  }
  presetTitle() {
    this.commonService
      .callApi('api/tenants/presetactivities/lookup', '', 'get')
      .then((success) => {
        if (success) {
          this.titleArr = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  ModelDatepicker(event) {}
  recordSelected(event, addCustomerPopup?) {
    if (event.id === 0) {
      this.setAddCustomerBasicForm();
      this.displayStepOne = true;
      this.displayStepTwo = false;
      this.displayStepThree = false;
      this.displayStepFour = false;
      this.modalRef = this.modalService.show(addCustomerPopup, {
        class:
          'modal-xl task-modal modal-dialog-centered quick-popup add-new-customer-popup',
      });
    } else {
      $('#taskname :input').blur();
    }
  }
  private loadTypehead() {
    // startWith(this.user.serachSupplier),
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
          items = success;
          if (allow) {
            this.clientNameItem = success['records'];
          }
          if (items.length === 0) {
            items.push({ title: 'Add new ?', id: 0 });
          }
          this.supplierLoading = false;
          return items ? items : [];
        })
      );
  }
  setAddCustomerBasicForm() {
    this.addCustomerBasicInfo = new FormGroup({
      title: new FormControl('', [Validators.required]),
      address1: new FormControl('', []),
      address2: new FormControl('', []),
      city: new FormControl('', []),
      state: new FormControl('', []),
      country: new FormControl('', []),
      zip: new FormControl('', []),
      email: new FormControl('', []),
      faceBook: new FormControl('', []),
      instaGram: new FormControl('', []),
      google: new FormControl('', []),
      tiktok: new FormControl('', []),
      webSite: new FormControl('', []),
      contactPerson: new FormControl('', []),
      company: new FormControl('', []),
      internalNotes: new FormControl('', []),
      externalNotes: new FormControl('', []),
      paymentTermDuration: new FormControl('', []),
      allowedCreditAmount: new FormControl('', []),
      salesRepresentative: new FormControl('', []),
      area: new FormControl('', []),
      branch: new FormControl('', []),
      establishmentType: new FormControl('', []),
    });
  }
  addBasicInfo() {
    if (this.addCustomerBasicInfo.valid) {
      if (this.addCustomerBasicInfo.value.paymentTermDuration) {
        this.addCustomerBasicInfo.value.paymentTermDuration =
          this.addCustomerBasicInfo.value.paymentTermDuration.days;
      }
      this.commonService
        .callApi('/api/clients', this.addCustomerBasicInfo.value, 'post')
        .then((success) => {
          if (success) {
            this.modalRef.hide();
            this.task.businessPartner = success.title;
          } else {
            this.popToast('error', success.message);
          }
        })
        .catch((e) => {
          console.log('there is an error:', e);
        });
    }
  }
  showStepOne() {
    this.displayStepOne = true;
    this.displayStepTwo = false;
    this.displayStepThree = false;
    this.displayStepFour = false;
  }
  showStepTwo() {
    this.displayStepOne = false;
    this.displayStepTwo = true;
    this.displayStepThree = false;
    this.displayStepFour = false;
  }
  showStepThree() {
    this.displayStepOne = false;
    this.displayStepTwo = false;
    this.displayStepThree = true;
    this.displayStepFour = false;
  }
  showStepFour() {
    this.displayStepOne = false;
    this.displayStepTwo = false;
    this.displayStepThree = false;
    this.displayStepFour = true;
  }
  getPaymentTerms() {
    this.commonService
      .callApi('api/clients/PaymentTerms/lookup', '', 'get')
      .then((success) => {
        if (success) {
          this.paymentList = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  getTenantLookup() {
    this.commonService
      .callApi('api/tenants/users/lookup', '', 'get')
      .then((success) => {
        if (success) {
          this.tenantUsers = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  getArearLookup() {
    this.commonService
      .callApi('api/clients/areas/lookup', '', 'get')
      .then((success) => {
        if (success) {
          this.areaLookup = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  getRegionList() {
    this.commonService
      .callApi('api/tenants/branches/lookup', '', 'get')
      .then((success) => {
        if (success) {
          this.regionList = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  getEstablishmentType() {
    this.commonService
      .callApi('api/clients/establishmenttypes/lookup', '', 'get')
      .then((success) => {
        if (success) {
          this.establishmentTypes = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  getContactList() {
    this.commonService
      .callApi('api/clients/lookup?clientType=2', '', 'get')
      .then((success) => {
        if (success) {
          this.contactList = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  getCompanytList() {
    this.commonService
      .callApi('api/clients/lookup?clientType=3', '', 'get')
      .then((success) => {
        if (success) {
          this.companyList = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  createThisTask(data) {
    if (!data.dueDate) {
      data.dueDate = data.dateOfEntry;
    }
    this.commonService
      .callApi('api/clients/tasks', data, 'post')
      .then((success) => {
        if (success) {
          this.icon1 = false;
          this.listApi(true);
          this.changeIc('');
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  updatedTask(data) {
    this.commonService
      .callApi('api/clients/tasks/' + data.id, data, 'put')
      .then((success) => {
        if (success) {
          this.icon1 = false;
          this.offset = 0;
          this.listApi(true);
          this.changeIc('');
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  startingFilter() {
    if (this.fliterflag == true) {
      this.fliterflag = false;
      this.activateSecondComapanyFilter = false;
      this.activateSecondFilter = false;
      this.filterData = {};
    } else {
      this.fliterflag = true;
      setTimeout(() => {
        // this.filterName.filterInput.nativeElement.focus();
        this.isOpenFilter = true;
      });
    }
  }
  changedParentFilter(event) {
    $('#filterName :input').blur();
    let options;
    if (event.id == 1) {
      this.filterData.suboptions = [];
      this.filterData.date = true;
      this.filterData.enddate = true;
      this.isDueDateFilter = false;
    } else if (event.id == 2) {
      this.filterData.suboptions = [];
      this.filterData.date = true;
      this.filterData.enddate = false;
      this.isDueDateFilter = true;
    } else if (event.id == 3) {
      this.data['pastDue'] = true;
      this.applyFilter(this.data, 'end');
    } else if (event.id == 4) {
      this.data['completed'] = true;
      this.applyFilter(this.data, 'end');
    } else if (event.id == 5) {
      if (this.tasks.length > 0) {
        this.tasks.map((task: any) => {
          task.title = task.name;
        });
      }
      this.filterData.bindedValue = null;
      options = [...this.tasks];
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          // this.secondFilter.filterInput.nativeElement.focus();
          this.isOpen = true;
        });
      }
    } else if (event.id == 6) {
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          $('#txtNotes').focus();
        }, 100);
      }
    } else if (event.id == 7) {
      this.filterData.bindedValue = null;
      options = [...this.assignedUsers];
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          // this.secondFilter.filterInput.nativeElement.focus();
          this.isOpen = true;
        });
      }
    } else if (event.id == 8) {
      this.filterData.bindedValue = null;
      options = [...this.branchrecords];
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          // this.secondFilter.filterInput.nativeElement.focus();
          this.isOpen = true;
        });
      }
    } else if (event.id == 9) {
      this.data['isShowCreatedDate'] = true;
      this.applyFilter(this.data, 'end');
    }
    this.filterstart.forEach((obj) => {
      if (obj.id == event.id) {
        obj.option = options;
      } else {
        obj.option = [];
      }
    });
  }
  changedChildFilter(event) {
    $('#secondFilter :input').blur();
    $('#supplierName :input').blur();
    if (this.filterData.id === 5) {
      this.filterData.suboptions = [];
      if (this.filterData.bindedValue.id === 1) {
        this.filterData.suboptions.push({
          options: this.presetActivites,
          bindvalue: '',
          async: false,
          type: 'select',
          labelName: 'Search Title',
        });
      } else if (this.filterData.bindedValue.id === 2) {
        this.filterData.suboptions.push({
          options: this.customers,
          bindvalue: '',
          async: true,
          type: 'select',
          labelName: 'Search Customer',
        });
      } else if (this.filterData.bindedValue.id === 3) {
        this.filterData.suboptions.push({
          options: this.companies,
          async: true,
          bindvalue: '',
          type: 'select',
          labelName: 'Search Company',
        });
      } else if (this.filterData.bindedValue.id === 4) {
        this.filterData.suboptions.push({
          options: this.contacts,
          async: true,
          bindvalue: '',
          type: 'select',
          labelName: 'Search Contact',
        });
      } else if (this.filterData.bindedValue.id === 5) {
        this.filterData.suboptions.push({
          options: this.taskrecords,
          bindvalue: '',
          async: false,
          type: 'select',
          labelName: 'Search Tasks',
        });
      }
    } else if (this.filterData.id === 6) {
      if (this.filterData.note != undefined && this.filterData.note != '') {
        this.data['note'] = this.filterData.note;
        this.applyFilter(this.data, 'end');
      }
    } else if (this.filterData.id === 7) {
      this.data['assignedTo'] = this.filterData.bindedValue.id;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 8) {
      this.data['branchId'] = this.filterData.bindedValue.id;
      this.applyFilter(this.data, 'end');
    }
  }
  applyFilter(queryParams, terminate?) {
    this.showingPage = 0;
    this.page = 0;
    this.offset = 0;
    var queryParams1 =
      'ts=' + this.ts + '&offset=' + this.offset + '&limit=' + this.limit;
    this.commonService
      .callApi('api/clients/tasks?' + queryParams1, queryParams, 'get')
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.listrecords.forEach((obj) => {
            this.calculateProgressInPercentage(obj);
          });
          this.maxPage = Math.floor(success.total / this.limit);
          this.total = success.total;
          setTimeout(() => {
            if (this.listrecords.length > 0) {
              this.showAddNewTaskButton = true;
              var ele = document.getElementById(
                `th-table-descp`
              ) as HTMLElement;
              var mainWidth = ele.offsetWidth;
              this.setProperWidth(mainWidth);
            }
          }, 100);
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
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['childFilter'] = this.startDateInput;
        tempconfig['subchildrange'] = this.startDateTo;
        tempconfig['selectedObj'] = this.filterData;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];
      } else if (this.filterData.id === 2) {
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['secondFilter'] = moment(this.startDateInput).format(
          'DD-MM-YYYY'
        );
        tempconfig['selectedObj'] = this.filterData;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];
      } else if (this.filterData.id === 3) {
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['secondFilter'] = 'true';
        tempconfig['selectedObj'] = this.filterData;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];
      } else if (this.filterData.id === 4) {
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['secondFilter'] = 'true';
        tempconfig['selectedObj'] = this.filterData;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];
      } else if (this.filterData.id == 5) {
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['secondFilter'] = this.filterData.bindedValue.title;
        tempconfig['selectedObj'] = this.filterData;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];
      } else if (this.filterData.id == 6) {
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['secondFilter'] = this.filterData.note;
        tempconfig['selectedObj'] = this.filterData;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];
      } else if (this.filterData.id == 7) {
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['secondFilter'] = this.filterData.bindedValue.title;
        tempconfig['selectedObj'] = this.filterData;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];
      } else if (this.filterData.id == 8) {
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['secondFilter'] = this.filterData.bindedValue.title;
        tempconfig['selectedObj'] = this.filterData;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];
      } else if (this.filterData.id == 9) {
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['secondFilter'] = 'True';
        tempconfig['selectedObj'] = this.filterData;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);
        this.filterData = {};
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];
      }
      setTimeout(() => {
        const newArray = this.refFilter.filter(
          ({ id }) => !this.tempArr.some((x) => x.selectedObj.id == id)
        );
        this.filterstart = [...newArray];
      }, 100);
    }
  }
  loadTypeheadCustomers() {
    this.customers = concat(
      of([]),
      this.MainSearchdataSource.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term) => this.refreshClients(term, false)),
        map((response) => {
          return response;
        })
      )
    );
  }
  loadTypeheadCompanies() {
    this.companies = concat(
      of([]),
      this.MainSearchdataSource.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term) => this.refreshCompanies(term, false)),
        map((response) => {
          return response;
        })
      )
    );
  }
  loadTypeheadContacts() {
    this.contacts = concat(
      of([]),
      this.MainSearchdataSource.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term) => this.refreshContacts(term, false)),
        map((response) => {
          return response;
        })
      )
    );
  }
  refreshClients(value: string = null, allow): Observable<any[]> {
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
          items = success;
          if (allow) {
            this.customers = success['records'];
          }

          return items ? items : [];
        })
      );
  }
  refreshCompanies(value: string = null, allow): Observable<any[]> {
    let data = {};
    if (value) {
      data['entityType'] = 'client';
      data['ClientType'] = '3';
      data['q'] = value;
    }
    let items;
    return this.commonService
      .callApiObservable('api/clients/lookup', data)
      .pipe(
        catchError(() => of({ items: [] })),
        map((success) => {
          items = success;
          if (allow) {
            this.companies = success['records'];
          }

          return items ? items : [];
        })
      );
  }
  refreshContacts(value: string = null, allow): Observable<any[]> {
    let data = {};
    if (value) {
      data['entityType'] = 'client';
      data['ClientType'] = '2';
      data['q'] = value;
    }
    let items;
    return this.commonService
      .callApiObservable('api/clients/lookup', data)
      .pipe(
        catchError(() => of({ items: [] })),
        map((success) => {
          items = success;
          if (allow) {
            this.contacts = success['records'];
          }

          return items ? items : [];
        })
      );
  }
  changedsubChildFilter(event) {
    if (this.filterData.id === 5 && this.filterData.bindedValue.type !== 5) {
      if (this.filterData.bindedValue.type === 1) {
        this.data['type'] = this.filterData.bindedValue.id;
        this.data['presetActivityId'] = event.id;
      } else {
        this.data['type'] = this.filterData.bindedValue.id;
        this.data['businessPartnerId'] = event.id;
      }
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.bindedValue.type === 5) {
      this.data['type'] = 3;
      this.data['taskId'] = event.id;
      this.applyFilter(this.data, 'end');
    }
  }
  getPresetActivities() {
    this.commonService
      .callApi('api/tenants/presetactivities/lookup', '', 'get')
      .then((success) => {
        if (success) {
          this.presetActivites = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  taskdropdown() {
    var queryParams1 = 'includeActiveTasksForCurrentUser=' + true + '&q=';
    this.commonService
      .callApi('api/clients/tasks/lookup?' + queryParams1, '', 'get')
      .then((success) => {
        if (success) {
          this.taskrecords = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  subDropdownClose() {
    this.subShowId = 0;
  }
  dropdownClick(id) {
    this.showId = this.showId == 0 ? id : 0;
  }
  dropdownClose() {
    this.showId = 0;
  }
  editThisRecord(data) {
    this.task = {};
    this.task = data;
    this.task.dateOfEntry = moment.utc(data.dateOfEntry).format();
    this.task.presetActivity = data.presetActivity;
    this.changeIc('edit');
  }
  subClientDropdownClose() {
    this.subClientShowId = 0;
    this.clientTaskShowId = 0;
  }
  setDeleteID(taskId) {
    this.deleteTaskId = taskId;
  }
  unsetDeleteId() {
    this.deleteTaskId = 0;
  }
  openDeletePopup(deleteTaskPopup: TemplateRef<any>) {
    this.modalRef = this.modalService.show(deleteTaskPopup, {
      class: 'modal-dialog-centered quick-popup delete-popup',
    });
  }
  deleteThisTask() {
    this.commonService
      .callApi('api/clients/tasks/' + this.deleteTaskId, '', 'delete')
      .then((success) => {
        if (this.total <= this.offset) {
          this.offset = 0;
          this.listApi(true);
        } else {
          this.offset = 0;
          this.listApi(true);
        }
        if (success) {
          this.deleteTaskId = 0;
          this.popToast('success', 'Task deleted');
        } else {
          this.deleteTaskId = 0;
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  clientDropdownClick(id, taskID) {
    this.clientShowId = id;
    this.clientTaskShowId = taskID;
  }
  getAssignedUserList() {
    this.commonService
      .callApi('api/clients/tasks/assignTask/userList', '', 'get')
      .then((success) => {
        if (success) {
          this.assignedUsers = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  getBranches() {
    this.commonService
      .callApi('api/tenants/branches/lookup?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.branchrecords = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  resetFilter(i) {
    if (i.selectedObj.id == 1) {
      delete this.data.createdOnType;
      delete this.data.createdOnAfter;
      delete this.data.createdOnBefore;
      delete this.data.createdOn;
      this.filterData.date = false;
      this.filterData.enddate = false;
    } else if (i.selectedObj.id == 2) {
      delete this.data.type;
    } else if (i.selectedObj.id == 3) {
      delete this.data.pastDue;
    } else if (i.selectedObj.id == 4) {
      delete this.data.completed;
    } else if (i.selectedObj.id == 5) {
      delete this.data.type;
      delete this.data.presetActivityId;
      delete this.data.businessPartnerId;
      delete this.data.taskId;
    } else if (i.selectedObj.id == 6) {
      delete this.data.note;
    } else if (i.selectedObj.id == 7) {
      delete this.data.assignedTo;
    } else if (i.selectedObj.id == 8) {
      delete this.data.branchId;
    } else if (i.selectedObj.id == 9) {
      delete this.data.isShowCreatedDate;
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

    this.applyFilter(this.data);
  }
  modelDatepickerDate(event, type) {
    if (event !== null) {
      $('#minDatepicker :input').blur();
      $('#maxDatepicker :input').blur();
      if (this.filterData.id == 1) {
        if (type === 'start') {
          this.startDateFrom = moment.utc(event).format();
        } else if (type === 'end') {
          this.startDateTo = moment.utc(event).format();
          this.endDateInput = event;
        }
        this.data['createdOnType'] = 1;
        this.data['createdOnAfter'] = this.startDateFrom;
        this.data['createdOnBefore'] = this.startDateTo;
        if (this.startDateFrom && this.startDateTo) {
          this.applyFilter(this.data, 'end');
        }
      } else if (this.filterData.id == 2) {
        this.startDateFrom = moment.utc(event).format();
        this.data['dueDateType'] = 0;
        this.data['dueDate'] = this.startDateFrom;
        this.startDateInput = event;
        this.applyFilter(this.data, 'end');
      }
    }
  }
  showNotesDetails(data, crmNotePopup) {
    this.commonService
      .callApi('api/clients/notes/' + data.id, '', 'get')
      .then((success) => {
        if (success) {
          this.crmNotePopupData = success;
          this.modalRef = this.modalService.show(crmNotePopup, {
            class: 'modal-xl modal-dialog-centered crm-popup',
          });
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  resetCRMNotesData() {
    this.crmNotePopupData = {};
  }
  redirectToNotes(clientID) {
    this.router.navigateByUrl(`/main/crm/notes/${clientID}/2`);
  }
  showTaskDetailsPopup(data, crmTaskPopup) {
    this.commonService
      .callApi('api/clients/tasks/' + data.id, '', 'get')
      .then((success) => {
        if (success) {
          this.crmTaskPopupData = success;
          this.modalRef = this.modalService.show(crmTaskPopup, {
            class: 'modal-xl modal-dialog-centered crm-popup',
          });
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  resetCRMTaskData() {
    this.crmTaskPopupData = {};
  }
  singleOutClient(clientID) {
    this.offset = 0;
    var queryParams =
      'ts=' +
      this.ts +
      '&offset=' +
      this.offset +
      '&limit=' +
      this.limit +
      '&businessPartnerId=' +
      clientID +
      '&type=2';
    this.commonService
      .callApi('api/clients/tasks?' + queryParams, '', 'get')
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.listrecords.forEach((obj) => {
            this.calculateProgressInPercentage(obj);
          });
          this.total = success.total;
          this.maxPage = Math.floor(success.total / this.limit);
          setTimeout(() => {
            this.changeIc('');
          }, 500);
          this.isSingledOut = true;
          this.singledOutUserID = clientID;
        } else {
          this.isSingledOut = false;
          this.singledOutUserID = 0;
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  deSingleClient() {
    this.isSingledOut = false;
    this.singledOutUserID = 0;
    this.offset = 0;
    this.listApi(true);
  }
  createTaskModal(createTask: TemplateRef<any>, customerName, businessPartner) {
    this.refreshUsers();
    this.addForm = new FormGroup({
      dateOfEntry: new FormControl('', [Validators.required]),
      dueDate: new FormControl(),
      title: new FormControl(null, [Validators.required]),
      subTitle: new FormControl(),
      note: new FormControl(),
      user: new FormControl(),
      associatedUserIds: new FormControl(),
      selectedSubListTaskVal: new FormControl(),
      dueDateTemp: new FormControl(),
      dateOfEntryTemp: new FormControl(),
    });
    this.addForm
      .get('dateOfEntry')
      .setValue(this.datePipe.transform(new Date(), 'MMM d, y'));
    this.addForm
      .get('dateOfEntryTemp')
      .setValue(this.datePipe.transform(new Date(), 'MMM d, y'));
    this.bsConfig = Object.assign(
      {},
      {
        containerClass: 'custom-picker theme-white theme-green',
        adaptivePosition: true,
        dateInputFormat: 'MM DD,YYYY',
      }
    );
    this.bsConfigCreated_Date = Object.assign(
      {},
      {
        containerClass: 'custom-picker theme-white theme-green',
        adaptivePosition: true,
        dateInputFormat: 'MM DD,YYYY',
      }
    );
    this.customerNameCreateTask = customerName;
    this.businessPartnerCreateTask = businessPartner;
    this.modalRef = this.modalService.show(createTask, {
      class: 'modal-lg modal-dialog-centered quick-task-modal',
    });
  }
  refreshUsers() {
    this.commonService
      .callApi('api/clients/tasks/getAssignedUsers?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.users = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  submitAddForm() {
    this.isSaveButtonDisabled = true;
    this.addForm.value.type = 2;
    var addTask = {
      dateOfEntry: this.addForm.value['dateOfEntryTemp'],
      dueDate: this.addForm.value['dueDateTemp'],
      type: this.addForm.value['type'],
      board: this.addForm.value['boardName'],
      subTitle: this.addForm.value['subTitle'],
      note: this.addForm.value['note'],
      status: '1',
    };
    addTask['businessPartner'] = this.businessPartnerCreateTask;
    addTask['presetActivity'] = this.presetActivity;
    let associatedUserIds = this.addForm.value['associatedUserIds'];
    if (
      associatedUserIds != null &&
      associatedUserIds != '' &&
      associatedUserIds.length > 0
    ) {
      addTask['associatedUserIds'] = associatedUserIds.toString();
    }
    let user = this.addForm.value['user'];
    if (user != null && user != '') {
      addTask['user'] = this.assignToData;
    }
    this.commonService
      .callApi('api/clients/tasks', addTask, 'post')
      .then((success) => {
        this.isSaveButtonDisabled = false;
        if (success) {
          this.modalRef.hide();
          this.listApi();
          this.businessPartnerCreateTask = {};
          this.customerNameCreateTask = '';
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        this.isSaveButtonDisabled = false;
      });
  }
  createdDateClick() {
    this.createedDate = true;
  }
  dueDateClick() {
    this.dueDate = true;
  }
  createdDateClose() {
    this.createedDate = false;
  }
  dueDateClose() {
    this.dueDate = false;
  }
  onChangepresetActivity(e) {
    this.presetActivity = e;
    if (e.dueDays != null && e.dueDays != undefined && e.dueDays != '') {
      this.due_date = new Date();
      var pastDate = this.due_date.getDate() + e.dueDays;
      this.due_date.setDate(pastDate);
      this.addForm
        .get('dueDate')
        .setValue(this.datePipe.transform(this.due_date, 'MMM d, y'));
      this.addForm.get('dueDateTemp').setValue(this.due_date);
    }
  }
  changeAssignTo(e) {
    this.assignToData = e;
  }
  createdDateValueChange(e, bsConfig) {
    if (!bsConfig.adaptivePosition) {
      this.addForm
        .get('dateOfEntry')
        .setValue(this.datePipe.transform(e, 'MMM d, y'));
      this.addForm.get('dateOfEntryTemp').setValue(e);
      this.createedDate = false;
      this.created_Date = e;
      bsConfig.adaptivePosition = true;
      event.stopPropagation();
    } else {
      bsConfig.adaptivePosition = undefined;
      event.stopPropagation();
    }
  }
  dueDateValueChange(e, bsConfig) {
    if (!bsConfig.adaptivePosition) {
      this.addForm
        .get('dueDate')
        .setValue(this.datePipe.transform(e, 'MMM d, y'));
      this.addForm.get('dueDateTemp').setValue(e);
      this.dueDate = false;
      this.due_date = e;
      bsConfig.adaptivePosition = true;
      event.stopPropagation();
    } else {
      bsConfig.adaptivePosition = undefined;
      event.stopPropagation();
    }
  }
  getClientNames() {
    this.commonService
      .callApi('api/clients/lookup?entityType=client', '', 'get')
      .then((success) => {
        if (success) {
          if (success) {
            this.clientList = success;
          }
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
}
