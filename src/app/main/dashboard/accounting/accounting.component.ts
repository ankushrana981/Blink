import { Component, OnInit } from '@angular/core';

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styles: []
})
export class AccountingComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true };
  selected = 'option3';
  
  public chartx = {
    height: 190,
    type: 'bar',
    stacked: true,
    // stackType: '100%'
  };
  public legend1={
    show: false,
 
  }
  
  public xaxis1={
    
      categories: ['Feb', 'Mar', 'Apr', 'May', 'jun', 'Jul' ],
  
  }
//   public tooltip: {
//     pointFormat: '<span style="color:{series1.color}">{series1.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
//     shared: true
// }

  public series1=[{
    name: 'PRODUCT A',
    data: [44000, 12000,15000,32000,39000,18000]
    
},{
    name: 'PRODUCT B',
    data: [52000,29000,45000,59000,18000,36000]
   
}]

public res=[{
    breakpoint: 480,
    options: {
        legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
        }
    }
}]
// public clr={
  
//     colors: ['#181742','#615fad']
 
// }

  
  constructor() { }

  ngOnInit() {
  }

}
