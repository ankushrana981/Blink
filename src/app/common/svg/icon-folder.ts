import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-folder]',
    standalone:false,
    template: `<svg width="15" height="16" class="icon-folder" id="IconFolder" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="11" height="4.30769" rx="2" fill="#3F5270"/>
<rect y="2" width="15" height="11" fill="#3F5270"/>
<path d="M0 14H7.5H15V16H0V14Z" fill="#3F5270"/>
</svg>
`
})
export class IconFolderComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}
