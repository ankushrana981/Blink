import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { isPlatformBrowser } from '@angular/common';
import { map, retry } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  authorised: any = false;
  constructor(
    private toastrService: ToastrService,
    injector: Injector,
    public _http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
    this._apiUrl = this.config.apiUrl;
    this.router = injector.get(Router);
  }
  public router: Router;
  public config = <any>environment;
  public _apiUrl = '';
  public platformId: any;

  public getToken(key: any) {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.getItem(key);
    }
    return null;
  }
  public setToken(key: any, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem(key, value);
    }
  }

  callApi(
    url: string,
    data: any,
    method: 'post' | 'get' | 'put' | 'delete' | 'patch',
    isPublic?: boolean,
    isForm?: boolean,
    pagination?: any,
    html?: boolean,
    formData?: boolean
  ): Promise<any> {
    let headersConfig: Record<string, string> = {};

    if (isPublic) {
      const token = this.getToken('accessToken');
      if (token) {
        headersConfig['Authorization'] = token;
      }
      // headersConfig['content-Type'] = 'application/json';
    } else if (html) {
      headersConfig['content-Type'] = 'text/html';
    } else if (formData) {
      headersConfig['content-Type'] = 'multipart/form-data';
    } else {
      headersConfig['content-Type'] = 'application/json';
    }

    if (!isPublic) {
      const token = this.getToken('accessToken');
      if (token) {
        headersConfig['Authorization'] = token;
      }
    }

    if (isForm) {
      delete headersConfig['content-Type'];
    }

    const headers = new HttpHeaders(headersConfig);

    return new Promise((resolve, reject) => {
      const fullUrl = this._apiUrl + url;

      const httpOptions = { headers, params: data };

      let request$;

      switch (method) {
        case 'post':
          request$ = this._http.post(fullUrl, data, { headers });
          break;
        case 'get':
          request$ = this._http.get(fullUrl, httpOptions);
          break;
        case 'put':
          request$ = this._http.put(fullUrl, data, { headers });
          break;
        case 'delete':
          request$ = this._http.delete(fullUrl, { headers });
          break;
        case 'patch':
          request$ = data ? this._http.patch(fullUrl, data, { headers }) : null;
          break;
        default:
          reject('Invalid HTTP method');
          return;
      }

      request$?.subscribe(
        (response) => resolve(response),
        (error) => {
          this.showServerError(error);
          reject(error);
        }
      );
    });
  }

  // popToast(type, title, body) {
  //   this.toasterService.pop(type, title, body);
  // }
  callApiObservable(url: any, data: any) {
    let headers = new HttpHeaders({
      'content-Type': 'application/json',
      Authorization: this.getToken('accessToken')!,
    });
    return this._http
      .get(this._apiUrl + url, { headers: headers, params: data })
      .pipe(
        map((rsp) => {
          return rsp;
        })
      );
  }
  logout() {
    console.log('skldhlah');
    var temp: any = {
      ss_id: '',
      ss_pass: '',
      remember: false,
    };
    if (this.getToken('ss_id') && this.getToken('ss_pass')) {
      temp.ss_id = this.getToken('ss_id');
      temp.ss_pass = this.getToken('ss_pass');
      temp.remember = true;
    }
    this.clearToken();
    console.log('temp', temp);
    if (temp.remember) {
      this.setToken('ss_id', temp.ss_id);
      this.setToken('ss_pass', temp.ss_pass);
    }
    this.router.navigate(['/public/login']);
  }
  clearToken() {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.clear();
      console.log('token clear');
    }
  }
  getCurrentUser = (force: boolean = false): any => {
    var me: any = this;
    return this.callApi('api/me', '', 'get').then((response: any) => {
      me.currentUser = response;
      return me.currentUser;
    });
  };
  getViewTasksList(queryParams: any) {
    var me: any = this;
    return this.callApi('api/clients/tasks?' + queryParams, '', 'get').then(
      (response: any) => {
        return response;
      }
    );
  }
  showServerError(e: any) {
    if (e.status == 400) {
      this.popToast('error', 'The username or password is incorrect.', '');
      this.logout();
    } else if (e.status == 403) {
      this.popToast('error', e.error, '');
    } else if (e.status == 401) {
      this.popToast('error', e.error.message, '');
      this.logout();
    }
  }

  popToast(type, title, body) {
    if (type == 'error') this.toastrService.error(title, body);
    else this.toastrService.success(title, body);
  }
}
