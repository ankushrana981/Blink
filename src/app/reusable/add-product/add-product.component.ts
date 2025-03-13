import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: '[app-add-product]',
  standalone: false,
  templateUrl: './add-product.component.html',
  styles: [],
})
export class AddProductComponent implements OnInit {
  setp1: boolean = true;
  setp2: boolean = false;
  setp3: boolean = false;
  assignto: boolean = false;

  @Output() closeClick = new EventEmitter();

  closeTask() {
    this.closeClick.emit('close'); // Pass any payload as argument
  }

  constructor() {}
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
    },
  ];
  people: any[] = [
    {
      id: 1,
      name: 'GroStore',
    },
    {
      id: 2,
      name: 'Wiresupply',
    },
    {
      id: 3,
      name: 'Bulk Market',
    },
    {
      id: 4,
      name: 'FoodsrUs',
    },
  ];
  Vendor: any[] = [
    {
      id: 1,
      name: 'GroStore',
    },
    {
      id: 2,
      name: 'Wiresupply',
    },
    {
      id: 3,
      name: 'Bulk Market',
    },
    {
      id: 4,
      name: 'FoodsrUs',
    },
  ];
  scroll(el: HTMLElement) {
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  }
  ngOnInit() {}
  setpOne() {
    this.setp1 = true;
    this.setp2 = false;
    this.setp3 = false;
  }
  setpTwo() {
    this.setp1 = false;
    this.setp2 = true;
    this.setp3 = false;
  }
  setpThree() {
    this.setp1 = false;
    this.setp2 = false;
    this.setp3 = true;
  }
  assigntoClick() {
    this.assignto = !this.assignto;
  }
  chnageTypeValue() {}
  
}
