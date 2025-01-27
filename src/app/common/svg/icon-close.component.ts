import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-close]',
    standalone:false,
    template: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 18.8 18.8" style="enable-background:new 0 0 18.8 18.8;" xml:space="preserve">
<polygon class="st0" points="18,18.8 9.4,10.3 0.8,18.8 0,18 8.6,9.4 0,0.8 0.8,0 9.4,8.6 18,0 18.8,0.8 10.3,9.4 18.8,18 "/>
</svg>`
})
export class IconCloseComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}