import {
  Component,
  OnInit,
  Injector,
  TemplateRef,
  ViewChild,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
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
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef } from 'ngx-bootstrap/modal';

import * as jQuery from 'jquery';
import { ModalDemoComponent } from '../../../reusable/draggable-popup/draggable-popup.component';
import moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')),
  ],
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;
  modalRef: BsModalRef;
  openchatbox: boolean = false;
  selectedTab: number = 0;
  @ViewChild(ModalDemoComponent) child;
  public scrollbarXOptions = {
    axis: 'x',
    theme: 'light',
    scrollbarPosition: 'inside',
    contentTouchScroll: true,
    autoHideScrollbar: true,
    callbacks: {
      onTotalScroll: () => {},
      onTotalScrollOffset: 100,
      alwaysTriggerOffsets: false,
    },
  };

  public scrollbarOptionsForCalendar = {
    axis: 'y',
    theme: 'minimal-dark',
    autoHideScrollbar: true,
  };
  public calendarTimeList = [
    {
      id: 1,
      time: '08.00',
      description:
        "lorem Ipsum, This is static data you can play with it but Can't save it :)",
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: false,
    },
    {
      id: 2,
      time: '09.00',
      description: "lorem Ipsum has been the industry's",
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: false,
    },
    {
      id: 3,
      time: '10.00',
      description: '',
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: true,
    },
    {
      id: 4,
      time: '11.00',
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: false,
    },
    {
      id: 5,
      time: '12.00',
      description: '',
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: true,
    },
    {
      id: 6,
      time: '13.00',
      description: '',
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: true,
    },
    {
      id: 7,
      time: '14.00',
      description: '',
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: true,
    },
    {
      id: 8,
      time: '15.00',
      description: '',
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: true,
    },
    {
      id: 9,
      time: '16.00',
      description: '',
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: true,
    },
    {
      id: 10,
      time: '17.00',
      description: '',
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: true,
    },
    {
      id: 11,
      time: '18.00',
      description: '',
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: true,
    },
    {
      id: 12,
      time: '19.00',
      description: '',
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: true,
    },
  ];
  taskDetails: any;
  taskList: any;
  TaskProgress = {
    Added: 1,
    InProgress: 2,
    Query: 3,
    Completed: 4,
  };
  public scrollbarOptions = {
    axis: 'y',
    theme: 'light',
    scrollbarPosition: 'inside',
    autoHideScrollbar: true,
    callbacks: {
      onTotalScroll: () => {},
      whileScrolling: () => {},
      onTotalScrollOffset: 200,
      alwaysTriggerOffsets: false,
    },
  };
  public scrollbarOptionsTable = {
    axis: 'y',
    theme: 'light',
    scrollbarPosition: 'inside',
    autoHideScrollbar: true,
    callbacks: {
      whileScrolling: () => {
        if (this.showId != 0) {
          this.showId = 0;
        }
      },
      onTotalScroll: () => {
        this.onScrollDownTaskDashboard(this);
      },
      onTotalScrollOffset: 200,
      alwaysTriggerOffsets: false,
    },
  };
  public scrollbarOptionsTask = {
    axis: 'y',
    theme: 'light',
    scrollbarPosition: 'inside',
    autoHideScrollbar: true,
    callbacks: {
      onTotalScroll: () => {
        this.onScrollDown(this);
      },
      onTotalScrollOffset: 300,
      alwaysTriggerOffsets: false,
    },
  };
  public scrollbarOptionsTaskNewUI = {
    axis: 'y',
    theme: 'light',
    scrollbarPosition: 'inside',
    autoHideScrollbar: true,
    callbacks: {
      onTotalScroll: () => {
        this.onScrollDown(this);
      },
      onTotalScrollOffset: 300,
      alwaysTriggerOffsets: false,
    },
  };
  public scrollbarOptionsTaskNewUIHorizontal = {
    axis: 'x',
    theme: 'light',
    scrollbarPosition: 'inside',
    autoHideScrollbar: false,
    callbacks: {
      onTotalScrollOffset: 1000,
    },
  };

  public scrollbarOptionsMemo = {
    axis: 'y',
    theme: 'light',
    scrollbarPosition: 'inside',
    autoHideScrollbar: true,
    callbacks: {
      onTotalScroll: () => {
        this.onScrollDownMemo(this);
      },
      onTotalScrollOffset: 1000,
      alwaysTriggerOffsets: false,
    },
  };

  throttle = 300;
  scrollDistance = 3;
  scrollUpDistance = 2;

  throttleMemo = 300;
  scrollDistanceMemo = 3;
  scrollUpDistanceMemo = 2;
  flagIsProgressRevert = 0;
  public isCollapsed: boolean = false;
  public filterIReport: boolean = false;
  public dateDropDown: boolean = false;
  public dueDateFilter: boolean = false;
  public pastDueFilter: boolean = false;
  public completedFilter: boolean = false;
  public typeOfTaskFilter: boolean = false;
  public titleFilter: boolean = false;
  public branchFilter: boolean = false;
  public assignToFilter: boolean = false;
  public noteToFilter: boolean = false;

  public isDateSearch: boolean = true;
  public isDueDateSearch: boolean = true;
  public isPastDueSearch: boolean = true;
  public isCompletedSearch: boolean = true;
  public isTypeOfTaskSearch: boolean = true;
  public isTitleSearch: boolean = true;
  public isBranchSearch: boolean = true;
  public isAssignToSearch: boolean = true;
  public isNoteSearch: boolean = true;

  // public filterData: Array<any> = [{ title: 'Client', value: 'McDonalds', class: 'customanimate order-animate1', id: 'client' }, { title: 'Date', value: 'April,2020', class: 'customanimate order-animate4', id: 'date' }, { title: 'Product', value: 'Strawberry', class: 'customanimate order-animate7', id: 'product' }, { title: 'Branch', value: 'Branch Title', class: 'customanimate order-animate10', id: 'branch' }]
  public filterData: Array<any> = [];
  public filterDataNew: any = {};
  public tmpFilterData: any = {};
  public selectedFilterValue: number;
  public selectedFilterName: string;
  public ts = this.getTimeStap();

  public offset: any = 0;
  public limit: any = 20;
  public listrecords: any = [];
  public listRecordsTotal: number = 0;
  public page: number = 0;
  public maxPage: number = 0;

  public memolimit: number = 20;
  public memooffset: number = 0;
  public memopage: number = 0;
  public memomaxPage: number = 0;
  public memoListRecords: any = [];

  public MainSearchdataSource = new Subject<string>();
  public clientNameItem: Observable<any>;
  public supplierLoading: boolean = false;
  total: any;
  public icon1: boolean = false;
  public sidemenu: boolean = false;
  public isWorkspaceSelection: boolean = false;
  public isTaskDashboard: boolean = true;
  public user: any = {};
  public tasks = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Client' },
    { id: 3, name: 'Division' },
    { id: 4, name: 'Product' },
  ];
  public maxDate = new Date();
  public productrecords = [];
  public notificationList = [];
  public taskTypeList = [];
  public customers: [];
  // public clients: [];
  public clients: Observable<any>;
  public MainSearchdataSourceClient = new Subject<string>();
  public companiesLoading: boolean = false;
  public contacts: [];
  public products: [];
  public presetActivities: [];
  public branches: [];
  public users = [];
  public usersForWorkspaceSelection = [];
  public saveUsersForWorkspaceSelection = [];
  public salesRepresentatives: [];
  public salesRepresentative = {};
  public undoOldStatus = -1;
  public undoNewStatus = -1;
  public undoButtonVisible = false;
  public undoButtonAPIReady = false;
  public undoButtonClicked = 0;
  public todays_date = new Date();
  public filter = {};
  unReadMemoCount: number = 0;
  activeView: string = '';
  otherNotificationCount: number = 0;
  startDateFrom: any;
  monthFrom: any;
  monthTo: any;
  yearFrom: any;
  yearTo: any;
  startDateTo: any;
  activeclass: string = '';
  notificationType: string = 'ALL';
  notificationTypeName: string = 'All';
  memoTypeName: string = 'All';
  memoType: string = 'ALL';
  memoTypeUserId: number;
  calendar = {
    id: 0,
    time: '00.00',
    hourSelection: 0,
    minuteSelection: 0,
    timeDuration: 4,
    preparation: 4,
    description: '',
    isNew: true,
  };
  eventDurations = [
    { type: 1, name: '15 Minutes', id: 1 },
    { type: 2, name: '30 Minutes', id: 2 },
    { type: 3, name: '45 Minutes', id: 3 },
    { type: 4, name: '1 Hour', id: 4 },
    { type: 5, name: '2 Hour', id: 5 },
  ];
  calendarDate: any;
  timeSelected = false;

  statisticsTypeName: string = 'Today';
  statisticsType: string = 'Today';
  public taskCompletedCount: number = 0;
  public taskOverdueCount: number = 0;
  public taskProgressedCount: number = 0;
  public taskQueryCount: number = 0;
  public data = {
    ts: this.ts,
    offset: this.offset,
  };
  public dateofEntryType = [
    { id: 1, title: 'Specific' },
    { id: 2, title: 'Range' },
  ];
  public dateofEntrySubType = [
    { id: 1, title: 'Year' },
    { id: 2, title: 'Month' },
    { id: 3, title: 'Date' },
  ];
  // Date creates, due date, past due(on/off condition), completed(on/off condition), type of task (and derivative), title, branch, assigned to, note (free search)
  public filterstart = [
    {
      id: 10,
      title: 'L7D',
      option: [],
      async: false,
      labelName: 'L7D',
      classname: '',
    },
    {
      id: 1,
      title: 'Date',
      option: [],
      async: false,
      labelName: 'Date type',
      classname: '',
    },
    {
      id: 2,
      title: 'Due Date',
      option: [],
      async: false,
      labelName: '',
      classname: '',
    },
    // {
    //   id: 3,
    //   title: "Past Due",
    //   option: [],
    //   async: true,
    //   labelName: "",
    //   classname: "",
    // },
    // {
    //   id: 4,
    //   title: "Completed",
    //   option: [],
    //   async: false,
    //   labelName: "",
    //   classname: "",
    // },
    // {
    //   id: 5,
    //   title: "Type Of Task",
    //   option: [],
    //   async: false,
    //   labelName: "",
    //   classname: "",
    // },
    // {
    //   id: 6,
    //   title: "Title",
    //   option: [],
    //   async: false,
    //   labelName: "",
    //   classname: "",
    // },
    {
      id: 7,
      title: 'Branch',
      option: [],
      async: false,
      labelName: '',
      classname: '',
    },
    {
      id: 8,
      title: 'Interaction By',
      option: [],
      async: false,
      labelName: '',
      classname: '',
    },
    {
      id: 9,
      title: 'Search',
      option: [],
      async: false,
      labelName: '',
      classname: '',
    },
  ];
  public refFilter = [...this.filterstart];
  //   Date creates, due date, past due(on/off condition),
  //   completed(on/off condition), type of task (and derivative),
  //   title, branch, assigned to, note (free search)
  showMonthsLIsting: boolean = false;
  monthsListingArray: any = [];
  showYearsListing: boolean = false;
  yearsListingArray: any = [];
  dateFrom: any;
  dateTo: any;
  public taskAddedCount: number = 0;
  public taskForgotenCount: number = 0;
  displayType: number = 0;
  addDayClass: boolean = false;
  isFilterOpen: boolean = false;
  showId = 0;
  subShowId = 0;
  delSubShowId = 0;
  progressinfo: boolean = false;
  revertinfo: boolean = false;
  updateProgressionStatus: boolean = false;
  statusClickedForUpdate: number = 0;
  bsConfig: Partial<BsDatepickerConfig>;
  showStatistics = true;
  showNotifications = true;
  showCalendar = false;
  queryTaskData: any = {};
  addTaskQueryForm: FormGroup;
  addTaskChatForm: FormGroup;
  taskChatData: any = {};
  addTaskData: any = {};
  addTaskDetailsForm: FormGroup;
  fileList: any = [];
  uploadedFileSource: any;
  taskDetailsViewData: any = {};
  loadTooltipData: boolean = false;
  @ViewChild('pillsListAnchor') pillsListAnchor: ElementRef;
  showBlackListIcon: boolean = true;
  @ViewChild('pillsChatAnchor') pillsChatAnchor: ElementRef;
  showBlackChatIcon: boolean = false;
  @ViewChild('pillsFolderAnchor') pillsFolderAnchor: ElementRef;
  showBlackFolderIcon: boolean = false;
  taskDashboardPage: number = 0;
  taskDashboardMaxPage: number = 0;
  taskDashboardLimit: number = 25;
  workspaceData: any = { title: 'Task Dashboard', id: '-2' };
  subTask_due_date: Date;
  constructor(
    inj: Injector,
    private datePipe: DatePipe,
    private _ren: Renderer2 //private mScrollbarService: MalihuScrollbarService,
  ) {
    super(inj);
  }
  public override $ = jQuery;

  ngOnInit() {
    this.listApi();
    this.loadTypehead();
    this.getProducts();
    this.getNotification();
    this.getTaskStatistics();
    this.getMemos(null);
    this.taskTypeList = this.lookupService.getTaskTypeList();
    this.refreshContacts();
    this.refreshClients();
    this.refreshBranches();
    this.refreshUsers();
    this.refreshPresetActivities();
    this.refreshSalesRepresentatives();
    this.refreshTaskList();
    this.calendarConfig();
  }
  /*****************************************************
      @purpose :For getting the producrts for dropdown
      @parameters :
      @return :
      *****************************************************/
  getProducts() {
    this.commonService
      .callApi('api/inventory/products/lookup?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.productrecords = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  /*****************************************************
      @purpose :For getting the notifications for dropdown
      @parameters :
      @return :
      *****************************************************/
  getNotification() {
    this.notificationList = [];
    var queryParams =
      'activityType=' + '0' + '&notificationType=' + this.notificationType;
    this.commonService
      .callApi('api/tenants/me/audittrail?' + queryParams, '', 'get')
      .then((success) => {
        if (success) {
          this.notificationList = success;
          this.otherNotificationCount = 0;
          this.unReadMemoCount = 0;
          this.notificationList.forEach((element) => {
            if (!element.isMemoRead && element.entityType == 'Memo') {
              this.unReadMemoCount = this.unReadMemoCount + 1;
            }
            // vm.currentUserId === r.associatedUserId && r.actionType === 1 && r.status === 1 && r.isDeleted === false && r.taskDaysOverDue === true
            if (
              element.actionType == 1 &&
              element.status == 1 &&
              element.isDeleted == false &&
              element.taskDaysOverDue == true
            ) {
              this.otherNotificationCount = this.otherNotificationCount + 1;
            }
            if (
              (element.isMemoRead || !(element.entityType == 'Memo')) &&
              (element.taskDaysOverDue === false ||
                element.taskDaysOverDue === null ||
                element.status === null ||
                element.status == 0 ||
                element.status === 1 ||
                element.status === 2 ||
                element.status === 3)
            ) {
              this.otherNotificationCount = this.otherNotificationCount + 1;
            }
          });
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  changeNotificationFilter(name: string, value) {
    this.notificationsCalendorStatistics('Notifications');
    this.notificationTypeName = name;
    this.notificationType = value;
    this.getNotification();
  }

  changeStatisticsFilter(name: string, value) {
    this.statisticsTypeName = name;
    this.statisticsType = value;
    this.getTaskStatistics();
  }

  changeMemoFilter(name: string, value) {
    this.salesRepresentative = {};
    this.memoType = value;
    if (value === 'Users') {
      return;
    }
    this.memoTypeName = name;
    this.memoType = value;

    this.getMemos(null);
  }

  changeMemoFilterUsers(event) {
    this.memoTypeName = 'Users - ' + event.title;
    this.memoType = 'Users';
    this.memoTypeUserId = event.id;
    this.getMemos(event);
  }
  changedRepresentative(event) {
    this.getMemos(null);
  }

  /*****************************************************
      @purpose :For search and getting the drop down list for client
      @parameters :
      @return :
      *****************************************************/
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

    // startWith(this.user.serachSupplier),
    this.clients = concat(
      of([]),
      this.MainSearchdataSourceClient.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term) => this.refreshCompanies(term, false)),
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
          this.supplierLoading = false;
          return items ? items : [];
        })
      );
  }

  /*****************************************************
      @purpose :For getting the list
      @parameters :
      @return :
      *****************************************************/
  listApi(alreadyCalled?, isScrolled?) {
    let queryParams: any;
    if (!alreadyCalled) {
      //const today = moment();
      const dateFrom = moment().utc().subtract(7, 'days').format();
      const dateTo = moment().utc().format('YYYY-MM-DD');
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      queryParams = {};
      queryParams['CreatedOnAfter'] = dateFrom;
      queryParams['CreatedOnBefore'] = dateTo;
      queryParams['CreatedOnType'] = 1;
      queryParams['type'] = this.displayType;
      queryParams['limit'] = this.taskDashboardLimit; // this.limit
      queryParams['offset'] = this.offset;
    } else {
      if (alreadyCalled && isScrolled) {
        queryParams = {};
        if (this.filterData.length > 0) {
          for (let i = 0; i < this.filterData.length; i++) {
            if (i != 0) {
              if (
                this.filterData[i]['filterId'] == 1 &&
                this.filterData[0]['filterId'] != 1
              ) {
                if (
                  this.filterData[i]['subchildrange'] != '' &&
                  this.filterData[i]['subchildrange'] != null &&
                  this.filterData[i]['subchildrange'] != undefined
                ) {
                  queryParams['CreatedOnAfter'] = new Date(
                    this.filterData[i]['childFilter']
                  ).toISOString(); // this.data["createdOnAfter"]
                  queryParams['CreatedOnBefore'] = new Date(
                    this.filterData[i]['subchildrange']
                  ).toISOString(); // this.data["createdOnBefore"]
                  queryParams['CreatedOnType'] = 1;
                } else {
                  queryParams['createdOn'] = new Date(
                    this.filterData[i]['childFilter']
                  ).toISOString(); //this.data["createdOn"];
                  queryParams['createdOnType'] =
                    this.filterData[i]['createdOnType']; //this.data["createdOnType"];
                }
              } else if (
                this.filterData[i]['filterId'] == 2 &&
                this.filterData[0]['filterId'] != 2
              ) {
                if (
                  this.filterData[i]['subchildrange'] != '' &&
                  this.filterData[i]['subchildrange'] != null &&
                  this.filterData[i]['subchildrange'] != undefined
                ) {
                  queryParams['dateFrom'] = new Date(
                    this.filterData[i]['childFilter']
                  ).toISOString(); // this.data["dateFrom"]
                  queryParams['dateTo'] = new Date(
                    this.filterData[i]['subchildrange']
                  ).toISOString(); // this.data["dateTo"]
                  queryParams['dueDateType'] = 1;
                } else {
                  queryParams['dueDate'] = new Date(
                    this.filterData[i]['childFilter']
                  ).toISOString(); //this.data["dueDate"];
                  queryParams['dueDateType'] =
                    this.filterData[i]['dueDateType']; //this.data["dueDateType"];
                }
              } else if (this.filterData[i]['filterId'] == 3) {
                queryParams['pastDue'] = this.data['pastDue'];
                //queryParams["CreatedOnType"] = 0;
              } else if (this.filterData[i]['filterId'] == 4) {
                queryParams['completed'] = this.data['completed'];
                //queryParams["CreatedOnType"] = 0;
              } else if (this.filterData[i]['filterId'] == 5) {
                if (this.filterData[i]['filterId'] === 'Product') {
                  queryParams['productId'] = this.data['productId'];
                } else {
                  queryParams['businessPartnerId'] =
                    this.data['businessPartnerId'];
                }
              } else if (this.filterData[i]['filterId'] == 6) {
                queryParams['presetActivityId'] = this.data['presetActivityId'];
              } else if (this.filterData[i]['filterId'] == 7) {
                queryParams['branchId'] = this.data['branchId'];
              } else if (this.filterData[i]['filterId'] == 8) {
                queryParams['userId'] = this.data['userId'];
              } else if (this.filterData[i]['filterId'] == 9) {
                queryParams['note'] = this.data['note'];
              } else if (this.filterData[i]['filterId'] == 10) {
                const dateFrom = moment().utc().subtract(7, 'days').format();
                const dateTo = moment().utc().format('YYYY-MM-DD');
                this.dateFrom = dateFrom;
                this.dateTo = dateTo;
                queryParams['CreatedOnAfter'] = this.dateFrom;
                queryParams['CreatedOnBefore'] = this.dateTo;
                queryParams['CreatedOnType'] = 1;
              }
            } else {
              if (this.filterData[i]['filterId'] == 1) {
                if (
                  this.filterData[i]['subchildrange'] != '' &&
                  this.filterData[i]['subchildrange'] != null &&
                  this.filterData[i]['subchildrange'] != undefined
                ) {
                  queryParams['CreatedOnAfter'] = new Date(
                    this.filterData[i]['childFilter']
                  ).toISOString(); // this.data["createdOnAfter"]
                  queryParams['CreatedOnBefore'] = new Date(
                    this.filterData[i]['subchildrange']
                  ).toISOString(); // this.data["createdOnBefore"]
                  queryParams['CreatedOnType'] = 1;
                } else {
                  queryParams['createdOn'] = new Date(
                    this.filterData[i]['childFilter']
                  ).toISOString(); //this.data["createdOn"];
                  queryParams['createdOnType'] =
                    this.filterData[i]['createdOnType']; //this.data["createdOnType"];
                }
              } else if (this.filterData[i]['filterId'] == 2) {
                if (
                  this.filterData[i]['subchildrange'] != '' &&
                  this.filterData[i]['subchildrange'] != null &&
                  this.filterData[i]['subchildrange'] != undefined
                ) {
                  queryParams['dateFrom'] = new Date(
                    this.filterData[i]['childFilter']
                  ).toISOString(); // this.data["dateFrom"]
                  queryParams['dateTo'] = new Date(
                    this.filterData[i]['subchildrange']
                  ).toISOString(); // this.data["dateTo"]
                  queryParams['dueDateType'] = 1;
                } else {
                  queryParams['dueDate'] = new Date(
                    this.filterData[i]['childFilter']
                  ).toISOString(); //this.data["dueDate"];
                  queryParams['dueDateType'] =
                    this.filterData[i]['dueDateType']; //this.data["dueDateType"];
                }
              } else if (this.filterData[i]['filterId'] == 3) {
                queryParams['pastDue'] = this.data['pastDue'];
                //queryParams["CreatedOnType"] = 0;
              } else if (this.filterData[i]['filterId'] == 4) {
                queryParams['completed'] = this.data['completed'];
                //queryParams["CreatedOnType"] = 0;
              } else if (this.filterData[i]['filterId'] == 5) {
                if (this.filterData[i]['filterId'] === 'Product') {
                  queryParams['productId'] = this.data['productId'];
                } else {
                  queryParams['businessPartnerId'] =
                    this.data['businessPartnerId'];
                }
              } else if (this.filterData[i]['filterId'] == 6) {
                queryParams['presetActivityId'] = this.data['presetActivityId'];
              } else if (this.filterData[i]['filterId'] == 7) {
                queryParams['branchId'] = this.data['branchId'];
              } else if (this.filterData[i]['filterId'] == 8) {
                queryParams['userId'] = this.data['userId'];
              } else if (this.filterData[i]['filterId'] == 9) {
                queryParams['note'] = this.data['note'];
              } else if (this.filterData[i]['filterId'] == 10) {
                const dateFrom = moment().utc().subtract(7, 'days').format();
                const dateTo = moment().utc().format('YYYY-MM-DD');
                this.dateFrom = dateFrom;
                this.dateTo = dateTo;
                queryParams['CreatedOnAfter'] = this.dateFrom;
                queryParams['CreatedOnBefore'] = this.dateTo;
                queryParams['CreatedOnType'] = 1;
              }
            }
          }
        }
        queryParams['type'] = this.displayType;
        queryParams['limit'] = this.taskDashboardLimit; // this.limit
        queryParams['offset'] = this.offset;
      } else {
        if (this.filterData.length > 0) {
          if (this.filterData[0]['filterId'] == 10) {
            const dateFrom = moment().utc().subtract(7, 'days').format();
            const dateTo = moment().utc().format('YYYY-MM-DD');
            this.dateFrom = dateFrom;
            this.dateTo = dateTo;
            this.data['CreatedOnAfter'] = this.dateFrom;
            this.data['CreatedOnBefore'] = this.dateTo;
            this.data['CreatedOnType'] = 1;
          } else if (this.filterData[0]['filterId'] == 4) {
            this.data['completed'] = true;
            this.data['CreatedOnType'] = 0;
          } else if (this.filterData[0]['filterId'] == 3) {
            this.data['pastDue'] = true;
            this.data['CreatedOnType'] = 0;
          }
        }
        this.data['type'] = this.displayType;
        queryParams = this.data;
        queryParams['limit'] = this.taskDashboardLimit; // this.limit
        queryParams['offset'] = this.offset;
      }
    }
    this.commonService
      .callApi('api/clients/taskDashboard?', queryParams, 'get')
      .then((success) => {
        if (success) {
          if (isScrolled) {
            var listrecords1 = success.records;
            for (var i = 0; i < listrecords1.length; i++) {
              this.listrecords.push(listrecords1[i]);
            }
          } else {
            console.log(success, 'success');
            this.listrecords = success.records;
          }
          this.listRecordsTotal = success.total;
          this.taskDashboardMaxPage = Math.floor(
            success.total / this.taskDashboardLimit
          ); // this.limit
          this.listrecords.map((record: any) => {
            record.showBlackListIcon = true;
            record.showBlackChatIcon = false;
            record.showBlackFolderIcon = false;
            if (record.relatedTaskList === null) {
              record.relatedTaskList = [];
            }
          });
          if (!alreadyCalled && !isScrolled) {
            let tempconfig: any = {};
            tempconfig['filterName'] = 'L7D';
            tempconfig['filterId'] = 10;
            tempconfig['parentFilter'] = 'Date ';
            tempconfig['childFilter'] = 'L7D';
            this.filterData.push(tempconfig);
            this.filterstart = this.filterstart.filter((X) => X.id != 10);
          }
          setTimeout(() => {
            if (this.listrecords.length > 0) {
              this.loadTooltipData = true;
              var ele = document.getElementById(
                `th-table-descp`
              ) as HTMLElement;
              var mainWidth = ele.offsetWidth;
              this.setProperWidth(mainWidth);
            }
          }, 3000);
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  setProperWidth(width) {
    setTimeout(() => {
      if (this.listrecords.length > 0) {
        this.listrecords.map((record: any) => {
          if (record.description !== null) {
            var ele = document.getElementById(
              `table-text-${record.id}`
            ) as HTMLElement;
            ele.style.width = String(width - 40) + 'px';
          }
        });
      }
    }, 100);
  }

  /*****************************************************
   @purpose :Calculate the precentage
   @parameters :
   @return :
   *****************************************************/
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

      //For Progress task
      var getInprogressTask = value.subTaskList.filter((i) => i.status == 2);
      var getInprogressValue = 0;
      if (
        getInprogressTask != undefined &&
        getInprogressTask != null &&
        getInprogressTask.length > 0
      ) {
        getInprogressValue = getInprogressTask.length * Math.round(33.33);
      }

      //For Query task
      var getQueryTask = value.subTaskList.filter((i) => i.status == 3);
      var getQueryValue = 0;
      if (
        getQueryTask != undefined &&
        getQueryTask != null &&
        getQueryTask.length > 0
      ) {
        getQueryValue = getQueryTask.length * Math.round(66.66);
      }

      //For Completed task
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

  getScrollData() {
    var queryParams =
      'ts=' +
      this.ts +
      '&offset=' +
      this.offset +
      '&limit=' +
      this.limit +
      '&isOnlyDueTask=true';

    this.commonService
      .callApi('api/clients/tasks?' + queryParams, this.data, 'get')
      .then((success) => {
        if (success) {
          success.records.forEach((obj) => {
            this.calculateProgressInPercentage(obj);
          });

          let data = success.records;
          this.maxPage = Math.floor(success.total / this.limit);
          for (let i = 0; i < data.length; i++) {
            this.listrecords.push(data[i]);
          }
          setTimeout(() => {
            if (this.listrecords.length > 0) {
              var ele = document.getElementById(
                `th-table-descp`
              ) as HTMLElement;
              var mainWidth = ele.offsetWidth;
              this.setProperWidth(mainWidth);
            }
          }, 3000);
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  public tempcurrentListRecords = [
    {
      board: 'Testing Board',
      interactionOn: '2024-02-19T08:51:40.203Z',
      description: 'Testing Static Datas(Current)',
      previousStatus: 0,
      newStatus: 1,
      interactionBy: 'Nicholas Ng',
      taskId: 47805,
      subTaskId: 17115,
      relatedTaskList: [],
      queryDetailString: '',
      id: 9999,
    },
    {
      board: 'Testing Board 2',
      interactionOn: '2024-02-19T08:51:40.203Z',
      description: 'Testing Static Datas 2(Current)',
      previousStatus: 0,
      newStatus: 1,
      interactionBy: 'Nicholas Ng',
      taskId: 47806,
      subTaskId: 17116,
      relatedTaskList: [],
      queryDetailString: '',
      id: 9998,
    },
  ];
  public tempPlannedListRecords = [
    {
      board: 'Testing Board',
      interactionOn: '2024-02-19T08:51:40.203Z',
      description: 'Testing Static Datas (Planned)',
      previousStatus: 0,
      newStatus: 1,
      interactionBy: 'Nicholas Ng',
      taskId: 47805,
      subTaskId: 17115,
      relatedTaskList: [],
      queryDetailString: '',
      id: 9999,
    },
    {
      board: 'Testing Board 2',
      interactionOn: '2024-02-19T08:51:40.203Z',
      description: 'Testing Static Datas (Planned)',
      previousStatus: 0,
      newStatus: 1,
      interactionBy: 'Nicholas Ng',
      taskId: 47806,
      subTaskId: 17116,
      relatedTaskList: [],
      queryDetailString: '',
      id: 9998,
    },
    {
      board: 'Testing Board 3',
      interactionOn: '2024-02-19T08:51:40.203Z',
      description: 'Testing Static Datas (Planned)',
      previousStatus: 0,
      newStatus: 1,
      interactionBy: 'Nicholas Ng',
      taskId: 47806,
      subTaskId: 17116,
      relatedTaskList: [],
      queryDetailString: '',
      id: 9997,
    },
  ];
  removeThisDataFromList(data) {
    this.usersForWorkspaceSelection = [];
    for (let i = 0; i < this.saveUsersForWorkspaceSelection.length; i++) {
      if (this.saveUsersForWorkspaceSelection[i].id !== data.id) {
        this.usersForWorkspaceSelection.push(
          this.saveUsersForWorkspaceSelection[i]
        );
      }
    }
  }
  changeWorkspace(data) {
    this.workspaceData = data;
    this.removeThisDataFromList(data);
    if (data && data.id > 0) {
      this.isTaskDashboard = false; // User selected
      this.listrecords = this.tempcurrentListRecords;
      this.isWorkspaceSelection = false;
      this.selectedTab = 5;
    } else {
      if (data && data.id == -1) {
        this.isTaskDashboard = false; // Personal
        this.listrecords = this.tempcurrentListRecords;
        this.isWorkspaceSelection = false;
        this.selectedTab = 5;
      } else if (data && data.id == -2) {
        this.isTaskDashboard = true; // Task Dashboard
        this.listApi(true, false);
        this.isWorkspaceSelection = false;
        this.selectedTab = 0;
      }
    }
    if (this.isTaskDashboard && this.showCalendar) {
      this.changeNotificationFilter('All', 'ALL');
    }
  }
  plannedTask(record) {}
  onScrollDown(ev) {
    if (this.page < this.maxPage) {
      this.page++;
      this.offset = this.page * this.limit;
      this.getScrollData();
    }
  }

  onScrollDownTaskDashboard(ev) {
    let listcount = this.listrecords.length;
    if (
      listcount > 0 &&
      listcount > this.taskDashboardLimit &&
      this.taskDashboardPage == 0 &&
      this.taskDashboardMaxPage > 0 &&
      listcount != this.listRecordsTotal
    ) {
      this.taskDashboardPage =
        this.taskDashboardMaxPage -
        Math.ceil(
          (this.listRecordsTotal - listcount) / this.taskDashboardLimit
        );
    } else if (listcount == this.listRecordsTotal) {
      this.taskDashboardPage = this.taskDashboardMaxPage;
    }
    if (this.taskDashboardPage < this.taskDashboardMaxPage) {
      this.taskDashboardPage++;
      this.offset = this.taskDashboardPage * this.taskDashboardLimit; // this.limit
      this.listApi(true, true);
    }
  }

  changeIc(type) {
    if (type == 'dots') {
      this.icon1 = true;
      this.sidemenu = true;
      this.user = {};
    } else {
      this.icon1 = false;
      this.sidemenu = false;
      this.user = {};
    }
  }
  editCustomerSetup(item) {
    this.icon1 = true;
    this.sidemenu = true;
    this.user = item;
  }
  createdisTask(data) {
    this.user['dateOfEntry'] = this.maxDate;
    this.commonService
      .callApi('api/clients/tasks', data, 'post')
      .then((success) => {
        if (success) {
          this.icon1 = false;
          this.sidemenu = false;
          this.listApi();
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  updatediTask(data) {
    this.commonService
      .callApi('api/clients/tasks/' + data.id, this.user, 'put')
      .then((success) => {
        if (success) {
          this.icon1 = false;
          this.sidemenu = false;
          this.listApi();
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  ModelDatepicker(event) {}
  changedCheck(event) {}
  /*****************************************************
      @purpose :For deleting the list item
      @parameters :
      @return :
      *****************************************************/

  deletetask(i) {
    this.swal({
      imageUrl: 'assets/images/trash-bin1.png',
      imageWidth: 155,
      text: 'Are you sure you want to delete this record?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.commonService
          .callApi('api/clients/tasks/' + i.id, '', 'delete')
          .then((success) => {
            if (this.total <= this.offset) {
              this.offset = 0;
              this.listApi();
            } else {
              this.offset = 0;
              this.listApi();
            }

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
  recordSelected(event) {
    $('#taskname :input').blur();
    $('#businessPartner :input').blur();
    $('#productrecord :input').blur();
  }

  refreshClients() {
    this.commonService
      .callApi('api/clients/getCustomers/lookup?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.customers = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  refreshCompanies(value: string = null, allow): Observable<any[]> {
    this.companiesLoading = true;
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
            this.clients = success['records'];
          }
          this.companiesLoading = false;
          return items ? items : [];
        })
      );
  }

  refreshContacts() {
    this.commonService
      .callApi(
        'api/clients/lookup?entityType=client&ClientType=2&q=',
        '',
        'get'
      )
      .then((success) => {
        if (success) {
          this.contacts = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  refreshPresetActivities() {
    this.commonService
      .callApi('api/tenants/presetactivities/lookup?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.presetActivities = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  refreshBranches() {
    this.commonService
      .callApi('api/tenants/branches/lookup?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.branches = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  setSaveUsersForWorkspaceSelection() {
    this.saveUsersForWorkspaceSelection = [
      { title: 'Personal', id: -1 },
      { title: 'Task Dashboard', id: '-2' },
    ];
    for (let i = 0; i < this.users.length; i++) {
      this.saveUsersForWorkspaceSelection.push({
        title: this.users[i].title,
        id: this.users[i].id,
      });
    }
    this.removeThisDataFromList(this.workspaceData);
  }
  refreshUsers() {
    this.commonService
      .callApi('api/clients/tasks/getAssignedUsers?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.users = success;
          this.setSaveUsersForWorkspaceSelection();
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  public refreshSalesRepresentatives() {
    this.commonService
      .callApi('api/tenants/users/lookup?q=', '', 'get')
      .then((success) => {
        if (success) {
          this.salesRepresentatives = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  checkCollapse() {
    this.isCollapsed = !this.filterIReport;
  }
  filterReport() {
    this.isFilterOpen = !this.isFilterOpen;
    this.filterIReport = !this.filterIReport;
    this.isFilterOpen = this.filterIReport;
    if (this.addDayClass === true) {
      this.addDayClass = false;
    }
    this.filterstart.map((el: any) => {
      el.classname = '';
    });
    this.selectedFilterValue = 0;
    this.showMonthsLIsting = false;
    this.monthsListingArray = [];
  }

  changedParentFilter(value) {
    this.filterstart.map((el: any) => {
      el.classname = '';
    });
    value.classname = 'active';
    this.selectedFilterValue = value.id;
    this.selectedFilterName = value.title;
    this.filterDataNew = {};
    this.showMonthsLIsting = false;
    this.monthsListingArray = [];
    if (value.id == '1') {
      this.filterDataNew.bindedValue = '';
      this.filterDataNew.options = [
        { id: 1, title: 'Day', class: '' },
        { id: 3, title: 'Month', class: '' },
        { id: 4, title: 'Year', class: '' },
      ];
      this.filterDataNew.suboptions = [];

      this.filterDataNew.date = false;
      this.filterDataNew.enddate = false;
      this.filterDataNew.month = false;
      this.filterDataNew.endmonth = false;
      this.filterDataNew.year = false;
      this.filterDataNew.endyear = false;
    } else if (value.id == '2') {
      this.filterDataNew.bindedValue = '';
      this.filterDataNew.options = [
        { id: 1, title: 'Specific' },
        { id: 2, title: 'Range' },
      ];
      this.filterDataNew.suboptions = [];
      this.filterDataNew.date = false;
      this.filterDataNew.enddate = false;
      this.filterDataNew.month = false;
      this.filterDataNew.endmonth = false;
      this.filterDataNew.year = false;
      this.filterDataNew.endyear = false;
    } else if (value.id == '3') {
      this.data['pastDue'] = true;
      this.applyFilter(this.data, 'end');
      this.isFilterOpen = false;
    } else if (value.id == '4') {
      this.data['completed'] = true;
      this.applyFilter(this.data, 'end');
      this.isFilterOpen = false;
    } else if (value.id == '10') {
      const dateFrom = moment().utc().subtract(7, 'days').format();
      const dateTo = moment().utc().format();
      this.dateFrom = dateFrom;
      this.dateTo = dateTo;
      this.data['CreatedOnAfter'] = this.dateFrom;
      this.data['CreatedOnBefore'] = this.dateTo;
      this.data['CreatedOnType'] = 1;
      this.applyFilter(this.data, 'end');
      this.isFilterOpen = false;
    }
  }

  removeSelected(index, i) {
    $('#' + i.id).addClass('removed');
    this.filterReport();
    this.filterIReport = false;
    this.isFilterOpen = false;
    this.isCollapsed = true;
    setTimeout(() => {
      if (i.filterId === 5) {
        delete this.data['type']; //this.data["type"] = "";
        if (i.childFilter === 'Product') {
          //if (i.childFilter === "Product") {
          delete this.data['productId']; //    this.data["productId"] = "";
        } else {
          //} else {
          delete this.data['businessPartnerId']; //    this.data["businessPartnerId"] = "";
        } //}
      } else if (i.filterId === 1) {
        if (this.data['createdOn']) {
          delete this.data['createdOn'];
        } //this.data["createdOn"] = "";
        if (this.data['createdOnAfter']) {
          delete this.data['createdOnAfter'];
        } //this.data["createdOnAfter"] = "";
        if (this.data['createdOnBefore']) {
          delete this.data['createdOnBefore'];
        } //this.data["createdOnBefore"] = "";
        if (
          this.data['createdOnType'] == 0 ||
          this.data['createdOnType'] == 1
        ) {
          //this.data["createdOnType"] = "";
          delete this.data['createdOnType'];
        }

        if (this.data['CreatedOn']) {
          delete this.data['CreatedOn'];
        }
        if (this.data['CreatedOnAfter']) {
          delete this.data['CreatedOnAfter'];
        }
        if (this.data['CreatedOnBefore']) {
          delete this.data['CreatedOnBefore'];
        }
        if (
          this.data['CreatedOnType'] == 0 ||
          this.data['CreatedOnType'] == 1
        ) {
          delete this.data['CreatedOnType'];
        }
      } else if (i.filterId === 2) {
        if (this.data['dueDate']) {
          delete this.data['dueDate'];
        } //this.data["dueDate"] = "";
        if (this.data['dateTo']) {
          delete this.data['dateTo'];
        } //this.data["dateTo"] = "";
        if (this.data['dateFrom']) {
          delete this.data['dateFrom'];
        } //this.data["dateFrom"] = "";
        if (this.data['dueDateType'] == 0 || this.data['dueDateType'] == 1) {
          //this.data["dueDateType"] = "";
          delete this.data['dueDateType'];
        }
      } else if (i.filterId === 3) {
        delete this.data['pastDue']; //this.data["pastDue"] = "";
      } else if (i.filterId === 4) {
        delete this.data['completed']; //this.data["completed"] = "";
      } else if (i.filterId === 6) {
        delete this.data['presetActivityId']; //this.data["presetActivityId"] = "";
      } else if (i.filterId === 7) {
        delete this.data['branchId']; //this.data["branchId"] = "";
      } else if (i.filterId === 8) {
        delete this.data['userId']; //this.data["userId"] = "";
      } else if (i.filterId === 9) {
        delete this.data['note']; //this.data["note"] = "";
      } else if (i.filterId === 10) {
        delete this.data['CreatedOnAfter']; //this.data["CreatedOnAfter"] = null;
        delete this.data['CreatedOnBefore']; //this.data["CreatedOnBefore"] = null;
        delete this.data['CreatedOnType'];
      }

      const index1 = this.filterData
        .map((e) => {
          return e.filterId;
        })
        .indexOf(i.filterId);
      this.filterData.splice(index1, 1);
      setTimeout(() => {
        const newArray = this.refFilter.filter(
          ({ id }) => !this.filterData.some((x) => x.filterId == id)
        );
        this.filterstart = [...newArray];
        this.isFilterOpen = false;
      }, 100);
      this.data['type'] = this.displayType;
      this.applyFilter(this.data);
    }, 1000);
  }

  getActionType = (type: number) => {
    switch (type) {
      case 1:
        return 'added';
      case 2:
        return 'edited';
      case 3:
        return 'deleted';
      case 4:
        return 'changes rejected';
      case 5:
        return 'processed';
      case 6:
        return 'reconciled';
      case 7:
        return 'partially paid';
      case 8:
        return 'paid';
      case 9:
        return 'changes approved';
      case 10:
        return 'manufacturing started';
      case 11:
        return 'completed';
      case 12:
        return 'received';
      case 13:
        return 'adjusted';
      case 14:
        return 'read';
      case 15:
        return 'submitted';
      case 16:
        return 'approval requested';
      case 17:
        return 'invited';
      case 18:
        return 'pending discussion agreement';
      case 19:
        return 'pending conclusion agreement';
      case 20:
        return 'discussion agreed';
      case 21:
        return 'conclusion agreed';
      case 22:
        return 'production requested';
      case 23:
        return 'activated';
    }
    return null;
  };

  getClientType = (type: number) => {
    switch (type) {
      case 1:
        return 'Customer';
      case 2:
        return 'Contact';
      case 3:
        return 'Company';
      case 4:
        return 'Vendor';
    }
    return 'Unknown';
  };

  getDocumentType = (type: number) => {
    switch (type) {
      case 1:
        return 'Invoice';
      case 2:
        return 'Inventoryrequest';
      case 3:
        return 'purchaseorder';
    }
    return null;
  };

  redirectToNotificationType(r) {}

  TaskDuePopup(r) {}

  chatModal(chat: TemplateRef<any>) {
    this.modalRef = this.modalService.show(chat, {
      class: 'modal-xl modal-dialog-centered',
    });
  }

  decline(): void {
    // this.message = 'Declined!';
    this.modalRef.hide();
  }
  openChat() {
    this.openchatbox = !this.openchatbox;
  }
  closeChat() {
    this.openchatbox = false;
  }

  onTaskClick(id) {
    this.router.navigate(['/main/task/view'], { queryParams: { id: id } });
  }

  openChatModal() {
    this.child.openMdlFrmOthrCom();
  }

  createdDateValueChange() {
    this.dateDropDown = false;
  }

  getMemos(event) {
    this.memooffset = 0;
    var queryParams =
      'ts=' + this.ts + '&offset=' + this.memooffset + '&limit=' + this.limit;
    if (this.memoType === 'ALL') {
      queryParams = queryParams + '&IsShowAllMemos=true';
    } else if (this.memoType === 'Read') {
      queryParams = queryParams + '&ShowArchived=true';
    } else if (this.memoType === 'Users') {
      queryParams = queryParams + '&salesRepresentativeId=' + event.id;
    }

    this.commonService
      .callApi('api/tenants/memos?' + queryParams, '', 'get')
      .then((success) => {
        if (success) {
          this.memoListRecords = success.records;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  onScrollDownMemo(event) {
    this.memooffset = this.memooffset + 20;
    var queryParams =
      'ts=' + this.ts + '&offset=' + this.memooffset + '&limit=' + this.limit;
    if (this.memoType === 'ALL') {
      queryParams = queryParams + '&IsShowAllMemos=true';
    } else if (this.memoType === 'Read') {
      queryParams = queryParams + '&ShowArchived=true';
    } else if (this.memoType === 'Users') {
      queryParams =
        queryParams + '&salesRepresentativeId=' + this.memoTypeUserId;
    }

    this.commonService
      .callApi('api/tenants/memos?' + queryParams, '', 'get')
      .then((success) => {
        if (success) {
          var listrecords1 = success.records;
          for (var i = 0; i < listrecords1.length; i++) {
            this.memoListRecords.push(listrecords1[i]);
          }
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  /*****************************************************
     @purpose :For getting the list
     @parameters :
     @return :
     *****************************************************/
  getTaskStatistics() {
    var today = new Date(),
      y = today.getFullYear(),
      m = today.getMonth();
    var createdOn = '';
    var createdOnAfter = '';
    var createdOnBefore = '';
    var queryParams = '';
    if (this.statisticsType === 'Today') {
      queryParams = 'createdOnType=0&createdOn=' + moment.utc(today).format();
    } else if (this.statisticsType === 'WeekToDate') {
      createdOnAfter = moment().utc().startOf('isoWeek').format();
      createdOnBefore = moment.utc(today).format();
      queryParams =
        'createdOnType=1&createdOnAfter=' +
        createdOnAfter +
        '&createdOnBefore=' +
        createdOnBefore;
    } else if (this.statisticsType === 'MonthToDate') {
      createdOnAfter = moment.utc(new Date(y, m - 1, today.getDate())).format();
      createdOnBefore = moment.utc(today).format();
      queryParams =
        'createdOnType=1&createdOnAfter=' +
        createdOnAfter +
        '&createdOnBefore=' +
        createdOnBefore;
    } else if (this.statisticsType === 'QuarterToDate') {
      var quarter = Math.floor(m / 3);
      createdOnAfter = moment.utc(new Date(y, quarter * 3, 1)).format();
      createdOnBefore = moment.utc(today).format();
      queryParams =
        'createdOnType=1&createdOnAfter=' +
        createdOnAfter +
        '&createdOnBefore=' +
        createdOnBefore;
    } else if (this.statisticsType === 'YearToDate') {
      createdOnAfter = moment.utc(new Date(y - 1, m, today.getDate())).format();
      createdOnBefore = moment.utc(today).format();
      queryParams =
        'createdOnType=1&createdOnAfter=' +
        createdOnAfter +
        '&createdOnBefore=' +
        createdOnBefore;
    }
    this.commonService
      .callApi('api/clients/taskstatistics?' + queryParams, '', 'get')
      .then((success) => {
        if (success) {
          this.taskCompletedCount = success.taskCompletedCount;
          this.taskOverdueCount = success.taskOverdueCount;
          this.taskProgressedCount = success.taskProgressedCount;
          this.taskQueryCount = success.taskQueryCount;
          this.taskAddedCount = success.taskAddedCount;
          this.taskForgotenCount = success.taskForgotenCount;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  /*****************************************************
    @purpose :For first child filter
    @parameters : 
    @return :
    *****************************************************/
  changedChildFilter(event, filterName?, wholeObject?) {
    if (this.selectedFilterValue === 1 || this.selectedFilterValue === 2) {
      if (this.filterDataNew.bindedValue.id == 1) {
        this.filterDataNew.suboptions = [];
        this.filterDataNew.suboptions.push({
          options: [
            { id: 1, title: 'Year' },
            { id: 2, title: 'Month' },
            { id: 3, title: 'Date' },
          ],
          bindvalue: '',
          type: 'select',
          labelName: 'Filter By',
        });
        this.filterDataNew.suboptions = [...this.filterDataNew.suboptions];
      } else {
        this.filterDataNew.suboptions = [];
        this.filterDataNew.suboptions.push({
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
      if (this.filterDataNew.date || this.filterDataNew.enddate) {
        this.filterDataNew.date = false;
        this.filterDataNew.enddate = false;
      } else if (this.filterDataNew.month || this.filterDataNew.endmonth) {
        this.filterDataNew.month = false;
        this.filterDataNew.endmonth = false;
      } else {
        this.filterDataNew.year = false;
        this.filterDataNew.endyear = false;
      }
    } else if (this.selectedFilterValue === 3) {
      this.data['pastDue'] = true;
      this.applyFilter(this.data, 'end');
      this.isFilterOpen = false;
    } else if (this.selectedFilterValue === 4) {
      this.data['completed'] = true;
      this.applyFilter(this.data, 'end');
      this.isFilterOpen = false;
    } else if (this.selectedFilterValue === 5) {
      if (this.filterDataNew.type.title === 'Product') {
        this.data['productId'] = event.id;
      } else {
        this.data['businessPartnerId'] = event.id;
      }

      this.applyFilter(this.data, 'end');
    } else if (this.selectedFilterValue === 6) {
      this.filterDataNew.presetActivityId = wholeObject;
      this.selectedFilterName = filterName;
      this.data['presetActivityId'] = event;
      this.applyFilter(this.data, 'end');
      this.isFilterOpen = false;
    } else if (this.selectedFilterValue === 7) {
      this.data['branchId'] = event.id;

      this.applyFilter(this.data, 'end');
      this.isFilterOpen = false;
    } else if (this.selectedFilterValue === 8) {
      this.data['userId'] = event.id;

      this.applyFilter(this.data, 'end');
      this.isFilterOpen = false;
    } else if (this.selectedFilterValue === 9) {
      if (
        this.filterDataNew.note != undefined &&
        this.filterDataNew.note != ''
      ) {
        this.data['note'] = this.filterDataNew.note;
        this.applyFilter(this.data, 'end');
        this.isFilterOpen = false;
      }
    }
  }

  changedsubChildFilter(event) {
    if (this.selectedFilterValue === 1 || this.selectedFilterValue === 2) {
      if (this.filterDataNew.bindedValue.id == 1) {
        this.startDateFrom = '';
        this.startDateTo = '';
        this.monthFrom = '';
        this.monthTo = '';
        this.yearFrom = '';
        this.yearTo = '';
        if (event.id == 3) {
          this.startDateFrom = '';
          this.startDateTo = '';

          this.filterDataNew.date = true;
          this.filterDataNew.enddate = false;
          this.filterDataNew.month = false;
          this.filterDataNew.endmonth = false;
          this.filterDataNew.year = false;
          this.filterDataNew.endyear = false;
          this.filterDataNew.dateValue = '';
        } else if (event.id == 2) {
          this.filterDataNew.date = false;
          this.filterDataNew.enddate = false;

          this.filterDataNew.month = true;
          this.filterDataNew.endmonth = false;
          this.filterDataNew.year = false;
          this.filterDataNew.endyear = false;

          this.filterDataNew.monthValue = '';
        } else {
          this.filterDataNew.year = true;
          this.filterDataNew.endyear = false;
          this.filterDataNew.date = false;
          this.filterDataNew.enddate = false;
          this.filterDataNew.month = false;
          this.filterDataNew.endmonth = false;

          this.filterDataNew.yearValue = '';
        }
      } else if (this.filterDataNew.bindedValue.id == 2) {
        this.startDateFrom = '';
        this.startDateTo = '';
        this.monthFrom = '';
        this.monthTo = '';
        this.yearFrom = '';
        this.yearTo = '';
        if (event.id == 3) {
          this.filterDataNew.date = true;
          this.filterDataNew.enddate = true;
          this.filterDataNew.month = false;
          this.filterDataNew.endmonth = false;
          this.filterDataNew.enddateValue = '';
          this.filterDataNew.year = false;
          this.filterDataNew.endyear = false;
        } else if (event.id == 2) {
          this.filterDataNew.month = true;
          this.filterDataNew.endmonth = true;
          this.filterDataNew.date = false;
          this.filterDataNew.enddate = false;
          this.filterDataNew.year = false;
          this.filterDataNew.endyear = false;
          // this.filterData.enddateValue = "";
        } else {
          this.filterDataNew.year = true;
          this.filterDataNew.endyear = true;
          this.filterDataNew.month = false;
          this.filterDataNew.endmonth = false;
          this.filterDataNew.date = false;
          this.filterDataNew.enddate = false;
        }
      }
    }
  }

  changeTaskTypeList(event) {
    this.filterDataNew.businessPartnerId = '';
    this.filterDataNew.productId = '';
    // this.data['type'] = event.id;
    delete this.data.ts;
    delete this.data.offset;
    this.data['dateFrom'] = this.dateFrom;
    this.data['dateTo'] = this.dateTo;
    this.data['type'] = this.displayType;
    this.data['taskType'] = event.id;
    if (event.id === 1) {
      this.applyFilter(this.data, 'end');
      this.isFilterOpen = false;
    }
  }

  /*****************************************************
      @purpose : Main Filter Calling
      @parameters : 
      @return :
      *****************************************************/

  applyFilter(queryParams, terminate?) {
    if (queryParams.limit) {
      delete queryParams.limit;
    }
    if (
      queryParams.type == 0 ||
      queryParams.type == 1 ||
      queryParams.type == 2 ||
      queryParams.type == 3 ||
      queryParams.type == 4
    ) {
      delete queryParams.type;
    }
    delete queryParams['ts'];
    delete queryParams['offset'];
    this.offset = 0;
    this.taskDashboardPage = 0;
    var queryParams1 = '';
    this.listrecords = [];
    if (queryParams.createdOnBefore) {
      if (this.filterData.length > 0 && this.filterData[0]['filterId'] == 10) {
        this.tmpFilterData.createdOnBefore =
          new Date(queryParams.createdOnBefore).toISOString().split('.')[0] +
          'Z';
        delete queryParams.createdOnBefore;
        delete queryParams.createdOnType;
      }
      //queryParams.createdOnBefore = new Date(queryParams.createdOnBefore).toISOString().split('.')[0] + 'Z';
    }
    if (queryParams.createdOnAfter) {
      if (this.filterData.length > 0 && this.filterData[0]['filterId'] == 10) {
        this.tmpFilterData.createdOnAfter =
          new Date(queryParams.createdOnAfter).toISOString().split('.')[0] +
          'Z';
        delete queryParams.createdOnAfter;
      }
      //queryParams.createdOnAfter = new Date(queryParams.createdOnAfter).toISOString().split('.')[0] + 'Z';
    }
    if (queryParams.createdOn) {
      if (this.filterData.length > 0 && this.filterData[0]['filterId'] == 10) {
        this.tmpFilterData.createdOn =
          new Date(queryParams.createdOn).toISOString().split('.')[0] + 'Z';
        this.tmpFilterData.createdOnType = queryParams.createdOnType;
        delete queryParams.createdOn;
        delete queryParams.createdOnType;
      }
      //queryParams.createdOn = new Date(queryParams.createdOn).toISOString().split('.')[0] + 'Z';
    }
    //if (queryParams.dateFrom) {
    //    if (this.filterData.length > 0 && this.filterData[0]["filterId"] == 10) {
    //        this.tmpFilterData.dateFrom = new Date(queryParams.dateFrom).toISOString().split('.')[0] + 'Z';
    //        //delete queryParams.dateFrom;
    //        //delete queryParams.dueDateType;
    //    }
    //}
    //if (queryParams.dateTo) {
    //    if (this.filterData.length > 0 && this.filterData[0]["filterId"] == 10) {
    //        this.tmpFilterData.dateTo = new Date(queryParams.dateTo).toISOString().split('.')[0] + 'Z';
    //        /*delete queryParams.dateTo;*/
    //    }
    //}
    //if (queryParams.dueDate) {
    //    if (this.filterData.length > 0 && this.filterData[0]["filterId"] == 10) {
    //        this.tmpFilterData.dueDate = new Date(queryParams.dueDate).toISOString().split('.')[0] + 'Z';
    //        this.tmpFilterData.dueDateType = queryParams.dueDateType;
    //        //delete queryParams.dueDate;
    //        //delete queryParams.dueDateType;
    //    }
    //}
    if (this.filterData.length > 0) {
      for (let i = 0; i < this.filterData.length; i++) {
        if (this.filterData[i]['filterId'] == 1) {
          if (
            this.filterData[i]['subchildrange'] != '' &&
            this.filterData[i]['subchildrange'] != null &&
            this.filterData[i]['subchildrange'] != undefined
          ) {
            queryParams['CreatedOnAfter'] = new Date(
              this.filterData[i]['childFilter']
            ).toISOString(); // this.data["createdOnAfter"]
            queryParams['CreatedOnBefore'] = new Date(
              this.filterData[i]['subchildrange']
            ).toISOString(); // this.data["createdOnBefore"]
            queryParams['CreatedOnType'] = 1;
          } else {
            queryParams['createdOn'] = new Date(
              this.filterData[i]['childFilter']
            ).toISOString(); //this.data["createdOn"];
            queryParams['createdOnType'] = this.filterData[i]['createdOnType'];
          }
        } else if (this.filterData[i]['filterId'] == 2) {
          if (
            this.filterData[i]['subchildrange'] != '' &&
            this.filterData[i]['subchildrange'] != null &&
            this.filterData[i]['subchildrange'] != undefined
          ) {
            queryParams['dateFrom'] = new Date(
              this.filterData[i]['childFilter']
            ).toISOString(); // this.data["dateFrom"]
            queryParams['dateTo'] = new Date(
              this.filterData[i]['subchildrange']
            ).toISOString(); // this.data["dateTo"]
            queryParams['dueDateType'] = 1;
          } else {
            queryParams['dueDate'] = new Date(
              this.filterData[i]['childFilter']
            ).toISOString(); //this.data["dueDate"];
            queryParams['dueDateType'] = this.filterData[i]['dueDateType'];
          }
        } else if (this.filterData[i]['filterId'] == 3) {
          queryParams['pastDue'] = this.data['pastDue'];
          //queryParams["CreatedOnType"] = 0;
        } else if (this.filterData[i]['filterId'] == 4) {
          queryParams['completed'] = this.data['completed'];
          //queryParams["CreatedOnType"] = 0;
        } else if (this.filterData[i]['filterId'] == 5) {
          if (this.filterData[i]['filterId'] === 'Product') {
            queryParams['productId'] = this.data['productId'];
          } else {
            queryParams['businessPartnerId'] = this.data['businessPartnerId'];
          }
        } else if (this.filterData[i]['filterId'] == 6) {
          queryParams['presetActivityId'] = this.data['presetActivityId'];
        } else if (this.filterData[i]['filterId'] == 7) {
          queryParams['branchId'] = this.data['branchId'];
        } else if (this.filterData[i]['filterId'] == 8) {
          queryParams['userId'] = this.data['userId'];
        } else if (this.filterData[i]['filterId'] == 9) {
          queryParams['note'] = this.data['note'];
        } else if (this.filterData[i]['filterId'] == 10) {
          const dateFrom = moment().utc().subtract(7, 'days').format();
          const dateTo = moment().utc().format('YYYY-MM-DD');
          this.dateFrom = dateFrom;
          this.dateTo = dateTo;
          queryParams['CreatedOnAfter'] = this.dateFrom;
          queryParams['CreatedOnBefore'] = this.dateTo;
          queryParams['CreatedOnType'] = 1;
        }
      }
    }
    queryParams['type'] = this.displayType;
    queryParams['limit'] = this.taskDashboardLimit;
    queryParams['offset'] = this.offset;
    this.commonService
      .callApi('api/clients/taskDashboard?' + queryParams1, queryParams, 'get')
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.listRecordsTotal = success.total;
          this.taskDashboardMaxPage = Math.floor(
            success.total / this.taskDashboardLimit
          ); // this.limit
          this.listrecords.map((record: any) => {
            record.showBlackListIcon = true;
            record.showBlackChatIcon = false;
            record.showBlackFolderIcon = false;
            if (record.relatedTaskList === null) {
              record.relatedTaskList = [];
            }
          });
          setTimeout(() => {
            if (this.listrecords.length > 0) {
              var ele = document.getElementById(
                `th-table-descp`
              ) as HTMLElement;
              var mainWidth = ele.offsetWidth;
              this.setProperWidth(mainWidth);
            }
          }, 3000);
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
    if (terminate) {
      let tempconfig: any = {};
      if (this.selectedFilterValue === 1 || this.selectedFilterValue === 2) {
        tempconfig['filterName'] = this.selectedFilterName;
        tempconfig['filterId'] = this.selectedFilterValue;

        if (this.selectedFilterValue === 2) {
          tempconfig['parentFilter'] =
            'Due Date ' + this.filterDataNew.bindedValue.title;
        } else {
          tempconfig['parentFilter'] = 'Date ';
        }
        tempconfig['secondFilter'] = this.filterDataNew.bindedValue.title;
        tempconfig['childFilter'] = this.startDateFrom;
        tempconfig['subchildrange'] = this.startDateTo;
        if (this.startDateTo == '') {
          if (this.selectedFilterValue === 2) {
            tempconfig['dueDateType'] = this.tmpFilterData.dueDateType;
            delete this.tmpFilterData.dueDate;
            delete this.tmpFilterData.dueDateType;
          } else {
            tempconfig['createdOnType'] = this.tmpFilterData.createdOnType;
            delete this.tmpFilterData.createdOn;
            delete this.tmpFilterData.createdOnType;
          }
        }
        tempconfig['selectedObj'] = this.filterDataNew;
        if (this.monthFrom || this.monthTo) {
          tempconfig['childFilter'] = this.monthFrom;
          tempconfig['subchildrange'] = this.monthTo;
          if (this.selectedFilterValue === 2) {
            tempconfig['parentFilter'] =
              'Due Month ' + this.filterDataNew.bindedValue.title;
          } else {
            tempconfig['parentFilter'] =
              'Date Month ' + this.filterDataNew.bindedValue.title;
          }
        }
        if (this.yearFrom || this.yearTo) {
          tempconfig['childFilter'] = this.yearFrom;
          tempconfig['subchildrange'] = this.yearTo;
          if (this.selectedFilterValue === 2) {
            tempconfig['parentFilter'] =
              'Due Year ' + this.filterDataNew.bindedValue.title;
          } else {
            tempconfig['parentFilter'] =
              'Date Year ' + this.filterDataNew.bindedValue.title;
          }
        }
        this.filterData.push(tempconfig);
        this.filterIReport = false;
        this.isFilterOpen = false;
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.selectedFilterValue);
        this.filterDataNew = {};
        this.filterstart.splice(0, index + 1);
        this.selectedFilterValue = 0;
      } else if (this.selectedFilterValue === 3) {
        tempconfig['filterName'] = this.selectedFilterName;
        tempconfig['filterId'] = this.selectedFilterValue;
        tempconfig['parentFilter'] = this.selectedFilterName;
        tempconfig['childFilter'] = this.filterDataNew.pastDue;
        tempconfig['selectedObj'] = this.filterDataNew.pastDue;

        this.filterData.push(tempconfig);
        this.filterDataNew = {};
        this.filterIReport = false;
        this.isFilterOpen = false;
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.selectedFilterValue);
        this.filterstart.splice(0, index + 1);
        this.selectedFilterValue = 0;
      } else if (this.selectedFilterValue === 4) {
        tempconfig['filterName'] = this.selectedFilterName;
        tempconfig['filterId'] = this.selectedFilterValue;
        tempconfig['parentFilter'] = this.selectedFilterName;
        tempconfig['selectedObj'] = this.filterDataNew.completed;
        this.filterData.push(tempconfig);
        this.filterDataNew = {};
        this.filterIReport = false;
        this.isFilterOpen = false;
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.selectedFilterValue);
        this.filterstart.splice(0, index + 1);
        this.selectedFilterValue = 0;
      } else if (this.selectedFilterValue === 5) {
        tempconfig['filterName'] = this.selectedFilterName;
        tempconfig['filterId'] = this.selectedFilterValue;
        tempconfig['parentFilter'] = this.selectedFilterName;
        tempconfig['childFilter'] = this.filterDataNew.type.title;
        if (this.filterDataNew.type.title === 'Product') {
          tempconfig['selectedObj'] = this.filterDataNew.productId.title;
        } else {
          tempconfig['selectedObj'] =
            this.filterDataNew.businessPartnerId.title;
        }
        this.filterData.push(tempconfig);
        this.filterDataNew = {};
        this.filterIReport = false;
        this.isFilterOpen = false;
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.selectedFilterValue);
        this.filterstart.splice(0, index + 1);
        this.selectedFilterValue = 0;
      } else if (this.selectedFilterValue === 6) {
        tempconfig['filterName'] = this.selectedFilterName;
        tempconfig['filterId'] = this.selectedFilterValue;
        tempconfig['parentFilter'] = 'Title ';
        tempconfig['childFilter'] = this.filterDataNew.presetActivityId.title;
        tempconfig['selectedObj'] = this.filterDataNew.presetActivityId.title;

        this.filterData.push(tempconfig);
        this.filterDataNew = {};
        this.filterIReport = false;
        this.isFilterOpen = false;
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.selectedFilterValue);
        this.filterstart.splice(0, index + 1);
        this.selectedFilterValue = 0;
      } else if (this.selectedFilterValue === 7) {
        tempconfig['filterName'] = this.selectedFilterName;
        tempconfig['filterId'] = this.selectedFilterValue;
        tempconfig['parentFilter'] = this.selectedFilterName;
        tempconfig['childFilter'] = this.filterDataNew.branchId.title;
        tempconfig['selectedObj'] = this.filterDataNew.branchId.title;

        this.filterData.push(tempconfig);
        this.filterDataNew = {};
        this.filterIReport = false;
        this.isFilterOpen = false;
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.selectedFilterValue);
        this.filterstart.splice(0, index + 1);
        this.selectedFilterValue = 0;
      } else if (this.selectedFilterValue === 8) {
        tempconfig['filterName'] = this.selectedFilterName;
        tempconfig['filterId'] = this.selectedFilterValue;
        tempconfig['parentFilter'] = this.selectedFilterName;
        tempconfig['childFilter'] = this.filterDataNew.assignedTo.title;
        tempconfig['selectedObj'] = this.filterDataNew.assignedTo.title;

        this.filterData.push(tempconfig);
        this.filterDataNew = {};
        this.filterIReport = false;
        this.isFilterOpen = false;
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.selectedFilterValue);
        this.filterstart.splice(0, index + 1);
        this.selectedFilterValue = 0;
      } else if (this.selectedFilterValue === 9) {
        tempconfig['filterName'] = this.selectedFilterName;
        tempconfig['filterId'] = this.selectedFilterValue;
        tempconfig['parentFilter'] = this.selectedFilterName;
        tempconfig['childFilter'] = this.filterDataNew.note;
        tempconfig['selectedObj'] = this.filterDataNew.note;

        this.filterData.push(tempconfig);
        this.filterDataNew = {};
        this.filterIReport = false;
        this.isFilterOpen = false;
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.selectedFilterValue);
        this.filterstart.splice(0, index + 1);
        this.selectedFilterValue = 0;
      } else if (this.selectedFilterValue === 10) {
        tempconfig['filterName'] = 'L7D';
        tempconfig['filterId'] = 10;
        tempconfig['parentFilter'] = 'Date ';
        tempconfig['childFilter'] = 'L7D';
        this.filterData.push(tempconfig);
        this.filterDataNew = {};
        this.filterIReport = false;
        this.isFilterOpen = false;
        this.filterstart = this.filterstart.filter((X) => X.id != 10);
        this.selectedFilterValue = 0;
      }
    }
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

  /*****************************************************
  @purpose : After selecing the dates 
  @parameters : 
  @return :
  *****************************************************/
  modelDatepickerDate(event, type, dateType) {
    this.addDayClass = false;
    this.isFilterOpen = false;
    $('#minDatepicker :input').blur();
    $('#maxDatepicker :input').blur();
    if (this.filterDataNew.date && !this.filterDataNew.enddate) {
      this.startDateFrom = moment.utc(event).format();
      this.startDateFrom = moment.utc(event).format();

      delete this.data.ts;
      delete this.data.offset;

      if (dateType == 'date') {
        this.data['createdOnType'] = '0';
        this.data['createdOn'] = this.startDateFrom;
      } else {
        this.data['dueDateType'] = '0';
        this.data['dueDate'] = this.startDateFrom;
      }
      this.data['type'] = this.displayType;
      this.applyFilter(this.data, 'end');
    } else {
      if (type == 'specific') {
        this.startDateFrom = moment.utc(event).format();
        if (dateType == 'date') {
          this.data['createdOnType'] = '1';
          this.data['createdOnAfter'] = this.startDateFrom;
        } else {
          this.data['dueDateType'] = '1';
          this.data['dateFrom'] = this.startDateFrom;
        }
      } else {
        this.startDateTo = moment.utc(event).format();
        if (dateType == 'date') {
          this.data['createdOnType'] = '1';
          this.data['createdOnBefore'] = this.startDateTo;
        } else {
          this.data['dueDateType'] = '1';
          this.data['dateTo'] = this.startDateTo;
        }
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
  modelDatepickerMonth(event, type, dateType) {
    $('#minMonthDatepicker :input').blur();
    $('#maxMonthDatepicker :input').blur();
    if (this.filterDataNew.month && !this.filterDataNew.endmonth) {
      var date = event,
        y = date.getFullYear(),
        m = date.getMonth();
      this.monthFrom = moment.utc(event).format();
      var lastDay = new Date(y, m + 1, 0);
      this.monthTo = moment.utc(lastDay).format();

      //this.data['monthFrom'] = this.monthFrom;
      if (dateType == 'date') {
        this.data['createdOnType'] = '1';
        this.data['createdOnAfter'] = this.monthFrom;
        this.data['createdOnBefore'] = this.monthTo;
      } else {
        this.data['dueDateType'] = '1';
        this.data['dateFrom'] = this.monthFrom;
        this.data['dateTo'] = this.monthTo;
      }

      this.applyFilter(this.data, 'end');
    } else {
      if (type == 'specific') {
        this.monthFrom = moment.utc(event).format();
        if (dateType == 'date') {
          this.data['createdOnType'] = '1';
          this.data['createdOnAfter'] = this.monthFrom;
        } else {
          this.data['dueDateType'] = '1';
          this.data['dateFrom'] = this.monthFrom;
        }
      } else {
        // this.monthTo = moment.utc(event).format();
        var date = event,
          y = date.getFullYear(),
          m = date.getMonth();
        var lastDay = new Date(y, m + 1, 0);
        this.monthTo = moment.utc(lastDay).format();
        //this.data['monthTo'] = this.monthTo;
        if (dateType == 'date') {
          this.data['createdOnType'] = '1';
          this.data['createdOnBefore'] = this.monthTo;
        } else {
          this.data['dueDateType'] = '1';
          this.data['dateTo'] = this.monthTo;
        }
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
  modelDatepickerYear(event, type, dateType) {
    $('#minyearDatepicker :input').blur();
    $('#maxyearDatepicker :input').blur();
    if (this.filterDataNew.year && !this.filterDataNew.endyear) {
      var date = event,
        y = date.getFullYear(),
        m = date.getMonth();
      var lastDay = new Date(y, 0, 1);
      this.yearFrom = moment.utc(lastDay).format();

      var lastDayYear = new Date(y + 1, 0, 0);
      this.yearTo = moment.utc(lastDayYear).format();
      //this.data['yearFrom'] = this.yearFrom;
      if (dateType == 'date') {
        this.data['createdOnType'] = '1';
        this.data['createdOnAfter'] = this.yearFrom;
        this.data['createdOnBefore'] = this.yearTo;
      } else {
        this.data['dueDateType'] = '1';
        this.data['dateFrom'] = this.yearFrom;
        this.data['dateTo'] = this.yearTo;
      }

      this.applyFilter(this.data, 'end');
    } else {
      if (type == 'specific') {
        var date = event,
          y = date.getFullYear(),
          m = date.getMonth();
        var lastDay = new Date(y, 0, 1);
        this.yearFrom = moment.utc(lastDay).format();
        // this.yearFrom = moment.utc(event).format();
        //this.data['yearFrom'] = this.yearFrom;
        if (dateType == 'date') {
          this.data['createdOnType'] = '1';
          this.data['createdOnAfter'] = this.yearFrom;
        } else {
          this.data['dueDateType'] = '1';
          this.data['dateFrom'] = this.yearFrom;
        }
      } else {
        // this.yearTo = moment.utc(event).format();
        var date = event,
          y = date.getFullYear(),
          m = date.getMonth();
        var lastDay = new Date(y, 11, 31);
        this.yearTo = moment.utc(lastDay).format();

        //this.data['yearTo'] = this.yearTo;
        if (dateType == 'date') {
          this.data['createdOnType'] = '1';
          this.data['createdOnBefore'] = this.yearTo;
        } else {
          this.data['dueDateType'] = '1';
          this.data['dateTo'] = this.yearTo;
        }
      }

      if (this.yearFrom && this.yearTo) {
        this.applyFilter(this.data, 'end');
      }
    }
  }

  //onScrollDown(ev) {
  //    if (this.memopage < this.memomaxPage) {
  //        this.memopage++;
  //        this.memooffset = this.memopage * this.memolimit;
  //        this.getMemos(null);
  //    }
  //}

  getHeight() {
    return window.innerHeight - 150 + 'px';
    //return window.innerHeight - document.getElementById("reports-wrapper-div").offsetTop - document.getElementById("reports-footer").offsetHeight - 140 + 'px';
  }
  /*****************************************************
      @purpose : To display changes when any sub filter is selected
      @parameters : 
      @return :
      @author : Ketan Solanki (Techuz)
      *****************************************************/

  changeNewSubFilter(data) {
    this.filterDataNew.options.map((el: any) => {
      el.class = '';
    });
    data.class = 'active';
    this.showMonthsLIsting = false;
    this.monthsListingArray = [];
    this.showYearsListing = false;
    this.yearsListingArray = [];
    this.filterDataNew.date = false;
    this.filterDataNew.enddate = false;
    this.addDayClass = false;
    if (data.id == 1) {
      this.addDayClass = true;
      this.monthFrom = '';
      this.monthTo = '';
      this.yearFrom = '';
      this.yearTo = '';
      this.startDateFrom = '';
      this.startDateTo = '';
      this.filterDataNew.date = true;
      this.filterDataNew.enddate = false;
      this.filterDataNew.month = false;
      this.filterDataNew.endmonth = false;
      this.filterDataNew.year = false;
      this.filterDataNew.endyear = false;
      this.filterDataNew.dateValue = '';
      this.showMonthsLIsting = false;
      this.monthsListingArray = [];
    } else if (data.id == 3) {
      this.addDayClass = true;
      this.showMonthsLIsting = true;
      var dateStart = moment().subtract(3, 'years');
      var dateEnd = moment();
      while (
        dateEnd > dateStart ||
        dateStart.format('M') === dateEnd.format('M')
      ) {
        this.monthsListingArray.push(dateStart.format('MMMM, YYYY'));
        dateStart.add(1, 'month');
      }
      this.monthsListingArray = this.monthsListingArray.reverse();
    } else if (data.id == 4) {
      this.addDayClass = true;
      this.showMonthsLIsting = false;
      this.monthsListingArray = [];
      this.showYearsListing = true;
      const years = (back) => {
        const year = new Date().getFullYear();
        return Array.from({ length: back }, (v, i) => year - back + i + 1);
      };
      this.yearsListingArray = years(3).reverse();
    } else {
      this.showMonthsLIsting = false;
      this.monthsListingArray = [];
    }
  }
  applySelectedMOnthFilter(data) {
    let obtainedDate = moment(data, 'MMMM, YYYY');
    this.startDateFrom = obtainedDate.clone().startOf('month').format();
    this.startDateTo = obtainedDate.clone().endOf('month').format();
    let queryParams: any = {
      createdOnAfter: this.startDateFrom,
      createdOnBefore: this.startDateTo,
      type: this.displayType,
      createdOnType: 1,
    };
    if (this.startDateFrom && this.startDateTo) {
      this.applyFilter(queryParams, 'end');
      this.isFilterOpen = false;
    }
  }
  applySelectedYearFilter(data) {
    this.addDayClass = false;
    let obtainedDate = moment(data, 'YYYY');
    this.startDateFrom = obtainedDate.clone().startOf('year').format();
    if (moment(data, 'YYYY').isSame(new Date(), 'year') === true) {
      this.startDateTo = moment().format();
    } else {
      this.startDateTo = obtainedDate.clone().endOf('year').format();
    }
    let queryParams: any = {
      createdOnAfter: this.startDateFrom,
      createdOnBefore: this.startDateTo,
      type: this.displayType,
      createdOnType: 1,
    };
    if (this.startDateFrom && this.startDateTo) {
      this.applyFilter(queryParams, 'end');
      this.isFilterOpen = false;
    }
  }
  filterDashboardData(type) {
    this.selectedTab = type;
    console.log('selected---', type);
    if (type == 5) {
      this.listrecords = this.tempcurrentListRecords;
      return;
    } else if (type == 6) {
      this.listrecords = this.tempPlannedListRecords;
      return;
    }
    this.listrecords = [];
    this.displayType = type;
    let queryParams: any = {
      type: this.displayType,
      CreatedOnType: 0,
    };
    if (this.filterData.length > 0) {
      if (this.filterData[0]['filterId'] == 10) {
        const dateFrom = moment().utc().subtract(7, 'days').format();
        const dateTo = moment().utc().format();
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        queryParams['CreatedOnAfter'] = this.dateFrom;
        queryParams['CreatedOnBefore'] = this.dateTo;
        queryParams['CreatedOnType'] = 1;
      } else if (this.filterData[0]['filterId'] == 4) {
        queryParams['completed'] = true;
        queryParams['CreatedOnType'] = 0;
      } else if (this.filterData[0]['filterId'] == 3) {
        queryParams['pastDue'] = true;
        queryParams['CreatedOnType'] = 0;
      }
    }
    this.applyFilter(queryParams);
  }
  dropdownClose() {
    this.showId = 0;
    this.flagIsProgressRevert = 0;
    this.progressinfo = false;
    this.revertinfo = false;
    this.updateProgressionStatus = false;
    this.undoButtonVisible = false;
    this.undoButtonAPIReady = false;
  }
  subDropdownClose() {
    this.subShowId = 0;
    this.flagIsProgressRevert = 0;
    this.progressinfo = false;
    this.revertinfo = false;
    this.updateProgressionStatus = false;
    this.undoButtonVisible = false;
    this.undoButtonAPIReady = false;
  }
  dropdownClick(id) {
    this.showId = this.showId == 0 ? id : 0;
  }
  progressClick() {
    this.progressinfo = !this.progressinfo;
  }
  progressClose() {
    this.progressinfo = false;
  }
  ChangeSubTaskStatusClose(i, k, listRecordIndex?) {
    this.progressinfo = false;
    this.undoButtonVisible = true;
    this.commonService
      .callApi('api/clients/subtask/' + k + '/progress/', k, 'patch')
      .then((success) => {
        this.undoButtonAPIReady = true;
        setTimeout(() => {
          this.undoClose(i, listRecordIndex);
        }, 3500);
      })
      .catch((e) => {
        this.undoClose(i, listRecordIndex);
        console.log('there is an error:', e);
      });
  }
  revertClick() {
    this.revertinfo = !this.revertinfo;
  }
  revertClose() {
    this.revertinfo = false;
  }
  progressRevertClick(record, status, flag, j) {
    this.undoOldStatus = flag;
    this.undoNewStatus = status;
    this.undoButtonClicked = 0;
    if (status - flag == 1) {
      // this.revertClick();
      this.ChangeSubTaskStatusRevertClose(record.taskId, record.subTaskId, j);
    } else if (status - flag == -1) {
      // this.progressClick();
      this.ChangeSubTaskStatusClose(record.taskId, record.subTaskId, j);
    } else if (status - flag != 0) {
      // this.updateStatusClick(flag);
      this.changeSubTaskStatusUpdateClose(
        record.taskId,
        record.subTaskId,
        flag,
        j
      );
    } else {
      this.dropdownClose();
    }
  }
  notificationsCalendorStatistics(flag) {
    this.showStatistics = flag !== 'Calendar';
    this.showNotifications = flag !== 'Calendar';
    this.showCalendar = flag == 'Calendar';
  }
  undoClose(i, listRecordIndex) {
    if (this.undoButtonVisible) {
      this.dropdownClose();
    }
    if (
      this.undoButtonClicked == 0 &&
      listRecordIndex != null &&
      listRecordIndex != undefined
    ) {
      this.commonService
        .callApi('api/clients/taskDashboard/' + i, null, 'get')
        .then((success) => {
          this.listrecords[listRecordIndex] = success;
          this.listrecords[listRecordIndex].showBlackListIcon = true;
          this.listrecords[listRecordIndex].showBlackChatIcon = false;
          this.listrecords[listRecordIndex].showBlackFolderIcon = false;
          if (this.listrecords[listRecordIndex].relatedTaskList === null) {
            this.listrecords[listRecordIndex].relatedTaskList = [];
          }
        })
        .catch((e) => {
          console.log('there is an error:', e);
        });
    }
  }
  undoToOldStatus(record, status, flag, j) {
    this.undoNewStatus = this.undoOldStatus = -1;
    if (this.undoButtonAPIReady) {
      this.undoButtonClicked += 1;
      if (status - flag == 1 && this.undoButtonClicked == 1) {
        // this.revertClick(); // For revert confirmation box
        // We are directly Calling API, will show Undo button after the change
        this.ChangeSubTaskStatusRevertClose(record.taskId, record.subTaskId, j);
      } else if (status - flag == -1 && this.undoButtonClicked == 1) {
        // this.progressClick(); // For Progress confirmation box
        this.ChangeSubTaskStatusClose(record.taskId, record.subTaskId, j);
      } else if (status - flag != 0 && this.undoButtonClicked == 1) {
        // this.updateStatusClick(flag); // For Update Confirmation box
        this.changeSubTaskStatusUpdateClose(
          record.taskId,
          record.subTaskId,
          flag,
          j
        );
      } else {
        this.dropdownClose();
      }
    }
  }
  updateStatusClick(status) {
    this.updateProgressionStatus = !this.updateProgressionStatus;
    this.statusClickedForUpdate = status;
  }
  updateStatusClose() {
    this.updateProgressionStatus = false;
  }
  changeSubTaskStatusUpdateClose(i, k, status, listRecordIndex?) {
    this.updateProgressionStatus = false;
    this.undoButtonVisible = true;
    this.commonService
      .callApi('api/clients/subtask/' + k + '/' + status, k, 'patch')
      .then((success) => {
        this.undoButtonAPIReady = true;
        setTimeout(() => {
          this.undoClose(i, listRecordIndex);
        }, 3500);
      })
      .catch((e) => {
        this.undoClose(i, listRecordIndex);
        console.log('there is an error:', e);
      });
  }
  ChangeSubTaskStatusRevertClose(i, k, listRecordIndex?) {
    this.revertinfo = false;
    this.undoButtonVisible = true;
    this.commonService
      .callApi('api/clients/subtask/' + k + '/revert/', k, 'patch')
      .then((success) => {
        this.undoButtonAPIReady = true;
        setTimeout(() => {
          this.undoClose(i, listRecordIndex);
        }, 3500);
      })
      .catch((e) => {
        this.undoClose(i, listRecordIndex);
        console.log('there is an error:', e);
      });
  }
  openQueryTaskPopup(data, queryTaskPopup: TemplateRef<any>) {
    this.setAddTaskQueryForm();
    this.queryTaskData = data;
    this.modalRef = this.modalService.show(queryTaskPopup, {
      class: 'modal-dialog-centered quick-popup query-popup',
    });
    let queryDescription = document.getElementById('queryDescription');
    queryDescription.focus();
  }
  setAddTaskQueryForm() {
    this.addTaskQueryForm = new FormGroup({
      taskDetailText: new FormControl('', [Validators.required]),
    });
  }
  addTaskQuery() {
    if (this.addTaskQueryForm.valid) {
      this.addTaskQueryForm.setErrors({ invalid: true });
      let sendingData: any = {
        CRMTaskId: this.queryTaskData.taskId,
        CRMSubTaskId: this.queryTaskData.subTaskId,
        TaskDetailType: 2,
        TaskDetailText: this.addTaskQueryForm.value.taskDetailText,
      };
      this.commonService
        .callApi('api/clients/addTaskDetail', sendingData, 'post')
        .then((success) => {
          if (success) {
            this.modalRef.hide();
            this.fetchQueryDetails(this.queryTaskData.taskId);
            this.queryTaskData = {};
            this.addTaskQueryForm.setErrors(null);
            this.addTaskQueryForm.reset();
          } else {
            this.popToast('error', success.message);
          }
        })
        .catch((e) => {
          console.log('there is an error:', e);
        });
    }
  }
  fetchQueryDetails(taskId) {
    this.commonService
      .callApi(`api/clients/taskDashboard/${taskId}`, {}, 'get')
      .then((success) => {
        if (success) {
          let itemIndex = this.listrecords.findIndex(
            (item: any) => item.taskId == taskId
          );
          this.listrecords[itemIndex]['board'] = success.board;
          this.listrecords[itemIndex]['description'] = success.description;
          this.listrecords[itemIndex]['id'] = success.id;
          this.listrecords[itemIndex]['interactionBy'] = success.interactionBy;
          this.listrecords[itemIndex]['interactionOn'] = success.interactionOn;
          this.listrecords[itemIndex]['newStatus'] = success.newStatus;
          this.listrecords[itemIndex]['previousStatus'] =
            success.previousStatus;
          this.listrecords[itemIndex]['queryDetailString'] =
            success.queryDetailString;
          this.listrecords[itemIndex]['relatedTaskList'] =
            success.relatedTaskList;
          this.listrecords[itemIndex]['subTaskId'] = success.subTaskId;
          this.listrecords[itemIndex]['taskId'] = success.taskId;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  openTaskChatPopup(data, taskChatPopup: TemplateRef<any>) {
    this.setAddTaskChatForm();
    this.commonService
      .callApi(
        'api/clients/getTaskDetailsforType/' +
          data.taskId +
          '/3/' +
          data.subTaskId,
        '',
        'get'
      )
      .then((success) => {
        if (success && Object.keys(success).length !== 0) {
          success = success[0];
          success.board = success.boardName;
          success.description = success.taskDescription;
          success.taskId = data.taskId;
          success.subTaskId = data.subTaskId;
          this.taskChatData = success;
        } else {
          data['listOfDetails'] = [];
          this.taskChatData = data;
          // this.popToast("error", success.message);
        }
        setTimeout(() => {
          this.modalRef = this.modalService.show(taskChatPopup, {
            class: 'modal-dialog-centered quick-popup query-popup',
          });
          let taskChatDetailText =
            document.getElementById('taskChatDetailText');
          taskChatDetailText.focus();
        }, 1000);
      })
      .catch((e) => {
        data['listOfDetails'] = [];
        this.taskChatData = data;
        setTimeout(() => {
          this.modalRef = this.modalService.show(taskChatPopup, {
            class: 'modal-dialog-centered quick-popup query-popup',
          });
        }, 1000);
        console.log('there is an error:', e);
      });
  }
  updateTaskChat(data) {
    this.commonService
      .callApi(
        'api/clients/getTaskDetailsforType/' +
          data.taskId +
          '/3/' +
          data.subTaskId,
        '',
        'get'
      )
      .then((success) => {
        if (success && Object.keys(success).length !== 0) {
          success = success[0];
          success.board = success.boardName;
          success.description = success.taskDescription;
          success.taskId = data.taskId;
          success.subTaskId = data.subTaskId;
          this.taskChatData = success;
        } else {
          data['listOfDetails'] = [];
          this.taskChatData = data;
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        data['listOfDetails'] = [];
        this.taskChatData = data;
        console.log('there is an error:', e);
      });
  }
  setAddTaskChatForm() {
    this.addTaskChatForm = new FormGroup({
      taskDetailText: new FormControl('', [Validators.required]),
    });
  }
  addTaskChat() {
    if (this.addTaskChatForm.valid) {
      this.addTaskChatForm.setErrors({ invalid: true });
      let sendingData: any = {
        CRMTaskId: this.taskChatData.taskId,
        CRMSubTaskId: this.taskChatData.subTaskId,
        TaskDetailType: 3,
        TaskDetailText: this.addTaskChatForm.value.taskDetailText,
      };
      this.commonService
        .callApi('api/clients/addTaskDetail', sendingData, 'post')
        .then((success) => {
          if (success) {
            this.updateTaskChat(this.taskChatData);
            this.addTaskChatForm.setErrors(null);
            this.addTaskChatForm.reset();
          } else {
            this.popToast('error', success.message);
          }
        })
        .catch((e) => {
          console.log('there is an error:', e);
        });
    }
  }
  resetChatData() {
    let itemIndex = this.listrecords.findIndex(
      (item: any) => item.taskId == this.taskChatData.taskId
    );
    this.getChatDetails(
      this.taskChatData.taskId,
      this.taskChatData.subTaskId,
      this.listrecords[itemIndex]
    );
    this.taskChatData = {};
  }
  public handleCopy = (event: ClipboardEvent) => {
    var item = Array.from(event.clipboardData.items).find((x) =>
      /^image\//.test(x.type)
    );
    var blob = item.getAsFile();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (events: any) => {
      const file = blob;
      this.fileList.push(file);
      this.uploadedFileSource = events.target.result;
      let tempArray: any = {};
      tempArray.showLoader = true;
      tempArray.src = events.target.result;
    };
  };
  openAddTaskDetailsPopup(data, addTaskDetailsPopup: TemplateRef<any>) {
    this.setAddTaskDetailsForm();
    this.addTaskData = data;
    this.modalRef = this.modalService.show(addTaskDetailsPopup, {
      class: 'modal-dialog-centered quick-popup query-popup',
    });
    let taskDetailImageText = document.getElementById('taskDetailImageText');
    taskDetailImageText.focus();
    window.addEventListener('paste', this.handleCopy.bind(event), false);
  }
  showWorkspaceSelection() {
    this.isWorkspaceSelection = !this.isWorkspaceSelection;
  }
  setAddTaskDetailsForm() {
    this.addTaskDetailsForm = new FormGroup({
      taskDetailText: new FormControl('', [Validators.required]),
    });
  }
  addTaskDetailsImage(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files && event.target.files[i]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (events: any) => {
          const file = event.target.files[i];
          this.fileList.push(file);
          this.uploadedFileSource = events.target.result;
          let tempArray: any = {};
          tempArray.showLoader = true;
          tempArray.src = events.target.result;
        };
      }
    }
  }
  addTaskDetails() {
    if (this.addTaskDetailsForm.valid) {
      this.addTaskDetailsForm.setErrors({ invalid: true });
      let sendingData: any = {
        CRMTaskId: this.addTaskData.taskId,
        CRMSubTaskId: this.addTaskData.subTaskId,
        TaskDetailType: 1,
        TaskDetailText: this.addTaskDetailsForm.value.taskDetailText,
      };
      this.commonService
        .callApi('api/clients/addTaskDetail', sendingData, 'post')
        .then((success) => {
          if (success) {
            if (this.fileList.length > 0) {
              this.saveAddTaskDetailsImage(
                this.addTaskData.taskId,
                this.addTaskData.subTaskId,
                success
              );
            } else {
              this.addTaskData = {};
              this.addTaskDetailsForm.setErrors(null);
              let data: any = {};
              this.getTaskDetails(
                this.addTaskData.taskId,
                this.addTaskData.subTaskId,
                data,
                true
              );
              this.modalRef.hide();
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
  saveAddTaskDetailsImage(taskId, subTaskId, detailId) {
    if (this.fileList.length > 0) {
      this.fileList.map((file: any) => {
        let formData: FormData = new FormData();
        formData.append('file', file);
        this.commonService
          .callApi(
            `api/clients/taskDetail/uploadFile/${taskId}/${subTaskId}/${detailId}`,
            formData,
            'post',
            true
          )
          .then((success) => {
            this.addTaskData = {};
            this.addTaskDetailsForm.setErrors(null);
            this.fileList = [];
            let data: any = {};
            this.getTaskDetails(taskId, subTaskId, data, true);
            this.uploadedFileSource = '';
            this.modalRef.hide();
          });
      });
    }
  }
  getChatDetails(taskId, subTaskId, data) {
    this.commonService
      .callApi(
        'api/clients/getTaskDetailsforType/' + taskId + '/3/' + subTaskId,
        '',
        'get'
      )
      .then((success) => {
        if (success && Object.keys(success).length !== 0) {
          data.chatData = success[0];
        } else {
          data.chatData = [];
        }
      })
      .catch((e) => {
        data.chatData = [];
        console.log('there is an error:', e);
      });
  }
  getTaskDetails(taskId, subTaskId, data, update?) {
    this.commonService
      .callApi(
        'api/clients/getTaskDetailsforType/' + taskId + '/1/' + subTaskId,
        '',
        'get'
      )
      .then((success) => {
        if (success && Object.keys(success).length !== 0) {
          if (!update) {
            data.detailsData = success[0];
            if (
              data.detailsData.listOfDetails &&
              data.detailsData.listOfDetails.length > 0
            ) {
              data.detailsData.listOfDetails.map((details: any) => {
                if (details.image) {
                  this.commonService
                    .callApi(
                      'api/clients/notes/retriveNotesImage?name=' +
                        details.image,
                      '',
                      'get'
                    )
                    .then((success) => {
                      if (success) {
                        details.src = success;
                      } else {
                        details.src = '';
                      }
                    });
                }
              });
            }
          } else {
            this.listrecords.map((record: any) => {
              if (record.taskId === taskId) {
                record.detailsData = success[0];
                if (
                  record.detailsData.listOfDetails &&
                  record.detailsData.listOfDetails.length > 0
                ) {
                  record.detailsData.listOfDetails.map((details: any) => {
                    if (details.image) {
                      this.commonService
                        .callApi(
                          'api/clients/notes/retriveNotesImage?name=' +
                            details.image,
                          '',
                          'get'
                        )
                        .then((success) => {
                          if (success) {
                            details.src = success;
                          } else {
                            details.src = '';
                          }
                        });
                    }
                  });
                }
              }
            });
          }
        } else {
          data.chatData = [];
        }
      })
      .catch((e) => {
        data.chatData = [];
        console.log('there is an error:', e);
      });
  }
  iconClck() {
    let x = document.getElementsByClassName('is-open');
    if (x.length > 0) {
      x[0].classList.remove('is-open');
    }
  }
  checkAndCloseOtherOpen(trid) {
    setTimeout(() => {
      let x = document.getElementsByClassName('is-open');
      let elements = document.getElementsByClassName('is-open');
      for (let i = 0; i < elements.length; i++) {
        if (elements[i]) {
          elements[i].classList.remove('is-open');
          if (trid != elements[i].id) {
            elements[i].classList.add('is-open');
          }
        }
      }
    }, 500);
  }
  openTaskDetailsView(parentData, data, addTaskDetailsViewsPopup) {
    data.board = parentData.board;
    data.description = parentData.description;
    this.taskDetailsViewData = data;
    this.modalRef = this.modalService.show(addTaskDetailsViewsPopup, {
      class: 'modal-dialog-centered quick-popup task-detail-view-popup',
    });
  }
  checkActivenesList(data) {
    setTimeout(() => {
      data.showBlackChatIcon = false;
      data.showBlackFolderIcon = false;
      data.showBlackListIcon = true;
    }, 100);
  }
  checkActivenesChat(data) {
    setTimeout(() => {
      data.showBlackListIcon = false;
      data.showBlackFolderIcon = false;
      data.showBlackChatIcon = true;
    }, 100);
  }
  checkActivenesDetails(data) {
    setTimeout(() => {
      data.showBlackChatIcon = false;
      data.showBlackListIcon = false;
      data.showBlackFolderIcon = true;
    }, 100);
  }
  calendarConfig() {
    this.todays_date = new Date();
    this.bsConfig = Object.assign(
      {},
      {
        containerClass: 'custom-picker theme-white theme-green',
        adaptivePosition: true,
        dateInputFormat: 'MM DD,YYYY',
      }
    );
  }
  validateValue(event) {
    if (event >= 0 && event <= 23) {
      this.calendar.hourSelection = event;
    } else {
      this.calendar.hourSelection = 0;
    }
  }
  validateMinutesValue(event) {
    if (event >= 0 && event <= 59) {
      this.calendar.minuteSelection = event;
    } else {
      this.calendar.minuteSelection = 0;
    }
  }
  timeClicked(time) {
    let calendarTime = time.time;
    let calTime = calendarTime.split('.');
    this.calendar.time = time.time;
    this.calendar.id = time.id;
    this.calendar.hourSelection = calTime[0];
    this.calendar.minuteSelection = calTime[1];
    this.calendar.description = time.description;
    this.calendar.preparation = time.preparation ? time.preparation : 4;
    this.calendar.timeDuration = time.timeDuration ? time.timeDuration : 4;
    this.calendar.isNew = this.calendar.description ? false : true;
    this.timeSelected = true;
  }
  AddEditEventDescription() {
    this.calendar.time =
      String(this.calendar.hourSelection).padStart(2, '0') +
      '.' +
      String(this.calendar.minuteSelection).padStart(2, '0');
    for (let i = 0; i < this.calendarTimeList.length; i++) {
      if (this.calendarTimeList[i].id == this.calendar.id) {
        this.calendarTimeList[i] = {
          id: this.calendar.id,
          description: this.calendar.description,
          time: this.calendar.time,
          hourSelection: this.calendar.hourSelection,
          minuteSelection: this.calendar.minuteSelection,
          timeDuration: this.calendar.timeDuration,
          preparation: this.calendar.preparation,
          isNew: this.calendar.isNew,
        };
        if (
          Number(this.calendar.minuteSelection) +
            this.calendar.timeDuration * 15 <
          45
        ) {
          let newEvent = {
            id: 100 + Math.floor(Math.random() * 100),
            time:
              String(this.calendar.hourSelection).padStart(2, '0') +
              '.' +
              String(
                Number(this.calendar.minuteSelection) +
                  this.calendar.timeDuration * 15
              ).padStart(2, '0'),
            hourSelection: this.calendar.hourSelection,
            minuteSelection:
              Number(this.calendar.minuteSelection) +
              this.calendar.timeDuration * 15,
            timeDuration: 1,
            preparation: 1,
            description: '',
            isNew: true,
          };
          this.calendarTimeList.splice(i + 1, 0, newEvent);
        }
      }
    }
    this.timeSelected = false;
  }
  calendarValueChange(e, bsConfig) {
    if (!bsConfig.adaptivePosition) {
      let dateSelected = this.datePipe.transform(e, 'MMM d, y');
      let calendarDate = e;
      this.calendarDate = e;
      bsConfig.adaptivePosition = true;
      event.stopPropagation();
    } else {
      bsConfig.adaptivePosition = undefined;
      event.stopPropagation();
    }
  }
  createTaskModal(
    createTask: TemplateRef<any>,
    taskData = null,
    editSubTaskData = {}
  ) {
    let task = this.taskList.find((x) => x.id == taskData.taskId);
    this.taskDetails = {
      taskData: task,
      subTaskData: editSubTaskData,
      listOfTask: this.taskList,
    };
    this.modalRef = this.modalService.show(createTask, {
      class: 'modal-lg task-modal modal-dialog-centered create-task',
      backdrop: 'static',
      keyboard: false,
    });
  }
  updateTheParentGrid(obj) {
    this.calculateProgressInPercentage(obj);
    if (obj.InProgressPercentage == 100) {
      ///Change status = completed
      obj.status = this.TaskProgress.InProgress;
      obj.isCompleted = true;
      this.commonService
        .callApi('api/clients/tasks/' + obj.id + '/changestatus', obj, 'put')
        .then((success) => {})
        .catch((e) => {
          console.log('there is an error:', e);
        });
    } else if (obj.status == this.TaskProgress.InProgress) {
      obj.status = this.TaskProgress.Added;
      this.commonService
        .callApi('api/clients/tasks/' + obj.id + '/changestatus', obj, 'put')
        .then((success) => {})
        .catch((e) => {
          console.log('there is an error:', e);
        });
    }
    obj.classSelect = 'light-gray-bgcolor active is-open';
    let getRecord = this.taskList.find((x) => x.id == obj.id);
    if (getRecord != undefined && getRecord != null) {
      let index = this.taskList.indexOf(getRecord);
      this.taskList[index] = obj;
    }
  }
  refreshTheParentGriddHandler() {}
  closedSubTask() {
    this.modalRef.hide();
    this.taskDashboardLimit = 25;
    this.offset = 0;
    this.listApi(true, false);
  }
  refreshTaskList() {
    var queryParams = 'q=';
    this.commonService.getViewTasksList(queryParams).then((success) => {
      if (success) {
        this.taskList = success.records;
        this.taskList.forEach((element) => {
          element.active = false;
        });
      } else {
        this.popToast('error', success.message);
      }
    });
  }
}
