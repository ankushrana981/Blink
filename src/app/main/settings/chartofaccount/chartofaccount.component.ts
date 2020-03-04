import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-chartofaccount',
  templateUrl: './chartofaccount.component.html',
  styles: []
})
export class ChartofaccountComponent implements OnInit {
 public selectedFirst : boolean =false;
 public selectedSecond : boolean =false;
 public selectedThird : boolean =false;
 public selectedFouth : boolean =false;
  constructor() { }

  ngOnInit() {
  }
  /*****************************************************
  @purpose :for hiding the steps   
  *****************************************************/
  isSelected(step){
    if(step == 'first'){
      this.selectedFirst = !this.selectedFirst;
      this.selectedSecond = false;
      this.selectedThird = false;
      this.selectedFouth =false;
    }else if (step == 'second'){
      this.selectedSecond = !this.selectedSecond
      this.selectedThird = false;
      this.selectedFouth =false;
    }else if (step == 'third'){
      this.selectedThird = !this.selectedThird ;
      this.selectedFouth =false;
    }else if(step == 'fourth'){
      this.selectedThird =false;
      console.log("callingm")
      this.selectedFouth = !this.selectedFouth
    }
   
  }
}
