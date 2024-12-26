import { useState, useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { portfolioService } from '../services/api/portfolioService';
import { addNotification } from '../store/slices/uiSlice';
import type { Transaction } from '../types/portfolio';

export const usePortfolioManagement = (portfolioId: string) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const executeTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    setIsLoading(true);
    try {
      const result = await portfolioService.createTransaction(portfolioId, transaction);
      dispatch(addNotification({
        type: 'success',
        message: 'Transaction executed successfully'
      }));
      return result;
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to execute transaction'
      }));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [portfolioId, dispatch]);

  return {
    executeTransaction,
    isLoading
  };
};