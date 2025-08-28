// Types pour l'authentification et l'utilisateur
export interface User {
  id_eleve: number;
  nom_eleve: string;
  login_eleve: string;
  date_souscription: string;
  fin_souscription: string;
  abonnement: number;
  id_niveau: number;
  image_profile_eleve: string;
  fin_essaie: string;
}

export interface LoginCredentials {
  login_eleve: string;
  pass_eleve: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  nom_eleve?: string;
  login_eleve?: string;
  id_eleve?: number;
  date_souscription?: string;
  fin_souscription?: string;
  abonnement?: number;
  id_niveau?: number;
  image_profile_eleve?: string;
  fin_essaie?: string;
}

// Types pour les cours et matières
export interface Cours {
  id_cours: number;
  id_matiere: number;
  video_link: string;
  video_share_link: string;
  pochette_cours: string;
  titre_cours: string;
  sous_titre_cours: string;
  description_cours: string;
  date_publication_cours: string;
  duree_cours: string;
}

export interface Matiere {
  id_matiere: number;
  pochette_matiere: string;
  nom_matiere: string;
  description: string;
  id_prof: string;
  lessons_matiere?: string;
  heure_matiere?: string;
}

export interface Prof {
  id_prof: number;
  id_niveau: number;
  id_matiere: number;
  nom_prof: string;
}

export interface NiveauEleve {
  id_niveau: number;
  nom_niveau: string;
  pochette_niveau: string;
}

// Types pour les vidéos téléchargées
export interface Video {
  id: number;
  title: string;
  filePath: string;
  imgPochette: string;
}

// Types pour les quiz
export interface Question {
  id_question: number;
  question: string;
  reponse_a: string;
  reponse_b: string;
  reponse_c: string;
  reponse_d: string;
  bonne_reponse: string;
}

export interface ReponseQuizz {
  id_reponse: number;
  id_question: number;
  reponse_eleve: string;
  bonne_reponse: string;
  score: number;
}

export interface QuizScore {
  score: number;
  maxScore: number;
}

// Types pour les paiements
export interface PaymentData {
  id_eleve: number;
  montant: number;
  operateur: string;
  numero_client: string;
  code_promo?: string;
}

// Types pour les erreurs
export interface ApiError {
  message: string;
  code: string;
  statusCode?: number;
}

// Types pour les événements
export interface SearchEvent extends CustomEvent {
  detail: {
    value: string;
  };
}

// Types pour les props des composants
export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
} 