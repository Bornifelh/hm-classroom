import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Order.css";
import { useHistory } from "react-router";
import { chevronBack } from "ionicons/icons";

const Order: React.FC = () => {
    const history = useHistory();
    const [user, setUser] = useState<any>(null);  
    const [showInput, setShowInput] = useState(false); 

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser); 
        }
    }, []);

    const handleGoBack = () => {
        history.goBack();
    };

    const checkboxBtn = (e: any) => {
        setShowInput(e.detail.checked); 
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButton fill='clear' onClick={handleGoBack}>
                        <IonIcon icon={chevronBack}></IonIcon>
                        <label>Retour</label>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <div className="content-order">
                    <h3>Abonnement annuel</h3>
                    <IonLabel>13 000 XAF</IonLabel>
                    <section>
                        <IonCheckbox onIonChange={checkboxBtn} labelPlacement="start"></IonCheckbox>
                        <IonLabel>J'ai un code promo</IonLabel>
                    </section>
                    <IonInput 
                        className={showInput ? '' : 'hidden-input'} 
                        label="Code promo" 
                        placeholder="Saisir code promo">
                    </IonInput>
                    <IonButton expand="full">Payer</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Order;
