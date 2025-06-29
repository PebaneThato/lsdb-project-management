import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/app.interface.user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  user: User | null = null;
  loading = true;
  error = '';

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const storedUser = this.userService.getSelectedUser();

    if (storedUser && storedUser.id === id) {
      this.user = storedUser;
      this.loading = false;
    } else {
      this.userService.fetchUserById(id).subscribe({
        next: (user) => {
          this.user = user;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load user.';
          this.loading = false;
        }
      });
    }
  }

  onViewUsers(){
    this.router.navigate(['/users-list']);
  }

}
