import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { NotAuthGuard } from './services/not-auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';


const routes: Routes = [



  {path: 'home',canActivate : [NotAuthGuard], component: AppComponent},
  {path: 'login',canActivate : [NotAuthGuard], component: LoginComponent},
  {path: 'register',canActivate : [NotAuthGuard],  component: RegisterComponent},
  {path : 'user',canActivate : [AuthGuard], component: UserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
