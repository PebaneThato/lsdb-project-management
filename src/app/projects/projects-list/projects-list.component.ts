import { Component } from '@angular/core';
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

  constructor(private projectervice: ProjectService) { }

  ngOnInit(): void {
    this.projects$ = of([
      {
        id: 1,
        projectName: "Test Project Name",
        projectStartDate: "2025-06-25",
        projectEndDate: "2026-06024",
        projectDescription: "LSDB programme to teach students",
        projectCreatedBy: "1",
        projectAssignedTo: "5"
      },
      {
        id: 2,
        projectName: "Induction Project For New Comers",
        projectStartDate: "2025-06-25",
        projectEndDate: "2026-06024",
        projectDescription: "LSDB programme to teach students",
        projectCreatedBy: "1",
        projectAssignedTo: "5"
      }
    ]);
  }

  onView(project: Project) {
    console.log('Edit clicked:', project);
  }

  onUpdate(project: Project) {
    console.log('Update clicked:', project);
  }
}
