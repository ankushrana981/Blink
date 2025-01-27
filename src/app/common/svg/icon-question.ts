import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: '[icon-question]',
    standalone:false,
    template: `<svg width="71" height="61" viewBox="0 0 71 61" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35.0607 0L65.4242 45.75H4.69725L35.0607 0Z" fill="#F1F0F5"/>
    <path d="M32.4805 15.0156H37.6853L37.1648 31.671H33.0009L32.4805 15.0156Z" fill="#A0A3B9"/>
    <circle cx="35.0824" cy="37.1161" r="2.60241" fill="#A0A3B9"/>
    </svg>`
})
export class IconQuestionComponent implements OnInit {

    constructor(
        public router: Router,
    ) { }

    ngOnInit() {
    }

}