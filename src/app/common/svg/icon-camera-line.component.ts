import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-camera-line]',
    standalone:false,
    template: `<svg version="1.1" id="IconCameraLine" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 16 13" style="enable-background:new 0 0 16 13;" xml:space="preserve">
<path class="icon-camera-line" d="M14,1H6c0-0.5-0.5-1-1-1H3C2.5,0,2,0.5,2,1C0.9,1,0,1.9,0,3v8c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V3
   C16,1.9,15.1,1,14,1z M14.5,11c0,0.3-0.2,0.5-0.5,0.5H2c-0.3,0-0.5-0.2-0.5-0.5V3c0-0.3,0.2-0.5,0.5-0.5h12c0.3,0,0.5,0.2,0.5,0.5
   V11z M8,10c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S9.7,10,8,10z M8,5.5C7.2,5.5,6.5,6.2,6.5,7S7.2,8.5,8,8.5S9.5,7.8,9.5,7
   S8.8,5.5,8,5.5z"/>
</svg>`
})
export class IconCameraLineComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
