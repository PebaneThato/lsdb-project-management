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

  currentPage = 1;
  itemsPerPage = 10;

  constructor(private taskService: TaskService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const currentUserId = this.authService.currentUserValue.id;
    this.taskService.fetchTaskByAssignedTo(currentUserId).subscribe(tasks =>{
      this.allTasks = tasks;
      this.filteredTasks = [...this.allTasks];
    });
  
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
