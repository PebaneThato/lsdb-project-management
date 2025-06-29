import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Project } from 'src/app/interfaces/app.interface.project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent {
  projects: Project[] = [];
  projects$: Observable<Project[]> | undefined;

  constructor(private projectervice: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projects$ = this.projectervice.getProjects();
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
