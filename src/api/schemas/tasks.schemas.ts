export interface Task {
    name: string,
    category: string,
    description: string,
    createdAt: Date
}

export interface TaskList {
    tasks: Task[]
}