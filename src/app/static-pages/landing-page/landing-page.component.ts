import { Component, OnInit } from "@angular/core";
declare function require(path: string);
@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {
  demoImgPath: string;
  moneyImgPath: string;

  constructor() {
    this.demoImgPath = require("../../../assets/img/demo.png");
    this.moneyImgPath = require("../../../assets/img/money.jpg");
  }

  ngOnInit() {}
}
