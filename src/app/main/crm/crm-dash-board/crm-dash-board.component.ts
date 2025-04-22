import { Component, Injector, OnInit, Renderer2, ViewChild } from '@angular/core';
import moment from 'moment';
import { BaseComponent } from '../../../common/commonComponent';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";
export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-crm-dash-board',
  standalone: false,
  templateUrl: './crm-dash-board.component.html',
  styleUrl: './crm-dash-board.component.scss'
})
export class CrmDashBoardComponent extends BaseComponent implements OnInit {
  selectedTab: any;
  timeSelected = false;
  isTaskDashboard;
  showStatistics = true;
  showNotifications = true;
  public filterData: Array<any> = [];
  public salesRepresentatives: [];
  showCalendar = false;
  public filterIReport: boolean = false;
  public isWorkspaceSelection: boolean = false;
  notificationType: string = 'ALL';
  notificationTypeName: string = 'All';
  public taskCompletedCount: number = 0;
  public taskOverdueCount: number = 0;
  public taskProgressedCount: number = 0;
  public taskQueryCount: number = 0;
  statisticsType: string = 'Today';
  bsConfig: Partial<BsDatepickerConfig>;
  statisticsTypeName: string = 'Today';
  public taskAddedCount: number = 0;
  public taskForgotenCount: number = 0;
  isFilterOpen: boolean = false;
  addDayClass: boolean = false;
  public selectedFilterValue: number;
  showMonthsLIsting: boolean = false;
  public isCollapsed: boolean = false;
  loadTooltipData: boolean = false;
  displayType: number = 0;
  monthsListingArray: any = [];
  public ts = this.getTimeStap();
  public todays_date = new Date();
  public notificationList = [];
  public memoListRecords = [];
  public offset: any = 0;
  public limit: any = 20;
  public salesRepresentative;
  public listrecords: any = [];
  public listRecordsTotal: number = 0;
  public page: number = 0;
  public maxPage: number = 0;

  public memolimit: number = 20;
  public memooffset: number = 0;
  public memopage: number = 0;
  public memomaxPage: number = 0;
  public data = {
    ts: this.ts,
    offset: this.offset,
  };
  memoTypeName: string = 'All';
  memoType: string = 'ALL';
  memoTypeUserId: number;
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
      description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      hourSelection: 0,
      minuteSelection: 0,
      timeDuration: 4,
      preparation: 4,
      isNew: true,
    },
    {
      id: 4,
      time: '11.00',
      description: "",
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
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions2>
  constructor(
    inj: Injector,
    private datePipe: DatePipe,
    private _ren: Renderer2 //private mScrollbarService: MalihuScrollbarService,
  ) {
    super(inj);
    this.chartOptions = {
      series: [
        {
          name: "PRODUCT A",
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: "PRODUCT B",
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: "PRODUCT C",
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: "PRODUCT D",
          data: [21, 7, 25, 13, 22, 8]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        type: "category",
        categories: [
          "01/2011",
          "02/2011",
          "03/2011",
          "04/2011",
          "05/2011",
          "06/2011"
        ]
      },
      legend: {
        position: "right",
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    };
    this.chartOptions2 = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  ngOnInit(): void {
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
  changeStatisticsFilter(name: string, value) {
    this.statisticsTypeName = name;
    this.statisticsType = value;
    this.getTaskStatistics();
  }
  filterDashboardData(type: any) {
    this.selectedTab = type;
    console.log('selected---', type);
  }
  notificationsCalendorStatistics(flag) {
    this.showStatistics = flag !== 'Calendar';
    this.showNotifications = flag !== 'Calendar';
    this.showCalendar = flag == 'Calendar';
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
  checkCollapse() {
    this.isCollapsed = !this.filterIReport;
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
  changeNotificationFilter(name: string, value) {
    this.notificationsCalendorStatistics('Notifications');
    this.notificationTypeName = name;
    this.notificationType = value;
    // this.getNotification();
  }
  validateMinutesValue(event) {
    if (event >= 0 && event <= 59) {
      this.calendar.minuteSelection = event;
    } else {
      this.calendar.minuteSelection = 0;
    }
  }

  onScroll(eveny: any) {
  }
  applyFilter(queryParams, terminate?) {
    //   if (queryParams.limit) {
    //     delete queryParams.limit;
    //   }
    //   if (
    //     queryParams.type == 0 ||
    //     queryParams.type == 1 ||
    //     queryParams.type == 2 ||
    //     queryParams.type == 3 ||
    //     queryParams.type == 4
    //   ) {
    //     delete queryParams.type;
    //   }
    //   delete queryParams['ts'];
    //   delete queryParams['offset'];
    //   this.offset = 0;
    //   this.taskDashboardPage = 0;
    //   var queryParams1 = '';
    //   this.listrecords = [];
    //   if (queryParams.createdOnBefore) {
    //     if (this.filterData.length > 0 && this.filterData[0]['filterId'] == 10) {
    //       this.tmpFilterData.createdOnBefore =
    //         new Date(queryParams.createdOnBefore).toISOString().split('.')[0] +
    //         'Z';
    //       delete queryParams.createdOnBefore;
    //       delete queryParams.createdOnType;
    //     }
    //     //queryParams.createdOnBefore = new Date(queryParams.createdOnBefore).toISOString().split('.')[0] + 'Z';
    //   }
    //   if (queryParams.createdOnAfter) {
    //     if (this.filterData.length > 0 && this.filterData[0]['filterId'] == 10) {
    //       this.tmpFilterData.createdOnAfter =
    //         new Date(queryParams.createdOnAfter).toISOString().split('.')[0] +
    //         'Z';
    //       delete queryParams.createdOnAfter;
    //     }
    //     //queryParams.createdOnAfter = new Date(queryParams.createdOnAfter).toISOString().split('.')[0] + 'Z';
    //   }
    //   if (queryParams.createdOn) {
    //     if (this.filterData.length > 0 && this.filterData[0]['filterId'] == 10) {
    //       this.tmpFilterData.createdOn =
    //         new Date(queryParams.createdOn).toISOString().split('.')[0] + 'Z';
    //       this.tmpFilterData.createdOnType = queryParams.createdOnType;
    //       delete queryParams.createdOn;
    //       delete queryParams.createdOnType;
    //     }
    //   }
    //   if (this.filterData.length > 0) {
    //     for (let i = 0; i < this.filterData.length; i++) {
    //       if (this.filterData[i]['filterId'] == 1) {
    //         if (
    //           this.filterData[i]['subchildrange'] != '' &&
    //           this.filterData[i]['subchildrange'] != null &&
    //           this.filterData[i]['subchildrange'] != undefined
    //         ) {
    //           queryParams['CreatedOnAfter'] = new Date(
    //             this.filterData[i]['childFilter']
    //           ).toISOString(); // this.data["createdOnAfter"]
    //           queryParams['CreatedOnBefore'] = new Date(
    //             this.filterData[i]['subchildrange']
    //           ).toISOString(); // this.data["createdOnBefore"]
    //           queryParams['CreatedOnType'] = 1;
    //         } else {
    //           queryParams['createdOn'] = new Date(
    //             this.filterData[i]['childFilter']
    //           ).toISOString(); //this.data["createdOn"];
    //           queryParams['createdOnType'] = this.filterData[i]['createdOnType'];
    //         }
    //       } else if (this.filterData[i]['filterId'] == 2) {
    //         if (
    //           this.filterData[i]['subchildrange'] != '' &&
    //           this.filterData[i]['subchildrange'] != null &&
    //           this.filterData[i]['subchildrange'] != undefined
    //         ) {
    //           queryParams['dateFrom'] = new Date(
    //             this.filterData[i]['childFilter']
    //           ).toISOString(); // this.data["dateFrom"]
    //           queryParams['dateTo'] = new Date(
    //             this.filterData[i]['subchildrange']
    //           ).toISOString(); // this.data["dateTo"]
    //           queryParams['dueDateType'] = 1;
    //         } else {
    //           queryParams['dueDate'] = new Date(
    //             this.filterData[i]['childFilter']
    //           ).toISOString(); //this.data["dueDate"];
    //           queryParams['dueDateType'] = this.filterData[i]['dueDateType'];
    //         }
    //       } else if (this.filterData[i]['filterId'] == 3) {
    //         queryParams['pastDue'] = this.data['pastDue'];
    //         //queryParams["CreatedOnType"] = 0;
    //       } else if (this.filterData[i]['filterId'] == 4) {
    //         queryParams['completed'] = this.data['completed'];
    //         //queryParams["CreatedOnType"] = 0;
    //       } else if (this.filterData[i]['filterId'] == 5) {
    //         if (this.filterData[i]['filterId'] === 'Product') {
    //           queryParams['productId'] = this.data['productId'];
    //         } else {
    //           queryParams['businessPartnerId'] = this.data['businessPartnerId'];
    //         }
    //       } else if (this.filterData[i]['filterId'] == 6) {
    //         queryParams['presetActivityId'] = this.data['presetActivityId'];
    //       } else if (this.filterData[i]['filterId'] == 7) {
    //         queryParams['branchId'] = this.data['branchId'];
    //       } else if (this.filterData[i]['filterId'] == 8) {
    //         queryParams['userId'] = this.data['userId'];
    //       } else if (this.filterData[i]['filterId'] == 9) {
    //         queryParams['note'] = this.data['note'];
    //       } else if (this.filterData[i]['filterId'] == 10) {
    //         const dateFrom = moment().utc().subtract(7, 'days').format();
    //         const dateTo = moment().utc().format('YYYY-MM-DD');
    //         this.dateFrom = dateFrom;
    //         this.dateTo = dateTo;
    //         queryParams['CreatedOnAfter'] = this.dateFrom;
    //         queryParams['CreatedOnBefore'] = this.dateTo;
    //         queryParams['CreatedOnType'] = 1;
    //       }
    //     }
    //   }
    //   queryParams['type'] = this.displayType;
    //   queryParams['limit'] = this.taskDashboardLimit;
    //   queryParams['offset'] = this.offset;
    //   this.commonService
    //     .callApi('api/clients/taskDashboard?' + queryParams1, queryParams, 'get')
    //     .then((success) => {
    //       if (success) {
    //         this.listrecords = success.records;
    //         this.listRecordsTotal = success.total;
    //         this.taskDashboardMaxPage = Math.floor(
    //           success.total / this.taskDashboardLimit
    //         ); // this.limit
    //         this.listrecords.map((record: any) => {
    //           record.showBlackListIcon = true;
    //           record.showBlackChatIcon = false;
    //           record.showBlackFolderIcon = false;
    //           if (record.relatedTaskList === null) {
    //             record.relatedTaskList = [];
    //           }
    //         });
    //         setTimeout(() => {
    //           if (this.listrecords.length > 0) {
    //             var ele = document.getElementById(
    //               `th-table-descp`
    //             ) as HTMLElement;
    //             var mainWidth = ele.offsetWidth;
    //             this.setProperWidth(mainWidth);
    //           }
    //         }, 3000);
    //       } else {
    //         this.popToast('error', success.message);
    //       }
    //     })
    //     .catch((e) => {
    //       console.log('there is an error:', e);
    //     });
    //   if (terminate) {
    //     let tempconfig: any = {};
    //     if (this.selectedFilterValue === 1 || this.selectedFilterValue === 2) {
    //       tempconfig['filterName'] = this.selectedFilterName;
    //       tempconfig['filterId'] = this.selectedFilterValue;

    //       if (this.selectedFilterValue === 2) {
    //         tempconfig['parentFilter'] =
    //           'Due Date ' + this.filterDataNew.bindedValue.title;
    //       } else {
    //         tempconfig['parentFilter'] = 'Date ';
    //       }
    //       tempconfig['secondFilter'] = this.filterDataNew.bindedValue.title;
    //       tempconfig['childFilter'] = this.startDateFrom;
    //       tempconfig['subchildrange'] = this.startDateTo;
    //       if (this.startDateTo == '') {
    //         if (this.selectedFilterValue === 2) {
    //           tempconfig['dueDateType'] = this.tmpFilterData.dueDateType;
    //           delete this.tmpFilterData.dueDate;
    //           delete this.tmpFilterData.dueDateType;
    //         } else {
    //           tempconfig['createdOnType'] = this.tmpFilterData.createdOnType;
    //           delete this.tmpFilterData.createdOn;
    //           delete this.tmpFilterData.createdOnType;
    //         }
    //       }
    //       tempconfig['selectedObj'] = this.filterDataNew;
    //       if (this.monthFrom || this.monthTo) {
    //         tempconfig['childFilter'] = this.monthFrom;
    //         tempconfig['subchildrange'] = this.monthTo;
    //         if (this.selectedFilterValue === 2) {
    //           tempconfig['parentFilter'] =
    //             'Due Month ' + this.filterDataNew.bindedValue.title;
    //         } else {
    //           tempconfig['parentFilter'] =
    //             'Date Month ' + this.filterDataNew.bindedValue.title;
    //         }
    //       }
    //       if (this.yearFrom || this.yearTo) {
    //         tempconfig['childFilter'] = this.yearFrom;
    //         tempconfig['subchildrange'] = this.yearTo;
    //         if (this.selectedFilterValue === 2) {
    //           tempconfig['parentFilter'] =
    //             'Due Year ' + this.filterDataNew.bindedValue.title;
    //         } else {
    //           tempconfig['parentFilter'] =
    //             'Date Year ' + this.filterDataNew.bindedValue.title;
    //         }
    //       }
    //       this.filterData.push(tempconfig);
    //       this.filterIReport = false;
    //       this.isFilterOpen = false;
    //       const index = this.filterstart
    //         .map((e) => {
    //           return e.id;
    //         })
    //         .indexOf(this.selectedFilterValue);
    //       this.filterDataNew = {};
    //       this.filterstart.splice(0, index + 1);
    //       this.selectedFilterValue = 0;
    //     } else if (this.selectedFilterValue === 3) {
    //       tempconfig['filterName'] = this.selectedFilterName;
    //       tempconfig['filterId'] = this.selectedFilterValue;
    //       tempconfig['parentFilter'] = this.selectedFilterName;
    //       tempconfig['childFilter'] = this.filterDataNew.pastDue;
    //       tempconfig['selectedObj'] = this.filterDataNew.pastDue;

    //       this.filterData.push(tempconfig);
    //       this.filterDataNew = {};
    //       this.filterIReport = false;
    //       this.isFilterOpen = false;
    //       const index = this.filterstart
    //         .map((e) => {
    //           return e.id;
    //         })
    //         .indexOf(this.selectedFilterValue);
    //       this.filterstart.splice(0, index + 1);
    //       this.selectedFilterValue = 0;
    //     } else if (this.selectedFilterValue === 4) {
    //       tempconfig['filterName'] = this.selectedFilterName;
    //       tempconfig['filterId'] = this.selectedFilterValue;
    //       tempconfig['parentFilter'] = this.selectedFilterName;
    //       tempconfig['selectedObj'] = this.filterDataNew.completed;
    //       this.filterData.push(tempconfig);
    //       this.filterDataNew = {};
    //       this.filterIReport = false;
    //       this.isFilterOpen = false;
    //       const index = this.filterstart
    //         .map((e) => {
    //           return e.id;
    //         })
    //         .indexOf(this.selectedFilterValue);
    //       this.filterstart.splice(0, index + 1);
    //       this.selectedFilterValue = 0;
    //     } else if (this.selectedFilterValue === 5) {
    //       tempconfig['filterName'] = this.selectedFilterName;
    //       tempconfig['filterId'] = this.selectedFilterValue;
    //       tempconfig['parentFilter'] = this.selectedFilterName;
    //       tempconfig['childFilter'] = this.filterDataNew.type.title;
    //       if (this.filterDataNew.type.title === 'Product') {
    //         tempconfig['selectedObj'] = this.filterDataNew.productId.title;
    //       } else {
    //         tempconfig['selectedObj'] =
    //           this.filterDataNew.businessPartnerId.title;
    //       }
    //       this.filterData.push(tempconfig);
    //       this.filterDataNew = {};
    //       this.filterIReport = false;
    //       this.isFilterOpen = false;
    //       const index = this.filterstart
    //         .map((e) => {
    //           return e.id;
    //         })
    //         .indexOf(this.selectedFilterValue);
    //       this.filterstart.splice(0, index + 1);
    //       this.selectedFilterValue = 0;
    //     } else if (this.selectedFilterValue === 6) {
    //       tempconfig['filterName'] = this.selectedFilterName;
    //       tempconfig['filterId'] = this.selectedFilterValue;
    //       tempconfig['parentFilter'] = 'Title ';
    //       tempconfig['childFilter'] = this.filterDataNew.presetActivityId.title;
    //       tempconfig['selectedObj'] = this.filterDataNew.presetActivityId.title;

    //       this.filterData.push(tempconfig);
    //       this.filterDataNew = {};
    //       this.filterIReport = false;
    //       this.isFilterOpen = false;
    //       const index = this.filterstart
    //         .map((e) => {
    //           return e.id;
    //         })
    //         .indexOf(this.selectedFilterValue);
    //       this.filterstart.splice(0, index + 1);
    //       this.selectedFilterValue = 0;
    //     } else if (this.selectedFilterValue === 7) {
    //       tempconfig['filterName'] = this.selectedFilterName;
    //       tempconfig['filterId'] = this.selectedFilterValue;
    //       tempconfig['parentFilter'] = this.selectedFilterName;
    //       tempconfig['childFilter'] = this.filterDataNew.branchId.title;
    //       tempconfig['selectedObj'] = this.filterDataNew.branchId.title;

    //       this.filterData.push(tempconfig);
    //       this.filterDataNew = {};
    //       this.filterIReport = false;
    //       this.isFilterOpen = false;
    //       const index = this.filterstart
    //         .map((e) => {
    //           return e.id;
    //         })
    //         .indexOf(this.selectedFilterValue);
    //       this.filterstart.splice(0, index + 1);
    //       this.selectedFilterValue = 0;
    //     } else if (this.selectedFilterValue === 8) {
    //       tempconfig['filterName'] = this.selectedFilterName;
    //       tempconfig['filterId'] = this.selectedFilterValue;
    //       tempconfig['parentFilter'] = this.selectedFilterName;
    //       tempconfig['childFilter'] = this.filterDataNew.assignedTo.title;
    //       tempconfig['selectedObj'] = this.filterDataNew.assignedTo.title;

    //       this.filterData.push(tempconfig);
    //       this.filterDataNew = {};
    //       this.filterIReport = false;
    //       this.isFilterOpen = false;
    //       const index = this.filterstart
    //         .map((e) => {
    //           return e.id;
    //         })
    //         .indexOf(this.selectedFilterValue);
    //       this.filterstart.splice(0, index + 1);
    //       this.selectedFilterValue = 0;
    //     } else if (this.selectedFilterValue === 9) {
    //       tempconfig['filterName'] = this.selectedFilterName;
    //       tempconfig['filterId'] = this.selectedFilterValue;
    //       tempconfig['parentFilter'] = this.selectedFilterName;
    //       tempconfig['childFilter'] = this.filterDataNew.note;
    //       tempconfig['selectedObj'] = this.filterDataNew.note;

    //       this.filterData.push(tempconfig);
    //       this.filterDataNew = {};
    //       this.filterIReport = false;
    //       this.isFilterOpen = false;
    //       const index = this.filterstart
    //         .map((e) => {
    //           return e.id;
    //         })
    //         .indexOf(this.selectedFilterValue);
    //       this.filterstart.splice(0, index + 1);
    //       this.selectedFilterValue = 0;
    //     } else if (this.selectedFilterValue === 10) {
    //       tempconfig['filterName'] = 'L7D';
    //       tempconfig['filterId'] = 10;
    //       tempconfig['parentFilter'] = 'Date ';
    //       tempconfig['childFilter'] = 'L7D';
    //       this.filterData.push(tempconfig);
    //       this.filterDataNew = {};
    //       this.filterIReport = false;
    //       this.isFilterOpen = false;
    //       this.filterstart = this.filterstart.filter((X) => X.id != 10);
    //       this.selectedFilterValue = 0;
    //     }
    //   }
    // }
  }
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
  validateValue(event) {
    if (event >= 0 && event <= 23) {
      this.calendar.hourSelection = event;
    } else {
      this.calendar.hourSelection = 0;
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
  changeMemoFilterUsers(event) {
    this.memoTypeName = 'Users - ' + event.title;
    this.memoType = 'Users';
    this.memoTypeUserId = event.id;
    this.getMemos(event);
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
  openChatModal() {
  }
  onTaskClick(id) {
    this.router.navigate(['/main/task/view'], { queryParams: { id: id } });
  }
}
