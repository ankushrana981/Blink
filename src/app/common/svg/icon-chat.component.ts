import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-chat]',
    standalone:false,
    template: `<svg version="1.1" class="icon-chat" id="icon-chat" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 30 23" style="enable-background:new 0 0 30 23;" xml:space="preserve">
<path class="st0" d="M30,7v6c0,3.9-3.1,7-7,7h-6.8c-1.1,0-2.2,0.3-3.1,0.7L8.5,23l-0.3-2.2C8.2,20.5,8,20,7.4,20H6.5
   C2.9,20,0,17.1,0,13.5V7c0-3.9,3.1-7,7-7h16C26.9,0,30,3.1,30,7z"/>
</svg>`
})
export class IconChatComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
