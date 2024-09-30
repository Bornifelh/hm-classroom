import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

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

    return(
        <IonPage>
            <IonContent>
            {loading ? (
                    <IonSpinner name="crescent" />
                ) : (
                    cours && (
                        <div>
                            <video src={cours.video_link}></video>
                        </div>
                        
                    )
                    )}
            </IonContent>
        </IonPage>
    );
};
export default DetailsCours;