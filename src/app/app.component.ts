import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { UserAuthService } from "./user-auth/user-auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "HackerPile";
  isAuthenticated = false;

  constructor(private authService: UserAuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authStatusChanged.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        // redirect to user's files if logged in, else to landing 
        if (authenticated) {
          this.router.navigate(['/files']);
        } else {
          this.router.navigate(['/']);
        }
      }
    );
    this.authService.initAuth();
  }

}

