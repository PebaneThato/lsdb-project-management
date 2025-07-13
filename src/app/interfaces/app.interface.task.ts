export interface Task {
  id: number;
  taskTitle: string;
  taskType: string;
  taskPriority: string;
  taskStatus: string;
  taskstartDate: string;
  taskEndDate: string;
  projectId: number;
  projectName: string;
  taskAssignedTo: number;
  taskAssignedToName: string;
  taskCreatedBy: number;
  taskCreatedByName: string;
  taskDescription: string;
  file: File | null;
}