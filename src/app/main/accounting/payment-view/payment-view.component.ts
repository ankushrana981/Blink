import { Component, OnInit,Injector } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';

@Component({
  selector: 'app-payment-view',
  standalone:false,
  templateUrl: './payment-view.component.html',
  styles: []
})
export class PaymentViewComponent extends BaseComponent implements OnInit {

  constructor( inj:Injector) {
      super(inj)
      this.router.navigate(['/main/invoicing/view'])
   }

  ngOnInit() {
  }

}
