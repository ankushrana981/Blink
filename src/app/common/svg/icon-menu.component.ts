import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-menu]',
    standalone:false,
    template: `<svg version="1.1" class="icon-menu" id="icon-menu" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 15 6" style="enable-background:new 0 0 15 6;" xml:space="preserve">
<path class="st0" d="M2,1c0-0.6,0.4-1,1-1h9c0.6,0,1,0.4,1,1s-0.4,1-1,1H3C2.4,2,2,1.6,2,1z M1,4h13c0.6,0,1,0.4,1,1l0,0
   c0,0.6-0.4,1-1,1H1C0.4,6,0,5.6,0,5l0,0C0,4.4,0.4,4,1,4z"/>
</svg>`
})
export class IconMenuComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
