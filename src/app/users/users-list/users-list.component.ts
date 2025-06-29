import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/app.interface.user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onViewUser(user: User) {
    console.log(user);
    this.userService.setSelectedUser(user);
    this.router.navigate(['/user-details', user.id]);
  }

  onUpdateUser(user: User) {
    this.userService.setSelectedUser(user);
    this.router.navigate(['/update-user', user.id]);
  }
}
