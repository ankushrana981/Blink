import { Component, OnInit } from '@angular/core';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-finance-expenses',
  standalone: false,
  templateUrl: './finance-expenses.component.html',
  styles: []
})
export class FinanceExpensesComponent implements OnInit {
  selected = 'option1';

  constructor() { }

  ngOnInit() {
  }

}
