import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/app.interface.project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {
  project: Project | null = null;
  loading = true;
  error = '';

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const storedProject = this.projectService.getSelectedProject();
    if (storedProject && storedProject.id === id) {
      this.project = storedProject;
      this.loading = false;
    } else {
      this.projectService.fetchProjectById(id).subscribe({
        next: (project) => {
          this.project = project;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load project.';
          this.loading = false;
        }
      });
    }
  }

  onViewProjects() {
    this.router.navigate(['/projects-list']);
  }

}
