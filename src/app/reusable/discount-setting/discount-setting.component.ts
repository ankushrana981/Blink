import { Component, Output, EventEmitter, OnInit ,TemplateRef,ElementRef} from '@angular/core';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: '[app-discount-setting]',
  standalone:false,
  templateUrl: './discount-setting.component.html',
  styles: []
})
export class DiscountSettingComponent implements OnInit {
  setp1: boolean = true;
  setp2: boolean = false;
  setp3: boolean = false;
  setp4: boolean = false;      
  ledger: boolean = false; 
  @Output() closeClick = new EventEmitter();

  closeTask() {
    this.closeClick.emit("close"); // Pass any payload as argument
  }
  constructor() { }
  
  ngOnInit() {
  }
  setpOne() {
    this.setp1 = true;
    this.setp2 = false;
    this.setp3 = false;
    this.setp4 = false;
  }
  setpTwo() {
    this.setp1 = false;
    this.setp2 = true;
    this.setp3 = false;
    this.setp4 = false;
  }
  setpThree() {
    this.setp1 = false;
    this.setp2 = false;
    this.setp3 = true;
    this.setp4 = false;
  }
  setpFour() {
    this.setp1 = false;
    this.setp2 = false;
    this.setp3 = false;
    this.setp4 = true;
  }
  tasks: any[] = [
    {
        id: 1,
        name: 'Customer',
    },
    {
        id: 2,
        name: 'Contact',
    },
    {
        id: 3,
        name: 'Company',
    },
    {
        id: 4,
        name: 'Product',
    },
    {
        id: 5,
        name: 'General Task',
    }
];
  attachments: any[] = [
    {
        id: 1,
        name: 'Strawberry Lemonade',
    },
    {
        id: 2,
        name: 'Blueberry Cream',
    },
    {
        id: 3,
        name: 'Chocolate Bourbon',
    },
    {
        id: 4,
        name: 'Lemongrass Lemon',
    }
  ];
  clickStar(value: any){
    var liValues = $('.level-list li');
    liValues.each(function(index){
      var t = $(this);
      if(value <= index+1){
        t.addClass('active');
      }else{
        t.removeClass('active')
      }
    });
  }
  chnageTypeValue(){

  }
}
