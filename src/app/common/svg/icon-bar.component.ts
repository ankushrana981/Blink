import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-bar]',
    standalone:false,
    template: `<svg version="1.1" class="icon-bar" id="icon-bar" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 21 16" style="enable-background:new 0 0 21 16;" xml:space="preserve">
<path class="icon-bar" d="M6,0h14c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1H6C5.4,2,5,1.6,5,1l0,0C5,0.4,5.4,0,6,0z M1,14h14c0.6,0,1,0.4,1,1
   l0,0c0,0.6-0.4,1-1,1H1c-0.6,0-1-0.4-1-1l0,0C0,14.4,0.4,14,1,14z M1,7h19c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1H1C0.4,9,0,8.6,0,8
   l0,0C0,7.4,0.4,7,1,7z M1,0h1c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1H1C0.4,2,0,1.6,0,1l0,0C0,0.4,0.4,0,1,0z M19,14h1
   c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1h-1c-0.6,0-1-0.4-1-1l0,0C18,14.4,18.4,14,19,14z"/>
</svg>`
})
export class IconBarComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
