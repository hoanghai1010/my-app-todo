import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface TodoSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export const TodoSearch: React.FC<TodoSearchProps> = ({ searchTerm, onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
      <Input
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10"
      />
    </div>
  );
};
