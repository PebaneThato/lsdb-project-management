import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { Project } from 'src/app/interfaces/app.interface.project';
import { User } from 'src/app/interfaces/app.interface.user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  currentUserId: number = 1;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private userService: UserService) {
    this.projectForm = this.fb.group({
      id: [''],
      projectName: ['', Validators.required],
      projectStartDate: [null, Validators.required],
      projectEndDate: [null, Validators.required],
      projectDescription: ['', Validators.required],
      projectCreatedBy: [''],
      projectAssignedTo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers().pipe(
      map(users => users.filter(user => user.userRole !== 'Member'))
    );
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);

      const startDate = this.formatDate(this.projectForm.value.projectStartDate);
      const endDate = this.formatDate(this.projectForm.value.projectEndDate);

      this.projectForm.patchValue({ projectCreatedBy: this.currentUserId });
      this.projectForm.patchValue({ projectStartDate: startDate });
      this.projectForm.patchValue({ projectEndDate: endDate });
      console.log(this.projectForm.value);
      this.projectService.createProject(this.projectForm.value).subscribe(response => {
        this.successMessage = 'Project successfully registered!';
        this.submittedProjectData = this.projectForm.value as Project;
        this.projectForm.reset();
      });
    }
  }

  private formatDate(d: NgbDateStruct): string {
    return `${d.year}-${this.pad(d.month)}-${this.pad(d.day)}`;
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }

}
