import { Component, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
  selector: '[app-apply-credit]',
  standalone:false,
  templateUrl: './apply-credit.component.html',
  styles: []
})
export class ApplyCreditComponent implements OnInit {

  @Output() closeClick = new EventEmitter();

  closeTask() {
    this.closeClick.emit("close"); // Pass any payload as argument
  }
  constructor() { }

  ngOnInit() {
  }
  tasks: any[] = [
    {
      id: 1,
      name: 'Select',
    },
    {
      id: 2,
      name: 'Other Customers',
    },
    {
      id: 3,
      name: 'Administration Expense Account',
    },
    {
      id: 4,
      name: 'Boca Branch Account',
    },
    {
      id: 5,
      name: 'Company Main Account',
    }
  ];

}
