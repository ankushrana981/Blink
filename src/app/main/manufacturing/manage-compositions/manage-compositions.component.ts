import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  HostListener,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-manage-compositions',
  standalone: false,
  templateUrl: './manage-compositions.component.html',
  styles: [],
})
export class ManageCompositionsComponent implements OnInit, AfterViewInit {
  @ViewChild('itemList', { read: ElementRef }) itemList!: ElementRef;
  @ViewChild('alphabetList', { read: ElementRef }) alphabetList!: ElementRef;
  profileShow: boolean = false;
  sublistShow: boolean = false;
  weightShow: boolean = false;
  variableShow: boolean = false;
  public selectedFirst: boolean = false;
  public selectedSecond: boolean = false;
  public selectedthird: boolean = false;
  selectedValue: any;
  yourForm: FormGroup;
  items: Array<any> = [
    { name: 'Grape' },
    { name: 'Lemon' },
    { name: 'Strawberry' },
    { name: 'Salt' },
    { name: 'Sugar' },
    { name: 'Vegemite' },
    { name: 'Grape1' },
    { name: 'Lemon1' },
    { name: 'Strawberry1' },
    { name: 'Salt1' },
    { name: 'Sugar1' },
    { name: 'Vegemite1' },
    { name: 'Grape2' },
    { name: 'Lemon2' },
    { name: 'Strawberry2' },
    { name: 'Salt2' },
    { name: 'Sugar2' },
    { name: 'Vegemite2' },
  ];
  // selectedItem(event: any) {
  //   this.selectedValue = event.name;
  //   console.log('clicked')
  //   this.isSelected('second');
  // }

  // testing code start

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  activeLetter: string | null = null;
  availableLetters: Set<string> = new Set();
  filteredItems: Array<any> = [];
  searchQuery: string = '';

  // testing code end

  selectedProductItem: Array<any> = [{ name: 'Sugar' }];

  icon1: boolean = false;
  // private mScrollbarService: MalihuScrollbarService;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
    // Sort items alphabetically
    this.items.sort((a, b) => a.name.localeCompare(b.name));
    this.filteredItems = [...this.items];
    // Store unique initials present in items
    this.availableLetters = new Set(
      this.items.map((item) => item.name.charAt(0).toUpperCase())
    );
  }

  // testing
  ngAfterViewInit() {
    // Ensure ViewChild is initialized
  }
  filterByLetter(letter: string) {
    if (!this.availableLetters.has(letter)) return;

    this.activeLetter = letter;

    // Find the first item that starts with the selected letter
    const targetItem = this.items.find((item) => item.name.startsWith(letter));
    if (targetItem) {
      const targetElement = document.getElementById(targetItem.name);
      if (targetElement && this.itemList) {
        // Align the target element to the top of the container
        const listContainer = this.itemList.nativeElement;
        listContainer.scrollTo({
          top: targetElement.offsetTop - listContainer.offsetTop, // Align to top
          behavior: 'smooth',
        });
      }
    }

    // Scroll the alphabet list to keep the selected letter in view
    const letterElement = document.getElementById(`letter-${letter}`);
    if (letterElement && this.alphabetList) {
      this.alphabetList.nativeElement.scrollTo({
        top: letterElement.offsetTop - 20,
        behavior: 'smooth',
      });
    }
  }

  searchItems() {
    if (this.searchQuery.trim() === '') {
      this.filteredItems = [...this.items];
      return;
    } else {
      this.filteredItems = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (this.filteredItems.length > 0) {
      const firstMatch = this.filteredItems[0];
      const targetElement = document.getElementById(firstMatch.name);
      if (targetElement && this.itemList) {
        const listContainer = this.itemList.nativeElement;
        listContainer.scrollTo({
          top: targetElement.offsetTop - listContainer.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }

  selectedItem(event: any) {
    this.activeLetter = event.name.charAt(0).toUpperCase();
    this.selectedValue = event.name;
    console.log('clicked');
    this.isSelected('second');
  }

  // testing end

  addProductModal(addProduct: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addProduct, {
      class: 'modal-lg task-modal modal-dialog-centered',
    });
  }
  isSelected(step) {
    if (step == 'first') {
      this.selectedFirst = !this.selectedFirst;
      this.selectedSecond = false;
    } else if (step == 'second') {
      this.selectedSecond = !this.selectedSecond;
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
    },
  ];

  ngOnInit() {
    this.yourForm = new FormGroup({
      product_type: new FormControl(null),
      focus: new FormControl(''),
      task_type: new FormControl(''),
    });
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
    setTimeout(() => {
      $('.alpha-search-input input').removeAttr('autofocus');
      $('.alpha-search-input input').focus;
    }, 500);
  }
  change() {
    var a = $('.alpha-search-input input').val();

    if (a.toString().length > 0) {
      $('.alpha-search-input input').addClass('input-from');
    } else {
      $('.alpha-search-input input').removeClass('input-from');
    }
  }

  // selectedItem(event: any) {
  //   console.log(event);
  //   this.isSelected('second')
  // }
}
