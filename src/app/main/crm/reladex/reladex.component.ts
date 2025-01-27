import { trigger } from "@angular/animations";
import { DatePipe } from "@angular/common";
import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { fadeIn, fadeOut } from "../../../reusable/fade-animations";
import { BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import { BsModalRef} from "ngx-bootstrap/modal";
import { CarouselConfig } from "ngx-bootstrap/carousel";
import { concat, Observable, of, Subject } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from "rxjs/operators";
import { BaseComponent } from "../../../common/commonComponent";

@Component({
  selector: "app-reladex",
  standalone:false,
  templateUrl: "./reladex.component.html",
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
export class ReladexComponent extends BaseComponent implements OnInit {
  @ViewChild("addCustomerPopup") addCustomerPopup!: ElementRef;
  @ViewChild("addContactPopup") addContactPopup!: ElementRef;
  @ViewChild("addCompanyPopup") addCompanyPopup!: ElementRef;
  @ViewChild("addLeadsPopup") addLeadsPopup!: ElementRef;
  @ViewChild("secondFilter1") secondFilter!: NgSelectComponent;
  public ts = this.getTimeStap();
  public offset: any = 0;
  public limit: any = 20;
  public type: string = "component";
  listrecords: any = [];
  total: any;
  public maxPage: number = 0;
  showAddNewTaskButton: boolean = false;
  typesArray: any = [
    { id: 4, name: "All" },
    { id: 3, name: "Company" },
    { id: 2, name: "Contact" },
    { id: 1, name: "Customers" },
    { id: 5, name: "Leads" },
  ];
  selectedTypeID: number = 1;
  showDummySidebar: boolean = true;
  public showingPage: number = 0;
  public page: number = 0;
  typeArray: any = ["Unknown", "Client", "Contact", "Company", "Vendor"];
  public icon1: boolean = false;
  addCustomerBasicInfo!: FormGroup;
  addContactBasicInfo!: FormGroup;
  addCompanyBasicInfo!: FormGroup;
  addLeadsBasicInfo!: FormGroup;
  displayStepOne: boolean = false;
  displayStepTwo: boolean = false;
  displayStepThree: boolean = false;
  displayStepFour: boolean = false;
  modalRef!: BsModalRef;
  contactList: any = [];
  companyList: any = [];
  brandList: any = [];
  productList: any = [];
  paymentList: any = [];
  tenantUsers: any = [];
  areaLookup: any = [];
  regionList: any = [];
  establishmentTypes: any = [];
  countryList: any = [];
  customerList: any = [];
  customers!: Observable<any>;
  companies!: Observable<any>;
  contacts!: Observable<any>;
  public MainSearchdataSource = new Subject<string>();
  contactDisplayStepOne: boolean = false;
  contactDisplayStepTwo: boolean = false;
  contactStatusArray: any = [
    { id: 0, name: "", title: "" },
    { id: 1, name: "Potential", title: "Potential" },
    { id: 2, name: "Non Active", title: "Non Active" },
    { id: 3, name: "Ordering Customer", title: "Ordering Customer" },
    { id: 4, name: "Non Ordering Customer", title: "Non Ordering Customer" },
    { id: 5, name: "Out of Business", title: "Out of Business" },
    { id: 6, name: "Deleted", title: "Deleted" },
    { id: 7, name: "Rejected", title: "Rejected" },
  ];
  displayContactStatusArray: any = [
    "",
    "Potential",
    "Non Active",
    "Ordering Customer",
    "Non Ordering Customer",
    "Out of Business",
    "Deleted",
    "Rejected",
  ];
  companyDisplayStepOne: boolean = false;
  companyDisplayStepTwo: boolean = false;
  companyDisplayStepThree: boolean = false;
  leadsDisplayStepOne: boolean = false;
  leadsDisplayStepTwo: boolean = false;
  leadsDisplayStepThree: boolean = false;
  leadsDisplayStepFour: boolean = false;
  reladexDetailsData: any;
  clientTasks: any = [];
  clientNotes: any = [];
  tempClientTaskArray: any = [];
  tempClientNotesArray: any = [];
  showNoteDetailsDiv: boolean = false;
  public sidemenu: boolean = false;
  noteDetailsData: any;
  crmNotePopupData: any = {};
  crmTaskPopupData: any = {};
  showNotesShowMore: boolean = false;
  showTaskShowMore: boolean = false;
  noteDetailBusinessPartnerID: any;
  taskDetailBusinessPartnerID: any;
  clientDiscounts: any = [];
  tempClientDiscountArray: any = [];
  clientTaxes: any = [];
  tempClientTaxesArray: any = [];
  showId: number = 0;
  users: any = [];
  addForm!: FormGroup;
  bsConfig!: Partial<BsDatepickerConfig>;
  bsConfigCreated_Date!: Partial<BsDatepickerConfig>;
  customerNameCreateTask: any = "";
  businessPartnerCreateTask: any;
  createedDate: boolean = false;
  dueDate: boolean = false;
  taskdueDate: boolean = false;
  public titleArr: any = [];
  accessLevel!: number;
  assignto: boolean = false;
  created_Date: any = new Date();
  due_date: any = new Date();
  isSaveButtonDisabled: boolean = false;
  assignToData = null;
  presetActivity = {};
  deleteRecordId: any;
  deleteRecordtype: any;
  fliterflag: boolean = false;
  activateSecondComapanyFilter: boolean = false;
  activateSecondFilter: boolean = false;
  filterData: any = {};
  @ViewChild("filterName") filterName!: NgSelectComponent;
  isOpenFilter = false;
  tempArr = [];
  filterstart:any = [];
  data: any = {};
  refFilter: any = [];
  isOpen = false;
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
  filterActivityArray: any = [
    { id: 1, name: "30", title: "30", value: 30 },
    { id: 2, name: "60", title: "60", value: 60 },
    { id: 3, name: "90", title: "90", value: 90 },
    { id: 4, name: "Custom", title: "Custom", value: "" },
  ];
record: any;
taskDataObj: any;
  constructor(inj: Injector, private datePipe: DatePipe) {
    super(inj);
  }

  ngOnInit() {
    this.setFilters();
    this.listApi();
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
    this.getCountries();
    this.getCustomerList();
    this.presetTitle();
    this.getBrands();
    this.getProducts();
    this.commonService.getCurrentUser().then((user:any) => {
      this.accessLevel = this.lookupService.getNumericAccessLevel(
        user.tenant.accessLevel
      );
      if (this.accessLevel > 2) {
        this.assignto = true;
      }
    });
  }
  listApi() {
    var queryParams =
      "ts=" + this.ts + "&offset=" + this.offset + "&limit=" + this.limit;
    if (this.selectedTypeID === 1) {
      queryParams =
        queryParams + "&ClientType=1&entityType=client&showInActive=false";
    } else if (this.selectedTypeID === 2) {
      queryParams = queryParams + "&ClientType=2&entityType=client";
    } else if (this.selectedTypeID === 3) {
      queryParams = queryParams + "&ClientType=3&entityType=client";
    } else if (this.selectedTypeID === 4) {
      queryParams = queryParams + "&entityType=client";
    } else if (this.selectedTypeID === 5) {
      queryParams = queryParams + "&clientStatus=0&entityType=client&status=0";
    }
    this.commonService
      .callApi("api/clients?" + queryParams, this.data, "get")
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.total = success.total;
          this.maxPage = Math.floor(success.total / this.limit);
          setTimeout(() => {
            this.showAddNewTaskButton = true;
          }, 1000);
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  onScrollUp(ev:any) {
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
  changedselectedType(event:any) {
    this.offset = 0;
    this.limit = 20;
    this.setFilters();
    this.listApi();
  }
  public onScrollEvent(event: any): void {}
  onScrollDown(ev:any) {
    if (this.page < this.maxPage) {
      this.page++;
      this.offset = this.page * this.limit;
      var queryParams =
        "ts=" + this.ts + "&offset=" + this.offset + "&limit=" + this.limit;
      if (this.selectedTypeID === 1) {
        queryParams =
          queryParams + "&ClientType=1&entityType=client&showInActive=false";
      } else if (this.selectedTypeID === 2) {
        queryParams = queryParams + "&ClientType=2&entityType=client";
      } else if (this.selectedTypeID === 3) {
        queryParams = queryParams + "&ClientType=3&entityType=client";
      } else if (this.selectedTypeID === 4) {
        queryParams = queryParams + "&entityType=client";
      } else if (this.selectedTypeID === 5) {
        queryParams =
          queryParams + "&clientStatus=0&entityType=client&status=0";
      }
      this.commonService
        .callApi("api/clients?" + queryParams, this.data, "get")
        .then((success) => {
          if (success) {
            if (success.records.length > 0) {
              success.records.map((record: any) => {
                this.listrecords.push(record);
              });
            }
            this.total = success.total;
            this.maxPage = Math.floor(success.total / this.limit);
          } else {
            this.popToast("error", success.message);
          }
        })
        .catch((e) => {
          console.log("there is an error:", e);
        });
    }
  }
  changeIc(type:any) {
    if (type == "dots") {
      this.icon1 = true;
      this.sidemenu = true;
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
    }
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
  subDropdownClose() {
    this.showId = 0;
  }
  dropdownClose() {
    this.showId = 0;
  }
  showCustomerDetailsPopup(addCustomerPopup:any) {
    this.setAddCustomerBasicForm();
    this.displayStepOne = true;
    this.displayStepTwo = false;
    this.displayStepThree = false;
    this.displayStepFour = false;
    this.modalRef = this.modalService.show(addCustomerPopup, {
      class:
        "modal-xl task-modal modal-dialog-centered quick-popup add-new-customer-popup add-new-customer-popup-reladex",
    });
  }
  setAddCustomerBasicForm() {
    this.addCustomerBasicInfo = new FormGroup({
      title: new FormControl("", [Validators.required]),
      address1: new FormControl("", []),
      address2: new FormControl("", []),
      phone1: new FormControl("", []),
      phone2: new FormControl("", []),
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
      id: new FormControl("", []),
      businessPartnerType: new FormControl("", []),
      sourceCurrency: new FormControl("", []),
      discount: new FormControl("", []),
      clientType: new FormControl("", []),
    });
    this.addCustomerBasicInfo.patchValue({ id: 0, businessPartnerType: 1 });
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
  addBasicInfo() {
    if (this.addCustomerBasicInfo.value.id === 0) {
      if (this.addCustomerBasicInfo.valid) {
        if (this.addCustomerBasicInfo.value.paymentTermDuration) {
          this.addCustomerBasicInfo.value.paymentTermDuration = this.addCustomerBasicInfo.value.paymentTermDuration.days;
        }
        this.addCustomerBasicInfo.value.sourceCurrency = {
          id: 66,
          title: "[IDR] Rupiah",
        };
        this.addCustomerBasicInfo.value.discount = 0;
        this.addCustomerBasicInfo.value.clientType = 1;
        this.addCustomerBasicInfo.value.status = 1;
        this.commonService
          .callApi("/api/clients", this.addCustomerBasicInfo.value, "post")
          .then((success) => {
            if (success) {
              this.modalRef.hide();
            } else {
              this.popToast("error", success.message);
            }
          })
          .catch((e) => {
            console.log("there is an error:", e);
          });
      }
    } else if (this.addCustomerBasicInfo.value.id > 0) {
      if (this.addCustomerBasicInfo.valid) {
        if (this.addCustomerBasicInfo.value.paymentTermDuration) {
          this.addCustomerBasicInfo.value.paymentTermDuration = this.addCustomerBasicInfo.value.paymentTermDuration.days;
        }
        this.addCustomerBasicInfo.value.sourceCurrency = {
          id: 66,
          title: "[IDR] Rupiah",
        };
        this.addCustomerBasicInfo.value.discount = 0;
        this.addCustomerBasicInfo.value.businessPartnerType = "1";
        this.addCustomerBasicInfo.value.clientType = 1;
        this.addCustomerBasicInfo.value.status = 1;
        this.commonService
          .callApi(
            "api/clients/" + this.addCustomerBasicInfo.value.id,
            this.addCustomerBasicInfo.value,
            "put"
          )
          .then((success) => {
            if (success) {
              this.modalRef.hide();
              this.listApi();
            } else {
              this.popToast("error", success.message);
            }
          })
          .catch((e) => {
            console.log("there is an error:", e);
          });
      }
    }
  }
  submitContactBasicInfo() {
    if (this.addContactBasicInfo.value.id === 0) {
      if (this.addContactBasicInfo.valid) {
        this.addContactBasicInfo.value.businessPartnerType = 1;
        this.addContactBasicInfo.value.clientType = 2;
        this.addContactBasicInfo.value.discount = 0;
        if (this.addContactBasicInfo.value.status.id) {
          this.addContactBasicInfo.value.status = this.addContactBasicInfo.value.status.id;
        }
        this.addContactBasicInfo.value.sourceCurrency = {
          id: 66,
          title: "[IDR] Rupiah",
        };
        this.commonService
          .callApi("/api/clients", this.addContactBasicInfo.value, "post")
          .then((success) => {
            if (success) {
              this.modalRef.hide();
              this.listApi();
            } else {
              this.popToast("error", success.message);
            }
          })
          .catch((e) => {
            console.log("there is an error:", e);
          });
      }
    } else if (this.addContactBasicInfo.value.id > 0) {
      if (this.addContactBasicInfo.valid) {
        this.addContactBasicInfo.value.businessPartnerType = 1;
        this.addContactBasicInfo.value.clientType = 2;
        this.addContactBasicInfo.value.discount = 0;
        if (this.addContactBasicInfo.value.status.id) {
          this.addContactBasicInfo.value.status = this.addContactBasicInfo.value.status.id;
        }
        this.addContactBasicInfo.value.sourceCurrency = {
          id: 66,
          title: "[IDR] Rupiah",
        };
        this.commonService
          .callApi(
            "/api/clients/" + this.addContactBasicInfo.value.id,
            this.addContactBasicInfo.value,
            "put"
          )
          .then((success) => {
            if (success) {
              this.modalRef.hide();
              this.listApi();
            } else {
              this.popToast("error", success.message);
            }
          })
          .catch((e) => {
            console.log("there is an error:", e);
          });
      }
    }
  }
  getCountries() {
    this.commonService
      .callApi("api/countries", "", "get")
      .then((success) => {
        if (success) {
          this.countryList = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  getCustomerList() {
    this.commonService
      .callApi("api/clients?entityType=client", "", "get")
      .then((success) => {
        if (success) {
          this.customerList = success.records;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  showContactDetailsPopup(addContactPopup) {
    this.setAddContactBasicForm();
    this.contactDisplayStepOne = true;
    this.contactDisplayStepTwo = false;
    this.modalRef = this.modalService.show(addContactPopup, {
      class:
        "modal-xl task-modal modal-dialog-centered quick-popup add-new-customer-popup add-new-customer-popup-reladex",
    });
  }
  setAddContactBasicForm() {
    this.addContactBasicInfo = new FormGroup({
      title: new FormControl("", [Validators.required]),
      address1: new FormControl("", []),
      address2: new FormControl("", []),
      city: new FormControl("", []),
      state: new FormControl("", []),
      country: new FormControl("", []),
      zip: new FormControl("", []),
      phone1: new FormControl("", []),
      phone2: new FormControl("", []),
      email: new FormControl("", []),
      webSite: new FormControl("", []),
      company: new FormControl("", []),
      status: new FormControl("", []),
      customer: new FormControl("", []),
      internalNotes: new FormControl("", []),
      externalNotes: new FormControl("", []),
      businessPartnerType: new FormControl("", []),
      clientType: new FormControl("", []),
      discount: new FormControl("", []),
      id: new FormControl("", []),
    });
    this.addContactBasicInfo.patchValue({ id: 0 });
  }
  contactPopupshowStepOne() {
    this.contactDisplayStepOne = true;
    this.contactDisplayStepTwo = false;
  }
  contactPopupshowStepTwo() {
    this.contactDisplayStepOne = false;
    this.contactDisplayStepTwo = true;
  }
  showCompanyDetailsPopup(addCompanyPopup) {
    this.setAddCompanyBasicForm();
    this.companyDisplayStepOne = true;
    this.companyDisplayStepTwo = false;
    this.companyDisplayStepThree = false;
    this.modalRef = this.modalService.show(addCompanyPopup, {
      class:
        "modal-xl task-modal modal-dialog-centered quick-popup add-new-customer-popup add-new-customer-popup-reladex",
    });
  }
  setAddCompanyBasicForm() {
    this.addCompanyBasicInfo = new FormGroup({
      title: new FormControl("", [Validators.required]),
      address1: new FormControl("", []),
      address2: new FormControl("", []),
      city: new FormControl("", []),
      state: new FormControl("", []),
      country: new FormControl("", []),
      zip: new FormControl("", []),
      phone1: new FormControl("", []),
      phone2: new FormControl("", []),
      email: new FormControl("", []),
      webSite: new FormControl("", []),
      status: new FormControl("", []),
      contactPerson: new FormControl("", []),
      customer: new FormControl("", []),
      company: new FormControl("", []),
      internalNotes: new FormControl("", []),
      externalNotes: new FormControl("", []),
      salesRepresentative: new FormControl("", []),
      area: new FormControl("", []),
      branch: new FormControl("", []),
      multipleCustomerList: new FormControl("", []),
      id: new FormControl("", []),
      sourceCurrency: new FormControl("", []),
      businessPartnerType: new FormControl("", []),
      discount: new FormControl("", []),
      clientType: new FormControl("", []),
    });
    this.addCompanyBasicInfo.patchValue({ id: 0 });
  }
  companyShowStepOne() {
    this.companyDisplayStepOne = true;
    this.companyDisplayStepTwo = false;
    this.companyDisplayStepThree = false;
  }
  companyShowStepTwo() {
    this.companyDisplayStepOne = false;
    this.companyDisplayStepTwo = true;
    this.companyDisplayStepThree = false;
  }
  companyShowStepThree() {
    this.companyDisplayStepOne = false;
    this.companyDisplayStepTwo = false;
    this.companyDisplayStepThree = true;
  }
  submitCompanyBasicInfo() {
    if (this.addCompanyBasicInfo.value.id === 0) {
      if (this.addCompanyBasicInfo.valid) {
        this.addCompanyBasicInfo.value.businessPartnerType = 1;
        this.addCompanyBasicInfo.value.clientType = 3;
        this.addCompanyBasicInfo.value.discount = 0;
        if (
          this.addCompanyBasicInfo.value.customer &&
          this.addCompanyBasicInfo.value.customer !== null
        ) {
          this.addCompanyBasicInfo.value.multipleCustomerList = [
            this.addCompanyBasicInfo.value.customer,
          ];
        } else {
          this.addCompanyBasicInfo.value.multipleCustomerList = [];
        }
        if (this.addCompanyBasicInfo.value.status.id) {
          this.addCompanyBasicInfo.value.status = this.addCompanyBasicInfo.value.status.id;
        }
        this.addCompanyBasicInfo.value.sourceCurrency = {
          id: 66,
          title: "[IDR] Rupiah",
        };
        this.commonService
          .callApi("/api/clients", this.addCompanyBasicInfo.value, "post")
          .then((success) => {
            if (success) {
              this.modalRef.hide();
              this.listApi();
            } else {
              this.popToast("error", success.message);
            }
          })
          .catch((e) => {
            console.log("there is an error:", e);
          });
      }
    } else if (this.addCompanyBasicInfo.value.id > 0) {
      if (this.addCompanyBasicInfo.valid) {
        this.addCompanyBasicInfo.value.businessPartnerType = 1;
        this.addCompanyBasicInfo.value.clientType = 3;
        this.addCompanyBasicInfo.value.discount = 0;
        if (
          this.addCompanyBasicInfo.value.customer &&
          this.addCompanyBasicInfo.value.customer !== null
        ) {
          this.addCompanyBasicInfo.value.multipleCustomerList = [
            this.addCompanyBasicInfo.value.customer,
          ];
        } else {
          this.addCompanyBasicInfo.value.multipleCustomerList = [];
        }
        if (this.addCompanyBasicInfo.value.status.id) {
          this.addCompanyBasicInfo.value.status = this.addCompanyBasicInfo.value.status.id;
        }
        this.addCompanyBasicInfo.value.sourceCurrency = {
          id: 66,
          title: "[IDR] Rupiah",
        };
        this.commonService
          .callApi(
            "/api/clients/" + this.addCompanyBasicInfo.value.id,
            this.addCompanyBasicInfo.value,
            "put"
          )
          .then((success) => {
            if (success) {
              this.modalRef.hide();
              this.listApi();
            } else {
              this.popToast("error", success.message);
            }
          })
          .catch((e) => {
            console.log("there is an error:", e);
          });
      }
    }
  }
  showLeadsDetailsPopup(addLeadsPopup) {
    this.setAddLeadsBasicForm();
    this.leadsDisplayStepOne = true;
    this.leadsDisplayStepTwo = false;
    this.leadsDisplayStepThree = false;
    this.leadsDisplayStepFour = false;
    this.modalRef = this.modalService.show(addLeadsPopup, {
      class:
        "modal-xl task-modal modal-dialog-centered quick-popup add-new-customer-popup add-new-customer-popup-reladex",
    });
  }
  setAddLeadsBasicForm() {
    this.addLeadsBasicInfo = new FormGroup({
      title: new FormControl("", [Validators.required]),
      address1: new FormControl("", []),
      address2: new FormControl("", []),
      city: new FormControl("", []),
      state: new FormControl("", []),
      zip: new FormControl("", []),
      phone1: new FormControl("", []),
      phone2: new FormControl("", []),
      country: new FormControl("", []),
      email: new FormControl("", []),
      webSite: new FormControl("", []),
      status: new FormControl("", []),
      estimatedAmount: new FormControl("", []),
      contactPerson: new FormControl("", []),
      customer: new FormControl("", []),
      internalNotes: new FormControl("", []),
      externalNotes: new FormControl("", []),
      paymentTermDuration: new FormControl("", []),
      allowedCreditAmount: new FormControl("", []),
      salesRepresentative: new FormControl("", []),
      area: new FormControl("", []),
      branch: new FormControl("", []),
      establishmentType: new FormControl("", []),
      id: new FormControl("", []),
    });
    this.addLeadsBasicInfo.patchValue({ id: 0 });
  }
  submitBasicLeadInfo() {
    if (this.addLeadsBasicInfo.value.id === 0) {
      if (this.addLeadsBasicInfo.valid) {
        this.addLeadsBasicInfo.value.businessPartnerType = 1;
        this.addLeadsBasicInfo.value.clientType = 1;
        this.addLeadsBasicInfo.value.discount = 0;
        this.addLeadsBasicInfo.value.sourceCurrency = {
          id: 66,
          title: "[IDR] Rupiah",
        };
        if (
          this.addLeadsBasicInfo.value.customer &&
          this.addLeadsBasicInfo.value.customer !== null
        ) {
          this.addLeadsBasicInfo.value.multipleCustomerList = [
            this.addLeadsBasicInfo.value.customer,
          ];
        } else {
          this.addLeadsBasicInfo.value.multipleCustomerList = [];
        }

        if (this.addLeadsBasicInfo.value.paymentTermDuration) {
          this.addLeadsBasicInfo.value.paymentTermDuration = this.addLeadsBasicInfo.value.paymentTermDuration.days;
        }
        this.addLeadsBasicInfo.value.status = 0;
        this.commonService
          .callApi("/api/clients", this.addLeadsBasicInfo.value, "post")
          .then((success) => {
            if (success) {
              this.modalRef.hide();
              this.listApi();
            } else {
              this.popToast("error", success.message);
            }
          })
          .catch((e) => {
            console.log("there is an error:", e);
          });
      }
    } else if (this.addLeadsBasicInfo.value.id > 0) {
      if (this.addLeadsBasicInfo.valid) {
        this.addLeadsBasicInfo.value.businessPartnerType = 1;
        this.addLeadsBasicInfo.value.clientType = 1;
        this.addLeadsBasicInfo.value.discount = 0;
        this.addLeadsBasicInfo.value.sourceCurrency = {
          id: 66,
          title: "[IDR] Rupiah",
        };
        if (
          this.addLeadsBasicInfo.value.customer &&
          this.addLeadsBasicInfo.value.customer !== null
        ) {
          this.addLeadsBasicInfo.value.multipleCustomerList = [
            this.addLeadsBasicInfo.value.customer,
          ];
        } else {
          this.addLeadsBasicInfo.value.multipleCustomerList = [];
        }

        if (this.addLeadsBasicInfo.value.paymentTermDuration) {
          this.addLeadsBasicInfo.value.paymentTermDuration = this.addLeadsBasicInfo.value.paymentTermDuration.days;
        }
        this.addLeadsBasicInfo.value.status = 0;
        this.commonService
          .callApi(
            "/api/clients/" + this.addLeadsBasicInfo.value.id,
            this.addLeadsBasicInfo.value,
            "put"
          )
          .then((success) => {
            if (success) {
              this.modalRef.hide();
              this.listApi();
            } else {
              this.popToast("error", success.message);
            }
          })
          .catch((e) => {
            console.log("there is an error:", e);
          });
      }
    }
  }
  showLeadsStepOne() {
    this.leadsDisplayStepOne = true;
    this.leadsDisplayStepTwo = false;
    this.leadsDisplayStepThree = false;
    this.leadsDisplayStepFour = false;
  }
  showLeadsStepTwo() {
    this.leadsDisplayStepOne = false;
    this.leadsDisplayStepTwo = true;
    this.leadsDisplayStepThree = false;
    this.leadsDisplayStepFour = false;
  }
  showLeadsStepThree() {
    this.leadsDisplayStepOne = false;
    this.leadsDisplayStepTwo = false;
    this.leadsDisplayStepThree = true;
    this.leadsDisplayStepFour = false;
  }
  showLeadsStepFour() {
    this.leadsDisplayStepOne = false;
    this.leadsDisplayStepTwo = false;
    this.leadsDisplayStepThree = false;
    this.leadsDisplayStepFour = true;
  }
  showDetails(data) {
    if (data.id !== null && this.selectedTypeID === 1) {
      this.noteDetailBusinessPartnerID = data.id;
      this.taskDetailBusinessPartnerID = data.id;
      this.reladexDetailsData = {};
      this.clientTasks = [];
      this.tempClientTaskArray = [];
      this.clientNotes = [];
      this.tempClientNotesArray = [];
      this.clientDiscounts = [];
      this.tempClientDiscountArray = [];
      this.getClientTasksDetails(data.id);
      this.getClientNotesDetails(data.id);
      this.getClientDiscountRules(data.id);
      this.getClientTaxRules(data.id);
    }
    this.noteDetailsData = data;
    setTimeout(() => {
      this.changeIc("details");
    }, 1000);
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
          if (success.records.length > 0) {
            success.records.map((record: any, index: number) => {
              if (index <= 2) {
                this.clientTasks.push(record);
              }
            });
          }
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
  getClientNotesDetails(clientID) {
    this.commonService
      .callApi(
        "api/clients/notes?BusinessPartnerId=" + clientID + "&type=2",
        "",
        "get"
      )
      .then((success) => {
        if (success) {
          if (success.records.length > 0) {
            success.records.map((record: any, index: number) => {
              if (index <= 2) {
                this.clientNotes.push(record);
              }
            });
          }
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
  getClientDiscountRules(clientID) {
    this.commonService
      .callApi(
        "api/clients/discountrules?BusinessPartnerId=" + clientID,
        "",
        "get"
      )
      .then((success) => {
        if (success) {
          if (success.records.length > 0) {
            success.records.map((record: any, index: number) => {
              if (index <= 2) {
                this.clientDiscounts.push(record);
              }
            });
          }
          this.tempClientDiscountArray = success.records;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  getClientTaxRules(clientID) {
    this.commonService
      .callApi("api/clients/taxrules?BusinessPartnerId=" + clientID, "", "get")
      .then((success) => {
        if (success) {
          if (success.records.length > 0) {
            success.records.map((record: any, index: number) => {
              if (index <= 2) {
                this.clientTaxes.push(record);
              }
            });
          }
          this.tempClientTaxesArray = success.records;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
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
  redirectToNotes(clientID) {
    this.router.navigateByUrl(`/main/crm/notes/${clientID}/2`);
  }
  redirectToTask(clientID) {
    this.router.navigateByUrl(`/main/crm/task/${clientID}/2`);
  }
  dropdownClick(id) {
    this.showId = this.showId == 0 ? id : 0;
  }
  createTaskModal(createTask, customerName, businessPartner) {
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
  onChangepresetActivity(e:any) {
    this.presetActivity = e;
    if (e.dueDays != null && e.dueDays != undefined && e.dueDays != "") {
      this.due_date = new Date();
      var pastDate = this.due_date.getDate() + e.dueDays;
      this.due_date.setDate(pastDate);
      this.addForm.get("dueDate")
        .setValue(this.datePipe.transform(this.due_date, "MMM d, y"));
      this.addForm.get("dueDateTemp").setValue(this.due_date);
    }
  }
  changeAssignTo(e:any) {
    this.assignToData = e;
  }
  setDeleteIDAndType(id:any, type:any) {
    this.deleteRecordId = id;
    this.deleteRecordtype = type;
  }
  openDeletePopup(deleteRecordPopup:any) {
    this.modalRef = this.modalService.show(deleteRecordPopup, {
      class: "modal-dialog-centered quick-popup delete-popup",
    });
  }
  unsetDeleteIdAndType() {
    this.deleteRecordId = 0;
    this.deleteRecordtype = "";
  }
  deleteThisRecord() {
    this.commonService
      .callApi("api/clients/" + this.deleteRecordId, "", "delete")
      .then((success) => {
        this.listApi();
        this.deleteRecordId = 0;
        this.popToast("success", "Record deleted");
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  editThisRecord(data:any) {
    if (this.selectedTypeID === 5 && data.clientType === 1) {
      this.showLeadsDetailsPopup(this.addLeadsPopup);
      if (data.paymentTermDuration === 0) {
        data.paymentTermDuration = "";
      }
      if (data.allowedCreditAmount === 0) {
        data.allowedCreditAmount = "";
      }
      setTimeout(() => {
        this.addLeadsBasicInfo.patchValue(data);
      }, 500);
    } else if (data.clientType === 1 && this.selectedTypeID !== 5) {
      this.showCustomerDetailsPopup(this.addCustomerPopup);
      if (data.paymentTermDuration === 0) {
        data.paymentTermDuration = "";
      }
      if (data.allowedCreditAmount === 0) {
        data.allowedCreditAmount = "";
      }
      setTimeout(() => {
        this.addCustomerBasicInfo.patchValue(data);
      }, 500);
    } else if (data.clientType === 2) {
      this.showContactDetailsPopup(this.addContactPopup);
      setTimeout(() => {
        let fetchedStatus = this.contactStatusArray.filter(
          (X:any) => X.id === data.status
        )[0];
        data.status = fetchedStatus;
        this.addContactBasicInfo.patchValue(data);
      }, 500);
    } else if (data.clientType === 3) {
      this.showCompanyDetailsPopup(this.addCompanyPopup);
      setTimeout(() => {
        let fetchedStatus = this.contactStatusArray.filter(
          (X:any) => X.id === data.status
        )[0];
        data.status = fetchedStatus;
        this.addCompanyBasicInfo.patchValue(data);
      }, 500);
    }
  }
  setFilters() {
    this.filterstart = [];
    if (this.selectedTypeID === 1) {
      this.filterstart = [
        {
          id: 1,
          title: "Branch",
          option: [],
          async: false,
          labelName: "Branch",
          bindedValue: "",
        },
        {
          id: 2,
          title: "Sales Representative",
          option: [],
          async: false,
          labelName: "Sales Representative",
          bindedValue: "",
        },
        {
          id: 3,
          title: "Name",
          option: [],
          async: false,
          labelName: "Name",
          bindedValue: "",
        },
        {
          id: 4,
          title: "Brand",
          option: [],
          async: false,
          labelName: "Brand",
          bindedValue: "",
        },
        {
          id: 5,
          title: "Product",
          option: [],
          async: false,
          labelName: "Product",
          bindedValue: "",
        },
        {
          id: 6,
          title: "Status",
          option: [],
          async: false,
          labelName: "Status",
          bindedValue: "",
        },
        {
          id: 7,
          title: "Last Activity Within",
          option: [],
          async: false,
          labelName: "Last Activity Within",
          bindedValue: "",
        },
        {
          id: 8,
          title: "Last Activity Beyond",
          option: [],
          async: false,
          labelName: "Last Activity Beyond",
          bindedValue: "",
        },
      ];
    } else if (
      this.selectedTypeID === 2 ||
      this.selectedTypeID === 3 ||
      this.selectedTypeID === 4 ||
      this.selectedTypeID === 5
    ) {
      this.filterstart = [
        {
          id: 1,
          title: "Name",
          option: [],
          async: false,
          labelName: "Name",
          bindedValue: "",
        },
      ];
    }
    this.refFilter = [...this.filterstart];
  }
  changedParentFilter(event:any) {
    if (this.selectedTypeID === 1) {
      let options: any[];
      if (event.id == 1) {
        this.filterData.bindedValue = null;
        options = [...this.regionList];
        if (this.tempArr.length == 0) {
          setTimeout(() => {
            // this.secondFilter.filterInput.nativeElement.focus();
            this.isOpen = true;
          });
        }
      } else if (event.id == 2) {
        this.filterData.bindedValue = null;
        options = [...this.tenantUsers];
        if (this.tempArr.length == 0) {
          setTimeout(() => {
            // this.secondFilter.filterInput.nativeElement.focus();
            this.isOpen = true;
          });
        }
      } else if (event.id == 3) {
        if (this.tempArr.length == 0) {
          setTimeout(() => {
            $("#txtNotes1").focus();
          }, 100);
        }
      } else if (event.id == 4) {
        this.filterData.bindedValue = null;
        options = [...this.brandList];
        if (this.tempArr.length == 0) {
          setTimeout(() => {
            // this.secondFilter.filterInput.nativeElement.focus();
            this.isOpen = true;
          });
        }
      } else if (event.id == 5) {
        this.filterData.bindedValue = null;
        options = [...this.productList];
        if (this.tempArr.length == 0) {
          setTimeout(() => {
            // this.secondFilter.filterInput.nativeElement.focus();
            this.isOpen = true;
          });
        }
      } else if (event.id == 6) {
        this.filterData.bindedValue = null;
        options = [...this.contactStatusArray];
        if (this.tempArr.length == 0) {
          setTimeout(() => {
            // this.secondFilter.filterInput.nativeElement.focus();
            this.isOpen = true;
          });
        }
      } else if (event.id == 7) {
        this.filterData.bindedValue = null;
        options = [...this.filterActivityArray];
        if (this.tempArr.length == 0) {
          setTimeout(() => {
            // this.secondFilter.filterInput.nativeElement.focus();
            this.isOpen = true;
          });
        }
      } else if (event.id == 8) {
        this.filterData.bindedValue = null;
        options = [...this.filterActivityArray];
        if (this.tempArr.length == 0) {
          setTimeout(() => {
            // this.secondFilter.filterInput.nativeElement.focus();
            this.isOpen = true;
          });
        }
      }
      this.filterstart.forEach((obj:any) => {
        if (obj.id == event.id) {
          obj.option = options;
        } else {
          obj.option = [];
        }
      });
    } else if (
      this.selectedTypeID === 2 ||
      this.selectedTypeID === 3 ||
      this.selectedTypeID === 4 ||
      this.selectedTypeID === 5
    ) {
      if (this.tempArr.length == 0) {
        setTimeout(() => {
          $("#txtNotes").focus();
        }, 100);
      }
    }
  }
  changedChildFilter(event:any) {
    $("#secondFilter :input").blur();
    $("#supplierName :input").blur();
    if (this.selectedTypeID === 1) {
      if (this.filterData.id === 1) {
        this.data["branchId"] = this.filterData.bindedValue.id;
        this.applyFilter(this.data, "end");
      } else if (this.filterData.id === 2) {
        this.data["salesRepresentativeId"] = this.filterData.bindedValue.id;
        this.applyFilter(this.data, "end");
      } else if (this.filterData.id === 3) {
        if (this.filterData.name != undefined && this.filterData.name != "") {
          this.data["q"] = this.filterData.name;
          this.applyFilter(this.data, "end");
        }
      } else if (this.filterData.id === 4) {
        this.data["brandId"] = this.filterData.bindedValue.id;
        this.applyFilter(this.data, "end");
      } else if (this.filterData.id === 5) {
        this.data["productId"] = this.filterData.bindedValue.id;
        this.applyFilter(this.data, "end");
      } else if (this.filterData.id === 6) {
        this.data["status"] = this.filterData.bindedValue.id;
        this.applyFilter(this.data, "end");
      } else if (this.filterData.id === 7) {
        this.filterData.suboptions = [];
        if (
          this.filterData.bindedValue.id === 1 ||
          this.filterData.bindedValue.id === 2 ||
          this.filterData.bindedValue.id === 3
        ) {
          this.data["lastActivityDays"] = this.filterData.bindedValue.value;
          this.applyFilter(this.data, "end");
        } else if (this.filterData.bindedValue.id === 4) {
          if (this.tempArr.length == 0) {
            setTimeout(() => {
              $("#numDaysInput").focus();
            }, 100);
          }
        }
      } else if (this.filterData.id === 8) {
        this.filterData.suboptions = [];
        if (
          this.filterData.bindedValue.id === 1 ||
          this.filterData.bindedValue.id === 2 ||
          this.filterData.bindedValue.id === 3
        ) {
          this.data[
            "beyondLastActivityDays"
          ] = this.filterData.bindedValue.value;
          this.applyFilter(this.data, "end");
        } else if (this.filterData.bindedValue.id === 4) {
          if (this.tempArr.length == 0) {
            setTimeout(() => {
              $("#numDaysInput").focus();
            }, 100);
          }
        }
      }
    } else {
      if (
        this.filterData.id === 1 &&
        (this.selectedTypeID === 2 ||
          this.selectedTypeID === 3 ||
          this.selectedTypeID === 4 ||
          this.selectedTypeID === 5)
      ) {
        if (this.filterData.name != undefined && this.filterData.name != "") {
          this.data["q"] = this.filterData.name;
          this.applyFilter(this.data, "end");
        }
      }
    }
  }
  changedsubChildFilter(event:any) {
    if (this.filterData.id === 7) {
      this.data["lastActivityDays"] = this.filterData.numDaysInput;
      this.applyFilter(this.data, "end");
    } else if (this.filterData.id === 8) {
      this.data["beyondLastActivityDays"] = this.filterData.numDaysInput;
      this.applyFilter(this.data, "end");
    }
  }
  applyFilter(queryParams:any, terminate:any) {
    this.showingPage = 0;
    this.page = 0;
    this.offset = 0;
    var queryParams1 =
      "ts=" + this.ts + "&offset=" + this.offset + "&limit=" + this.limit;
    if (this.selectedTypeID === 1) {
      queryParams1 =
        queryParams1 + "&ClientType=1&entityType=client&showInActive=false";
    } else if (this.selectedTypeID === 2) {
      queryParams1 = queryParams1 + "&ClientType=2&entityType=client";
    } else if (this.selectedTypeID === 3) {
      queryParams1 = queryParams1 + "&ClientType=3&entityType=client";
    } else if (this.selectedTypeID === 4) {
      queryParams1 = queryParams1 + "&entityType=client";
    } else if (this.selectedTypeID === 5) {
      queryParams1 =
        queryParams1 + "&clientStatus=0&entityType=client&status=0";
    }
    this.commonService
      .callApi("api/clients?" + queryParams1, queryParams, "get")
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.maxPage = Math.floor(success.total / this.limit);
          this.total = success.total;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });

    if (terminate) {
      let tempconfig: any = {};
      if (this.selectedTypeID === 1) {
        if (
          this.filterData.id === 1 ||
          this.filterData.id === 2 ||
          this.filterData.id === 4 ||
          this.filterData.id === 5 ||
          this.filterData.id === 6
        ) {
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
          tempconfig["secondFilter"] = this.filterData.name;
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
        } else if (this.filterData.id === 7) {
          if (
            this.filterData.bindedValue.id === 1 ||
            this.filterData.bindedValue.id === 2 ||
            this.filterData.bindedValue.id === 3
          ) {
            tempconfig["parentFilter"] = this.filterData.title;
            tempconfig["secondFilter"] =
              this.filterData.bindedValue.value + " Days";
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
          } else if (this.filterData.bindedValue.id === 4) {
            tempconfig["parentFilter"] = this.filterData.title;
            tempconfig["secondFilter"] = this.filterData.numDaysInput + " Days";
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
        } else if (this.filterData.id === 8) {
          if (
            this.filterData.bindedValue.id === 1 ||
            this.filterData.bindedValue.id === 2 ||
            this.filterData.bindedValue.id === 3
          ) {
            tempconfig["parentFilter"] = this.filterData.title;
            tempconfig["secondFilter"] =
              this.filterData.bindedValue.value + " Days";
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
          } else if (this.filterData.bindedValue.id === 4) {
            tempconfig["parentFilter"] = this.filterData.title;
            tempconfig["secondFilter"] = this.filterData.numDaysInput + " Days";
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
        }
      } else if (
        this.filterData.id === 1 &&
        (this.selectedTypeID === 2 ||
          this.selectedTypeID === 3 ||
          this.selectedTypeID === 4 ||
          this.selectedTypeID === 5)
      ) {
        this.tempArr = [];
        tempconfig["parentFilter"] = this.filterData.title;
        tempconfig["secondFilter"] = this.filterData.name;
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
  resetFilter(i) {
    if (this.selectedTypeID === 1) {
      if (i.selectedObj.id === 1) {
        delete this.data.branchId;
      } else if (i.selectedObj.id === 2) {
        delete this.data.salesRepresentativeId;
      } else if (i.selectedObj.id === 3) {
        delete this.data.q;
      } else if (i.selectedObj.id === 4) {
        delete this.data.brandId;
      } else if (i.selectedObj.id === 5) {
        delete this.data.productId;
      } else if (i.selectedObj.id === 6) {
        delete this.data.status;
      } else if (i.selectedObj.id === 7) {
        delete this.data.lastActivityDays;
      } else if (i.selectedObj.id === 8) {
        delete this.data.beyondLastActivityDays;
      }
    } else if (
      i.selectedObj.id === 1 &&
      (this.selectedTypeID === 2 ||
        this.selectedTypeID === 3 ||
        this.selectedTypeID === 4 ||
        this.selectedTypeID === 5)
    ) {
      delete this.data.q;
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
    this.applyFilter(this.data, '');
  }
  getBrands() {
    this.commonService
      .callApi("api/inventory/brands/lookup?q=", "", "get")
      .then((success) => {
        if (success) {
          this.brandList = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
  getProducts() {
    this.commonService
      .callApi("api/inventory/products/lookup?q=", "", "get")
      .then((success) => {
        if (success) {
          this.productList = success;
        } else {
          this.popToast("error", success.message);
        }
      })
      .catch((e) => {
        console.log("there is an error:", e);
      });
  }
}
