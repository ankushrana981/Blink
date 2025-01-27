import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { trigger } from '@angular/animations';
import * as FileSaver from "file-saver";
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-product-setup',
  standalone:false,
  templateUrl: './product-setup.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter'))
  ],
  styles: []
})
export class ProductSetupComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;

  // public ts: any = "1562150317751";
  public ts=this.getTimeStap();

  public offset: any = 0;
  public limit: any = 20;
  total: any;
  public data = {
    ts: this.ts,
    offset: this.offset,
    limit: this.limit,
    

  };
  public config: any = { stepOne: true, stepTwo: false, stepThree: false};

  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  public listrecords1: any = [];
  public productList: any = [];
  public categoriesrecords:any =[];
  public brandrecords:any =[];
  public defaultVendorRecords:any=[];
  public packagingTypeRecords:any=[];
  public unitOfmeasurerecords:any=[];
  public SwitchUi: boolean = true;
  public fileUploadflag: boolean = false;
  public showErr: boolean = false;

  

  public user: any = {};
  fileName:any;

  constructor(inj: Injector) {
    super(inj)
  }

  ngOnInit() {
    this.getUsers();
    this.getCategories();
    this.getBrands();
    this.getDefaultVendors();
    this.getPackageingType();
    this.getUnitOfMeasures();
  
  }

  /*****************************************************
@purpose : To get list details
@parameters : 
@return :
*****************************************************/

getUsers() {
  this.commonService.callApi('/api/inventory/products',this.data,'get').then(success => {
    if (success) {
      this.productList = success.records;
      this.total = success.total;
     // this.user['branch'] = success[0]; 
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
  this.commonService.callApi('/api/inventory/products',this.data, 'get').then(success => {

      if (success) {
        this.listrecords1 = success.records;
        for (var i = 0; i < this.listrecords1.length; i++) {
          this.productList.push(this.listrecords1[i]);
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
deleteProduct(i) {
  this.swal({
    imageUrl: "assets/images/trash-bin1.png",
    imageWidth: 155,
    text: "Are you sure you want to delete this record?",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'No',
    confirmButtonText: 'Yes',
    allowOutsideClick: false
  }).then((result) => {
    if (result.value) {
      this.commonService.callApi('/api/inventory/products/' + i.id, '', 'delete').then(success => {
        this.productList = [];
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
editProduct(r) {
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
    
   },100)
}
openNewEditview(type) {
  if(type == 'open'){
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
      
     },100)  
  }else{
    this.user = {};
    this.SwitchUi = true;
  }
 
}
  /*****************************************************
@purpose :For manaaging the add or edit side menu 
@parameters : 
@return :
*****************************************************/

toggle(step) {
  if (step == 'stepOne' && (!this.config.stepTwo && !this.config.stepThree)) {
    this.config.stepOne = true;
  } else if (step == 'stepThree' && (!this.config.stepTwo && !this.config.stepOne)) {
    this.config.stepThree = true;
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
@purpose : To get categories for  drop down
@parameters : 
@return :
*****************************************************/
getCategories() {
  this.commonService.callApi('api/inventory/productcategories/lookup', '', 'get').then(success => {
    if (success) {
      this.categoriesrecords = success;
      // this.user['branch'] = success[0]; 
    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })

}
/*****************************************************
@purpose : To get brands for  drop down
@parameters : 
@return :
*****************************************************/
getBrands() {
  this.commonService.callApi('api/inventory/brands/lookup', '', 'get').then(success => {
    if (success) {
      this.brandrecords = success;
      // this.user['branch'] = success[0]; 
    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })

}
/*****************************************************
@purpose : To get DefaultVendors for  drop down
@parameters : 
@return :
*****************************************************/
getDefaultVendors() {
  this.commonService.callApi('api/clients/lookup?entityType=vendor&q=', '', 'get').then(success => {
    if (success) {
      this.defaultVendorRecords = success;
      // this.user['branch'] = success[0]; 
    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })

}
/*****************************************************
@purpose : To get DefaultVendors for  drop down
@parameters : 
@return :
*****************************************************/
getUnitOfMeasures() {
  this.commonService.callApi('api/tenants/unitofmeasure/lookup', '', 'get').then(success => {
    if (success) {
      this.unitOfmeasurerecords = success;
      // this.user['branch'] = success[0]; 
    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })

}
/*****************************************************
@purpose : To get packaging type for  drop down
@parameters : 
@return :
*****************************************************/
getPackageingType() {
  this.commonService.callApi('api/packageTypes/lookup', '', 'get').then(success => {
    if (success) {
      this.packagingTypeRecords = success;
      // this.user['branch'] = success[0]; 
    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })

}
changedCheck(event) {

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

  FileSaver.saveAs(file, "ProductTemplate" + ".csv");

}

downloadReport() {

  let headers;
  headers = new HttpHeaders({ 'content-Type': 'text/html', 'Authorization': this.getToken('accessToken') });
  this.commonService._http
    .get(
      this.commonService._apiUrl +'api/inventory/products/DownloadProductTemplate',
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
@purpose :For downloadedFailedfiles 
@parameters : 
@return :
*****************************************************/
downloadedFailedfiles(){
  this.commonService.callApi('api/inventory/products/DownloadRecentImportErrorFile', '', 'get', false, false, false, true).then(e => {
    
  }) 
}
/*****************************************************
@purpose :For upload file
@parameters : 
@return :
*****************************************************/

UploadFile() {
  this.commonService.callApi('api/inventory/products/import',this.formData, 'post',false,true).then(success => {
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
caterogySelected(event) {
 
  $('#caterogy :input').blur();
  $('#brand :input').blur();
  $('#packaging :input').blur();
  $('#vendor :input').blur();
  $('#measure :input').blur();

}
/*****************************************************
@purpose :Create product entey and edit 
@parameters : 
@return :
*****************************************************/
createProduct(){
  if(this.user.id){
    
    this.commonService.callApi('api/inventory/products/' + this.user.id, this.user, 'put').then(success => {

      if (success) {
        this.SwitchUi = true;
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }else{
   this.commonService.callApi('api/inventory/products', this.user, 'post').then(success => {
  
        if (success) {
          this.SwitchUi = true;
          // this.getUsers();
  
  
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })
    }
 
  
  }
 
}
