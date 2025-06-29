import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/app.interface.project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private selectedProject: Project | null = null;

  constructor(private http: HttpClient) { }

  setSelectedProject(project: Project) {
    this.selectedProject = project;
  }

  getSelectedProject(): Project | null {
    return this.selectedProject;
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects.php');
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>('/api/project-management.php', project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>('/api/project-management.php', project);
  }

  fetchProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`/api/projects.php?id=${id}`);
  }
}
