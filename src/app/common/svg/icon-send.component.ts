import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-send]',
    standalone:false,
    template: `<svg class="icon-send" id="IconSend" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 22 19" style="enable-background:new 0 0 22 19;" xml:space="preserve">
<path class="st0" d="M0,19l22-9.5L0,0v7.4l15.7,2.1L0,11.6V19z"/>
</svg>`
})
export class IconSendComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
