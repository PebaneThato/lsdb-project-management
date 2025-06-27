import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Project } from 'src/app/interfaces/app.interface.project';
import { User } from 'src/app/interfaces/app.interface.user';
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
  users$: Observable<User[]> | undefined;

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectCreatedBy: ['', Validators.required],
      projectAssignedTo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.users$ = of([
      {
        firstName: "string",
        lastName: "string",
        emailAddress: "string",
        password: "string",
        contactNumber: "string",
        userRole: "string"
      }
    ]);
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
