import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// RxJS
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
// AWS Cognito
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from "amazon-cognito-identity-js";
// models
import { UserSignup } from "./user-auth.model";

const POOL_DATA = {
  UserPoolId: "us-east-1_OcW23fVYj",
  ClientId: "14mc7mgv62bai1966p7dc595pn"
};
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable()
export class UserAuthService {
  authIsLoading = new BehaviorSubject<boolean>(false);
  authDidFail = new BehaviorSubject<boolean>(false);
  authStatusChanged = new BehaviorSubject<boolean>(false);
  signupSuccess = new Subject<boolean>();
  registeredUser: CognitoUser;

  constructor(private router: Router) {}

  signUp(
    name: string,
    username: string,
    email: string,
    password: string
  ): void {
    this.authIsLoading.next(true);
    this.signupSuccess.next(false);

    const user: UserSignup = {
      name: name,
      username: username,
      email: email,
      password: password
    };

    const attrList: CognitoUserAttribute[] = [];
    const emailAttribute = {
      Name: "email",
      Value: user.email
    };
    const nameAttribute = {
      Name: "name",
      Value: user.name
    };
    attrList.push(new CognitoUserAttribute(emailAttribute));
    attrList.push(new CognitoUserAttribute(nameAttribute));

    userPool.signUp(
      user.username,
      user.password,
      attrList,
      null,
      (err, result) => {
        if (err) {
          this.authDidFail.next(true);
          this.authIsLoading.next(false);
          return;
        }
        this.authDidFail.next(false);
        this.authIsLoading.next(false);
        this.signupSuccess.next(true);
        this.registeredUser = result.user;
      }
    );

    return;
  }

  signIn(username: string, password: string): void {
    this.authIsLoading.next(true);
    const authData = {
      Username: username,
      Password: password
    };

    const authDetails = new AuthenticationDetails(authData);

    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result: CognitoUserSession) {
        that.authStatusChanged.next(true);
        that.authDidFail.next(false);
        that.authIsLoading.next(false);
        console.log(result);
      },
      onFailure(err) {
        that.authDidFail.next(true);
        that.authIsLoading.next(false);
        console.log(err);
      }
    });

    return;
  }

  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logout() {
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create(observer => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false);
          } else {
            if (session.isValid()) {
              observer.next(true);
            } else {
              console.log(err);
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }

  initAuth() {
    console.log("init auth");
    this.isAuthenticated().subscribe(auth => this.authStatusChanged.next(auth));
  }
}
