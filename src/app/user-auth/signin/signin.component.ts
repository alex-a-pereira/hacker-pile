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

  ngOnInit() {
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => (this.isLoading = isLoading)
    );
    this.authService.signinDidFail.subscribe(
      (didFail: boolean) => (this.didFail = didFail)
    );
  }

  onSubmit() {
    const userName = this.form.value.username;
    const password = this.form.value.password;
    this.authService.signIn(userName, password);
  }
}
