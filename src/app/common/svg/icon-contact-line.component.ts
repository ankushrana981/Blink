import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-contact-line]',
    standalone:false,
    template: `<svg version="1.1" class="icon-contact-line" id="IconContactLine" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 16 18" style="enable-background:new 0 0 16 18;" xml:space="preserve">
<path class="icon-contact-line" d="M15.2,0H4.9C3.1,0,1.5,1.6,1.5,3.5v0.8H0.8C0.3,4.4,0,4.7,0,5.2C0,5.6,0.3,6,0.8,6h0.8v2.2H0.8
   C0.3,8.2,0,8.5,0,9s0.3,0.8,0.8,0.8h0.8V12H0.8C0.3,12,0,12.4,0,12.8c0,0.5,0.3,0.8,0.8,0.8h0.8v0.8c0,2,1.5,3.5,3.4,3.5h10.3
   c0.4,0,0.8-0.4,0.8-0.8V0.8C16,0.4,15.7,0,15.2,0z M14.5,16.4H4.9c-1,0-1.8-0.9-1.8-1.9V3.5c0-1.1,0.8-1.9,1.8-1.9h9.5V16.4z
    M8.8,9.5c1.3,0,2.3-1.1,2.3-2.5c0-1.4-1-2.5-2.3-2.5c-1.3,0-2.3,1.1-2.3,2.5C6.5,8.4,7.5,9.5,8.8,9.5z M8.8,9.5
   c-2,0-3.6,1.7-3.6,3.8h7.2C12.4,11.3,10.8,9.5,8.8,9.5z"/>
</svg>
`
})
export class IconContactLineComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
