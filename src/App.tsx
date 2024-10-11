import { Redirect, Route } from 'react-router-dom';
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
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cart, ellipse, ellipsisHorizontal, film, home, library, notifications, person, settings, square, triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Accueil from './pages/Accueil/Accueil';
import Compte from './pages/Compte/Compte';
import Notifications from './pages/Notifications/Notifications';
import Cours from './pages/Cours/Cours';
import Videos from './pages/Videos/Videos';
import DetailsFormation from './pages/DetailsFormation/DetailsFormation';
import DetailsCours from './pages/DetailsCours/DetailsCours';
import Login from './pages/Login/Login';
import commentCours from './pages/DetailsCours/commentCours';
import Quizz from './pages/Quizz/Quizz';
import Signup from './pages/Login/Signup';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
   {/* <Header/> */}
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Accueil">
            <Accueil />
          </Route>
          <Route exact path="/Cours">
            <Cours />
          </Route>
          <Route exact path="/Videos">
            <Videos />
          </Route>
          <Route path="/Compte">
            <Compte />
          </Route>
          <Route exact path="/">
            <Redirect to="/Accueil" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Accueil" href="/Accueil">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Accueil</IonLabel>
          </IonTabButton>
          {/* <IonTabButton tab="Cours" href="/Cours">
            <IonIcon aria-hidden="true" icon={library} />
            <IonLabel>Mes cours</IonLabel>
          </IonTabButton> */}
          <IonTabButton tab="Vidéos" href="/Videos">
            <IonIcon aria-hidden="true" icon={film} />
            <IonLabel>Mes Vidéos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Compte" href="/Compte">
            <IonIcon aria-hidden="true" icon={ellipsisHorizontal} />
            <IonLabel>Autres</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>

      <Route exact path="/Notifications">
            <Notifications />
          </Route>
          <Route exact path="/details/:id" component={DetailsFormation} />
          <Route exact path="/detailscours/:id" component={DetailsCours} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/commentcours/:id" component={commentCours} />
          <Route exact path="/quizz/:id" component={Quizz} />
    </IonReactRouter>
  </IonApp>
);

export default App;
