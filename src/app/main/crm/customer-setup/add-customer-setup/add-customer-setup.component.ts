import { Component, OnInit,Injector } from '@angular/core';
import { BaseComponent } from '../../../../common/commonComponent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-customer-setup',
  templateUrl: './add-customer-setup.component.html',
  styles: []
})
export class AddCustomerSetupComponent extends BaseComponent implements OnInit {
  public countryrecords:any = [];
  public salesrecords:any = [];
  public arearecords:any = [];
  public regionrecords:any = [];
  public establishmenttyperecords:any = [];
  public user:any = {};
  public config : any = {stepOne : true, stepTwo : false, stepThree : false, stepFour : false};
  public broadCasterEvent : any;
  public customerData : any = {};
  public setuserid:any;
  public isNew : Boolean = true;
  public searcharea :any;
  


  constructor(inj:Injector, public route: ActivatedRoute) { 
    super(inj)
  }
  public titledata:any;
  ngOnInit() {
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
    this.getCountries();
    this.getSalesrepresentative();
    this.searchArea();
    this.region();
    this.establishmenttype();
    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        if(params.id){
          this.isNew = false;

          this.setData(params);
        }
        else{
          this.isNew = true;

        }
      })
    }
  }
   /*****************************************************
  @purpose : For getting the countries for dropdown
  @parameters : 
  @return :
  *****************************************************/

  getCountries(){

    this.commonService.callApi('api/countries','','get').then(success => {

      if (success) {
        this.countryrecords=success;
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
 
  /*****************************************************
  @purpose : For Salesrepresentative dropdown 
  @parameters : 
  @return :
  *****************************************************/
  getSalesrepresentative(){

    this.commonService.callApi('api/tenants/users','','get').then(success => {

      if (success) {
        this.salesrecords=success.records;

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }

  /*****************************************************
  @purpose : For Searcharea dropdown 
  @parameters : 
  @return :
  *****************************************************/
  searchArea(){

    this.commonService.callApi('api/clients/areas/lookup','','get').then(success => {

      if (success) {
        this.searcharea=success;

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }
  /*****************************************************
  @purpose :For region dropdown  
  @parameters : 
  @return :
  *****************************************************/


  region(){

    this.commonService.callApi('api/tenants/branches/lookup','','get').then(success => {

      if (success) {
        this.regionrecords=success;

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

  }

  /*****************************************************
  @purpose :establishmenttype   
  @parameters : 
  @return :
  *****************************************************/
  establishmenttype(){

    this.commonService.callApi('api/clients/establishmenttypes/lookup','','get').then(success => {

      if (success) {
        this.establishmenttype=success;
     
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
    // http://34.213.86.163/20180506/api/clients?
   
  }


  /*****************************************************
  @purpose :for Toggle the side   
  @parameters : 
  @return :
  *****************************************************/
  toggle(step){
    if(step == 'stepOne' && (!this.config.stepTwo && !this.config.stepThree && !this.config.stepFour )){
      this.config.stepOne = true;
    } else if(step == 'stepFour' && (!this.config.stepTwo && !this.config.stepThree && !this.config.stepOne)){
      this.config.stepFour = true;
    } else{
      Object.keys(this.config).forEach( e =>{
        if(e == step){
          this.config[step] = !this.config[step];
        } else{
          this.config[e] = false;
        }
      })
    }
    
  }
  
 
  /*****************************************************
  @purpose : CREATE NEW Customer
  @parameters : 
  @return :
  *****************************************************/
 createCustomer(user){
    // console.log("user",user)  
    this.user['businessPartnerType']=1;
    this.user['discount']=0;
    this.user['clientType']=1;
    this.commonService.callApi('api/clients',this.user,'post').then(success => {
    if (success) {
    this.router.navigate(['/main/crm/customersetup']);
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

   
  }

  /*****************************************************
  @purpose : Update the old custmoner
  @parameters : 
  @return :
  *****************************************************/

 updateCustomer(user){

    this.user['businessPartnerType']=1;
    this.user['discount']=0;
   
    this.commonService.callApi('api/clients/'+this.setuserid, user,'put').then(success => {

      if (success) {
    this.router.navigate(['/main/crm/customersetup']); 
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })

   
  }

  recordSelected(event){
 
    $('#supplierName :input').blur();
    
    $('#RepresentativeName :input').blur();
    $('#areaName :input').blur();
    $('#regionName :input').blur();
    $('#typeName :input').blur();

  }

  ngOnDestroy(){

  }

  /*****************************************************
  @purpose : for gettinng existing customer data
  @parameters : 
  @return :
  *****************************************************/
  setData(data){
 
    this.setuserid =data.id;
  this.commonService.callApi('api/clients/'+this.setuserid,'','get').then(success => {
    if (success) {
      // console.log("success",success)
     this.user=success; 
     this.user.contactPerson=success.contactPerson.title;   
    } else {
      this.popToast('error', success.message)
    }
  }).catch((e) => {
    console.log("there is an error:", e)
  })
}
}
