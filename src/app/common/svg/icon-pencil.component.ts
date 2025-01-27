import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-pencil]',
    standalone:false,
    template: `<svg version="1.1" id="IconPencil" class="icon-pencil" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 8.6 8.6" style="enable-background:new 0 0 8.6 8.6;" xml:space="preserve">
<path class="st0" d="M8,0.6c-0.7-0.7-1.9-0.7-2.7,0L0.4,5.5c0,0-0.1,0.1-0.1,0.1L0,8.3c0,0.1,0,0.2,0.1,0.2c0,0,0.1,0.1,0.2,0.1
   c0,0,0,0,0,0l1.6-0.2c0.1,0,0.2-0.1,0.2-0.3c0-0.1-0.1-0.2-0.3-0.2L0.5,8l0.3-1.9l2,2c0,0,0.1,0.1,0.2,0.1c0.1,0,0.1,0,0.2-0.1
   L8,3.2c0.4-0.4,0.6-0.8,0.6-1.3C8.6,1.4,8.4,0.9,8,0.6z M5.4,1.2L6.3,2L1.8,6.5L1,5.6L5.4,1.2z M2.9,7.6L2.1,6.8l4.5-4.5l0.8,0.8
   L2.9,7.6z M7.8,2.8l-2-2C6,0.6,6.4,0.5,6.7,0.5c0.4,0,0.7,0.1,1,0.4c0.3,0.3,0.4,0.6,0.4,1C8.1,2.2,8,2.5,7.8,2.8z"/>
</svg>
`
})
export class IconPencilComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
