import React from 'react';
import { IonBadge, IonIcon, IonButton } from '@ionic/react';
import { download, checkmark } from 'ionicons/icons';
import { useDownload } from '../contexts/DownloadContext';
import CircularProgress from './CircularProgress';
import './DownloadIndicator.css';

const DownloadIndicator: React.FC = () => {
  const { state } = useDownload();
  const { downloads, activeDownloads } = state;

  if (activeDownloads === 0) {
    return null;
  }

  return (
    <div className="download-indicator">
      <IonButton
        fill="clear"
        size="small"
        className="download-button"
        routerLink="/Videos"
      >
        <IonIcon icon={download} />
        <IonBadge color="primary" className="download-badge">
          {activeDownloads}
        </IonBadge>
      </IonButton>
      
      {/* Liste des téléchargements en cours */}
      <div className="download-list">
        {downloads
          .filter(download => download.isDownloading)
          .map(download => (
            <div key={download.id} className="download-item">
              <CircularProgress
                progress={download.progress}
                size={32}
                strokeWidth={3}
                showPercentage={false}
                className="downloading"
              />
              <span className="download-title">{download.title}</span>
              <span className="download-progress">{download.progress}%</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DownloadIndicator;
