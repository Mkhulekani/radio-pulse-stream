import { Check } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const Notification = () => {
  const { notification } = useApp();
  
  if (!notification) return null;
  
  return (
    <div className={`fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 ${
      notification.type === 'success' ? 'bg-green-500' : 
      notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    } text-white animate-in slide-in-from-top-5`}>
      <Check className="w-5 h-5" />
      <span className="font-semibold">{notification.message}</span>
    </div>
  );
};
