
import React, { useState } from 'react';
import { LoginForm } from '@/components/molecules/LoginForm';
import { ForgotPasswordDialog } from '@/components/molecules/ForgotPasswordDialog';

const LoginPage = () => {
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border border-border">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your tasks</p>
        </div>

        <LoginForm onForgotPassword={() => setForgotPasswordOpen(true)} />
      </div>

      <ForgotPasswordDialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen} />
    </div>
  );
};

export default LoginPage;
