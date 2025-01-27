import { Component, OnInit } from '@angular/core';

@Component({
    selector: '[app-task-list]',
    standalone:false,
    templateUrl: './task-list.component.html',
    styles: []
})
export class TaskListComponent implements OnInit {

    follow: boolean = false;

    public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true, wheelSpeed: 4 };

    constructor() { }

    ngOnInit() {
    }

    followClick() {
        this.follow = true
    }   
    followClose(event) {
        event.stopPropagation();
        this.follow = false
    }   


}
