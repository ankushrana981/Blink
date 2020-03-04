import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from './common/commonComponent';
import { ToasterConfig} from 'angular2-toaster';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  title = 'customer-app';
  constructor(inj: Injector) {
    super(inj);
  }
  public list: any = {};
  public toasterconfig : ToasterConfig = 
  new ToasterConfig({
      showCloseButton: false, 
      tapToDismiss: true, 
      timeout:3000,
      limit : 1,
  });
  ngOnInit() {
    // this.commonService.callApi('', {}, 'get', false, true).then(response => {
    //   this.list = response.data[0];
    // })
  }
}
