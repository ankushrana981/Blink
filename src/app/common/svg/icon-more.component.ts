import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-more]',
    standalone:false,
    template: `<svg version="1.1" class="icon-more" id="IconMore" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 24 6" style="enable-background:new 0 0 24 6;" xml:space="preserve">
<path class="st0" d="M0,3c0-1.7,1.3-3,3-3s3,1.3,3,3S4.7,6,3,6S0,4.7,0,3z M9,3c0-1.7,1.3-3,3-3s3,1.3,3,3s-1.3,3-3,3S9,4.7,9,3z
	 M18,3c0-1.7,1.3-3,3-3s3,1.3,3,3s-1.3,3-3,3S18,4.7,18,3z"/>
</svg>`
})
export class IconMoreComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
