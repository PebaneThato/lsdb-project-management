import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Project } from 'src/app/interfaces/app.interface.project';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent {
  projects: Project[] = [];
  projects$: Observable<Project[]> | undefined;

  constructor(private projectervice: ProjectService, private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
    const isProjectManager = this.authService.isProjectManager;
    const currentUserId = this.authService.currentUserValue.id;
    this.projects$ = isProjectManager ? this.projectervice.getProjects().pipe(
          map(projects => projects.filter(project => project.projectAssignedTo == currentUserId))
        ) : this.projectervice.getProjects();
  }

  onViewProject(project: Project) {
    console.log(project);
    this.projectervice.setSelectedProject(project);
    this.router.navigate(['/project-details', project.id]);
  }

  onUpdateProject(project: Project) {
    this.projectervice.setSelectedProject(project);
    this.router.navigate(['/update-project', project.id]);
  }
}
