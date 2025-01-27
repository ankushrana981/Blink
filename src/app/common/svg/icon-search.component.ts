import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-search]',
    standalone:false,
    template: `<svg class="icon-search" version="1.1" id="IconSearch" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
<path class="icon-search" d="M12.2,11.5c1.1-1.2,1.7-2.8,1.7-4.6c0-3.9-3.1-7-7-7C3.1,0,0,3.1,0,7c0,3.9,3.1,7,7,7c1.7,0,3.3-0.6,4.6-1.7
   l5.7,5.7l0,0l0.7-0.7L12.2,11.5z M13,7c0,3.3-2.7,6-6,6c-3.3,0-6-2.7-6-6c0-3.3,2.7-6,6-6C10.3,1,13,3.7,13,7z"/>
</svg>`
})
export class IconSearchComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
