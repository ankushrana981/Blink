import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-filter]',
    standalone:false,
    template: `<svg version="1.1" class="icon-filter" id="IconFilter" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 19 19.4" style="enable-background:new 0 0 19 19.4;" xml:space="preserve">
<path class="st0" d="M0,0v2.8l0.2,0.2l0.7,0.5l6.6,4.8v11.1l0.8-0.4l3.8-2.3l0.3-0.1V8.2l5.9-4.8l0.6-0.5L19,2.7V0H0z M11.5,7.6
   l-0.2,0.2V16l-2.8,1.7V7.8L8.3,7.6L2.7,3.5h13.8L11.5,7.6z M18,2.3l-0.3,0.2H1.3L1,2.3V1h17V2.3z"/>
</svg>`
})
export class IconFilterComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
