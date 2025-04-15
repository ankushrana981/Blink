import { Component, Output, EventEmitter, OnInit ,TemplateRef,ElementRef,ViewChild} from '@angular/core';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
// import { Options } from '@angular-slider/ngx-slider';
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
  ApexPlotOptions
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  legend:ApexLegend;
  options:ApexOptions;
  markers:ApexMarkers;
  labels:string[];
  colors: string[];
  plotOptions: ApexPlotOptions;
};
@Component({
  selector: '[app-quick-customer]',
  standalone:false,
  templateUrl: './quick-customer.component.html',
  styles: [],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } },
    { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true }}
  ]
})
export class QuickCustomerComponent implements OnInit {  
  @ViewChild('itemList', { read: ElementRef }) itemList!: ElementRef;
  @ViewChild('alphabetList', { read: ElementRef }) alphabetList!: ElementRef; 
  mainright: boolean = false;
  public selectedFirst: boolean = false;
  public selectedSecond: boolean = false;
  iconCameraCheck: boolean = false;
  showFullText1: boolean = false;
  showFullText2: boolean = false;
  showFullText3: boolean = false;
  showFullText4: boolean = false;
  activeSlideIndex = 0;
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  activeLetter: string | null = null;
  availableLetters: Set<string> = new Set();
  filteredItems: Array<any> = [];
  searchQuery: string = '';

  selectedValue: any;
  @Output() closeClick = new EventEmitter();

  closeTask() {
    this.closeClick.emit("close"); // Pass any payload as argument
  }
  tabNum: string = "Robert Downey Jr.";
  items: Array<any> = [
    { name: "Robert Downey Jr.", subname: "Contact type" },
    { name: "Tom Hiddleston", subname: "Contact type" },
    { name: "Hydra", subname: "Contact type" },
    { name: "Scarlett Johansson", subname: "Contact type" },
    { name: "Hulk", subname: "Contact type" },
    { name: "Chris Evans", subname: "Contact type" },
    { name: "S.H.I.E.L.D.", subname: "Contact type" },
  ];
  selectedItem(event: any) {
    this.selectedValue = event.name;
    this.isSelected('second')
    $('.search-list li').each(function( index ) {
      if($( this ).text().includes(event.name)){
        $( this ).addClass('active')
      }else{
        $( this ).removeClass('active')
      }
    });
  }
  @ViewChild("chartObj") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() { 
    this.chartOptions = {
      series: [
        {
          name: "demo1",
          data: [0,29,11,40,30,60],
          color: "#fff",
        },
        {
          name: "demo2",
          data: [0,27,9,30,20,50],
          color: "#7db7c1",
        },
      ],
      markers: {
        size: [4,4],
        colors: ['#fff','#7db7c1'],
        strokeColors: '',
        strokeWidth: 2,
        strokeOpacity:1,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        hover: {
          size: 4,
          sizeOffset: 0
        }
      },
      legend:{
        show: false,
      },
      chart: {
        height:180,
        offsetX: 0,
        offsetY: 0,
        type: "line",
        background: '#319b9c',
        id: 'abc',
        zoom: {
          enabled: false
        },
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
          fontSize:  '11px',
          fontWeight:  'bold',
          color:  '#fff',
        },
    },
      grid: {
        strokeDashArray: 0,
        // row: {
        //   colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        //   opacity: 0.5,
        //  },
        borderColor: '#298483',
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
        categories: [
          " ",
          "Apr",
          "May",
          "Jun",
          "Jul",
        ],
        labels: {
          show: true,
          style: {
              colors:'#fff',
              fontSize: '10px',
              fontWeight: 800,
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
          color: '#298483',
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis:{
        tickAmount: 5,
        min: 10,
        labels: {
          show: true,
          align: 'left',
          style: {
              colors:'#fff',
              fontSize: '10px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 800,
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
    $('.alpha-search-input input').attr("disabled", "disabled");
    setTimeout( () => {
      $('.alpha-search-input input').removeAttr('disabled')
    }, 500); 
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
  isSelected(step) {
    if (step == 'first') {
      this.selectedFirst = !this.selectedFirst;
      this.selectedSecond = false;
    } else if (step == 'second') {
      this.selectedSecond = !this.selectedSecond
    }
    
  }
  change(){
    var a =  $('.alpha-search-input input').val();
    
    if(a.toString().length > 0){
      $('.alpha-search-input input').addClass('input-from')
    }else{
      $('.alpha-search-input input').removeClass('input-from')
    }
  }
  
  // slideConfig = {"slidesToShow": 3, "slidesToScroll": 1};

  
  text1: string = "Minim veniam, quis nostrud exercitation ullamco la boris nisit ero italy iquip ex ea voluptate rito veniam, quis nostrud exercitation ullamco la boris nisit ero italy iquip ex ea  voluptate exercitation ullamco la boris nisit ero italy iquip ex ea voluptate rito veniam, quis nostrud exercitation ullamco la boris nisit ero";
  text2: string = "Minim veniam, quis nostrud exercitation ullamco la boris nisit ero italy iquip ex ea voluptate rito veniam, quis nostrud exercitation ullamco la boris nisit ero italy iquip ex ea  voluptate exercitation ullamco la boris nisit ero italy iquip ex ea voluptate rito veniam, quis nostrud exercitation ullamco la boris nisit ero";
  text3: string = "Minim veniam, quis nostrud exercitation ullamco la boris nisit ero italy iquip ex ea voluptate rito veniam, quis nostrud exercitation ullamco la boris nisit ero italy iquip ex ea  voluptate exercitation ullamco la boris nisit ero italy iquip ex ea voluptate rito veniam, quis nostrud exercitation ullamco la boris nisit ero";
  text4: string = "Minim veniam, quis nostrud exercitation ullamco la boris nisit ero italy iquip ex ea voluptate rito veniam, quis nostrud exercitation ullamco la boris nisit ero italy iquip ex ea  voluptate exercitation ullamco la boris nisit ero italy iquip ex ea voluptate rito veniam, quis nostrud exercitation ullamco la boris nisit ero";
  
  
  
  value: number = 100;
  // options: Options = {
  //   floor: 0,
  //   ceil: 100,
  //   step: 0.1,
  //   translate: (value: number): string => {
  //     return value +'%' ;
  //   }
  // };

  minValue: number = 100;
  maxValue: number = 148.94;
  // options2: Options = {
  //   floor: 0,
  //   ceil:148.94,
  //   step: 0.1,
  //   translate: (value: number): string => {
  //     return value +'%' ;
  //   }
  // };
}