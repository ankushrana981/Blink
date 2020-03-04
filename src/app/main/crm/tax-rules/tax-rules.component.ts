import { Component, OnInit,Injector } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-tax-rules',
  templateUrl: './tax-rules.component.html',
  styles: []
})
export class TaxRulesComponent extends BaseComponent implements OnInit {
  public icon1 :boolean=false;
  public sidemenu:boolean=false;
  public taxrecords=[];
  public clientrecords=[];
  public Categoriesrecords=[];
  public taxproductrecords=[];
  public taxbrandrecords=[];
  // public ts :any="1560590517243";
  public ts=this.getTimeStap();

  public offset:any=0;
  public limit:any=20;
  public cateoryselct:boolean =true;
  total:any;
  public user:any={};
  
 
  constructor(inj:Injector) { 
    super(inj)
  }

  ngOnInit() {
    this.taxRulesList();
    this.taxClients();
    this.taxCategories();
    this.taxProducts();
    this.taxBrand();

  } 
  /*****************************************************
  @purpose :For getting the list
  @parameters : 
  @return :
  *****************************************************/ 
  
  taxRulesList(){
    var queryParams = 'ts='+this.ts+'&offset='+this.offset+'&limit='+this.limit;
    this.commonService.callApi('api/clients/taxrules?'+queryParams,'','get').then(success => {

      if (success) {
        this.taxrecords=success.records;
        this.total=success.total;
      
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }
  
  /*****************************************************
  @purpose :Clients for dropdown 
  @parameters : 
  @return :
  *****************************************************/

  taxClients(){
    var queryParamsClient = 'entityType'+'client'+'&q=';
    this.commonService.callApi('api/clients/lookup?'+queryParamsClient,'','get').then(success => {

      if (success) {
        this.clientrecords=success;
      
      
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }

  /*****************************************************
  @purpose  :taxCategories for dropdown 
  @parameters : 
  @return :
  *****************************************************/

  taxCategories(){
    var queryParamsCat ='&q=';
    this.commonService.callApi('api/inventory/productcategories/lookup?'+queryParamsCat,'','get').then(success => {

      if (success) {
        this.Categoriesrecords=success;
       } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

    
  }

   
  /*****************************************************
  @purpose  :taxProducts for dropdown 
  @parameters : 
  @return :
  *****************************************************/
   taxProducts(){
    var queryParamsproduct ='&q=';
    this.commonService.callApi('api/inventory/products/lookup?'+queryParamsproduct,'','get').then(success => {

      if (success) {
        this.taxproductrecords=success;

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

    
  }

      

  /*****************************************************
  @purpose : taxProducts for dropdown
  @parameters : 
  @return :
  *****************************************************/
     taxBrand(){
      var queryParamsbrand ='&q=';
      this.commonService.callApi('api/inventory/brands/lookup?'+queryParamsbrand,'','get').then(success => {
  
        if (success) {
          this.taxbrandrecords=success;
  
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })
  
      
    }
  selectedCategory(event){
    $('#productCategory :input').blur();

    this.cateoryselct =false;
    this.user['brand']={};
    this.user['product']={};

     
    // console.log("selected categoei",event)
    var ParamsAfterCat ='&q='+'&productCategoryId='+event.id;
    this.commonService.callApi('api/inventory/brands/lookup?'+ParamsAfterCat,'','get').then(success => {

      if (success) {
        this.taxbrandrecords=success;
      
      
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })


  }
  selectedBrand(event){
    $('#brand :input').blur();

    if(this.cateoryselct ==true){
      
      var Paramsselectbrand ='&q='+'&brandId='+event.id;
    }else{
      var Paramsselectbrand ='q='+'&productCategoryId='+event.productCategory.id+'&brandId='+event.id;
    }
    // console.log("selected categoei",Paramsselectbrand)
  
    this.commonService.callApi('api/inventory/products/lookup?'+Paramsselectbrand,'','get').then(success => {

      if (success) {
        this.taxproductrecords=success;
      
      
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })


  }
  changedCheck(event){
// console.log("asdfasf",event)
  }

  /*****************************************************
  @purpose : Create and edit 
  @parameters : 
  @return :
  *****************************************************/
 createTax(data){
    // console.log("fsdfhasdkf",data)
    if(data.id){
      this.commonService.callApi('api/clients/taxrules/'+data.id,this.user,'put').then(success => {
        if (success) {
          this.icon1=false;
          this.sidemenu =false;
          this.taxRulesList();

        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })
     
    }else{
      this.commonService.callApi('api/clients/taxrules',data,'post').then(success => {
        if (success) {
          this.icon1=false;
          this.sidemenu =false;
          this.taxRulesList();
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })

    }
    
  }

  Edittaxdetails(item){
    console.log("adhsfah",item)
    this.icon1=true;
    this.sidemenu =true;
    this.user=item;

  }
  /*****************************************************
  @purpose :Delete item from list
  @parameters : 
  @return :
  *****************************************************/
  Deletetaxrulesdetails(i){
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
        this.commonService.callApi('api/clients/taxrules/'+i.id,'','delete').then(success => { 
          this.taxRulesList();

          if (success) {
          
          } else {
            // this.popToast('error', success.message)
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
    }else{
      this.icon1=false;
      this.sidemenu =false;
       this.user={};
    }
  }
  recordSelected(event){
    $('#taxname :input').blur();
 $('#product :input').blur();
 
    
  }
}
