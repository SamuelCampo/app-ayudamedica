import React,{useEffect,useState} from "react";
import { IonContent, IonPage, IonIcon,IonCard, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react'
import Container from './../../components/Container/Container'
import global from './../../global'
import { person } from 'ionicons/icons'
import './Inicio.css'
import	Logo from './../../Images/logo.png'
import	icon1 from './../../Images/usuarios.png'
import	icon2 from './../../Images/buildings.png'
import	icon3 from './../../Images/siguiente.png'
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
							<img src={Logo} className="img-logo" alt="" />
						</div>
						<div>
							<p className="text-1">Cuéntanos que tipo de cliente eres</p>
							<p className="text-2">Esto nos ayudara identificar más los servicios que te convienen</p>
						</div>
					</div>
					<div className="content">
						<IonGrid>
							<IonRow>
							<IonCol size="6">
								<IonCard className="card" routerLink="/panel">
									<img src={icon1} className="img-icon" alt="" />
									<p className="text-icon">Particular</p>
								</IonCard>
							</IonCol>
							<IonCol size="6">
								<IonCard className="card">
									<img src={icon2} className="img-icon" alt="" />
									<p className="text-icon">Empresa</p>
								</IonCard>
							</IonCol>

								
								{/* <IonCol size="6">
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
								</IonCol> */}
							</IonRow>
						</IonGrid>
						<div className="icon-next">
							<img src={icon3} alt="" />
						</div>
					</div>
					</Container>
				</IonContent>
			</IonPage>
		</>
	)
}

export default Inicio