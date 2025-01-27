import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-minimize]',
    standalone:false,
    template: `<svg version="1.1" class="icon-minimize" id="icon-minimize" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 20 1" style="enable-background:new 0 0 20 1;" xml:space="preserve">
<path class="st0" d="M20,1H0V0h20V1z"/>
</svg>`
})
export class IconMinimizeComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
