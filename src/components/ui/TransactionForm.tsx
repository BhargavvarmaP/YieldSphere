import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './Button';
import type { Transaction } from '../../types/portfolio';

interface TransactionFormProps {
  onSubmit: (data: Omit<Transaction, 'id'>) => void;
  isLoading: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Asset</label>
        <select {...register('assetId', { required: true })} className="mt-1 block w-full rounded-md border-gray-300">
          <option value="">Select Asset</option>
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          {...register('amount', { required: true, min: 0 })}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Submit Transaction'}
      </Button>
    </form>
  );
};