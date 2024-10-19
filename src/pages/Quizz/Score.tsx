import { IonButton, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonPage } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./scrore.css";
import { colorWand, repeat, returnUpBack } from "ionicons/icons";

interface ReponseQuizz {
  id_qcm: string;
  reponse_qcm: string;
  choice_reponse: string;
  id_cours: string;
  statut: string;
  id_user: string;
  question_qcm: string;
}

const Score: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // id_cours
  const history = useHistory();
  const [user, setUser] = useState<any>(null);
  const [quizData, setQuizData] = useState<ReponseQuizz[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Ajout du state pour le chargement

  // Premier useEffect pour récupérer les données utilisateur
  useEffect(() => {
    const userData = localStorage.getItem("user"); // Récupération des données utilisateur depuis localStorage
    if (!userData) {
      window.location.href = "/Login"; // Redirection si l'utilisateur n'est pas trouvé
    } else {
      setUser(JSON.parse(userData)); // Stockage des données utilisateur dans le state
    }
  }, []);
  

  // Deuxième useEffect pour récupérer les données du quiz
  useEffect(() => {
    // Si les données utilisateur ne sont pas encore chargées, ne pas exécuter la requête API
    if (!user || !user.id_eleve) return;
  
    const fetchQuizData = async () => {
      setLoading(true); // Indiquer le début du chargement
  
      try {
        const response = await axios.get(
          `https://hmproges.online/backendhmclassroom/quizz_reponse_view.php?id_cours=${id}&id_user=${user.id_eleve}`
        );
  
        if (Array.isArray(response.data)) {
          const fetchedQuizData: ReponseQuizz[] = response.data.map((item: any) => ({
            id_qcm: item.id_qcm,
            reponse_qcm: item.reponse_qcm,
            choice_reponse: item.choice_reponse,
            id_cours: item.id_cours,
            statut: item.statut,
            id_user: item.id_user,
            question_qcm: item.question_qcm,
          }));
  
          setQuizData(fetchedQuizData);
        } else {
          setQuizData([]); // Réinitialiser les données du quiz si la réponse n'est pas un tableau
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données du quiz:", error);
        setQuizData([]); // Réinitialiser les données du quiz en cas d'erreur
      } finally {
        setLoading(false); // Indiquer la fin du chargement
      }
    };
  
    fetchQuizData();
  }, [id, user]); // Exécuter lorsque l'id du cours ou les données utilisateur changent
   // Ajouter user.id_eleve comme dépendance

const handleGoBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {loading ? (
          <p>Chargement en cours...</p>
        ) : (
          <div>
            {quizData.length > 0 ? (
              quizData.map((question, index) => (
                <div key={index} className="content-resultat">
                  <p><b>Question :</b> <span>{question.question_qcm}</span></p>
                  <p>Réponse utilisateur : {question.choice_reponse}</p>
                  <p>Réponse correcte : {question.reponse_qcm}</p>
                  <p>Etat : <span>{question.statut}</span></p>
                </div>
              ))
            ) : (
              <p>Aucune donnée de quiz disponible.</p>
            )}
          </div>
        )}
        {/* <section className="btns-content">
            <IonButton expand="full">Retour</IonButton>
            <IonButton expand="full">Recommencer</IonButton>
        </section> */}

        <IonFab slot="fixed" horizontal="start" vertical="bottom">
      <IonFabButton >
        <IonIcon icon={colorWand}></IonIcon>
      </IonFabButton>
      <IonFabList side="end">
        <IonFabButton onClick={handleGoBack}>
          <IonIcon icon={returnUpBack}></IonIcon>
        </IonFabButton>
        <IonFabButton>
          <IonIcon icon={repeat}></IonIcon>
        </IonFabButton>
      </IonFabList>
    </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Score;
