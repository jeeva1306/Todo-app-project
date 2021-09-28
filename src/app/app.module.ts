import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { TodoComponent } from './todo/todo.component';
import { NavigationComponent } from './todo/navigation/navigation.component';
import { CountDownTimerComponent } from './todo/count-down-timer/count-down-timer.component';
import { FinishedComponent } from './todo/finished/finished.component';
import { UnfinishedComponent } from './todo/unfinished/unfinished.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PageNotFoundComponent,
    LoadingComponent,
    TodoComponent,
    NavigationComponent,
    CountDownTimerComponent,
    FinishedComponent,
    UnfinishedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
