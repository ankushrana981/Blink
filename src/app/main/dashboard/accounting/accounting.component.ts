import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexLegend,
  ApexOptions,
  ApexMarkers,
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  dataLabels: ApexDataLabels | any;
  grid: ApexGrid | any;
  stroke: ApexStroke | any;
  title: ApexTitleSubtitle | any;
  legend: ApexLegend | any;
  labels: string[];
  options: ApexOptions | any;
  markers: ApexMarkers | any;
  responsive:ApexResponsive[];
};

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-accounting',
  standalone: false,
  templateUrl: './accounting.component.html',
  styles: [],
})
export class AccountingComponent implements OnInit {
  public scrollbarOptions = {
    axis: 'y',
    theme: 'minimal-dark',
    autoHideScrollbar: true,
  };
  selected = 'option3';


  
  //   public tooltip: {
  //     pointFormat: '<span style="color:{series1.color}">{series1.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
  //     shared: true
  // }

 

  // public clr={

  //     colors: ['#181742','#615fad']

  // }

  @ViewChild('chartObj') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'PRODUCT A',
          data: [44000, 12000, 15000, 32000, 39000, 18000],
        },
        {
          name: 'PRODUCT B',
          data: [52000, 29000, 45000, 59000, 18000, 36000],
        },
      ],
      legend: {
        show: false,
      },
      chart: {
        height: 190,
        type: 'bar',
        stacked: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'jun', 'Jul'],
      }
    };
  }

  ngOnInit() {}
}
