import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { AddProjectComponent } from './add-project/add-project.component';

@NgModule({
  declarations: [
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProjectsModule { }
