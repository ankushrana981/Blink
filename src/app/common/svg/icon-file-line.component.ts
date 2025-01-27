import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-file-line]',
    standalone:false,
    template: `<svg version="1.1" class="icon-file-line" id="IconFileLine" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 16 18" style="enable-background:new 0 0 16 18;" xml:space="preserve">
    <path class="icon-file-line" d="M14,18H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h7.3v4.8c0,1.1,0.9,2,2,2H15V17C15,17.6,14.6,18,14,18z M1.5,16.5
	h12V8.3h-3.3c-1.9,0-3.5-1.6-3.5-3.5V1.5H1.5V16.5z M9.4,0v4.5c0,0.6,0.4,1,1,1H15L9.4,0z"/>
</svg>`
})
export class IconFileLineComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
