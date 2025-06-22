import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  declarations: [
    UsersListComponent,
    AddUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
