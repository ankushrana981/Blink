import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-composition',
  standalone:false,
  templateUrl: './composition.component.html',
  styles: []
})
export class CompositionComponent implements OnInit {
  progressinfo: boolean = false;
    revertinfo: boolean = false;
    deleteinfo: boolean = false;
    dropdown: boolean = false;
  icon1: boolean = false;
  icon2: boolean = false;
  icon3: boolean = false;
  // private mScrollbarService: MalihuScrollbarService;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }
  addProductModal(addProduct: TemplateRef<any>) {

    this.modalRef = this.modalService.show(addProduct, { class: 'modal-lg task-modal modal-dialog-centered' });
  }

  dropdownClick() {
    this.dropdown = !this.dropdown;
    // console.log('click');
    // if (id == 1) {
    //     this.dropdownActive1 = !this.dropdownActive1;
    // } else if (id == 2) {
    //     this.dropdownActive2 = !this.dropdownActive2;
    // } else if (id == 3) {
    //     this.dropdownActive3 = !this.dropdownActive3;
    // }
} 
dropdownClose() {
    this.dropdown = false;
    // if (id == 1) {
    //     this.dropdownActive1 = false;
    // } else if (id == 2) {
    //     this.dropdownActive2 = false;
    // } else if (id == 3) {
    //     this.dropdownActive3 = false;
    // }
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
  changeIc2(type,icon) {
    if (type == 'dots' && icon == 'icon1') {
      this.icon1 = true;
      this.icon2 = false;
      this.icon3 = false;
    } else if (type == 'dots' && icon == 'icon2') {
      this.icon1 = false;
      this.icon2 = true;
      this.icon3 = false;
    }else {
      this.icon1 = false;
      this.icon2 = false;
      this.icon3 = true;
    }
  }
  progressClick() {
    this.progressinfo = !this.progressinfo
  }
  progressClose() {
      this.progressinfo = false
  }

  revertClick() {
      this.revertinfo = !this.revertinfo
  }
  revertClose() {
      this.revertinfo = false
  }
  deleteClick() {
      this.deleteinfo = !this.deleteinfo
  }
  deleteClose() {
      this.deleteinfo = false
  }
}
