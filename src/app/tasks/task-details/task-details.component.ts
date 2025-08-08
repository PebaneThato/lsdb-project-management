import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/app.interface.task';
import { TaskComment } from 'src/app/interfaces/task-comment.interface';
import { TaskCommentService } from 'src/app/services/task-comment.service';
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

  @Input() taskId: number = 0;
  
  commentText: string = '';
  comments: TaskComment[] = [];
  showCancelButton: boolean = false;
  isSubmitting: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService, private taskCommentService: TaskCommentService) { }

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
    this.loadComments(this.taskId);
  }

  onTextAreaInput(): void {
    this.showCancelButton = this.commentText.trim().length > 0;
  }

  onCancel(): void {
    this.commentText = '';
    this.showCancelButton = false;
  }

  onComment(): void {
    if (this.commentText.trim() === '' || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    
    const newComment: TaskComment = {
      commentContent: this.commentText.trim(),
      taskId: this.taskId,
      commentAddedById: this.getCurrentUserId(),
      commentAddedByName: this.getCurrentUserName(),
      commentId: 0,
      commentDateTime: ''
    };

    // Send comment to backend
    this.taskCommentService.addComment(newComment).subscribe({  
      next: (response: TaskComment) => {
        // Add the new comment to the beginning of the list
        this.comments.unshift(response);
        this.commentText = '';
        this.showCancelButton = false;
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error adding comment:', error);
        this.isSubmitting = false;
        // You might want to show an error message to the user
      }
    });
  }

  private loadComments(taskId: number): void {
    this.taskCommentService.getCommentsByTaskId(taskId).subscribe({  
      next: (comments: TaskComment[]) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error('Error loading comments:', error);
      }
    });
  }

  private getCurrentUserId(): string {
    // Implement this method to return current user ID
    // This could come from a user service, JWT token, etc.
    return 'current-user-id';
  }

  private getCurrentUserName(): string {
    // Implement this method to return current user name
    // This could come from a user service, JWT token, etc.
    return 'Current User';
  }

  formatDateTime(date: string, time: string): string {
    return `${date} ${time}`;
  }

  trackByCommentId(index: number, comment: TaskComment): number {
    return comment.commentId;
  }

}
