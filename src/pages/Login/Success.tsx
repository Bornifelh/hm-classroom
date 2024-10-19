import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import imgSuccess from "./success.png";
import { motion } from 'framer-motion';
import { useHistory } from "react-router";


const Success: React.FC =() =>{
  const history = useHistory();
    
    const [toggle, setToggle] = useState(true);

    const handlerPushMain = () =>{
        history.push('/Login')
      }
    return(
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#000' }}>
      <motion.div
        initial={{ x: '100vw' }}
        animate={{ x: toggle ? 0 : '-100vw' }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%', height: '100vh', backgroundColor: '#000'}}
      >
        <IonPage>
            <IonContent className="ion-padding">
                <div className="content-img-text">
                    <img src={imgSuccess} alt="success" />
                    <section className="text-remerciement">
                        <h3>Merci d'avoir choisi <br /> HM CLASSROOM</h3>
                    </section>
                    <a className="btn-login" onClick={handlerPushMain}><b>Se connecter</b></a>
                </div>
            </IonContent>
        </IonPage>
        </motion.div>
        </div>
    )
}
export default Success;