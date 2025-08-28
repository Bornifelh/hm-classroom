import {
  IonContent,
  IonPage,
  IonIcon,
  IonModal,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite";
import { Media, MediaObject } from "@awesome-cordova-plugins/media";
import { File } from "@awesome-cordova-plugins/file";
import { checkmarkDoneCircle, closeCircle } from "ionicons/icons";
import gifCharging from "./giphy.webp";
import "./Videos.css";

interface Video {
  id: number;
  title: string;
  filePath: string;
  imgPochette: string;
}

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [mediaObj, setMediaObj] = useState<MediaObject | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const db: SQLiteObject = await SQLite.create({
          name: "videos.db",
          location: "default",
        });

        // Créer la table si elle n'existe pas (pour la compatibilité)
        await db.executeSql(
          "CREATE TABLE IF NOT EXISTS videos(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, filePath TEXT, imgPochette TEXT, downloadDate TEXT)",
          []
        );

        const res = await db.executeSql(
          "SELECT * FROM videos ORDER BY downloadDate DESC",
          []
        );
        const downloadedVideos: Video[] = [];

        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            const row = res.rows.item(i);
            downloadedVideos.push({
              id: row.id,
              title: row.title,
              filePath: row.filePath,
              imgPochette: row.imgPochette,
            });
          }
        }

        setVideos(downloadedVideos);
        console.log("Vidéos récupérées:", downloadedVideos.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    };

    fetchVideos();
  }, []);

  const openModal = async (video: Video) => {
    setSelectedVideo(video);
    setShowModal(true);

    try {
      // Construire le nom de fichier sécurisé
      const fileName = `${video.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`;

      // Vérifier si le fichier existe avant de le lire
      const fileExists = await File.checkFile(File.dataDirectory, fileName);

      if (!fileExists) {
        console.error("Fichier vidéo introuvable:", fileName);
        return;
      }

      // Construire le chemin correct pour le stockage interne
      const internalPath = `${File.dataDirectory}${fileName}`;
      console.log("Chemin vidéo interne : ", internalPath);

      // Utiliser le plugin Media pour la lecture
      const media: MediaObject = Media.create(internalPath);
      setMediaObj(media);

      media.play();
    } catch (error) {
      console.error("Erreur lors de la lecture de la vidéo :", error);
    }
  };

  const closeModal = () => {
    if (mediaObj) {
      try {
        mediaObj.stop();
        mediaObj.release(); // Libérer les ressources
      } catch (error) {
        console.error("Erreur lors de la fermeture du média:", error);
      }
    }
    setSelectedVideo(null);
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h3>Cours téléchargé(s)</h3>
        <div className="content-all-content">
          {videos.length > 0 ?
            videos.map((video) => (
              <a
                key={video.id}
                className="link-videos"
                onClick={() => openModal(video)}>
                <section className="img-title">
                  <img src={video.imgPochette} alt={video.title} />
                  <section className="title-duree">
                    <h5>{video.title}</h5>
                  </section>
                </section>
                <IonIcon className="svg-icon" icon={checkmarkDoneCircle} />
              </a>
            ))
          : <div className="no-videos">
              <p>Aucune vidéo téléchargée</p>
              <p>pour le moment.</p>
              <img src={gifCharging} alt="Chargement" />
            </div>
          }
        </div>

        {/* Modal pour afficher la vidéo */}
        <IonModal isOpen={showModal} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedVideo?.title}</IonTitle>
              <IonButton slot="end" onClick={closeModal}>
                <IonIcon src={closeCircle} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {selectedVideo && (
              <div className="video-player">
                <label htmlFor="">{selectedVideo.title}</label>
                <video
                  autoPlay
                  controls
                  src={`${File.dataDirectory}${selectedVideo.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`}
                  style={{ width: "100%" }}></video>
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Videos;
