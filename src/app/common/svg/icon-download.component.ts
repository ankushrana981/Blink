import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-download]',
    standalone:false,
    template: `<svg version="1.1" class="icon-download" id="IconDownload" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 15 16" style="enable-background:new 0 0 15 16;" xml:space="preserve">
<path class="st0" d="M15,0H0v1.4h15V0z M1.2,10.8L7.5,16l6.3-5.2l-1-1.1l-4.6,3.8V3.9H6.8v9.6L2.2,9.7L1.2,10.8z"/>
</svg>`
})
export class IconDownloadComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
