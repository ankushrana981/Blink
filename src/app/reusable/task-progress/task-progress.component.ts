import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
    selector: '[app-task-progress]',
    standalone:false,
    templateUrl: './task-progress.component.html',
    styles: []
})
export class TaskProgressComponent implements OnInit {

    @Output() someEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

}
