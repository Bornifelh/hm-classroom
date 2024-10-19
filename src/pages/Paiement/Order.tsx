import { getPlatforms, IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRadio, IonRadioGroup, IonSpinner, IonToolbar, isPlatform } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { chevronBack } from "ionicons/icons";
import axios from "axios";
import { Capacitor } from "@capacitor/core";
import './Order.css';
const Order: React.FC = () => {
    const history = useHistory();
    const [user, setUser] = useState<any>(null);
    const [showInput, setShowInput] = useState(false); 
    const [amount, setAmount] = useState<number>(12450); 
    const [operateur, setOperateur] = useState<string>("AM"); 
    const [operateurMarchand, setOperateurMarchand] = useState<string>("060023274"); 
    const [operateurNum, setOperateurNum] = useState<string>("Numéro Airtel Money"); 
    const [amount2, setAmount2] = useState<number>(13000); 
    const [promoCode, setPromoCode] = useState<string>(""); 
    const [isPromoValid, setIsPromoValid] = useState<boolean | null>(null);
    const [numclient, setNumClient] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        }
    }, []);

    // Détection de la plateforme
    const isWeb = Capacitor.getPlatform() === 'web';

    
    const apiUrl = isWeb
        ? 'https://mypvit.com/pvit-secure-full-api.kk'
        : 'https://mypvit.com/pvit-secure-full-api.kk'; 

    const handleGoBack = () => {
        history.goBack();
    };

    const handleCheckboxChange = (e: any) => {
        if (e.detail.checked) {
            setAmount(11520);
            setAmount2(12000);
        } else {
            setAmount(12450); 
            setAmount2(13000); 
        }
        setShowInput(e.detail.checked); 
    };

    const handleOperateurChange = (e: any) => {
        const selectedOperateur = e.target.value;
        setOperateur(selectedOperateur);
        const selectedOperateurNum = selectedOperateur === "AM" ? "Numéro Airtel Money" : "Numéro Mobi Cash";
        setOperateurNum(selectedOperateurNum);
    };

    const handlePromoCodeChange = (e: any) => {
        setPromoCode(e.target.value);
    };

    const numClientHandler = (e: any) => {
        setNumClient(e.target.value);
    };

    const validatePromoCode = async () => {
        try {
            const response = await axios.post("https://hmproges.online/backendhmclassroom/verif_codepromo.php", { code: promoCode });
            if (response.data.valid) {
                setIsPromoValid(true); 
            } else {
                setIsPromoValid(false);
                return
            }
        } catch (error) {
            console.error("Error validating promo code", error);
        }
    };

    // const handlePayment = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsLoading(true);

    //     // Valider le code promo si présent
    //     if (showInput && promoCode) {
    //         await validatePromoCode();
    //         if (!isPromoValid) {
    //             setIsLoading(false);
    //             return;
    //         }
    //     }

    //     // Soumettre le formulaire de paiement
    //     try {
    //         const platform = Capacitor.getPlatform();  // Vérifier la plateforme
    //         console.log('Plateforme actuelle:', platform);

    //         if (platform === 'android' || platform === 'ios') {
    //             console.log('Plateforme mobile détectée');
    //           } else {
    //             console.log('Plateforme web détectée');
    //           }
    //         await submitForm();
            
    //     } catch (error) {
    //         console.error("Error during form submission", error);
    //         alert('erreur lors de la tentative de paiement '+ error)
    //     } finally {
    //         setIsLoading(false);
    //     }

        
    // };

    // const submitForm = async () => {
    //     const generateReference = () => {
    //         const now = new Date();
    //         const timestamp = now.getTime();
    //         return `Ref-${user?.login_eleve}-${user?.id_eleve}-${timestamp}`;
    //     };
    
    //     const ref = generateReference();
    
    //     const formData = {
    //         tel_marchand: '074018600',
    //         montant: amount.toString(),
    //         ref: ref,
    //         tel_client: numclient,
    //         token: 'Dfcgdf5kj=mklslkdflsk95mlsdfgn8sdjfk',
    //         action: '1',
    //         service: 'REST',
    //         operateur: operateur,
    //         agent: 'hmclassroom'
    //     };
        
        
        
    
    //     try {
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             body: JSON.stringify(formData),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
            
    
    //         // Afficher la réponse brute avant d'essayer de l'analyser
    //         const responseText = await response.json();
    //         console.log('Réponse brute:', responseText);
    
    //         if (response.ok) {
    //             try {
    //                 const data = JSON.parse(responseText);
    //                 console.log('Données JSON:', data);
    //                 alert('Paiement réussi avec succès: ' + response.statusText);
    //             } catch (error) {
    //                 console.error('Erreur lors de l\'analyse JSON:', error);
    //                 alert('Réponse inattendue du serveur (non-JSON ou vide)');
    //             }
    //         } else {
    //             console.error('Erreur lors du paiement:', response.statusText);
    //             alert('Erreur lors du paiement: ' + response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Erreur lors de la soumission du formulaire:', error);
    //         alert('Erreur lors de la soumission du formulaire: ' + error);
    //     }
    // };
    

    // new submit
  
  
    const [error, setError] = useState(null); // Error state
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    validatePromoCode();
    event.preventDefault(); // Empêche la soumission par défaut du formulaire
    setIsLoading(true); // Active le spinner
    setError(null); // Réinitialise l'erreur
  
    // Récupération du formulaire
    const form = document.getElementById('payeForm') as HTMLFormElement;
  
    if (form) {
      // Récupération des données du formulaire
      const formData = new FormData(form);
  
      try {
        const response = await fetch('https://mypvit.com/pvit-secure-full-api.kk', {
          method: 'POST',
          body: formData,
        });
        console.log(response)
        // Vérifier si le paiement est réussi
        if (response.ok) {
          // Si la réponse est réussie (code 200)
        //   const responseData = await response.json();
        //     console.log('Réponse du serveur:', responseData);
        console.log("Paiement reussie");
          alert('Mettez votre code pin');

          setIsLoading(false); // Désactiver le spinner
        //   window.location.href = '/'; // Rediriger vers la page de succès
        } else {
          throw new Error('Le paiement a échoué.');
        }
      } catch (err) {
        setIsLoading(false); // Désactiver le spinner
        setError(error); // Affiche le message d'erreur
        console.error('Erreur lors de la soumission:', err);
      }
    } else {
      setIsLoading(false);
    //   setError("Le formulaire n'a pas été trouvé.");
    console.log("Le formulaire n'a pas été trouvé.")
    }
  };
  
  const generateReference = () => {
    const now = new Date();
    const timestamp = now.getTime();
    return `${timestamp}${user?.id_eleve}`;
};

const ref = generateReference();
    
    

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
                <div className="content-titre">
                    <h3>Abonnement annuel</h3>
                </div>

                <div className="content-order">
                    <h4>Montant à payer : {amount2} XAF</h4>

                    <section className="chack-box">
                        <IonCheckbox onIonChange={handleCheckboxChange} labelPlacement="start"></IonCheckbox>
                        <IonLabel>J'ai un code promo</IonLabel>
                    </section>

                    {showInput && (
                        <>
                            <IonInput fill="outline" id="codepromo"
                                value={promoCode}
                                onIonChange={handlePromoCodeChange}
                                placeholder="Saisir code promo"
                            ></IonInput>
                            <section className="libelle-infos">
                                {isPromoValid === false && <IonLabel color="danger">Code promo invalide</IonLabel>}
                                {isPromoValid === true && <IonLabel color="success">Code promo valide</IonLabel>}
                            </section>
                        </>
                    )}

                    <IonInput fill="outline" onIonChange={numClientHandler} placeholder={operateurNum} />
                    <IonRadioGroup aria-readonly value={operateur} onIonChange={handleOperateurChange}>
                        <IonRadio value="AM" aria-label="Airtel Money">Airtel Money</IonRadio>
                        <IonRadio value="MC" aria-label="Mobi Cash">Mobi Cash</IonRadio>
                    </IonRadioGroup>

                    {/* <IonButton onClick={handlePayment} expand="full" disabled={isLoading}>
                        {isLoading ? <IonSpinner name="crescent" /> : 'PAYER'}
                    </IonButton> */}

<div>
                    <form id="payeForm" onSubmit={handleSubmit}>
                        <input hidden type="text" name="tel_marchand" value="074018600" />
                        <input hidden type="text" name="montant" value={amount} />
                        <input hidden type="text" name="ref" value={ref} />
                        <input hidden type="text" name="tel_client" value={numclient} />
                        <input hidden type="text" name="service" value="REST" />
                        <input hidden type="text" name="operateur" value={operateur} />
                        {/* Champ pour redirection, si nécessaire */}
                        {/* <input hidden type="text" name="redirect" value="https://monsite.com/page"/> */}
                        <button type="submit" disabled={isLoading} className="btn-payer">
                                {'PAYER'}
                        </button>

                        
                    </form>

                    {isLoading && <div className="spinner"></div>} {/* Spinner */}
                    {isLoading ? 'Paiement en cours...' : ''}

                    {error && <div className="error">{error}</div>} {/* Message d'erreur */}
                </div>
                </div>


                
            </IonContent>
        </IonPage>
    );
};

export default Order;
