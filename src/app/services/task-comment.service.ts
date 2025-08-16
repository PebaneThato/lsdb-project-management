import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskComment, TaskCommentResponse, TaskCommentsResponse } from '../interfaces/task-comment.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {

  constructor(private http: HttpClient) {}

  getCommentsByTaskId(taskId: number): Observable<TaskCommentsResponse> {
    return this.http.get<TaskCommentsResponse>(`/api/task-comments.php?taskId=${taskId}`);
  }

  addComment(comment: Partial<TaskComment>): Observable<TaskCommentResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<TaskCommentResponse>(`/api/task-comment-management.php`, comment, { headers });
  }

}