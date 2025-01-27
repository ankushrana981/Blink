import { Component, OnInit, Output, Injector, HostListener, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BaseComponent } from '../../common/commonComponent';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonService } from '../../common/common.service';
import { Subject, Observable, of, concat } from 'rxjs';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, delay, map, startWith, mergeMap } from 'rxjs/operators';

@Component({
    selector: '[app-updatedue-date]',
    standalone:false,
    templateUrl: './updatedue-date.component.html',
    styles: []
})
export class UpdateDueDateComponent extends BaseComponent implements OnInit {
    @Input() taskData: any = {};
   
    taskDataObj: any = {};

    @Output() updateTheParentGrid: EventEmitter<number> = new EventEmitter();

    isShowAssociatedTask: boolean = false;
    subListTask: string = '';
    subListTaskData = {}
    assignToData = null;
    presetActivity = {};
    selectedSubListTaskVal = {}
    createedDate: boolean = false;
    dueDate: boolean = true;
    taskdueDate: boolean = false;
    tempdueDate: boolean = false;

    addForm: FormGroup;
    submitted: boolean = false;
    addTaskForm: FormGroup;
    submittedTask: boolean = false;
    assignto: boolean = false;
    assigntosub: boolean = false;
    dt: any;

    selectedCreatedDate: any;
    showSubTask: boolean = false;
    firstTime: boolean = true;
    count: number = 0;
    created_Date: any = new Date();
    due_date: any = new Date();
    due_date_Temp: any = new Date();
    subTask_due_date: any = new Date();
    public accessLevel: number;
    public currentBranch: any;

    public boardListNew: Observable<any>;
    public boardListLoading: boolean = false;
    public MainSearchdataSourceClient = new Subject<string>();
    isOpenBoard = false;
    board = "";
    @ViewChild('taskform') aForm: ElementRef;

    constructor(
        inj: Injector,
        private datePipe: DatePipe
    ) {
        super(inj);
    }

    @Output() closeClick = new EventEmitter();

    closeTask() {
        this.closeClick.emit("close"); // Pass any payload as argument
    }

    bsConfig: Partial<BsDatepickerConfig>;

    ngOnInit() {
        debugger
        this.bsConfig = Object.assign({}, { containerClass: 'custom-picker theme-white theme-green', adaptivePosition: true, dateInputFormat: 'MM DD,YYYY' });
     
        this.Floaty();

    
        //this.taskData.id = 4170;
        if (this.taskData != undefined && this.taskData != null && this.taskData.taskData != undefined && this.taskData.taskData != null) {
            //this.GetTask();
            this.taskDataObj = Object.assign({}, this.taskData.taskData);
        }





        this.commonService.getCurrentUser().then((user) => {
            this.accessLevel = this.lookupService.getNumericAccessLevel(user.tenant.accessLevel);
        });


    }

    ngAfterViewInit(): void {
        debugger
        this.due_date = this.datePipe.transform(this.taskDataObj.dueDate, "MMM d, y");
        this.due_date_Temp = new Date(this.taskDataObj.dueDate);
        setTimeout(() => {
            this.dueDate = true;
        });
        
    }



    applyTheme(pop: any) {
        setTimeout(() => {
            pop.show();
        });
    }

    btnSaveDueDate() {
        debugger
        this.taskDataObj.dueDate = this.due_date_Temp;
        
        if (this.taskDataObj != undefined && this.taskDataObj != null && this.taskDataObj.id > 0) {
            this.commonService.callApi('api/clients/tasks/' + this.taskDataObj.id, this.taskDataObj, 'put').then(success => {
                if (success) {
                    debugger
                    this.updateTheParentGrid.emit(success);
                    this.closeTask();
                } else {
                    this.popToast('error', success.message)
                }
            }).catch((e) => {
                console.log("there is an error:", e)
            })
        }
   

    }
    override popToast(arg0: string, message: any) {
        throw new Error('Method not implemented.');
    }
    // Floating label
    Floaty = () => {
        function onFocus() {
            setLabelActive(this.floatingLabel);
        }
        function onBlur() {
            setLabel(this);
        }
        function setLabelActive(label) {
            label.classList.add('active');
        }
        function setLabelInactive(label) {
            label.classList.remove('active');
        }
        function setLabel(input: any = {}) {
            if (input.value && input.value.length) {
                setLabelActive(input.floatingLabel);
            } else {
                setLabelInactive(input.floatingLabel);
            }
        }
        const inputs = [].slice.call(document.querySelectorAll('[floating-label]'));
        inputs.forEach(input => {
            const inputId = input.id,
                placeholder = input.getAttribute('floating-label');

            let labelEl = document.createElement('label');

            labelEl.setAttribute('for', inputId);
            labelEl.innerHTML = placeholder;
            labelEl.classList.add('floating-label');

            input.floatingLabel = labelEl;
            input.parentNode.appendChild(labelEl);

            input.addEventListener('focus', onFocus);
            input.addEventListener('blur', onBlur);

            setLabel(input);
        });
    }

    
   
    dueDateClick() {
        this.dueDate = true;
    }
    
   
    dueDateClose() {
        this.dueDate = false;
    }
    
    


    dueDateValueChange(e, bsConfig) {

        //&& this.addForm.get('due_date').value != ""
        if (!bsConfig.adaptivePosition) {
            this.due_date = this.datePipe.transform(e, "MMM d, y");
            this.dueDate = false;
            this.due_date_Temp = e;
            bsConfig.adaptivePosition = true;
            event.stopPropagation();

        }
        else {
            bsConfig.adaptivePosition = undefined
            //this.due_date = new Date();
            event.stopPropagation();
        }

       
    }


}
