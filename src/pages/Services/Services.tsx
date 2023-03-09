import React,{useEffect,useState} from "react";
import { IonPage,IonContent,IonList,IonItem,IonLabel,IonBackButton, IonHeader, IonToolbar, IonTitle,IonIcon,IonButtons } from '@ionic/react'
import Container from './../../components/Container/Container'
import global from './../../global'
import { ServiceE } from './../../Interface/ServiceInterface'
import { chevronForwardCircleOutline } from 'ionicons/icons'
import './Services.css'

const Service = () => {
	const [service,setService] = useState([])
	const [statusInfo,setStatusInfo] = useState(false)
	let messages = []
	const getServices = () => {
		var formData = new FormData()
		let myHeaders = new Headers();
		let token = localStorage.getItem('token')
		myHeaders.append('Authorization','Bearer '+token)
		
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: formData,
		};
		fetch(global.GetUrl + 'get/services', requestOptions)
		.then(response => {
			response.json()
			.then(response => {
				if(response.status){
					setService(response.content);
				}else{
					
				}
			})
		})
		.catch(error => console.log('error', error));
	}

	useEffect(() => {
		getServices();
	},[])
	return (
		<IonPage>
			<IonHeader className="ion-no-border">
				<IonToolbar>
					<IonButtons slot="start">
						<IonBackButton />
					</IonButtons>
					<IonTitle>Listado de servicios</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
					<IonList>
						{ 
							service.length > 0 
							? service.map(
								(item:ServiceE,i) => 
								<IonItem routerLink={`/chats/${item.id_t2}`} key={i} button className="item-has-start-slot item ios item-fill-none in-list ion-activatable ion-focusable hydrated item-label">
									<IonLabel>
										{ item.servicio_t2 }
										<IonIcon className="icon-foward" slot="start" icon={chevronForwardCircleOutline} />
									</IonLabel>
								</IonItem> 
							) 
							: null 
						}
					</IonList>
			</IonContent>
		</IonPage>
	)
}

export default Service