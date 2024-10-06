import {
    IonButton,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
    IonInput,
  } from "@ionic/react";
  import React, { useState } from "react";
  import "./comment.css";
  import { chevronBack, send } from "ionicons/icons";
import { useHistory, useParams } from "react-router";
  
  interface Message {
    id: number;
    text: string;
    sender: "user" | "other";
  }
  
  const commentCours: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState<string>("");
    const history = useHistory();

  
    const handleSendMessage = () => {
      if (messageText.trim() === "") return;
  
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        sender: "user",
      };
  
      setMessages([...messages, newMessage]);
      setMessageText(""); // Reset input field
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
              <IonButton fill='clear' onClick={handleGoBack}>
                  <IonIcon icon={chevronBack}></IonIcon>
                </IonButton>
                <IonTitle>Discussion</IonTitle>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding">
          <div>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-bubble ${
                  message.sender === "user" ? "sent" : "received"
                }`}
              >
                <p>{message.text}</p>
              </div>
            ))}
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
  
  export default commentCours;
  