import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UserFormComponent,
    UserDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
