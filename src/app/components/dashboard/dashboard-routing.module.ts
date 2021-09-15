import { CambiarPasswordComponent } from './users/cambiar-password/cambiar-password.component';
import { UsersComponent } from './users/users.component';
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RegisterUserComponent } from './users/register-user/register-user.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: '', component: InicioComponent},
    {path:'registeruser', component: RegisterUserComponent},
    {path:'users', component: UsersComponent},
    {path:'changepassword', component: CambiarPasswordComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
