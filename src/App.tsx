import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonCol,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  cart,
  ellipse,
  ellipsisHorizontal,
  film,
  home,
  library,
  notifications,
  person,
  settings,
  square,
  triangle,
} from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import { AnimatePresence, motion } from "framer-motion";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Accueil from "./pages/Accueil/Accueil";
import Compte from "./pages/Compte/Compte";
import Notifications from "./pages/Notifications/Notifications";
import Cours from "./pages/Cours/Cours";
import Videos from "./pages/Videos/Videos";
import DetailsFormation from "./pages/DetailsFormation/DetailsFormation";
import DetailsCours from "./pages/DetailsCours/DetailsCours";
import Login from "./pages/Login/Login";
import commentCours from "./pages/DetailsCours/commentCours";
import Quizz from "./pages/Quizz/Quizz";
import Signup from "./pages/Login/Signup";
import React, { useEffect, useState } from "react";
import Order from "./pages/Paiement/Order";
import Score from "./pages/Quizz/Score";
import ModifCompte from "./pages/Login/ModifCompte";
import Erreur from "./pages/Paiement/Erreur";
import Success from "./pages/Login/Success";
import AnimatedPage from "./AnimatedPage";
import { AuthProvider } from "./contexts/AuthContext";
import { DownloadProvider } from "./contexts/DownloadContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DownloadIndicator from "./components/DownloadIndicator";

setupIonicReact();

// Configuration de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
      retry: 3,
      retryDelay: (attemptIndex: number) =>
        Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DownloadProvider>
          <IonApp>
            <IonReactRouter>
              <IonTabs>
                <IonRouterOutlet animated={false}>
                  <ProtectedRoute exact path="/Accueil">
                    <Accueil />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/Cours">
                    <Cours />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/Videos">
                    <Videos />
                  </ProtectedRoute>
                  <ProtectedRoute path="/Compte">
                    <Compte />
                  </ProtectedRoute>
                  <Route exact path="/">
                    <Redirect to="/Accueil" />
                  </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="Accueil" href="/Accueil">
                    <IonIcon aria-hidden="true" icon={home} />
                    <IonLabel>Accueil</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="Vidéos" href="/Videos">
                    <IonIcon aria-hidden="true" icon={film} />
                    <IonLabel>Mes Vidéos</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="Compte" href="/Compte">
                    <IonIcon aria-hidden="true" icon={person} />
                    <IonLabel>Mon Compte</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>

              <Route exact path="/Notifications">
                <Notifications />
              </Route>
              <ProtectedRoute exact path="/details/:id">
                <DetailsFormation />
              </ProtectedRoute>
              <ProtectedRoute exact path="/detailscours/:id">
                <DetailsCours />
              </ProtectedRoute>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <ProtectedRoute exact path="/commentcours/:id">
                {React.createElement(commentCours)}
              </ProtectedRoute>
              <ProtectedRoute exact path="/quizz/:id">
                <Quizz />
              </ProtectedRoute>
              <ProtectedRoute exact path="/order">
                <Order />
              </ProtectedRoute>
              <ProtectedRoute exact path="/score/:id">
                <Score />
              </ProtectedRoute>
              <ProtectedRoute exact path="/modifcompte/:id">
                <ModifCompte />
              </ProtectedRoute>
              <Route exact path="/erreurpaiement" component={Erreur} />
              <Route exact path="/success" component={Success} />
            </IonReactRouter>
            <DownloadIndicator />
          </IonApp>
        </DownloadProvider>
      </AuthProvider>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default App;
