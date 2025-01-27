import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({ selector: '[accordion]' })
export class AccordionDirective {
    @Input() clickCount: number;

    constructor(private el: ElementRef, private renderer: Renderer2, private _ren: Renderer2) {
    }

    @HostListener('click', ['$event']) onClick($event) {
        if(this.clickCount != 1){
            let elements = document.getElementsByClassName("is-open");
            for (let i = 0; i < elements.length; i++) {
                if(this.el.nativeElement.id != elements[i].id){
                    this._ren.removeClass(elements[i], 'is-open');
                }
            }
            this.el.nativeElement.classList.toggle('is-open');
            let content = this.el.nativeElement.nextElementSibling;
            if (content != undefined && content != null) {
                if (content.style.maxHeight) {
                    // accordion is currently open, so close it
                    content.style.maxHeight = "0px";
                } else {
                    // accordion is currently closed, so open it
                    content.style.maxHeight = content.scrollHeight + "px";

                }
            }
        }
    }
}