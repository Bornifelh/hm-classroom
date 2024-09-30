import { IonButton, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./DetailsCours.css"
import { arrowRedo, chevronBack, download, share } from "ionicons/icons";

interface CoursDetail {
        id_matiere: number;
        id_cours: number;
        video_link: string;
        video_share_link: string;
        pochette_cours: string;
        titre_cours: string;
        sous_titre_cours: string;
        description_cours: string;
        date_publication_cours: string;
}



const DetailsCours : React.FC = () =>{
    const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'URL
    const [cours, setCours] = useState<CoursDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();



    useEffect(() => {
        const fetchCours = async () => {
            try {
                const response = await axios.get(`http://localhost/backendhmclassroom/details_cours_api.php?id_cours=${id}`);
                setCours(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la matière:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCours();
    }, [id]);

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
              <IonTitle>{cours?.titre_cours}</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
            <IonContent>
            {loading ? (
                    <IonSpinner name="crescent" />
                ) : (
                    cours && (
                        <div>
                            <video className="video-cours" src={cours.video_link} autoPlay controls ></video>
                            <section className="download-others">
                            <a className="btn-download"><img src={arrowRedo} alt="" /> Partager</a>
                              <a className="btn-download"><img src={download} alt="" /> Télécharger</a>
                            </section>
                            <section className="details">
                              <IonTitle>{cours.titre_cours}</IonTitle>
                              <p>{cours.description_cours}</p>  
                            </section>
                            
                            
                        </div>
                        
                    )
                    )}
            </IonContent>
        </IonPage>
    );
};
export default DetailsCours;