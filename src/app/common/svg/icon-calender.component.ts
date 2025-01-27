import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-calender]',
    standalone:false,
    template: `<svg version="1.1" class="icon-calender" id="icon-calender" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 21 21" style="enable-background:new 0 0 21 21;" xml:space="preserve">
<path class="st0" d="M16,16v1h1v-1H16z M13,16v1h1v-1H13z M10,16v1h1v-1H10z M7,16v1h1v-1H7z M4,16v1h1v-1H4z M16,13v1h1v-1H16z
    M13,13v1h1v-1H13z M10,13v1h1v-1H10z M7,13v1h1v-1H7z M4,13v1h1v-1H4z M16,10v1h1v-1H16z M13,10v1h1v-1H13z M10,10v1h1v-1H10z
    M7,10v1h1v-1H7z M4,10v1h1v-1H4z M16,17h1v-1h-1V17z M16,14h1v-1h-1V14z M16,10v1h1v-1H16z M13,17h1v-1h-1V17z M13,14h1v-1h-1V14z
    M13,11h1v-1h-1V11z M10,17h1v-1h-1V17z M10,14h1v-1h-1V14z M10,11h1v-1h-1V11z M7,17h1v-1H7V17z M7,14h1v-1H7V14z M7,11h1v-1H7V11z
    M4,17h1v-1H4V17z M4,14h1v-1H4V14z M4,11h1v-1H4V11z M16,17h1v-1h-1V17z M16,14h1v-1h-1V14z M16,10v1h1v-1H16z M13,17h1v-1h-1V17z
    M13,14h1v-1h-1V14z M13,11h1v-1h-1V11z M10,17h1v-1h-1V17z M10,14h1v-1h-1V14z M10,11h1v-1h-1V11z M7,17h1v-1H7V17z M7,14h1v-1H7
   V14z M7,11h1v-1H7V11z M4,17h1v-1H4V17z M4,14h1v-1H4V14z M4,11h1v-1H4V11z M18,2V0h-1v2H4V0H3v2C1.3,2,0,3.3,0,5v13
   c0,1.7,1.3,3,3,3h15c1.7,0,3-1.3,3-3V5C21,3.3,19.7,2,18,2z M20,18c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7h19V18z M1,6V5
   c0-1.1,0.9-2,2-2h15c1.1,0,2,0.9,2,2v1H1z"/>
</svg>`
})
export class IconCalenderComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
