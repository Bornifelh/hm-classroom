import axios from 'axios';
import { ApiError } from '../types';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.message || 
                   error.message || 
                   'Erreur de connexion au serveur';
    
    return new AppError(message, 'API_ERROR', statusCode);
  }
  
  if (error instanceof AppError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new AppError(error.message, 'UNKNOWN_ERROR');
  }
  
  return new AppError('Erreur inconnue', 'UNKNOWN_ERROR');
};

export const isNetworkError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return !error.response;
  }
  return false;
};

export const getErrorMessage = (error: unknown): string => {
  if (isNetworkError(error)) {
    return 'Erreur de connexion. Vérifiez votre connexion internet.';
  }
  
  const appError = handleApiError(error);
  return appError.message;
};

export const logError = (error: unknown, context?: string): void => {
  const appError = handleApiError(error);
  console.error(`[${context || 'App'}] Error:`, {
    message: appError.message,
    code: appError.code,
    statusCode: appError.statusCode,
    stack: appError.stack
  });
}; 