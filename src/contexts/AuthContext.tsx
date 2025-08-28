import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, LoginCredentials } from '../types';
import { apiService } from '../services/api';
import { secureStorage, validateUser, updateUserActivity } from '../utils/security';
import { logError } from '../utils/errorHandler';

// Types pour le contexte
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (userData: User) => void;
  clearError: () => void;
}

// Actions pour le reducer
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// État initial
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider du contexte
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = secureStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          if (validateUser(user)) {
            // Vérifier si la session n'a pas expiré
            const lastActivity = secureStorage.getItem('lastActivity');
            if (lastActivity) {
              const lastActivityTime = parseInt(lastActivity, 10);
              const currentTime = Date.now();
              const sessionTimeout = 24 * 60 * 60 * 1000; // 24 heures
              
              if ((currentTime - lastActivityTime) <= sessionTimeout) {
                // Mettre à jour les données utilisateur depuis le serveur
                try {
                  const updatedUser = await apiService.getUserData(user.id_eleve);
                  dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });
                  secureStorage.setItem('user', JSON.stringify(updatedUser));
                  updateUserActivity();
                } catch (error) {
                  logError(error, 'AuthContext');
                  // Utiliser les données locales si la mise à jour échoue
                  dispatch({ type: 'LOGIN_SUCCESS', payload: user });
                }
              } else {
                // Session expirée
                logout();
              }
            } else {
              dispatch({ type: 'LOGIN_SUCCESS', payload: user });
            }
          } else {
            logout();
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        logError(error, 'AuthContext');
        logout();
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_START' });
      
      const response = await apiService.login(credentials);
      
      if (response.success && response.id_eleve) {
        const userData: User = {
          id_eleve: response.id_eleve,
          nom_eleve: response.nom_eleve || '',
          login_eleve: response.login_eleve || '',
          date_souscription: response.date_souscription || '',
          fin_souscription: response.fin_souscription || '',
          abonnement: response.abonnement || 0,
          id_niveau: response.id_niveau || 0,
          image_profile_eleve: response.image_profile_eleve || '',
          fin_essaie: response.fin_essaie || '',
        };

        // Stocker les données utilisateur de manière sécurisée
        secureStorage.setItem('user', JSON.stringify(userData));
        updateUserActivity();

        dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      } else {
        dispatch({ 
          type: 'LOGIN_FAILURE', 
          payload: response.message || 'Identifiants incorrects' 
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur de connexion';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
    }
  };

  // Fonction de déconnexion
  const logout = (): void => {
    secureStorage.removeItem('user');
    secureStorage.removeItem('lastActivity');
    dispatch({ type: 'LOGOUT' });
  };

  // Fonction de mise à jour de l'utilisateur
  const updateUser = (userData: User): void => {
    secureStorage.setItem('user', JSON.stringify(userData));
    updateUserActivity();
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  // Fonction pour effacer les erreurs
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 