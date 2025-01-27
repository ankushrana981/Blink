import { Component, OnInit,Injector,ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import * as FileSaver from "file-saver";
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-discount-rules',
  standalone:false,
  templateUrl: './discount-rules.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')) 
  ],
  styles: []
})
export class DiscountRulesComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;

  // public ts :any="1560416948725";
  public ts=this.getTimeStap();

  public offset:any=0;
  public limit:any=20;
  public status:any="all";
  public type:any="client";
  public MainSearchdataSource = new Subject<string>();
  public clientNameItem: Observable<any>;
  public supplierLoading: boolean = false;
  public showErr: boolean = false;
  fileName:any;

  public sidemenu:boolean=false;
  public user:any={};
  public cateoryselct:boolean =true;




  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  // direction = '';
  public listrecords:any = [];
  public categoriesrecords=[];
  public brandsrecords=[];
  public productrecords=[];
  public listrecords1:any=[];
  public SwitchUi:boolean=true;

  total:any;
  constructor(inj:Injector) { 
    super(inj)
  }
  ngOnInit() {
  this.getListData();
    this.loadTypehead();
    this.getCategories();
     this.getBrands();
    this.getProducts();


  }
  /*****************************************************
  @purpose : for gettinng list
  @parameters : 
  @return :
  *****************************************************/
  getListData(){
    var queryParams = 'ts='+this.ts+'&offset='+this.offset+'&limit='+this.limit;
    this.commonService.callApi('api/clients/discountrules?'+queryParams,'','get').then(success => {

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

 /*****************************************************
  @purpose : for search and getting the list for dropdown filed 
  @parameters : 
  @return :
  *****************************************************/
  private loadTypehead() {
		// startWith(this.user.serachSupplier),
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
  getSearchList(value: string = null, allow): Observable<any[]> {
		this.supplierLoading = true;
		let data = {};
		if (value) {
      data["entityType"] = "client";
			data["q"] = value;
		}
		 let items;
		return this.commonService.callApiObservable('api/clients/lookup', data).pipe(
			catchError(() => of(({ items: [] }))),
			map(success => {
        // console.log("asdhfa",success)
					items = success;
					if (allow) {
						this.clientNameItem = success['records'];
					}
					this.supplierLoading = false;
				return (items) ? items : [];
			})
			)
  }
  /*****************************************************
  @purpose : for gettinng Categories for dropdown
  @parameters : 
  @return :
  *****************************************************/
  getCategories(){
    this.commonService.callApi('api/inventory/productcategories/lookup?q=','','get').then(success => {
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
  @purpose : for gettinng brands for dropdown
  @parameters : 
  @return :
  *****************************************************/
  getBrands(){
    this.commonService.callApi('api/inventory/brands/lookup?q=','','get').then(success => {
      if (success) {
        this.brandsrecords = success;
          // this.user['branch'] = success[0]; 
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }
  /*****************************************************
  @purpose : for gettinng Products for dropdown
  @parameters : 
  @return :
  *****************************************************/
  getProducts(){
    this.commonService.callApi('api/inventory/products/lookup?q=','','get').then(success => {
      if (success) {
        this.productrecords = success;
          // this.user['branch'] = success[0]; 
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
  /*****************************************************
  @purpose : For creating the discounts
  @parameters : 
  @return :
  *****************************************************/
  Creatediscounts(user){
    // console.log("aljgsdfjbgaj",this.user)
    this.commonService.callApi('api/clients/discountrules',this.user,'post').then(success => {
      if (success) {
        this.icon1=false;
        this.sidemenu =false;
        } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }
  


  /*****************************************************
  @purpose : Calling list api On Scroll
  @parameters : 
  @return :
  *****************************************************/
  onScrollDown (ev) {
     this.offset=this.offset+20;
     var queryParams = 'ts='+this.ts+'&offset='+this.offset+'&limit='+this.limit;

    if(this.total>this.offset){
      this.commonService.callApi('api/clients/discountrules?'+queryParams,'','get').then(success => {

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
      // this.infiniteScroll.setup();

    }
  
   
  }

  onUp(ev) {
    // console.log('scrolled up!', ev);
   
  }

  editCustomerSetup(item){
    this.icon1=true;
      this.sidemenu =true;
      this.user=item;
  }
  Updatediscounts(user){
    this.commonService.callApi('api/clients/discountrules/'+user.id,this.user,'put').then(success => {
      if (success) {
        this.icon1=false;
        this.sidemenu =false;
     } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }
  changeview(type){
    if(type == 'upload'){
    this.SwitchUi=true;
    }else
    this.SwitchUi=false;
  }
  /*****************************************************
  @purpose :For downloading the file
  @parameters : 
  @return :
  *****************************************************/

  downloadFile(file){

    FileSaver.saveAs(file, "DiscountRuleTemplate" + ".csv");

  }

  downloadReport() {

    let headers;
    headers = new HttpHeaders({ 'content-Type': 'text/html', 'Authorization': this.getToken('accessToken') });
    this.commonService._http
      .get(
        this.commonService._apiUrl +'api/clients/discountrules/DownloadDiscountRuleTemplate',
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
  public icon1 :boolean=false;

  // For active and inactive the right side bar 

  changeIc(type){
  
    if(type == 'dots'){
      this.icon1=true;
      this.sidemenu =true;
      this.user={};
    }else{
      this.icon1=false;
      this.sidemenu =false;
      this.user={};
    }
  }

  /*****************************************************
@purpose :For upload file
@parameters : 
@return :
*****************************************************/

UploadFile() {
  this.commonService.callApi('api/clients/discountrules/import',this.formData, 'post',false,true).then(success => {
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

/*****************************************************
@purpose :For downloadedFailedfiles 
@parameters : 
@return :
*****************************************************/
downloadedFailedfiles(){
  this.commonService.callApi('api/clients/discountrules/DownloadRecentImportErrorFile', '', 'get', false, false, false, true).then(e => {
    console.log(e)
  }) 
}
  slectedCategory(select){
    $('#brandname :input').blur();

    this.cateoryselct =false;
    this.user['brand']={};
    this.user['product']={};
    var queryParams = 'ts='+''+'&productCategoryId='+select.id;

    // console.log("uploadefd",select)
    this.commonService.callApi('api/inventory/brands/lookup?'+queryParams,'','get').then(success => {
      if (success) {
        this.brandsrecords = success;
     } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })


  }
  selectedBrand(event){
    if(this.cateoryselct ==true){
      
      var Paramsselectbrand ='&q='+'&brandId='+event.id;
    }else{
      var Paramsselectbrand ='q='+'&productCategoryId='+event.productCategory.id+'&brandId='+event.id;
    }
    this.commonService.callApi('api/inventory/products/lookup?'+Paramsselectbrand,'','get').then(success => {

      if (success) {
        this.productrecords=success;
    
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })


  }
/*****************************************************
@purpose :For deleting the customer from list
@parameters : 
@return :
*****************************************************/
  deleteCustomerSetup(i){
    this.swal({
      imageUrl: "assets/images/trash-bin1.png",
      imageWidth: 155,
      text: "Are you sure you want to delete this record?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText : 'No',
      confirmButtonText: 'Yes',
      allowOutsideClick: false
    }).then((result) => {
      if(result.value){
        this.commonService.callApi('api/clients/discountrules/'+i.id,'','delete').then(success => {
          this.listrecords=[];
            this.offset=0;
            this.getListData();
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
  recordSelected(event){
    $('#supplierName :input').blur();
    $('#productCategoryName :input').blur();
    $('#productName :input').blur();
    
  }
}
