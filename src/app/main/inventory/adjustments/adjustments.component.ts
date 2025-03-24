import { Component, OnInit,Injector,ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-adjustments',
  standalone:false,
  templateUrl: './adjustments.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')) 
  ],
  styles: []
})
export class AdjustmentsComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;
  // public ts :any="1562322745841";
  public ts=this.getTimeStap();

  public offset:any=0;
  public limit:any=20;
  public productNameItem: Observable<any>;
  public MainSearchdataSource = new Subject<string>();
  public productLoading: boolean = false;
  public notFoundText: any = "No matches found.";
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  // direction = '';
  public listrecords:any = [];
  public listrecords1:any=[];
  public adjustmentcatrecords=[];
  public maxDate = new Date();
 
 
  public data = {
    ts: this.ts,
    offset: this.offset,
    limit: this.limit,
    

  };
  public icon1 :boolean=false;
  public sidemenu:boolean=false;
  public user :any={};

  total:any;
  constructor(inj: Injector) { 
    super(inj)
    this.user['entryDate'] = new Date();
   
}

  ngOnInit() {
    this.getListrecords();
    this.loadTypehead();
    this.getAdjustmentCat();
  }
 
    /*****************************************************
 @purpose : For getting the list details
 @parameters : 
 @return :
 *****************************************************/
getListrecords() {
 
  this.commonService.callApi('api/inventory/adjustments',this.data, 'get').then(success => {

    if (success) {
      this.listrecords = success.records;
      this.total = success.total;
      console.log("ashdfhjas", this.total)

    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })
}
    /*****************************************************
 @purpose : For getting the list details
 @parameters : 
 @return :
 *****************************************************/
getAdjustmentCat() {
  
  this.commonService.callApi('api/inventory/adjustmentcategories/lookup', '', 'get').then(success => {

    if (success) {
      this.adjustmentcatrecords = success;
    
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

 onScroll(event: any) {
  const target = event.target;
  const atBottom =
    target.scrollTop + target.clientHeight >= target.scrollHeight;
  console.log('bottom');
  if (atBottom) {
    this.onScrollDown(event);
  }
}
onScrollDown(ev) {

  this.data['offset'] = this.data['offset'] + 20;
 
  if (this.total > this.data['offset']) {
    this.commonService.callApi('api/inventory/adjustments',this.data, 'get').then(success => {

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
deleteAdjustment(i) {
  this.swal({
    imageUrl: "assets/images/trash-bin1.png",
    imageWidth: 155,
    text: "Are you sure you want to delete it?",
    // type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',    
    allowOutsideClick: false
  }).then((result) => {
    if (result.value) {
      this.commonService.callApi('/api/inventory/adjustments/' + i.id, '', 'delete').then(success => {
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
changeIc(type){
  
  if(type == 'dots'){
    
    this.icon1=true;
    this.sidemenu =true;
    this.user={};
    this.user['entryDate'] = new Date();
    
  }else{
    this.icon1=false;
    this.sidemenu =false;
    this.user={};
  }
}
ModelDatepicker(event){


}

/*****************************************************
@purpose : For getting the product details for dropdown
@parameters : 
@return :
*****************************************************/
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
productSelected(event) {
 
  $('#productName :input').blur();
  $('#adjustmentCategory :input').blur();

}
/*****************************************************
@purpose :Create and edit of adjustment
@parameters : 
@return :
*****************************************************/
createAdjustment(data){

if(data.id){
  this.user['isDebit'] == true;
  this.commonService.callApi('api/inventory/adjustments/'+data.id,this.user,'put').then(success => {
    if (success) {
      this.user={};
      this.user['entryDate'] = new Date();
     
      
    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })
}else{
  this.user['isDebit'] == true;
  this.commonService.callApi('api/inventory/adjustments',this.user,'post').then(success => {
    if (success) {
      this.user={};
      this.user['entryDate'] = new Date();

      
    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })
}

}
EditAdjustment(i){
  this.icon1=true;
    this.sidemenu =true;
  this.user = i;

}
}
