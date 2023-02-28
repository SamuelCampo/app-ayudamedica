import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React,{useEffect} from 'react';
import Home from './pages/Home';
import Login from './pages/Login/Login'
import Inicio from './pages/Inicio/Inicio'
import Services from './pages/Services/Services'
import Chats from './pages/Chats/Chats'
import Video from './pages/Video/Video'
import Panel from './pages/Home/home'
import OneSignal from 'onesignal-cordova-plugin';

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

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App = ()  => {
	/*useEffect(() => {
		OneSignal.setAppId('b538fccf-b1d3-49b5-a2e3-572b8cbed397');
		OneSignal.setNotificationOpenedHandler((jsonData: any) => {
			console.log('notificacions: ' + JSON.stringify(jsonData.id))
			
		})
	  }, []);*/
	return (
		<IonApp>
			<IonReactRouter>
			<IonRouterOutlet>
				<Route exact path="/">
				<Redirect to="/Login" />
				</Route>
				<Route exact path="/Login">
					<Login />
				</Route>
				<Route exact path="/home">
					<Inicio />
				</Route>
				<Route exact path="/services">
					<Services />
				</Route>
				<Route exact path="/chats/:id">
					<Chats />
				</Route>
				<Route exact path="/video">
					<Video />
				</Route>
				<Route exact path="/panel">
					<Panel />
				</Route>
			</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}

export default App;
