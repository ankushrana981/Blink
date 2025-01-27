import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ghost-list',
  standalone:false,
  template: `
    <div *ngFor='let it of ghosts' 
          class='ghost_item' 
          fxFlex.xs="100" fxFlex="50" >
      <div class="avatar"></div>
      <div class="lines">
        <h2></h2>
        <h3></h3>
        <p></p>
      </div>
    </div>  
  `,
  styleUrls: ['./ghost-list.component.scss']
})
export class GhostListComponent {
  @Input() ghosts : any[];
}