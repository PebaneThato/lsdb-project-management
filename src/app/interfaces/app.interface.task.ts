import { Project } from "./app.interface.project";

export interface Task {
  id: number;
  taskTitle: string;
  taskType: string;
  taskPriority: string;
  taskStatus: string;
  taskstartDate: string;
  taskEndDate: string;
  projectId: number;
  taskAssignedTo: number;
  taskDescription: string;
  file: File | null;
  
}