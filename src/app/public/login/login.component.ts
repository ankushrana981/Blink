import { HttpParams } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { BaseComponent } from '../../common/commonComponent';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {
  public user: any = {};
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, inj: Injector) {
    super(inj);
  }
  ngOnInit() {  
    this.loginForm = this.fb.group({
      email: ['Jigar@task.com', [Validators.required, Validators.email]],
      password: ['jigarjigar', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const params = new HttpParams({
        fromObject: {
          grant_type: 'password',
          username: email,
          password: password,
          client_id: 'BLINKWEB',
        },
      });

      this.commonService
        .callApi('token', params, 'post', true, false, false)
        .then((success: any) => {
          if (success) {
            const tempToken = 'Bearer ' + success.access_token;
            this.setToken('accessToken', tempToken);
            this.setToken('expires_in', success.expires_in);
            this.setToken('refresh_token', success.refresh_token);
            this.router.navigate(['/main/dashboard']);
            this.popToast('success', 'Login Successful');
          } else {
            this.popToast('error', success.message);
          }
        })
        .catch((e: any) => {
          console.log('there is an error:', e);
        });
    } else {
      this.popToast('error', 'The username or password is incorrect.');
    }
  }
}
