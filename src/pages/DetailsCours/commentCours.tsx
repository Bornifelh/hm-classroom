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
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite";
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
  const [user, setUser] = useState<any>(null);
  const [idCours, setIdCours] = useState<string>(id);
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      window.location.href = "/Login";
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      initDatabase();
      fetchMessages();
    }
  }, [idCours]);

  // Initialiser la base de données SQLite
  const initDatabase = async () => {
    try {
      const db: SQLiteObject = await SQLite.create({
        name: "messages.db",
        location: "default",
      });

      await db.executeSql(
        `CREATE TABLE IF NOT EXISTS messages (
          id_comment_cours INTEGER PRIMARY KEY AUTOINCREMENT,
          comments_cours TEXT,
          comment_users TEXT,
          id_cours TEXT,
          id_eleve TEXT,
          date_comments TEXT
        )`,
        []
      );
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la base de données:", error);
    }
  };

  // Fonction pour récupérer les messages depuis SQLite
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const db: SQLiteObject = await SQLite.create({
        name: "messages.db",
        location: "default",
      });

      const res = await db.executeSql("SELECT * FROM messages WHERE id_cours = ?", [idCours]);
      const retrievedMessages: Message[] = [];

      for (let i = 0; i < res.rows.length; i++) {
        retrievedMessages.push(res.rows.item(i));
      }
      setMessages(retrievedMessages);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour envoyer un message
  const handleSendMessage = () => {
    if (messageText.trim() === "" || !user) return; // Vérification pour empêcher l'envoi de message vide
  
    const newMessage: Message = {
      id_comment_cours: 0, // Placeholder, car l'ID sera généré par le serveur
      comments_cours: messageText,
      comment_users: user.nom_eleve,
      id_cours: idCours,
      id_eleve: user.id_eleve,
      date_comments: new Date().toISOString(), // Ajoutez la date actuelle
    };
  
    // Envoyer le message via l'API REST (pour l'insertion dans la base de données)
    axios
      .post("https://hmproges.online/backendhmclassroom/insertMessage.php", newMessage, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          const insertedMessage = {
            ...newMessage,
            id_comment_cours: response.data.message.id_comment_cours, // ID du message inséré
          };
          setMessages((prevMessages) => [...prevMessages, insertedMessage]); // Mettre à jour les messages avec le nouveau message
          setMessageText(""); // Réinitialiser le champ de texte
        } else {
          console.error("Erreur lors de l'envoi du message.");
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
          {loading ? (
            <p>Chargement...</p>
          ) : Array.isArray(messages) && messages.length > 0 ? (
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
                  <p>{new Date(message.date_comments).toLocaleString()}</p>
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
