import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './shared/auth-guard';
import { FinishedComponent } from './todo/finished/finished.component';
import { TodoComponent } from './todo/todo.component';
import { UnfinishedComponent } from './todo/unfinished/unfinished.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'todo', component: TodoComponent, canActivate: [AuthGuard], children:[
    {path: 'finished', component: FinishedComponent},
    {path: 'unfinished', component: UnfinishedComponent}
  ]},
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
