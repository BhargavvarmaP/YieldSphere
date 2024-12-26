import { useState, useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { addNotification } from '../store/slices/uiSlice';

interface ApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  showSuccessNotification?: boolean;
  showErrorNotification?: boolean;
}

interface ApiState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export const useApi = <T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: ApiOptions<T> = {}
) => {
  const {
    onSuccess,
    onError,
    showSuccessNotification = false,
    showErrorNotification = true,
  } = options;

  const dispatch = useAppDispatch();
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await apiFunction(...args);
        setState({ data, error: null, isLoading: false });

        if (showSuccessNotification) {
          dispatch(
            addNotification({
              type: 'success',
              message: 'Operation completed successfully',
            })
          );
        }

        onSuccess?.(data);
        return data;
      } catch (error) {
        const errorObject = error instanceof Error ? error : new Error('An error occurred');
        setState({ data: null, error: errorObject, isLoading: false });

        if (showErrorNotification) {
          dispatch(
            addNotification({
              type: 'error',
              message: errorObject.message,
            })
          );
        }

        onError?.(errorObject);
        throw errorObject;
      }
    },
    [apiFunction, onSuccess, onError, showSuccessNotification, showErrorNotification, dispatch]
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
