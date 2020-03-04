import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({

  selector: 'app-report',
  templateUrl: './report.component.html',

  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        
      })),
      // transition('void <=> *', animate(400)),
      transition('void <=> *', animate('250ms ease-out', style({ transform: 'translateX(-5%)', opacity: 0 }))),
    ]),
  ],
  styles: []
})
export class ReportComponent extends BaseComponent implements OnInit {

  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true };
  public filterIReport: boolean = false;
  public dateDropDown: boolean = false;
  public customerDropDown: boolean = false;
  public categoryDropDown: boolean = false;
  public branchDropDown: boolean = false;
  public salesRepDropDown: boolean = false;
  public brandDropDown: boolean = false;
  public productDropDown: boolean = false;
  public filterData : Array<any> = [{title : 'Client', value : 'McDonalds' ,class : 'customanimate order-animate1' ,id : 'client'},{title : 'Date', value : 'April,2020',class : 'customanimate order-animate4' ,id : 'date'},{title : 'Product', value : 'Strawberry',class : 'customanimate order-animate7' ,id : 'product'},{title : 'Branch', value : 'Branch Title',class : 'customanimate order-animate10' ,id : 'branch'}]
  selected = 'option1';

  //In class
  public options4 = {
    chart: {
      height: 300,
      // width: '100%',
      type: 'area',
    },
    stroke: {
      curve: 'straight',
      dashArray: 0,
      width: 2
    },
    grid: {
      strokeDashArray: 3,
    },
    markers: {
      size: 5,
      colors: '#56CCF2'
    },
    yaxis: {
      min: 0,
      max: 1000,
      tickAmount: 4,
    },
    xaxis: {
      categories: ['',5,'', 10,'', 15, '', 20,'', 25, 30],
      axisTicks: {
        show: false
      }
    },
    series: [{
      data: [650, 810, 510, 490, 350, 780, 810, 650, 640, 760]
    }],
    colors: ['#56CCF2'],
    fill: {
      colors: ['#56CCF2'],
    },
    tooltip: {
      enabled: true
    }
  }
  constructor(inj: Injector) { super(inj) }

  ngOnInit() {
    var chart4 = new ApexCharts(document.querySelector("#container4"), this.options4)
    chart4.render()
  }

  filterReport() {
    this.filterIReport = !this.filterIReport;
    this.dateDropDown = true;
    this.customerDropDown = false;
    this.categoryDropDown = false;
    this.branchDropDown = false;
    this.salesRepDropDown = false;
    this.productDropDown = false;
    this.brandDropDown = false;
  }
  activeDropDown(value) {
    if (value == 'date') {
      this.dateDropDown = true;
      this.customerDropDown = false;
      this.categoryDropDown = false;
      this.branchDropDown = false;
      this.salesRepDropDown = false;
      this.productDropDown = false;
      this.brandDropDown = false;
    }
    else if (value == 'customer') {
      this.customerDropDown = true;
      this.dateDropDown = false;
      this.branchDropDown = false;
      this.categoryDropDown = false;
      this.salesRepDropDown = false;
      this.productDropDown = false;
      this.brandDropDown = false;
    }
    else if (value == 'category') {
      this.categoryDropDown = true;
      this.customerDropDown = false;
      this.branchDropDown = false;
      this.dateDropDown = false;
      this.salesRepDropDown = false;
      this.productDropDown = false;
      this.brandDropDown = false;
    }
    else if (value == 'branch') {
      this.branchDropDown = true;
      this.categoryDropDown = false;
      this.customerDropDown = false;
      this.dateDropDown = false;
      this.salesRepDropDown = false;
      this.productDropDown = false;
      this.brandDropDown = false;
    }
    else if (value == 'salesrep') {
      this.salesRepDropDown = true;
      this.branchDropDown = false;
      this.categoryDropDown = false;
      this.customerDropDown = false;
      this.dateDropDown = false;
      this.productDropDown = false;
      this.brandDropDown = false;
    }
    else if (value == 'brand') {
      this.brandDropDown = true;
      this.branchDropDown = false;
      this.categoryDropDown = false;
      this.customerDropDown = false;
      this.dateDropDown = false;
      this.salesRepDropDown = false;
      this.productDropDown = false;
    }
    else {
      console.log('true')
      this.productDropDown = true;
      this.branchDropDown = false;
      this.categoryDropDown = false;
      this.customerDropDown = false;
      this.dateDropDown = false;
      this.salesRepDropDown = false;
      this.brandDropDown = false;
    }
  }

  removeSelected(index,i){
  $('#' + i.id).addClass('removed')
  setTimeout(() => {
      this.filterData.splice(index,1)
    },1000);
  }
}
