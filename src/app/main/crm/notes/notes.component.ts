import {
  Component,
  OnInit,
  Injector,
  TemplateRef,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { BaseComponent } from "../../../common/commonComponent";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";
import { Subject, Observable, of, concat } from "rxjs";
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
} from "rxjs/operators";
// import { MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY } from "@angular/material";
import { trigger } from "@angular/animations";
import { fadeIn, fadeOut } from "../../../reusable/fade-animations";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
// import {
//   PerfectScrollbarConfigInterface,
//   PerfectScrollbarComponent,
//   PerfectScrollbarDirective,
// } from "ngx-perfect-scrollbar";
import { CarouselConfig } from "ngx-bootstrap/carousel";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import moment from "moment";
import { NgSelectComponent } from "@ng-select/ng-select";
// import { DATE } from "ngx-bootstrap/chronos/units/constants/";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-notes",
  standalone:false,
  templateUrl: "./notes.component.html",
  animations: [
    trigger("fadeOut", fadeOut()),
    trigger("fadeIn", fadeIn(":enter")),
  ],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 1500, noPause: true, showIndicators: true },
    },
  ],
  styles: [],
})
export class NotesComponent extends BaseComponent implements OnInit {
  // public ts :any="1560490005688";
  public ts = this.getTimeStap();

  public offset: any = 0;
  public limit: any = 25;
  total: any;
  public user: any = {};
  public tasks = [
    { type: 1, name: "General", id: 1 },
    { type: 2, name: "Customer", id: 2 },
    { type: 3, name: "Company", id: 3 },
    { type: 4, name: "Contact", id: 4 },
    { type: 5, name: "Task", id: 5 },
  ];

  public icon1: boolean = false;
  public sidemenu: boolean = false;
  public MainSearchdataSource = new Subject<string>();
  public clientNameItem: Observable<any>;
  public supplierLoading: boolean = false;
  public listrecords: any = [];
  public taskrecords: any = [];
  public titleArr: any = [];
  public maxDate = new Date();
  modalRef: BsModalRef;
  typeArray = ["", "General", "Customer", "Company", "Contact", "Task"];
  // @ViewChild("perfectScroll") perfectScroll: PerfectScrollbarComponent;
  public type: string = "component";
  // public config: PerfectScrollbarConfigInterface = {};
  public page: number = 0;
  public showingPage: number = 0;
  public maxPage: number = 0;
  public isScrollUp: boolean = false;
  fileList: any = [];
  showId = 0;
  subShowId = 0;
  delSubShowId = 0;
  activeSlideIndex = 0;
  selectedNotesImagesObject: any = [];
  clientShowId = 0;
  clientTaskShowId = 0;
  subClientShowId = 0;
  deleteNoteId: any = 0;
  showAddNewTaskButton: boolean = false;
  isSingledOut: boolean = false;
  singledOutUserID: number = 0;
  createedDate: boolean = false;
  dueDate: boolean = false;
  taskdueDate: boolean = false;
  customerNameCreateTask: any = "";
  accessLevel: number;
  users: any = [];
  assignToData = null;
  assignto: boolean = false;
  addForm: FormGroup;
  created_Date: any = new Date();
  due_date: any = new Date();
  bsConfig: Partial<BsDatepickerConfig>;
  bsConfigCreated_Date: Partial<BsDatepickerConfig>;
  presetActivity = {};
  isSaveButtonDisabled: boolean = false;
  businessPartnerCreateTask: any;
  showNoteDetailsDiv: boolean = false;
  noteDetailsData: any;
  fliterflag: boolean = false;
  activateSecondComapanyFilter: boolean = false;
  activateSecondFilter: boolean = false;
  filterData: any = {};
  @ViewChild("filterName") filterName: NgSelectComponent;
  isOpenFilter = false;
  tempArr = [];
  filterstart = [
    {
      id: 1,
      title: "Date of Entry",
      option: [],
      async: false,
      labelName: "Date of Entry",
      bindedValue: "",
    },
    {
      id: 2,
      title: "Type of Note",
      option: [],
      async: false,
      labelName: "Type of Note",
      bindedValue: "",
    },
    {
      id: 3,
      title: "Title",
      option: [],
      async: false,
      labelName: "Title",
      bindedValue: "",
    },
    {
      id: 4,
      title: "Note",
      option: [],
      async: false,
      labelName: "Note",
      bindedValue: "",
    },
    {
      id: 5,
      title: "Branch",
      option: [],
      async: false,
      labelName: "Branch",
      bindedValue: "",
    },
  ];
  branchrecords: any = [];
  @ViewChild("secondFilter1") secondFilter: NgSelectComponent;
  @ViewChild("secondFilter1") secondFilter1: ElementRef;
  taskTypeList = [];
  isOpen = false;
  presetActivities: [];
  branches: [];
  data: any = {};
  startDateFrom: any;
  startDateTo: any;
  startDateInput: any;
  endDateInput: any;
  refFilter = [...this.filterstart];
  clientTasks: any = [];
  clientNotes: any = [];
  showTaskShowMore: boolean = true;
  showNotesShowMore: boolean = true;
  tempClientTaskArray: any = [];
  tempClientNotesArray: any = [];
  addCustomerBasicInfo: FormGroup;
  contactList: any = [];
  companyList: any = [];
  displayStepOne: boolean = false;
  displayStepTwo: boolean = false;
  displayStepThree: boolean = false;
  displayStepFour: boolean = false;
  paymentList: any = [];
  tenantUsers: any = [];
  areaLookup: any = [];
  regionList: any = [];
  establishmentTypes: any = [];
  customers: Observable<any>;
  companies: Observable<any>;
  contacts: Observable<any>;
  showDummySidebar: boolean = true;
  public scrollbarXOptions = {
    axis: "x",
    theme: "light",
    scrollbarPosition: "inside",
    autoHideScrollbar: true,
    callbacks: {
      onTotalScroll: () => {},
      onTotalScrollOffset: 100,
      alwaysTriggerOffsets: false,
    },
  };
  crmNotePopupData: any = {};
  noteDetailBusinessPartnerID: any;
  taskDetailBusinessPartnerID: any;
  crmTaskPopupData: any = {};
  businessPartnerId: any = "";
  listApiFilterType: any = "";
  public scrollbarOptionsFilterMenu = {
    axis: "x",
    theme: "light",
    scrollbarPosition: "inside",
    advanced: { autoExpandHorizontalScroll: true },
    autoHideScrollbar: false,
    callbacks: {
      onTotalScrollOffset: 500,
    },
  };
taskDataObj: any;
subListTask: any;
  constructor(
    inj: Injector,
    public override modalService: BsModalService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {
    super(inj);
    this.route.params.subscribe((params) => {
      if (params["businessPartnerId"]) {
        this.businessPartnerId = params["businessPartnerId"];
        this.listApiFilterType = params["type"];
      }
    });
  }

  addQuickModal(quickcustomer: TemplateRef<any>) {
    this.modalRef = this.modalService.show(quickcustomer, {
      class: "modal-xl task-modal modal-dialog-centered quick-popup",
    });
  }

  ngOnInit() {
    if (this.businessPartnerId && this.businessPartnerId !== "") {
      this.singleOutClient(this.businessPartnerId);
    } else {
      this.listApi();
    }
    this.getBranches();
    this.loadTypehead();
    this.presetTitle();
    this.Taskdropdown();
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
    this.commonService.getCurrentUser().then((user) => {
      this.accessLevel = this.lookupService.getNumericAccessLevel(
        user.tenant.accessLevel
      );
      if (this.accessLevel > 2) {
        this.assignto = true;
      }
    });
  }
  /*****************************************************
  @purpose : For search and getting the list for dropdown
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
  }
  getSearchList(value: string = null, allow): Observable<any[]> {
    this.supplierLoading = true;
    let data = {};
    if (value) {
      data["entityType"] = "client";
      data["q"] = value;
    }
    let items;
    return this.commonService
      .callApiObservable("api/clients/lookup", data)
      .pipe(
        catchError(() => of({ items: [] })),
        map((success) => {
          items = success;
          if (allow) {
            this.clientNameItem = success["records"];
          }
          if (items.length === 0) {
            items.push({ title: "Add new ?", id: 0 });
          }

          this.supplierLoading = false;
          return items ? items : [];
        })
      );
  }
  setProperWidth(width) {
    setTimeout(() => {
      if (this.listrecords.length > 0) {
        this.listrecords.map((record: any) => {
          if (record.notes !== null) {
            var ele = document.getElementById(
              `table-text-${record.id}`
            ) as HTMLElement;
            var ele1 = document.getElementById(
              `table-text1-${record.id}`
            ) as HTMLElement;
            ele.style.width = String(width - 40) + "px";
            ele1.style.width = String(width) + "px";
          }
        });
      }
    }, 100);
  }
  /*****************************************************
  @purpose : For getting the list 
  @parameters : 
  @return :
  *****************************************************/
  listApi() {
    var queryParams =
      "ts=" + this.ts + "&offset=" + this.offset + "&limit=" + this.limit;
    this.commonService
      .callApi("api/clients/notes?" + queryParams, "", "get")
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.listrecords.map((record: any) => {});
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
          }, 100);
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  /*****************************************************
  @purpose :For getting the tasks dropdown
  @parameters : 
  @return :
  *****************************************************/
  Taskdropdown() {
    var queryParams1 = "includeActiveTasksForCurrentUser=" + true + "&q=";
    this.commonService
      .callApi("api/clients/tasks/lookup?" + queryParams1, "", "get")
      .then((success) => {
        if (success) {
          this.taskrecords = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  changeIc(type) {
    if (type == "dots") {
      this.icon1 = true;
      this.sidemenu = true;
      this.user = {};
      this.user["dateOfEntry"] = this.maxDate;
      this.user["hourSelection"] = moment().format("HH");
      this.user["minutesSelection"] = moment().format("mm");
      this.showNoteDetailsDiv = false;
      this.showDummySidebar = false;
    } else if (type == "edit") {
      this.icon1 = true;
      this.sidemenu = true;
      this.showNoteDetailsDiv = false;
      this.showDummySidebar = false;
    } else if (type == "details") {
      this.icon1 = true;
      this.sidemenu = true;
      this.showNoteDetailsDiv = true;
      this.showDummySidebar = false;
    } else {
      this.showDummySidebar = true;
      this.showNoteDetailsDiv = false;
      this.icon1 = false;
      this.sidemenu = false;
      this.user = {};
    }
    this.setWidths();
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
  editCustomerSetup(item) {
    this.icon1 = true;
    this.sidemenu = true;
    this.user = item;
  }
  ModelDatepicker(event) {}
  changedCheck(event) {}
  Createdisnote(data) {
    this.commonService
      .callApi("api/clients/notes", data, "post")
      // .callApi("api/clients/notes", data, "post")
      .then((success) => {
        if (success) {
          this.icon1 = false;
          this.sidemenu = false;
          if (this.fileList.length > 0) {
            this.saveNotesImages(success.id);
          } else {
            this.listApi();
          }
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }

  saveNotesImages(noteId) {
    if (this.fileList.length > 0) {
      this.fileList.map((file: any) => {
        let formData: FormData = new FormData();
        formData.append("file", file);
        this.commonService
          .callApi(
            `api/clients/notes/uploadImage/${noteId}`,
            formData,
            "post",
            true
          )
          .then((success) => {});
      });
      this.fileList = [];
      this.listApi();
    }
  }
  /*****************************************************
  @purpose : For Updateditnote
  @parameters : 
  @return :
  *****************************************************/
  updatedNote(data) {
    this.commonService
      .callApi("api/clients/notes/" + data.id, data, "put")
      .then((success) => {
        if (success) {
          this.icon1 = false;
          this.sidemenu = false;
          if (this.fileList.length > 0) {
            this.saveNotesImages(success.id);
          } else {
            this.listApi();
          }
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  presetTitle() {
    this.commonService
      .callApi("api/tenants/presetactivities/lookup", "", "get")
      .then((success) => {
        if (success) {
          this.titleArr = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  selected(event) {}

  deletenotes(i) {
 this.swal({
      imageUrl: "assets/images/trash-bin1.png",
      imageWidth: 155,
      text: "Are you sure you want to delete this record?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Yes",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.commonService
          .callApi("api/clients/notes/" + i.id, "", "delete")
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
              this.popToast("error", success.message);
            }
          })
          .catch((e) => {
            console.log("there is an error:", e);
          });
      }
    });
  }
  onOpenCalendar(event:any){

  }
  onOpenyearCalendar(event:any){
    
  }
  recordSelected(event, addCustomerPopup?) {
    if (event.id === 0) {
      this.setAddCustomerBasicForm();
      this.displayStepOne = true;
      this.displayStepTwo = false;
      this.displayStepThree = false;
      this.displayStepFour = false;
      this.modalRef = this.modalService.show(addCustomerPopup, {
        class:
          "modal-xl task-modal modal-dialog-centered quick-popup add-new-customer-popup",
      });
    } else {
      $("#notesname :input").blur();
      $("#businessPartner :input").blur();
      $("#taskname :input").blur();
    }
  }
  setAddCustomerBasicForm() {
    this.addCustomerBasicInfo = new FormGroup({
      title: new FormControl("", [Validators.required]),
      address1: new FormControl("", []),
      address2: new FormControl("", []),
      city: new FormControl("", []),
      state: new FormControl("", []),
      country: new FormControl("", []),
      zip: new FormControl("", []),
      email: new FormControl("", []),
      faceBook: new FormControl("", []),
      instaGram: new FormControl("", []),
      google: new FormControl("", []),
      tiktok: new FormControl("", []),
      webSite: new FormControl("", []),
      contactPerson: new FormControl("", []),
      company: new FormControl("", []),
      internalNotes: new FormControl("", []),
      externalNotes: new FormControl("", []),
      paymentTermDuration: new FormControl("", []),
      allowedCreditAmount: new FormControl("", []),
      salesRepresentative: new FormControl("", []),
      area: new FormControl("", []),
      branch: new FormControl("", []),
      establishmentType: new FormControl("", []),
    });
  }
  public onScrollEvent(event: any): void {}
  onScrollDown(ev) {
    if (this.page < this.maxPage) {
      this.page++;
      this.offset = this.page * this.limit;
      var queryParams =
        "ts=" + this.ts + "&offset=" + this.offset + "&limit=" + this.limit;
      this.commonService
        .callApi("api/clients/notes?" + queryParams, "", "get")
        .then((success) => {
          if (success) {
            if (success.records.length > 0) {
              success.records.map((record: any) => {
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
            }, 100);
          } else {
            this.popToast("error", success.message);
          }
        })
        .catch((e) => {
          console.log("there is an error:", e);
        });
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
        this.offset = this.showingPage * this.limit;
        this.listApi();
      }
    }
  }
  removeShadow() {
    // this.taskId = 0;
  }
  addNotesImage(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files && event.target.files[i]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (events: any) => {
          const file = event.target.files[i];
          this.fileList.push(file);
          let tempArray: any = {};
          tempArray.showLoader = true;
          tempArray.src = events.target.result;
        };
      }
    }
  }
  subDropdownClose() {
    this.subShowId = 0;
  }
  subClientDropdownClose() {
    this.subClientShowId = 0;
    this.clientTaskShowId = 0;
  }
  dropdownClose() {
    this.showId = 0;
  }
  clientDropdownClose() {
    this.clientShowId = 0;
    this.clientTaskShowId = 0;
  }
  dropdownClick(id) {
    this.showId = this.showId == 0 ? id : 0;
  }
  clientDropdownClick(id, taskID) {
    this.clientShowId = id;
    this.clientTaskShowId = taskID;
  }
  openNotePhotos(notesPhots: TemplateRef<any>, data) {
    this.selectedNotesImagesObject = [];
    let showPopup: boolean = false;
    if (data.crmNoteImages.length > 0) {
      data.crmNoteImages.map((image: any, i, row) => {
        if (image.image) {
          this.commonService
            .callApi(
              "api/clients/notes/retriveNotesImage?name=" + image.image,
              "",
              "get"
            )
            .then((success) => {
              if (success) {
                image.src = success;
              } else {
                image.src = "";
              }
            });
        }
        if (i + 1 === row.length) {
          showPopup = true;
        }
      });
      if (showPopup) {
        setTimeout(() => {
          this.selectedNotesImagesObject = data.crmNoteImages;
          this.modalRef = this.modalService.show(notesPhots, {
            class:
              "modal-xl task-modal modal-dialog-centered quick-popup gallery-popup",
          });
        }, 1000);
      }
    }
  }
  fetchImage(url) {
    this.commonService
      .callApi("api/clients/notes/retriveNotesImage?name=" + url, "", "get")
      .then((success) => {
        if (success) {
          return success;
        } else {
          return "";
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  validateValue(event) {
    if (event > 0 && event <= 23) {
      this.user.hourSelection = event;
    } else {
      this.user.hourSelection = 23;
    }
  }
  validateMinutesValue(event) {
    if (event > 0 && event <= 59) {
      this.user.minutesSelection = event;
    } else {
      this.user.minutesSelection = 59;
    }
  }
  editThisRecord(data) {
    this.user = {};
    this.user = data;
    this.user.dateOfEntry = new Date(data.dateOfEntry);
    this.user.hourSelection = Number(moment(data.dateOfEntry).format("H"));
    this.user.minutesSelection = Number(moment(data.dateOfEntry).format("mm"));
    this.user.presetActivity = data.presetActivity;
    this.changeIc("edit");
  }
  setDeleteID(noteID) {
    this.deleteNoteId = noteID;
  }
  unsetDeleteId() {
    this.deleteNoteId = 0;
  }
  openDeletePopup(deleteNotesPopup: TemplateRef<any>) {
    this.modalRef = this.modalService.show(deleteNotesPopup, {
      class: "modal-dialog-centered quick-popup delete-popup",
    });
  }
  deleteThisNote() {
    this.commonService
      .callApi("api/clients/notes/" + this.deleteNoteId, "", "delete")
      .then((success) => {
        if (this.total <= this.offset) {
          this.offset = 0;
          this.listApi();
        } else {
          this.offset = 0;
          this.listApi();
        }
        if (success) {
          this.deleteNoteId = 0;
          this.popToast("success", "Notes deleted");
        } else {
          this.deleteNoteId = 0;
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  singleOutClient(clientID) {
    this.offset = 0;
    var queryParams =
      "ts=" +
      this.ts +
      "&offset=" +
      this.offset +
      "&limit=" +
      this.limit +
      "&businessPartnerId=" +
      clientID +
      "&type=2";
    this.commonService
      .callApi("api/clients/notes?" + queryParams, "", "get")
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.total = success.total;
          this.maxPage = Math.floor(success.total / this.limit);
          this.isSingledOut = true;
          this.singledOutUserID = clientID;
        } else {
          this.isSingledOut = false;
          this.singledOutUserID = 0;
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  deSingleClient() {
    this.isSingledOut = false;
    this.singledOutUserID = 0;
    this.offset = 0;
    this.listApi();
  }
  showNoteDetails(data) {
    if (this.showNoteDetailsDiv === true) {
      this.changeIc("");
    } else if (this.showNoteDetailsDiv === false) {
      this.noteDetailsData = {};
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
      this.noteDetailsData = data;
      setTimeout(() => {
        this.changeIc("details");
      }, 1000);
    }
  }
  getClientTasksDetails(clientID) {
    this.commonService
      .callApi(
        "api/clients/tasks?BusinessPartnerId=" + clientID + "&type=2",
        "",
        "get"
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
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
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
        "api/clients/notes?BusinessPartnerId=" + clientID + "&type=2",
        "",
        "get"
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
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
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
  createTaskModal(createTask: TemplateRef<any>, customerName, businessPartner) {
    this.refreshUsers();
    this.addForm = new FormGroup({
      dateOfEntry: new FormControl("", [Validators.required]),
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
      .get("dateOfEntry")
      .setValue(this.datePipe.transform(new Date(), "MMM d, y"));
    this.addForm
      .get("dateOfEntryTemp")
      .setValue(this.datePipe.transform(new Date(), "MMM d, y"));

    // this.user.dateOfEntry = new Date();
    this.bsConfig = Object.assign(
      {},
      {
        containerClass: "custom-picker theme-white theme-green",
        adaptivePosition: true,
        dateInputFormat: "MM DD,YYYY",
      }
    );
    this.bsConfigCreated_Date = Object.assign(
      {},
      {
        containerClass: "custom-picker theme-white theme-green",
        adaptivePosition: true,
        dateInputFormat: "MM DD,YYYY",
      }
    );
    this.customerNameCreateTask = customerName;
    this.businessPartnerCreateTask = businessPartner;
    this.modalRef = this.modalService.show(createTask, {
      class: "modal-lg modal-dialog-centered quick-task-modal",
    });
  }
  createdDateClick() {
    this.createedDate = true;
  }
  dueDateClick() {
    this.dueDate = true;
  }
  taskdueDateClick() {
    this.taskdueDate = true;
  }
  createdDateClose() {
    this.createedDate = false;
  }
  dueDateClose() {
    this.dueDate = false;
  }
  changeAssignTo(e) {
    this.assignToData = e;
  }

  refreshUsers() {
    this.commonService
      .callApi("api/clients/tasks/getAssignedUsers?q=", "", "get")
      .then((success) => {
        if (success) {
          this.users = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  createdDateValueChange(e, bsConfig) {
    if (!bsConfig.adaptivePosition) {
      this.addForm
        .get("dateOfEntry")
        .setValue(this.datePipe.transform(e, "MMM d, y"));
      this.addForm.get("dateOfEntryTemp").setValue(e);
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
        .get("dueDate")
        .setValue(this.datePipe.transform(e, "MMM d, y"));
      this.addForm.get("dueDateTemp").setValue(e);
      this.dueDate = false;
      this.due_date = e;
      bsConfig.adaptivePosition = true;
      event.stopPropagation();
    } else {
      bsConfig.adaptivePosition = undefined;
      event.stopPropagation();
    }
  }
  onChangepresetActivity(e) {
    this.presetActivity = e;
    if (e.dueDays != null && e.dueDays != undefined && e.dueDays != "") {
      this.due_date = new Date();
      var pastDate = this.due_date.getDate() + e.dueDays;
      this.due_date.setDate(pastDate);
      this.addForm
        .get("dueDate")
        .setValue(this.datePipe.transform(this.due_date, "MMM d, y"));
      this.addForm.get("dueDateTemp").setValue(this.due_date);
    }
  }
  submitAddForm() {
    this.isSaveButtonDisabled = true;
    this.addForm.value.type = 2;
    var addTask = {
      dateOfEntry: this.addForm.value["dateOfEntryTemp"],
      dueDate: this.addForm.value["dueDateTemp"],
      type: this.addForm.value["type"],
      board: this.addForm.value["boardName"],
      subTitle: this.addForm.value["subTitle"],
      note: this.addForm.value["note"],
      status: "1",
    };
    addTask["businessPartner"] = this.businessPartnerCreateTask;
    addTask["presetActivity"] = this.presetActivity;
    let associatedUserIds = this.addForm.value["associatedUserIds"];
    if (
      associatedUserIds != null &&
      associatedUserIds != "" &&
      associatedUserIds.length > 0
    ) {
      addTask["associatedUserIds"] = associatedUserIds.toString();
    }
    let user = this.addForm.value["user"];
    if (user != null && user != "") {
      addTask["user"] = this.assignToData;
    }
    this.commonService
      .callApi("api/clients/tasks", addTask, "post")
      .then((success) => {
        this.isSaveButtonDisabled = false;
        if (success) {
          this.modalRef.hide();
          this.listApi();
          this.businessPartnerCreateTask = {};
          this.customerNameCreateTask = "";
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        this.isSaveButtonDisabled = false;
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
  getBranches() {
    this.commonService
      .callApi("api/tenants/branches/lookup?q=", "", "get")
      .then((success) => {
        if (success) {
          this.branchrecords = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  changedParentFilter(event) {
    $("#filterName :input").blur();
    let options;
    if (event.id == 1) {
      this.filterData.bindedValue = "";
      options = [
        { id: 1, title: "Specific Date" },
        { id: 2, title: "Date Range" },
        { id: 3, title: "Week to Date" },
        { id: 4, title: "Past Week" },
        { id: 5, title: "Past 2 Weeks" },
        { id: 6, title: "Current Month" },
        { id: 7, title: "Past Month" },
        { id: 8, title: "YTD" },
        { id: 9, title: "QTR 1" },
        { id: 10, title: "QTR 2" },
        { id: 11, title: "QTR 3" },
        { id: 12, title: "QTR 4" },
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
    } else if (event.id == 3) {
      this.filterData.bindedValue = null;
      options = [...this.titleArr];
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          // this.secondFilter.filterInput.nativeElement.focus();
          this.isOpen = true;
        });
      }
    } else if (event.id == 4) {
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          $("#txtNotes").focus();
        }, 100);
      }
    } else if (event.id == 5) {
      this.filterData.bindedValue = null;
      options = [...this.branchrecords];
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          // this.secondFilter.filterInput.nativeElement.focus();
          this.isOpen = true;
        });
      }
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
    $("#secondFilter :input").blur();
    $("#supplierName :input").blur();
    if (this.filterData.id === 1) {
      if (this.filterData.bindedValue.id == 1) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = false;
      } else if (this.filterData.bindedValue.id == 2) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
      } else if (this.filterData.bindedValue.id == 3) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
        this.data["createdOnType"] = 10;
        this.data["createdOnAfter"] = moment()
          .utc()
          .startOf("isoWeek")
          .format();
        this.data["createdOnBefore"] = moment()
          .utc()
          .format();
        this.startDateInput = moment()
          .utc()
          .startOf("isoWeek")
          .format("DD-MM-YYYY");
        this.endDateInput = moment()
          .utc()
          .format("DD-MM-YYYY");
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id == 4) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
        this.data["createdOnType"] = 7;
        this.data["createdOnAfter"] = moment()
          .subtract(1, "weeks")
          .utc()
          .startOf("isoWeek")
          .format();
        this.data["createdOnBefore"] = moment()
          .subtract(1, "weeks")
          .endOf("isoWeek")
          .utc()
          .format();
        this.startDateInput = moment()
          .subtract(1, "weeks")
          .utc()
          .startOf("isoWeek")
          .format("DD-MM-YYYY");
        this.endDateInput = moment()
          .subtract(1, "weeks")
          .endOf("isoWeek")
          .utc()
          .format("DD-MM-YYYY");
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id == 5) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
        this.data["createdOnType"] = 8;
        this.data["createdOnAfter"] = moment()
          .subtract(2, "weeks")
          .utc()
          .startOf("isoWeek")
          .format();
        this.data["createdOnBefore"] = moment()
          .subtract(1, "weeks")
          .endOf("isoWeek")
          .utc()
          .format();
        this.startDateInput = moment()
          .subtract(2, "weeks")
          .utc()
          .startOf("isoWeek")
          .format("DD-MM-YYYY");
        this.endDateInput = moment()
          .subtract(1, "weeks")
          .endOf("isoWeek")
          .utc()
          .format("DD-MM-YYYY");
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id == 6) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
        this.data["createdOnType"] = 2;
        this.data["createdOnAfter"] = moment()
          .startOf("month")
          .utc()
          .format();
        this.data["createdOnBefore"] = moment()
          .utc()
          .format();
        this.startDateInput = moment()
          .startOf("month")
          .utc()
          .format("DD-MM-YYYY");
        this.endDateInput = moment()
          .utc()
          .format("DD-MM-YYYY");
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id == 7) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
        this.data["createdOnType"] = 9;
        this.data["createdOnAfter"] = moment()
          .subtract(1, "months")
          .startOf("month")
          .utc()
          .format();
        this.data["createdOnBefore"] = moment()
          .subtract(1, "months")
          .endOf("month")
          .utc()
          .format();
        this.startDateInput = moment()
          .subtract(1, "months")
          .startOf("month")
          .utc()
          .format("DD-MM-YYYY");
        this.endDateInput = moment()
          .subtract(1, "months")
          .endOf("month")
          .utc()
          .format("DD-MM-YYYY");
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id == 8) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
        this.data["createdOnType"] = 1;
        this.data["createdOnAfter"] = moment()
          .startOf("year")
          .utc()
          .format();
        this.data["createdOnBefore"] = moment()
          .utc()
          .format();
        this.startDateInput = moment()
          .startOf("year")
          .utc()
          .format("DD-MM-YYYY");
        this.endDateInput = moment()
          .utc()
          .format("DD-MM-YYYY");
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id == 9) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
        this.data["createdOnType"] = 3;
        this.data["createdOnAfter"] = moment()
          .quarter(1)
          .startOf("quarter")
          .utc()
          .format();
        this.data["createdOnBefore"] = moment()
          .quarter(1)
          .endOf("quarter")
          .utc()
          .format();
        this.startDateInput = moment()
          .quarter(1)
          .startOf("quarter")
          .utc()
          .format("DD-MM-YYYY");
        this.endDateInput = moment()
          .quarter(1)
          .endOf("quarter")
          .utc()
          .format("DD-MM-YYYY");
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id == 10) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
        this.data["createdOnType"] = 4;
        this.data["createdOnAfter"] = moment()
          .quarter(2)
          .startOf("quarter")
          .utc()
          .format();
        this.data["createdOnBefore"] = moment()
          .quarter(2)
          .endOf("quarter")
          .utc()
          .format();
        this.startDateInput = moment()
          .quarter(2)
          .startOf("quarter")
          .utc()
          .format("DD-MM-YYYY");
        this.endDateInput = moment()
          .quarter(2)
          .endOf("quarter")
          .utc()
          .format("DD-MM-YYYY");
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id == 11) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
        this.data["createdOnType"] = 5;
        this.data["createdOnAfter"] = moment()
          .quarter(3)
          .startOf("quarter")
          .utc()
          .format();
        this.data["createdOnBefore"] = moment()
          .quarter(3)
          .endOf("quarter")
          .utc()
          .format();
        this.startDateInput = moment()
          .quarter(3)
          .startOf("quarter")
          .utc()
          .format("DD-MM-YYYY");
        this.endDateInput = moment()
          .quarter(3)
          .endOf("quarter")
          .utc()
          .format("DD-MM-YYYY");
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id == 12) {
        this.filterData.suboptions = [];
        this.filterData.date = true;
        this.filterData.enddate = true;
        this.data["createdOnType"] = 6;
        this.data["createdOnAfter"] = moment()
          .quarter(4)
          .startOf("quarter")
          .utc()
          .format();
        this.data["createdOnBefore"] = moment()
          .quarter(4)
          .endOf("quarter")
          .utc()
          .format();
        this.startDateInput = moment()
          .quarter(4)
          .startOf("quarter")
          .utc()
          .format("DD-MM-YYYY");
        this.endDateInput = moment()
          .quarter(4)
          .endOf("quarter")
          .utc()
          .format("DD-MM-YYYY");
        this.applyFilter(this.data, "end");
      } else {
        this.filterData.suboptions = [];
        this.filterData.suboptions.push({
          options: [
            { id: 1, title: "Year" },
            { id: 2, title: "Month" },
            { id: 3, title: "Date" },
          ],
          bindvalue: "",
          type: "select",
          labelName: "Filter By",
        });
      }
    } else if (this.filterData.id === 2) {
      this.filterData.suboptions = [];
      if (this.filterData.bindedValue.id === 1) {
        this.data["type"] = this.filterData.bindedValue.id;
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id === 2) {
        this.filterData.suboptions.push({
          options: this.customers,
          bindvalue: "",
          async: true,
          type: "select",
          labelName: "Search Client",
        });
      } else if (this.filterData.bindedValue.id === 3) {
        this.filterData.suboptions.push({
          options: this.companies,
          async: true,
          bindvalue: "",
          type: "select",
          labelName: "Search company",
        });
      } else if (this.filterData.bindedValue.id === 4) {
        this.filterData.suboptions.push({
          options: this.contacts,
          async: true,
          bindvalue: "",
          type: "select",
          labelName: "Search contact",
        });
      } else if (this.filterData.bindedValue.id === 5) {
        this.filterData.suboptions.push({
          options: this.taskrecords,
          bindvalue: "",
          type: "select",
          labelName: "Search tasks",
        });
      }
    } else if (this.filterData.id === 3) {
      this.data["presetActivityId"] = this.filterData.bindedValue.id;
      this.applyFilter(this.data, "end");
    } else if (this.filterData.id === 4) {
      if (this.filterData.note != undefined && this.filterData.note != "") {
        this.data["note"] = this.filterData.note;
        this.applyFilter(this.data, "end");
      }
    } else if (this.filterData.id === 5) {
      this.data["branchId"] = this.filterData.bindedValue.id;
      this.applyFilter(this.data, "end");
    }
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
      delete this.data.presetActivityId;
    } else if (i.selectedObj.id == 4) {
      delete this.data.note;
    } else if (i.selectedObj.id == 5) {
      delete this.data.branchId;
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
  applyFilter(queryParams, terminate?) {
    this.showingPage = 0;
    this.page = 0;
    this.offset = 0;
    var queryParams1 =
      "ts=" + this.ts + "&offset=" + this.offset + "&limit=" + this.limit;
    this.commonService
      .callApi("api/clients/notes?" + queryParams1, queryParams, "get")
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
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
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });

    if (terminate) {
      let tempconfig: any = {};
      if (this.filterData.id == 1) {
        if (this.filterData.bindedValue.id === 1) {
          tempconfig["parentFilter"] = this.filterData.title;
          tempconfig["secondFilter"] = this.filterData.bindedValue.title;
          tempconfig["childFilter"] = moment(
            this.startDateInput,
            "DD-MM-YYYY"
          ).toDate();
        } else if (this.filterData.bindedValue.id !== 1) {
          tempconfig["parentFilter"] = this.filterData.title;
          tempconfig["secondFilter"] = this.filterData.bindedValue.title;
          tempconfig["childFilter"] = moment(
            this.startDateInput,
            "DD-MM-YYYY"
          ).toDate();
          tempconfig["subchildrange"] = moment(
            this.endDateInput,
            "DD-MM-YYYY"
          ).toDate();
        }
        tempconfig["selectedObj"] = this.filterData;
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
        tempconfig["parentFilter"] = this.filterData.title;
        tempconfig["secondFilter"] = this.filterData.bindedValue.title;
        tempconfig["selectedObj"] = this.filterData;
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
        tempconfig["parentFilter"] = this.filterData.title;
        tempconfig["secondFilter"] = this.filterData.bindedValue.title;
        tempconfig["selectedObj"] = this.filterData;
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
        tempconfig["parentFilter"] = this.filterData.title;
        tempconfig["secondFilter"] = this.filterData.note;
        tempconfig["selectedObj"] = this.filterData;
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
        tempconfig["parentFilter"] = this.filterData.title;
        tempconfig["secondFilter"] = this.filterData.bindedValue.title;
        tempconfig["selectedObj"] = this.filterData;
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
  modelDatepickerDate(event, type) {
    if (event !== null) {
      $("#minDatepicker :input").blur();
      $("#maxDatepicker :input").blur();
      if (this.filterData.bindedValue.id == 1) {
        this.startDateFrom = moment.utc(event).format();
        this.data["createdOnType"] = 11;
        this.data["createdOn"] = this.startDateFrom;
        this.startDateInput = event;
        this.applyFilter(this.data, "end");
      } else if (this.filterData.bindedValue.id == 2) {
        if (type === "start") {
          this.startDateFrom = moment.utc(event).format();
        } else if (type === "end") {
          this.startDateTo = moment.utc(event).format();
          this.endDateInput = event;
        }
        this.data["createdOnType"] = 12;
        this.data["createdOnAfter"] = this.startDateFrom;
        this.data["createdOnBefore"] = this.startDateTo;
        if (this.startDateFrom && this.startDateTo) {
          this.applyFilter(this.data, "end");
        }
      }
    }
  }
  getContactList() {
    this.commonService
      .callApi("api/clients/lookup?clientType=2", "", "get")
      .then((success) => {
        if (success) {
          this.contactList = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  getCompanytList() {
    this.commonService
      .callApi("api/clients/lookup?clientType=3", "", "get")
      .then((success) => {
        if (success) {
          this.companyList = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  addBasicInfo() {
    if (this.addCustomerBasicInfo.valid) {
      if (this.addCustomerBasicInfo.value.paymentTermDuration) {
        this.addCustomerBasicInfo.value.paymentTermDuration = this.addCustomerBasicInfo.value.paymentTermDuration.days;
      }
      this.commonService
        .callApi("/api/clients", this.addCustomerBasicInfo.value, "post")
        .then((success) => {
          if (success) {
            this.modalRef.hide();
            this.user.businessPartner = success.title;
          } else {
            this.popToast("error", success.message);
          }
        })
        .catch((e) => {
          console.log("there is an error:", e);
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
      .callApi("api/clients/PaymentTerms/lookup", "", "get")
      .then((success) => {
        if (success) {
          this.paymentList = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
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
      .callApi("api/tenants/users/lookup", "", "get")
      .then((success) => {
        if (success) {
          this.tenantUsers = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  getArearLookup() {
    this.commonService
      .callApi("api/clients/areas/lookup", "", "get")
      .then((success) => {
        if (success) {
          this.areaLookup = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  getRegionList() {
    this.commonService
      .callApi("api/tenants/branches/lookup", "", "get")
      .then((success) => {
        if (success) {
          this.regionList = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  getEstablishmentType() {
    this.commonService
      .callApi("api/clients/establishmenttypes/lookup", "", "get")
      .then((success) => {
        if (success) {
          this.establishmentTypes = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  refreshClients(value: string = null, allow): Observable<any[]> {
    let data = {};
    if (value) {
      data["entityType"] = "client";
      data["q"] = value;
    }
    let items;
    return this.commonService
      .callApiObservable("api/clients/lookup", data)
      .pipe(
        catchError(() => of({ items: [] })),
        map((success) => {
          items = success;
          if (allow) {
            this.customers = success["records"];
          }

          return items ? items : [];
        })
      );
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
  refreshCompanies(value: string = null, allow): Observable<any[]> {
    let data = {};
    if (value) {
      data["entityType"] = "client";
      data["ClientType"] = "3";
      data["q"] = value;
    }
    let items;
    return this.commonService
      .callApiObservable("api/clients/lookup", data)
      .pipe(
        catchError(() => of({ items: [] })),
        map((success) => {
          items = success;
          if (allow) {
            this.companies = success["records"];
          }

          return items ? items : [];
        })
      );
  }
  refreshContacts(value: string = null, allow): Observable<any[]> {
    let data = {};
    if (value) {
      data["entityType"] = "client";
      data["ClientType"] = "2";
      data["q"] = value;
    }
    let items;
    return this.commonService
      .callApiObservable("api/clients/lookup", data)
      .pipe(
        catchError(() => of({ items: [] })),
        map((success) => {
          items = success;
          if (allow) {
            this.contacts = success["records"];
          }

          return items ? items : [];
        })
      );
  }
  changedsubChildFilter(event) {
    if (this.filterData.id === 2 && this.filterData.bindedValue.type !== 5) {
      this.data["type"] = this.filterData.bindedValue.id;
      this.data["businessPartnerId"] = event.id;
      this.applyFilter(this.data, "end");
    } else if (this.filterData.bindedValue.type === 5) {
      this.data["type"] = 3;
      this.data["taskId"] = event.id;
      this.applyFilter(this.data, "end");
    }
  }
  showNotesDetails(data, crmNotePopup) {
    this.commonService
      .callApi("api/clients/notes/" + data.id, "", "get")
      .then((success) => {
        if (success) {
          this.crmNotePopupData = success;
          this.modalRef = this.modalService.show(crmNotePopup, {
            class: "modal-xl modal-dialog-centered crm-popup",
          });
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  resetCRMNotesData() {
    this.crmNotePopupData = {};
  }
  showTaskDetails(data, crmTaskPopup) {
    this.commonService
      .callApi("api/clients/tasks/" + data.id, "", "get")
      .then((success) => {
        if (success) {
          this.crmTaskPopupData = success;
          this.modalRef = this.modalService.show(crmTaskPopup, {
            class: "modal-xl modal-dialog-centered crm-popup",
          });
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  resetCRMTaskData() {
    this.crmTaskPopupData = {};
  }
  redirectToTask(clientID) {
    this.router.navigateByUrl(`/main/crm/task/${clientID}/2`);
  }
}
