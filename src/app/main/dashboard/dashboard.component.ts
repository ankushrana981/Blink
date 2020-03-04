import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true };

  public toggle: boolean = false;
  selected = 'option1';
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Restaurants' },
    { value: 'pizza-1', viewValue: 'Branchs' }

  ];
  modalRef: BsModalRef;
  modalRef1: BsModalRef;
  public chart1 = {
    height: 280,
    type: 'area',
    zoom: {
      enabled: false
    }
  }
  public stroke1: {
    curve: 'smooth'
  }
  public series1 = [{
    name: 'Dataset',
    data: [400, 600, 1125, 1000]
  }]
  public xaxis1: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  }
  public tooltip1 = {
    x: {
      format: 'dd/MM/yy HH:mm'
    }
  }


  constructor(private modalService: BsModalService) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm solutionModal' });
  }
  openModal1(template1: TemplateRef<any>) {
    this.modalRef1 = this.modalService.show(template1, { class: 'modal-sm newMemo-Modal' });
  }
  openModalDelete(template2: TemplateRef<any>) {
    this.modalRef.hide();
    this.modalRef1 = this.modalService.show(template2, { class: 'modal-sm newMemo-Modal' });
  }

  ngOnInit() {
  }
  // Icons show 
  iconsshow() {
    if (this.toggle == false) {
      this.toggle = true;
    } else {
      this.toggle = false;
    }



  }

  bsInlineValue = new Date();

}
