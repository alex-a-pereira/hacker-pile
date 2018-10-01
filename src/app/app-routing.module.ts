import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Files, guarded
import {FilesComponent} from './files/files.component';
import {AuthGuardService} from './user-auth/auth-guard.service';
// Auth
import {SigninComponent} from './user-auth/signin/signin.component';
import {SignupComponent} from './user-auth/signup/signup.component';
// Static
import {LandingPageComponent} from './static-pages/landing-page/landing-page.component';
import {AboutPageComponent} from './static-pages/about-page/about-page.component';
import {DocsPageComponent} from './static-pages/docs-page/docs-page.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "docs", component: DocsPageComponent },
  { path: "about", component: AboutPageComponent },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "files", canActivate: [AuthGuardService], component: FilesComponent },
  { path: "*", component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
