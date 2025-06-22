import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/app.interface.user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm: FormGroup;
  submittedUserData: User | null = null;
  successMessage: string = '';

  userRoles = [
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Human Resource', label: 'Human Resource' },
  ];

  constructor(private fb: FormBuilder, private userService: UserService) {
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
      this.userService.createUser(this.userForm.value).subscribe(response => {
        this.successMessage = 'User successfully registered!';
        let maskedPassword = this.userForm.value.password.replace(/./g, '•');
        this.userForm.patchValue({
          password: maskedPassword
        });
        this.submittedUserData = this.userForm.value as User;
        this.userForm.reset();
      });
    }
  }

}
