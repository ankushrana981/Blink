import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-settings',
  standalone:false,
  templateUrl: './company-settings.component.html',
  styles: []
})
export class CompanySettingsComponent implements OnInit {
  public config: any = { stepOne: true, stepTwo: false, stepThree: false, stepFour: false };

  constructor() { }

  ngOnInit() {
   
   setTimeout(()=>{
    document.getElementById('stepOne')?.addEventListener('mouseenter', () => {
      this.toggle('stepOne')
    })
    document.getElementById('stepTwo')?.addEventListener('mouseenter', () => {
      this.toggle('stepTwo')
    })
    document.getElementById('stepThree')?.addEventListener('mouseenter', () => {
      this.toggle('stepThree')
    })
    document.getElementById('stepFour')?.addEventListener('mouseenter', () => {
      this.toggle('stepFour')
    })
   },100)
     

  }

  /*****************************************************
  @purpose :for Toggle the side   
  @parameters : 
  @return :
  *****************************************************/
  toggle(step:any) {
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
}
