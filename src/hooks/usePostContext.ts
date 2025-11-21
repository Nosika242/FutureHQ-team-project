
import { useContext } from 'react';
import { PostContext } from '../context/PostContext';
import type { PostContextType } from '../context/PostContext';

export default function usePostContext(): PostContextType {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostContext must be used within an PostProvider');
  }
  return context;
}