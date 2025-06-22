import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

@NgModule({
  declarations: [
    AddProjectComponent,
    ProjectsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProjectsModule { }
