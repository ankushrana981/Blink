import { Component, OnInit,Injector,ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { trigger } from '@angular/animations';
@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter'))
  ],
  styles: []
})
export class PurchaseOrdersComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;
  // public ts: any = "1562251638499";
  public ts=this.getTimeStap();

  public offset: any = 0;
  public limit: any = 20;
  public type = 'purchaseorder';
  public status ='all';
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  public data = {
    ts: this.ts,
    offset: this.offset,
    limit: this.limit,
    type: this.type,
    status:this.status

  };
  public icon1 :boolean=false;

  public listrecords1: any = [];
  public usersList: any = [];
  constructor(inj: Injector) {
    super(inj)
  }

  ngOnInit() {
    this.getlistUsers();
  }
  /*****************************************************
@purpose : To get list details
@parameters : 
@return :
*****************************************************/

total: any;
getlistUsers() {
   this.commonService.callApi('api/documents',this.data, 'get').then(success => {
    if (success) {
      this.usersList = success.records;
      this.total = success.total;
    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })
}
  /*****************************************************
@purpose : lazy loading for list
@parameters : 
@return :
*****************************************************/
onScrollDown(ev) {
this.data['offset'] = this.data['offset'] + 20;
  if (this.total > this.data['offset']) {
    this.commonService.callApi('api/documents',this.data, 'get').then(success => {
     if (success) {
        this.listrecords1 = success.records;
        for (var i = 0; i < this.listrecords1.length; i++) {
          this.usersList.push(this.listrecords1[i]);
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
  // this.direction = 'down'
}
changeIc(type){
  if(type == 'dots'){
    this.icon1=true;
  }else{
    this.icon1=false;
  }
}
editing(element){
      
  this.router.navigate(['/main/inventory/new-inventory'], { queryParams: { status : element.status.id, docNumber : element.docNumber ,purchaseorder : true} })
}
}
