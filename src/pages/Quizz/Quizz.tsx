import {
  IonContent,
  IonPage,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonList,
  IonItem,
  IonSpinner,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonFab,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import "./Quizz.css";
import { chevronBack } from "ionicons/icons";

interface Question {
  id_qcm: string;   // Ajout de l'id pour chaque question
  qcm_quiz: string;
  choices: string[];
  reponse_qcm: string;
}

interface ReponseQuizz {
  id_qcm: string;
  reponse_qcm: string;
  choice_reponse: string;
  id_cours: string;
  statut: string;
  id_user: string;
  question_qcm:string;
}

const Quizz: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // id_cours
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const [user, setUser] = useState<any>(null);

  // Premier useEffect pour récupérer les données utilisateur
  useEffect(() => {
    const userData = localStorage.getItem("user"); // Récupération des données utilisateur depuis localStorage
    if (!userData) {
      window.location.href = "/Login"; // Redirection si l'utilisateur n'est pas trouvé
    } else {
      setUser(JSON.parse(userData)); // Stockage des données utilisateur dans le state
    }
  }, []);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `https://hmproges.online/backendhmclassroom/quizz.php?id_cours=${id}`
        );
        // console.log("Données reçues depuis l'API :", response.data);
        if (Array.isArray(response.data)) {
          const fetchedQuizData: Question[] = response.data.map((item: any) => ({
            id_qcm: item.id_qcm,  // Ajout de l'id pour chaque question
            qcm_quiz: item.qcm_quiz,
            choices: item.choices.split(';'), // Transforme la chaîne de caractères en tableau
            reponse_qcm: item.reponse_qcm,
          }));

          setQuizData(fetchedQuizData);
        } else {
          console.error("La réponse du serveur n'est pas un tableau de questions.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données du quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  const handleGoBack = () => {
    history.goBack();
  };

  // Fonction pour gérer la sélection d'une réponse
  const handleAnswerChange = (questionId: string, selectedChoice: string) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedChoice,
    }));
  };

  // Fonction pour valider et enregistrer les réponses
  const handlerValideQuizz = async () => {
    const dataToSend = quizData.map((question) => ({
      id_qcm: question.id_qcm,  // Utilisation de l'id venant des données du quiz
      reponse_qcm: question.reponse_qcm,  // Correct answer
      choice_reponse: selectedAnswers[question.id_qcm] || "",  // User's selected answer
      id_cours: id,  // Course ID
      statut: selectedAnswers[question.id_qcm] === question.reponse_qcm ? "Réussi" : "Échec",
      id_user: user?.id_eleve || "",  // ID utilisateur
      question_qcm: question.qcm_quiz,  // Question text
    }));
  
    try {
      const response = await axios.post("https://hmproges.online/backendhmclassroom/quizz_insert_update.php", dataToSend);
      console.log(response.data);
      history.push(`/score/${id}`);
    } catch (error) {
      console.error("Erreur lors de l'envoi des réponses du quiz:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-content">
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol >
              <IonButton fill="clear" onClick={handleGoBack}>
                <IonIcon icon={chevronBack}></IonIcon>
              </IonButton>
              </IonCol>
              <IonCol size="auto">
              <IonButton fill="clear"
                  id="validateQuizz"
                  disabled={Object.keys(selectedAnswers).length !== quizData.length} // Désactiver si toutes les réponses ne sont pas sélectionnées
                  onClick={handlerValideQuizz}
                  
                >
                  Valider
            </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          

          
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <IonSpinner />
        ) : (
          <div>
            {quizData.length > 0 ? (
              quizData.map((question) => (
                <div className="item-question" key={question.id_qcm}>
                  <IonLabel><b>{question.qcm_quiz}</b></IonLabel>
                  <hr />
                  <IonRadioGroup
                    onIonChange={(e) => handleAnswerChange(question.id_qcm, e.detail.value)}
                  >
                    {question.choices.map((choice, choiceIndex) => (
                      <div key={choiceIndex}>
                        <section className="qcm-liste">
                          <IonRadio id="radioQuizz" name="selectquizz" slot="start" value={choice} />
                          <IonLabel>{choice}</IonLabel>
                        </section>
                      </div>
                    ))}
                  </IonRadioGroup>
                </div>
              ))
            ) : (
              <IonLabel>Aucune question disponible.</IonLabel>
            )}
          </div>
        )}

        <div className="content-button-float">
            
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Quizz;
