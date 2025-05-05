import React from 'react';
import { cn } from '@/lib/utils';
import { Toaster as Sonner } from "sonner"

interface SonnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Toaster = () => {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
    />
  )
}

export function ToasterComponent() {
  return (
    <div
      className={cn(
        'fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4'
      )}
    />
  );
} 