import { Component } from '@angular/core';
import { Project } from 'src/app/interfaces/app.interface.project';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {
  projectDetails: Project | null = null;

}
