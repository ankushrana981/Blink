import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-pluse]',
    standalone:false,
    template: `<svg version="1.1" class="icon-pluse" id="IconPluse" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 12 12" style="enable-background:new 0 0 12 12;" xml:space="preserve">
<polygon class="st0" points="7,12 5,12 5,7 0,7 0,5 5,5 5,0 7,0 7,5 12,5 12,7 7,7 "/>
</svg>`
})
export class IconPluseComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
