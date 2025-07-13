import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/app.interface.task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private selectedTask: Task | null = null;

  constructor(private http: HttpClient) { }

  setSelectedTask(task: Task) {
    this.selectedTask = task;
  }

  getSelectedTask(): Task | null {
    return this.selectedTask;
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks.php');
  }

  createTask(formData: FormData): Observable<Task> {
    return this.http.post<Task>('/api/task-management.php', formData);
  }

  updateTask(formData: FormData): Observable<Task> {
    return this.http.put<Task>('/api/task-management.php', formData);
  }

  fetchTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`/api/tasks.php?id=${id}`);
  }
}
