// Utilitaire de sécurité pour le stockage des données sensibles
// Note: Dans un environnement de production, utilisez une bibliothèque de chiffrement plus robuste

const ENCRYPTION_KEY = 'hm-classroom-secure-key-2024';

// Fonction simple de chiffrement (à remplacer par une solution plus robuste en production)
const encrypt = (text: string): string => {
  try {
    // Encodage simple en base64 avec une clé
    const encoded = btoa(text + ENCRYPTION_KEY);
    return encoded;
  } catch (error) {
    console.error('Erreur de chiffrement:', error);
    return text; // Fallback en cas d'erreur
  }
};

// Fonction simple de déchiffrement
const decrypt = (encryptedText: string): string => {
  try {
    // Déchiffrement simple
    const decoded = atob(encryptedText);
    return decoded.replace(ENCRYPTION_KEY, '');
  } catch (error) {
    console.error('Erreur de déchiffrement:', error);
    return encryptedText; // Fallback en cas d'erreur
  }
};

export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      const encrypted = encrypt(value);
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Erreur lors du stockage sécurisé:', error);
      // Fallback vers le stockage normal
      localStorage.setItem(key, value);
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return decrypt(encrypted);
    } catch (error) {
      console.error('Erreur lors de la récupération sécurisée:', error);
      // Fallback vers la récupération normale
      return localStorage.getItem(key);
    }
  },
  
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    localStorage.clear();
  }
};

// Validation des données utilisateur
export const validateUser = (user: unknown): user is any => {
  if (!user || typeof user !== 'object') return false;
  
  const requiredFields = ['id_eleve', 'nom_eleve', 'login_eleve'];
  return requiredFields.every(field => field in user);
};

// Nettoyage des données sensibles
export const sanitizeUserData = (user: any): any => {
  const { pass_eleve, ...sanitizedUser } = user;
  return sanitizedUser;
};

// Vérification de l'expiration de session
export const isSessionExpired = (): boolean => {
  const lastActivity = secureStorage.getItem('lastActivity');
  if (!lastActivity) return true;
  
  const lastActivityTime = parseInt(lastActivity, 10);
  const currentTime = Date.now();
  const sessionTimeout = 24 * 60 * 60 * 1000; // 24 heures
  
  return (currentTime - lastActivityTime) > sessionTimeout;
};

// Mise à jour de l'activité utilisateur
export const updateUserActivity = (): void => {
  secureStorage.setItem('lastActivity', Date.now().toString());
}; 