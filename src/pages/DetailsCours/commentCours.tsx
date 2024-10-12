import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack, send } from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import "./comment.css";

interface Message {
  id_comment_cours: number;
  comments_cours: string;
  comment_users: string;
  id_cours: string;
  id_eleve: string;
  date_comments: string;
}

const CommentCours: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID du cours depuis l'URL
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const history = useHistory();
  const [user, setUser] = useState<any>(null);
  const [idCours, setIdCours] = useState<string>(id); // Utilisation de l'ID du cours depuis l'URL

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      window.location.href = "/Login";
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      const idEleve = parsedUser.id_eleve;

      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost/backendhmclassroom/getMessages.php?id_cours=${idCours}`
          );
          if (response.data) {
            setMessages(response.data);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des messages:", error);
        }
      };
      fetchMessages();

    }
  }, [idCours]);
  const handleSendMessage = () => {
    if (messageText.trim() === "" || !user) return; // Vérification pour empêcher l'envoi de message vide

    const newMessage = {
      comments_cours: messageText,
      comment_users: user.nom_eleve, // Utilisateur actuel
      id_cours: idCours, // Assurez-vous que idCours est défini
      id_eleve: user.id_eleve, // Utilisateur actuel
      date_comments: user.date_comments,
    };

    // Envoyer le message à l'API pour l'insertion avec Axios
    axios
      .post("http://localhost/backendhmclassroom/insertMessage.php", newMessage, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          const insertedMessage = response.data.message; // Obtenir l'ID généré par le back-end
          setMessages([...messages, insertedMessage]); // Ajouter le message à l'interface
          setMessageText(""); // Réinitialiser le champ de texte
        } else {
          console.error("Erreur:");
        }
      })
      .catch((error) => console.error("Erreur lors de l'insertion du message:", error));
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonButton fill="clear" onClick={handleGoBack}>
                <IonIcon icon={chevronBack}></IonIcon>
              </IonButton>
              <IonTitle>Commentaires</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="content-bulbes">
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id_comment_cours}
                className={`message-bubble ${
                  message.comment_users === user.nom_eleve ? "sent" : "received"
                }`}
              >
                <section>
                  <a href="">{message.comment_users}</a>
                  <p>{message.comments_cours}</p>
                  <p>{message.date_comments}</p>

                </section>

              </div>
            ))
          ) : (
            <p>Aucun message trouvé.</p>
          )}
        </div>
      </IonContent>

      <div className="message-input-container">
        <IonInput
          value={messageText}
          placeholder="Écrire un message..."
          onIonChange={(e) => setMessageText(e.detail.value!)}
        />
        <IonButton onClick={handleSendMessage}>
          <IonIcon icon={send}></IonIcon>
        </IonButton>
      </div>
    </IonPage>
  );
};

export default CommentCours;
