import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../common/commonComponent';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
@Component({
  selector: 'app-requests',
  standalone: false,
  templateUrl: './requests.component.html',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn(':enter')),
  ],
  styles: [],
})
export class RequestsComponent extends BaseComponent implements OnInit {
  @ViewChild(InfiniteScrollDirective) infiniteScroll: InfiniteScrollDirective;
  // public ts :any="1562216562169";
  public ts = this.getTimeStap();

  public offset: any = 0;
  public limit: any = 20;
  public status: any = 'all';
  public type: any = 'inventoryrequest';
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  // direction = '';
  public listrecords: any = [];
  public listrecords1: any = [];

  public data = {
    ts: this.ts,
    offset: this.offset,
    limit: this.limit,
    status: this.status,
    type: this.type,
  };
  public icon1: boolean = false;

  total: any;

  constructor(inj: Injector) {
    super(inj);
  }

  ngOnInit() {
    this.getListrecords();
  }

  /*****************************************************
 @purpose : For getting the list details
 @parameters : 
 @return :
 *****************************************************/
  getListrecords() {
    this.commonService
      .callApi('api/documents', this.data, 'get')
      .then((success) => {
        if (success) {
          this.listrecords = success.records;
          this.total = success.total;
        } else {
          this.popToast('error', success.message);
        }
      })
      .catch((e) => {
        console.log('there is an error:', e);
      });
  }
  /*****************************************************
 @purpose : For lazy laoding scorrlling
 @parameters : 
 @return :
 *****************************************************/
  onScroll(event: any) {
    const target = event.target;
    const atBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight;
    console.log('bottom');
    if (atBottom) {
      this.onScrollDown(event);
      // console.log(
      //   'scrollTop',
      //   target.scrollTop,
      //   'clientHeight',
      //   target.clientHeight,
      //   'scrollHeight ',
      //   target.scrollHeight
      // );
    }
  }
  onScrollDown(ev) {
    this.data['offset'] = this.data['offset'] + 20;
    if (this.total > this.data['offset']) {
      this.commonService
        .callApi('api/documents', this.data, 'get')
        .then((success) => {
          if (success) {
            this.listrecords1 = success.records;
            for (var i = 0; i < this.listrecords1.length; i++) {
              this.listrecords.push(this.listrecords1[i]);
            }
          } else {
            this.popToast('error', success.message);
          }
        })
        .catch((e) => {
          console.log('there is an error:', e);
        });
      this.infiniteScroll.ngOnDestroy();
      // this.infiniteScroll.setup();
      // this.direction = 'down'
    }
  }
  /*****************************************************
@purpose : For delete the item
@parameters : 
@return :
*****************************************************/
  deleteRequest(i) {
    this.swal({
      imageUrl: 'assets/images/trash-bin1.png',
      imageWidth: 155,
      // imageHeight: 171,
      // title: 'Are you sure?',
      text: 'Are you sure you want to delete this record?',
      // text: "you Want to delete this record?",
      // type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.commonService
          .callApi('/api/documents/' + i.id, '', 'delete')
          .then((success) => {
            this.listrecords = [];
            this.data.offset = 0;
            this.getListrecords();
            if (success) {
            } else {
              this.popToast('error', success.message);
            }
          })
          .catch((e) => {
            console.log('there is an error:', e);
          });
      }
    });
  }
  // For active and inactive the right side bar

  changeIc(type) {
    if (type == 'dots') {
      this.icon1 = true;
    } else {
      this.icon1 = false;
    }
  }
  editing(element) {
    this.router.navigate(['/main/inventory/new-inventory'], {
      queryParams: {
        status: element.status.id,
        docNumber: element.docNumber,
        request: true,
      },
    });
  }
}
