import { Component, OnInit } from '@angular/core';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-invoice-approvals',
  templateUrl: './invoice-approvals.component.html',
  styles: []
})
export class InvoiceApprovalsComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true };
  selected = 'option1';

  constructor() { }

  ngOnInit() {
  }

}
