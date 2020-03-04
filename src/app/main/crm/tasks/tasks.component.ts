import { Component, OnInit,Injector } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')) 
  ],
  styles: []
})
export class TasksComponent extends BaseComponent implements OnInit {
  // public ts :any="1560441011123";
  public ts=this.getTimeStap();

  public offset:any=0;
  public limit:any=20;
  public listrecords:any = [];
  public MainSearchdataSource = new Subject<string>();
  public clientNameItem: Observable<any>;
  public supplierLoading: boolean = false;
  total:any;
  public icon1 :boolean=false;
  public sidemenu:boolean=false;
  public user:any={};
  public tasks =[{id:1,name:'General'},{id:2,name:'Client'},{id:3,name:'Division'},{id:4,name:'Product'}]
  public maxDate = new Date();
  public productrecords=[];



  constructor(inj:Injector) { 
    super(inj)
  }

  ngOnInit() {
    this.listApi();
    this.loadTypehead();
    this.getProducts();


    
  }
  /*****************************************************
  @purpose :For getting the producrts for dropdown
  @parameters : 
  @return :
  *****************************************************/
  getProducts(){
    this.commonService.callApi('api/inventory/products/lookup?q=','','get').then(success => {
      if (success) {
        this.productrecords = success;
          // this.user['branch'] = success[0]; 
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }

  /*****************************************************
  @purpose :For search and getting the drop down list for client
  @parameters : 
  @return :
  *****************************************************/
  private loadTypehead() {
		// startWith(this.user.serachSupplier),
		this.clientNameItem = concat(
			of([]),
			this.MainSearchdataSource.pipe(
				debounceTime(200),
				distinctUntilChanged(),
				switchMap(term => this.getSearchList(term, false)),
				map(response => {
					return response;
				})
				)
			);
  }
  getSearchList(value: string = null, allow): Observable<any[]> {
		this.supplierLoading = true;
		let data = {};
		if (value) {
      data["entityType"] = "client";
			data["q"] = value;
		}
		 let items;
		return this.commonService.callApiObservable('api/clients/lookup', data).pipe(
			catchError(() => of(({ items: [] }))),
			map(success => {
        // console.log("asdhfa",success)
					items = success;
					if (allow) {
						this.clientNameItem = success['records'];
					}
					this.supplierLoading = false;
				return (items) ? items : [];
			})
			)
  }

  /*****************************************************
  @purpose :For getting the list
  @parameters : 
  @return :
  *****************************************************/
 listApi(){
    var queryParams = 'ts='+this.ts+'&offset='+this.offset+'&limit='+this.limit;
    this.commonService.callApi('api/clients/tasks?'+queryParams,'','get').then(success => {

      if (success) {
        this.listrecords=success.records;
        this.total=success.total;
      
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })


  }

  changeIc(type){
  
    if(type == 'dots'){
      this.icon1=true;
      this.sidemenu =true;
      this.user={};
    }else{
      this.icon1=false;
      this.sidemenu =false;
      this.user={};
    }
  }
  editCustomerSetup(item){
    // console.log("adhsfah",item)
    this.icon1=true;
    this.sidemenu =true;
    this.user=item;
  }
  createdisTask(data){
    this.user['dateOfEntry']= this.maxDate;
    this.commonService.callApi('api/clients/tasks',data,'post').then(success => {
      if (success) {
        this.icon1=false;
        this.sidemenu =false;
        this.listApi();
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
    
  }
  updatediTask(data){
    // console.log("adtasdfa",data)
    this.commonService.callApi('api/clients/tasks/'+data.id,this.user,'put').then(success => {
      if (success) {
        this.icon1=false;
        this.sidemenu =false;
        this.listApi();

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
   

  }
  ModelDatepicker(event){
    
    console.log("sdfas",event)

  }
  changedCheck(event){
    console.log("asdf",event)

  }
  /*****************************************************
  @purpose :For deleting the list item
  @parameters : 
  @return :
  *****************************************************/

  deletetask(i){
    this.swal({
      imageUrl: "assets/images/trash-bin1.png",
      imageWidth: 155,
      text: "Are you sure you want to delete this record?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText : 'No',
      confirmButtonText: 'Yes',
      allowOutsideClick: false
    }).then((result) => {
      if(result.value){
        this.commonService.callApi('api/clients/tasks/'+i.id,'','delete').then(success => {
          if(this.total <= this.offset){
            this.offset=0;
            this.listApi();

          }else{
            this.offset=0;
          this.listApi();

          }
         

          if (success) {
          
          } else {
            this.popToast('error', success.message)
          }
        }).catch((e) => {
          console.log("there is an error:", e)
        })
      }
    })

  }
  recordSelected(event){
    $('#taskname :input').blur();
    $('#businessPartner :input').blur();
    $('#productrecord :input').blur();




  }
}
