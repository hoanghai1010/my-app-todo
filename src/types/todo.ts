export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'completed';

export interface Todo {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
}