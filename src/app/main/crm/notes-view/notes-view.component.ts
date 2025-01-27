import { Component, OnInit,TemplateRef,ElementRef } from '@angular/core';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-notes-view',
  standalone:false,
  templateUrl: './notes-view.component.html',
  styles: []
})
export class NotesViewComponent implements OnInit {
  icon1: boolean = false;
  icon2: boolean = false;
  icon3: boolean = false;
  modalRef!: BsModalRef;
  constructor(private modalService: BsModalService) { }
  addQuickModal(quickcustomer: TemplateRef<any>) {
      
      this.modalRef = this.modalService.show(quickcustomer, { class: 'modal-xl task-modal modal-dialog-centered quick-popup' });
    }

  ngOnInit() {
  }
  changeIc(type:any) {
    if (type == 'dots') {
      this.icon1 = true;
    } else {
      this.icon1 = false;
      this.icon2 = false;
      this.icon3 = false;
    }
  }

}
