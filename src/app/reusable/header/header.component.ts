import { Component, OnInit,Injector } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent extends BaseComponent implements OnInit {

  constructor(inj:Injector) {
    super(inj)
   }

  ngOnInit() {
  }
  closeSidebar(){
    if(this.router.url.indexOf('/main/dashboard/accounting')== 0){
      
    }else{
      this.router.navigate(['/main/dashboard']);
      this.broadcaster.broadcast('close',true);
    }
   
  }
}
