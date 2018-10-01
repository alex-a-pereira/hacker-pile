import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  confirmUser = false;
  didFail = false;
  isLoading = false;
  @ViewChild('usrForm') form: NgForm;

  constructor(private authService: UserAuthService) {
  }

  ngOnInit() {
    // this.authService.authIsLoading.subscribe(
    //   (isLoading: boolean) => this.isLoading = isLoading
    // );
    // this.authService.authDidFail.subscribe(
    //   (didFail: boolean) => this.didFail = didFail
    // );
  }

  onSubmit() {
    const name = this.form.value.name;
    const usrName = this.form.value.username;
    const email = this.form.value.email;
    const password = this.form.value.password;
    // this.authService.signUp(name, usrName, email, password);
  }

  onDoConfirm() {
    this.confirmUser = true;
  }

  onConfirm(formValue: { usrName: string, validationCode: string }) {
    // this.authService.confirmUser(formValue.usrName, formValue.validationCode);
  }
}
