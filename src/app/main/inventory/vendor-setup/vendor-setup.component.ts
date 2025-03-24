// http://34.213.86.163/20180506/api/clients?ts=1561981445412&offset=60&limit=20
import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { trigger } from '@angular/animations';
import * as FileSaver from "file-saver";
import { HttpHeaders } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-vendor-setup',
  standalone:false,
  templateUrl: './vendor-setup.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter'))
  ],
  styles: []
})
export class VendorSetupComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;

  // public ts: any = "1562129154275";
  public ts=this.getTimeStap();

  public offset: any = 0;
  public limit: any = 20;
  public entityType = 'vendor'
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  public data = {
    ts: this.ts,
    offset: this.offset,
    limit: this.limit,
    entityType: this.entityType

  };
  fileName:any;
  public SwitchUi: boolean = true;
  public fileUploadflag: boolean = false;
  public showErr: boolean = false;



  public user: any = {};
  public currencies = [];
  public contactPersn = [];
  public countryrecords: any = {};

  public config: any = { stepOne: true, stepTwo: false, stepThree: false, stepFour: false };
  public listrecords1: any = [];
  public usersList: any = [];

  constructor(inj: Injector) {
    super(inj)
  }

  ngOnInit() {

    this.getCountries();
    this.contactPersons();
    this.getCurrencies();
    this.getUsers();
  }

  /*****************************************************
@purpose : To get list details
@parameters : 
@return :
*****************************************************/

  total: any;
  getUsers() {
    var queryParams = Object.keys(this.data).map(key => key + '=' + this.data[key]).join('&');
    this.commonService.callApi('api/clients',this.data, 'get').then(success => {
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

onScroll(event: any) {
  const target = event.target;
  const atBottom =
    target.scrollTop + target.clientHeight >= target.scrollHeight;
  console.log('bottom');
  if (atBottom) {
    this.onScrollDown(event);
    // console.log(
    //   'scrollTop',
    //   target.scrollTop,
    //   'clientHeight',
    //   target.clientHeight,
    //   'scrollHeight ',
    //   target.scrollHeight
    // );
  }
}

  onScrollDown(ev) {
 this.data['offset'] = this.data['offset'] + 20;
    var queryParams = Object.keys(this.data).map(key => key + '=' + this.data[key]).join('&');
    if (this.total > this.data['offset']) {

      this.commonService.callApi('api/clients', this.data, 'get').then(success => {

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
      // this.infiniteScroll.setup();
      // this.direction = 'down'
    }
    // this.direction = 'down'
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
        this.commonService.callApi('api/clients/' + i.id, '', 'delete').then(success => {
          this.usersList = [];
          this.data.offset = 0;
          this.getUsers()
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
@purpose : While editting the list data
@parameters : 
@return :
*****************************************************/
  editItem(r) {
 
    this.SwitchUi = false;
    this.user = r;
    setTimeout( () => {
      document.getElementById('stepOne').addEventListener('mouseenter', () => {
        this.toggle('stepOne')
      })
      document.getElementById('stepTwo').addEventListener('mouseenter', () => {
        this.toggle('stepTwo')
      })
      document.getElementById('stepThree').addEventListener('mouseenter', () => {
        this.toggle('stepThree')
      })
      document.getElementById('stepFour').addEventListener('mouseenter', () => {
        this.toggle('stepFour')
      })

    },100)  
  }

 /*****************************************************
@purpose : To get contactperson details for dropdown in add new
@parameters : 
@return :
*****************************************************/
  contactPersons() {
    this.commonService.callApi('api/clients/lookup?clientType=2', '', 'get').then(success => {
      if (success) {
        this.contactPersn = success;

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
/*****************************************************
@purpose : selected contact person dropdown field blur
@parameters : 
@return :
*****************************************************/
  Cpersonselected(event) {
    $('#contactPersn :input').blur();

  }
  /*****************************************************
@purpose :For manaaging the add or edit side menu 
@parameters : 
@return :
*****************************************************/

  toggle(step) {
    if (step == 'stepOne' && (!this.config.stepTwo && !this.config.stepThree && !this.config.stepFour)) {
      this.config.stepOne = true;
    } else if (step == 'stepFour' && (!this.config.stepTwo && !this.config.stepThree && !this.config.stepOne)) {
      this.config.stepFour = true;
    } else {
      Object.keys(this.config).forEach(e => {
        if (e == step) {
          this.config[step] = !this.config[step];
        } else {
          this.config[e] = false;
        }
      })
    }
  }

  /*****************************************************
@purpose : Create and edit the vendor details
@parameters : 
@return :
*****************************************************/

  createVendor() {
    if (this.user.id) {
   this.user['discount'] = 0;
      this.user['businessPartnerType'] = 2;
      this.commonService.callApi('api/clients/' + this.user.id, this.user, 'put').then(success => {

        if (success) {
          this.SwitchUi = true;
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })



    } else {
       this.user['discount'] = 0;
      this.user['businessPartnerType'] = 2;
      this.commonService.callApi('api/clients', this.user, 'post').then(success => {

        if (success) {
          this.SwitchUi = true;
          this.getUsers();

        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })

    }


  }
   /*****************************************************
@purpose : To get Country for drop down
@parameters : 
@return :
*****************************************************/

  getCountries() {

    this.commonService.callApi('api/countries', '', 'get').then(success => {

      if (success) {
        this.countryrecords = success;
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

  openNewEditview() {
    this.user = {};
    this.SwitchUi = false;
    setTimeout( () => {
      document.getElementById('stepOne').addEventListener('mouseenter', () => {
        this.toggle('stepOne')
      })
      document.getElementById('stepTwo').addEventListener('mouseenter', () => {
        this.toggle('stepTwo')
      })
      document.getElementById('stepThree').addEventListener('mouseenter', () => {
        this.toggle('stepThree')
      })
      document.getElementById('stepFour').addEventListener('mouseenter', () => {
        this.toggle('stepFour')
      })

    },100)
  }
  closeAddEditView() {
    this.SwitchUi = true;

  }
  changedCheck(event) {
    
  }
  countrySelected(event) {
    // this.user.country = event.value;
    $('#countryName :input').blur();

  }

  currencySelected(event) {
    $('#currencies :input').blur();
  }
  openFileUpload(type) {
    if (type == 'open') {
    
      this.fileUploadflag = true;
    } else {
      this.fileUploadflag = false;

    }

  }
 /*****************************************************
@purpose :For download file
@parameters : 
@return :
*****************************************************/


  downloadFile(file){
    
    // console.log("downloaded")
    // this.commonService.callApi('api/clients/discountrules/DownloadDiscountRuleTemplate','','get',false,false,false,true).then(e =>{
    //   console.log(e)
    //   const file = new Blob([e], {
    //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //   });
    //   // FileSaver.saveAs(file, "Report" + ".xlsx");
    // })
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
}
