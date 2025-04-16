import { Component, OnInit, TemplateRef, ElementRef,HostListener } from '@angular/core';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-modifier',
  standalone:false,
  templateUrl: './product-modifier.component.html',
  styles: []
})
export class ProductModifierComponent implements OnInit {
  open1: number = 1;
  open2: number = 1;
  open3: number = 1;
  variableShow: boolean = false;
  prodcutdrop: boolean = false;
  public selectedFirst: boolean = false;
  public selectedSecond: boolean = false;
  public selectedthird: boolean = false;
  selectedValue: any;
  openDiv: string = '';
  activeTab!:any;

  items: Array<any> = [
    { name: "Size" },
    { name: "More Onions" },
    { name: "Extra Cheese" },
    { name: "extra cheese" },
    { name: "More Spicy" },
    { name: "More Spicy" },
    
  ];
  selectedItem(event: any) {
    this.selectedValue = event.name;
    // this.isSelected('second')
    if(this.selectedValue == "Size"){
      this.prodcutdrop = !this.prodcutdrop;
    }
    else{
      this.selectedSecond = !this.selectedSecond;
    }
  }

  selectedProductItem: Array<any> = [
    { name: "Sugar" }
  ];

  icon1: boolean = false;
  // private mScrollbarService: MalihuScrollbarService;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }
  addProductModal(addProduct: TemplateRef<any>) {

    this.modalRef = this.modalService.show(addProduct, { class: 'modal-lg task-modal modal-dialog-centered' });
  }
  isSelected(step) {
    if (step == 'first') {
      this.selectedFirst = !this.selectedFirst;
      this.selectedSecond = false;
    } else if (step == 'second') {
      this.selectedSecond = !this.selectedSecond
    }
    
  }
  tasks: any[] = [
    {
      id: 1,
      name: 'Strawberry Lemonade',
    },
    {
      id: 2,
      name: 'Contact',
    },
    {
      id: 3,
      name: 'Company',
    },
  ];
  effect: any[] = [
    {
      id: 1,
      name: 'Add',
    },
    {
      id: 2,
      name: 'Replace',
    },
  ];
  material: any[] = [
    {
      id: 1,
      name: 'Blueberry Cream',
    },
    {
      id: 2,
      name: 'Contact',
    },
    {
      id: 3,
      name: 'Company',
    },
  ];

  ngOnInit() {
  }
  changeIc(type) {
    if (type == 'dots') {
      this.icon1 = true;
    } else {
      this.icon1 = false;
    }
  }
  chnageTypeValue(event:any) {
    this.selectedFirst = true;
    setTimeout( () => {
      $('.alpha-search-input input').removeAttr('autofocus')
      $('.alpha-search-input input').focus
    }, 500); 
  }

  change(){
    var a =  $('.alpha-search-input input').val();
    
    if(a.toString().length > 0){
      $('.alpha-search-input input').addClass('input-from')
    }else{
      $('.alpha-search-input input').removeClass('input-from')
    }
  }
  chnageToValue($event){
    this.openDiv = $event.name;
  }

  // selectedItem(event: any) {
  //   console.log(event);
  //   this.isSelected('second')
  // }
}
