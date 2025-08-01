import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'users-list', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'users-list', component: UsersListComponent ,canActivate: [AuthGuard]},
  { path: 'user-details/:id', component: UserDetailsComponent ,canActivate: [AuthGuard]},
  { path: 'create-user', component: UserFormComponent ,canActivate: [AuthGuard]},
  { path: 'update-user/:id', component: UserFormComponent ,canActivate: [AuthGuard]},
  { path: 'projects-list', component: ProjectsListComponent ,canActivate: [AuthGuard, RoleGuard]},
  { path: 'project-details', component: ProjectDetailsComponent ,canActivate: [AuthGuard, RoleGuard]},
  { path: 'project-details/:id', component: ProjectDetailsComponent ,canActivate: [AuthGuard, RoleGuard]},
  { path: 'create-project', component: AddProjectComponent ,canActivate: [AuthGuard, RoleGuard]},
  { path: 'update-project/:id', component: AddProjectComponent ,canActivate: [AuthGuard, RoleGuard]},
  { path: 'create-task', component: TaskFormComponent ,canActivate: [AuthGuard]},
  { path: 'task-details/:id', component: TaskDetailsComponent ,canActivate: [AuthGuard]},
  { path: 'tasks-list', component: TasksListComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
