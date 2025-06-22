import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'create-user', pathMatch: 'full' },
  { path: 'create-user', component: AddUserComponent },
  { path: 'create-project', component: AddProjectComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: 'project-list', component: ProjectsListComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'projects', component: UsersListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
