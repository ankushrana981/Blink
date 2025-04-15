import { Component, OnInit } from '@angular/core';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

@Component({
  selector: 'app-receiving-cost',
  standalone:false,
  templateUrl: './receiving-cost.component.html',
  styles: []
})
export class ReceivingCostComponent implements OnInit {
  icon1: boolean = false;
  icon2: boolean = false;
  icon3: boolean = false;

  input: string = "";

  constructor() { }

  ngOnInit() {
  }
  changeIc(type) {
    console.log(type, "type ")
    if (type == 'dots') {
      this.icon1 = true;
    } else {
      this.icon1 = false;
      this.icon2 = false;
      this.icon3 = false;
    }
  }

}
