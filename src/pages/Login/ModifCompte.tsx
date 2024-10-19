import { IonButton, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";

const ModifCompte : React.FC = () => {
  const history = useHistory();


    const handleGoBack = () => {
        history.goBack();
      };
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonGrid>
                    <IonRow>
                    <IonButton fill='clear' onClick={handleGoBack}>
                        <IonIcon icon={chevronBack}></IonIcon>
                    </IonButton>
                    </IonRow>
                </IonGrid>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                
            </IonContent>
        </IonPage>
    )
}
export default ModifCompte;