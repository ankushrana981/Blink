import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-admin',
  standalone: false,
  templateUrl: './general-admin.component.html',
  styles: []
})
export class GeneralAdminComponent implements OnInit {
  selected = 'option1';
  
  constructor() { }

  ngOnInit() {
  }

}
