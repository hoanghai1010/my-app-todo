import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Trash2, Undo } from 'lucide-react';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { ConfirmationDialog } from '@/components/molecules/ConfirmationDialog';

interface TodoActionsProps {
  onSelectAll: () => void;
  onDeleteAll: () => void;
  onUndo: () => void;
  canUndo: boolean;
  isAnyTodoLeft: boolean;
}

export const TodoActions: React.FC<TodoActionsProps> = ({ 
  onSelectAll, 
  onDeleteAll, 
  onUndo,
  canUndo,
  isAnyTodoLeft
}) => {
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [showSelectAllConfirm, setShowSelectAllConfirm] = useState(false);

  const handleDeleteAllClick = () => {
    setShowDeleteAllConfirm(true);
  };

  const handleSelectAllClick = () => {
    setShowSelectAllConfirm(true);
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleSelectAllClick}
        disabled={!isAnyTodoLeft}
      >
        <Check size={16} />
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleDeleteAllClick}
        className="text-destructive hover:text-destructive"
        disabled={!isAnyTodoLeft}
      >
        <Trash2 size={16} />
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onUndo}
        disabled={!canUndo}
      >
        <Undo size={16} />
      </Button>
      
      <ThemeToggle />

      <ConfirmationDialog
        isOpen={showDeleteAllConfirm}
        onClose={() => setShowDeleteAllConfirm(false)}
        onConfirm={() => {
          onDeleteAll();
          setShowDeleteAllConfirm(false);
        }}
        title="Delete All Tasks"
        description="Are you sure you want to delete all tasks? This action cannot be undone."
        confirmText="Delete All"
        cancelText="Cancel"
      />

      <ConfirmationDialog
        isOpen={showSelectAllConfirm}
        onClose={() => setShowSelectAllConfirm(false)}
        onConfirm={() => {
          onSelectAll();
          setShowSelectAllConfirm(false);
        }}
        title="Complete All Tasks"
        description="Are you sure you want to mark all tasks as completed?"
        confirmText="Complete All"
        cancelText="Cancel"
      />
    </div>
  );
};
