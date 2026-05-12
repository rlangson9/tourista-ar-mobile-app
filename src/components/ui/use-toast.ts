import { useCallback } from 'react';
import { toast } from 'sonner';

export function useToast() {
  const success = useCallback((message: string, options?: Parameters<typeof toast>[1]) => {
    return toast.success(message, options);
  }, []);

  const error = useCallback((message: string, options?: Parameters<typeof toast>[1]) => {
    return toast.error(message, options);
  }, []);

  const info = useCallback((message: string, options?: Parameters<typeof toast>[1]) => {
    return toast(message, options);
  }, []);

  const loading = useCallback((message: string, options?: Parameters<typeof toast>[1]) => {
    return toast.loading(message, options);
  }, []);

  return {
    success,
    error,
    info,
    loading,
    toast,
  };
}
