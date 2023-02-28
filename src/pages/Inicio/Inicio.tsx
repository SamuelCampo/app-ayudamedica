import React,{useEffect,useState} from "react";
import { IonContent, IonPage, IonIcon,IonCard, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react'
import Container from './../../components/Container/Container'
import global from './../../global'
import { person } from 'ionicons/icons'
import './Inicio.css'
import  WhatsappIcon  from './../../Images/WhatsappIcon.png'
import	Telemetry from './../../Images/telemedicina.jpg'
import	VideoIcon from './../../Images/video-conference.png'
const Inicio = () => {
	 
	const [Name,SetName] = useState('')
	const [email,setEmail] = useState('')
	
	let token : string | null;
	const getInfo = () => {
		const sEmail : string = localStorage.getItem('email') as string;
		var formData = new FormData()
		let myHeaders = new Headers();
		token =  localStorage.getItem('token')
		myHeaders.append('Authorization','Bearer '+token)
		
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: formData,
		};
		fetch(global.GetUrl + 'me', requestOptions)
		.then(response => {
			response.json()
			.then(response => {
				console.log(response)
				SetName(response.name)
			})
		})
		.catch(error => console.log('error', error));
	}
	useEffect(() =>{
		getInfo()
	})
	return (
		<>
			<IonPage>
				<IonContent fullscreen>
					<Container>
					<div className="headers">
						<div>
							<h5>Bienvenid@</h5>
						</div>
						<div>
							<span>
								<IonIcon slot="start" icon={person}></IonIcon> { Name }
							</span>
						</div>
					</div>
					<div className="content">
						<h2>Nuestros servicios</h2>
						<IonGrid>
							<IonRow>
								
								<IonCol size="6">
										<IonCard routerLink="/services">
											<IonCardContent className="text-center">
													<img src={Telemetry} width={120} alt="" />
													<h2>Servicios en la app</h2>
											</IonCardContent>
										</IonCard>
								</IonCol>
								<IonCol size="6">
									<IonCard>
										<IonCardContent className="text-center">
												<img src={WhatsappIcon} width={120} alt="" />
												<h2>Contactar a soporte</h2>
										</IonCardContent>
									</IonCard>
								</IonCol>
								<IonCol size="6">
									<IonCard routerLink="/video">
										<IonCardContent className="text-center">
												<img src={VideoIcon} width={120} alt="" />
												<h2>Video Llamada</h2>
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						</IonGrid>
					</div>
					</Container>
				</IonContent>
			</IonPage>
		</>
	)
}

export default Inicio