export type TaskStatus = "ToDo" | "Completed";

export interface Task {
  name: string;
  category: string;
  description: string;
  createdAt: Date;
  status: TaskStatus;
}

export interface TaskList {
  tasks: Task[];
}
