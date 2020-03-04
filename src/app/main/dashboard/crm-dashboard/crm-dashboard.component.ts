import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-dashboard',
  templateUrl: './crm-dashboard.component.html',
  styles: []
})
export class CrmDashboardComponent implements OnInit {

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true };

  constructor() { }

  ngOnInit() {
  }

}
