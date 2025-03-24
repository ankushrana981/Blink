import {
  Component,
  OnInit,
  Injector,
  TemplateRef,
  ElementRef,
  Renderer2,
  ViewChild,
  EventEmitter,
  Output,
  Inject,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
// import { MalihuScrollbarService } from "ngx-malihu-scrollbar";
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, of, concat, timer, Subscription } from 'rxjs';
import * as moment from 'moment';
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
import { NgSelectComponent } from '@ng-select/ng-select';
import { MatInput } from '@angular/material/input';
// import {
//     PerfectScrollbarConfigInterface,
//     PerfectScrollbarComponent,
//     PerfectScrollbarDirective,
// } from "ngx-perfect-scrollbar";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { Location } from "@angular/common";
@Component({
  selector: 'app-view-tasks',
  standalone: false,
  templateUrl: './view-tasks.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')),
  ],
  styleUrls: ['./view-tasks.component.css'],
})
export class ViewTasksComponent extends BaseComponent implements OnInit {
  stop($event: MouseEvent) {
    throw new Error('Method not implemented.');
  }
  modalRef: BsModalRef;
  @ViewChild('tblDivElem') tblDivElem: ElementRef;
  @ViewChild('addNewTskBtn') addNewTskBtn: ElementRef;
  private subscription: Subscription;
  timer$: Observable<number> = timer(0, 6000);
  reset$ = new Subject();
  @ViewChild('secondFilter1') secondFilter: NgSelectComponent;
  @ViewChild('secondFilter1') secondFilter1: ElementRef;
  @ViewChild('notesInput') notesInput: MatInput;
  psConfig: any;
  // @ViewChild("perfectScroll") perfectScroll: PerfectScrollbarComponent;
  @ViewChildren('theadEl') theadEl: QueryList<ElementRef>;
  @ViewChild('filterName') filterName: NgSelectComponent;
  // public config: PerfectScrollbarConfigInterface = {};

  // @ViewChild(PerfectScrollbarComponent)
  // componentRef?: PerfectScrollbarComponent;
  // @ViewChild(PerfectScrollbarDirective)
  // directiveRef?: PerfectScrollbarDirective;
  public type: string = 'component';
  clickCount: number = 0;

  data2: any = [
    {
      title: 'Negotiation - 12346',
      active: false,
      type: 0,
    },
    {
      title: 'Negotiation - 12346',
      active: false,
      type: 0,
    },
    {
      title: 'Negotiation - 12346',
      active: false,
      type: 0,
    },
    {
      title: 'Negotiation - 12346',
      active: false,
      type: 0,
    },
    {
      title: 'abcd',
      active: false,
      type: 0,
    },
    {
      title: 'bcde',
      active: false,
      type: 1,
    },
    {
      title: 'cdbe',
      active: false,
      type: 0,
    },
    {
      title: 'deas',
      active: false,
      type: 0,
    },
    {
      title: 'edad',
      active: false,
      type: 0,
    },
    {
      title: 'f',
      active: false,
      type: 1,
    },
    {
      title: 'g',
      active: false,
      type: 0,
    },
    {
      title: 'h',
      active: false,
      type: 0,
    },
    {
      title: 'i',
      active: false,
      type: 0,
    },
    {
      title: 'j',
      active: false,
      type: 1,
    },
    {
      title: 'k',
      active: false,
      type: 0,
    },
    {
      title: 'l',
      active: false,
      type: 0,
    },
    {
      title: 'm',
      active: false,
      type: 0,
    },
  ];

  isOpen = false;
  isOpenFilter = false;
  // @ViewChild('accContentDiv') accContentDiv: ElementRef;

  // public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true, wheelSpeed: 4 };

  progress: boolean = false;
  progressinfo: boolean = false;
  revertinfo: boolean = false;
  updateProgressionStatus: boolean = false;
  statusClickedForUpdate: number = 0;
  deleteinfo: boolean = false;
  ordersshow: boolean = false;
  completeinfo: boolean = false;
  flagIsProgressRevert = 0;
  revert: boolean = false;
  dropdownActive1: boolean = false;
  dropdownActive2: boolean = false;
  dropdownActive3: boolean = false;
  deletedropdownActive1: boolean = false;
  createTask: boolean = false;
  isAnimated: boolean = true;
  assignto: boolean = false;
  folderView: boolean = false;
  squareView: boolean = false;
  questionView: boolean = true;
  public undoButtonVisible = false;
  public undoButtonAPIReady = false;
  public undoOldStatus = -1;
  public undoNewStatus = -1;
  public undoButtonClicked = 0;

  public offset: any = 0;
  public limit: any = 25;
  public page: number = 0;
  public showingPage: number = 0;
  public maxPage: number = 0;
  public listrecords: any = [];
  public listrecordsTotal: number = 0;
  public isScrollUp: boolean = false;
  public ts = this.getTimeStap();
  taskId = 0;
  showId = 0;
  subShowId = 0;
  delSubShowId = 0;
  delSubTaskChatShowId = 0;
  isDeleteOpen: boolean = false;

  public icon1: boolean = false;

  total: any;

  taskDetails: any = {};
  isRefreshGrid: false;

  ///Filter options
  public taskTypeList = [];
  public contacts: [];
  public products: [];
  public presetActivities: [];
  public branches: [];
  public users: [];
  public customers: [];
  public companiesLoading: boolean = false;
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
      async: true,
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
      title: 'Board',
      option: [],
      async: false,
      labelName: 'Board',
      bindedValue: '',
    },
    //{
    //  id: 6,
    //  title: "Title",
    //  option: [],
    //  async: false,
    //  labelName: "Title",
    //  bindedValue: "",
    //},
    {
      id: 7,
      title: 'Branch',
      option: [],
      async: false,
      labelName: 'Branch',
      bindedValue: '',
    },
    {
      id: 8,
      title: 'Assign To',
      option: [],
      async: false,
      labelName: 'Assign To',
      bindedValue: '',
    },
    {
      id: 9,
      title: 'Search',
      option: [],
      async: false,
      labelName: 'Search',
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
  productrecords: any = [];
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
    //ts: this.ts,
    //offset: this.offset,
  };
  isSalesChart = false;
  isCompletedTask = false;
  public innerWidth: any;
  boardviewrecords: any = [];
  boardViewRecordsTotal: number = 0;
  boardList: any[] = [];
  tempboardListData: any[] = [];
  isOpenBoard: boolean = false;
  addClicked: boolean = false;

  // info bar
  public infobar: any = {};
  public infobarPerticular: any = {};
  public accessLevel: number;
  popupDisplayTitle: any = '';
  selectedTabType: any = '';
  openPopupTaskId: number = 0;
  openPopupSubTaskId: number = 0;
  popupDetailsData: any = {};
  addTaskQueryForm: FormGroup;
  openPopupBoardName: any = '';
  openPopupTaskDescription: any = '';
  openPopupTaskChatData: any = [];
  addTaskChatForm: FormGroup;
  addTaskDetailsForm: FormGroup;
  fileList: any = [];
  notFoundText: any;
  note: any;
  uploadedFileSource: any;
  showAddTaskDetailsForm: boolean = false;
  showAddedTaskDetailsList: boolean = true;
  addedTaskDetailsList: any = [];
  taskDetailsViewData: any = {};
  imageDataLoaded: boolean = false;
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
  public scrollbarOptionsTaskNewUI = {
    axis: 'y',
    theme: 'light',
    scrollbarPosition: 'inside',
    autoHideScrollbar: true,
    callbacks: {
      onTotalScroll: () => {},
      onTotalScrollOffset: 200,
      alwaysTriggerOffsets: false,
    },
  };
  public scrollbarXOptions = {
    axis: 'x',
    theme: 'light',
    scrollbarPosition: 'inside',
    autoHideScrollbar: true,
    callbacks: {
      onTotalScroll: () => {},
      onTotalScrollOffset: 100,
      alwaysTriggerOffsets: false,
    },
  };
  @Output() closeClick = new EventEmitter();
  directiveRef: any;
  componentRef: any;
  perfectScroll: any;
  constructor(
    inj: Injector,
    private route: ActivatedRoute,
    private _ren: Renderer2 // private mScrollbarService: MalihuScrollbarService, // private scrollToService: ScrollToService //public location: Location
  ) {
    super(inj);
    this.ngxScrollToDestination = 'target5';
    this.route.queryParams.subscribe((params) => {
      this.taskId = params['id'];
      if (this.taskId == undefined || this.taskId == null) {
        this.taskId = 0;
      }
      //this.location.replaceState(this.location.path().split('?')[0], '');
    });
    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(0, 6000))
    );
  }
  ngOnInit() {
    this.listApi();
    this.taskTypeList = this.lookupService.getTaskTypeList();
    this.refreshContacts();
    this.refreshClients();
    this.refreshBranches();
    this.refreshUsers();
    this.refreshPresetActivities();
    this.getProducts();
    this.loadTypehead();
    this.GetTaskInformation();
    this.infobarPerticular.infobarName = 'Summary Details';
    this.infobarPerticular.taskId = this.taskId;
    if (this.taskId > 0) {
      this.GetTask();
    }
    let vm = this;

    this.subscription = this.timer$.subscribe((seconds) => {
      if (this.icon1 == true && seconds != 0) {
        this.icon1 = false;
      }
    });
    this.innerWidth = window.innerWidth;
    this.commonService.getCurrentUser().then((user) => {
      this.accessLevel = this.lookupService.getNumericAccessLevel(
        user.tenant.accessLevel
      );
    });
    // $(".scrollbar").mCustomScrollbar({
    //     callbacks: {
    //         onScrollStart: function () {
    //             vm.removeShadow();
    //             vm.dropdownClose();
    //             vm.subDropdownClose();
    //             vm.subDeleteDropdownClose();
    //             vm.dropdownActive2 = false;
    //             vm.dropdownActive2 = false;
    //             vm.dropdownActive2 = false;
    //             vm.deletedropdownActive1 = false;
    //         },
    //         onTotalScroll: () => {
    //             this.isScrollUp = false;
    //             this.onScrollDown(this);
    //         },
    //         onTotalScrollBack: () => {
    //             this.isScrollUp = true;
    //             this.onScrollUp(this);
    //         },
    //         onTotalScrollBackOffset: 300,
    //         onTotalScrollOffset: 300,
    //         alwaysTriggerOffsets: false,
    //     },
    // });
    this.getBoardList();
  }
  refreshTimer(): void {
    this.reset$.next(void 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeShadow() {
    this.taskId = 0;
  }

  // START FIXME-V 13-04-2021
  // iconClck(trID) {
  //     let getTR = document.getElementById(trID);
  //     let elements = document.getElementsByClassName("is-open");
  //     for (let i = 0; i < elements.length; i++) {
  //         if (trID != elements[i].id) {
  //             this._ren.removeClass(elements[i], 'is-open');
  //         }
  //     }
  //     getTR.classList.toggle("is-open");
  // }
  // Code kept for refernce
  // openAcc(index, obj): void {
  //   if (this.clickCount == 1) {
  //     if (
  //       obj.classSelect != undefined &&
  //       obj.classSelect == "light-gray-bgcolor active"
  //     ) {
  //       obj.classSelect = "";
  //       this.icon1 = false;
  //       setTimeout(() => {
  //         this.infobarPerticular.taskId = 0;
  //       }, 1000);
  //     } else {
  //       this.listrecords.forEach((obj) => {
  //         obj.classSelect = "";
  //       });
  //       obj.classSelect = "light-gray-bgcolor active";
  //       var getRecord = this.listrecords.find((x) => x.id == obj.id);
  //       this.infobarPerticular = getRecord;
  //       this.infobarPerticular.taskId = obj.id;

  //       if (this.infobarPerticular.subTaskList != null) {
  //         this.infobarPerticular.totalSubTask = this.infobarPerticular.subTaskList.length;
  //         var GetSubTask = this.infobarPerticular.subTaskList.filter(
  //           (i) => i.status == 4
  //         );
  //         if (
  //           GetSubTask != undefined &&
  //           GetSubTask != null &&
  //           GetSubTask.length > 0
  //         ) {
  //           this.infobarPerticular.totalcompleted = GetSubTask.length;
  //         } else {
  //           this.infobarPerticular.totalcompleted = 0;
  //         }
  //       } else {
  //         this.infobarPerticular.totalSubTask = 0;
  //         this.infobarPerticular.totalcompleted = 0;
  //       }

  //       this.infobarPerticular.infobarName = "Task Details";
  //       this.refreshTimer();
  //       this.icon1 = true;
  //     }
  //   }

  //   if (this.clickCount == 2) {
  //     this.clickCount = 0;
  //   } else {
  //     this.clickCount += 1;
  //   }
  // }
  openAcc(index, obj): void {
    if (
      obj.classSelect != undefined &&
      obj.classSelect == 'light-gray-bgcolor active'
    ) {
      obj.classSelect = '';
      this.icon1 = false;
      setTimeout(() => {
        this.infobarPerticular.taskId = 0;
      }, 1000);
    } else {
      this.listrecords.forEach((obj) => {
        obj.classSelect = '';
      });
      obj.classSelect = 'light-gray-bgcolor active';
      var getRecord = this.listrecords.find((x) => x.id == obj.id);
      this.infobarPerticular = getRecord;
      this.infobarPerticular.taskId = obj.id;

      if (this.infobarPerticular.subTaskList != null) {
        this.infobarPerticular.totalSubTask =
          this.infobarPerticular.subTaskList.length;
        var GetSubTask = this.infobarPerticular.subTaskList.filter(
          (i) => i.status == 4
        );
        if (
          GetSubTask != undefined &&
          GetSubTask != null &&
          GetSubTask.length > 0
        ) {
          this.infobarPerticular.totalcompleted = GetSubTask.length;
        } else {
          this.infobarPerticular.totalcompleted = 0;
        }
      } else {
        this.infobarPerticular.totalSubTask = 0;
        this.infobarPerticular.totalcompleted = 0;
      }

      this.infobarPerticular.infobarName = 'Task Details';
      this.refreshTimer();
      this.icon1 = true;
    }
  }
  // END FIXME-V 13-04-2021

  /*****************************************************
      @purpose :For getting the list
      @parameters :
      @return :
      *****************************************************/
  listApi() {
    var queryParams =
      //"ts=" +
      //this.ts +
      'offset=' +
      this.offset +
      '&limit=' +
      this.limit +
      '&isShowCreatedDate=' +
      this.isSalesChart +
      '&completed=' +
      this.isCompletedTask;

    if (this.taskId > 0) {
      queryParams = queryParams + '&crmTaskid=' + this.taskId;
    }

    this.commonService.getViewTasksList(queryParams).then((success) => {
      //console.log(`Data received`, success);
      if (success) {
        success.records.forEach((obj) => {
          this.calculateProgressInPercentage(obj);
          if (this.taskId > 0 && obj.id == this.taskId) {
            obj.classSelect = 'light-gray-bgcolor active is-open';
          }
        });
        this.listrecords = success.records;
        console.log(this.listrecords, 'record list');
        this.listrecordsTotal = success.total;
        this.listrecords.forEach((element) => {
          element.active = false;
          if (element.type === 1) {
            this.ordersshow = true;
          }
        });

        this.maxPage = Math.floor(success.total / this.limit);
        this.total = success.total;
        if (
          this.taskId > 0 &&
          this.listrecords != undefined &&
          this.listrecords != null &&
          this.listrecords.length > 0
        ) {
          //this.taskId = 0;
          this.page = this.listrecords[0].pageNumber;
          this.showingPage = this.listrecords[0].pageNumber;
        }
      } else {
        this.popToast('error', success.message);
      }
    });

    /*this.commonService
            .callApi("api/clients/tasks?" + queryParams, "", "get")
            .then((success) => {
                if (success) {
                    success.records.forEach((obj) => {
                        this.calculateProgressInPercentage(obj);
                        if (this.taskId > 0 && obj.id == this.taskId) {
                            obj.classSelect = "light-gray-bgcolor active is-open";
                        }
                    });
                    this.listrecords = success.records;
                    this.listrecords.forEach((element) => {
                        element.active = false;
                        if (element.type === 1) {
                            this.ordersshow = true;
                        }
                    });

                    this.maxPage = Math.floor(success.total / this.limit);
                    this.total = success.total;
                    if (
                        this.taskId > 0 &&
                        this.listrecords != undefined &&
                        this.listrecords != null &&
                        this.listrecords.length > 0
                    ) {
                        //this.taskId = 0;
                        this.page = this.listrecords[0].pageNumber;
                        this.showingPage = this.listrecords[0].pageNumber;
                    }
                } else {
                    this.popToast("error", success.message);
                }
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });*/
  }

  /*****************************************************
     @purpose : get perticular task
     @parameters :
     @return :
     *****************************************************/

  GetTaskInformation() {
    this.commonService
      .callApi('api/clients/tasksSummary', '', 'get')
      .then((success) => {
        if (success) {
          this.infobar = success;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  /*****************************************************
   @purpose :get perticular task
   @parameters :
   @return :
   *****************************************************/

  GetTask() {
    this.commonService
      .callApi('api/clients/tasks/' + this.taskId, '', 'get')
      .then((success) => {
        if (success) {
          this.infobarPerticular = success;

          this.infobarPerticular.taskId = success.id;

          if (this.infobarPerticular.subTaskList != null) {
            this.infobarPerticular.totalSubTask =
              this.infobarPerticular.subTaskList.length;
            var GetSubTask = this.infobarPerticular.subTaskList.filter(
              (i) => i.status == 4
            );
            if (
              GetSubTask != undefined &&
              GetSubTask != null &&
              GetSubTask.length > 0
            ) {
              this.infobarPerticular.totalcompleted = GetSubTask.length;
            } else {
              this.infobarPerticular.totalcompleted = 0;
            }
          } else {
            this.infobarPerticular.totalSubTask = 0;
            this.infobarPerticular.totalcompleted = 0;
          }

          this.infobarPerticular.infobarName = 'Task Details';

          if (this.innerWidth > 768) {
            this.refreshTimer();
            this.icon1 = true;
          }
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  taskFilter(filterName) {
    if (filterName == 'CompletedTask') {
      this.isCompletedTask = !this.isCompletedTask;
    } else if (filterName == 'OverdueTask') {
      this.isSalesChart = !this.isSalesChart;
    }

    this.showingPage = 0;
    this.offset = 0;
    this.limit = 25;
    this.listApi();
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

      //value.progressStatusText = "Not Started";

      //if (getInprogressValue > 0 || getQueryValue > 0) {
      //    value.progressStatusText = "In Progress";
      //}
      //else {
      //    value.progressStatusText = "In Progress";
      //    if (getCompletedTask != undefined && getCompletedTask != null && getCompletedTask.length > 0) {
      //        if (totalsubTaskLength === getCompletedTask) {
      //            value.progressStatusText = "Completed";
      //        }
      //    }
      //    if (getAddedTask != undefined && getAddedTask != null && getAddedTask.length > 0) {
      //        if (totalsubTaskLength === getAddedTask) {
      //            value.progressStatusText = "Not Started";
      //        }
      //    }

      //}
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
    console.log('onscroll');
    const target = event.target;
    if (!target) return;

    const atBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

    console.log(
      'Scrolled to bottom:',
      target.scrollTop,
      target.clientHeight,
      target.scrollHeight,
      atBottom
    );

    if (atBottom) {
      this.onScrollDown(event);
    }
  }

  onScrollDown(ev) {
    if (this.folderView) {
      let boardviewcount = this.boardviewrecords.length;
      if (
        boardviewcount > 0 &&
        boardviewcount > this.limit &&
        this.maxPage > 0 &&
        this.page == 0 &&
        boardviewcount != this.boardViewRecordsTotal
      ) {
        this.page =
          this.maxPage -
          Math.ceil((this.boardViewRecordsTotal - boardviewcount) / this.limit);
      } else if (boardviewcount == this.boardViewRecordsTotal) {
        this.page = this.maxPage;
      }
    } else {
      let listcount = this.listrecords.length;
      if (
        listcount > 0 &&
        listcount > this.limit &&
        this.maxPage > 0 &&
        this.page == 0 &&
        listcount != this.listrecordsTotal
      ) {
        this.page =
          this.maxPage -
          Math.ceil((this.listrecordsTotal - listcount) / this.limit);
        //this.page = (this.maxPage - (Math.floor(this.listrecordsTotal / listcount)));
      } else if (listcount == this.listrecordsTotal) {
        this.page = this.maxPage;
      }
    }
    if (this.page < this.maxPage) {
      this.page++;
      this.offset = this.page * this.limit;
      if (this.folderView) {
        this.getBoardViewData();
      } else {
        this.getlistApi();
      }

      //if (this.showingPage != undefined && this.showingPage != null && this.showingPage != 0) {
      //    if (this.showingPage == this.page) {
      //        this.page = this.showingPage + 1;
      //    }
      //}
    }
  }

  onScrollUp(ev) {
    if (
      this.showingPage != undefined &&
      this.showingPage != null &&
      this.showingPage != 0
    ) {
      if (this.showingPage < this.maxPage) {
        this.showingPage--;
        //if (this.showingPage != undefined && this.showingPage != null && this.showingPage != 0) {
        //    if (this.showingPage == this.page) {
        //        this.page = this.showingPage - 1;
        //    }
        //}
        this.offset = this.showingPage * this.limit;
        this.getlistApi();
      }
    }
  }

  getlistApi() {
    var queryParams =
      //"ts=" +
      //this.ts +
      'offset=' +
      this.offset +
      '&limit=' +
      this.limit +
      '&isShowCreatedDate=' +
      this.isSalesChart +
      '&completed=' +
      this.isCompletedTask;
    this.commonService
      .callApi('api/clients/tasks?' + queryParams, this.data, 'get')
      .then((success) => {
        if (success) {
          success.records.forEach((obj) => {
            this.calculateProgressInPercentage(obj);
          });

          this.maxPage = Math.floor(success.total / this.limit);
          var listrecords1 = success.records;
          if (this.isScrollUp) {
            var reverseArray = Object.assign([], listrecords1.reverse());
            //this.listrecords = [this.listrecords, listrecords1];
            for (var i = 0; i < reverseArray.length; i++) {
              this.listrecords.unshift(listrecords1[i]);
            }
          } else {
            for (var i = 0; i < listrecords1.length; i++) {
              this.listrecords.push(listrecords1[i]);
            }
          }
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  progressModal(progress: TemplateRef<any>) {
    this.modalRef = this.modalService.show(progress, {
      class: 'modal-sm modal-main modal-dialog-centered',
    });
  }
  revertModal(progress: TemplateRef<any>) {
    this.modalRef = this.modalService.show(progress, {
      class: 'modal-sm modal-main modal-dialog-centered',
    });
  }

  createTaskModal(
    createTask: TemplateRef<any>,
    taskData = {},
    editSubTaskData = {}
  ) {
    this.addClicked = false;
    this.tblDivElem.nativeElement.className =
      'card card-box pl-0 card-attention view-details-table';
    this.addNewTskBtn.nativeElement.className =
      'd-flex flex-wrap justify-content-end btn-task-main';
    this.taskDetails = {
      taskData: taskData,
      subTaskData: editSubTaskData,
      listOfTask: this.listrecords,
    };
    this.modalRef = this.modalService.show(createTask, {
      class: 'modal-lg task-modal modal-dialog-centered create-task',
      backdrop: 'static',
      keyboard: false,
    });
  }
  updateDueDateTaskModal(createTask: TemplateRef<any>, taskData = {}) {
    this.tblDivElem.nativeElement.className =
      'card card-box pl-0 card-attention view-details-table';
    this.addNewTskBtn.nativeElement.className =
      'd-flex flex-wrap justify-content-end btn-task-main';
    this.taskDetails = { taskData: taskData };
    this.modalRef = this.modalService.show(createTask, {
      class: 'modal-lg task-modal modal-dialog-centered create-task',
      backdrop: 'static',
      keyboard: false,
    });
  }

  taskListModal(tastList: TemplateRef<any>) {
    this.modalRef = this.modalService.show(tastList, {
      class: 'modal-task modal-dialog-centered',
    });
  }
  changeIc(type) {
    if (type == 'dots') {
      this.refreshTimer();
      this.icon1 = true;
    } else {
      this.icon1 = false;
    }
  }

  confirm(progress, revert): void {
    // this.message = 'Confirmed!';
    this.modalRef.hide();
    if (progress === 'progress') {
      this.progress = false;
      this.revert = true;
    } else if (revert === 'revert') {
      this.revert = false;
      this.progress = true;
    }
  }

  decline(): void {
    // this.message = 'Declined!';
    this.modalRef.hide();
  }

  dropdownClick(id) {
    this.showId = this.showId == 0 ? id : 0;
    // console.log('click');
    // if (id == 1) {
    //     this.dropdownActive1 = !this.dropdownActive1;
    // } else if (id == 2) {
    //     this.dropdownActive2 = !this.dropdownActive2;
    // } else if (id == 3) {
    //     this.dropdownActive3 = !this.dropdownActive3;
    // }
  }

  subDropdownClick(id) {
    this.subShowId = this.subShowId == 0 ? id : 0;
  }
  subDeleteDropdownClick(id) {
    this.subShowId = 0;
    this.delSubShowId = this.delSubShowId == 0 ? id : 0;
  }
  subDeleteDropdownClose(id) {
    this.delSubShowId = 0;
  }

  subMenuDeleteDropdownClose(i, k) {
    this.delSubShowId = 0;
    this.commonService
      .callApi('api/clients/subtask/' + k.id, '', 'delete')
      .then((success) => {
        let itemIndex = i.subTaskList.findIndex((item) => item.id == k.id);
        i.subTaskList.splice(itemIndex, 1);

        this.calculateProgressInPercentage(i);

        if (i.InProgressPercentage == 100) {
          ///Change status = completed
          i.status = 2;
          i.isCompleted = true;
          this.commonService
            .callApi('api/clients/tasks/' + i.id + '/changestatus', i, 'put')
            .then((success) => {})
            .catch((e) => {
              console.log('there is an error:', e);
            });
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  dropdownClose() {
    this.showId = 0;
    this.completeinfo = false;
    this.deleteinfo = false;
    this.progressinfo = false;
    this.revertinfo = false;
    this.updateProgressionStatus = false;
    this.undoButtonVisible = false;
    this.undoButtonAPIReady = false;
    // if (id == 1) {
    //     this.dropdownActive1 = false;
    // } else if (id == 2) {
    //     this.dropdownActive2 = false;
    // } else if (id == 3) {
    //     this.dropdownActive3 = false;
    // }
  }

  subDropdownClose() {
    this.subShowId = 0;
    this.flagIsProgressRevert = 0;
    this.progressinfo = false;
    this.revertinfo = false;
    this.updateProgressionStatus = false;
    this.undoButtonVisible = false;
    this.undoButtonAPIReady = false;
    // if (id == 1) {
    //     this.dropdownActive1 = false;
    // } else if (id == 2) {
    //     this.dropdownActive2 = false;
    // } else if (id == 3) {
    //     this.dropdownActive3 = false;
    // }
  }

  progressClick() {
    this.progressinfo = !this.progressinfo;
  }
  progressClose() {
    this.progressinfo = false;
  }

  ChangeSubTaskStatusClose(i, k) {
    this.progressinfo = false;
    this.undoButtonVisible = true;
    this.commonService
      .callApi('api/clients/subtask/' + k.id + '/progress/', k.id, 'patch')
      .then((success) => {
        if (k.status !== 4) {
          k.status = k.status + 1;
          this.calculateProgressInPercentage(i);
          this.flagIsProgressRevert = 0;

          //if (i.InProgressPercentage == 100) {
          //    ///Change status = completed
          //    i.status = 2;
          //    i.isCompleted = true;
          //    this.commonService
          //        .callApi("api/clients/tasks/" + i.id + "/changestatus", i, "put")
          //        .then((success) => { })
          //        .catch((e) => {
          //            console.log("there is an error:", e);
          //        });
          //}
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  revertClick() {
    this.revertinfo = !this.revertinfo;
  }
  revertClose() {
    this.revertinfo = false;
  }
  progressRevertClick(i, k, status) {
    this.undoNewStatus = status;
    this.undoOldStatus = k.status;
    this.undoButtonClicked = 0;
    if (k.status - status != 0) {
      this.changeSubTaskStatusUpdateClose(i, k, status);
    } else {
      this.dropdownClose();
    }
  }
  undoToOldStatus(i, k, status) {
    k.status = this.undoNewStatus;
    status = this.undoOldStatus;
    if (this.undoButtonAPIReady) {
      this.undoButtonClicked += 1;
      if (k.status - status != 0 && this.undoButtonClicked == 1) {
        this.changeSubTaskStatusUpdateClose(i, k, status);
      } else {
        this.dropdownClose();
      }
    }
  }
  undoClose(i) {
    if (this.undoButtonVisible) {
      this.dropdownClose();
      this.subDropdownClose();
    }
    if (this.undoButtonClicked == 0) {
      this.calculateProgressInPercentage(i);
    }
  }
  updateStatusClick(status) {
    this.updateProgressionStatus = !this.updateProgressionStatus;
    this.statusClickedForUpdate = status;
  }
  updateStatusClose() {
    this.updateProgressionStatus = false;
  }
  changeSubTaskStatusUpdateClose(i, k, status) {
    this.updateProgressionStatus = false;
    this.undoButtonVisible = true;

    this.commonService
      .callApi('api/clients/subtask/' + k.id + '/' + status, k.id, 'patch')
      .then((success) => {
        this.flagIsProgressRevert = 0;
        k.status = status;
        this.undoButtonAPIReady = true;
        setTimeout(() => {
          this.undoClose(i);
        }, 3500);
      })
      .catch((e) => {
        this.undoClose(i);
        console.log('there is an error:', e);
      });
  }
  ChangeSubTaskStatusRevertClose(i, k) {
    this.revertinfo = false;

    this.commonService
      .callApi('api/clients/subtask/' + k.id + '/revert/', k.id, 'patch')
      .then((success) => {
        this.flagIsProgressRevert = 0;
        if (k.status !== 1) {
          k.status = k.status - 1;
          this.calculateProgressInPercentage(i);

          if (i.status == 2) {
            i.status = 1;
            this.commonService
              .callApi('api/clients/tasks/' + i.id + '/changestatus', i, 'put')
              .then((success) => {})
              .catch((e) => {
                console.log('there is an error:', e);
              });
          }
          ///Change status = completed
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  //ChangeSubTaskStatusQueryClose(i, k) {
  //    debugger
  //    this.commonService.callApi('api/clients/subtask/' + k.id + '/query/', k.id, 'patch').then(success => {
  //        debugger
  //        let item = i.subTaskList.filter(item => item.id == k.id);
  //        if (item != undefined && item != null && item.length > 0) {
  //            item[0].status = 3;
  //        }

  //        //i.subTaskList.splice(itemIndex, 1);
  //    }).catch((e) => {
  //        console.log("there is an error:", e)
  //    })
  //}

  deleteClick() {
    this.deleteinfo = !this.deleteinfo;
  }
  deleteClose() {
    this.deleteinfo = false;
  }
  createTaskOpen() {
    this.createTask = true;
  }
  createTaskClose() {
    this.createTask = false;
  }

  refreshTheParentGriddHandler(count: number) {
    if (this.folderView) {
      this.taskId = 0;
      this.offset = 0;
      this.limit = 25;
      this.page = 0;
      this.getBoardViewData();
    } else {
      this.taskId = 0;
      this.offset = 0;
      this.limit = 25;
      this.listApi();
    }
  }

  updateTheParentGrid(obj) {
    this.calculateProgressInPercentage(obj);
    if (obj.InProgressPercentage == 100) {
      ///Change status = completed
      obj.status = 2;
      obj.isCompleted = true;
      this.commonService
        .callApi('api/clients/tasks/' + obj.id + '/changestatus', obj, 'put')
        .then((success) => {})
        .catch((e) => {
          console.log('there is an error:', e);
        });
    } else if (obj.status == 2) {
      obj.status = 1;
      this.commonService
        .callApi('api/clients/tasks/' + obj.id + '/changestatus', obj, 'put')
        .then((success) => {})
        .catch((e) => {
          console.log('there is an error:', e);
        });
    }
    obj.classSelect = 'light-gray-bgcolor active is-open';
    if (this.folderView) {
      for (let i of this.boardviewrecords) {
        if (i.tasks != null && i.tasks.length > 0) {
          let getRecord = i.tasks.find((x) => x.id == obj.id);
          if (getRecord != undefined && getRecord != null) {
            let index = i.tasks.indexOf(getRecord);
            i.tasks[index] = obj;
          }
        }
      }
    } else {
      let getRecord = this.listrecords.find((x) => x.id == obj.id);
      if (getRecord != undefined && getRecord != null) {
        let index = this.listrecords.indexOf(getRecord);
        this.listrecords[index] = obj;
      }
    }
  }

  ///Filter functions
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
      setTimeout(() => {
        // this.filterName.filterInput.nativeElement.focus();
        this.isOpenFilter = true;
      });
      //if (this.filterstart.length > 0 && this.tempArr.length == 0) {
      //    var getFirstValue = this.filterstart[0];
      //    this.filterData = getFirstValue;
      //    this.changedParentFilter(this.filterData);
      //}

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
      this.filterData.bindvalue = '';
      options = [
        { id: 1, title: 'Specific' },
        { id: 2, title: 'Range' },
      ];
      this.filterData.suboptions = [];
      if (this.filterData.date || this.filterData.enddate) {
        this.filterData.date = false;
        this.filterData.enddate = false;
      }
      this.filterData.bindedValue = null;
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          // this.secondFilter.filterInput.nativeElement.focus();
          this.isOpen = true;
        });
      }
    } else if (event.id == 2) {
      this.filterData.bindedValue = '';
      this.filterData.bindvalue = '';
      options = [
        { id: 1, title: 'Specific' },
        { id: 2, title: 'Range' },
      ];
      this.filterData.suboptions = [];
      if (this.filterData.date || this.filterData.enddate) {
        this.filterData.date = false;
        this.filterData.enddate = false;
      }
      this.filterData.bindedValue = null;
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          // this.secondFilter.filterInput.nativeElement.focus();
          this.isOpen = true;
        });
      }

      //this.filterData.bindedValue = '';
      //options = [{ title: 'Specific Invoice', id: 1 }, { title: 'Invoice Range', id: 2 }];
      //if (this.filterData.invoice || this.filterData.invoicerange) {
      //    this.filterData.invoice = false;
      //    this.filterData.invoicerange = false;
      //}
    } else if (event.id == 3) {
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          $('#defaultChecked2').focus();
        });
      }
    } else if (event.id == 5) {
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          $('#txtBoard').focus();
        }, 100);
      }

      //this.filterData.bindedValue = null;
      //options = [...this.taskTypeList];
      //if (this.tempArr.length == 0) {
      //  setTimeout(() => {
      //    this.secondFilter.filterInput.nativeElement.focus();
      //    this.isOpen = true;
      //  });
      //}
    } else if (event.id == 6) {
      this.filterData.bindedValue = null;
      options = [...this.presetActivities];
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          // this.secondFilter.filterInput.nativeElement.focus();
          this.isOpen = true;
        });
      }
    } else if (event.id == 7) {
      options = [...this.branches];
      this.filterData.bindedValue = null;
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          // this.secondFilter.filterInput.nativeElement.focus();
          this.isOpen = true;
        });
      }
    } else if (event.id == 8) {
      options = [...this.users];
      this.filterData.bindedValue = null;

      if (this.tempArr.length == 0) {
        setTimeout(() => {
          // this.secondFilter.filterInput.nativeElement.focus();
          this.isOpen = true;
        });
      }
    } else if (event.id == 9) {
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          $('#txtNotes').focus();
        }, 100);
      }
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
    if (this.filterData.id === 1 || this.filterData.id === 2) {
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
    } else if (this.filterData.id === 3) {
      this.data['pastDue'] = true;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 4) {
      this.data['completed'] = true;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 5) {
      if (this.filterData.board != undefined && this.filterData.board != '') {
        this.data['board'] = this.filterData.board;
        this.isOpenBoard = false;
        this.applyFilter(this.data, 'end');
      }

      //if (this.filterData.bindedValue.id === 1) {
      //  this.filterData.businessPartnerId = "";
      //  this.filterData.productId = "";
      //  this.data["type"] = this.filterData.bindedValue.id;
      //  this.applyFilter(this.data, "end");
      //} else {
      //  this.filterData.suboptions = [];
      //  if (this.filterData.bindedValue.id === 2) {
      //    this.filterData.suboptions.push({
      //      options: this.customers,
      //      bindvalue: "",
      //      type: "select",
      //      labelName: "Search Client",
      //    });
      //  } else if (this.filterData.bindedValue.id === 6) {
      //    this.filterData.suboptions.push({
      //      options: this.clientNameItem,
      //      async: true,
      //      bindvalue: "",
      //      type: "select",
      //      labelName: "Search company",
      //    });
      //  } else if (this.filterData.bindedValue.id === 7) {
      //    this.filterData.suboptions.push({
      //      options: this.contacts,
      //      bindvalue: "",
      //      type: "select",
      //      labelName: "Search contact",
      //    });
      //  } else if (this.filterData.bindedValue.id === 4) {
      //    this.filterData.suboptions.push({
      //      options: this.productrecords,
      //      bindvalue: "",
      //      type: "select",
      //      labelName: "Search product",
      //    });
      //  }
      //}
    } else if (this.filterData.id === 6) {
      this.data['presetActivityId'] = event.id;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 7) {
      this.data['branchId'] = event.id;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 8) {
      this.data['assignedTo'] = event.id;
      this.applyFilter(this.data, 'end');
    } else if (this.filterData.id === 9) {
      if (this.filterData.note != undefined && this.filterData.note != '') {
        this.data['note'] = this.filterData.note;
        this.applyFilter(this.data, 'end');
      }
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
    if (this.filterData.id === 1 || this.filterData.id === 2) {
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
    } else if (this.filterData.id === 5) {
      this.data['type'] = this.filterData.bindedValue.id;
      if (this.filterData.bindedValue.id == 4) {
        this.data['productId'] = event.id;
      } else {
        this.data['businessPartnerId'] = event.id;
      }
      this.applyFilter(this.data, 'end');
    }
  }

  /*****************************************************
      @purpose : Main Filter Calling
      @parameters : 
      @return :
      *****************************************************/

  applyFilter(queryParams, terminate?) {
    this.showingPage = 0;
    this.page = 0;
    this.offset = 0;
    var queryParams1 =
      //"ts=" +
      //this.ts +
      'offset=' +
      this.offset +
      '&limit=' +
      this.limit +
      '&isShowCreatedDate=' +
      this.isSalesChart +
      '&completed=' +
      this.isCompletedTask;
    if (this.folderView) {
      var queryParams2 =
        '&limit=' +
        this.limit +
        '&isShowCreatedDate=' +
        this.isSalesChart +
        '&completed=' +
        this.isCompletedTask;
      this.commonService
        .callApi(
          'api/clients/tasks/folderview?' + queryParams2,
          queryParams,
          'get'
        )
        .then((success) => {
          if (success) {
            success.records.forEach((obj) => {
              obj.active = true;
              obj.tasks.forEach((sub) => {
                sub.active = true;
                this.calculateProgressInPercentage(sub);
              });
            });
            this.boardviewrecords = success.records;
            //this.boardviewrecords.forEach((element) => {
            //    element.tasks.forEach((sub) => {
            //        //if (element.type === 1) {this.ordersshow = true;}
            //    });
            //});
            this.maxPage = Math.floor(success.total / this.limit);
            this.total = success.total;
          } else {
            this.popToast('error', success.message);
          }
        })
        .catch((e) => {
          console.log('there is an error:', e);
        });
    } else {
      this.commonService
        .callApi('api/clients/tasks?' + queryParams1, queryParams, 'get')
        .then((success) => {
          if (success) {
            success.records.forEach((obj) => {
              this.calculateProgressInPercentage(obj);
            });
            this.listrecords = success.records;
            this.maxPage = Math.floor(success.total / this.limit);
            this.total = success.total;
          } else {
            this.popToast('error', success.message);
          }
        })
        .catch((e) => {
          console.log('there is an error:', e);
        });
    }

    if (terminate) {
      let tempconfig: any = {};
      if (this.filterData.id == 1 || this.filterData.id == 2) {
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

        //this.fliterflag = false;
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
        tempconfig['childFilter'] = this.filterData.pastDue;
        tempconfig['selectedObj'] = this.filterData;
        //this.fliterflag = false;
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
        tempconfig['childFilter'] = this.filterData.completed;
        tempconfig['selectedObj'] = this.filterData;
        //this.fliterflag = false;
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
        tempconfig['childFilter'] = this.filterData.board;
        tempconfig['selectedObj'] = this.filterData;

        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);

        this.filterData = {};
        $('#txtBoard').val('');
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];

        //tempconfig["parentFilter"] = this.filterData.title;
        //tempconfig["childFilter"] = this.filterData.bindedValue.title;
        //tempconfig["selectedObj"] = this.filterData;

        //if (this.filterData.suboptions != undefined) {
        //  tempconfig[
        //    "subchildFilter"
        //  ] = this.filterData.suboptions[0].bindvalue.title;
        //}

        ////this.fliterflag = false;
        //this.tempArr.push(tempconfig);
        //const index = this.filterstart
        //  .map((e) => {
        //    return e.id;
        //  })
        //  .indexOf(this.filterData.id);
        //this.filterData = {};
        //this.filterstart.splice(0, index + 1);
        //this.filterstart = [...this.filterstart];
      } else if (
        this.filterData.id == 6 ||
        this.filterData.id == 7 ||
        this.filterData.id == 8
      ) {
        tempconfig['parentFilter'] = this.filterData.title;
        tempconfig['childFilter'] = this.filterData.bindedValue.title;
        tempconfig['selectedObj'] = this.filterData;
        //this.fliterflag = false;
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
        tempconfig['childFilter'] = this.filterData.note;
        tempconfig['selectedObj'] = this.filterData;
        //this.fliterflag = false;
        this.tempArr.push(tempconfig);
        const index = this.filterstart
          .map((e) => {
            return e.id;
          })
          .indexOf(this.filterData.id);

        this.filterData = {};
        $('#txtNotes').val('');
        this.filterstart.splice(0, index + 1);
        this.filterstart = [...this.filterstart];
      }

      this.fliterflag = false;
      //setTimeout(() => {
      //    const newArray = this.refFilter.filter(({ id }) => !this.tempArr.some(x => x.selectedObj.id == id))
      //    this.filterstart = [...newArray]
      //}, 100);
      //if (this.tempArr.length == 3) {

      //}
      //else {
      //    if (this.filterstart.length > 0 && this.tempArr.length == 0) {
      //        var getFirstValue = this.filterstart[0];
      //        this.filterData = getFirstValue;
      //        this.changedParentFilter(this.filterData);
      //    }
      //}
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

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex, event.currentIndex);
    moveItemInArray(this.listrecords, event.previousIndex, event.currentIndex);
  }

  /*****************************************************
      @purpose : After selecing the dates 
      @parameters : 
      @return :
      *****************************************************/
  modelDatepickerDate(event, type) {
    $('#minDatepicker :input').blur();
    $('#maxDatepicker :input').blur();
    if (this.filterData.date && !this.filterData.enddate) {
      this.startDateFrom = moment.utc(event).format();
      this.startDateFrom = moment.utc(event).format();
      if (this.filterData.id == 1) {
        this.data['createdOnType'] = '0';
        this.data['createdOn'] = this.startDateFrom;
      } else {
        this.data['dueDateType'] = '0';
        this.data['dueDate'] = this.startDateFrom;
      }
      this.applyFilter(this.data, 'end');
    } else {
      if (type == 'specific') {
        this.startDateFrom = moment.utc(event).format();
        if (this.filterData.id == 1) {
          this.data['createdOnType'] = '1';
          this.data['createdOnAfter'] = this.startDateFrom;
        } else {
          this.data['dueDateType'] = '1';
          this.data['dateFrom'] = this.startDateFrom;
        }
      } else {
        this.startDateTo = moment.utc(event).format();
        if (this.filterData.id == 1) {
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
  modelDatepickerMonth(event, type) {
    $('#minMonthDatepicker :input').blur();
    $('#maxMonthDatepicker :input').blur();
    if (this.filterData.month && !this.filterData.endmonth) {
      var date = event,
        y = date.getFullYear(),
        m = date.getMonth();
      this.monthFrom = moment.utc(event).format();
      var lastDay = new Date(y, m + 1, 0);
      this.monthTo = moment.utc(lastDay).format();

      //this.data['monthFrom'] = this.monthFrom;
      if (this.filterData.id == 1) {
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
        if (this.filterData.id == 1) {
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
        if (this.filterData.id == 1) {
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
  modelDatepickerYear(event, type) {
    $('#minyearDatepicker :input').blur();
    $('#maxyearDatepicker :input').blur();
    if (this.filterData.year && !this.filterData.endyear) {
      var date = event,
        y = date.getFullYear(),
        m = date.getMonth();
      var lastDay = new Date(y, 0, 1);
      this.yearFrom = moment.utc(lastDay).format();

      var lastDayYear = new Date(y + 1, 0, 0);
      this.yearTo = moment.utc(lastDayYear).format();
      //this.data['yearFrom'] = this.yearFrom;
      if (this.filterData.id == 1) {
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
        if (this.filterData.id == 1) {
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
        if (this.filterData.id == 1) {
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

  /*****************************************************
      @purpose : Reset the filter drop 
      @parameters : 
      @return :
      *****************************************************/
  resetFilter(i) {
    if (i.selectedObj.id == 4) {
      delete this.data['completed'];
      this.isCompletedTask = false;
      //this.data["completed"] = "";
    } else if (i.selectedObj.id == 1) {
      delete this.data['createdOn'];
      delete this.data['createdOnAfter'];
      delete this.data['createdOnBefore'];
      delete this.data['createdOnType'];
      //this.data["createdOn"] = "";
      //this.data["createdOnAfter"] = "";
      //this.data["createdOnBefore"] = "";
      //this.data["createdOnType"] = "";
    } else if (i.selectedObj.id == 2) {
      delete this.data['dueDate'];
      delete this.data['dateTo'];
      delete this.data['dateFrom'];
      delete this.data['dueDateType'];
      //this.data["dueDate"] = "";
      //this.data["dateTo"] = "";
      //this.data["dateFrom"] = "";
      //this.data["dueDateType"] = "";
    } else if (i.selectedObj.id == 3) {
      delete this.data['pastDue'];
      //this.data["pastDue"] = "";
    } else if (i.selectedObj.id == 5) {
      delete this.data['board'];
      //this.data["board"] = "";

      //this.data["type"] = "";
      //this.data["productId"] = "";
      //this.data["businessPartnerId"] = "";
    } else if (i.selectedObj.id == 6) {
      delete this.data['presetActivityId'];
      //this.data["presetActivityId"] = "";
    } else if (i.selectedObj.id == 7) {
      delete this.data['branchId'];
      //this.data["branchId"] = "";
    } else if (i.selectedObj.id == 8) {
      delete this.data['assignedTo'];
      //this.data["assignedTo"] = "";
    } else if (i.selectedObj.id == 9) {
      delete this.data['note'];
      //this.data["note"] = "";
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
          // console.log("asdhfa",success)
          items = success;
          if (allow) {
            this.clientNameItem = success['records'];
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
        switchMap((term) => this.refreshCompanies(term, false)),
        map((response) => {
          return response;
        })
      )
    );
  }

  /*****************************************************
     @purpose : Delete the task
     @parameters :(i , index)
     @return :
     *****************************************************/
  deleteTask(i, index) {
    this.commonService
      .callApi('api/clients/tasks/' + i.id, '', 'delete')
      .then((success) => {
        //if (success === true) {
        this.deleteinfo = false;
        this.listrecords.splice(index, 1);
        //}
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  ngxScrollToDestination: string;
  @ViewChild('scrollbar') private myScrollContainer: ElementRef;

  changes(isFirst?) {
    if (this.folderView) {
      if (isFirst) {
        this.page = 0;
        this.offset = 0;
        this.boardviewrecords = [];
        this.getBoardViewData();
      }
      this.boardviewrecords.forEach((element) => {
        element.tasks.forEach((sub) => {
          sub.active = !sub.active;
        });
        // if (element.title == value.title) {
        element.active = !element.active;
        //}
      });
    } else {
      this.showingPage = 0;
      this.page = 0;
      this.offset = 0;
      this.listrecords = [];
      this.getlistApi();
    }

    /*this.listrecords = this.listrecords.sort(function (a, b) {
            // var textA = a.title || a.board;
            // var textB = b.title || b.board;
            var textA = a.board || "";
            var textB = b.board || "";
            return textA.localeCompare(textB);
        });*/
  }

  triggerScrollTo(k, m) {
    var indexScroll = 0;
    setTimeout(() => {
      const cells = this.theadEl.toArray();
      cells.forEach((element, index) => {
        if (element.nativeElement.textContent == k.title) {
          indexScroll = index;
        }
      });

      const html = cells[indexScroll].nativeElement;

      this.perfectScroll.directiveRef.update(); //for update scroll
      this.perfectScroll.directiveRef.scrollToElement(html, -100, 1000); //for update scroll
    }, 1000);
  }

  changesOthers() {
    this.changes();
    // this.listrecords.forEach(element => {
    //     if (element.type === 1) {
    //         element.active = !element.active;
    //     }
    // });
  }

  public scrollToXY(x: number, y: number): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollTo(x, y, 500);
    } else if (
      this.type === 'component' &&
      this.componentRef &&
      this.componentRef.directiveRef
    ) {
      this.componentRef.directiveRef.scrollTo(x, y, 500);
    }
  }

  public scrollToTop(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToTop();
    } else if (
      this.type === 'component' &&
      this.componentRef &&
      this.componentRef.directiveRef
    ) {
      this.componentRef.directiveRef.scrollToTop();
    }
  }

  public scrollToLeft(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToLeft();
    } else if (
      this.type === 'component' &&
      this.componentRef &&
      this.componentRef.directiveRef
    ) {
      this.componentRef.directiveRef.scrollToLeft();
    }
  }

  public scrollToRight(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToRight();
    } else if (
      this.type === 'component' &&
      this.componentRef &&
      this.componentRef.directiveRef
    ) {
      this.componentRef.directiveRef.scrollToRight();
    }
  }

  public scrollToBottom(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.scrollToBottom();
    } else if (
      this.type === 'component' &&
      this.componentRef &&
      this.componentRef.directiveRef
    ) {
      this.componentRef.directiveRef.scrollToBottom();
    }
  }

  public onScrollEvent(event: any): void {}
  openSubTaskDetailsPopup(
    type,
    subTaskDetailsPopup,
    taskId,
    subTaskId,
    boardName,
    taskDescription
  ) {
    this.openPopupTaskId = taskId;
    this.openPopupSubTaskId = subTaskId;
    this.openPopupBoardName = boardName;
    this.openPopupTaskDescription = taskDescription;
    this.modalRef = this.modalService.show(subTaskDetailsPopup, {
      class:
        'modal-dialog-centered quick-popup query-popup task-detail-popup-h ',
    });
    this.showPopupDetails(type);
  }
  showPopupDetails(type) {
    this.selectedTabType = type;
    if (type === 'query') {
      this.popupDisplayTitle = 'Query Task';
      this.setTaskQueryForm();
    } else if (type === 'chat') {
      this.popupDisplayTitle = 'Task Chat';
      this.getTaskChatDataAndSetForm();
    } else if (type === 'details') {
      this.imageDataLoaded = false;
      this.popupDisplayTitle = 'Task Details';
      this.getAddedTaskDetailsList();
    }
  }
  setTaskQueryForm() {
    this.addTaskQueryForm = new FormGroup({
      taskDetailText: new FormControl('', [Validators.required]),
    });
    setTimeout(() => {
      let queryTaskDetailText = document.getElementById('queryTaskDetailText');
      queryTaskDetailText.focus();
    }, 100);
  }
  addTaskQuery() {
    if (this.addTaskQueryForm.valid) {
      this.addTaskQueryForm.setErrors({ invalid: true });
      let sendingData: any = {
        CRMTaskId: this.openPopupTaskId,
        CRMSubTaskId: this.openPopupSubTaskId,
        TaskDetailType: 2,
        TaskDetailText: this.addTaskQueryForm.value.taskDetailText,
      };
      console.log('1');
      this.commonService
        .callApi('api/clients/addTaskDetail', sendingData, 'post')
        .then((success) => {
          if (success) {
            let getRecord = this.listrecords.find(
              (x) => x.id == this.openPopupTaskId
            );
            if (getRecord != undefined && getRecord != null) {
              let index = this.listrecords.indexOf(getRecord);
              let subTaskRec = this.listrecords[index].subTaskList.find(
                (x) => x.id == this.openPopupSubTaskId
              );
              if (subTaskRec != undefined && subTaskRec != null) {
                let subTaskIndex =
                  this.listrecords[index].subTaskList.indexOf(subTaskRec);
                this.listrecords[index].subTaskList[subTaskIndex].showQuery =
                  true;
              }
            }
            this.modalRef.hide();
            this.resetPopupVariables();
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
  resetPopupVariables() {
    this.openPopupTaskId = 0;
    this.openPopupSubTaskId = 0;
    this.selectedTabType = '';
    this.popupDisplayTitle = '';
    this.openPopupBoardName = '';
    this.openPopupTaskDescription = '';
    this.showAddedTaskDetailsList = true;
    this.showAddTaskDetailsForm = false;
    this.imageDataLoaded = false;
  }
  getTaskChatDataAndSetForm() {
    this.commonService
      .callApi(
        'api/clients/getTaskDetailsforType/' +
          this.openPopupTaskId +
          '/3/' +
          this.openPopupSubTaskId,
        '',
        'get'
      )
      .then((success) => {
        if (success && Object.keys(success).length !== 0) {
          success = success[0];
          this.openPopupTaskChatData = success.listOfDetails;
        } else {
          this.openPopupTaskChatData = [];
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
    this.setAddTaskChatForm();
  }
  setAddTaskChatForm() {
    this.addTaskChatForm = new FormGroup({
      taskDetailText: new FormControl('', [Validators.required]),
      mqcId: new FormControl(null),
    });
    setTimeout(() => {
      let taskChatDetailText = document.getElementById('taskChatDetailText');
      taskChatDetailText.focus();
    }, 100);
  }
  addTaskChat() {
    if (this.addTaskChatForm.valid) {
      this.addTaskChatForm.setErrors({ invalid: true });
      if (
        this.addTaskChatForm.value.mqcId != null &&
        this.addTaskChatForm.value.mqcId != undefined &&
        this.addTaskChatForm.value.mqcId > 0
      ) {
        let sendingData: any = {
          CRMTaskId: this.openPopupTaskId,
          CRMSubTaskId: this.openPopupSubTaskId,
          TaskDetailType: 3,
          TaskDetailText: this.addTaskChatForm.value.taskDetailText,
        };
        this.commonService
          .callApi(
            'api/clients/updateTaskDetail/' + this.addTaskChatForm.value.mqcId,
            sendingData,
            'put'
          )
          .then((success) => {
            if (success) {
              let getRecord = this.listrecords.find(
                (x) => x.id == this.openPopupTaskId
              );
              if (getRecord != undefined && getRecord != null) {
                let index = this.listrecords.indexOf(getRecord);
                let subTaskRec = this.listrecords[index].subTaskList.find(
                  (x) => x.id == this.openPopupSubTaskId
                );
                if (subTaskRec != undefined && subTaskRec != null) {
                  let subTaskIndex =
                    this.listrecords[index].subTaskList.indexOf(subTaskRec);
                  this.listrecords[index].subTaskList[subTaskIndex].showChat =
                    true;
                }
              }
              this.updateTaskChat(this.openPopupTaskChatData);
              this.addTaskChatForm.setErrors(null);
              this.addTaskChatForm.reset();
            } else {
              this.popToast('error', success.message);
            }
          })
          .catch((e) => {
            console.log('there is an error:', e);
          });
      } else {
        let sendingData: any = {
          CRMTaskId: this.openPopupTaskId,
          CRMSubTaskId: this.openPopupSubTaskId,
          TaskDetailType: 3,
          TaskDetailText: this.addTaskChatForm.value.taskDetailText,
        };
        console.log('2');

        this.commonService
          .callApi('api/clients/addTaskDetail', sendingData, 'post')
          .then((success) => {
            if (success) {
              let getRecord = this.listrecords.find(
                (x) => x.id == this.openPopupTaskId
              );
              if (getRecord != undefined && getRecord != null) {
                let index = this.listrecords.indexOf(getRecord);
                let subTaskRec = this.listrecords[index].subTaskList.find(
                  (x) => x.id == this.openPopupSubTaskId
                );
                if (subTaskRec != undefined && subTaskRec != null) {
                  let subTaskIndex =
                    this.listrecords[index].subTaskList.indexOf(subTaskRec);
                  this.listrecords[index].subTaskList[subTaskIndex].showChat =
                    true;
                }
              }
              this.updateTaskChat(this.openPopupTaskChatData);
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
  }
  updateTaskChat(data) {
    this.commonService
      .callApi(
        'api/clients/getTaskDetailsforType/' +
          this.openPopupTaskId +
          '/3/' +
          this.openPopupSubTaskId,
        '',
        'get'
      )
      .then((success) => {
        if (success) {
          success = success[0];
          this.openPopupTaskChatData = success.listOfDetails;
        } else {
          this.openPopupTaskChatData = [];
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  setAddTaskDetailsForm() {
    this.addTaskDetailsForm = new FormGroup({
      taskDetailText: new FormControl('', [Validators.required]),
    });
    setTimeout(() => {
      let taskDetailImageText = document.getElementById('taskDetailImageText');
      taskDetailImageText.focus();
    }, 100);
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
        CRMTaskId: this.openPopupTaskId,
        CRMSubTaskId: this.openPopupSubTaskId,
        TaskDetailType: 1,
        TaskDetailText: this.addTaskDetailsForm.value.taskDetailText,
      };
      console.log('3');

      this.commonService
        .callApi('api/clients/addTaskDetail', sendingData, 'post')
        .then((success) => {
          if (success) {
            let getRecord = this.listrecords.find(
              (x) => x.id == this.openPopupTaskId
            );
            if (getRecord != undefined && getRecord != null) {
              let index = this.listrecords.indexOf(getRecord);
              let subTaskRec = this.listrecords[index].subTaskList.find(
                (x) => x.id == this.openPopupSubTaskId
              );
              if (subTaskRec != undefined && subTaskRec != null) {
                let subTaskIndex =
                  this.listrecords[index].subTaskList.indexOf(subTaskRec);
                this.listrecords[index].subTaskList[subTaskIndex].showDetails =
                  true;
              }
            }
            if (this.fileList.length > 0) {
              this.saveAddTaskDetailsImage(
                this.openPopupTaskId,
                this.openPopupSubTaskId,
                success
              );
            } else {
              this.addTaskDetailsForm.setErrors(null);
              this.showAddedTaskDetailsListDiv();
              this.addTaskDetailsForm.reset();
              this.fileList = [];
              this.uploadedFileSource = '';
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

        console.log('formData- ', formData);
        console.log('4');

        this.commonService
          .callApi(
            `api/clients/taskDetail/uploadFile/${taskId}/${subTaskId}/${detailId}`,
            formData,
            'post',
            false, // isPublic
            false, // isForm
            null, // pagination
            false, // html
            true // formData
          )
          .then((success) => {
            this.fileList = [];
            this.uploadedFileSource = '';
            this.addTaskDetailsForm.setErrors(null);
            this.showAddedTaskDetailsListDiv();
          });
      });
    }
  }

  getAddedTaskDetailsList() {
    this.commonService
      .callApi(
        'api/clients/getTaskDetailsforType/' +
          this.openPopupTaskId +
          '/1/' +
          this.openPopupSubTaskId,
        '',
        'get'
      )
      .then((success) => {
        if (success && Object.keys(success).length !== 0) {
          success = success[0];
          this.addedTaskDetailsList = success.listOfDetails;
          if (this.addedTaskDetailsList.length > 0) {
            this.addedTaskDetailsList.map((details: any, i, arr) => {
              if (details.image) {
                this.commonService
                  .callApi(
                    'api/clients/notes/retriveNotesImage?name=' + details.image,
                    '',
                    'get'
                  )
                  .then((success) => {
                    if (success) {
                      details.src = success;
                    } else {
                      details.src = '';
                    }
                    if (arr.length - 1 === i) {
                      setTimeout(() => {
                        this.showAddedTaskDetailsList = true;
                        this.imageDataLoaded = true;
                      }, 1000);
                    }
                  });
              }
            });
          }
        } else {
          this.addedTaskDetailsList = [];
          this.showAddedTaskDetailsList = true;
          this.imageDataLoaded = true;
        }
      })
      .catch((e) => {
        this.addedTaskDetailsList = [];
        this.imageDataLoaded = true;
        this.showAddedTaskDetailsList = true;
        console.log('there is an error:', e);
      });
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
  showAddTaskDetailsDiv() {
    this.showAddedTaskDetailsList = false;
    this.setAddTaskDetailsForm();
    this.showAddTaskDetailsForm = true;
    window.addEventListener('paste', this.handleCopy.bind(event), false);
  }
  showAddedTaskDetailsListDiv() {
    this.getAddedTaskDetailsList();
    this.showAddedTaskDetailsList = true;
    this.addTaskDetailsForm.reset();
    this.showAddTaskDetailsForm = false;
  }
  openTaskDetailsView(data, addTaskDetailsViewsPopup) {
    data.board = this.openPopupBoardName;
    data.description = this.openPopupTaskDescription;
    this.taskDetailsViewData = data;
    this.modalRef.hide();
    this.resetPopupVariables();
    this.modalRef = this.modalService.show(addTaskDetailsViewsPopup, {
      class: 'modal-dialog-centered quick-popup task-detail-view-popup',
    });
  }

  completeClick() {
    this.completeinfo = !this.completeinfo;
  }

  completeClose() {
    this.completeinfo = false;
  }

  completeTask(mainTaskId) {
    if (mainTaskId > 0) {
      this.commonService
        .callApi('api/clients/tasks/' + mainTaskId + '/changestatus', '', 'put')
        .then((success: any) => {
          if (success) {
            this.completeinfo = false;
            let mainTaskRecord = this.folderView
              ? this.boardviewrecords.find((x) => x.id == mainTaskId)
              : this.listrecords.find((x) => x.id == mainTaskId);
            if (mainTaskRecord) {
              mainTaskRecord.isComplete = !mainTaskRecord.isComplete
                ? true
                : mainTaskRecord.isComplete;
              mainTaskRecord.status = 2;
            }
          } else {
            this.popToast(
              'error',
              'Could not complete the task, Please try again later.'
            );
          }
        })
        .catch((e) => {
          this.popToast(
            'error',
            'Could not complete the task, Please try again later.'
          );
        });
    } else {
      this.popToast('error', 'Something went wrong while completing task');
    }
  }

  getBoardViewData() {
    //this.page = 0;
    //this.offset = 0;
    var queryParams =
      //"ts=" +
      //this.ts +
      'offset=' +
      this.offset +
      '&limit=' +
      this.limit +
      '&isShowCreatedDate=' +
      this.isSalesChart +
      '&completed=' +
      this.isCompletedTask;

    //if (this.taskId > 0) {
    //    queryParams = queryParams + "&crmTaskid=" + this.taskId;
    //}

    this.commonService
      .callApi('api/clients/tasks/folderview?' + queryParams, this.data, 'get')
      .then((success) => {
        if (success) {
          success.records.forEach((obj) => {
            obj.active = true;
            obj.tasks.forEach((sub) => {
              this.calculateProgressInPercentage(sub);
            });
            //if (this.taskId > 0 && obj.id == this.taskId) {
            //    obj.classSelect = "light-gray-bgcolor active is-open";
            //}
          });
          var boardrecords1 = success.records;
          this.boardViewRecordsTotal = success.total;
          if (!this.isScrollUp) {
            for (var i = 0; i < boardrecords1.length; i++) {
              this.boardviewrecords.push(boardrecords1[i]);
            }
          }

          //this.boardviewrecords = success.records;
          this.boardviewrecords.forEach((element) => {
            element.tasks.forEach((sub) => {
              sub.active = true;
            });
            //if (element.type === 1) {
            //    this.ordersshow = true;
            //}
          });

          this.maxPage = Math.floor(success.total / this.limit);
          this.total = success.total;
          //if (
          //    this.taskId > 0 &&
          //    this.listrecords != undefined &&
          //    this.listrecords != null &&
          //    this.listrecords.length > 0
          //) {
          //    //this.taskId = 0;
          //    this.page = this.listrecords[0].pageNumber;
          //    this.showingPage = this.listrecords[0].pageNumber;
          //}
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }

  subTaskChatDeleteDropdownClick(id) {
    this.isDeleteOpen = true;
    this.delSubTaskChatShowId = this.delSubTaskChatShowId == 0 ? id : 0;
  }

  subTaskChatDeleteDropdownClose() {
    this.isDeleteOpen = false;
    this.delSubTaskChatShowId = 0;
  }

  subTaskChatDelete(chatRecord) {
    if (
      chatRecord != null &&
      chatRecord.mqcId > 0 &&
      this.delSubTaskChatShowId == chatRecord.mqcId
    ) {
      this.commonService
        .callApi(
          'api/clients/deleteTaskDetail/' + chatRecord.mqcId,
          null,
          'delete'
        )
        .then((success) => {
          if (success) {
            this.isDeleteOpen = false;
            this.delSubTaskChatShowId = 0;
            this.updateTaskChat(success);
          } else {
            this.popToast('error', 'Something went wrong');
          }
        })
        .catch((e) => {
          console.log('there is an error:', e);
        });
    }
  }

  setEditSubTaskChat(chatRecord) {
    this.addTaskChatForm = new FormGroup({
      taskDetailText: new FormControl(chatRecord.note, [Validators.required]),
      mqcId: new FormControl(chatRecord.mqcId),
    });
  }

  SearchString(e) {
    this.boardList = [...this.tempboardListData];
    var searchKeyword = e.term.toLowerCase();
    var checkExist = this.tempboardListData.filter(
      (x) => x.board.toLowerCase().indexOf(searchKeyword) !== -1
    );
    if (
      checkExist != undefined &&
      checkExist != null &&
      checkExist.length > 0
    ) {
      this.isOpenBoard = true;
    } else {
      var obj = {
        board: e.term,
      };

      var assignList = Object.assign([], this.tempboardListData);
      assignList.unshift(obj);
      this.boardList = [...assignList];
      this.isOpenBoard = false;
    }

    //this.addForm.get("boardName").setValue(e.term);
  }

  SearchStringChange(e) {
    //this.addForm.get("boardName").setValue(e.board);
    //$("#subTitle").focus();
    this.isOpenBoard = false;
  }

  getBoardList() {
    this.commonService
      .callApi('api/clients/tasks/boardList', '', 'get')
      .then((success) => {
        if (success) {
          this.boardList = success;
          this.tempboardListData = Object.assign([], success);
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  closedSubTask(taskList) {
    if (taskList.taskList.length > 0) {
      taskList.taskList.forEach((obj) => {
        this.calculateProgressInPercentage(obj);
      });
      this.listrecords = taskList.taskList;
    }
    this.modalRef.hide();
  }
}
