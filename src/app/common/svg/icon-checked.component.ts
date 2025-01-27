import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-checked]',
    standalone:false,
    template: `<svg version="1.1" class="icon-checked" id="icon-checked" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 10.3 7.3" style="enable-background:new 0 0 10.3 7.3;" xml:space="preserve">
<polygon class="st0" points="4.1,7.3 0,3.2 1.1,2.1 4.1,5.2 9.3,0 10.3,1.1 "/>
</svg>`
})
export class IconCheckedComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}