import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/app.interface.user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm: FormGroup;
  user: User | null = null;
  successMessage: string = '';
  isEditMode = false;
  userId!: number;
  buttonText: string = 'CREATE USER';
  headerText: string = 'Create New User';

  userRoles = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Member', label: 'Member' },
  ];

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      emailAddress: [''],
      password: [''],
      contactNumber: [''],
      userRole: [''],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.buttonText = 'UPDATE USER';
        this.headerText = 'Update User';
        this.userId = +id;
        this.userService.fetchUserById(this.userId).subscribe({
          next: (user) => {
            this.user = user;
            this.userForm.patchValue(user);
          }
        });
      }
    });

  }

  ngOnInit(): void {
    this.updateValidation();
  }

  updateValidation() {
    this.userForm.get('firstName')?.setValidators(Validators.required);
    this.userForm.get('lastName')?.setValidators(Validators.required);
    this.userForm.get('emailAddress')?.setValidators([Validators.required, Validators.email]);
    if (!this.isEditMode) {
      this.userForm.get('password')?.setValidators(Validators.required);
    }
    this.userForm.get('contactNumber')?.setValidators(Validators.required);
    this.userForm.get('userRole')?.setValidators(Validators.required);

    Object.keys(this.userForm.controls).forEach(field => {
      this.userForm.get(field)?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (!this.userForm.valid) return;

    this.userForm.patchValue({ id: this.userId });
    const maskedPassword = this.userForm.value.password?.replace(/./g, '•') || '';
    this.userForm.patchValue({ password: maskedPassword });
    const formValue = this.userForm.value;

    const handleSuccess = (message: string, postProcess?: () => void) => {
      this.successMessage = message;
      this.user = formValue as User;
      this.userForm.reset();
      postProcess?.();
    };

    if (this.isEditMode) {
      this.userService.updateUser(formValue).subscribe(() => {
        handleSuccess('User updated successfully!');
      });
    } else {
      this.userService.createUser(formValue).subscribe(() => {
        handleSuccess('User successfully registered!', () => {
        });
      });
    }
  }

}
