import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-pluse-round]',
    standalone:false,
    template: `<svg class="icon-pluse-round" version="1.1" id="IconPluseRound" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
<path class="st0" d="M9.5,5c0-0.3-0.2-0.5-0.5-0.5S8.5,4.7,8.5,5v3.5H5C4.7,8.5,4.5,8.7,4.5,9S4.7,9.5,5,9.5h3.5V13
   c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V9.5H13c0.3,0,0.5-0.2,0.5-0.5S13.3,8.5,13,8.5H9.5V5z M9,0C4,0,0,4,0,9s4,9,9,9s9-4,9-9
   S14,0,9,0z M9,17c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S13.4,17,9,17z"/>
</svg>`
})
export class IconPluseRoundComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
