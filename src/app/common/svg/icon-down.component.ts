import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-down]',
    standalone:false,
    template: `<svg version="1.1" class="icon-down" id="IconDown" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 15 8.4" style="enable-background:new 0 0 15 8.4;" xml:space="preserve">
<path class="icon-down" d="M14.7,1.7l-6.5,6L7.5,8.4L6.8,7.7l-6.5-6c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l5.8,5.4l5.8-5.4
   c0.4-0.4,1-0.4,1.4,0C15.1,0.7,15.1,1.4,14.7,1.7z"/>
</svg>`
})
export class IconDownComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
