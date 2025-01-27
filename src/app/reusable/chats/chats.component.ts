import { Component, OnInit, Injector, HostListener, Output, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
// import { BaseComponent } from '../../../common/commonComponent';
// import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
// import { trigger } from '@angular/animations';
// import { fadeIn, fadeOut } from '../../../reusable/fade-animations';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: '[app-chats]',
    standalone:false,
    templateUrl: './chats.component.html',
})
export class ChatsComponent implements OnInit {
    public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true };

    dropdownActive1: boolean = false;
    dropdownActive2: boolean = false;
    dropdownActive3: boolean = false;
    dropdownActive4: boolean = false;
    dropdownActive5: boolean = false;
    dropdownActive6: boolean = false;
    dropdownActive7: boolean = false;
    dropdownActive8: boolean = false;
    dropdownActive9: boolean = false;
    dropdownActive10: boolean = false;
    searchopen: boolean = false;
    searchopen2: boolean = false;
    chatview: boolean = false;
    chatopen: boolean = false;
    optionExpression: boolean = false;
    optionWidth = 0;

    public responsive: boolean = false;

    windowWidth: any;
    chatMessages = [{
        msg: 'When our power of choice is untrammelled and when nothing' +
            'prevents our being able to do what we like best, every pleasure' +
            'is to be welcomed'
    }, {
        msg: 'Nor again is there anyone who loves or pursues or desires to' +
            'obtain pain of itself'
    }, {
        msg: 'Suprele ehenderit qui in ea voluptate velit esse 1'
    }, {
        msg: 'Suprele ehenderit qui in ea voluptate velit esse 2'
    }, {
        msg: 'Suprele ehenderit qui in ea voluptate velit esse 3'
    }, {
        msg: 'Suprele ehenderit qui in ea voluptate velit esse 4'
    }, {
        msg: 'Suprele ehenderit qui in ea voluptate velit esse 5'
    }, {
        msg: 'Suprele ehenderit qui in ea voluptate velit esse 6'
    }, {
        msg: 'Suprele ehenderit qui in ea voluptate velit esse 7'
    }];
    @ViewChild('message') message: ElementRef;


    // @Output() someEvent = new EventEmitter();
    @Output() closeClick = new EventEmitter();
    @Output() minimizeClick = new EventEmitter();

    closeChat() {
        this.closeClick.emit("close"); // Pass any payload as argument
    }
    minimizeChat() {
        this.minimizeClick.emit("minimize"); // Pass any payload as argument
    }

    // drg2Btn(){
    //     setTimeout(() => {
    //         $(".scrollbar2").mCustomScrollbar("scrollTo", "bottom");
    //         $(".scrollbar2").mCustomScrollbar("update");
    //     }, 100);
    // }

    // private mScrollbarService: MalihuScrollbarService;
    // private modalService: BsModalService;

    // heroForm: FormGroup;

    people: any[] = [
        {
            id: 1,
            name: 'Robert Downey Jr.',
            avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
        },
        {
            id: 2,
            name: 'Tom Hiddleston',
            avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15'
        },
        {
            id: 3,
            name: 'Hydra',
            avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
        },
        {
            id: 4,
            name: 'Scarlett Johansson',
            avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
        },
        {
            id: 5,
            name: 'S.H.I.E.L.D.',
            avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
        }
    ];

    group: any[] = [
        // {
        //     id: 1,
        //     name: 'Group 1',
        //     avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
        // },
        // {
        //     id: 2,
        //     name: 'Group 2',
        //     avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15'
        // }
    ];


    constructor(
        inj: Injector,
        // private fb: FormBuilder
    ) {
        // super(inj);
    }
    ngOnInit() {
        this.onResize991();
        // if (this.mScrollbarService) {
        //     this.mScrollbarService.initScrollbar('.scrollbar', {
        //         mouseWheel: {
        //             scrollAmount: 100,
        //             normalizeDelta: true
        //         },
        //     });
        // }
    }

    @HostListener('window:resize')
    onResize991() {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth <= 991) {
            this.responsive = false
        } else {
            this.responsive = true
        }
    }

    dropdownClick(id) {
        if (id == 1) {
            this.dropdownActive1 = !this.dropdownActive1;
        } else if (id == 2) {
            this.dropdownActive2 = !this.dropdownActive2;
            this.optionWidth = 0
        } else if (id == 3) {
            this.dropdownActive3 = !this.dropdownActive3;
        } else if (id == 4) {
            this.dropdownActive4 = !this.dropdownActive4;
        } else if (id == 5) {
            this.dropdownActive5 = !this.dropdownActive5;
        } else if (id == 6) {
            this.dropdownActive6 = !this.dropdownActive6;
        } else if (id == 7) {
            this.dropdownActive7 = !this.dropdownActive7;
        } else if (id == 8) {
            this.dropdownActive8 = !this.dropdownActive8;
        } else if (id == 9) {
            this.dropdownActive9 = !this.dropdownActive9;
        } else if (id == 10) {
            this.dropdownActive10 = !this.dropdownActive10;
        }
    }
    dropdownClose(id) {
        if (id == 1) {
            this.dropdownActive1 = false;
        } else if (id == 2) {
            this.dropdownActive2 = false;
        } else if (id == 3) {
            this.dropdownActive3 = false;
            this.optionWidth = 0
        } else if (id == 4) {
            this.dropdownActive4 = false;
        } else if (id == 5) {
            this.dropdownActive5 = false;
        } else if (id == 6) {
            this.dropdownActive6 = false;
        } else if (id == 7) {
            this.dropdownActive7 = false;
        } else if (id == 8) {
            this.dropdownActive8 = false;
        } else if (id == 9) {
            this.dropdownActive9 = false;
        } else if (id == 10) {
            this.dropdownActive10 = false;
        }
    }
    searchClick() {
        this.searchopen = true;
    }
    searchClose() {
        this.searchopen = false;
    }
    searchClick2() {
        this.searchopen2 = true;
    }
    searchClose2() {
        this.searchopen2 = false;
    }
    chatOpen() {
        this.chatopen = true;
    }
    chatClose() {
        this.chatopen = false;
    }
    stop($event) {
        $event.stopPropagation();
    }

    viewClick() {
        this.chatview = !this.chatview;
    }

    @ViewChild('optionBlock')
    optionBlock: ElementRef;

    getWidth() {
        if (this.optionWidth != 0) {
            this.optionWidth = 0
        } else {
            this.optionWidth = this.optionBlock.nativeElement.offsetWidth
        }
    }

    sendMessage() {
        if (this.message.nativeElement.value) {
            this.chatMessages.push({
                msg: this.message.nativeElement.value
            });
            this.message.nativeElement.value = '';
            // $(".scrollbar2").mCustomScrollbar("scrollTo", "bottom");
            // $(".scrollbar2").mCustomScrollbar("update");
        }
    }

}