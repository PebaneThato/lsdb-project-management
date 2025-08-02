import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/interfaces/app.interface.task';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { TASK_STATUSES } from 'src/app/shared/app.constants';

@Component({
  selector: 'app-task-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {
  allTasks: Task[] = [];
  filteredTasks: Task[] = [];
  taskStatuses = TASK_STATUSES;

  filters = {
    status: '',
    startDate: '',
    endDate: ''
  };

  constructor(private taskService: TaskService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // Replace with your actual data source
    this.allTasks = [
      {
        id: 1,
        taskTitle: "Task A",
        taskType: "Testing B",
        taskPriority: "Critical",
        taskStatus: "In process",
        taskstartDate: "2025-08-15",
        taskEndDate: "2025-08-15",
        projectId: 1,
        projectName: "test Project",
        taskAssignedTo: 1,
        taskAssignedToName: "Test Name",
        taskCreatedBy: 2,
        taskCreatedByName: "",
        taskDescription: "",
        file: null
      },
      {
        id: 1,
        taskTitle: "Task B",
        taskType: "Testing B",
        taskPriority: "Critical",
        taskStatus: "In process",
        taskstartDate: "2025-08-15",
        taskEndDate: "2026-04-23",
        projectId: 1,
        projectName: "test Project",
        taskAssignedTo: 1,
        taskAssignedToName: "Test Name",
        taskCreatedBy: 2,
        taskCreatedByName: "",
        taskDescription: "",
        file: null
      },
      {
        id: 1,
        taskTitle: "Task C",
        taskType: "Testing C",
        taskPriority: "Critical",
        taskStatus: "In process",
        taskstartDate: "2025-08-15",
        taskEndDate: "2025-08-15",
        projectId: 1,
        projectName: "test Project",
        taskAssignedTo: 1,
        taskAssignedToName: "Test Name",
        taskCreatedBy: 2,
        taskCreatedByName: "",
        taskDescription: "",
        file: null
      }
    ];
    this.filteredTasks = [...this.allTasks];
  }

  get uniqueStatuses(): string[] {
    return [...new Set(this.allTasks.map(task => task.taskStatus))];
  }

  applyFilters(): void {
    const { status, startDate, endDate } = this.filters;
    this.filteredTasks = this.allTasks.filter(task => {
      const taskEnd = new Date(task.taskEndDate).toISOString().slice(0, 10);
      return (!status || task.taskStatus === status) &&
        (!startDate || taskEnd >= startDate) &&
        (!endDate || taskEnd <= endDate);
    });
  }

  resetFilters(): void {
    this.filters = { status: '', startDate: '', endDate: '' };
    this.filteredTasks = [...this.allTasks];
  }

  onViewProject(task: Task){
    this.taskService.setSelectedTask(task);
    this.router.navigate(['/task-details', task.id]);
  }
}
