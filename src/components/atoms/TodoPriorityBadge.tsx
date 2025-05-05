import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Priority } from '@/types/todo';

interface TodoPriorityBadgeProps {
  priority: Priority;
}

export const TodoPriorityBadge: React.FC<TodoPriorityBadgeProps> = ({ priority }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return 'bg-todo-high text-black';
      case 'medium':
        return 'bg-todo-medium text-black';
      case 'low':
        return 'bg-todo-low text-black';
      default:
        return 'bg-todo-default text-black';
    }
  };
  
  const getPriorityLabel = () => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'None';
    }
  };

  return (
    <Badge className={cn(getPriorityColor())}>
      {getPriorityLabel()}
    </Badge>
  );
};
