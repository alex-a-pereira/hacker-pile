import { Component, OnInit } from "@angular/core";
// auth
import { UserAuthService } from "../user-auth/user-auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  constructor(private authService: UserAuthService) {}

  ngOnInit() {
    this.authService.authStatusChanged.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

  handleSignOut() {
    this.authService.logout();
  }
}
