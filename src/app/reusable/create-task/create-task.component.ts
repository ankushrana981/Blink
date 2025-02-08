import {
    Component,
    OnInit,
    Output,
    Injector,
    HostListener,
    EventEmitter,
    Input,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
    TemplateRef,
} from "@angular/core";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { BaseComponent } from "../../common/commonComponent";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BsModalRef } from "ngx-bootstrap/modal";
import { DatePipe } from "@angular/common";
import { CommonService } from "../../common/common.service";
import { Subject, Observable, of, concat } from "rxjs";
import {
    distinctUntilChanged,
    debounceTime,
    switchMap,
    tap,
    catchError,
    delay,
    map,
    startWith,
    mergeMap,
} from "rxjs/operators";

@Component({
    selector: "[app-create-task]",
    standalone:false,
    templateUrl: "./create-task.component.html",
    styles: [],
})
export class CreateTaskComponent extends BaseComponent implements OnInit {
    @ViewChild('subTitle') subTitle!: ElementRef;
    stop(event: MouseEvent) {
        event.stopPropagation();
      }
    modalRef: BsModalRef;
    @Input() isSubtaskOpen: boolean = false;
    @Input() isSubtask: boolean = false;
    @Input() isEditTask: boolean = false;
    @Input() taskData: any = {};
    @Input() isRefreshGrid: boolean = false;
    @Output() refreshTheParentGrid: EventEmitter<number> = new EventEmitter();
    @Output() updateTheParentGrid: EventEmitter<number> = new EventEmitter();
    @ViewChild('closePreventionPopup') closePreventionPopup: TemplateRef<any>;
    @ViewChild('savedPopUp') savedPopUp: TemplateRef<any>;
    taskDataObj: any = {};
    copyTaskDataObj: any = {};
    isShowAssociatedTask: boolean = false;
    subListTask: string = "General";
    subListTaskData = {};
    assignToData = null;
    presetActivity = {};
    selectedSubListTaskVal:any = {};
    createedDate: boolean = false;
    dueDate: boolean = false;
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
    subTask_due_date: any = new Date();
    public accessLevel: number;
    public currentBranch: any;
    public boardListNew: Observable<any>;
    public boardListLoading: boolean = false;
    public MainSearchdataSourceClient = new Subject<string>();
    isOpenBoard = false;
    board = "";
    subTaskTabSelection: any = "";
    subTaskTabDisplayTitle: any = "";
    addTaskQueryForm: FormGroup;
    openSubTaskChatData: any = [];
    addTaskChatForm: FormGroup;
    imageDataLoaded: boolean = false;
    addedTaskDetailsList: any = [];
    showAddedTaskDetailsList: boolean = true;
    showAddTaskDetailsForm: boolean = false;
    openPopupTaskId: number = 0;
    openPopupSubTaskId: number = 0;
    openPopupBoardName: any = "";
    openPopupTaskDescription: any = "";
    openThisSection = "";
    addTaskDetailsForm: FormGroup;
    public scrollbarOptionsTaskNewUI = {
        axis: "y",
        theme: "light",
        scrollbarPosition: "inside",
        autoHideScrollbar: true,
        callbacks: {
            onTotalScroll: () => { },
            onTotalScrollOffset: 200,
            alwaysTriggerOffsets: false,
        },
    };
    isDeleteOpen: boolean = false;
    delSubTaskChatShowId = 0;
    taskDetailsViewData: any = {};
    fileList: any = [];
    uploadedFileSource: any;
    duplicateAddTaskForm: any;
    preventionPopupText = ""
    preventionPopupTitle = ""
    @ViewChild("taskform") aForm: ElementRef;
    confirmationBoxOpen = false;
    constructor(inj: Injector, private datePipe: DatePipe, private cdr: ChangeDetectorRef) {
        super(inj);
    }

    @Output() closeClick = new EventEmitter();
    @HostListener('document:mousedown', ['$event'])
    mouseEvent(event: MouseEvent) {
        if(event){
            let element = (event.target as HTMLInputElement);
            if(element.children && element.children.length>0){
                let isOutsideOfThePopUp = element.children[0].classList.contains("create-task");
                if(isOutsideOfThePopUp){
                    this.closeTask();
                    // If mouse clicks open the Prevention popup unintensionally please comment this.closeTask(); above line
                }
            }
        }
    }
    closeTask() {
        if(!this.confirmationBoxOpen){
            if(this.isSubtask || this.isSubtaskOpen){
                if(this.checkChangesInSubtask()){
                    this.preventionPopupTitle = "Edit Pending";
                    this.preventionPopupText = "You are about to cancel your edit, please confirm that you are exiting this page";
                    if(this.modalRef){
                        this.modalRef.hide();
                    }
                    this.confirmationBoxOpen = true;
                    this.modalRef = this.modalService.show(this.closePreventionPopup, {
                        class: "modal-dialog-centered quick-popup close-prevention-view-popup",
                        backdrop : 'static',
                        keyboard : false
                    });
                }
                else{
                    this.closeClick.emit({taskList : this.taskList}); // Pass any payload as argument
                }
            }
            else{
                this.closeClick.emit('Close')
            }
        }
    }
    closeSubTask(){
        if(this.isSubtask || this.isSubtaskOpen){
            this.closeClick.emit({taskList : this.taskList});
        }
        else{
            this.closeClick.emit('Close');
        }
    }
    closeConfirmationBox(){
        this.modalRef.hide();
        this.confirmationBoxOpen = false;
    }
    saveConfirmationBox(){
        this.preventionPopupTitle = "Edit Saved";
        if(this.modalRef){
            this.modalRef.hide();
        }   
        this.confirmationBoxOpen = true;
        this.modalRef = this.modalService.show(this.savedPopUp, {
            class: "modal-dialog-centered quick-popup save-view-popup",
            backdrop : 'static',
            keyboard : false
        });
    }
    bsConfig: Partial<BsDatepickerConfig>;
    bsConfigCreated_Date: Partial<BsDatepickerConfig>;
    bsConfigSubTask: Partial<BsDatepickerConfig>;

    public scrollbarOptions = {
        axis: "y",
        theme: "minimal-dark",
        autoHideScrollbar: true,
        wheelSpeed: 4,
    };

    tasks: any;
    saveButton: any;
    nextButton: any;
    mouseOnHover = 0;
    taskList: any;
    titles: any[] = [];
    subTaskList: any[] = [];
    users: any[] = [];
    boardList: any[] = [];
    tempboardListData: any[] = [];
    setp1: boolean = true;
    setp2: boolean = false;
    setp3: boolean = false;
    tabletask: boolean = true;
    createtask: boolean = false;
    delSubShowId = 0;
    isSaveButtonDisabled = false;
    ngOnInit() {
        this.bsConfig = Object.assign(
            {},
            {
                containerClass: "custom-picker theme-white theme-green",
                adaptivePosition: true,
                dateInputFormat: "MM DD,YYYY",
            }
        );
        this.bsConfigCreated_Date = Object.assign(
            {},
            {
                containerClass: "custom-picker theme-white theme-green",
                adaptivePosition: true,
                dateInputFormat: "MM DD,YYYY",
            }
        );

        this.bsConfigSubTask = Object.assign(
            {},
            {
                containerClass: "custom-picker theme-white theme-green",
                adaptivePosition: true,
                dateInputFormat: "MM DD,YYYY",
            }
        );

        this.Floaty();
        this.addForm = new FormGroup({
            dateOfEntry: new FormControl("", [Validators.required]),
            dueDate: new FormControl(),
            type: new FormControl(1),
            board: new FormControl(),
            boardName: new FormControl(null, [Validators.required]),
            title: new FormControl(),
            subTitle: new FormControl(),
            note: new FormControl(),
            user: new FormControl(),
            associatedUserIds: new FormControl(),
            selectedSubListTaskVal: new FormControl(),
            dueDateTemp: new FormControl(),
            dateOfEntryTemp: new FormControl(),
        });
        this.addTaskForm = new FormGroup({
            description: new FormControl("", [Validators.required]),
            dueDate: new FormControl(),
            dueDateTemp: new FormControl(),
            assignedToIds: new FormControl(),
            id: new FormControl(),
        });
        this.tasks = this.lookupService.getTaskTypeList();
        this.tasks = this.tasks.filter((X) => X.id === 1);
        this.taskList = this.taskData.listOfTask;
        this.refreshTaskList();
        if (
            this.taskData != undefined &&
            this.taskData != null &&
            this.taskData.taskData != undefined &&
            this.taskData.taskData != null
        ) {
            this.taskDataObj = Object.assign({}, this.taskData.taskData);
            this.copyTaskDataObj = Object.assign({}, this.taskData.taskData);
        }
        if (this.isSubtaskOpen) {
            this.setpTwo();
        }
        let vm = this;
        // $(".scrollbar").mCustomScrollbar({
        //     callbacks: {
        //         onScrollStart: function () {
        //             vm.subDeleteDropdownClose();
        //         },
        //     },
        // });
        $(".task-modal [app-create-task] .task-body").on("scroll", function () {
            if (scroll) {
                vm.subDeleteDropdownClose();
            }
        });
        this.saveButtonNextButtonHover();
        this.refreshPresetActivities();
        this.refreshUsers();
        this.commonService.getCurrentUser().then((user) => {
            this.accessLevel = this.lookupService.getNumericAccessLevel(
                user.tenant.accessLevel
            );
        });
        this.isRefreshGrid = true;
        this.getBoardList();
        this.storeAddTaskForm();
    }

    ngAfterViewInit(): void {
        this.addForm
            .get("dateOfEntry")
            .setValue(this.datePipe.transform(new Date(), "MMM d, y"));
        this.addForm.get("dateOfEntryTemp").setValue(new Date());
        var pastDate = this.due_date.getDate() + 7;
        this.due_date.setDate(pastDate);
        if (this.taskDataObj.id != undefined && this.taskDataObj.id != null) {
            this.showEditTask();
        }
        if (
            this.taskData.subTaskData != undefined &&
            this.taskData.subTaskData != null &&
            this.taskData.subTaskData.id > 0
        ) {
            this.editSubTask(this.taskData.subTaskData);
        }
        if (this.isSubtaskOpen) {
            this.setpTwo();
            this.createTaskClick();
            this.assigntosub = false;
            this.tabletask = false;
            setTimeout(() => {
                $("#txtDescription").focus();
            });
        }
        this.cdr.detectChanges();
    }
    refreshPresetActivities() {
        this.commonService
            .callApi("api/tenants/presetactivities/lookup?q=", "", "get")
            .then((success) => {
                if (success) {
                    console.log(this.titles, "titles")
                    this.titles = success;
                } else {
                    this.popToast("error", success.message);
                }
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });
    }
    refreshTaskList(){
        var queryParams ="q="
        this.commonService.getViewTasksList(queryParams)
            .then((success) => {
                if (success) {
                    this.taskList = success.records;
                    this.taskList.forEach((element) => {
                        element.active = false;
                    });
                }
                else {
                   this.popToast("error", success.message);
                }
            });
    }
    refreshUsers() {
        this.commonService
            .callApi("api/clients/tasks/getAssignedUsers?q=", "", "get")
            .then((success) => {
                if (success) {
                    this.users = success;
                } else {
                    this.popToast("error", success.message);
                }
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });
    }
    showEditTask() {
        this.addForm
            .get("dateOfEntry")
            .setValue(
                this.datePipe.transform(this.taskDataObj.dateOfEntry, "MMM d, y")
            );
        this.addForm.get("dateOfEntryTemp").setValue(this.taskDataObj.dateOfEntry);
        this.created_Date = new Date(this.taskDataObj.dateOfEntry);

        this.addForm
            .get("dueDate")
            .setValue(this.datePipe.transform(this.taskDataObj.dueDate, "MMM d, y"));
        this.addForm.get("dueDateTemp").setValue(this.taskDataObj.dueDate);
        this.due_date = new Date(this.taskDataObj.dueDate);

        this.addForm.get("type").setValue(this.taskDataObj.type);

        this.subListTaskData = this.tasks.find(
            (x) => x.id == this.taskDataObj.type
        );
        if (this.subListTaskData != undefined && this.subListTaskData != null) {
            this.subListTask = this.subListTaskData["title"];
        }

        this.addForm.get("board").setValue(this.taskDataObj.board);
        this.addForm.get("boardName").setValue(this.taskDataObj.board);

        this.presetActivity = Object.assign({}, this.taskDataObj.presetActivity);
        if (
            this.taskDataObj.presetActivity != null &&
            this.taskDataObj.presetActivity != undefined
        ) {
            this.addForm.get("title").setValue(this.taskDataObj.presetActivity.id);
        }

        this.addForm.get("subTitle").setValue(this.taskDataObj.subTitle);
        this.addForm.get("note").setValue(this.taskDataObj.note);

        if (this.taskDataObj.user != null && this.taskDataObj.user != undefined) {
            this.addForm.get("user").setValue(this.taskDataObj.user.id);
            this.assignToData = Object.assign({}, this.taskDataObj.user);
        }

        if (
            this.taskDataObj.associatedUserIds != null &&
            this.taskDataObj.associatedUserIds != undefined
        ) {
            var associatedUserIds = this.taskDataObj.associatedUserIds
                .split(",")
                .map(Number);
            this.addForm.get("associatedUserIds").setValue(associatedUserIds);
            this.assignto = true;
        } else {
            this.assignto = false;
        }

        if (
            this.taskDataObj.product != null &&
            this.taskDataObj.product != undefined
        ) {
            this.selectedSubListTaskVal = this.taskDataObj.product;
        }
        if (
            this.taskDataObj.businessPartner != null &&
            this.taskDataObj.businessPartner != undefined
        ) {
            this.selectedSubListTaskVal = this.taskDataObj.businessPartner;
        }
        if (this.taskDataObj.type == 2) {
            this.getCustomers();
        } else if (this.taskDataObj.type == 7) {
            this.getContact();
        } else if (this.taskDataObj.type == 6) {
            this.getCompany();
        } else if (this.taskDataObj.type == 4) {
            this.getProduct();
        } else {
            this.addForm.get("title").clearValidators();
            this.addForm.get("title").updateValueAndValidity();
            this.getBoardList();
        }
    }

    openRightSubPart() {
        this.showSubTask = true;
    }

    editSubTask(subTaskData) {
        this.setpTwo();
        this.tabletask = false;
        this.addTaskForm.get("description").setValue(subTaskData.title);
        this.addTaskForm
            .get("dueDate")
            .setValue(this.datePipe.transform(subTaskData.dueDate));
        this.addTaskForm
            .get("dueDateTemp")
            .setValue(this.datePipe.transform(subTaskData.dueDate));
        this.addTaskForm.get("id").setValue(subTaskData.id);
        this.subTask_due_date = new Date(subTaskData.dueDate);
        if (
            subTaskData.assignedToIds != undefined &&
            subTaskData.assignedToIds != null
        ) {
            var assignedToIds = subTaskData.assignedToIds.split(",").map(Number);
            this.addTaskForm.get("assignedToIds").setValue(assignedToIds);
            this.assigntosub = true;
        } else {
            this.assigntosub = false;
        }
        this.storeAddTaskForm();

        setTimeout(() => {
            $("#txtDescription").focus();
        });
        this.taskdueDate = false;
    }
    storeAddTaskForm(){
        this.duplicateAddTaskForm = this.addTaskForm.value;
        this.duplicateAddTaskForm.cRMTaskId = this.taskDataObj.id;
        this.duplicateAddTaskForm.assignedToIds = this.addTaskForm.value.assignedToIds;
        this.duplicateAddTaskForm.dueDate = this.addTaskForm.value.dueDate;
    }
    isAssignedToSame(){
        if(this.duplicateAddTaskForm.assignedToIds == undefined){
            return this.addTaskForm.value.assignedToIds == undefined;
        }
        else{
            if(this.addTaskForm.value.assignedToIds == undefined || (this.addTaskForm.value.assignedToIds.length !== this.duplicateAddTaskForm.assignedToIds.length)) return false;
            for(let i=0;i<this.addTaskForm.value.assignedToIds.length;i++){
                if(this.addTaskForm.value.assignedToIds[i] !== this.duplicateAddTaskForm.assignedToIds[i]) return false;
            }
            return true;
        }
    }
    checkChangesInSubtask(){
        if(this.duplicateAddTaskForm.description == this.addTaskForm.value.description &&
            this.duplicateAddTaskForm.cRMTaskId == this.taskDataObj.id &&
            this.isAssignedToSame() &&
            this.duplicateAddTaskForm.dueDate == this.addTaskForm.value.dueDate &&
            (this.addTaskDetailsForm == undefined || this.addTaskDetailsForm.value.taskDetailText == "") &&
            (this.addTaskChatForm == undefined || this.addTaskChatForm.value.taskDetailText == "") &&
            (this.addTaskQueryForm == undefined || this.addTaskQueryForm.value.taskDetailText == "")
            ){
                return false;
        }
        return true;
    }
    deleteSubTask(k) {
        this.commonService
            .callApi("api/clients/subtask/" + k.id, "", "delete")
            .then((success) => {
                let itemIndex = this.taskDataObj.subTaskList.findIndex(
                    (item) => item.id == k.id
                );
                this.taskDataObj.subTaskList.splice(itemIndex, 1);
                this.updateTheParentGrid.emit(this.taskDataObj);
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });
    }

    applyTheme(pop: any) {
        setTimeout(() => {
            pop.show();
        });
    }

    setpOne() {
        this.setp1 = true;
        this.setp2 = false;
        this.setp3 = false;
    }
    setpTwo() {
        if (
            this.taskDataObj.id != undefined &&
            this.taskDataObj.id != null &&
            this.subListTask == "General"
        ) {
            this.setp1 = false;
            this.setp2 = true;
            this.setp3 = false;
        }
        else{
            this.setp1 = false;
            this.setp2 = true;
            this.setp3 = false;
        }
    }
    setpThree() {
        this.setp1 = false;
        this.setp2 = false;
        this.setp3 = true;
    }
    taskSelected(task){
        this.taskDataObj = Object.assign({},task);
        this.subTaskTabSelection = "";
    }
    createTaskClick() {
        this.tabletask = !this.tabletask;

        this.addTaskForm = new FormGroup({
            description: new FormControl("", [Validators.required]),
            dueDate: new FormControl("", []),
            dueDateTemp: new FormControl(),
            assignedToIds: new FormControl(),
            id: new FormControl(),
        });
        this.storeAddTaskForm();
        setTimeout(() => {
            $("#txtDescription").focus();
        });
    }
    resetPopupVariables() {
        this.openPopupTaskId = 0;
        this.openPopupSubTaskId = 0;
        this.subTaskTabSelection = "";
        this.subTaskTabDisplayTitle = "";
        this.openPopupBoardName = "";
        this.openPopupTaskDescription = "";
        this.showAddedTaskDetailsList = true;
        this.showAddTaskDetailsForm = false;
        this.imageDataLoaded = false;
    }
    showPopupDetails(type) {
        if(!(this.taskData.subTaskData && this.taskData.subTaskData.id)){
            this.openThisSection = type;
            this.submitSubTask();
        }
        if(this.taskData.subTaskData && this.taskData.subTaskData.id){
            this.openPopupTaskId = this.taskDataObj.id;
            this.openPopupSubTaskId = this.taskData.subTaskData.id;
            this.openPopupBoardName = this.taskDataObj.board;
            this.openPopupTaskDescription = this.taskData.subTaskData.description;
            this.subTaskTabSelection = this.subTaskTabSelection == type ? "" : type;
            if (this.subTaskTabSelection === "query") {
                this.subTaskTabDisplayTitle = "Query Task";
                this.setTaskQueryForm();
                this.getTaskQueryDetails();
            } else if (this.subTaskTabSelection === "chat") {
                this.subTaskTabDisplayTitle = "Task Chat";
                this.getTaskChatDataAndSetForm();
            } else if (this.subTaskTabSelection === "details") {
                this.imageDataLoaded = false;
                this.subTaskTabDisplayTitle = "Task Details";
                this.getAddedTaskDetailsList();
            }
        }
    }
    
    getTaskQueryDetails(){
        let taskId = this.taskDataObj.id;
        this.commonService
            .callApi(`api/clients/taskDashboard/${taskId}`, {}, "get")
            .then((success) => {
                if (success) {
                    this.taskDataObj.relatedTaskList = success.relatedTaskList;
                } else {
                    this.popToast("error", success.message);
                }
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });
    }
    setTaskQueryForm() {
        this.addTaskQueryForm = new FormGroup({
            taskDetailText: new FormControl("", [Validators.required]),
        });
        setTimeout(() => {
            let queryTaskDetailText = document.getElementById('queryTaskDetailText');
            queryTaskDetailText.focus();
        }, 100);
    }
    addTaskQuery() {
        if (this.addTaskQueryForm.valid) {
            this.addTaskQueryForm.setErrors({ invalid: true });
            let sendingData: any = {
                CRMTaskId: this.openPopupTaskId,
                CRMSubTaskId: this.openPopupSubTaskId,
                TaskDetailType: 2,
                TaskDetailText: this.addTaskQueryForm.value.taskDetailText,
            };
            this.commonService
                .callApi("api/clients/addTaskDetail", sendingData, "post")
                .then((success) => {
                    if (success) {
                        let getRecord = this.taskList.find((x) => x.id == this.openPopupTaskId);
                        if (getRecord != undefined && getRecord != null) {
                            let index = this.taskList.indexOf(getRecord);
                            let subTaskRec = this.taskList[index].subTaskList.find((x) => x.id == this.openPopupSubTaskId);
                            if (subTaskRec != undefined && subTaskRec != null) {
                                let subTaskIndex = this.taskList[index].subTaskList.indexOf(subTaskRec);
                                this.taskList[index].subTaskList[subTaskIndex].showQuery = true;
                            }
                        }
                        this.resetPopupVariables();
                        this.addTaskQueryForm.setErrors(null);
                        this.addTaskQueryForm.reset();
                    } else {
                        this.popToast("error", success.message);
                    }
                })
                .catch((e) => {
                    console.log("there is an error:", e);
                });
        }
    }
    getTaskChatDataAndSetForm() {
        if(this.taskData.subTaskData != undefined &&
            this.taskData.subTaskData != null &&
            this.taskData.subTaskData.id > 0){
                this.commonService
                .callApi(
                    "api/clients/getTaskDetailsforType/" +
                    this.taskDataObj.id+
                    "/3/" +
                    this.taskData.subTaskData.id,
                    "",
                    "get"
                )
                .then((success) => {
                    if (success && Object.keys(success).length !== 0) {
                        success = success[0];
                        this.openSubTaskChatData = success.listOfDetails;
                    } else {
                        this.openSubTaskChatData = [];
                    }
                })
                .catch((e) => {
                    console.log("there is an error:", e);
                });
            this.setAddTaskChatForm();
            }
    }
    setAddTaskChatForm() {
        this.addTaskChatForm = new FormGroup({
            taskDetailText: new FormControl("", [Validators.required]),
            mqcId: new FormControl(null)
        });
        setTimeout(() => {
            let taskChatDetailText = document.getElementById('taskChatDetailText');
            taskChatDetailText.focus();
        }, 100);
    }
    setEditSubTaskChat(chatRecord) {
        this.addTaskChatForm = new FormGroup({
            taskDetailText: new FormControl(chatRecord.note, [Validators.required]),
            mqcId: new FormControl(chatRecord.mqcId)
        });
    }
    subTaskChatDeleteDropdownClick(id) {
        this.isDeleteOpen = true;
        this.delSubTaskChatShowId = this.delSubTaskChatShowId == 0 ? id : 0;
    }
    subTaskChatDeleteDropdownClose() {
        this.isDeleteOpen = false;
        this.delSubTaskChatShowId = 0;
    }
    subTaskChatDelete(chatRecord) {
        if (chatRecord != null && chatRecord.mqcId > 0 && this.delSubTaskChatShowId == chatRecord.mqcId) {
            this.commonService
                .callApi("api/clients/deleteTaskDetail/" + chatRecord.mqcId, null, "delete")
                .then((success) => {
                    if (success) {
                        this.isDeleteOpen = false;
                        this.delSubTaskChatShowId = 0;
                        this.updateTaskChat(success);
                    } else {
                        this.popToast("error", "Something went wrong");
                    }
                })
                .catch((e) => {
                    console.log("there is an error:", e);
                });
        }
    }
    addTaskChat() {
        if (this.addTaskChatForm.valid) {
            this.addTaskChatForm.setErrors({ invalid: true });
            if (this.addTaskChatForm.value.mqcId != null && this.addTaskChatForm.value.mqcId != undefined && this.addTaskChatForm.value.mqcId > 0) {
                let sendingData: any = {
                    CRMTaskId: this.openPopupTaskId,
                    CRMSubTaskId: this.openPopupSubTaskId,
                    TaskDetailType: 3,
                    TaskDetailText: this.addTaskChatForm.value.taskDetailText,
                };
                this.commonService
                    .callApi("api/clients/updateTaskDetail/" + this.addTaskChatForm.value.mqcId, sendingData, "put")
                    .then((success) => {
                        if (success) {
                            let getRecord = this.taskList.find((x) => x.id == this.openPopupTaskId);
                            if (getRecord != undefined && getRecord != null) {
                                let index = this.taskList.indexOf(getRecord);
                                let subTaskRec = this.taskList[index].subTaskList.find((x) => x.id == this.openPopupSubTaskId);
                                if (subTaskRec != undefined && subTaskRec != null) {
                                    let subTaskIndex = this.taskList[index].subTaskList.indexOf(subTaskRec);
                                    this.taskList[index].subTaskList[subTaskIndex].showChat = true;
                                }
                            }
                            this.updateTaskChat(this.openSubTaskChatData);
                            this.addTaskChatForm.setErrors(null);
                            this.addTaskChatForm.reset();
                        } else {
                            this.popToast("error", success.message);
                        }
                    })
                    .catch((e) => {
                        console.log("there is an error:", e);
                    });
            }
            else {
                let sendingData: any = {
                    CRMTaskId: this.openPopupTaskId,
                    CRMSubTaskId: this.openPopupSubTaskId,
                    TaskDetailType: 3,
                    TaskDetailText: this.addTaskChatForm.value.taskDetailText,
                };
                this.commonService
                    .callApi("api/clients/addTaskDetail", sendingData, "post")
                    .then((success) => {
                        if (success) {
                            let getRecord = this.taskList.find((x) => x.id == this.openPopupTaskId);
                            if (getRecord != undefined && getRecord != null) {
                                let index = this.taskList.indexOf(getRecord);
                                let subTaskRec = this.taskList[index].subTaskList.find((x) => x.id == this.openPopupSubTaskId);
                                if (subTaskRec != undefined && subTaskRec != null) {
                                    let subTaskIndex = this.taskList[index].subTaskList.indexOf(subTaskRec);
                                    this.taskList[index].subTaskList[subTaskIndex].showChat = true;
                                }
                            }
                            this.updateTaskChat(this.openSubTaskChatData);
                            this.addTaskChatForm.setErrors(null);
                            this.addTaskChatForm.reset();
                        } else {
                            this.popToast("error", success.message);
                        }
                    })
                    .catch((e) => {
                        console.log("there is an error:", e);
                    });
            }
        }
    }
    updateTaskChat(data) {
        this.commonService
            .callApi(
                "api/clients/getTaskDetailsforType/" +
                this.openPopupTaskId +
                "/3/" +
                this.openPopupSubTaskId,
                "",
                "get"
            )
            .then((success) => {
                if (success) {
                    success = success[0];
                    this.openSubTaskChatData = success.listOfDetails;
                } else {
                    this.openSubTaskChatData = [];
                }
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });
    }
    getAddedTaskDetailsList() {
        if(this.taskData.subTaskData != undefined &&
        this.taskData.subTaskData != null &&
        this.taskData.subTaskData.id > 0){
            this.commonService
                .callApi(
                    "api/clients/getTaskDetailsforType/" +
                    this.taskDataObj.id+
                    "/1/" +
                    this.taskData.subTaskData.id,
                    "",
                    "get"
                )
                .then((success) => {
                    if (success && Object.keys(success).length !== 0) {
                        success = success[0];
                        this.addedTaskDetailsList = success.listOfDetails;
                        if (this.addedTaskDetailsList.length > 0) {
                            this.addedTaskDetailsList.map((details: any, i, arr) => {
                                if (details.image) {
                                    this.commonService
                                        .callApi(
                                            "api/clients/notes/retriveNotesImage?name=" + details.image,
                                            "",
                                            "get"
                                        )
                                        .then((success) => {
                                            if (success) {
                                                details.src = success;
                                            } else {
                                                details.src = "";
                                            }
                                            if (arr.length - 1 === i) {
                                                setTimeout(() => {
                                                    this.showAddedTaskDetailsList = true;
                                                    this.imageDataLoaded = true;
                                                }, 1000);
                                            }
                                        });
                                }
                            });
                        }
                    } else {
                        this.addedTaskDetailsList = [];
                        this.showAddedTaskDetailsList = true;
                        this.imageDataLoaded = true;
                    }
                })
                .catch((e) => {
                    this.addedTaskDetailsList = [];
                    this.imageDataLoaded = true;
                    this.showAddedTaskDetailsList = true;
                    console.log("there is an error:", e);
                });
        }
    }
    openTaskDetailsView(data, addTaskDetailsViewsPopup) {
        data.board = this.openPopupBoardName;
        data.description = this.openPopupTaskDescription;
        this.taskDetailsViewData = data;
        if(this.modalRef){
            this.modalRef.hide();
        }
        this.confirmationBoxOpen = true;
        this.modalRef = this.modalService.show(addTaskDetailsViewsPopup, {
            class: "modal-dialog-centered quick-popup task-detail-view-popup",
            backdrop : 'static',
            keyboard : false
        });
    }
    public handleCopy = (event: ClipboardEvent) => {
        var item = Array.from(event.clipboardData.items).find((x) =>
            /^image\//.test(x.type)
        );
        var blob = item.getAsFile();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = (events: any) => {
            const file = blob;
            this.fileList.push(file);
            this.uploadedFileSource = events.target.result;
            let tempArray: any = {};
            tempArray.showLoader = true;
            tempArray.src = events.target.result;
        };
    };
    setAddTaskDetailsForm() {
        this.addTaskDetailsForm = new FormGroup({
            taskDetailText: new FormControl("", [Validators.required]),
        });
        setTimeout(() => {
            let taskDetailImageText = document.getElementById('taskDetailImageText');
            taskDetailImageText.focus();
        }, 100);
    }
    showAddTaskDetailsDiv() {
        this.showAddedTaskDetailsList = false;
        this.setAddTaskDetailsForm();
        this.showAddTaskDetailsForm = true;
        window.addEventListener("paste", this.handleCopy.bind(event), false);
    }
    showAddedTaskDetailsListDiv() {
        this.getAddedTaskDetailsList();
        this.showAddedTaskDetailsList = true;
        this.addTaskDetailsForm.reset();
        this.showAddTaskDetailsForm = false;
    }
    saveAddTaskDetailsImage(taskId, subTaskId, detailId) {
        if (this.fileList.length > 0) {
            this.fileList.map((file: any) => {
                let formData: FormData = new FormData();
                formData.append("file", file);
                this.commonService
                    .callApi(
                        `api/clients/taskDetail/uploadFile/${taskId}/${subTaskId}/${detailId}`,
                        formData,
                        "post",
                        true
                    )
                    .then((success) => {
                        this.fileList = [];
                        this.uploadedFileSource = "";
                        this.addTaskDetailsForm.setErrors(null);
                        this.showAddedTaskDetailsListDiv();
                    });
            });
        }
    }
    addTaskDetailsImage(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files && event.target.files[i]) {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onload = (events: any) => {
                    const file = event.target.files[i];
                    this.fileList.push(file);
                    this.uploadedFileSource = events.target.result;
                    let tempArray: any = {};
                    tempArray.showLoader = true;
                    tempArray.src = events.target.result;
                };
            }
        }
    }
    addTaskDetails() {
        if (this.addTaskDetailsForm.valid) {
            this.addTaskDetailsForm.setErrors({ invalid: true });
            let sendingData: any = {
                CRMTaskId: this.openPopupTaskId,
                CRMSubTaskId: this.openPopupSubTaskId,
                TaskDetailType: 1,
                TaskDetailText: this.addTaskDetailsForm.value.taskDetailText,
            };
            this.commonService
                .callApi("api/clients/addTaskDetail", sendingData, "post")
                .then((success) => {
                    if (success) {
                        let getRecord = this.taskList.find((x) => x.id == this.openPopupTaskId);
                        if (getRecord != undefined && getRecord != null) {
                            let index = this.taskList.indexOf(getRecord);
                            let subTaskRec = this.taskList[index].subTaskList.find((x) => x.id == this.openPopupSubTaskId);
                            if (subTaskRec != undefined && subTaskRec != null) {
                                let subTaskIndex = this.taskList[index].subTaskList.indexOf(subTaskRec);
                                this.taskList[index].subTaskList[subTaskIndex].showDetails = true;
                            }
                        }
                        if (this.fileList.length > 0) {
                            this.saveAddTaskDetailsImage(
                                this.openPopupTaskId,
                                this.openPopupSubTaskId,
                                success
                            );
                        } else {
                            this.addTaskDetailsForm.setErrors(null);
                            this.showAddedTaskDetailsListDiv();
                            this.addTaskDetailsForm.reset();
                            this.fileList = [];
                            this.uploadedFileSource = "";
                        }
                    } else {
                        this.popToast("error", success.message);
                    }
                })
                .catch((e) => {
                    console.log("there is an error:", e);
                });
        }
    }
    submitSubTask(NextTaskButtonClicked = false) {
        if (!this.addTaskForm.valid) {
            return;
        }
        var addSubTask = {
            title: this.addTaskForm.value["description"],
            description: this.addTaskForm.value["description"],
            cRMTaskId: this.taskDataObj.id,
            DueDate: this.addTaskForm.value["dueDateTemp"],
            status: "1",
        };

        let assignedToIds = this.addTaskForm.value["assignedToIds"];
        if (
            assignedToIds != null &&
            assignedToIds != "" &&
            assignedToIds.length > 0
        ) {
            addSubTask["assignedToIds"] = assignedToIds.toString();
        }

        if (
            this.addTaskForm.value["id"] != undefined &&
            this.addTaskForm.value["id"] != null &&
            this.addTaskForm.value["id"] != ""
        ) {
            addSubTask["id"] = this.addTaskForm.value["id"];
            this.commonService
                .callApi("api/clients/subtask/", addSubTask, "put")
                .then((success) => {
                    if (success) {
                        this.saveConfirmationBox()
                        let itemIndex = this.taskDataObj.subTaskList.findIndex(
                            (item) => item.id == success.id
                        );
                        this.taskDataObj.subTaskList[itemIndex] = success;
                        // this.tabletask = !this.tabletask;
                        this.taskData.subTaskData = success;
                        this.addTaskForm = new FormGroup({
                            description: new FormControl("", [Validators.required]),
                            dueDate: new FormControl(),
                            dueDateTemp: new FormControl(),
                            assignedToIds: new FormControl(),
                            id: new FormControl(),
                        });
                        if(!NextTaskButtonClicked){
                            this.editSubTask(this.taskData.subTaskData);
                        }
                        else{
                            this.taskData.subTaskData = undefined;
                            this.addTaskForm = new FormGroup({
                                description: new FormControl("", [Validators.required]),
                                dueDate: new FormControl(),
                                dueDateTemp: new FormControl(),
                                assignedToIds: new FormControl(),
                                id: new FormControl(),
                            });
                            this.taskDataObj = {};
                            this.copyTaskDataObj = {};
                            this.storeAddTaskForm();
                        }
                        setTimeout(() => {
                            $("#txtDescription").focus();
                            // this.popToast("success", "SubTask Updated!");
                        });
                        this.updateTheParentGrid.emit(this.taskDataObj);
                    } else {
                        this.popToast("error", success.message);
                    }
                })
                .catch((e) => {
                    console.log("there is an error:", e);
                });
        } else {
            this.commonService
                .callApi("api/clients/subtask", addSubTask, "post")
                .then((success) => {
                    if (success) {
                        this.saveConfirmationBox()
                        this.taskDataObj.subTaskList.push(success);
                        // this.tabletask = !this.tabletask;
                        this.taskData.subTaskData = success;
                        this.addTaskForm = new FormGroup({
                            description: new FormControl("", [Validators.required]),
                            dueDate: new FormControl(),
                            dueDateTemp: new FormControl(),
                            assignedToIds: new FormControl(),
                            id: new FormControl(),
                        });
                        if(!NextTaskButtonClicked){
                            this.editSubTask(this.taskData.subTaskData);
                        }
                        else{
                            this.taskData.subTaskData = undefined;
                            this.addTaskForm = new FormGroup({
                                description: new FormControl("", [Validators.required]),
                                dueDate: new FormControl(),
                                dueDateTemp: new FormControl(),
                                assignedToIds: new FormControl(),
                                id: new FormControl(),
                            });
                            this.storeAddTaskForm();
                        }
                        setTimeout(() => {
                            $("#txtDescription").focus();
                            // this.popToast("success", "SubTask Saved!");
                        });
                        this.updateTheParentGrid.emit(this.taskDataObj);
                        if(this.openThisSection != ""){
                            this.showPopupDetails(this.openThisSection);
                            this.openThisSection = "";
                        }
                    } else {
                        this.popToast("error", success.message);
                    }
                })
                .catch((e) => {
                    console.log("there is an error:", e);
                });
        }
    }

    assigntoClick() {
        this.assignto = !this.assignto;
    }

    scroll(el: HTMLElement) {
        setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);
    }

    assigntoSubClick() {
        this.assigntosub = !this.assigntosub;
    }

    SearchString(e) {
        console.log('search string')
        this.boardList = [...this.tempboardListData];
        var searchKeyword = e.term.toLowerCase();
        var checkExist = this.tempboardListData.filter(
            (x) => x.board.toLowerCase().indexOf(searchKeyword) !== -1
        );
        if (
            checkExist != undefined &&
            checkExist != null &&
            checkExist.length > 0
        ) {
            this.isOpenBoard = true;
        } else {
            var obj = {
                board: e.term,
            };

            var assignList = Object.assign([], this.tempboardListData);
            assignList.unshift(obj);
            this.boardList = [...assignList];
            this.isOpenBoard = false;
        }

        this.addForm.get("boardName").setValue(e.term);
    }

    SearchStringChange(e) {
        this.addForm.get("boardName").setValue(e.board);
        $("#subTitle").focus();
        this.isOpenBoard = false;
    }

    boardEnterClick(event: Event) {
        this.subTitle.nativeElement.focus();
        this.isOpenBoard = false;
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
            label.classList.add("active");
        }
        function setLabelInactive(label) {
            label.classList.remove("active");
        }
        function setLabel(input: any = {}) {
            if (input.value && input.value.length) {
                setLabelActive(input.floatingLabel);
            } else {
                setLabelInactive(input.floatingLabel);
            }
        }
        const inputs = [].slice.call(document.querySelectorAll("[floating-label]"));
        inputs.forEach((input) => {
            const inputId = input.id,
                placeholder = input.getAttribute("floating-label");

            let labelEl = document.createElement("label");

            labelEl.setAttribute("for", inputId);
            labelEl.innerHTML = placeholder;
            labelEl.classList.add("floating-label");

            input.floatingLabel = labelEl;
            input.parentNode.appendChild(labelEl);

            input.addEventListener("focus", onFocus);
            input.addEventListener("blur", onBlur);

            setLabel(input);
        });
    };

    onChangeAssTask(event) {
        this.isShowAssociatedTask = event.checked ? true : false;
    }

    createdDateClick() {
        this.createedDate = true;
    }
    dueDateClick() {
        this.dueDate = true;
    }
    taskdueDateClick() {
        this.taskdueDate = true;
    }
    createdDateClose() {
        this.createedDate = false;
    }
    dueDateClose() {
        this.dueDate = false;
    }
    taskdueDateClose() {
        this.taskdueDate = false;
    }
    changeAssignTo(e) {
        this.assignToData = e;
    }

    onChangepresetActivity(e) {
        this.presetActivity = e;
        if (e.dueDays != null && e.dueDays != undefined && e.dueDays != "") {
            this.due_date = new Date();
            var pastDate = this.due_date.getDate() + e.dueDays;
            this.due_date.setDate(pastDate);

            this.addForm
                .get("dueDate")
                .setValue(this.datePipe.transform(this.due_date, "MMM d, y"));
            this.addForm.get("dueDateTemp").setValue(this.due_date);
        }
    }

    getCustomers() {
        this.commonService
            .callApi("api/clients/getCustomers/lookup?q=", "", "get")
            .then((success) => {
                if (success) {
                    this.subTaskList = success.slice(0, 100);
                } else {
                    this.popToast("error", success.message);
                }
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });
    }

    getContact() {
        this.commonService
            .callApi(
                "api/clients/lookup?entityType=client&ClientType=2&q=",
                "",
                "get"
            )
            .then((success) => {
                if (success) {
                    this.subTaskList = success.slice(0, 100);
                } else {
                    this.popToast("error", success.message);
                }
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });
    }

    getCompany() {
        this.commonService
            .callApi(
                "api/clients/lookup?entityType=client&ClientType=3&q=",
                "",
                "get"
            )
            .then((success) => {
                if (success) {
                    this.subTaskList = success.slice(0, 100);
                } else {
                    this.popToast("error", success.message);
                }
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });
    }

    getProduct() {
        this.commonService
            .callApi("api/inventory/products/lookup?q=", "", "get")
            .then((success) => {
                if (success) {
                    this.subTaskList = success.slice(0, 100);
                } else {
                    this.popToast("error", success.message);
                }
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });
    }

    getBoardList() {
        this.commonService
            .callApi("api/clients/tasks/boardList", "", "get")
            .then((success) => {
                if (success) {
                    this.boardList = success;
                    this.tempboardListData = Object.assign([], success);
                } else {
                    this.popToast("error", success.message);
                }
            })
            .catch((e) => {
                console.log("there is an error:", e);
            });
    }

    chnageTypeValue(e) {
        this.showSubTask = true;
        this.count = 0;
        this.subTaskList = [];
        this.subListTask = e.title;
        this.subListTaskData = e;
        this.selectedSubListTaskVal = {};

        if (e.id == 2) {
            this.getCustomers();
        } else if (e.id == 7) {
            this.getContact();
        } else if (e.id == 6) {
            this.getCompany();
        } else if (e.id == 4) {
            this.getProduct();
        } else {
            this.subListTask = e.title;
            this.subListTaskData = e;

            this.getBoardList();
        }
        this.addForm.get("selectedSubListTaskVal").setValue("");
        this.addForm.get("board").setValue("");
        this.addForm.get("boardName").setValue("");
        if (e.id == 1) {
            this.addForm.get("selectedSubListTaskVal").clearValidators();
            this.addForm.get("selectedSubListTaskVal").updateValueAndValidity();

            this.addForm.get("boardName").setValidators([Validators.required]);
            this.addForm.get("boardName").updateValueAndValidity();
            this.addForm.get("user").setValue("");

            this.addForm.get("title").clearValidators();
            this.addForm.get("title").updateValueAndValidity();

            this.assignToData = null;
        } else {
            this.addForm
                .get("selectedSubListTaskVal")
                .setValidators([Validators.required]);
            this.addForm.get("selectedSubListTaskVal").updateValueAndValidity();

            this.addForm.get("boardName").clearValidators();
            this.addForm.get("boardName").updateValueAndValidity();
            this.addForm.get("associatedUserIds").setValue("");

            this.addForm.get("title").setValidators([Validators.required]);
            this.addForm.get("title").updateValueAndValidity();
        }
    }

    submitAddForm() {
        this.isSaveButtonDisabled = true;
        var addTask = {
            dateOfEntry: this.addForm.value["dateOfEntryTemp"],
            dueDate: this.addForm.value["dueDateTemp"],
            type: this.addForm.value["type"],
            board: this.addForm.value["boardName"],
            subTitle: this.addForm.value["subTitle"],
            note: this.addForm.value["note"],
            status: "1",
        };
        if (
            this.addForm.value["dueDateTemp"] === "" ||
            this.addForm.value["dueDateTemp"] === null
        ) {
            delete addTask.dueDate;
        }
        if (this.addForm.value["type"] === 4) {
            addTask["product"] = this.selectedSubListTaskVal;
            addTask["presetActivity"] = this.presetActivity;
        } else if (this.addForm.value["type"] != 1) {
            addTask["businessPartner"] = this.selectedSubListTaskVal;
            addTask["presetActivity"] = this.presetActivity;
        } else {
            let associatedUserIds = this.addForm.value["associatedUserIds"];
            if (
                associatedUserIds != null &&
                associatedUserIds != "" &&
                associatedUserIds.length > 0
            ) {
                addTask["associatedUserIds"] = associatedUserIds.toString();
            }
        }

        let user = this.addForm.value["user"];
        if (user != null && user != "") {
            addTask["user"] = this.assignToData;
        }
        if (
            this.taskDataObj != undefined &&
            this.taskDataObj != null &&
            this.taskDataObj.id > 0
        ) {
            this.commonService
                .callApi("api/clients/tasks/" + this.taskDataObj.id, addTask, "put")
                .then((success) => {
                    this.isSaveButtonDisabled = false;
                    if (success) {
                        this.taskDataObj = success;
                        if (this.taskDataObj.type == 1) {
                            this.setp1 = false;
                            this.setp2 = true;
                            this.setp3 = false;
                            this.tabletask = true;
                        } else {
                            this.closeTask();
                        }
                        this.updateTheParentGrid.emit(success);
                    } else {
                        this.popToast("error", success.message);
                    }
                })
                .catch((e) => {
                    this.isSaveButtonDisabled = false;
                    console.log("there is an error:", e);
                });
        } else {
            this.commonService
                .callApi("api/clients/tasks", addTask, "post")
                .then((success) => {
                    this.isSaveButtonDisabled = false;
                    if (success) {
                        this.taskDataObj = success;
                        if (this.taskDataObj.type == 1) {
                            this.setp1 = false;
                            this.setp2 = true;
                            this.setp3 = false;
                            this.tabletask = true;
                        } else {
                            this.closeTask();
                        }
                        this.refreshTheParentGrid.emit();
                    } else {
                        this.popToast("error", success.message);
                    }
                })
                .catch((e) => {
                    this.isSaveButtonDisabled = false;
                    console.log("there is an error:", e);
                });
        }
    }

    createdDateValueChange(e, bsConfig) {
        if (!bsConfig.adaptivePosition) {
            this.addForm
                .get("dateOfEntry")
                .setValue(this.datePipe.transform(e, "MMM d, y"));
            this.addForm.get("dateOfEntryTemp").setValue(e);
            this.createedDate = false;
            this.created_Date = e;
            bsConfig.adaptivePosition = true;
            event.stopPropagation();
        } else {
            bsConfig.adaptivePosition = undefined;
            event.stopPropagation();
        }
    }

    dueDateValueChange(e, bsConfig) {
        if (!bsConfig.adaptivePosition) {
            this.addForm
                .get("dueDate")
                .setValue(this.datePipe.transform(e, "MMM d, y"));
            this.addForm.get("dueDateTemp").setValue(e);
            this.dueDate = false;
            this.due_date = e;
            bsConfig.adaptivePosition = true;
            event.stopPropagation();
        } else {
            bsConfig.adaptivePosition = undefined;
            event.stopPropagation();
        }
    }

    taskDueDateChange(e, bsConfig) {
        if (!bsConfig.adaptivePosition) {
            this.addTaskForm
                .get("dueDate")
                .setValue(this.datePipe.transform(e, "MMM d, y"));
            this.addTaskForm.get("dueDateTemp").setValue(e);
            this.taskdueDate = false;
            this.subTask_due_date = e;
            bsConfig.adaptivePosition = true;
            event.stopPropagation();
        } else {
            bsConfig.adaptivePosition = undefined;
            event.stopPropagation();
        }
    }
    onDropDownCloze(e) { }

    onSubTaskChange(e) {
        this.selectedSubListTaskVal = e;
        this.showSubTask = false;
    }

    @HostListener("document:click", ["$event"])
    clickout() { }

    subDeleteDropdownClose() {
        this.delSubShowId = 0;
    }

    subDeleteDropdownClick(id) {
        this.delSubShowId = this.delSubShowId == 0 ? id : 0;
    }
    saveButtonNextButtonHover(){
        this.saveButton = document.querySelector('#subtask-btn-grp');
        this.nextButton = document.querySelector('#subtask-next-btn-grp');
        this.saveButton.addEventListener('mouseover', () => {
            this.nextButton.style.opacity = 1;
            this.nextButton.style.height = 'auto';
            this.mouseOnHover +=1;
        });
        this.nextButton.addEventListener('mouseover', () => {
            this.mouseOnHover +=1;
        });
        this.saveButton.addEventListener('mouseout', () => {
            this.mouseOnHover -= 1
            setTimeout(() => {
                if(this.mouseOnHover == 0){
                    this.nextButton.style.opacity = 0;
                    this.nextButton.style.height = '0px'
                }
            }, 200);
        });
        this.nextButton.addEventListener('mouseout', () => {
            this.mouseOnHover -= 1
            setTimeout(() => {
                if(this.mouseOnHover == 0){
                    this.nextButton.style.opacity = 0;
                    this.nextButton.style.height = '0px'
                }
            }, 200);
        });
    }
}
