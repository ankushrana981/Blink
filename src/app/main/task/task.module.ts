import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../reusable/shared/shared.module'
// import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { TasksComponent } from './tasks/tasks.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
// import { ModalModule as NgModalDragg } from 'ng-modal-lib';
import { AccordionDirective } from '../../reusable/directives/accordian.directives';
import {DragDropModule} from '@angular/cdk/drag-drop';
// import { AngularResizedEventModule } from 'angular-resize-event';
import { NgxPageScrollModule } from 'ngx-page-scroll';
// import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { UniquePipe } from './unique-pipe';
// import { DndModule } from 'ngx-drag-drop';

// import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true
// };

@NgModule({
    declarations: [
        TasksComponent,
        ViewTasksComponent,
        UniquePipe,
        AccordionDirective
    ],
    imports: [
        CommonModule, SharedModule,
    
        // MalihuScrollbarModule.forRoot(),
        ModalModule.forRoot(),
        NgSelectModule,
        // NgModalDragg,
        // DndModule,
        NgxPageScrollModule,
        // ScrollToModule.forRoot(),
        // PerfectScrollbarModule,
        DragDropModule,
        // AngularResizedEventModule,
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
    ],
    // providers:[{
    //     provide: PERFECT_SCROLLBAR_CONFIG,
    //     useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // }]
})
export class TaskModule { }
