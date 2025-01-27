import { Component, OnInit,TemplateRef,ElementRef } from '@angular/core';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-discount',
  standalone:false,
  templateUrl: './discount.component.html',
  styles: []
})
export class DiscountComponent implements OnInit {
  icon1: boolean = false;
  icon2: boolean = false;
  icon3: boolean = false;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }
  addDiscountModal(discountsetting: TemplateRef<any>) {
      
      this.modalRef = this.modalService.show(discountsetting, { class: 'modal-xl task-modal modal-dialog-centered discount-popup' });
    }

  ngOnInit() {
  }
  changeIc(type) {
    if (type == 'dots') {
      this.icon1 = true;
    } else {
      this.icon1 = false;
      this.icon2 = false;
      this.icon3 = false;
    }
  }
  

}
