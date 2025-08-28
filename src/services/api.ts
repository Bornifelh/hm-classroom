import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  User, 
  LoginCredentials, 
  LoginResponse, 
  Cours, 
  Matiere, 
  Prof, 
  NiveauEleve,
  Question,
  QuizScore,
  PaymentData,
  Video
} from '../types';
import { handleApiError, logError } from '../utils/errorHandler';

class ApiService {
  private api: AxiosInstance;
  private baseURL = 'https://hmproges.online/backendhmclassroom';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour les requêtes
    this.api.interceptors.request.use(
      (config) => {
        // Ajouter des headers d'authentification si nécessaire
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        logError(error, 'API Request');
        return Promise.reject(error);
      }
    );

    // Intercepteur pour les réponses
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        logError(error, 'API Response');
        return Promise.reject(handleApiError(error));
      }
    );
  }

  // Authentification
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.api.post('/user_login_test.php', credentials);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getUserData(userId: number): Promise<User> {
    try {
      const response = await this.api.post('/donnees_user_update.php', {
        id_eleve: userId
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Cours et matières
  async getMatieresByNiveau(niveauId: number): Promise<Matiere[]> {
    try {
      const response = await this.api.get(`/category_api.php?id_niveau=${niveauId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getCoursDetails(coursId: number): Promise<Cours> {
    try {
      const response = await this.api.get(`/details_cours_api.php?id_cours=${coursId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getMatiereDetails(matiereId: number): Promise<Matiere> {
    try {
      const response = await this.api.get(`/details_api.php?id_matiere=${matiereId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getCoursList(matiereId: number): Promise<Cours[]> {
    try {
      const response = await this.api.get(`/liste_cours_api.php?id_matiere=${matiereId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getProfDetails(profId: string): Promise<Prof> {
    try {
      const response = await this.api.get(`/details_prof_api.php?id_prof=${profId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getNiveauEleve(niveauId: number): Promise<NiveauEleve> {
    try {
      const response = await this.api.get(`/recup_niveau_eleve.php?id_niveau=${niveauId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Quiz
  async getQuizQuestions(coursId: number): Promise<Question[]> {
    try {
      const response = await this.api.get(`/quizz_api.php?id_cours=${coursId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async submitQuizAnswers(data: {
    id_cours: number;
    id_user: number;
    reponses: Array<{ id_question: number; reponse_eleve: string }>;
  }): Promise<{ success: boolean; score: number }> {
    try {
      const response = await this.api.post('/quizz_submit.php', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getQuizScore(coursId: number, userId: number): Promise<QuizScore> {
    try {
      const response = await this.api.post('/quizz_score.php', {
        id_cours: coursId,
        id_user: userId,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Paiements
  async processPayment(paymentData: PaymentData): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.api.post('/process_payment.php', paymentData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Utilitaires
  async checkConnection(): Promise<boolean> {
    try {
      await this.api.get('/health.php');
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Instance singleton
export const apiService = new ApiService();
export default apiService; 