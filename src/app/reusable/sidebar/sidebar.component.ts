import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../common/commonComponent';

import * as jQuery from 'jquery';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-sidebar',
    standalone:false,
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent extends BaseComponent implements OnInit {
    public listrecords = [];
    public closebroadcaster;
    public currentUser: any;
    public accessLevel: any;
    public features: any;
    public scrollbarOptions = { axis: 'y', theme: 'minimal-dark', autoHideScrollbar: true };
    public showMenu: boolean = false;
    public menus!: Array<any>;
    public activeLink: any;
    constructor(inj: Injector) {
        super(inj)
        this.closebroadcaster = this.broadcaster.on('close').subscribe((success:any) => {
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

    isSidebarOpen!: Boolean;

    ngOnInit() {

        $('#nav-icon2').click(function (e:any) {
            let className = $('#nav-icon2')[0].className
            $('#nav-icon2').toggleClass('open');
            $('#sidebar').toggleClass('active');
            if ($('#nav-icon2')[0].className != 'open') {
                $('#accordionExample .dropdown-toggle').addClass("collapsed")
                $('#accordionExample .collapse.show').removeClass("show")
            }
        });

        $('#accordionExample').click(function (e:any) {
            if ($('#nav-icon2')[0].className != 'open') {
                $('#nav-icon2').toggleClass('open');
                $('#sidebar').toggleClass('active');
            }
        });

        this.loadMenu();
    }


    //togglesidebar

    toggleSideBar() {
        this.broadcaster.broadcast('togglesidebar', $('#nav-icon2')[0].className);
    }
    // when click on sidebar ui
    toggleSideBarInner() {
        this.broadcaster.broadcast('togglesidebar1', $('#nav-icon2')[0].className);
    }
    toggleSideBarNav(id:any) {
        $('#' + id).click();
        setTimeout(() => {
            $('#main-content').addClass("collapsed");
            $('#sidebar').addClass("active");
            $('#nav-icon2').removeClass('open')

        }, 100)

    }

    ngOnDestroy() {
        this.closebroadcaster.unsubscribe();
    }


    loadMenu = () => {

        var me = this;
        this.menus = [];
        me.commonService.getCurrentUser()
            .then((user:any) => {
                var taxEnabled = user.tenant.enableTax;
                //var acl = me.lookupService.getNumericAccessLevel(user.tenant.accessLevel);
                me.getFeatures()
                    .then((featureList: Array<any>) => {

                        if (featureList !== undefined && featureList !== null && featureList.length > 0) {
                            featureList.forEach((u, i) => {
                                if (user.tenant.enablePOS && u.feature.appModule.code === "POS") {
                                    this.showMenu = true;
                                }
                                //var menuItem = me.getMenuItem(u.feature.appModule, this.showMenu);
                                var menuItem = me.getMenuItem(u.feature.appModule, this.showMenu);
                                if ("TR" === u.feature.code && taxEnabled === false) {
                                    //skip
                                } else if (u.feature.appModule.code === "POS" && user.tenant.enablePOS === false) {
                                    //skip
                                }
                                else {

                                    menuItem.subMenus.push(u);
                                    if (u.feature != undefined && this.router.url == u.feature.routeURL) {
                                        this.activeLink = u.feature.title;
                                        menuItem.isActive = true;
                                    }

                                    // console.log("menuItem", menuItem)

                                }
                            });
                        }


                    });
            });
    }

    getMenuItem = (module:any, showMenu:any) => {
        var current = null;
        this.menus.forEach((u, i) => {
            if (u.code === module.code && (module.code === "POS" ? showMenu : true)) {
                current = u;
                return;
            }
        });

        if (current === null && (module.code === "POS" ? showMenu : true)) {
            this.menus.push(module);
            current = module;
            current.subMenus = [];
        }

        return current;
    };

    //navigateTo = (route) => {
    //    this.$state.go(route, { ts: (new Date()).getTime() });
    //}

    openMenu = (record:any) => {
        //this.isLeftOpen = true;
        record.isOpen = true;
    };

    getFeatures = (force: boolean = false): any => {
        var me: any = this;
        //return (!!this.features && force !== true)? this.$q.when(this.features): this.$http.get(this.ApiConfig.baseUrl + "/me/features?ts=" + (new Date()).getTime())
        return (this.commonService.callApi("api/me/features?ts=" + (new Date()).getTime(), '', 'get'))
            .then((features: any) => {
                me.features = features;
                return me.features;
            });
    }

    checkActiveLink = (r: any, activeLink: any) => {
        if (r.subMenus.findIndex((a:any) => a.feature.title == activeLink) != -1) { return true }
        else { return false }
    }

    getActiveLinkText = (activeLink: any) => {
        let linkArray = activeLink.split(' ');
        if (linkArray.length == 0)
            return activeLink;
        else if (linkArray.length > 1)
            return linkArray[1];
        else
            return linkArray[0];
    }

    subMenuClick = (r: any, title: any) => {
        this.menus.forEach(t => t.isActive = false);
        r.isActive = true;
        this.activeLink = title;

    }
}

