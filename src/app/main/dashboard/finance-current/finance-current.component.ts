import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-current',
  templateUrl: './finance-current.component.html',
  styles: []
})
export class FinanceCurrentComponent implements OnInit {
  selected = 'option1';
public showline :boolean=true;
  public salesConfigs : Array<any> = [
    {
      name: 'Restaurants',
      total: '1033',
      className: 'square-bullet green',
      active: true
    },
    {
      name: 'Hotels',
      total: '409',
      className: 'square-bullet purple',
      active: true
    },
    {
      name: 'Commercials',
      total: '350',
      className: 'square-bullet blue',
      active: true
    },
    {
      name: 'Dealerships',
      total: '97',
      className: 'square-bullet yellow',
      active: true
    },
    {
      name: 'Web Service',
      total: '56',
      className: 'square-bullet red',
      active: true
    }
  ];
  public chartx = {
    height: 210,
    width: '100%',
    type: 'line',
    // stacked: true,
    // stackType: '100%'
  };
  public legend1={
    show: false,
   }
public grid ={
  show:false
}
  
  
  
  public xaxis1={
    floating: true,
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
      labels: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    
  
  }
  public yaxis ={
    
      floating: true,
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
      labels: {
        show: false
      },
    
  }
 


  public series1=[{
    name: 'PRODUCT A',
    data: [20,45,22,35,40,80,42]
    
},{
    name: 'PRODUCT B',
    data: [30,40,50,55,70,90,65]
   
}]
public colors1=['#8c88ff','#fcab53']

public res=[{
    breakpoint: 480,
    options: {
        legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
        }
    }
}]

  constructor() { }


  ngOnInit() {

   // $('.division-list li').on('click', function(){
   //    $('.division-list li').addClass('active');
   //       $('.division-list li').removeClass('active');
   //  $(this).removeClass('inactive');     
   //  $(this).addClass('active');
     
   // });   
  }
  toggleClass(index){
    this.showline =false;
    this.salesConfigs.forEach(e =>{
      if(index === this.salesConfigs.indexOf(e)){
        this.salesConfigs[index].active = true;
        
        // $('#saletab5,className').addClass("inactive");
        
      } else{
        e.active = false;
        // e.className = 'inactive';
        //  $('#saletab5,className').addClass("inactive");
      }
    })
  }
}
