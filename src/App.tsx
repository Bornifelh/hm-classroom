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
import { cart, ellipse, film, home, notifications, person, settings, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <IonRow>
              <IonCol size=''><IonTitle>HM Classroom</IonTitle></IonCol>
              <IonCol size='auto'>
                <IonButton><IonIcon src={cart}></IonIcon></IonButton>
              </IonCol>
              <IonCol size='auto'>
                <IonButton routerLink='./Notifications'>
                  <IonIcon src={notifications}></IonIcon>
                </IonButton>
              </IonCol>
          </IonRow>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Accueil">
            <Accueil />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route exact path="/Notifications">
            <Notifications />
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
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Notifications" href="/Notifications">
            <IonIcon aria-hidden="true" icon={film} />
            <IonLabel>Vidéos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Compte" href="/Compte">
            <IonIcon aria-hidden="true" icon={person} />
            <IonLabel>Compte</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
