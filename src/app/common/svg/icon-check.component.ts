
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-info-check]',
    standalone:false,
    template: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 26 26" style="enable-background:new 0 0 26 26;" xml:space="preserve">
<path class="st0" d="M0,0v22.8L4,26H22l4-3.4V0H0z M10,3.3h6V6h-6V3.3z M22.8,20.8l-2,2H5.2l-2-2V3.3H8V8h10V3.3h4.8V20.8z
    M13.7,12.7l-3.7,4l-0.7,0.8l-0.7-0.8l-2.3-2.5c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l1.6,1.7l3-3.2c0.4-0.4,1-0.4,1.4,0
   C14.1,11.6,14.1,12.3,13.7,12.7z"/>
</svg>`
})
export class IconInfoCheckComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
