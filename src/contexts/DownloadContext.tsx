import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface DownloadItem {
  id: string;
  title: string;
  progress: number;
  isDownloading: boolean;
  videoUrl: string;
  imgPochette: string;
}

interface DownloadState {
  downloads: DownloadItem[];
  activeDownloads: number;
}

type DownloadAction =
  | { type: 'START_DOWNLOAD'; payload: Omit<DownloadItem, 'progress' | 'isDownloading'> }
  | { type: 'UPDATE_PROGRESS'; payload: { id: string; progress: number } }
  | { type: 'COMPLETE_DOWNLOAD'; payload: { id: string } }
  | { type: 'REMOVE_DOWNLOAD'; payload: { id: string } }
  | { type: 'CLEAR_DOWNLOADS' };

const initialState: DownloadState = {
  downloads: [],
  activeDownloads: 0,
};

const downloadReducer = (state: DownloadState, action: DownloadAction): DownloadState => {
  switch (action.type) {
    case 'START_DOWNLOAD':
      return {
        ...state,
        downloads: [...state.downloads, { ...action.payload, progress: 0, isDownloading: true }],
        activeDownloads: state.activeDownloads + 1,
      };
    
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        downloads: state.downloads.map(download =>
          download.id === action.payload.id
            ? { ...download, progress: action.payload.progress }
            : download
        ),
      };
    
    case 'COMPLETE_DOWNLOAD':
      return {
        ...state,
        downloads: state.downloads.map(download =>
          download.id === action.payload.id
            ? { ...download, progress: 100, isDownloading: false }
            : download
        ),
        activeDownloads: Math.max(0, state.activeDownloads - 1),
      };
    
    case 'REMOVE_DOWNLOAD':
      return {
        ...state,
        downloads: state.downloads.filter(download => download.id !== action.payload.id),
        activeDownloads: state.downloads.find(d => d.id === action.payload.id)?.isDownloading 
          ? Math.max(0, state.activeDownloads - 1) 
          : state.activeDownloads,
      };
    
    case 'CLEAR_DOWNLOADS':
      return {
        ...state,
        downloads: [],
        activeDownloads: 0,
      };
    
    default:
      return state;
  }
};

interface DownloadContextType {
  state: DownloadState;
  startDownload: (title: string, videoUrl: string, imgPochette: string) => string;
  updateProgress: (id: string, progress: number) => void;
  completeDownload: (id: string) => void;
  removeDownload: (id: string) => void;
  clearDownloads: () => void;
  getDownloadById: (id: string) => DownloadItem | undefined;
  isDownloading: (title: string) => boolean;
}

const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export const DownloadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(downloadReducer, initialState);

  const startDownload = (title: string, videoUrl: string, imgPochette: string): string => {
    const id = `download_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    dispatch({
      type: 'START_DOWNLOAD',
      payload: { id, title, videoUrl, imgPochette },
    });
    
    return id;
  };

  const updateProgress = (id: string, progress: number) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: { id, progress } });
  };

  const completeDownload = (id: string) => {
    dispatch({ type: 'COMPLETE_DOWNLOAD', payload: { id } });
  };

  const removeDownload = (id: string) => {
    dispatch({ type: 'REMOVE_DOWNLOAD', payload: { id } });
  };

  const clearDownloads = () => {
    dispatch({ type: 'CLEAR_DOWNLOADS' });
  };

  const getDownloadById = (id: string): DownloadItem | undefined => {
    return state.downloads.find(download => download.id === id);
  };

  const isDownloading = (title: string): boolean => {
    return state.downloads.some(download => download.title === title && download.isDownloading);
  };

  const value: DownloadContextType = {
    state,
    startDownload,
    updateProgress,
    completeDownload,
    removeDownload,
    clearDownloads,
    getDownloadById,
    isDownloading,
  };

  return (
    <DownloadContext.Provider value={value}>
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownload = (): DownloadContextType => {
  const context = useContext(DownloadContext);
  if (context === undefined) {
    throw new Error('useDownload must be used within a DownloadProvider');
  }
  return context;
};
