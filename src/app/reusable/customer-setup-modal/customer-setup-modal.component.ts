
import { Component, OnInit,Injector } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';

@Component({
  selector: 'app-customer-setup-modal',
  standalone:false,
  templateUrl: './customer-setup-modal.component.html',
  styles: []
})
export class CustomerSetupModalComponent extends BaseComponent implements OnInit {
  public countryrecords:any = [];

  public config : any = {stepOne : true, stepTwo : false, stepThree : false, stepFour : false};
  public broadCasterEvent : any;
  public customerData : any = {};

  constructor(inj:Injector) { 
    super(inj)
  }

  ngOnInit() {
    this.getCountries();
    this.broadCasterEvent = this.broadcaster.on('editCustomerSetup').subscribe((success: any) => {
      console.log(success);
      this.customerData =  success;
    });
  }
  // For country dropdown 

  getCountries(){

    this.commonService.callApi('api/countries','','get').then(success => {

      if (success) {
        this.countryrecords=success;
        console.log("asidhjfiah",this.countryrecords)
     
      
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
  toggle(step:any){
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
    // this.config[step] = !this.config[step];
    // Object.keys(this.config).forEach( e =>{
    //   console.log(e);
    //   if(e !== step){
    //     this.config[e] = false;
    //   }
    // })
    // console.log("config",this.config)
  }

  ngOnDestroy(){
    if(this.broadCasterEvent){
      this.broadCasterEvent.unsubscribe();
    }
  }
}

