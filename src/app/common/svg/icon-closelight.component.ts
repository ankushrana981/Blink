import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-closelight]',
    standalone:false,
    template: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L15 15M15 1L1 15" stroke="#D2DDEC" stroke-width="2"/>
    </svg>`
})
export class IconCloseLight implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}



 