import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-composition-entry',
  templateUrl: './composition-entry.component.html',

  animations: [
    trigger('EnterLeave', [
     transition(':enter', [
        style({ opacity: 0}),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('250ms ease-out', style({ transform: 'translateX(-5%)', opacity: 0 }))
      ])
    ])
  ],
  styles: []
})

export class CompositionEntryComponent extends BaseComponent implements OnInit {
  public productNameItem: Observable<any>;
  public MainSearchdataSource = new Subject<string>();
  public productLoading: boolean = false;
  public notFoundText: any = "No matches found.";
  public user: any = {};
  public isNew: Boolean = true;
  public setuserid: any;

  unit: any;
  rowRepeatArr: any = [{}]
  constructor(inj: Injector, public route: ActivatedRoute) {
    super(inj)
  }

  ngOnInit() {
    this.loadTypehead();

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

  addRow() {
    this.rowRepeatArr.push({})
    console.log("asdfads",this.rowRepeatArr)

  }
  removeRow(j) {
  
    this.rowRepeatArr.splice(j, 1);

  }

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
  productSelected(event) {
    this.user['unitofMeasure'] =  event.unitofMeasure;
    $('#productName :input').blur();
  }

  ingredientSelected(event) {
     this.unit = event.unitofMeasure.unit;
     $('#ingredient :input').blur();
  }

  createEntry() {

    this.user['ingredients'] = this.rowRepeatArr;
    this.user['isDryState'] = true;
    this.user['isLiquidState'] = false;
    this.user['isStateDry'] = true;
    let count = this.rowRepeatArr.map(r => Number(r.quantity)).reduce((a, c) => a + c);
    this.rowRepeatArr.map(r => {
      if (r.product) {
        r.code = r.product.componentCode;
        r.unitofMeasure = r.product.unitofMeasure;
      }

    });

    this.user.totalWeightInKg = count;
    this.user.totalWeight = count * 1000;

     this.commonService.callApi('api/inventory/compositions', this.user, 'post').then(success => {
      if (success) {
        this.router.navigate(['/main/manufacturing/composition-view'])
       } else {
        this.popToast('error', success.message)
      }
    }).catch((e) => {
      console.log("there is an error:", e)
    })
  }

}
