import React, { useState, useEffect } from 'react';
import { TodoForm } from '@/components/molecules/TodoForm';
import { TodoSearch } from '@/components/molecules/TodoSearch';
import { TodoList } from '@/components/organisms/TodoList';
import { TodoActions } from '@/components/molecules/TodoActions';
import { Todo } from '@/types/todo';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

export const TodoTemplate = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTodo, setNewTodo] = useState<Partial<Todo>>({
    title: '',
    priority: 'medium',
    status: 'todo'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [todoHistory, setTodoHistory] = useState<Todo[][]>([]);
  const { toast } = useToast();

  // Initialize with sample todos
  useEffect(() => {
    const initialTodos = [
      { id: uuidv4(), title: 'Learn React', priority: 'high' as const, status: 'completed' as const },
      { id: uuidv4(), title: 'Build Todo App', priority: 'medium' as const, status: 'in-progress' as const },
      { id: uuidv4(), title: 'Study TypeScript', priority: 'low' as const, status: 'todo' as const },
    ];
    setTodos(initialTodos);
  }, []);

  // Save state before changing it
  const saveHistory = () => {
    setTodoHistory((prev) => [...prev, [...todos]]);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTodo.title?.trim()) return;
    
    saveHistory();

    if (isEditing && newTodo.id) {
      // Update existing todo
      setTodos((prev) =>
        prev.map((todo) => (todo.id === newTodo.id ? { ...todo, ...newTodo } as Todo : todo))
      );
      toast({
        title: "Task updated",
        description: `"${newTodo.title}" has been updated.`,
      });
    } else {
      // Add new todo
      const todo: Todo = {
        id: uuidv4(),
        title: newTodo.title,
        priority: newTodo.priority || 'medium',
        status: newTodo.status || 'todo'
      };
      setTodos((prev) => [...prev, todo]);
      toast({
        title: "Task added",
        description: `"${todo.title}" has been added to your todo list.`,
      });
    }

    // Reset form
    setNewTodo({
      title: '',
      priority: 'medium',
      status: 'todo'
    });
    setIsEditing(false);
  };

  // Handle toggle complete
  const handleToggle = (id: string) => {
    saveHistory();
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === 'completed' ? 'todo' : 'completed' }
          : todo
      )
    );
  };

  // Handle edit todo
  const handleEdit = (todo: Todo) => {
    setNewTodo(todo);
    setIsEditing(true);
  };

  // Handle delete todo
  const handleDelete = (id: string) => {
    saveHistory();
    const todoToDelete = todos.find(todo => todo.id === id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast({
      title: "Task deleted",
      description: `"${todoToDelete?.title}" has been removed.`,
    });
  };

  // Handle delete all
  const handleDeleteAll = () => {
    if (todos.length === 0) return;
    
    saveHistory();
    setTodos([]);
    toast({
      title: "All tasks deleted",
      description: "All tasks have been removed.",
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (todos.length === 0) return;
    
    saveHistory();
    setTodos((prev) =>
      prev.map((todo) => ({ ...todo, status: 'completed' }))
    );
    toast({
      title: "All tasks completed",
      description: "All tasks have been marked as completed.",
    });
  };

  // Handle undo
  const handleUndo = () => {
    if (todoHistory.length === 0) return;
    
    const prevTodos = todoHistory[todoHistory.length - 1];
    setTodos(prevTodos);
    setTodoHistory((prev) => prev.slice(0, -1));
    toast({
      title: "Action undone",
      description: "Your last action has been undone.",
    });
  };

  // Filter todos based on search term
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <div className="flex items-center space-x-2">
          <TodoActions
            onSelectAll={handleSelectAll}
            onDeleteAll={handleDeleteAll}
            onUndo={handleUndo}
            canUndo={todoHistory.length > 0}
            isAnyTodoLeft={todos.length > 0}
          />
        </div>
      </div>
      
      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
      
      <TodoSearch searchTerm={searchTerm} onSearch={setSearchTerm} />
      
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
