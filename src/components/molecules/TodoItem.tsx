import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { TodoPriorityBadge } from '@/components/atoms/TodoPriorityBadge';
import { TodoStatusBadge } from '@/components/atoms/TodoStatusBadge';
import { cn } from '@/lib/utils';
import { Todo } from '@/types/todo';
import { ConfirmationDialog } from '@/components/molecules/ConfirmationDialog';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onEdit, 
  onDelete 
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleEditClick = () => {
    setShowEditConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  const confirmEdit = () => {
    onEdit(todo);
    setShowEditConfirm(false);
  };

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center gap-2 flex-wrap">
        <Checkbox 
          checked={todo.status === 'completed'} 
          onCheckedChange={handleToggle}
          id={`todo-${todo.id}`}
        />
        <label 
          htmlFor={`todo-${todo.id}`}
          className={cn(
            "cursor-pointer select-none",
            todo.status === 'completed' && "line-through text-muted-foreground"
          )}
        >
          {todo.title}
        </label>
        <div className="flex gap-1 flex-wrap">
          <TodoPriorityBadge priority={todo.priority} />
          <TodoStatusBadge status={todo.status} />
        </div>
      </div>
      
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleEditClick} 
          className="h-6 w-6"
        >
          <Edit size={14} />
          <span className="sr-only">Edit</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleDeleteClick} 
          className="h-6 w-6 hover:text-destructive"
        >
          <Trash2 size={14} />
          <span className="sr-only">Delete</span>
        </Button>
      </div>

      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Task"
        description={`Are you sure you want to delete "${todo.title}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <ConfirmationDialog
        isOpen={showEditConfirm}
        onClose={() => setShowEditConfirm(false)}
        onConfirm={confirmEdit}
        title="Edit Task"
        description={`Do you want to edit "${todo.title}"?`}
        confirmText="Edit"
        cancelText="Cancel"
      />
    </div>
  );
};
