import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};
@Component({
  selector: 'app-highcharts',
  standalone: false,
  templateUrl: './highcharts.component.html',
  styles: [],
})
export class HighchartsComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;
  //   public series:any=[{
  //     data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  // }];
  public chartx = {
    height: 350,
    type: 'radialBar',
    zoom: {
      enabled: false,
    },
  };
  public legend1 = {
    show: true,
    floating: true,
    fontSize: '8px',
    position: 'left',
    offsetX: 160,
    offsetY: 10,
    labels: {
      useSeriesColors: true,
    },
    markers: {
      size: 0,
    },
    formatter: function (seriesName: any, opts: any) {
      return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
    },
    itemMargin: {
      horizontal: 1,
    },
  };
 
  // public tooltip1={
  //     enabled: true,
  //     // shared: true,
  //     // followCursor: false,
  //     // intersect: false,
  //     // inverseOrder: false,
  //     // custom: undefined,
  //     // fillSeriesColor: false,
  //     // theme: false,
  //     // title: {
  //     //             formatter: (seriesName) => seriesName,
  //     //         },
  //     // style: {
  //     //   fontSize: '12px',
  //     //   fontFamily: undefined
  //     // },
  //     // onDatasetHover: {
  //     //     highlightDataSeries: false,
  //     // },
  //     // x: {
  //     //     show: true,
  //     //     format: 'dd MMM',
  //     //     formatter: undefined,
  //     // },
  //     // y: {
  //     //     formatter: undefined,
  //     //
  //     // },
  //     // z: {
  //     //     formatter: undefined,
  //     //     title: 'Size: '
  //     // },
  //     // marker: {
  //     //     show: true,
  //     // },

  //     // fixed: {
  //     //     enabled: false,
  //     //     position: 'topRight',
  //     //     offsetX: 0,
  //     //     offsetY: 0,
  //     // },
  // }

  @Input('type') type: any;

  constructor() {
  
    this.chartOptions = {
      series: [76, 67, 61, 90],
      chart: {
        height: 350,
        type: 'radialBar',
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        radialBar: {
          offsetY: -10,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '40%',
            background: 'transparent',
            image: undefined,
          },
          track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: '#f2f2f2',
            strokeWidth: '97%',
            opacity: 1,
            margin: 5,
            dropShadow: {
              enabled: false,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      labels: [
        'Web Services',
        'Dealerships',
        'Commercials',
        'Hotel',
        'Restaurants',
      ],
      legend: {
        show: true,
        floating: true,
        fontSize: '8px',
        position: 'left',
        offsetX: 160,
        offsetY: 10,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          strokeWidth: 0,
        },
        formatter: function (seriesName: any, opts: any) {
          return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 1,
        },
      }
    };
  }

  ngOnInit() {
    console.log(this.type, 'type');
  }
}
