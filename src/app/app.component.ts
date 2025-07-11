import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn!: boolean;

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
