import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { removeNotification } from '../../store/slices/uiSlice';

interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  message,
  duration = 5000,
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(id));
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, dispatch]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-900';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-900';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-900';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-900';
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg border-l-4 shadow-lg ${getTypeStyles()}`}
      role="alert"
    >
      <p className="font-medium">{message}</p>
    </div>
  );
};
