import { Component, OnInit, TemplateRef, ElementRef,HostListener } from '@angular/core';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-manage-compositions',
  standalone:false,
  templateUrl: './manage-compositions.component.html',
  styles: []
})
export class ManageCompositionsComponent implements OnInit {
  profileShow: boolean = false;
  sublistShow: boolean = false;
  weightShow: boolean = false;
  variableShow: boolean = false;
  public selectedFirst: boolean = false;
  public selectedSecond: boolean = false;
  public selectedthird: boolean = false;
  selectedValue: any;

  items: Array<any> = [
    { name: "Grape" },
    { name: "Lemon" },
    { name: "Strawberry" },
    { name: "Salt" },
    { name: "Sugar" },
    { name: "Vegemite" },
    { name: "Grape1" },
    { name: "Lemon1" },
    { name: "Strawberry1" },
    { name: "Salt1" },
    { name: "Sugar1" },
    { name: "Vegemite1" },
    { name: "Grape2" },
    { name: "Lemon2" },
    { name: "Strawberry2" },
    { name: "Salt2" },
    { name: "Sugar2" },
    { name: "Vegemite2" },
    
  ];
  selectedItem(event: any) {
    this.selectedValue = event.name;
    this.isSelected('second')
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
    {
      id: 4,
      name: 'Product',
    },
    {
      id: 5,
      name: 'General Task',
    }
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
  chnageTypeValue() {
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

  // selectedItem(event: any) {
  //   console.log(event);
  //   this.isSelected('second')
  // }
}
