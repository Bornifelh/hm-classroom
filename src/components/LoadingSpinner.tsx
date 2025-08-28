import React from 'react';
import { IonSpinner } from '@ionic/react';
import { LoadingSpinnerProps } from '../types';
import './LoadingSpinner.css';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Chargement...' 
}) => {
  const getSpinnerSize = () => {
    switch (size) {
      case 'small':
        return 'small';
      case 'large':
        return 'large';
      default:
        return 'medium';
    }
  };

  return (
    <div className={`loading-container loading-${size}`}>
      <IonSpinner name="crescent" className={`spinner-${size}`} />
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner; 