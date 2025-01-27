import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-atteched]',
    standalone:false,
    template: `<svg class="icon-atteched" id="IconAtteched" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 17 19" style="enable-background:new 0 0 17 19;" xml:space="preserve">
<path class="st0" d="M7.8,8.5c0.3-0.3,0.3-0.7,0-0.9c-0.3-0.3-0.7-0.3-0.9,0l-3.5,3.5c-0.6,0.6-0.9,1.4-0.9,2.2
   c0,0.8,0.3,1.6,0.9,2.2c1.2,1.2,3.2,1.2,4.4,0l7.9-8C16.5,6.7,17,5.6,17,4.4c0-1.2-0.5-2.3-1.3-3.1c-1.7-1.7-4.5-1.7-6.2,0l-7.9,8
   c-1.1,1.1-1.6,2.5-1.6,4s0.6,3,1.6,4c1.1,1.1,2.5,1.7,4,1.7c1.5,0,2.9-0.6,4-1.7l3.5-3.5c0.3-0.3,0.3-0.7,0-0.9
   c-0.3-0.3-0.7-0.3-0.9,0l-3.5,3.5c-0.8,0.8-1.9,1.3-3,1.3s-2.2-0.5-3-1.3c-0.8-0.8-1.3-1.9-1.3-3.1c0-1.2,0.5-2.3,1.3-3.1l7.9-8
   c0.6-0.6,1.3-0.9,2.1-0.9c0.8,0,1.6,0.3,2.1,0.9c0.6,0.6,0.9,1.4,0.9,2.2c0,0.8-0.3,1.6-0.9,2.2l-7.9,8c-0.7,0.7-1.8,0.7-2.6,0
   c-0.3-0.3-0.5-0.8-0.5-1.3c0-0.5,0.2-0.9,0.5-1.3L7.8,8.5z"/>
</svg>`
})
export class IconAttechedComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
