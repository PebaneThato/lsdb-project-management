import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskComment, TaskCommentResponse } from '../interfaces/task-comment.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {

  constructor(private http: HttpClient) {}

  /**
   * Get all comments for a specific task
   */
  getCommentsByTaskId(taskId: number): Observable<TaskComment[]> {
    return this.http.get<TaskComment[]>(`/api/task-comment.php/${taskId}`);
  }

  addComment(comment: Partial<TaskComment>): Observable<TaskCommentResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<TaskCommentResponse>(`/api/task-comment-management.php`, comment, { headers });
  }

}