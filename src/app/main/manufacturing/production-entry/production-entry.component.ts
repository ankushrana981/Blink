import { Component, OnInit,Injector } from '@angular/core';
import {FormControl} from '@angular/forms';
import { BaseComponent } from '../../../common/commonComponent';
import { Subject, Observable, of, concat } from 'rxjs';

import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-production-entry',
  standalone:false,
  templateUrl: './production-entry.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter'))
  ],
  styles: []
})
export class ProductionEntryComponent extends BaseComponent implements OnInit {

  public branchrecords:any=[];
  public productNameItem: Observable<any>;
  public MainSearchdataSource = new Subject<string>();
  public productLoading: boolean = false;
  public notFoundText: any = "No matches found.";
  public productionitem: any = {};
  public compositionrecords:any=[];
  ingredientProductName:any;
  rowRepeatArr: any = []
  unit:any;
  compositionName:any
  constructor(inj:Injector) { 
    super(inj)
  }

  ngOnInit() {
    
    this.getBranches();
    this.loadTypehead();

  }


  /*****************************************************
 @purpose : For getting the branchs drop down 
 @parameters : 
 @return :
 *****************************************************/
  getBranches(){
    this.commonService.callApi('api/tenants/branches/lookup?q=','','get').then(success => {
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
 @purpose : product selected details
 @parameters : 
 @return :
 *****************************************************/

  productSelected(event){
    this.productionitem.composition='';
    $('#productName :input').blur();
    var ParamsAfterCat ='&productId='+event.id;
    this.commonService.callApi('api/inventory/compositions?'+ParamsAfterCat,'','get').then(success => {

      if (success) {
        this.compositionrecords=success.records;
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })


  }

 /*****************************************************
 @purpose : Quantity selected details 
 @parameters : 
 @return :
 *****************************************************/
  quantitychnge(i) {
   let count1 = this.rowRepeatArr.map(r => Number(r.quantity)).reduce((a, c) => a + c);
   this.rowRepeatArr.map(r => {
      this.productionitem.totalCostPerItem= 200
        r.percent = (r.quantity * 100) / count1;
  });

  }
/*****************************************************
 @purpose : composition selected details
 @return :
 *****************************************************/
  compositionSelected(event){

    this.compositionName = event.title;
    if(event.ingredients){
     this.rowRepeatArr =event.ingredients;
     this.rowRepeatArr.map(r => {
      this.unit =r.unitofMeasure.title;
      this.ingredientProductName =r.product.title;
  });
}

  }
 /*****************************************************
 @purpose : For Creating the entry
 @parameters : 
 @return :
 *****************************************************/

createproductionEntry(){
  // let totalQuantity = this.rowRepeatArr.map(r => Number(r.quantity)).reduce((a, c) => a + c);
  // let totalprice = this.rowRepeatArr.map(r => Number(r.price)).reduce((a, c) => a + c);

  //   this.productionitem.totalCostPerItem =totalprice;
  //   this.productionitem.totalCost = this.productionitem.quantity * totalprice;
  //   this.productionitem.totalWeightInKg = this.productionitem.quantity * totalQuantity;
  //   this.productionitem.totalExpectedWeight = this.productionitem.totalWeightInKg * 1000;
  //   this.productionitem.totalExpectedProducts=0;
  this.commonService.callApi('api/inventory/productions', this.productionitem, 'post').then(success => {
    if (success) {
      this.router.navigate(['/main/manufacturing/production-view'])
     } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })
}

}
