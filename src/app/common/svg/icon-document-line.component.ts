import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-document-line]',
    standalone:false,
    template: `<svg version="1.1" class="icon-document-line" id="IconDocumentLine" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 16 19" style="enable-background:new 0 0 16 19;" xml:space="preserve">
<path class="icon-document-line" d="M11.4,8.2c0-0.4-0.3-0.7-0.7-0.7H3.5c-0.4,0-0.7,0.3-0.7,0.7c0,0.4,0.3,0.7,0.7,0.7h7.2
   C11.1,8.9,11.4,8.6,11.4,8.2z M3.5,10.4c-0.4,0-0.7,0.3-0.7,0.7s0.3,0.7,0.7,0.7h4.4c0.4,0,0.7-0.3,0.7-0.7s-0.3-0.7-0.7-0.7H3.5z
    M5.1,17.5H2.8c-0.8,0-1.4-0.7-1.4-1.5V3c0-0.8,0.6-1.5,1.4-1.5h8.6c0.8,0,1.4,0.7,1.4,1.5v4.6c0,0.4,0.3,0.7,0.7,0.7
   c0.4,0,0.7-0.3,0.7-0.7V3c0-1.6-1.3-3-2.8-3H2.8C1.3,0,0,1.3,0,3V16c0,1.6,1.3,3,2.8,3h2.3c0.4,0,0.7-0.3,0.7-0.7
   C5.8,17.8,5.5,17.5,5.1,17.5z M15.4,10.7c-0.8-0.9-2.1-0.9-3,0l-3.8,4.1c-0.1,0.1-0.1,0.2-0.2,0.3L7.6,18c-0.1,0.3,0,0.5,0.2,0.7
   C7.9,18.9,8.1,19,8.3,19c0.1,0,0.1,0,0.2,0l2.8-0.8c0.1,0,0.2-0.1,0.3-0.2l3.8-4.1C16.2,13,16.2,11.6,15.4,10.7z M10.7,16.8
   l-1.4,0.4l0.4-1.5l2.6-2.7l1,1L10.7,16.8z M14.4,12.8L14.3,13l-1-1l0.1-0.1c0.3-0.3,0.7-0.3,1,0C14.7,12.1,14.7,12.6,14.4,12.8z
    M10.7,4.5H3.5c-0.4,0-0.7,0.3-0.7,0.7c0,0.4,0.3,0.7,0.7,0.7h7.2c0.4,0,0.7-0.3,0.7-0.7C11.4,4.8,11.1,4.5,10.7,4.5z"/>
</svg>`
})
export class IconDocumentLineComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
