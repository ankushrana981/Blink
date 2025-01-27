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
  ApexMarkers
} from "ng-apexcharts";
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
  options: ApexOptions | any
  markers: ApexMarkers | any
};

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-accounting',
  standalone: false,
  templateUrl: './accounting.component.html',
  styles: []
})
export class AccountingComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true };
  selected = 'option3';

  public chartx = {
    height: 190,
    type: 'bar',
    stacked: true,
    // stackType: '100%'
  };
  public legend1 = {
    show: false,

  }

  public xaxis1 = {

    categories: ['Feb', 'Mar', 'Apr', 'May', 'jun', 'Jul'],

  }
  //   public tooltip: {
  //     pointFormat: '<span style="color:{series1.color}">{series1.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
  //     shared: true
  // }

  public series1 = [{
    name: 'PRODUCT A',
    data: [44000, 12000, 15000, 32000, 39000, 18000]

  }, {
    name: 'PRODUCT B',
    data: [52000, 29000, 45000, 59000, 18000, 36000]

  }]

  public res = [{
    breakpoint: 480,
    options: {
      legend: {
        position: 'bottom',
        offsetX: -10,
        offsetY: 0
      }
    }
  }]
  // public clr={

  //     colors: ['#181742','#615fad']

  // }

  @ViewChild("chartObj") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [{
        name: 'PRODUCT A',
        data: [44000, 12000, 15000, 32000, 39000, 18000]

      }, {
        name: 'PRODUCT B',
        data: [52000, 29000, 45000, 59000, 18000, 36000]

      }],
      markers: {
        size: [4, 4],
        colors: ['#fff', '#7db7c1'],
        strokeColors: '',
        strokeWidth: 2,
        strokeOpacity: 1,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        hover: {
          size: 4,
          sizeOffset: 0
        }
      },
      legend: {
        show: false,
      },
      chart: {
        height: 190,
        offsetX: 0,
        offsetY: 0,
        type: "bar",
        stacked: true,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        lineCap: 'butt',
        colors: undefined,
        width: 2,
      },
      title: {
        text: "C  H  A  R  T",
        margin: 12,
        align: "center",
        offsetX: 0,
        offsetY: 0,
        floating: true,
        style: {
          fontSize: '11px',
          fontWeight: 'bold',
          color: '#fff',
        },
      },
      grid: {
        strokeDashArray: 0,
        borderColor: '#ddd',
        padding: {
          top: 0,
          right: 0,
          bottom: 5,
          left: 0
        },
      },
      xaxis: {
        type: 'category',
        tickPlacement: 'on',
        min: 5,
        range: 5,
        offsetX: 0,
        tickAmount: 5,
        categories: ['Feb', 'Mar', 'Apr', 'May', 'jun', 'Jul'],
        labels: {
          show: true,
          style: {
            colors: '#fff',
            fontSize: '10px',
            fontWeight: 400,
          },
        },
        crosshairs: {
          show: true,
          stroke: {
            color: '#fff',
          },
          fill: {
            type: 'String',
            color: '#fff',
          },
        },
        axisBorder: {
          show: true,
          color: '#ddd',
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        tickAmount: 5,
        min: 10,
        labels: {
          show: true,
          align: 'left',
          style: {
            colors: '#fff',
            fontSize: '10px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
        },
      },
    };
  }

  ngOnInit() {
  }

}
