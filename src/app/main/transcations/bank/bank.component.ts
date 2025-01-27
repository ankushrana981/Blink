import { Component, OnInit,TemplateRef,ElementRef } from '@angular/core';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-bank',
  standalone:false,
  templateUrl: './bank.component.html',
  styles: []
})
export class BankComponent implements OnInit {

  icon1: boolean = false;
  icon2: boolean = false;
  icon3: boolean = false;
  reconciled: boolean = false;
  unassigned: boolean = false;
  rightopen1: number = 1;
  rightopen2: number = 1;
  rightopen3: number = 1;
  rightopen4: number = 1;
  rightopen5: number = 1;
  // open1: any;
  // open2: any;
  // open3: any;
  // open4: any;
  // open5: any;
  // open6: any;
  // open7: any;

  open1: number = 1;
  open2: number = 1;
  open3: number = 1;
  open4: number = 1;
  open5: number = 1;
  open6: number = 1;
  open7: number = 1;
  

  modalRef: BsModalRef;
    constructor(private modalService: BsModalService) { }
    addProductModal(transcationspopup: TemplateRef<any>) {
        
        this.modalRef = this.modalService.show(transcationspopup, { class: 'modal-xl task-modal modal-dialog-centered transcations-popup' });
      }

  ngOnInit() {
    // this.open1 = this.tasks[0];
    // this.open2 = this.tasks[0];
    // this.open3 = this.tasks[0];
    // this.open4 = this.tasks[0];
    // this.open5 = this.tasks[0];
    // this.open6 = this.tasks[0];
    // this.open7 = this.tasks[0];
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
  tasks: any[] = [
    {
        id: 1,
        name: 'Select',
    },
    {
        id: 2,
        name: 'Contact',
    },
    {
        id: 3,
        name: 'Company',
    },
    {
        id: 4,
        name: 'Product',
    },
    {
        id: 5,
        name: 'General Task',
    }
];
  chnageTypeValue(){

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

}
