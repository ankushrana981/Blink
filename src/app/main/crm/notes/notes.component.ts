import { Component, OnInit,Injector } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
import { MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY } from '@angular/material';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')) 
  ],
  styles: []
})
export class NotesComponent extends BaseComponent implements OnInit {
  // public ts :any="1560490005688";
  public ts=this.getTimeStap();

  public offset:any=0;
  public limit:any=20;
  total:any;
  public user:any={};
  public tasks =[{type:1,name:'General'},{type:2,name:'Customer'},{type:3,name:'Task'}]

  public icon1 :boolean=false;
  public sidemenu:boolean=false;
  public MainSearchdataSource = new Subject<string>();
  public clientNameItem: Observable<any>;
  public supplierLoading: boolean = false;
  public listrecords:any = [];
  public taskrecords:any=[];
  public titleArr:any=[];
  public maxDate = new Date();

  constructor(inj:Injector) { 
    super(inj)
  }

  ngOnInit() {
    this.listApi();
    this.loadTypehead();
    this.presetTitle();
    this.Taskdropdown();


  }
  /*****************************************************
  @purpose : For search and getting the list for dropdown
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
  @purpose : For getting the list 
  @parameters : 
  @return :
  *****************************************************/
 listApi(){
    var queryParams = 'ts='+this.ts+'&offset='+this.offset+'&limit='+this.limit;
    this.commonService.callApi('api/clients/notes?'+queryParams,'','get').then(success => {

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
  /*****************************************************
  @purpose :For getting the tasks dropdown
  @parameters : 
  @return :
  *****************************************************/
  Taskdropdown(){
    var queryParams1 = 'includeActiveTasksForCurrentUser='+true+'&q=';
    this.commonService.callApi('api/clients/tasks/lookup?'+queryParams1,'','get').then(success => {

      if (success) {
        this.taskrecords=success;
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
  ModelDatepicker(event){
    
    // console.log("sdfas",event)

  }
  changedCheck(event){
    // console.log("asdf",event)

  }
  Createdisnote(data){
      this.user['dateOfEntry']= this.maxDate;
      this.commonService.callApi('api/clients/notes',data,'post').then(success => {
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
  /*****************************************************
  @purpose : For Updateditnote
  @parameters : 
  @return :
  *****************************************************/
  updatedNote(data){

    console.log('data',data)
    console.log("adtasdfa",data)
    this.commonService.callApi('api/clients/notes/'+data.id,data,'put').then(success => {
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
  presetTitle(){
    this.commonService.callApi('api/tenants/presetactivities/lookup','','get').then(success => {
      if (success) {
        this.titleArr =success;

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
  selected(event){
    // this.user['presetActivity']=event;
    console.log("asdklnfa",event)
  }

  deletenotes(i){
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
        this.commonService.callApi('api/clients/notes/'+i.id,'','delete').then(success => {
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
    $('#notesname :input').blur();
    $('#businessPartner :input').blur();
    $('#taskname :input').blur();

  }
}
