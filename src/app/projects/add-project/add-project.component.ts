import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/interfaces/app.interface.project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  projectForm: FormGroup;
  submittedProjectData: Project | null = null;
  successMessage: string = '';

  userRoles = [
    { value: 'Accountant', label: 'Accountant' },
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Human Resource', label: 'Human Resource' },
  ];

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    this.projectForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
      contactNumber: ['', Validators.required],
      userRole: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe(response => {
        this.successMessage = 'Project successfully registered!';
        this.submittedProjectData = this.projectForm.value as Project;
        this.projectForm.reset();
      });
    }
  }

}
