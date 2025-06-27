import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    UsersListComponent,
    AddUserComponent,
    UserDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
