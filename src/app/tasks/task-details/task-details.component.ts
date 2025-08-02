import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/app.interface.task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent {
  task: Task | null = null;
  loading = true;
  error = '';
  file: any;

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const storedTask = this.taskService.getSelectedTask();
    if (storedTask && storedTask.id === id) {
      this.task = storedTask;
      this.file = storedTask.file
      this.loading = false;
    } else {
      this.taskService.fetchTaskById(id).subscribe({
        next: (task) => {
          this.task = task;
          this.file = task.file
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load task.';
          this.loading = false;
        }
      });
    }
    console.log(this.file);
    console.log(this.task);
  }

  onViewTask() {
    this.router.navigate(['/tasks-list']);
  }

}
