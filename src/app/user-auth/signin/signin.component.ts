import { Component, OnInit, ViewChild } from "@angular/core";
import { UserAuthService } from "../user-auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"]
})
export class SigninComponent implements OnInit {
  @ViewChild("signinForm")
  form: NgForm;
  didFail = false;
  isLoading = false;
  constructor(private authService: UserAuthService) {}

  ngOnInit() {}
}
