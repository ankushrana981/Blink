import { Component, Output, EventEmitter, OnInit ,TemplateRef,ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: '[app-transcations-popup]',
  standalone:false,
  templateUrl: './transcations-popup.component.html',
  styles: []
})
export class TranscationsPopupComponent implements OnInit {
  setp1: boolean = true;
  setp2: boolean = false;
  setp3: boolean = false;
  assignto: boolean = false;
  ledger: boolean = false;
  more: boolean = false;
  open1: number = 1;
  open2: number = 1;
  open3: number = 1;
  open4: number = 1;
  open5: number = 1;
  open6: number = 1;
  open7: number = 1;
  creditactive: boolean = false;
  adjustactive: boolean = false;
  balanceactive: boolean = false;
  debit: boolean = false;
  deposite: boolean = false;



  @Output() closeClick = new EventEmitter();

  closeTask() {
    this.closeClick.emit("close"); // Pass any payload as argument
  }
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }
  addCreditModal(credit: TemplateRef<any>) {
    this.modalRef = this.modalService.show(credit, { class: 'modal-md task-modal modal-dialog-centered apply-credit ' });
  }
  addAdjustModal(adjust: TemplateRef<any>) {
    this.modalRef = this.modalService.show(adjust, { class: 'modal-md task-modal modal-dialog-centered apply-credit apply-adjust' });
  }
  addBalanceModal(balance: TemplateRef<any>) {
    this.modalRef = this.modalService.show(balance, { class: 'modal-md task-modal modal-dialog-centered apply-credit apply-balance' });
  }
scroll(el: HTMLElement) {
  setTimeout(() => {
      el.scrollIntoView({behavior: 'smooth', block: 'center'});
  }, 200);
}
  ngOnInit() {
  }
  setpOne() {
    this.setp1 = true;
    this.setp2 = false;
    this.setp3 = false;
  }
  setpTwo() {
    this.setp1 = false;
    this.setp2 = true;
    this.setp3 = false;
  }
  setpThree() {
    this.setp1 = false;
    this.setp2 = false;
    this.setp3 = true;
  }
  chnageTypeValue(event:any){

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
  currentDate = new Date();
 
  form = new FormGroup({
    dateYMD: new FormControl(new Date()),
    dateFull: new FormControl(new Date()),
    dateMDY: new FormControl(new Date()),
    dateRange: new FormControl([
      new Date(),
      new Date(this.currentDate.setDate(this.currentDate.getDate() + 7))
    ])
  });

}
