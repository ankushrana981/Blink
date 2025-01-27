import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
// import ApexCharts from 'apexcharts/dist/apexcharts.common.js'
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ApexGrid,
  ApexMarkers
} from 'ng-apexcharts';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  grid: ApexGrid;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: any;
  colors: any;
  legend: ApexLegend;
  fill: any;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-report',
  standalone: false,
  templateUrl: './report.component.html',

  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition(
        'void <=> *',
        animate(
          '250ms ease-out',
          style({ transform: 'translateX(-5%)', opacity: 0 })
        )
      ),
    ]),
  ],
  styles: [],
})
export class ReportComponent extends BaseComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public scrollbarOptions = {
    axis: 'y',
    theme: 'minimal-dark',
    autoHideScrollbar: true,
  };
  public filterIReport: boolean = false;
  public dateDropDown: boolean = false;
  public customerDropDown: boolean = false;
  public categoryDropDown: boolean = false;
  public branchDropDown: boolean = false;
  public salesRepDropDown: boolean = false;
  public brandDropDown: boolean = false;
  public productDropDown: boolean = false;
  public filterData: Array<any> = [
    {
      title: 'Client',
      value: 'McDonalds',
      class: 'customanimate order-animate1',
      id: 'client',
    },
    {
      title: 'Date',
      value: 'April,2020',
      class: 'customanimate order-animate4',
      id: 'date',
    },
    {
      title: 'Product',
      value: 'Strawberry',
      class: 'customanimate order-animate7',
      id: 'product',
    },
    {
      title: 'Branch',
      value: 'Branch Title',
      class: 'customanimate order-animate10',
      id: 'branch',
    },
  ];
  selected = 'option1';

  bsInlineValue: Date;
  constructor(inj: Injector) {
    super(inj);
  }

  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          data: [650, 810, 510, 490, 350, 780, 810, 650, 640, 760],
        },
      ],
      chart: {
        type: 'area',
        height: 300,
      },
      grid: {
        strokeDashArray: 3,
      },
      stroke: {
        curve: 'straight',
        dashArray: 0,
        width: 2,
      },
      markers: {
        size: 5,
        colors: ['#56CCF2'],
      },
      xaxis: {
        categories: ['', 5, '', 10, '', 15, '', 20, '', 25, 30],
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        min: 0,
        max: 1000,
        tickAmount: 4,
      },
      colors: ['#56CCF2'],
      fill: {
        colors: ['#56CCF2'],
      },
      tooltip: {
        enabled: true,
      },
    };
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
    } else if (value == 'customer') {
      this.customerDropDown = true;
      this.dateDropDown = false;
      this.branchDropDown = false;
      this.categoryDropDown = false;
      this.salesRepDropDown = false;
      this.productDropDown = false;
      this.brandDropDown = false;
    } else if (value == 'category') {
      this.categoryDropDown = true;
      this.customerDropDown = false;
      this.branchDropDown = false;
      this.dateDropDown = false;
      this.salesRepDropDown = false;
      this.productDropDown = false;
      this.brandDropDown = false;
    } else if (value == 'branch') {
      this.branchDropDown = true;
      this.categoryDropDown = false;
      this.customerDropDown = false;
      this.dateDropDown = false;
      this.salesRepDropDown = false;
      this.productDropDown = false;
      this.brandDropDown = false;
    } else if (value == 'salesrep') {
      this.salesRepDropDown = true;
      this.branchDropDown = false;
      this.categoryDropDown = false;
      this.customerDropDown = false;
      this.dateDropDown = false;
      this.productDropDown = false;
      this.brandDropDown = false;
    } else if (value == 'brand') {
      this.brandDropDown = true;
      this.branchDropDown = false;
      this.categoryDropDown = false;
      this.customerDropDown = false;
      this.dateDropDown = false;
      this.salesRepDropDown = false;
      this.productDropDown = false;
    } else {
      console.log('true');
      this.productDropDown = true;
      this.branchDropDown = false;
      this.categoryDropDown = false;
      this.customerDropDown = false;
      this.dateDropDown = false;
      this.salesRepDropDown = false;
      this.brandDropDown = false;
    }
  }

  removeSelected(index, i) {
    $('#' + i.id).addClass('removed');
    setTimeout(() => {
      this.filterData.splice(index, 1);
    }, 1000);
  }
}
