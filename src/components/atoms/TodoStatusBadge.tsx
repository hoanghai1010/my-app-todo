import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Status } from '@/types/todo';

interface TodoStatusBadgeProps {
  status: Status;
}

export const TodoStatusBadge: React.FC<TodoStatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-todo-completed text-black';
      case 'in-progress':
        return 'bg-todo-medium text-black';
      case 'todo':
        return 'bg-secondary text-black';
      default:
        return 'bg-secondary text-black';
    }
  };
  
  const getStatusLabel = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'todo':
        return 'Todo';
      default:
        return 'Todo';
    }
  };

  return (
    <Badge className={cn(getStatusColor())}>
      {getStatusLabel()}
    </Badge>
  );
};
