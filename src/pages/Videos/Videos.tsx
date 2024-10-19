import { IonContent, IonPage, IonIcon } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite";
import "./Videos.css";
import { checkmarkDoneCircle } from "ionicons/icons";
import gifCharging from "./giphy.webp";

interface Video {
  id: number;
    title: string;
    filePath: string;
    imgPochette: string;
}

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const db: SQLiteObject = await SQLite.create({
          name: "videos.db",
          location: "default",
        });
  
        const res = await db.executeSql("SELECT * FROM videos", []);
        const downloadedVideos: Video[] = [];
  
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            downloadedVideos.push({
              id: res.rows.item(i).id,
              title: res.rows.item(i).title,
              filePath: res.rows.item(i).filePath,
              imgPochette: res.rows.item(i).imgPochette,
            });
          }
        }
  
        setVideos(downloadedVideos);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    };
  
    fetchVideos();
  }, []);
  

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h3>Cours téléchargé(s)</h3>
        <div className="content-all-content">
        {
  videos.length > 0 ? (
    videos.map((video) => (
      <a key={video.id} className="link-videos">
        <section className="img-title">
          <img src={video.imgPochette} alt={video.title} />
          {/* <video
            width="320"
            height="240"
            controls
            src={video.filePath} // Chemin de la vidéo téléchargée
          >
            Votre navigateur ne supporte pas le tag vidéo.
          </video> */}
          <section className="title-duree">
            <h5>{video.title}</h5>
            <label>{/* Ajouter des informations supplémentaires ici */}</label>
          </section>
        </section>
        <IonIcon className="svg-icon" icon={checkmarkDoneCircle} />
      </a>
    ))
  ) : (
    <div className="no-videos">
      <p>Aucune vidéo téléchargée pour le moment.</p>
      <img src={gifCharging} alt="Chargement" />
    </div>
  )
}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Videos;
