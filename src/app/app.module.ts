import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms'; 
import { NgModule } from "@angular/core";
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import {UserAuthService} from './user-auth/user-auth.service';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FilesComponent } from "./files/files.component";
import { FilesMainComponent } from "./files/files-main/files-main.component";
import { FilesDirectoryComponent } from "./files/files-directory/files-directory.component";
import { FilesCreateComponent } from "./files/files-create/files-create.component";
import { FilesDeleteComponent } from "./files/files-delete/files-delete.component";
import { SigninComponent } from "./user-auth/signin/signin.component";
import { SignupComponent } from "./user-auth/signup/signup.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LandingPageComponent } from "./static-pages/landing-page/landing-page.component";
import { AboutPageComponent } from "./static-pages/about-page/about-page.component";
import { DocsPageComponent } from "./static-pages/docs-page/docs-page.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    FilesComponent,
    FilesMainComponent,
    FilesDirectoryComponent,
    FilesCreateComponent,
    FilesDeleteComponent,
    SigninComponent,
    SignupComponent,
    NavbarComponent,
    LandingPageComponent,
    AboutPageComponent,
    DocsPageComponent,
    FooterComponent
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, CodemirrorModule],
  providers: [UserAuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
