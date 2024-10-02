import { IonContent, IonPage, IonIcon } from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Videos.css";
import { alert, checkmarkDoneCircle } from "ionicons/icons";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { File } from "@ionic-native/file";
import gifCharging from "./giphy.webp";



interface Video {
    id: number;
    title: string;
    filePath: string;
    }
    
const Videos: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    
    useEffect(() => {
        const fetchVideos = async () => {
        try {
            const db: SQLiteObject = await SQLite.create({
            name: "videos.db",
            location: "default",
            });
    
            const res = await db.executeSql("SELECT * FROM videos", []);
            const downloadedVideos: Video[] = [];
    
            for (let i = 0; i < res.rows.length; i++) {
            downloadedVideos.push({
                id: res.rows.item(i).id,
                title: res.rows.item(i).title,
                filePath: res.rows.item(i).filePath,
            });
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
          <Header />
          <IonContent className="ion-padding">
            <h3>Vidéo(s) téléchargée(s)</h3>
            <div className="content-all-content">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <a key={video.id} href={File.dataDirectory + video.filePath} className="link-videos">
                    <section className="img-title">
                      <img
                        src="https://www.turquie.campusfrance.org/sites/pays/files/turquie/styles/mobile_visuel_principal_page/public/medias/images/2019-06/Cours%201.jpg?itok=DM_cZhPd"
                        alt=""
                      />
                      <section className="title-duree">
                        <h5>{video.title}</h5>
                        <label>{/* Vous pouvez ajouter ici la durée et la taille si vous les avez */}</label>
                      </section>
                    </section>
                    <IonIcon className="svg-icon" icon={checkmarkDoneCircle} />
                  </a>
                ))
              ) : (
                <div className="no-videos">
                    <p>Aucune vidéo téléchargée pour le moment.</p>
                    <img src={gifCharging} alt="" />
                    {/* <div><iframe src="https://giphy.com/embed/iQaJmNecCFyJNnpMxi" width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div><p></p> */}
                </div>
              )}
            </div>
          </IonContent>
        </IonPage>
      );
      
}
export default Videos;