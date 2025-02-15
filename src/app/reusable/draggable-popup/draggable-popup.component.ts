import { Component, ElementRef, ViewChild } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ChatsComponent } from '../../reusable/chats/chats.component';
import { CdkDragStart } from '@angular/cdk/drag-drop';
@Component({
    selector: 'app-modal-demo',
    standalone:false,
    templateUrl: './draggable-popup.component.html',
})
export class ModalDemoComponent {
    @ViewChild(ChatsComponent) child;

    constructor() { }

    isShowMiniIcon: boolean = true;
    isHideMiniIcon: boolean = true;
    isHiddenMiniIcon: boolean = true;
    isCusClsAdd: boolean = false;
    dragging: boolean;

    onMinimizeModal(): void {
        this.isHiddenMiniIcon = true;
    }
    onCloseModal(): void {
        this.isShowMiniIcon = true;
    }
    onOpenModal() {
        // this.isHideMiniIcon = false;
        this.isHiddenMiniIcon = false;
        this.child.drg2Btn()
    }
    onCencelModal() {
        this.isHideMiniIcon = true;
        this.isHiddenMiniIcon = true;
        if (this.isShowMiniIcon = true) {
            this.isShowMiniIcon = false;
            setTimeout(() => {
                this.isShowMiniIcon = true;
            }, 10)
        }
    }
    onResize(event: ResizedEvent) {
        this.isCusClsAdd = event.newRect.width <= 750 ? true : false;
        console.log(this.isCusClsAdd = event.newRect.width <= 750 ? true : false)
    }

    openMdlFrmOthrCom() {
        document.getElementById("openBtn").click();
    }


    public handleDragStart(event: CdkDragStart): void {
        this.dragging = true;
    }

    public handleClick(event: MouseEvent): void {
        if (this.dragging) {
            this.dragging = false;
            return
        }
        document.getElementById("modalOpen").click();
    }

}