import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';
import { Project } from 'src/app/interfaces/app.interface.project';
import { Task } from 'src/app/interfaces/app.interface.task';
import { User } from 'src/app/interfaces/app.interface.user';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  submittedTaskData: Task | null = null;
  successMessage: string = '';
  users$: Observable<User[]> | undefined;
  currentUserId: number = 1;
  isEditMode = false;
  taskId!: number;
  buttonText: string = 'CREATE TASK';
  headerText: string = 'Create New Task';
  projects$: Observable<Project[]> | undefined;

  taskTypes = [
    { value: 'Daily Task' },
    { value: 'Weekly Task' },
    { value: 'Monthly Task' },
  ];

  taskPriorities = [
    { value: 'Low' },
    { value: 'Medium' },
    { value: 'High' },
  ];

  taskStatuses = [
    { value: 'To Do' },
    { value: 'In Progress' },
    { value: 'Testing' },
    { value: 'Review' },
    { value: 'Done' },
  ];

  constructor(private fb: FormBuilder, private taskService: TaskService, private userService: UserService,
    private route: ActivatedRoute, private authService: AuthService, private projectervice: ProjectService) {
    this.taskForm = this.fb.group({
      id: [''],
      taskTitle: ['', Validators.required],
      taskType: ['', Validators.required],
      taskPriority: ['', Validators.required],
      taskStatus: ['', Validators.required],
      taskstartDate: [null, Validators.required],
      taskEndDate: [null, Validators.required],
      projectId: ['', Validators.required],
      taskAssignedTo: ['', Validators.required],
      taskDescription: ['', Validators.required],
      file: [null, Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.buttonText = 'UPDATE TASK';
        this.headerText = 'Update Task';
        this.taskId = +id;
        this.taskService.fetchTaskById(this.taskId).subscribe({
          next: (task) => {
            this.taskForm.patchValue(task);
            this.taskForm.patchValue({ taskstartDate: this.parseDate(task['taskstartDate']) });
            this.taskForm.patchValue({ taskEndDate: this.parseDate(task['taskEndDate']) });
          }
        });
      }
    });
  }

  ngOnInit(): void {
    const isProjectManager = this.authService.isProjectManager;
    const currentUserId = this.authService.currentUserValue.id;
    this.projects$ = isProjectManager ? this.projectervice.getProjects().pipe(
      map(projects => projects.filter(project => project.projectAssignedTo == currentUserId))
    ) : this.projectervice.getProjects();
    this.users$ = this.userService.getUsers().pipe(
      map(users => users.filter(user => user.userRole !== 'Member'))
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      this.taskForm.patchValue({ file });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {

      console.log(this.taskForm.value);
      const startDate = this.formatDate(this.taskForm.value.taskstartDate);
      const endDate = this.formatDate(this.taskForm.value.taskEndDate);

      this.taskForm.patchValue({ taskstartDate: startDate });
      this.taskForm.patchValue({ taskEndDate: endDate });

      if (this.isEditMode) {
        this.taskService.updateTask(this.taskForm.value).subscribe(() => {
          this.successMessage = 'Task updated successfully!';
          this.submittedTaskData = this.taskForm.value as Task;
          this.taskForm.reset();
        });
      } else {
        this.taskService.createTask(this.taskForm.value).subscribe(response => {
          this.successMessage = 'Task successfully registered!';
          this.submittedTaskData = this.taskForm.value as Task;
          this.taskForm.reset();
        });
      }

    }
  }

  private formatDate(d: NgbDateStruct): string {
    return `${d.year}-${this.pad(d.month)}-${this.pad(d.day)}`;
  }

  private pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }

  parseDate(dateString: string): NgbDateStruct {
    const [year, month, day] = dateString.split('-').map(Number);
    return { year, month, day };
  }
}
