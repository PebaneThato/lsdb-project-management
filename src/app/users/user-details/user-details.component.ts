import { Component } from '@angular/core';
import { User } from 'src/app/interfaces/app.interface.user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userDetails: User | null = null;

}
