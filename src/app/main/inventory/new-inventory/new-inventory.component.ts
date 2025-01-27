import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
// import { copyStyles } from '@angular/animations/browser/src/util';
@Component({
  selector: 'app-new-inventory',
  standalone:false,
  templateUrl: './new-inventory.component.html',
  styles: []
})
export class NewInventoryComponent extends BaseComponent implements OnInit {
  public isNew: Boolean = true;
  public icon1: boolean = false;
  public accclose: boolean = false;
  public branchrecords = [];
  // public productrecords =[];
  public user: any = {};
  public statusstages:any={};
  public vendorrecords = [];
  public docNumber: any;
  public statusTilte: any;
  purchaseorder:any;
  requests:any;
  count1:any;
  public productrecords: Observable<any>;
  public MainSearchdataSource = new Subject<string>();
  public supplierLoading: boolean = false;
  public Subtotal:any;
  public flagfordelete:boolean=false;
  public flagforcloseside:boolean=false;

  public deletedid:any;
  public apideleteid:any;

  constructor(inj: Injector, public route: ActivatedRoute) {
    super(inj)
    this.getBranches();
  

    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        if (params['status'] && params['docNumber']) {
          console.log("oaijsiodfjij",params)
        this.requests = params['request'];

        this.purchaseorder = params['purchaseorder'];
          this.docNumber = params['docNumber'];
          this.getInventory(params['docNumber']);
          this.isNew = false;
          
        } else {
          this.user = {};
          this.isNew = true;
          this.user['docNumber'] = '<auto generated>';
          this.user['dateOfIssue'] = new Date();

        }
      })
    }
  }

  ngOnInit() {
   
    this.loadTypehead();
    this.getEntityType();


  }

  private loadTypehead() {
    // startWith(this.user.serachSupplier),
    this.productrecords = concat(
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

  getSearchList(value: string = null, allow): Observable<any[]> {
    this.supplierLoading = true;
    let data = {};
    if (value) {
      data["q"] = value;
    }
    let items = [];
    return this.commonService.callApiObservable('api/inventory/products', data).pipe(
      catchError(() => of(({ items: [] }))),
      map(success => {
        items = success['records'];
        if (allow) {
          this.productrecords = success['records'];
        }
        this.supplierLoading = false;
        return (items) ? items : [];
      })
    )
  }
  changeIc(type) {
    if (type == 'dots') {
      this.icon1 = false;
    } else {
      this.icon1 = true;
    }
  }
  accordianview(type) {

    if (type == 'more') {
      this.accclose = true;
    }
    else if (type == 'less') {
      this.accclose = false;

    }

  }
  public maxDate = new Date();
  ModelDatepicker(event) {
   
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
  productSelected(event) {

    this.user['sourcePrice'] = event.sourcePrice;
    this.user['description'] = event.description;
    $('#productname :input').blur();
  }
  vendorSelected(event) {

    $('#vendor :input').blur();
  }
  createInventory(user) {
    if (this.isNew) {
      this.user['type'] = 2;
      this.user['discount'] = 0;
      this.user['dueDate'] = this.user.dateOfIssue;

      this.commonService.callApi('api/documents', user, 'post', false, false).then(success => {
        if (success) {
          // this.getInvoive(success.docNumber);
          this.router.navigate(['/main/inventory/new-inventory'], { queryParams: { status: success.status.id, docNumber: success.docNumber } })

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
      data['vendor'] = this.user.vendor;
      data['price'] = this.user.price;
      data['description'] = this.user.description;
      data['currencyRate'] = this.user.currencyRate;
      this.commonService.callApi('api/documents/'+ this.user.id + '/items', data, 'post', false, false).then(success => {
        if (success) {
          if (success.document) {
            this.accclose = false;
            this.getInventory(success.document.title);
          }
          // this.router.navigate(['/main/inventory/new-inventory'],{ queryParams: { status : success.status.id, docNumber : success.docNumber} })
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })

    }
  }
  getInventory(docNumber) {
   if(this.purchaseorder=="true"){
    this.commonService.callApi('api/documents/purchaseorder/' + docNumber, '', 'get', false, false).then(success => {
        if (success) {
          this.user = success;
         if(this.user.status.id != '1'){
            this.icon1 = true;
          }
        
          this.Subtotal=success.items;
          this.count1 = this.Subtotal.map(r => Number(r.total)).reduce((a, c) => a + c);
       this.statusTilte = success.status.title;
         
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })
  

    }else{
      this.commonService.callApi('api/documents/inventoryrequest/' + docNumber, '', 'get', false, false).then(success => {
        if (success) {
          this.user = success;
          if(this.user.status.id != '1'){
            this.icon1 = true;
  
          }
        
          this.Subtotal=success.items;
        
          this.statusTilte = success.status.title;
         
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })
  
    }

  }
  editanddelete(i){

  this.deletedid = i.id;
  this.apideleteid =i.document.id;
  this.user.sourceProduct =i.sourceProduct;
  this.user.quantity=i.quantity;
  this.user.productnotes=i.notes;
  this.user.productdiscount=i.discount;
  this.user.taxValue=i.taxValue;
  this.user.price=i.price;
  this.flagfordelete = true;
  this.user.vendor =i.vendor.title;
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

  getEntityType() {
    this.commonService.callApi('api/clients?entityType=vendor&q=', '', 'get').then(success => {
      if (success) {
        this.vendorrecords = success.records;

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
  deleteInventory(i){
   this.commonService.callApi('api/documents/'+this.apideleteid+ '/items/'+this.deletedid,'','delete',false,false).then(success => {
      this.getInventory(this.docNumber);
      if (success) {
  
    } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  
  }
  submitInventory(i,status){
    if(status == 'one'){
    this.statusstages.status ="IRSubmitted"
    }else{
      this.statusstages.status ="IRPOGenerated"
    }
    
    
    this.commonService.callApi('api/documents/'+i.id+ '/status',this.statusstages,'patch',false,false).then(success => {
      this.getInventory(this.docNumber);
      
      if (success) {
  
    } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  
  }
  newInventoryrew(){
    this.icon1 = false;
    this.router.navigate(['/main/inventory/new-inventory'])
  }
}

