import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { myrouting } from './app.routing';
import { SigninComponent } from './auth/signin-component';
import { SignupComponent } from './auth/signup-component';
import { SignoutComponent } from './auth/signout-component';
import { HttpModule } from '@angular/http';
import { UserComponent } from './auth/user.component';
import { UserService } from './auth/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthGuardChildren } from './auth/auth.guard.children';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        SigninComponent,
        SignupComponent,
        SignoutComponent,
        UserComponent
    ],
    providers: [
        UserService,
        AuthGuard,
        AuthGuardChildren
    ],
    imports: [
        BrowserModule, 
        FormsModule, 
        myrouting, 
        ReactiveFormsModule, 
        HttpModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}