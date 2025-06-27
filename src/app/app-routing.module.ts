import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
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
  { path: 'users-details', component: UserDetailsComponent },
  { path: 'create-user', component: AddUserComponent },
  { path: 'project-list', component: ProjectsListComponent },
  { path: 'project-details', component: ProjectDetailsComponent },
  { path: 'create-project', component: AddProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
