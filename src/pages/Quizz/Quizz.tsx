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
  IonTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import "./Quizz.css"
import { chevronBack } from "ionicons/icons";

interface Question {
  qcm_quiz: string;
  choices: string[];
  reponse_qcm: string;
}

const Quizz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [shuffledQuizData, setShuffledQuizData] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/backendhmclassroom/quizz.php?id_cours=${id}`
        );
        console.log("Données reçues depuis l'API :", response.data);
        if (Array.isArray(response.data)) {
          const fetchedQuizData: Question[] = response.data.map((item: any) => ({
            qcm_quiz: item.qcm_quiz,
            choices: item.choices.split(';'), // Transforme la chaîne de caractères en tableau
            reponse_qcm: item.reponse_qcm,
          }));

          setQuizData(fetchedQuizData);
          setShuffledQuizData(shuffleArray(fetchedQuizData));
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-caontent">
        <IonButton fill='clear' onClick={handleGoBack}>
                        <IonIcon icon={chevronBack}></IonIcon>
                    </IonButton>
          {/* <IonTitle>Quizz</IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        {loading ? (
          <IonSpinner />
        ) : (
          <div >
            {Array.isArray(shuffledQuizData) && shuffledQuizData.length > 0 ? (
              shuffledQuizData.map((question, index) => (
                <div className="item-question">
                
                
                <IonLabel><b>{question.qcm_quiz}</b></IonLabel><hr />

                <div key={index}>
                  <IonRadioGroup>
                    {question.choices.map((choice, choiceIndex) => (
                      <div>                      
                      <section className="qcm-liste" key={choiceIndex}>
                        <IonRadio slot="start" value={choice} />
                        <IonLabel>{choice}</IonLabel>
                      </section>
                      </div>
                    ))}
                  </IonRadioGroup>
                </div>
                
             </div> 
            ))
            ) : (
              <div>
                <IonLabel>Aucune question disponible.</IonLabel>
              </div>
            )}

          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Quizz;
