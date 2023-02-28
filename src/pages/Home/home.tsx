import React,{useEffect,useState} from "react";
import { IonContent, IonPage, IonIcon,IonCard, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/react'
import Container from './../../components/Container/Container'
import global from './../../global'
import { person } from 'ionicons/icons'
import './home.css'
import  WhatsappIcon  from './../../Images/WhatsappIcon.png'
import	Telemetry from './../../Images/telemedicina.jpg'
import	VideoIcon from './../../Images/video-conference.png'
import	Logo from './../../Images/logo.png'
import	icon_logo from './../../Images/LogoIcon.png'
import	user from './../../Images/user.png'
import	icon1 from './../../Images/icon-1.png'
import	icon2 from './../../Images/icon-2.png'
import	icon3 from './../../Images/icon-3.png'
import	next from './../../Images/siguiente.png'
import	no_result from './../../Images/not_results.png'
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
                        <IonRow>
                            <IonCol size="6" className="text-left">
									<img src={icon_logo} className="" alt="" />
							</IonCol>
                            <IonCol size="6" className="text-right">
									<img src={user} className="img-icon-2" alt="" />
							</IonCol>
                        </IonRow>
						<div className="content-service">
							<IonRow>
                                <IonCol size="4">
                                    <IonCard className="card">
                                        <img src={icon1} className="img-icon" alt="" />
                                        <p className="text-icon">Atención domiciliaria</p>
                                    </IonCard>
                                </IonCol>
                                <IonCol size="4">
                                    <IonCard className="card">
                                        <img src={icon2} className="img-icon" alt="" />
                                        <p className="text-icon">Video</p>
                                    </IonCard>
                                </IonCol>
                                <IonCol size="4">
                                    <IonCard className="card">
                                        <img src={icon3} className="img-icon" alt="" />
                                        <p className="text-icon">Traslado</p>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
						</div>
					</div>
					<div className="content">
						<IonGrid>
							<IonRow>
							<IonCol size="12">
                                <img src={no_result} className="img-result" alt="" />
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
                            <img src={WhatsappIcon}  alt="" />
						</div>
					</div>
					</Container>
				</IonContent>
			</IonPage>
		</>
	)
}

export default Inicio