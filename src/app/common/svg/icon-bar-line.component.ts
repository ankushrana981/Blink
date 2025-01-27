
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-bar-line]',
    standalone:false,
    template: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 16 8" style="enable-background:new 0 0 16 8;" xml:space="preserve">
<path class="st0" d="M1,3h14c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1H1C0.4,5,0,4.6,0,4l0,0C0,3.4,0.4,3,1,3z M1,6h14c0.6,0,1,0.4,1,1
   l0,0c0,0.6-0.4,1-1,1H1C0.4,8,0,7.6,0,7l0,0C0,6.4,0.4,6,1,6z M1,0h14c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1H1C0.4,2,0,1.6,0,1l0,0
   C0,0.4,0.4,0,1,0z"/>
</svg>`
})
export class IconBarLineComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
