import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-upload]',
    standalone:false,
    template: `<svg version="1.1" class="icon-upload" id="IconUpload" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 15 16" style="enable-background:new 0 0 15 16;" xml:space="preserve">
<path class="st0" d="M0,16V9.5h4.1V11H1.4v3.6h12.3V11h-2.7V9.5H15V16H0z M1.8,5.2L7.5,0l5.7,5.2l-0.9,1.1L8.2,2.5v9.6H6.8V2.5
   L2.6,6.3L1.8,5.2z"/>
</svg>`
})
export class IconUploadComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
