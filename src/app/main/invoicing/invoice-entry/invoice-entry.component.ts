import { Component, OnInit, Injector, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import moment from 'moment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import { isObject } from 'util';

@Component({
  selector: 'app-invoice-entry',
  standalone:false,
  templateUrl: './invoice-entry.component.html',
  styles: []
})
export class InvoiceEntryComponent extends BaseComponent implements OnInit {

  @ViewChild('template') template: TemplateRef<any>;
  @ViewChild('template1') template1: TemplateRef<any>;

  public branchrecords = [];
  public selectedBranch: any;
  public productrecords: any;
  public Subtotal: any;
  public statusafterchange: any;
  public statusfordiv: any;
  public SubtotalCount = [];
  public SubtotalCount1: any = 0.00;
  invoiceTotal: any = 0.00;
  public statusTilte: any;
  public buttontitle: any;
  public docNumber: any;
  public deletedid: any;
  public apideleteid: any;
  public filterData: any = {};
  public user: any = {};
  public userClient: any = {};
  public slideCount = '1';

  public clientNameItem: Observable<any>;
  public MainSearchdataSource = new Subject<string>();
  public supplierLoading: boolean = false;
  public accclose: boolean = false;
  public flagfordelete: boolean = false;
  public notFoundText: any = "No matches found.";
  public Ctitle: '';
  public Caddress1: '';
  public Caddress2: '';
  public Ccity: '';
  public Cphone: '';
  public isNew: Boolean = true;
  public innerDetails: Boolean = false;
  public outerDetails: Boolean = true;
  modalRef: BsModalRef;
  clientTotal: any;
  public salesRecords: any = [];
  public areaRecords: any = [];
  public regionRecords: any = [];
  public approveReqFirst: Boolean = false;
  public approveReqSecond: Boolean = false;
  public approveReqThird: Boolean = false;
  public establishmentTypeRecords: any = [];
  

  constructor(inj: Injector, public route: ActivatedRoute) {
    super(inj);
    // getBranches is called earlier bcz of it's dependency in invoice api
    this.getBranches();

    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        if (params['status'] && params['docNumber']) {
          this.statusfordiv = params['status'];
          console.log("params.status",params['status'])
          if (this.statusfordiv == '1') {
          } else {
            this.icon1 = true;
          }
          this.docNumber = params['docNumber'];
          this.getInvoive(params['docNumber']);
          this.isNew = false;
        } else {
          this.user = {};
          this.isNew = true;
          this.getBranches();
          this.user['docNumber'] = '<auto generated>';
          this.user['dateOfIssue'] = new Date();
          this.user['discount'] = 0;

        }
      })
    }
  }

  ngOnInit() {
    this.loadTypehead();
    this.getproducts();
    this.getSalesrepresentative();
    this.searchArea();
    this.region();
    this.establishmenttype();
    // this.getBranches();

  }
  /*****************************************************
 @purpose : For Salesrepresentative dropdown 
  *****************************************************/
  getSalesrepresentative() {
    this.commonService.callApi('api/tenants/users', '', 'get').then(success => {
      if (success) {
        this.salesRecords = success.records;
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }
  /*****************************************************
  @purpose : For Searcharea dropdown 
  *****************************************************/
  searchArea() {
    this.commonService.callApi('api/clients/areas/lookup', '', 'get').then(success => {
      if (success) {
        this.areaRecords = success;
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }
  /*****************************************************
  @purpose :For region dropdown  
  *****************************************************/
  region() {
    this.commonService.callApi('api/tenants/branches/lookup', '', 'get').then(success => {
      if (success) {
        this.regionRecords = success;

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }

  /*****************************************************
  @purpose :establishmenttype   
  *****************************************************/
  establishmenttype() {

    this.commonService.callApi('api/clients/establishmenttypes/lookup', '', 'get').then(success => {
      if (success) {
        this.establishmentTypeRecords = success;
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
  private loadTypehead() {
    this.clientNameItem = concat(
      of([]),
      this.MainSearchdataSource.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(term => this.getSearchList(term, false)),
        map(response => {
          return response;
        })
      )
    );
  }
  getBranches() {
    this.commonService.callApi('api/tenants/branches/lookup?q=', '', 'get').then(success => {
      if (success) {
        this.branchrecords = success;
        this.user['branch'] = success[0];
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }

  getproducts() {
    this.commonService.callApi('api/inventory/products?q', '', 'get').then(success => {
      if (success) {
        this.productrecords = success.records;
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }

  getSearchList(value: string = null, allow): Observable<any[]> {
    this.supplierLoading = true;
    let data = {};
    if (value) {
      data["entityType"] = "client";
      data["q"] = value;
    }
    let items = [];
    return this.commonService.callApiObservable('api/clients', data).pipe(
      catchError(() => of(({ items: [] }))),
      map(success => {
        items = success['records'];
        if (allow) {
          this.clientNameItem = success['records'];
        }
        this.supplierLoading = false;
        this.clientTotal = success['total'];
        return (items) ? items : [];
      })
    )
  }

  clientNameSelected(event, user) {
    // if (this.clientTotal == 0) {
    //   this.userClient = {};
    //   if(isObject(user.businessPartner)){
    //     this.userClient.title = user.businessPartner.title;
    //   }else{
    //     this.userClient.title = user.businessPartner;
    //   }
    //   // this.userClient.title = user.businessPartner;
    //   this.openModal(this.template)
    //   this.user.businessPartner = {};
    // } else {
    //   this.user['businessPartner'] = event;
    // }
    this.user['notes'] = event.externalNotes;

    // $('#supplierName :input').blur();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm newMemo-Modal' });
  }
  public icon1: boolean = false;
  // For active and inactive the right side bar 

  changeIc(type) {
    if (type == 'dots') {
      this.icon1 = false;
    } else {
      this.icon1 = true;
    }
  }

  public maxDate = new Date();
  ModelDatepicker(event) {
    console.log("selected date", event)
  }
  createInvoice(user) {
    if (this.isNew) {
      this.user['type'] = 1;
      this.user['dueDate'] = this.user.dateOfIssue;
      

      this.commonService.callApi('api/documents', user, 'post', false, false).then(success => {
        if (success) {
          // this.getInvoive(success.docNumber);
          this.router.navigate(['/main/invoicing/entry'], { queryParams: { status: success.status.id, docNumber: success.docNumber } })
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })
    } else {
      let data = {};
      data['sourceProduct'] = this.user.sourceProduct;
      data['quantity'] = this.user.quantity;
      data['notes'] = this.user.productnotes;
      data['discount'] = this.user.productdiscount;
      data['taxValue'] = this.user.taxValue;
      data['price'] = this.user.price;
      this.commonService.callApi('api/documents/' + this.user.id + '/items', data, 'post', false, false).then(success => {
        if (success) {
          if (success.document) {
            this.getInvoive(success.document.title);
          }
          // this.router.navigate(['/main/invoicing/entry'],{ queryParams: { status : success.status.id, docNumber : success.docNumber} })
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })

    }
  }
  getInvoive(docNumber) {
    this.commonService.callApi('api/documents/invoice/' + docNumber, '', 'get', false, false).then(success => {
      if (success) {
        this.user = success;

        this.user['dateOfIssue'] = moment(success.dateOfIssue).format("DD.MM.YYYY");

        this.statusfordiv = success.status.id;
        this.Subtotal = success.items;
        this.statusTilte = success.status.title;
        if (this.statusTilte == 'Draft') {
          this.buttontitle = " | SUBMIT FOR Logistics Review";
        }
        if (this.statusTilte == 'PendingLogisticsReview') {
          this.buttontitle = " | SUBMIT FOR Reconciliation Review";
        }
        if (this.statusTilte == 'PendingReconciliationReview') {
          this.buttontitle = "";
        }
        if (this.statusTilte == 'PendingPayment') {
          this.buttontitle = "";

        }

        for (var i = 0; i < this.Subtotal.length; i++) {
          this.SubtotalCount1 = this.Subtotal.map(r => Number(r.total)).reduce((a, c) => a + c);
        }
        let totalinv = (this.SubtotalCount1 * this.user.discount) / 100;
        this.invoiceTotal = this.SubtotalCount1 - totalinv;
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }
  // For different status of invoices  

  statusChanging(title) {
    let data = {}
    if (title == 'Paid') {
      this.openModalApprove(this.template1);
    } else if (title == 'Draft') {
      data['status'] = "PendingLogisticsReview";
    } else if (title == 'PendingLogisticsReview') {
      data['status'] = "PendingReconciliationReview";
    } else if (title == 'PendingReconciliationReview') {
      this.openModalApprove(this.template1);
      data['status'] = "PendingPayment";
    } else if (title == 'PendingPayment') {
    }
    this.commonService.callApi('api/documents/' + this.user.id + '/status', data, 'patch', false, false).then(success => {
      this.getInvoive(this.docNumber);
      this.icon1 = true;
      if (success) {

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })


  }

  // fOR EDIT AND DELETE

  editanddelete(i) {
    this.deletedid = i.id;
    this.apideleteid = i.document.id;
    this.user.sourceProduct = i.sourceProduct;
    this.user.quantity = i.quantity;
    this.user.productnotes = i.notes;
    this.user.productdiscount = i.discount;
    this.user.taxValue = i.taxValue;
    this.user.price = i.price;
    this.flagfordelete = true;

  }

  deleteInvoice() {


    this.commonService.callApi('api/documents/' + this.apideleteid + '/items/' + this.deletedid, '', 'delete', false, false).then(success => {
      this.getInvoive(this.docNumber);
      this.flagfordelete = false;
      if (success) {

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })


  }
  accordianview(type) {

    if (type == 'more') {
      this.accclose = true;
    }
    else if (type == 'less') {
      this.accclose = false;

    }

  }
  productSelected(event) {
    this.user['productnotes'] = event.description;
    this.user['price'] = event.price;
    // $('#productname :input').blur();
  }

  addCustomer() {
    this.userClient.businessPartnerType = 1;
    this.userClient.clientType = 1;
    this.commonService.callApi('api/clients', this.userClient, 'post', false, false).then(success => {
      if (success) {
        this.modalRef.hide();
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }

  showInnerFeilds(step) {

    if (step == 'inside') {
      this.innerDetails = true;
      this.outerDetails = false;
      this.slideCount = '2';
    } else if (step == 'outer') {
      this.innerDetails = false;
      this.outerDetails = true;
      this.slideCount = '1';
    }

  }
  recordSelected(event) {
    // $('#supplierName :input').blur();
    // $('#RepresentativeName :input').blur();
    // $('#areaName :input').blur();
    // $('#regionName :input').blur();
    // $('#typeName :input').blur();

  }
  openModalApprove(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1, { class: 'modal-md newMemo-Modal approve-modal' });
  }
  openClose(type){
    if(type == 'notes'){
      this.approveReqFirst = !this.approveReqFirst;
      this.approveReqSecond = false;
      this.approveReqThird = false ;
    }else if (type == 'second'){
       this.approveReqSecond = !this.approveReqSecond;
       this.approveReqFirst = false;
      this.approveReqThird = false ;
    }else if (type == 'third'){
      this.approveReqThird = !this.approveReqThird;
      this.approveReqSecond = false;
      this.approveReqFirst= false ;
   }

  }
}