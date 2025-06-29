import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'project-list', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'create-user', component: UserFormComponent },
  { path: 'update-user/:id', component: UserFormComponent },
  { path: 'projects-list', component: ProjectsListComponent },
  { path: 'project-details', component: ProjectDetailsComponent },
  { path: 'project-details/:id', component: ProjectDetailsComponent },
  { path: 'create-project', component: AddProjectComponent },
  { path: 'update-project/:id', component: AddProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
