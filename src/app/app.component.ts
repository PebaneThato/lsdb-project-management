import { Component } from '@angular/core';
import { User } from './app.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userForm: FormGroup;
  submittedUserData: User | null = null;

  userRoles = [
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Human Resource', label: 'Human Resource' },
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      contactNumber: ['', Validators.required],
      userRole: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      let maskedPassword = this.userForm.value.password.replace(/./g, '•');
      this.userForm.patchValue({
        password: maskedPassword
      });
      this.submittedUserData = this.userForm.value as User;
    }
  }

}
