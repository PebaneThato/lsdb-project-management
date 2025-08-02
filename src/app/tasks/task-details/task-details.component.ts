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
  }

  onViewTask() {
    this.router.navigate(['/tasks-list']);
  }

  download(filename: string) {
    if (!filename) return;
    this.taskService.downloadFile(filename).subscribe({
      next: (fileContent: Blob | MediaSource) => {
        const url = window.URL.createObjectURL(fileContent);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
      error: (err: any) => {
        this.error = 'Failed to download the file, please update the task with the latest document.';
      }
    });
  }

}
