import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';

import * as jQuery from 'jquery';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent extends BaseComponent implements OnInit {
  public listrecords = [];
  public closebroadcaster;
  public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true };

  constructor(inj: Injector) {
    super(inj)
    this.closebroadcaster = this.broadcaster.on('close').subscribe(success => {
      if (success) {
        let className = $('#nav-icon2')[0].className
        $('#nav-icon2').toggleClass('open');
        $('#sidebar').toggleClass('active');
        if ($('#nav-icon2')[0].className != 'open') {
          $('#accordionExample .dropdown-toggle').addClass("collapsed")
          $('#accordionExample .collapse.show').removeClass("show")

        }
        this.broadcaster.broadcast('closemain', $('#nav-icon2')[0].className);
      }
    })
  }

  isSidebarOpen: Boolean;

  ngOnInit() {

    $('#nav-icon2').click(function (e) {
     let className = $('#nav-icon2')[0].className
      $('#nav-icon2').toggleClass('open');
      $('#sidebar').toggleClass('active');
      if ($('#nav-icon2')[0].className != 'open') {
        $('#accordionExample .dropdown-toggle').addClass("collapsed")
        $('#accordionExample .collapse.show').removeClass("show")
      }
    });

    $('#accordionExample').click(function (e) {
      if ($('#nav-icon2')[0].className != 'open') {
        $('#nav-icon2').toggleClass('open');
        $('#sidebar').toggleClass('active');
      }
    });

  }


  //togglesidebar

  toggleSideBar() {
    this.broadcaster.broadcast('togglesidebar', $('#nav-icon2')[0].className);
  }
  // when click on sidebar ui
  toggleSideBarInner() {
    this.broadcaster.broadcast('togglesidebar1', $('#nav-icon2')[0].className);
  }
  toggleSideBarNav(id) {
    $('#' + id).click();
    setTimeout(()=>{
      $('#main-content').addClass("collapsed");
      $('#sidebar').addClass("active");
      $('#nav-icon2').removeClass('open')
    },100)
    
  }

  ngOnDestroy() {
    this.closebroadcaster.unsubscribe();
  }
}

