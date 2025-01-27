import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-location-line]',
    standalone:false,
    template: `<svg version="1.1" class="icon-location-line" id="IconLocationLine" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 16 19" style="enable-background:new 0 0 16 19;" xml:space="preserve">
<path class="icon-location-line" d="M8,2c1.6,0,3.1,0.6,4.3,1.7C13.4,4.8,14,6.3,14,7.9c0,1.6-0.6,3-1.7,4.1L8,16.2L3.7,12C2.6,10.9,2,9.4,2,7.9
   c0-1.6,0.6-3,1.7-4.1C4.9,2.6,6.4,2,8,2z M8,0C6,0,3.9,0.8,2.3,2.3c-3.1,3.1-3.1,8.1,0,11.1L8,19l5.7-5.6c3.1-3.1,3.1-8.1,0-11.1
   C12.1,0.8,10,0,8,0z M8,5.5c0.7,0,1.3,0.3,1.8,0.7c1,1,1,2.6,0,3.5c-0.5,0.5-1.1,0.7-1.8,0.7s-1.3-0.3-1.8-0.7c-1-1-1-2.6,0-3.5
   C6.7,5.8,7.3,5.5,8,5.5z M8,4.5c-0.9,0-1.8,0.3-2.5,1c-1.4,1.4-1.4,3.6,0,5c0.7,0.7,1.6,1,2.5,1s1.8-0.3,2.5-1c1.4-1.4,1.4-3.6,0-5
   C9.8,4.8,8.9,4.5,8,4.5z"/>
</svg>`
})
export class IconLocationLineComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
