import { Component, OnInit,Injector,ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../../reusable/fade-animations';
import * as FileSaver from "file-saver";
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-customer-setup-listing',
  templateUrl: './customer-setup-listing.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')) 
  ],
  styles: []
})
export class CustomerSetupListingComponent extends BaseComponent implements OnInit {

  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;

  // public ts :any="1560363439779";
  public ts=this.getTimeStap();

  public offset:any=0;
  public limit:any=20;
  public status:any="all";
  public type:any="client";
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  // direction = '';
  public listrecords:any = [];
  public listrecords1:any=[];
  public SwitchUi:boolean=true;
  public showErr:boolean=false;
  fileName:any;
  
  

  total:any;
  constructor(inj:Injector) { 
    super(inj)
  }

  ngOnInit() {
    var queryParams = 'ts='+this.ts+'&offset='+this.offset+'&limit='+this.limit+'&status='+this.status+'&entitytype='+this.type;
    this.commonService.callApi('api/clients?'+queryParams,'','get').then(success => {

      if (success) {
        this.listrecords=success.records;
        this.total=success.total;
      
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }


  onScrollDown (ev) {
    // console.log('scrolled down!!', ev);

    this.offset=this.offset+20;
    
    var queryParams = 'ts='+this.ts+'&offset='+this.offset+'&limit='+this.limit+'&status='+this.status+'&entitytype='+this.type;
    if(this.total>this.offset){
      this.commonService.callApi('api/clients?'+queryParams,'','get').then(success => {

        if (success) {
          this.listrecords1=success.records;
          for(var i=0 ;i<this.listrecords1.length;i++){
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

    }
  
    // this.direction = 'down'
  }

  onUp(ev) {
   
  }
  editCustomerSetup(item){
    this.router.navigate(['/main/crm/customersetup/new-customer-setup'],{ queryParams: { id : item.id } });

  }
  changeview(type){
    if(type == 'upload'){
    this.SwitchUi=true;
    }else
    this.SwitchUi=false;
  }

  //file download

  downloadFile(file){
    
   
    FileSaver.saveAs(file, "ClientTemplate" + ".csv");

  }

  downloadReport() {
    
    let headers;
    headers = new HttpHeaders({ 'content-Type': 'text/html', 'Authorization': this.getToken('accessToken') });
    this.commonService._http
      .get(
        this.commonService._apiUrl +'api/clients/DownloadClientTemplate',
        {
          responseType: "blob",
          headers
        }
      )
      .subscribe(
        k => {
          this.downloadFile(k);
        },
        error => {
          this.popToast("error", error);
        }
      );
   
  }

  /*****************************************************
@purpose :For upload file
@parameters : 
@return :
*****************************************************/

UploadFile() {
  this.commonService.callApi('api/clients/import',this.formData, 'post',false,true).then(success => {
this.showErr =true;
    if (success) {
      
    } 
  }).catch((e) => {
    console.log("there is an error:", e)
  })

}
formData;
onFileChange(event) {
this.showErr =false;

  let files = event.target.files[0].name;
  this.fileName = files;
     this.formData=new FormData();
  this.formData.append('file',event.target.files[0])
}
  deleteCustomerSetup(i){
    this.swal({
      imageUrl: "assets/images/trash-bin1.png",
      imageWidth: 155,
      text: "Are you sure you want to delete it?",
     
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText : 'No',
      confirmButtonText: 'Yes',
      allowOutsideClick: false
    }).then((result) => {
      if(result.value){
        this.commonService.callApi('api/clients/'+i.id,'','delete').then(success => {
            this.listrecords=[];
            this.offset=0;
            this.ngOnInit();
        
         
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

  
}
