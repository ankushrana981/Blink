import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartOptions } from './accounting/accounting.component';

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  public toggle: boolean = false;
  selected = 'option1';
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Restaurants' },
    { value: 'pizza-1', viewValue: 'Branchs' }

  ];
  modalRef!: BsModalRef;
  modalRef1!: BsModalRef;

@ViewChild("chartObj") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private modalService: BsModalService) {
    this.chartOptions = {
      series: [{
        name: 'Dataset',
        data: [400, 600, 1125, 1000]
      }],
      chart:{
        height: 280,
        type: 'area',
        zoom: {
          enabled: false
        }
      },
      xaxis:{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      stroke: {
        curve: 'smooth'
      }
    }
   }
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
