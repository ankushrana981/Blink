import { Component, OnInit, Injector } from "@angular/core";
import { BaseComponent } from "../../common/commonComponent";

@Component({
  selector: "app-main",
  standalone:false,
  templateUrl: "./main.component.html",
  styles: [],
})
export class MainComponent extends BaseComponent implements OnInit {
  public closebroadcaster;
  public isWindowsSystem: boolean = false;
  constructor(inj: Injector) {
    super(inj);
    this.closebroadcaster = this.broadcaster.on("closemain").subscribe((k:any) => {
      if (k === "open") {
        $("#main-content").removeClass("collapsed");
      } else {
        $("#main-content").addClass("collapsed");
      }
    });
  }

  ngOnInit() {
    if (navigator.platform.includes("Win")) {
      this.isWindowsSystem = true;
    }
    this.broadcaster.on("togglesidebar").subscribe((k:any) => {
      if (k === "open") {
        $("#main-content").addClass("collapsed");
      } else {
        $("#main-content").removeClass("collapsed");
      }
    });
    this.broadcaster.on("togglesidebar1").subscribe((k:any) => {
      if (k === "open") {
      } else {
        $("#main-content").removeClass("collapsed");
      }
    });
  }
  ngOnDestroy() {
    this.closebroadcaster.unsubscribe();
  }
}
