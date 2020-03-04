import { Component, OnInit, Injector,ElementRef,ViewChild } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent extends BaseComponent implements OnInit {
  
  public user: any = {};
  color = 'warn';
  mode = 'determinate';
  isLoaded: boolean=false;
  percent:number=0;

  optionsA = {
    percent: 100,
    radius: 75,
    space: -2,
    outerStrokeWidth: 2,
    outerStrokeColor: "#37c3e1",
    innerStrokeColor: "#e7e8ea",
    innerStrokeWidth: 2,
    startFromZero: false,
    imageSrc:"assets/images/logo-blink.svg",
    showSubtitle:"false",
    animation: true,
    animationDuration: 1700,
    showBackground:"false",
    showInnerStroke:"false",
    imageHeight: 100,
    imageWidth : 100,
    showImage : true
  };
 

  constructor(inj: Injector) {
    super(inj)
  }

  ngOnInit() {  
    
  }

  
  onLogin(form, user) {
    if (form.valid) {
      const params = new HttpParams({
        fromObject: {
          grant_type: "password",
          username: user.email,
          password: user.password,
          client_id: 'BLINKWEB'
        }
      });

      this.commonService.callApi('token', params, 'post',true, false, false).then(success => {

        if (success) {
          let tempToken;
          tempToken = "Bearer " + success.access_token;
          this.setToken('accessToken', tempToken);
          this.setToken('expires_in', success.expires_in);
          this.setToken('refresh_token', success.refresh_token);
          this.router.navigate(["/main/dashboard"]);
          // this.popToast('success', 'Login Successful')
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })
    } else {
      this.popToast('error', 'The username or password is incorrect.')
    }
  }



}
