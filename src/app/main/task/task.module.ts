import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../reusable/shared/shared.module'
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { TasksComponent } from './tasks/tasks.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { ModalModule as NgModalDragg } from 'ng-modal-lib';
import { AccordionDirective } from '../../reusable/directives/accordian.directives';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AngularResizeEventModule } from 'angular-resize-event';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { UniquePipe } from './unique-pipe';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DndModule } from 'ngx-drag-drop';

@NgModule({
    declarations: [
        TasksComponent,
        ViewTasksComponent,
        UniquePipe,
        AccordionDirective
    ],
    imports: [
        CommonModule, SharedModule,

        ModalModule.forRoot(),
        NgSelectModule,
        NgModalDragg,
        DndModule,
        NgxPageScrollModule,
        NgScrollbarModule,
        DragDropModule,
        AngularResizeEventModule,
        RouterModule.forChild(
            [
                {
                    path: '',
                    redirectTo: 'task',
                    pathMatch: 'full'
                },
                {
                    path: 'dashboard',
                    component: TasksComponent,
                    pathMatch: 'full'
                },
                {
                    path: 'view',
                    component: ViewTasksComponent,
                    pathMatch: 'full'
                }
            ]
        )
    ]
})
export class TaskModule { }
