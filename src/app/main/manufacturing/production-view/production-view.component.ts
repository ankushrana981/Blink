import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { trigger } from '@angular/animations';
@Component({
  selector: 'app-production-view',
  templateUrl: './production-view.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter'))
  ],
  styles: []
})
export class ProductionViewComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;

  // public ts: any = "1562057642888";
  public ts=this.getTimeStap();
  public offset: any = 0;
  public limit: any = 20;
  notes:any;
  public data = {
    ts: this.ts,
    offset: this.offset,
    // limit: this.limit

  };
  total: any;
  editItemId: any;
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  public listrecords: any = [];
  public listrecords1: any = [];
  public branchrecords: any = [];
  public productNameItem: Observable<any>;
  public MainSearchdataSource = new Subject<string>();
  public productLoading: boolean = false;
  public notFoundText: any = "No matches found.";
  public SwitchUi: boolean = true;
  ingredientProductName: any;
  rowRepeatArr: any = []
  unit: any;
  compositionName: any;
  public productionitem: any = {};
  public compositionrecords: any = [];
  public makeEntryflag: boolean = false;




  constructor(inj: Injector) {
    super(inj)
  }

  ngOnInit() {
     this.viewlistrecords();
    this.getBranches();
    this.loadTypehead();
  }
  /*****************************************************
 @purpose : For getting the list details
 @parameters : 
 @return :
 *****************************************************/
  viewlistrecords() {
    this.commonService.callApi('api/inventory/productions',this.data, 'get').then(success => {

      if (success) {
        this.listrecords = success.records;
        this.total = success.total;
  } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }

  /*****************************************************
@purpose : For delete the item
@parameters : 
@return :
*****************************************************/
  deleteItem(i) {
    this.swal({
      imageUrl: "assets/images/trash-bin1.png",
      imageWidth: 155,
      // imageHeight: 171,
      // title: 'Are you sure?',
    text: "Are you sure you want to delete this record?",
    
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.commonService.callApi('api/inventory/productions/' + i.id, '', 'delete').then(success => {
          this.listrecords=[];
            this.offset = 0;
            this.viewlistrecords();

          if (success) {

          } else {
            this.popToast('error', success.message)
          }
        }).catch((e) => {
          console.log("there is an error:", e)
        })
      }
    })

  }
  /*****************************************************
@purpose : For getting the branches for drop down
@parameters : 
@return :
*****************************************************/
  getBranches() {
    this.commonService.callApi('api/tenants/branches/lookup?q=', '', 'get').then(success => {
      if (success) {

        this.branchrecords = success;
        // this.user['branch'] = success[0]; 
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
  onUp(ev) {
  
  }

  onScrollDown(ev) {

    this.data['offset'] = this.data['offset'] + 20;
     if (this.total > this.data['offset']) {

      this.commonService.callApi('api/inventory/productions',this.data, 'get').then(success => {

        if (success) {
          this.listrecords1 = success.records;
          for (var i = 0; i < this.listrecords1.length; i++) {
            this.listrecords.push(this.listrecords1[i]);
          }
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })
      this.infiniteScroll.ngOnDestroy();
      this.infiniteScroll.setup();
      // this.direction = 'down'
    }

  }
  private loadTypehead() {
    // startWith(this.user.serachSupplier),
    this.productNameItem = concat(
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
    this.productLoading = true;
    let data = {};
    if (value) {
      data["includeComponentOnly"] = "true";
      data["q"] = value;
    }
    let items;
    return this.commonService.callApiObservable('api/inventory/products/lookup', data).pipe(
      catchError(() => of(({ items: [] }))),
      map(success => {
        items = success;
        if (allow) {
          this.productNameItem = success['records'];
        }
        this.productLoading = false;
        return (items) ? items : [];
      })
    )
  }
  /*****************************************************
 @purpose : For Edit an item and cahnging the diffrent Ui
 @parameters : 
 @return :
 *****************************************************/
  editItem(i) {
    console.log("edited item",i)
    this.editItemId = i.id;
    this.SwitchUi = false;

    this.productionitem = i;
    if (i.composition) {
      this.rowRepeatArr = i.composition.ingredients;
      this.rowRepeatArr.map(r => {
        this.unit = r.unitofMeasure.title;
        this.ingredientProductName = r.product.title;
      });
  
    }


  }
  changeUi() {
    this.SwitchUi = true;
  }
  /*****************************************************
 @purpose : For Editing the item with api call
 @parameters : 
 @return :
 *****************************************************/
  editproductionEntry() {
    let totalQuantity = this.rowRepeatArr.map(r => Number(r.quantity)).reduce((a, c) => a + c);
    let totalprice = this.rowRepeatArr.map(r => Number(r.price)).reduce((a, c) => a + c);

    this.productionitem.totalCostPerItem = totalprice;
    this.productionitem.totalCost = this.productionitem.quantity * totalprice;
    this.productionitem.totalWeightInKg = this.productionitem.quantity * totalQuantity;
    this.productionitem.totalExpectedWeight = this.productionitem.totalWeightInKg * 1000;
    this.productionitem.totalExpectedProducts = 0;

   this.commonService.callApi('api/inventory/productions/' + this.editItemId, this.productionitem, 'put').then(success => {
      if (success) {
        this.SwitchUi = true;
       this.viewlistrecords()
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
  /*****************************************************
@purpose : For selected product dropdown
@parameters : 
@return :
*****************************************************/
  productSelected(event) {
    this.productionitem.composition = '';
    $('#productName :input').blur();

    var ParamsAfterCat = '&productId=' + event.id;
    this.commonService.callApi('api/inventory/compositions?' + ParamsAfterCat, '', 'get').then(success => {

      if (success) {
        this.compositionrecords = success.records;


      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })


  }
  /*****************************************************
@purpose : For changing the quantity details
@parameters : 
@return :
*****************************************************/
  quantitychnge(i) {
    let count1 = this.rowRepeatArr.map(r => Number(r.quantity)).reduce((a, c) => a + c);
    this.rowRepeatArr.map(r => {
      this.productionitem.totalCostPerItem = 200
      r.percent = (r.quantity * 100) / count1;

    });

  }
  /*****************************************************
@purpose : for composition selection details 
@parameters : 
@return :
*****************************************************/
  compositionSelected(event) {
  this.compositionName = event.title;
    if (event.ingredients) {

      this.rowRepeatArr = event.ingredients;
     this.rowRepeatArr.map(r => {
        this.unit = r.unitofMeasure.title;
        this.ingredientProductName = r.product.title;
      });
    }

  }
  openMakeEntry(i, j) {
   
    for (var k = 0; k < this.listrecords.length; k++) {
      this.listrecords[k].makeEntryflag = false;

      if (this.listrecords[k].id == i.id) {
        this.listrecords[k].makeEntryflag = true;

      }

    }

  }
  closeMakeEntry(i,j){

    for (var k = 0; k < this.listrecords.length; k++) {
      if (this.listrecords[k].id == i.id) {
        this.listrecords[k].makeEntryflag = false;
        
      }

    }

  }

editMakeEntry(i){
let entry ={
  notes:i.notes,
  quantity:i.quantity
}
   this.commonService.callApi('api/inventory/productions/'+ i.id +'/manufacturingEntry', entry, 'post').then(success => {
      if (success) {
        for (var k = 0; k < this.listrecords.length; k++) {
          if (this.listrecords[k].id == i.id) {
            this.listrecords[k].makeEntryflag = false;
          }
        }
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
}
