import { Component, OnInit,Injector } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';


@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent extends BaseComponent implements OnInit {
  isDropdownOpen = false;
  currentUser = { firstname: 'India' };
  constructor(inj:Injector) {
    super(inj)
   }

  ngOnInit() {
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeSidebar(){
    if(this.router.url.indexOf('/main/dashboard/accounting')== 0){
      
    }else{
      this.router.navigate(['/main/dashboard']);
      this.broadcaster.broadcast('close',true);
    }
   
  }
 
}
