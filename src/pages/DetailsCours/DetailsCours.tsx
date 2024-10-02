import { IonButton, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./DetailsCours.css";
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { useIonToast } from '@ionic/react';
import { arrowRedo, chatboxEllipses, chevronBack, download, help, receipt } from "ionicons/icons";

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

const DetailsCours: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'URL
  const [cours, setCours] = useState<CoursDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  const [present] = useIonToast();

  const showToast = (message: string) => {
    present({
      message,
      duration: 2000,
      position: 'bottom',
    });
  };

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

  const downloadAndSaveVideo = async (videoUrl: string, videoTitle: string) => {
    try {
      const fileTransfer: FileTransferObject = FileTransfer.create();
      const fileDirectory = File.dataDirectory; // Répertoire local où stocker le fichier
      const filePath = `${fileDirectory}${videoTitle}.mp4`; // Nom du fichier

      // Télécharger la vidéo
      const entry = await fileTransfer.download(videoUrl, filePath);
      console.log('Fichier téléchargé à : ', entry.toURL());

      // Enregistrer les détails de la vidéo dans la base de données SQLite
      const db: SQLiteObject = await SQLite.create({
        name: 'videos.db',
        location: 'default',
      });

      await db.executeSql('CREATE TABLE IF NOT EXISTS videos(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, filePath TEXT)', []);
      await db.executeSql('INSERT INTO videos(title, filePath) VALUES (?, ?)', [videoTitle, filePath]);

      showToast('Vidéo téléchargée et enregistrée avec succès !');
    } catch (error) {
      console.error('Erreur lors du téléchargement ou de l\'enregistrement de la vidéo:', error);
      showToast('Erreur lors du téléchargement de la vidéo.');
    }
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
              <IonTitle>{cours?.titre_cours}</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <div className="spin-content">
            <IonSpinner name="crescent" />
          </div>
          
        ) : (
          cours && (
            <div>
              <video className="video-cours" src={cours.video_link} autoPlay controls></video>
              <section className="download-others">
                  <IonButton>
                    <IonIcon icon={help} />
                  </IonButton>
                <div className="btns">
                <IonButton>
                    <IonIcon icon={chatboxEllipses} />
                  </IonButton>
                  <IonButton onClick={() => downloadAndSaveVideo(cours.video_link, cours.titre_cours)}>
                    <IonIcon icon={download} />
                  </IonButton>
                  <IonButton>
                    <IonIcon icon={arrowRedo} />
                  </IonButton>
                  
                </div>
                
              </section>
                <section className="titre">
                  <h5>{cours.titre_cours}</h5>
                </section>
              <section className="details">
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
