import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { trigger } from '@angular/animations';


@Component({
  selector: 'app-composition-view',
  templateUrl: './composition-view.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter'))
  ],
  styles: []
})
export class CompositionViewComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;
  public productNameItem: Observable<any>;
  public MainSearchdataSource = new Subject<string>();
  public productLoading: boolean = false;
  public notFoundText: any = "No matches found.";
  public user: any = {};
  public isNew: Boolean = true;
  public setuserid: any;
  unit: any;
  editedtitle: any;
  itemId: any;
  rowRepeatArr: any = [{}]
  public ts = this.getTimeStap();
  public offset: any = 0;
  public limit: any = 20;
  public data = {
    ts: this.ts,
    offset: this.offset,
    limit: this.limit

  };
  public SwitchUi: boolean = true;

  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  public listrecords: any = [];
  public listrecords1: any = [];

  total: any;


  constructor(inj: Injector) {
    super(inj)
  }

  ngOnInit() {
    this.viewlistrecords();
    this.loadTypehead();
  }
  /*****************************************************
 @purpose : For getting the list details
 @parameters : 
 @return :
 *****************************************************/
  viewlistrecords() {
    this.commonService.callApi('api/inventory/compositions',this.data, 'get').then(success => {

      if (success) {
        this.listrecords = success.records;
        this.total = success.total;

      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }
  /*****************************************************
 @purpose : For lazy laoding scorrlling
 @parameters : 
 @return :
 *****************************************************/
  onScrollDown(ev) {

    this.data['offset'] = this.data['offset'] + 20;
    var queryParams = Object.keys(this.data).map(key => key + '=' + this.data[key]).join('&');
    if (this.total > this.data['offset']) {

      this.commonService.callApi('api/inventory/compositions',this.data, 'get').then(success => {

        if (success) {
          this.listrecords1 = success.records;
          for (var i = 0; i < this.listrecords1.length; i++) {
            this.listrecords.push(this.listrecords1[i]);
          }
        } else {
          this.popToast('error', success.message)
        }
      }).catch((e) => {
        console.log("there is an error:", e)
      })
      this.infiniteScroll.ngOnDestroy();
      this.infiniteScroll.setup();
      // this.direction = 'down'
    }

  }
  /*****************************************************
@purpose : For delete the item
@parameters : 
@return :
*****************************************************/
  deleteItem(i) {
    this.swal({
      imageUrl: "assets/images/trash-bin1.png",
      imageWidth: 155,
      // imageHeight: 171,
      // title: 'Are you sure?',
      text: "Are you sure you want to delete this record?",

      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.commonService.callApi('api/inventory/compositions/' + i.id, '', 'delete').then(success => {
          this.listrecords = [];
          this.data.offset = 0;
          this.ngOnInit();

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
  /*****************************************************
 @purpose : For opening edit view and for bind the values
 @parameters : 
 @return :
 *****************************************************/
  editItem(i) {
    this.editedtitle = i.title;
    this.user = i;
    this.SwitchUi = false;
    this.rowRepeatArr = i.ingredients;
    this.user.product = i.product;
    this.user.thresholdPercent = i.thresholdPercent;
    this.unit = i.unitofMeasure.unit;
    this.itemId = i.id;
  }
  closeView() {
    this.SwitchUi = true;

  }

  private loadTypehead() {
    // startWith(this.user.serachSupplier),
    this.productNameItem = concat(
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
  /*****************************************************
 @purpose :For row add in arrray
 @parameters : 
 @return :
 *****************************************************/
  addRow() {
    this.rowRepeatArr.push({})

  }
  /*****************************************************
@purpose :For remove row add in arrray
@parameters : 
@return :
*****************************************************/
  removeRow(j) {

    this.rowRepeatArr.splice(j, 1);

  }
  /*****************************************************
 @purpose : Qunatity ng model details
 @parameters : 
 @return :
 *****************************************************/
  quantitychnge(i) {
    let count1 = this.rowRepeatArr.map(r => Number(r.quantity)).reduce((a, c) => a + c);

    this.rowRepeatArr.map(r => {
      if (r.product) {
        r.percent = (r.quantity * 100) / count1;
      }

    });
  }

  getSearchList(value: string = null, allow): Observable<any[]> {
    this.productLoading = true;
    let data = {};
    if (value) {
      data["includeComponentOnly"] = "true";
      data["q"] = value;
    }
    let items;
    return this.commonService.callApiObservable('api/inventory/products/lookup', data).pipe(
      catchError(() => of(({ items: [] }))),
      map(success => {
        items = success;
        if (allow) {
          this.productNameItem = success['records'];
        }
        this.productLoading = false;
        return (items) ? items : [];
      })
    )
  }
  /*****************************************************
 @purpose : productSelected details
 @parameters : 
 @return :
 *****************************************************/
  productSelected(event) {
    this.user['unitofMeasure'] = event.unitofMeasure;
    $('#productName :input').blur();
  }
  /*****************************************************
 @purpose : After selecing the amount details
 @parameters : 
 @return :
 *****************************************************/
  ingredientSelected(event) {
    this.unit = event.unitofMeasure.unit;
    $('#ingredient :input').blur();
  }

  /*****************************************************
 @purpose : Edit api calling
 @parameters : 
 @return :
 *****************************************************/
  editCompositionEntry() {

    this.user['isDryState'] = true;
    this.user['isLiquidState'] = false;
    this.user['isStateDry'] = true;
    let count = this.rowRepeatArr.map(r => Number(r.quantity)).reduce((a, c) => a + c);
    this.rowRepeatArr.map(r => {
      if (r.product) {
        r.code = r.product.componentCode;
        r.unitofMeasure = this.user['unitofMeasure'];
      }

    });

    this.user.totalWeightInKg = count;
    this.user.totalWeight = count * 1000;
    this.user['ingredients'] = this.rowRepeatArr;

    this.commonService.callApi('api/inventory/compositions/' + this.itemId, this.user, 'put').then(success => {
      if (success) {
        this.SwitchUi = true;
        var queryParams = Object.keys(this.data).map(key => key + '=' + this.data[key]).join('&');
        this.viewlistrecords()
      } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }

}
