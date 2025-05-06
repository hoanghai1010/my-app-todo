import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Priority, Status, Todo } from '@/types/todo';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  newTodo: Partial<Todo>;
  setNewTodo: React.Dispatch<React.SetStateAction<Partial<Todo>>>;
  onSubmit: (e: React.FormEvent) => void;
  isEditing: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ 
  newTodo, 
  setNewTodo, 
  onSubmit,
  isEditing
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handlePriorityChange = (value: Priority) => {
    setNewTodo({ ...newTodo, priority: value });
  };

  const handleStatusChange = (value: Status) => {
    setNewTodo({ ...newTodo, status: value });
  };

  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          name="title"
          placeholder="Add a new task"
          value={newTodo.title || ''}
          onChange={handleChange}
          required
          className="flex-1"
          autoFocus
        />

      <div className="flex gap-2">
          <Select
            value={newTodo.priority}
            onValueChange={handlePriorityChange}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={newTodo.status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">Todo</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit">
            {isEditing ? 'Update' : <Plus size={16} />}
          </Button>
        </div>
      </div>
    </form>
  );
};
