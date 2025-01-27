import { Component, OnInit,Injector,ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-expense-view',
  standalone: false,
  templateUrl: './expense-view.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')) 
  ],
  styles: []
})
export class ExpenseViewComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll!: InfiniteScrollDirective;
  // public ts :any="1562412222588";
  public ts=this.getTimeStap();

  public offset:any=0;
  public limit:any=20;
  public divisionNameItem!: Observable<any>;
  public MainSearchdataSource = new Subject<string>();
  public productLoading: boolean = false;
  public notFoundText: any = "No matches found.";
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  // direction = '';
  public listrecords:any = [];
  public listrecords1:any=[];
  public expencecatrecords=[];
  public currencies =[];
  public departmentArr =[];
   
  public data = {
    ts: this.ts,
    offset: this.offset,
    limit: this.limit,
    

  };
  public icon1 :boolean=false;
  public sidemenu:boolean=false;
  public accclose: boolean = false;

  public user : any ={};

  total:any;
  isDebit!: boolean;
  constructor(inj: Injector) { 
    super(inj)
    this.user['entryDate'] = new Date();
    this.user.isDebit = true;
}

  ngOnInit() {
    this.getListrecords();
    this.getexpenceCat();
    this.getCurrencies();
    this.getDepartments();
    this.loadTypehead();

  }
/*****************************************************
@purpose : For getting the product details for dropdown
@parameters : 
@return :
*****************************************************/
private loadTypehead() {
  // startWith(this.user.serachSupplier),
  this.divisionNameItem = concat(
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

getSearchList(value: string, allow:any): Observable<any[]> {
  this.productLoading = true;
  let data:any = {};
  if (value) {
    data["q"] = value;
  }
  let items;
  return null
  // return this.commonService.callApiObservable('api/tenants/divisions/lookup', data).pipe(
  //   catchError(() => of(({ items: [] }))),
  //   map(success => {
  //     items = success;
  //     if (allow) {
  //       this.divisionNameItem = success['records'];
  //     }
  //     this.productLoading = false;
  //     return (items) ? items : [];
  //   })
  // )
}
    /*****************************************************
 @purpose : For getting the list details
 @parameters : 
 @return :
 *****************************************************/
getListrecords() {
 this.commonService.callApi('api/finance/expenses',this.data, 'get').then(success => {

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
 @purpose : For lazy laoding scorrlling
 @parameters : 
 @return :
 *****************************************************/
onScrollDown(ev:any) {
  this.data['offset'] = this.data['offset'] + 20;
     if (this.total > this.data['offset']) {
    this.commonService.callApi('api/finance/expenses',this.data, 'get').then(success => {

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
    // this.infiniteScroll.setup();
    // this.direction = 'down'
  }

} 
 /*****************************************************
@purpose : For delete the item
@parameters : 
@return :
*****************************************************/
deleteAdjustment(i:any) {
  this.swal({
    imageUrl: "assets/images/trash-bin1.png",
    imageWidth: 155,
    // imageHeight: 171,
    title: 'Are you sure?',
    text: "Are you sure you want to delete this record?",
    // type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'No',
    confirmButtonText: 'Yes',
    allowOutsideClick: false
  }).then((result:any) => {
    if (result.value) {
      this.commonService.callApi('api/finance/expenses/' + i.id, '', 'delete').then(success => {
        this.listrecords = [];
        this.data.offset = 0;
        this.getListrecords()
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
  // swal(arg0: {
  //   imageUrl: string; imageWidth: number;
  //   // imageHeight: 171,
  //   title: string; text: string;
  //   // type: 'warning',
  //   showCancelButton: boolean; confirmButtonColor: string; cancelButtonColor: string; cancelButtonText: string; confirmButtonText: string; allowOutsideClick: boolean;
  // }) {
  //   throw new Error('Method not implemented.');
  // }
changeIc(type:any){
  
  if(type == 'dots'){
    this.user={};
    this.icon1=true;
    this.sidemenu =true;
    this.user['entryDate'] = new Date();
  }else{
    this.icon1=false;
    this.sidemenu =false;
    // this.user={};
  }
}
    /*****************************************************
 @purpose : For getting the expense categories list details
 @parameters : 
 @return :
 *****************************************************/
getexpenceCat() {
  
  this.commonService.callApi('api/tenants/expensecategories/lookup', '', 'get').then(success => {

    if (success) {
      this.expencecatrecords = success;
    
    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })
}
expenceItemselected(event:any){
  $('#expencecatrecords :input').blur();
  $('#currencies :input').blur();
  $('#department :input').blur();
  $('#division :input').blur();

  
  
}
accordianview(type:any) {

  if (type == 'more') {
    this.accclose = true;
  }
  else if (type == 'less') {
    this.accclose = false;

  }

}
/*****************************************************
@purpose : To get Currenciees for drop down
@parameters : 
@return :
*****************************************************/ 

getCurrencies() {

  this.commonService.callApi('api/currencies', '', 'get').then(success => {

    if (success) {
      this.currencies = success;

    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })

}
/*****************************************************
@purpose : To get Currenciees for drop down
@parameters : 
@return :
*****************************************************/ 

getDepartments() {

  this.commonService.callApi('api/currencies', '', 'get').then(success => {

    if (success) {
      this.departmentArr = success;

    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })

}
/*****************************************************
@purpose : For Creating and editing the list items
@parameters : 
@return :
*****************************************************/

createExpence(data:any){
  if(data.id){
    this.commonService.callApi('api/finance/expenses/'+data.id,this.user,'put').then(success => {
      this.user={};
        this.user['entryDate'] = new Date();
     if (success) {
        
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    }) 
  
  }else{
    this.commonService.callApi('api/finance/expenses',this.user,'post').then(success => {
      this.user={};
        this.user['entryDate'] = new Date();
        this.user.isDebit = true;

     if (success) {
        
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    }) 
  }

}

debitselected(event:any){
this.user['isDebit'] = true;
}
creditselected(event:any){

  this.user.isDebit = false;
  // this.user['isDebit'] = false;
}
editAdjustment(i:any){

  this.user=i;
  this.icon1=true;
  this.sidemenu =true;

}
}
