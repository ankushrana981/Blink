import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-cross]',
    standalone:false,
    template: `<svg version="1.1" id="IconCross" class="icon-cross" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 18.4 18.4" style="enable-background:new 0 0 18.4 18.4;" xml:space="preserve">
<polygon class="st0" points="17,18.4 9.2,10.6 1.4,18.4 0,17 7.8,9.2 0,1.4 1.4,0 9.2,7.8 17,0 18.4,1.4 10.6,9.2 18.4,17 "/>
</svg>`
})
export class IconCrossComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
