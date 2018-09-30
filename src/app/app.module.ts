import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { FilesComponent } from './files/files.component';
import { FilesMainComponent } from './files/files-main/files-main.component';
import { FilesCreateComponent } from './files/files-create/files-create.component';
import { FilesDeleteComponent } from './files/files-delete/files-delete.component';
import { SigninComponent } from './user-auth/signin/signin.component';
import { SignupComponent } from './user-auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    FilesComponent,
    FilesMainComponent,
    FilesCreateComponent,
    FilesDeleteComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
