import { Component, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
  selector: '[app-adjust-amount]',
  standalone:false,
  templateUrl: './adjust-amount.component.html',
  styles: []
})
export class AdjustAmountComponent implements OnInit {

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
      name: 'Ace Hardware San Diego',
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
