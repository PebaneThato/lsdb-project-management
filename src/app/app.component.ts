import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn!: boolean;
  avatarUrl = 'https://i.pravatar.cc/150?img=3';

  logout() {

  }

  login() {

  }
}
