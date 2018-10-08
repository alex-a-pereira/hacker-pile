import { Component, OnInit, ViewChild } from "@angular/core";
import { UserAuthService } from "../user-auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  didFail = false;
  isLoading = false;
  didSucceed = false;
  errorMessage = null;
  @ViewChild("signupForm")
  form: NgForm;

  constructor(private authService: UserAuthService) {}

  ngOnInit() {
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => (this.isLoading = isLoading)
    );
    this.authService.signupDidFail.subscribe(
      (didFail: boolean) => (this.didFail = didFail)
    );
    this.authService.signupSuccess.subscribe(
      (successStatus: boolean) => (this.didSucceed = successStatus)
    );
    this.authService.signupError.subscribe((error: object) => {
      this.errorMessage = error;
      this.didFail = true;
    });
    this.didFail = false;
  }

  onSubmit() {
    const name = this.form.value.name;
    const userName = this.form.value.username;
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.authService.signUp(name, userName, email, password);
  }
}
