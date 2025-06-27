import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  declarations: [
    AddProjectComponent,
    ProjectsListComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProjectsModule { }
