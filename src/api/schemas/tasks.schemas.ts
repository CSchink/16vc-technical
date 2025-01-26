//Task Definitions

export type TaskStatus = "ToDo" | "Completed" | "Deleted";

export interface Task {
  id: any;
  name: string;
  category: string;
  description: string;
  createdAt: Date;
  status: TaskStatus;
}

export interface TaskList {
  tasks: Task[];
}
