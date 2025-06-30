import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (!this.loginForm.valid) return;
    this.errorMessage = "";
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (response) => {
        if (response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.authService.setCurrentSubject(new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!)));
          this.router.navigate(['/users-list']);
        }
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }

}
