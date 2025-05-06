import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoTemplate } from '@/components/templates/TodoTemplate';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const TodoPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <TodoTemplate />
      </div>
    </div>
  );
};

export default TodoPage;
